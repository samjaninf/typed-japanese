#!/usr/bin/env bun
/**
 * tt-bridge.ts — the Node/TS bridge between the TypedTranslate macOS app and the
 * Typed Japanese SDK. It is invoked as:
 *
 *   /bin/zsh -lc 'cd <repo> && bun .../bridge/tt-bridge.ts <command>'
 *
 * with a single JSON request on stdin. It prints EXACTLY ONE JSON object to
 * stdout and exits 0 even on handled errors (nonzero only on a crash). All
 * diagnostics go to stderr so stdout stays a clean single JSON object.
 *
 * Commands (stable contract — Swift and this bridge both depend on these):
 *
 *   annotate        in:  { sentence, engine, model?, retries? }
 *                   out: { ok, code, resolved, errors }
 *
 *   parse           in:  { code }
 *                   out: { ok, aliases, tree, errors }
 *
 *   annotate+parse  in:  { sentence, engine, model?, retries? }
 *                   out: { ok, code, resolved, tree, errors }
 *
 * The annotate loop reuses the SDK helpers exported from the playground's
 * annotate.ts (buildPrompt -> callModel -> parseResult -> verify); parse/tree
 * use the VOCAB-free port in ./tree.ts.
 */
import {
  buildPrompt,
  callModel,
  parseResult,
  verify,
} from "../../../playground/scripts/annotate.ts";
import { parseTree } from "./tree.ts";

// --- stdin / stdout ----------------------------------------------------------

async function readStdin(): Promise<string> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of Bun.stdin.stream()) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

/** Emit the single stdout JSON object and exit 0 (handled path). */
function emit(obj: unknown): never {
  process.stdout.write(JSON.stringify(obj));
  process.exit(0);
}

function log(msg: string): void {
  process.stderr.write(`[tt-bridge] ${msg}\n`);
}

// --- timing ------------------------------------------------------------------

const nowMs = (): number => performance.now();
const secs = (ms: number): string => `${(ms / 1000).toFixed(2)}s`;
const round = (ms: number): number => Math.round(ms);

interface AttemptTiming {
  attempt: number;
  modelMs: number;
  verifyMs: number;
  ok: boolean;
}

/** Human-readable per-phase breakdown to stderr (forwarded to the app's stderr). */
function logTimingSummary(
  label: string,
  attempts: AttemptTiming[],
  parseMs: number | null,
  totalMs: number
): void {
  log(`timing — ${label}: total ${secs(totalMs)}`);
  for (const a of attempts) {
    log(`  attempt ${a.attempt}: model ${secs(a.modelMs)}  verify ${secs(a.verifyMs)}  → ${a.ok ? "ok" : "rejected"}`);
  }
  if (parseMs !== null) log(`  parse(tree) ${secs(parseMs)}`);
}

/** Machine-readable timings, added to the response JSON (additive; ignored by old clients). */
function timingsJSON(attempts: AttemptTiming[], parseMs: number | null, totalMs: number) {
  return {
    total_ms: round(totalMs),
    ...(parseMs !== null ? { parse_ms: round(parseMs) } : {}),
    attempts: attempts.map((a) => ({
      attempt: a.attempt,
      model_ms: round(a.modelMs),
      verify_ms: round(a.verifyMs),
      ok: a.ok,
    })),
  };
}

// --- request types -----------------------------------------------------------

type Engine = "codex" | "claude";

interface AnnotateRequest {
  sentence?: unknown;
  engine?: unknown;
  model?: unknown;
  retries?: unknown;
}

interface ParseRequest {
  code?: unknown;
}

function asEngine(v: unknown): Engine {
  return v === "claude" ? "claude" : "codex";
}

function asRetries(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 3;
}

// --- annotate ----------------------------------------------------------------

interface AnnotateOutcome {
  ok: boolean;
  code: string;
  resolved: string | null;
  errors: string[];
  attempts: AttemptTiming[];
}

/**
 * Run the buildPrompt -> callModel -> parseResult -> verify loop up to
 * `retries` times, feeding verification errors back to the model each round.
 * Returns the first verified attempt, or the best (last) attempt on exhaustion.
 */
function runAnnotate(
  sentence: string,
  engine: Engine,
  model: string | undefined,
  retries: number
): AnnotateOutcome {
  let best: Omit<AnnotateOutcome, "attempts"> | null = null;
  let prior: { code: string; errors: string[] } | undefined;
  const attempts: AttemptTiming[] = [];

  for (let attempt = 1; attempt <= retries; attempt++) {
    log(`annotate attempt ${attempt}/${retries} via ${engine}`);
    const prompt = buildPrompt(sentence, prior);

    const tModel = nowMs();
    let code: string;
    try {
      code = parseResult(callModel(engine, prompt, model)).code;
    } catch (e) {
      attempts.push({ attempt, modelMs: nowMs() - tModel, verifyMs: 0, ok: false });
      const errors = [(e as Error).message];
      log(`attempt ${attempt} model/parse error: ${errors[0]!.split("\n")[0]}`);
      best = { ok: false, code: prior?.code ?? "", resolved: null, errors };
      prior = { code: prior?.code ?? "", errors };
      continue;
    }

    const tVerify = nowMs();
    const modelMs = tVerify - tModel;
    const check = verify(code, sentence);
    attempts.push({ attempt, modelMs, verifyMs: nowMs() - tVerify, ok: check.ok });

    best = { ok: check.ok, code, resolved: check.resolved, errors: check.errors };
    if (check.ok) {
      log(`annotate verified on attempt ${attempt} -> ${JSON.stringify(check.resolved)}`);
      return { ...best, attempts };
    }
    log(`attempt ${attempt} failed with ${check.errors.length} error(s)`);
    prior = { code, errors: check.errors };
  }

  return { ...(best ?? { ok: false, code: "", resolved: null, errors: ["no attempts were made"] }), attempts };
}

// --- command handlers --------------------------------------------------------

function handleAnnotate(req: AnnotateRequest): never {
  const t0 = nowMs();
  const sentence = typeof req.sentence === "string" ? req.sentence.trim() : "";
  if (!sentence) {
    emit({ ok: false, code: "", resolved: null, errors: ["`sentence` is required"] });
  }
  const outcome = runAnnotate(sentence, asEngine(req.engine), typeof req.model === "string" ? req.model : undefined, asRetries(req.retries));
  const totalMs = nowMs() - t0;
  logTimingSummary("annotate", outcome.attempts, null, totalMs);
  emit({
    ok: outcome.ok,
    code: outcome.code,
    resolved: outcome.resolved,
    errors: outcome.errors,
    timings: timingsJSON(outcome.attempts, null, totalMs),
  });
}

function handleParse(req: ParseRequest): never {
  const t0 = nowMs();
  const code = typeof req.code === "string" ? req.code : "";
  if (!code.trim()) {
    emit({ ok: false, aliases: [], tree: null, errors: ["`code` is required"] });
  }
  const result = parseTree(code);
  const parseMs = nowMs() - t0;
  logTimingSummary("parse", [], parseMs, parseMs);
  emit({
    ok: result.ok,
    aliases: result.aliases,
    tree: result.tree,
    errors: result.errors,
    timings: timingsJSON([], parseMs, parseMs),
  });
}

function handleAnnotateParse(req: AnnotateRequest): never {
  const t0 = nowMs();
  const sentence = typeof req.sentence === "string" ? req.sentence.trim() : "";
  if (!sentence) {
    emit({ ok: false, code: "", resolved: null, tree: null, errors: ["`sentence` is required"] });
  }
  const ann = runAnnotate(sentence, asEngine(req.engine), typeof req.model === "string" ? req.model : undefined, asRetries(req.retries));

  // Parse the winning code (even a failed-verification best attempt may parse).
  let tree = null;
  let parseErrors: string[] = [];
  let parseMs: number | null = null;
  if (ann.code.trim()) {
    const tParse = nowMs();
    const parsed = parseTree(ann.code);
    parseMs = nowMs() - tParse;
    tree = parsed.tree;
    if (!ann.ok) parseErrors = parsed.errors;
  }

  const totalMs = nowMs() - t0;
  logTimingSummary("annotate+parse", ann.attempts, parseMs, totalMs);
  emit({
    ok: ann.ok,
    code: ann.code,
    resolved: ann.resolved,
    tree,
    errors: ann.ok ? ann.errors : [...ann.errors, ...parseErrors],
    timings: timingsJSON(ann.attempts, parseMs, totalMs),
  });
}

// --- entry point -------------------------------------------------------------

async function main(): Promise<void> {
  const command = process.argv[2];
  if (!command) {
    emit({ ok: false, errors: ["missing command (annotate | parse | annotate+parse)"] });
  }

  const raw = await readStdin();
  let req: unknown;
  try {
    req = raw.trim() ? JSON.parse(raw) : {};
  } catch (e) {
    emit({ ok: false, errors: [`invalid JSON on stdin: ${(e as Error).message}`] });
  }
  const r = req as AnnotateRequest & ParseRequest;

  switch (command) {
    case "annotate":
      handleAnnotate(r);
      break;
    case "parse":
      handleParse(r);
      break;
    case "annotate+parse":
      handleAnnotateParse(r);
      break;
    default:
      emit({ ok: false, errors: [`unknown command: ${command}`] });
  }
}

// Crash (nonzero exit) only on an unexpected error; handled errors emit + exit 0.
main().catch((e) => {
  log(`fatal: ${(e as Error).stack ?? (e as Error).message}`);
  process.exit(1);
});
