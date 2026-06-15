import { Fragment, useMemo, useState } from "react";
import { VOCAB_LIST } from "../vocab/dictionary";
import { POS_LABEL, type PartOfSpeech } from "../vocab/types";
import { REVERSE_INDEX } from "../tutorial/reverseIndex.generated";
import { useLang } from "../context/lang";
import { useRoute } from "../context/route";
import styles from "./Glossary.module.css";

const POS_GROUPS: { key: PartOfSpeech[]; en: string; zh: string }[] = [
  { key: ["noun", "pronoun"], en: "Nouns", zh: "名词" },
  { key: ["verb-godan", "verb-ichidan", "verb-irregular"], en: "Verbs", zh: "动词" },
  { key: ["i-adjective", "na-adjective"], en: "Adjectives", zh: "形容词" },
  { key: ["adverb"], en: "Adverbs", zh: "副词" },
  { key: ["particle", "copula", "suffix", "conjunction", "prefix"], en: "Grammar", zh: "语法词" },
];

export default function Glossary() {
  const { lang, t } = useLang();
  const { navigate } = useRoute();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const allowed = filter === null ? null : new Set(POS_GROUPS[filter]!.key);
    return VOCAB_LIST.filter((e) => {
      if (allowed && !allowed.has(e.pos)) return false;
      if (!q) return true;
      return (
        e.word.toLowerCase().includes(q) ||
        e.reading.includes(q) ||
        e.romaji.toLowerCase().includes(q) ||
        e.en.toLowerCase().includes(q) ||
        e.zh.includes(q)
      );
    });
  }, [query, filter]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <input
          className="tj-input flex-1 min-w-[240px]"
          placeholder={t("Search word, reading, romaji or meaning…", "搜索词语、读音、罗马字或释义…")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex gap-1.5 flex-wrap">
          <button
            className={`tj-chip cursor-pointer border border-border ${filter === null ? "bg-sakura-500 text-on-accent border-sakura-500" : ""}`}
            onClick={() => setFilter(null)}
          >
            {t("All", "全部")}
          </button>
          {POS_GROUPS.map((g, i) => (
            <button
              key={i}
              className={`tj-chip cursor-pointer border border-border ${filter === i ? "bg-sakura-500 text-on-accent border-sakura-500" : ""}`}
              onClick={() => setFilter(i)}
            >
              {t(g.en, g.zh)}
            </button>
          ))}
        </div>
      </div>

      <p className="tj-subtle">
        {t(
          `${rows.length} of ${VOCAB_LIST.length} words`,
          `${rows.length} / ${VOCAB_LIST.length} 个词`
        )}
      </p>

      <div className="tj-card overflow-auto max-h-[calc(100vh-260px)]">
        <table className={`w-full border-collapse text-[0.9rem] ${styles.table}`}>
          <thead>
            <tr>
              <th>{t("Word", "词语")}</th>
              <th>{t("Reading", "读音")}</th>
              <th>{t("Romaji", "罗马字")}</th>
              <th>{t("Type", "词性")}</th>
              <th>{t("Meaning", "释义")}</th>
              <th>{t("Used in", "用例")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e, i) => {
              const refs = REVERSE_INDEX[e.word] ?? [];
              const isOpen = expanded === e.word;
              return (
                <Fragment key={`${e.word}-${i}`}>
                  <tr
                    className={refs.length ? "cursor-pointer" : undefined}
                    onClick={() =>
                      refs.length && setExpanded(isOpen ? null : e.word)
                    }
                  >
                    <td className="jp text-[1.05rem] font-bold text-ink-900 whitespace-nowrap">{e.word}</td>
                    <td className="jp text-sakura-600 font-semibold whitespace-nowrap">{e.reading}</td>
                    <td className="italic text-ink-500 whitespace-nowrap">{e.romaji}</td>
                    <td>
                      <span className="text-[0.7rem] font-bold text-sakura-600 bg-surface-2 border border-border px-2 py-0.5 rounded-full whitespace-nowrap">{t(POS_LABEL[e.pos].en, POS_LABEL[e.pos].zh)}</span>
                    </td>
                    <td className="text-ink-700">{lang === "zh" ? e.zh : e.en}</td>
                    <td className="whitespace-nowrap">
                      {refs.length ? (
                        <span className="inline-flex items-center gap-1 text-[0.78rem] font-bold text-sakura-600 bg-sakura-100 px-[9px] py-0.5 rounded-full">
                          {refs.length}
                          <span className="text-[0.6rem] opacity-80">{isOpen ? "▴" : "▾"}</span>
                        </span>
                      ) : (
                        <span className="tj-subtle">—</span>
                      )}
                    </td>
                  </tr>
                  {isOpen && refs.length > 0 && (
                    <tr className={styles.refRow}>
                      <td colSpan={6}>
                        <div className="flex flex-col gap-1.5">
                          {refs.map((r, k) => (
                            <button
                              key={k}
                              type="button"
                              className="flex flex-col gap-0.5 text-left w-full border border-border bg-paper rounded-field px-3 py-2 cursor-pointer transition-[border-color,background] duration-[120ms] hover:border-sakura-400 hover:bg-sakura-50"
                              onClick={() =>
                                navigate({
                                  tab: "tutorial",
                                  chapter: r.chapterId,
                                  ex: r.anchor,
                                })
                              }
                              title={t("Open in the course", "在教程中打开")}
                            >
                              <span className="jp text-base font-semibold text-ink-900">{r.jp}</span>
                              <span className="text-[0.74rem] text-ink-500">
                                {t(r.chapterTitleEn, r.chapterTitleZh)} ·{" "}
                                {t(r.pointTitleEn, r.pointTitleZh)}
                              </span>
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
