import { lazy, Suspense, useState } from "react";
import { SNIPPETS } from "../data/examples";

// Monaco (and the whole Analyzer) is client-only and heavy — load it lazily so
// it is never pulled into the server prerender.
const Analyzer = lazy(() => import("./Analyzer"));

export default function Playground() {
  const [index, setIndex] = useState(0);
  const active = SNIPPETS[index] ?? SNIPPETS[0]!;

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="tj-label">Examples</span>
        <div className="flex gap-[7px] flex-wrap">
          {SNIPPETS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`tj-chip cursor-pointer border border-border ${i === index ? "bg-sakura-500 text-on-accent border-sakura-500" : ""}`}
              onClick={() => setIndex(i)}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      <Suspense
        fallback={<p className="tj-subtle">Loading the analyzer…</p>}
      >
        <Analyzer code={active.code} gloss={active.en} />
      </Suspense>

      <p className="tj-subtle text-center m-0">
        Edit the code — the structure re-parses live. Click any node to highlight
        the source it came from. Every value is computed by the TypeScript
        compiler running in your browser.
      </p>
    </div>
  );
}
