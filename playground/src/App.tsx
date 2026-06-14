import { useState } from "react";
import styles from "./App.module.css";
import TypePlayground from "./components/TypePlayground";
import VerbLab from "./components/VerbLab";
import AdjectiveLab from "./components/AdjectiveLab";
import PhraseBuilder from "./components/PhraseBuilder";
import SentenceGallery from "./components/SentenceGallery";

interface Tab {
  id: string;
  label: string;
  jp: string;
  icon: string;
  render: () => JSX.Element;
}

const TABS: ReadonlyArray<Tab> = [
  { id: "playground", label: "Type Playground", jp: "型で遊ぶ", icon: "⌨️", render: () => <TypePlayground /> },
  { id: "verbs", label: "Verb Lab", jp: "動詞", icon: "🎴", render: () => <VerbLab /> },
  { id: "adjectives", label: "Adjective Lab", jp: "形容詞", icon: "🌈", render: () => <AdjectiveLab /> },
  { id: "phrases", label: "Phrase Builder", jp: "フレーズ", icon: "🧩", render: () => <PhraseBuilder /> },
  { id: "gallery", label: "Sentence Gallery", jp: "例文", icon: "🖼️", render: () => <SentenceGallery /> },
];

export default function App() {
  const [active, setActive] = useState<string>(TABS[0]!.id);
  const tab = TABS.find((t) => t.id === active) ?? TABS[0]!;

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.logo}>🌸</span>
          <div>
            <h1 className={styles.title}>Typed Japanese</h1>
            <p className={styles.tagline}>
              If you can write TypeScript, you can understand Japanese.
            </p>
          </div>
        </div>
        <a
          className={styles.repo}
          href="https://github.com/typedgrammar/typed-japanese"
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>
      </header>

      <nav className={styles.tabs}>
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`${styles.tab} ${t.id === active ? styles.tabActive : ""}`}
            onClick={() => setActive(t.id)}
          >
            <span className={styles.tabIcon}>{t.icon}</span>
            <span className={styles.tabText}>
              <span className={styles.tabLabel}>{t.label}</span>
              <span className={`${styles.tabJp} jp`}>{t.jp}</span>
            </span>
          </button>
        ))}
      </nav>

      <main className={styles.main}>{tab.render()}</main>

      <footer className={styles.footer}>
        <span>
          Built with TypeScript's type system · conjugations computed by the
          compiler itself
        </span>
      </footer>
    </div>
  );
}
