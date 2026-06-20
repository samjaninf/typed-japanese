import Foundation

/// Errors surfaced by the CLI bridge / subprocess layer.
enum CLIError: LocalizedError {
    case launchFailed(String)
    case timedOut(TimeInterval)
    case nonZeroExit(code: Int32, stderr: String)
    case emptyOutput(stderr: String)
    case decodeFailed(String, raw: String)

    var errorDescription: String? {
        switch self {
        case .launchFailed(let m):
            return "Failed to launch bridge: \(m)"
        case .timedOut(let t):
            return "The command timed out after \(Int(t))s."
        case .nonZeroExit(let code, let stderr):
            let tail = stderr.isEmpty ? "" : "\n\(stderr.trimmingCharacters(in: .whitespacesAndNewlines))"
            return "Bridge crashed (exit \(code)).\(tail)"
        case .emptyOutput(let stderr):
            let tail = stderr.isEmpty ? "" : "\n\(stderr.trimmingCharacters(in: .whitespacesAndNewlines))"
            return "Bridge produced no output.\(tail)"
        case .decodeFailed(let m, let raw):
            return "Could not decode bridge response: \(m)\n\(raw.prefix(400))"
        }
    }
}

/// Runs the Typed Japanese bridge and the chat CLIs as subprocesses.
///
/// GUI apps do not inherit the interactive shell PATH, so every command is run
/// through a login shell (`/bin/zsh -lc`). User-supplied text is always passed
/// over stdin and never interpolated into the command string.
actor CLIService {
    /// Path to the `tt-bridge.ts` entry point.
    let bridgePath: String
    /// Repo root used as cwd for the bridge and the chat CLIs.
    let repoPath: String

    private let decoder = JSONDecoder()

    init() {
        let env = ProcessInfo.processInfo.environment
        self.bridgePath = env["TYPEDTRANSLATE_BRIDGE"]
            ?? "/Users/evan/code/typed-japanese/apps/TypedTranslate/bridge/tt-bridge.ts"
        self.repoPath = env["TYPEDTRANSLATE_REPO"]
            ?? "/Users/evan/code/typed-japanese"
    }

    // MARK: - Public API

    /// Runs the bridge `annotate+parse` command end-to-end.
    func annotateAndParse(
        sentence: String,
        engine: Engine,
        model: String? = nil,
        retries: Int = 1
    ) async throws -> AnnotationResult {
        var payload: [String: Any] = [
            "sentence": sentence,
            "engine": engine.rawValue,
            "retries": retries
        ]
        if let model, !model.isEmpty { payload["model"] = model }
        return try await runBridge(command: "annotate+parse", payload: payload)
    }

    /// Re-parses edited annotation code via the bridge `parse` command.
    func parse(code: String) async throws -> AnnotationResult {
        try await runBridge(command: "parse", payload: ["code": code])
    }

    /// Discusses the annotated sentence's grammar using the local chat CLIs.
    func chat(
        history: [ChatMessage],
        context: ChatContext,
        engine: Engine,
        model: String? = nil
    ) async throws -> String {
        let prompt = buildChatPrompt(history: history, context: context)
        let command = chatCommand(engine: engine, model: model)
        let result = try await runShell(command: command, stdin: prompt, timeout: 180)
        if result.exitCode != 0 {
            throw CLIError.nonZeroExit(code: result.exitCode, stderr: result.stderr)
        }
        let out = result.stdout.trimmingCharacters(in: .whitespacesAndNewlines)
        if out.isEmpty {
            throw CLIError.emptyOutput(stderr: result.stderr)
        }
        return out
    }

    // MARK: - Bridge plumbing

    private func runBridge(command: String, payload: [String: Any]) async throws -> AnnotationResult {
        let json = try jsonString(from: payload)
        let shell = "cd \(quote(repoPath)) && bun \(quote(bridgePath)) \(quote(command))"
        let result = try await runShell(command: shell, stdin: json, timeout: 240)

        // Forward the bridge's diagnostics (incl. the timing trace) to our stderr
        // so `[tt-bridge] timing — …` shows in the terminal running the app.
        if !result.stderr.isEmpty {
            FileHandle.standardError.write(Data(result.stderr.utf8))
        }

        // The bridge exits 0 even on handled errors; nonzero means a real crash.
        if result.exitCode != 0 {
            throw CLIError.nonZeroExit(code: result.exitCode, stderr: result.stderr)
        }

        guard let data = lastJSONObject(in: result.stdout) else {
            if result.stdout.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
                throw CLIError.emptyOutput(stderr: result.stderr)
            }
            throw CLIError.decodeFailed("no JSON object found in output", raw: result.stdout)
        }

        do {
            return try decoder.decode(AnnotationResult.self, from: data)
        } catch {
            throw CLIError.decodeFailed(
                error.localizedDescription,
                raw: String(data: data, encoding: .utf8) ?? result.stdout
            )
        }
    }

    private func chatCommand(engine: Engine, model: String?) -> String {
        switch engine {
        case .codex:
            var cmd = "cd \(quote(repoPath)) && codex exec --ephemeral --sandbox read-only -C \(quote(repoPath))"
            if let model, !model.isEmpty {
                cmd += " -m \(quote(model))"
            }
            // Read the prompt from stdin.
            cmd += " -"
            return cmd
        case .claude:
            var cmd = "cd \(quote(repoPath)) && claude -p"
            if let model, !model.isEmpty {
                cmd += " --model \(quote(model))"
            }
            return cmd
        }
    }

    // MARK: - Prompt assembly

    private func buildChatPrompt(history: [ChatMessage], context: ChatContext) -> String {
        var lines: [String] = []
        lines.append("You are a Japanese grammar tutor discussing one specific sentence.")
        lines.append("The sentence has been annotated with the \"Typed Japanese\" TypeScript DSL and type-checked.")
        lines.append("Answer the user's questions about this sentence's grammar concisely and accurately.")
        lines.append("")
        lines.append("# Original sentence")
        lines.append(context.sentence)
        lines.append("")
        if let resolved = context.resolved, !resolved.isEmpty {
            lines.append("# Resolved (reconstructed) reading")
            lines.append(resolved)
            lines.append("")
        }
        lines.append("# Typed Japanese annotation (TypeScript)")
        lines.append("```ts")
        lines.append(context.code)
        lines.append("```")
        lines.append("")
        if !context.treeSummary.isEmpty {
            lines.append("# Grammar structure (resolved tree)")
            lines.append(context.treeSummary)
            lines.append("")
        }
        lines.append("# Conversation")
        for message in history {
            let speaker = message.role == .user ? "User" : "Assistant"
            lines.append("\(speaker): \(message.text)")
        }
        lines.append("Assistant:")
        return lines.joined(separator: "\n")
    }

    // MARK: - Subprocess core

    private struct ShellResult {
        let stdout: String
        let stderr: String
        let exitCode: Int32
    }

    private func runShell(command: String, stdin: String, timeout: TimeInterval) async throws -> ShellResult {
        try await withCheckedThrowingContinuation { continuation in
            let process = Process()
            process.executableURL = URL(fileURLWithPath: "/bin/zsh")
            process.arguments = ["-lc", command]

            let stdoutPipe = Pipe()
            let stderrPipe = Pipe()
            let stdinPipe = Pipe()
            process.standardOutput = stdoutPipe
            process.standardError = stderrPipe
            process.standardInput = stdinPipe

            // Collect output incrementally to avoid pipe-buffer deadlocks.
            let outData = MutableBox(Data())
            let errData = MutableBox(Data())
            let finished = MutableBox(false)
            let lock = NSLock()

            stdoutPipe.fileHandleForReading.readabilityHandler = { handle in
                let chunk = handle.availableData
                if !chunk.isEmpty { outData.withLock(lock) { $0.append(chunk) } }
            }
            stderrPipe.fileHandleForReading.readabilityHandler = { handle in
                let chunk = handle.availableData
                if !chunk.isEmpty { errData.withLock(lock) { $0.append(chunk) } }
            }

            process.terminationHandler = { proc in
                guard finished.compareAndSetTrue(lock) else { return }
                stdoutPipe.fileHandleForReading.readabilityHandler = nil
                stderrPipe.fileHandleForReading.readabilityHandler = nil
                // Drain any remaining buffered bytes.
                let restOut = stdoutPipe.fileHandleForReading.readDataToEndOfFile()
                if !restOut.isEmpty { outData.withLock(lock) { $0.append(restOut) } }
                let restErr = stderrPipe.fileHandleForReading.readDataToEndOfFile()
                if !restErr.isEmpty { errData.withLock(lock) { $0.append(restErr) } }

                let out = String(data: outData.withLock(lock) { $0 }, encoding: .utf8) ?? ""
                let err = String(data: errData.withLock(lock) { $0 }, encoding: .utf8) ?? ""
                continuation.resume(returning: ShellResult(stdout: out, stderr: err, exitCode: proc.terminationStatus))
            }

            do {
                try process.run()
            } catch {
                continuation.resume(throwing: CLIError.launchFailed(error.localizedDescription))
                return
            }

            // Feed stdin then close.
            let handle = stdinPipe.fileHandleForWriting
            if let data = stdin.data(using: .utf8) {
                handle.write(data)
            }
            try? handle.close()

            // Timeout watchdog.
            DispatchQueue.global().asyncAfter(deadline: .now() + timeout) {
                guard finished.compareAndSetTrue(lock) else { return }
                stdoutPipe.fileHandleForReading.readabilityHandler = nil
                stderrPipe.fileHandleForReading.readabilityHandler = nil
                if process.isRunning { process.terminate() }
                continuation.resume(throwing: CLIError.timedOut(timeout))
            }
        }
    }

    // MARK: - Helpers

    private func jsonString(from payload: [String: Any]) throws -> String {
        let data = try JSONSerialization.data(withJSONObject: payload, options: [])
        return String(data: data, encoding: .utf8) ?? "{}"
    }

    /// Single-quote a shell argument safely.
    private func quote(_ s: String) -> String {
        "'" + s.replacingOccurrences(of: "'", with: "'\\''") + "'"
    }

    /// The bridge prints exactly one JSON object, but login-shell init or bun
    /// can emit stray lines; recover by decoding the last balanced top-level
    /// object in the stream.
    private func lastJSONObject(in output: String) -> Data? {
        let trimmed = output.trimmingCharacters(in: .whitespacesAndNewlines)
        if trimmed.isEmpty { return nil }
        if let data = trimmed.data(using: .utf8),
           (try? JSONSerialization.jsonObject(with: data)) != nil {
            return data
        }
        // Scan from the end for the last top-level `{...}`.
        let chars = Array(trimmed)
        var depth = 0
        var end = -1
        var inString = false
        var escaped = false
        for i in stride(from: chars.count - 1, through: 0, by: -1) {
            let c = chars[i]
            if escaped { escaped = false; continue }
            if c == "\\" { escaped = true; continue }
            if c == "\"" { inString.toggle(); continue }
            if inString { continue }
            if c == "}" {
                if depth == 0 { end = i }
                depth += 1
            } else if c == "{" {
                depth -= 1
                if depth == 0 {
                    let slice = String(chars[i...end])
                    if let data = slice.data(using: .utf8),
                       (try? JSONSerialization.jsonObject(with: data)) != nil {
                        return data
                    }
                }
            }
        }
        return nil
    }
}

/// Grammar context injected into chat prompts.
struct ChatContext {
    let sentence: String
    let code: String
    let resolved: String?
    let treeSummary: String
}

// MARK: - Concurrency helpers

/// A simple reference box guarded by an external lock, used to accumulate
/// subprocess output from pipe handlers.
private final class MutableBox<T>: @unchecked Sendable {
    private var value: T
    init(_ value: T) { self.value = value }

    func withLock<R>(_ lock: NSLock, _ body: (inout T) -> R) -> R {
        lock.lock(); defer { lock.unlock() }
        return body(&value)
    }
}

private extension MutableBox where T == Bool {
    func compareAndSetTrue(_ lock: NSLock) -> Bool {
        withLock(lock) { current in
            if current { return false }
            current = true
            return true
        }
    }
}
