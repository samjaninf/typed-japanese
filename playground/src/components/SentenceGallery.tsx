import { useState } from "react";
import type { ShowcaseSentence } from "../data/examples";
import { SHOWCASE } from "../data/examples";
import styles from "./SentenceGallery.module.css";

function SentenceCard({ sentence }: { sentence: ShowcaseSentence }) {
  const [selected, setSelected] = useState(0);

  const active = sentence.parts[selected];

  return (
    <article className={`tj-card ${styles.card}`}>
      <header className={styles.head}>
        <p className={`jp ${styles.jp}`}>{sentence.jp}</p>
        {sentence.reading ? (
          <p className={`jp ${styles.reading}`}>{sentence.reading}</p>
        ) : null}
        <p className={styles.en}>{sentence.en}</p>
        {sentence.zh ? (
          <p className={`jp ${styles.zh}`}>{sentence.zh}</p>
        ) : null}
      </header>

      <div className={styles.breakdown}>
        <span className="tj-label">Reconstructed</span>
        <p className={`jp ${styles.reconstructed}`} aria-hidden="true">
          {sentence.parts.map((part, i) => (
            <span
              key={i}
              className={i === selected ? styles.reconHi : undefined}
            >
              {part.surface}
            </span>
          ))}
        </p>

        <span className="tj-label">Tokens</span>
        <div className={styles.tokens} role="list">
          {sentence.parts.map((part, i) => (
            <button
              key={i}
              type="button"
              role="listitem"
              className={`jp ${styles.token} ${
                i === selected ? styles.tokenActive : ""
              }`}
              onClick={() => setSelected(i)}
              onMouseEnter={() => setSelected(i)}
              aria-pressed={i === selected}
            >
              {part.surface}
            </button>
          ))}
        </div>

        <div className={styles.detail}>
          {active ? (
            <>
              <div className={styles.detailHead}>
                <span className={`jp ${styles.detailSurface}`}>
                  {active.surface}
                </span>
                <span className="tj-chip">{active.role}</span>
              </div>
              <p className={styles.note}>{active.note}</p>
            </>
          ) : (
            <p className={styles.note}>Hover a token to inspect it.</p>
          )}
        </div>
      </div>

      <footer className={styles.foot}>
        <span className="tj-chip">{sentence.source}</span>
      </footer>
    </article>
  );
}

export default function SentenceGallery() {
  return (
    <section className={styles.gallery}>
      <header className={styles.intro}>
        <h2 className="tj-panel-title">Sentence gallery</h2>
        <p className="tj-subtle">
          Showcase sentences decomposed into their grammatical parts. Hover or
          tap a token to see the role it plays and how the pieces rebuild the
          whole sentence.
        </p>
      </header>

      <div className={styles.grid}>
        {SHOWCASE.map((sentence) => (
          <SentenceCard key={sentence.id} sentence={sentence} />
        ))}
      </div>
    </section>
  );
}
