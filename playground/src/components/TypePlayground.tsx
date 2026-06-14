import { useCallback, useMemo, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import type { Monaco, OnMount } from "@monaco-editor/react";
import { SNIPPETS } from "../data/examples";
import { LIB_FILES } from "../data/libSources";
import styles from "./TypePlayground.module.css";

// `monaco-editor` is not a direct dependency, so we derive the few instance
// types we need from the `Monaco` namespace exported by @monaco-editor/react.
type StandaloneEditor = ReturnType<Monaco["editor"]["create"]>;
type Disposable = ReturnType<Monaco["editor"]["onDidChangeMarkers"]>;

/** Virtual model path. Must live under file:/// so NodeJs module resolution
 *  walks up to file:///node_modules/typed-japanese for `import "typed-japanese"`. */
const MODEL_PATH = "file:///main.ts";

type Severity = "error" | "warning" | "info";

interface Diagnostic {
  message: string;
  startLine: number;
  startCol: number;
  severity: Severity;
}

/** Minimal shape of a Monaco marker — `getModelMarkers` is loosely typed when
 *  `monaco-editor` is only reachable transitively. */
interface MonacoMarker {
  message: string;
  severity: number;
  startLineNumber: number;
  startColumn: number;
}

interface MonacoUri {
  toString(): string;
}

function toSeverity(monaco: Monaco, sev: number): Severity {
  if (sev === monaco.MarkerSeverity.Error) return "error";
  if (sev === monaco.MarkerSeverity.Warning) return "warning";
  return "info";
}

export default function TypePlayground() {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [ready, setReady] = useState(false);

  const editorRef = useRef<StandaloneEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const markerSubRef = useRef<Disposable | null>(null);

  const activeSnippet = SNIPPETS[snippetIndex] ?? SNIPPETS[0];

  const refreshDiagnostics = useCallback(() => {
    const monaco = monacoRef.current;
    const ed = editorRef.current;
    if (!monaco || !ed) return;
    const model = ed.getModel();
    if (!model) return;
    const markers: MonacoMarker[] = monaco.editor.getModelMarkers({
      resource: model.uri,
    });
    setDiagnostics(
      markers
        .map((m): Diagnostic => ({
          message: m.message,
          startLine: m.startLineNumber,
          startCol: m.startColumn,
          severity: toSeverity(monaco, m.severity),
        }))
        .sort((a, b) => a.startLine - b.startLine),
    );
  }, []);

  const handleMount: OnMount = useCallback(
    (ed, monaco) => {
      editorRef.current = ed;
      monacoRef.current = monaco;

      const ts = monaco.languages.typescript;
      ts.typescriptDefaults.setCompilerOptions({
        target: ts.ScriptTarget.ES2020,
        moduleResolution: ts.ModuleResolutionKind.NodeJs,
        module: ts.ModuleKind.ESNext,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        allowNonTsExtensions: true,
        skipLibCheck: true,
      });

      // The starter snippets intentionally declare type aliases (and imports)
      // purely so you can hover them — so suppress "declared but never used"
      // noise and let the panel surface only genuine type errors.
      ts.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
        diagnosticCodesToIgnore: [
          6133, // 'X' is declared but its value is never read
          6196, // 'X' is declared but never used
          6192, // All imports in declaration are unused
          6198, // All destructured elements are unused
          6205, // All type parameters are unused
        ],
      });

      for (const f of LIB_FILES) {
        ts.typescriptDefaults.addExtraLib(f.contents, f.path);
      }

      // Subscribe to marker changes for this editor's model.
      markerSubRef.current?.dispose();
      markerSubRef.current = monaco.editor.onDidChangeMarkers(
        (uris: MonacoUri[]) => {
          const model = ed.getModel();
          if (!model) return;
          const target = model.uri.toString();
          if (uris.some((u) => u.toString() === target)) {
            refreshDiagnostics();
          }
        },
      );

      setReady(true);
      // Initial read (markers may already exist or arrive shortly).
      refreshDiagnostics();
    },
    [refreshDiagnostics],
  );

  const loadSnippet = useCallback((index: number) => {
    setSnippetIndex(index);
    const next = SNIPPETS[index];
    const ed = editorRef.current;
    if (ed && next) ed.setValue(next.code);
  }, []);

  const errorCount = useMemo(
    () => diagnostics.filter((d) => d.severity === "error").length,
    [diagnostics],
  );

  return (
    <div className={styles.wrap}>
      <header className={styles.intro}>
        <h2 className="tj-panel-title">Type Playground</h2>
        <p className="tj-subtle">
          The real TypeScript compiler resolves Typed Japanese types right in
          your browser. <strong>Hover a type alias</strong> (e.g.{" "}
          <code className="tj-code">話すて形</code>) to see TypeScript compute its
          value — like <span className={`jp ${styles.hoverHint}`}>"話して"</span>.
        </p>
      </header>

      <div className={styles.snippetBar}>
        <span className="tj-label">Starter snippets</span>
        <div className={styles.chips} role="tablist" aria-label="Snippets">
          {SNIPPETS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === snippetIndex}
              className={`tj-chip ${styles.chip} ${
                i === snippetIndex ? styles.chipActive : ""
              }`}
              onClick={() => loadSnippet(i)}
            >
              {s.title}
            </button>
          ))}
        </div>
        {activeSnippet && (
          <p className={styles.caption}>
            <span className={`jp ${styles.captionJp}`}>{activeSnippet.jp}</span>
            <span className={styles.captionEn}>{activeSnippet.en}</span>
          </p>
        )}
      </div>

      <div className={styles.panes}>
        <section className={`tj-card ${styles.editorPane}`}>
          <Editor
            className={styles.editor}
            theme="light"
            language="typescript"
            path={MODEL_PATH}
            defaultValue={activeSnippet?.code ?? ""}
            onMount={handleMount}
            loading={
              <div className={styles.loading}>
                <span className={styles.spinner} aria-hidden />
                Loading TypeScript compiler…
              </div>
            }
            options={{
              fontSize: 14,
              fontFamily: "var(--font-mono)",
              minimap: { enabled: false },
              wordWrap: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              renderLineHighlight: "none",
              padding: { top: 14, bottom: 14 },
              smoothScrolling: true,
            }}
          />
        </section>

        <aside className={`tj-card ${styles.diagPane}`}>
          <div className={styles.diagHeader}>
            <h3 className="tj-panel-title">Diagnostics</h3>
            {ready ? (
              errorCount === 0 ? (
                <span className={`${styles.badge} ${styles.badgeOk}`}>
                  ✓ Type-checks
                </span>
              ) : (
                <span className={`${styles.badge} ${styles.badgeErr}`}>
                  {errorCount} error{errorCount === 1 ? "" : "s"}
                </span>
              )
            ) : (
              <span className={`${styles.badge} ${styles.badgePending}`}>
                …
              </span>
            )}
          </div>

          {!ready ? (
            <p className="tj-subtle">Waiting for the language service…</p>
          ) : diagnostics.length === 0 ? (
            <p className="tj-subtle">
              No problems. Every type alias above resolves correctly — hover them
              in the editor to read the computed Japanese.
            </p>
          ) : (
            <ul className={styles.diagList}>
              {diagnostics.map((d, i) => (
                <li
                  key={`${d.startLine}-${d.startCol}-${i}`}
                  className={`${styles.diag} ${styles[d.severity]}`}
                >
                  <span className={styles.diagDot} aria-hidden />
                  <div className={styles.diagBody}>
                    <span className={styles.diagLoc}>
                      Line {d.startLine}:{d.startCol}
                    </span>
                    <span className={styles.diagMsg}>{d.message}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <p className={`tj-subtle ${styles.diagFoot}`}>
            <code className="tj-code">@ts-expect-error</code> lines turn a wrong
            answer into a passing test — that is the type system grading itself.
          </p>
        </aside>
      </div>
    </div>
  );
}
