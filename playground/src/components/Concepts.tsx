import { useMemo, type ReactNode } from "react";
import { ARTICLES } from "../concepts";
import type {
  ConceptArticle,
  ConceptBlock,
  DiagramNode,
} from "../concepts/types";
import { CHAPTERS } from "../tutorial/chapters";
import { LEVEL_META } from "../tutorial/levels";
import { useLang } from "../context/lang";
import { useRoute } from "../context/route";
import styles from "./Concepts.module.css";

/** Render a run of paragraphs with inline `code` and **bold** spans. */
function RichText({ text }: { text: string }): ReactNode {
  return (
    <>
      {text.split(/\n\s*\n/).map((para, i) => (
        <p key={i} className={styles.para}>
          {renderInline(para)}
        </p>
      ))}
    </>
  );
}

/** Inline markup: `code` and **bold**, in one pass. */
function renderInline(text: string): ReactNode[] {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/).map((seg, j) => {
    if (seg.startsWith("`") && seg.endsWith("`")) {
      return (
        <code key={j} className="tj-code">
          {seg.slice(1, -1)}
        </code>
      );
    }
    if (seg.startsWith("**") && seg.endsWith("**")) {
      return <strong key={j}>{seg.slice(2, -2)}</strong>;
    }
    return <span key={j}>{seg}</span>;
  });
}

// --- tiny TypeScript/JS highlighter -----------------------------------------
// The snippets are deliberately simple (comments, strings, a few keywords), so a
// small left-to-right scanner is enough — no dependency. Japanese only ever
// appears inside strings or comments, which are matched before anything else.
const KEYWORDS = new Set([
  "const", "let", "type", "interface", "extends", "return", "import", "from",
  "as", "true", "false", "null",
]);

function classifyWord(
  word: string,
  nextNonSpace: string
): string | null | undefined {
  if (KEYWORDS.has(word)) return styles.tokKeyword;
  if (/^[A-Z]/.test(word)) return styles.tokType;
  if (nextNonSpace === "(") return styles.tokFunc;
  return null;
}

function highlightLine(line: string, lineKey: string): ReactNode[] {
  const out: ReactNode[] = [];
  let i = 0;
  let n = 0;
  const push = (cls: string | null | undefined, text: string) =>
    out.push(
      cls ? (
        <span key={`${lineKey}-${n++}`} className={cls}>
          {text}
        </span>
      ) : (
        <span key={`${lineKey}-${n++}`}>{text}</span>
      )
    );

  while (i < line.length) {
    const rest = line.slice(i);
    if (rest.startsWith("//")) {
      push(styles.tokComment, rest);
      break;
    }
    if (line[i] === '"') {
      let j = i + 1;
      while (j < line.length && line[j] !== '"') j++;
      push(styles.tokString, line.slice(i, Math.min(j + 1, line.length)));
      i = j + 1;
      continue;
    }
    const word = /^[A-Za-z_$][\w$]*/.exec(rest);
    if (word) {
      const w = word[0];
      let k = i + w.length;
      while (k < line.length && line[k] === " ") k++;
      push(classifyWord(w, line[k] ?? ""), w);
      i += w.length;
      continue;
    }
    const num = /^\d+/.exec(rest);
    if (num) {
      push(styles.tokNumber, num[0]);
      i += num[0].length;
      continue;
    }
    const space = /^\s+/.exec(rest);
    if (space) {
      push(null, space[0]);
      i += space[0].length;
      continue;
    }
    const punct = /^[^\w\s"]+/.exec(rest);
    if (punct) {
      push(styles.tokPunct, punct[0]);
      i += punct[0].length;
      continue;
    }
    push(null, line[i] ?? "");
    i += 1;
  }
  return out;
}

function CodeBlock({ code }: { code: string }): ReactNode {
  const lines = code.split("\n");
  return (
    <pre className={styles.compareTs}>
      <code>
        {lines.map((ln, idx) => (
          <span key={idx}>
            {highlightLine(ln, String(idx))}
            {idx < lines.length - 1 ? "\n" : null}
          </span>
        ))}
      </code>
    </pre>
  );
}

export default function Concepts() {
  const { lang, t } = useLang();
  const { route, navigate } = useRoute();

  const chapterById = useMemo(
    () => new Map(CHAPTERS.map((c) => [c.id, c])),
    []
  );

  const active = useMemo(
    () =>
      ARTICLES.find((a) => a.id === route.article) ?? ARTICLES[0] ?? null,
    [route.article]
  );

  if (ARTICLES.length === 0) {
    return <p className="tj-subtle">No articles yet.</p>;
  }

  /** "Where this is taught" — chips deep-linking into the Grammar Course. */
  function ChapterLinks({ ids }: { ids: string[] }): ReactNode {
    const chapters = ids
      .map((id) => chapterById.get(id))
      .filter((c): c is NonNullable<typeof c> => Boolean(c));
    if (chapters.length === 0) return null;
    return (
      <div className={styles.chapters}>
        <span className={styles.chaptersLabel}>
          {t("Learn it in the Course", "在教程里学")}
        </span>
        <div className={styles.chapterChips}>
          {chapters.map((c) => (
            <button
              key={c.id}
              type="button"
              className={styles.chapterChip}
              onClick={() => navigate({ tab: "tutorial", chapter: c.id })}
              title={t("Open this chapter", "打开该章节")}
            >
              <span className={styles.chapterChipEmoji}>
                {LEVEL_META[c.level].emoji}
              </span>
              <span>{t(c.titleEn, c.titleZh)}</span>
              <span className={styles.chapterChipArrow}>→</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  /** Recursively render a composition diagram node (clause = box, leaf = chip). */
  function renderDia(node: DiagramNode, key: string): ReactNode {
    const role =
      node.roleEn || node.roleZh
        ? t(node.roleEn ?? "", node.roleZh ?? "")
        : null;
    if (node.args && node.args.length) {
      return (
        <div key={key} className={styles.diaClause}>
          {role && <span className={styles.diaClauseLabel}>{role}</span>}
          <div className={styles.diaRow}>
            {node.args.map((a, i) => renderDia(a, `${key}.${i}`))}
            <span className={styles.diaArrow}>→</span>
            <span className={`${styles.diaChip} ${styles.diaVerb}`}>
              <span className={`jp ${styles.diaWord}`}>{node.label}</span>
            </span>
            {node.tag && <span className={`jp ${styles.diaTag}`}>{node.tag}</span>}
          </div>
        </div>
      );
    }
    return (
      <span key={key} className={`${styles.diaChip} ${styles.diaArg}`}>
        <span className={styles.diaChipMain}>
          <span className={`jp ${styles.diaWord}`}>{node.label}</span>
          {node.tag && <span className={`jp ${styles.diaTag}`}>{node.tag}</span>}
        </span>
        {role && <span className={styles.diaRole}>{role}</span>}
      </span>
    );
  }

  function Block({ block }: { block: ConceptBlock }): ReactNode {
    switch (block.kind) {
      case "prose":
        return <RichText text={t(block.en, block.zh)} />;
      case "define":
        return (
          <div className={styles.define}>
            <div className={styles.defineHead}>
              <span className={`jp ${styles.defineTerm}`}>{block.term}</span>
              {block.reading && (
                <span className={`jp ${styles.defineReading}`}>
                  {block.reading}
                </span>
              )}
              {block.romaji && (
                <span className={styles.defineRomaji}>{block.romaji}</span>
              )}
            </div>
            <p className={styles.defineBody}>{renderInline(t(block.en, block.zh))}</p>
          </div>
        );
      case "compare":
        return (
          <div className={styles.compare}>
            <div className={styles.compareJpRow}>
              <span className={`jp ${styles.compareJp}`}>{block.jp}</span>
              {block.reading && (
                <span className={`jp ${styles.compareReading}`}>
                  {block.reading}
                </span>
              )}
            </div>
            <div className={styles.compareGloss}>{t(block.en, block.zh)}</div>
            <CodeBlock code={lang === "zh" ? block.tsZh : block.tsEn} />
            {(block.noteEn || block.noteZh) && (
              <p className={styles.compareNote}>
                {renderInline(t(block.noteEn ?? "", block.noteZh ?? ""))}
              </p>
            )}
          </div>
        );
      case "breakdown":
        return (
          <div className={styles.breakdown}>
            <div className={styles.breakdownHead}>
              <span className={`jp ${styles.breakdownJp}`}>{block.jp}</span>
              {block.reading && (
                <span className={`jp ${styles.breakdownReading}`}>
                  {block.reading}
                </span>
              )}
              <span className={styles.breakdownGloss}>{t(block.en, block.zh)}</span>
            </div>
            <div className={styles.breakdownLayers}>
              {block.layers.map((ly, k) => (
                <div
                  key={k}
                  className={styles.breakdownLayer}
                  style={{ marginLeft: `${(ly.depth ?? 0) * 22}px` }}
                >
                  <span className={`jp ${styles.breakdownFragment}`}>
                    {ly.fragment}
                  </span>
                  <span className={styles.breakdownRole}>
                    {renderInline(t(ly.en, ly.zh))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      case "example":
        return (
          <div className={styles.example}>
            <span className={`jp ${styles.exampleJp}`}>{block.jp}</span>
            {block.reading && (
              <span className={`jp ${styles.exampleReading}`}>
                {block.reading}
              </span>
            )}
            <span className={styles.exampleGloss}>
              {renderInline(t(block.en, block.zh))}
            </span>
          </div>
        );
      case "diagram":
        return (
          <div className={styles.diagram}>
            {(block.captionEn || block.captionZh) && (
              <div className={styles.diaCaption}>
                {renderInline(t(block.captionEn ?? "", block.captionZh ?? ""))}
              </div>
            )}
            <div className={styles.diaCanvas}>
              {block.row ? (
                <div className={styles.diaRow}>
                  {block.row.map((n, i) => renderDia(n, `d${i}`))}
                </div>
              ) : block.root ? (
                renderDia(block.root, "d")
              ) : null}
            </div>
          </div>
        );
      case "chapters":
        return <ChapterLinks ids={block.ids} />;
    }
  }

  return (
    <div className={styles.layout}>
      {/* ---- sidebar: article list ---- */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTitle}>{t("Foundations", "原理")}</div>
        <nav className={styles.nav}>
          {ARTICLES.map((a: ConceptArticle) => (
            <button
              key={a.id}
              type="button"
              className={`${styles.articleLink} ${a.id === active?.id ? styles.articleActive : ""}`}
              onClick={() => navigate({ article: a.id })}
            >
              <span className={styles.articleLinkTitle}>
                {t(a.titleEn, a.titleZh)}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* ---- article ---- */}
      <article className={styles.content}>
        {active && (
          <>
            <header className={styles.articleHead}>
              <h2 className={styles.articleTitle}>
                {t(active.titleEn, active.titleZh)}
              </h2>
              <p className={styles.articleTagline}>
                {t(active.taglineEn, active.taglineZh)}
              </p>
              <div className={styles.intro}>
                <RichText text={t(active.introEn, active.introZh)} />
              </div>
            </header>

            {(() => {
              let n = 0;
              return active.sections.map((sec) => {
                const numbered = sec.numbered !== false;
                if (numbered) n += 1;
                return (
                  <section key={sec.id} className={styles.section}>
                    <h3 className={styles.sectionHead}>
                      {numbered && (
                        <span className={styles.principleBadge}>
                          {t("Principle", "原理")} {n}
                        </span>
                      )}
                      <span className={styles.sectionHeading}>
                        {t(sec.headingEn, sec.headingZh)}
                      </span>
                    </h3>
                    {sec.blocks.map((b, i) => (
                      <Block key={i} block={b} />
                    ))}
                  </section>
                );
              });
            })()}
          </>
        )}
      </article>
    </div>
  );
}
