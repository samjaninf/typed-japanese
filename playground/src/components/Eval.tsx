import { useMemo, useState } from "react";
import { useLang } from "../context/lang";

/**
 * Eval view — renders the committed parsing-accuracy benchmark results as-is.
 *
 * Data source: playground/eval/history/bench-*.json, imported eagerly via
 * import.meta.glob. Each future round commits a new bench-NNN.json (+ updates
 * benchmark-scoreboard.md); once that PR merges and the playground redeploys,
 * the new round appears here automatically — no code change needed.
 */
interface PerItem {
  id: string;
  source: string;
  chapter: string | null;
  jp: string;
  total: number;
  verdict: "conforms" | "needs-work";
  issueCount: number;
}
interface Proposal {
  target: "ts-def" | "prompt" | "content";
  title: string;
  confidence?: string;
}
interface RoundResult {
  round: number;
  sampled: number;
  scored: number;
  roundScore: number;
  byDimension: Record<string, number>;
  perItem: PerItem[];
  proposals: Proposal[];
}

const modules = import.meta.glob<RoundResult>("../../eval/history/bench-*.json", {
  eager: true,
  import: "default",
});
const ROUNDS: RoundResult[] = Object.values(modules).sort(
  (a, b) => a.round - b.round
);

// The six rubric dimensions, in order, with short bilingual labels.
const DIMS: { key: string; en: string; zh: string }[] = [
  { key: "D1", en: "POS", zh: "词类" },
  { key: "D2", en: "Decomp", zh: "分解" },
  { key: "D3", en: "Particle", zh: "助词" },
  { key: "D4", en: "Conjug.", zh: "活用" },
  { key: "D5", en: "Resolve", zh: "还原" },
  { key: "D6", en: "Idiom", zh: "地道" },
];

const REPO = "https://github.com/typedgrammar/typed-japanese/tree/main/playground/eval";
const pct = (x: number | undefined) =>
  x == null ? "—" : `${(x * 100).toFixed(1)}%`;

function ConformanceBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-surface-2 overflow-hidden min-w-[60px]">
        <div
          className="h-full bg-sakura-500 rounded-full"
          style={{ width: `${Math.round(value * 100)}%` }}
        />
      </div>
      <span className="tabular-nums text-ink-700 font-semibold w-[52px] text-right">
        {pct(value)}
      </span>
    </div>
  );
}

export default function Eval() {
  const { lang, t } = useLang();
  const first = ROUNDS.length ? ROUNDS[0] : undefined;
  const last = ROUNDS.length ? ROUNDS[ROUNDS.length - 1] : undefined;
  const [open, setOpen] = useState<number>(last?.round ?? 0);
  const delta = useMemo(
    () => (first && last ? last.roundScore - first.roundScore : 0),
    [first, last]
  );

  if (!ROUNDS.length) {
    return (
      <p className="text-ink-500">
        {t("No eval rounds recorded yet.", "暂无评测轮次记录。")}
      </p>
    );
  }

  return (
    <div className="max-w-[920px]">
      <div className="mb-6">
        <h2 className="m-0 font-heading text-[1.5rem] font-extrabold text-ink-900">
          {t("Parsing accuracy eval", "解析准确度评测")}
        </h2>
        <p className="mt-2 mb-0 text-[0.92rem] text-ink-500 leading-relaxed max-w-[68ch]">
          {t(
            "A fixed benchmark of grammar examples, scored each round by independent reviewers against a rubric across six dimensions. Conformance is the mean item score (out of 12). The same items are scored every round, so the trend is comparable. Results are shown as recorded.",
            "一组固定的语法示例基准，每轮由独立评审依据评分标准、从六个维度打分。Conformance 为各条目得分的均值（满分 12）。每轮评测的都是同一批条目，因此趋势可比。此处如实展示记录结果。"
          )}
        </p>
        <a
          className="inline-block mt-2 text-[0.85rem] font-semibold text-sakura-600 no-underline hover:underline"
          href={REPO}
          target="_blank"
          rel="noreferrer"
        >
          {t("Rubric & methodology", "评分标准与方法")} →
        </a>
      </div>

      {/* Trend overview */}
      <div className="rounded-2xl border border-border bg-surface overflow-hidden mb-7">
        <div className="flex items-baseline justify-between px-5 py-3 border-b border-border">
          <h3 className="m-0 text-[1rem] font-bold text-ink-900">
            {t("Trend", "趋势")}
          </h3>
          <span className="text-[0.82rem] text-ink-400">
            {t(
              `${ROUNDS.length} rounds · ${delta >= 0 ? "+" : ""}${(delta * 100).toFixed(1)} pts overall`,
              `${ROUNDS.length} 轮 · 累计 ${delta >= 0 ? "+" : ""}${(delta * 100).toFixed(1)} 分`
            )}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[0.86rem]">
            <thead>
              <tr className="text-ink-400 text-left">
                <th className="font-semibold px-5 py-2.5">{t("Round", "轮次")}</th>
                <th className="font-semibold px-3 py-2.5 min-w-[160px]">
                  {t("Conformance", "符合度")}
                </th>
                {DIMS.map((d) => (
                  <th key={d.key} className="font-semibold px-3 py-2.5 text-right whitespace-nowrap">
                    <span title={d.key}>{lang === "zh" ? d.zh : d.en}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROUNDS.map((r) => (
                <tr
                  key={r.round}
                  className={`border-t border-border ${r.round === open ? "bg-surface-2" : ""}`}
                >
                  <td className="px-5 py-2.5 font-semibold text-ink-700 tabular-nums">
                    {String(r.round).padStart(3, "0")}
                  </td>
                  <td className="px-3 py-2.5">
                    <ConformanceBar value={r.roundScore} />
                  </td>
                  {DIMS.map((d) => (
                    <td
                      key={d.key}
                      className="px-3 py-2.5 text-right tabular-nums text-ink-500 whitespace-nowrap"
                    >
                      {pct(r.byDimension?.[d.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Per-round detail */}
      <h3 className="m-0 mb-3 text-[1rem] font-bold text-ink-900">
        {t("Rounds", "各轮明细")}
      </h3>
      <div className="flex flex-col gap-3">
        {[...ROUNDS].reverse().map((r) => {
          const isOpen = r.round === open;
          return (
            <div
              key={r.round}
              className="rounded-2xl border border-border bg-surface overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-5 py-3.5 cursor-pointer text-left bg-transparent border-0"
                onClick={() => setOpen(isOpen ? -1 : r.round)}
                aria-expanded={isOpen}
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-bold text-ink-900">
                    {t("Round", "第")} {String(r.round).padStart(3, "0")}
                  </span>
                  <span className="text-[0.85rem] text-ink-400">
                    {r.scored}/{r.sampled} {t("items", "条")}
                  </span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="tabular-nums font-semibold text-sakura-600">
                    {pct(r.roundScore)}
                  </span>
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`text-ink-300 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-4 border-t border-border">
                  <table className="w-full border-collapse text-[0.86rem] mt-1">
                    <thead>
                      <tr className="text-ink-400 text-left">
                        <th className="font-semibold py-2 pr-3">{t("Sentence", "句子")}</th>
                        <th className="font-semibold py-2 px-3 whitespace-nowrap">{t("Source", "来源")}</th>
                        <th className="font-semibold py-2 px-3 text-right whitespace-nowrap">{t("Score", "得分")}</th>
                        <th className="font-semibold py-2 pl-3 text-right whitespace-nowrap">{t("Verdict", "判定")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {r.perItem.map((it) => (
                        <tr key={it.id} className="border-t border-border">
                          <td className="py-2 pr-3 font-jp text-ink-900">{it.jp}</td>
                          <td className="py-2 px-3 text-ink-400 whitespace-nowrap">
                            {it.chapter ?? it.source}
                          </td>
                          <td className="py-2 px-3 text-right tabular-nums text-ink-700">
                            {it.total}/12
                          </td>
                          <td className="py-2 pl-3 text-right whitespace-nowrap">
                            <span
                              className={
                                it.verdict === "conforms"
                                  ? "text-[0.78rem] font-semibold text-emerald-600"
                                  : "text-[0.78rem] font-semibold text-amber-600"
                              }
                            >
                              {it.verdict === "conforms"
                                ? t("conforms", "符合")
                                : t("needs work", "待改进")}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {r.proposals?.length > 0 && (
                    <div className="mt-4">
                      <div className="text-[0.8rem] font-semibold text-ink-400 mb-1.5">
                        {t("Fix proposals from this round", "本轮提出的改进建议")}
                      </div>
                      <ul className="m-0 pl-0 list-none flex flex-col gap-1.5">
                        {r.proposals.map((p, i) => (
                          <li key={i} className="flex items-start gap-2 text-[0.85rem]">
                            <span className="mt-[2px] flex-none text-[0.7rem] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-surface-2 text-ink-500">
                              {p.target}
                            </span>
                            <span className="text-ink-700">{p.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
