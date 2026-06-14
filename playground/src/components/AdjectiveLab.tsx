import { useMemo, useState } from "react";
import type {
  Adjective,
  AdjectiveClass,
} from "../data/conjugation";
import { ADJECTIVE_FORMS, conjugateAdjective } from "../data/conjugation";
import { SAMPLE_ADJECTIVES } from "../data/dictionary";
import styles from "./AdjectiveLab.module.css";

type Mode = "preset" | "custom";

const CLASS_LABEL: Record<AdjectiveClass, string> = {
  "i-adjective": "い形容詞",
  "na-adjective": "な形容詞",
};

const DEFAULT_PRESET_KEY = "いい";

/** Build the TS type-declaration string for the current adjective. */
function typeDeclaration(adj: Adjective): string {
  if (adj.type === "i-adjective") {
    const name = `${adj.stem}${adj.ending}`;
    const irr = adj.irregular ? "; irregular: true" : "";
    return `type ${name} = IAdjective & { stem: "${adj.stem}"; ending: "${adj.ending}"${irr} };`;
  }
  return `type ${adj.stem} = NaAdjective & { stem: "${adj.stem}" };`;
}

export default function AdjectiveLab() {
  const [mode, setMode] = useState<Mode>("preset");
  const [presetKey, setPresetKey] = useState<string>(DEFAULT_PRESET_KEY);

  // Custom-mode state.
  const [customClass, setCustomClass] = useState<AdjectiveClass>("i-adjective");
  const [iStem, setIStem] = useState<string>("楽し");
  const [iIrregular, setIIrregular] = useState<boolean>(false);
  const [naStem, setNaStem] = useState<string>("綺麗");

  const presetEntry = useMemo(
    () => SAMPLE_ADJECTIVES.find((e) => e.key === presetKey),
    [presetKey]
  );

  const adjective: Adjective = useMemo(() => {
    if (mode === "preset") {
      // Guard the find(); fall back to the first sample if missing.
      return presetEntry?.adjective ?? SAMPLE_ADJECTIVES[0]?.adjective ?? {
        type: "i-adjective",
        stem: "い",
        ending: "い",
        irregular: true,
      };
    }
    if (customClass === "i-adjective") {
      return {
        type: "i-adjective",
        stem: iStem || "",
        ending: "い",
        ...(iIrregular ? { irregular: true } : {}),
      };
    }
    return { type: "na-adjective", stem: naStem || "" };
  }, [mode, presetEntry, customClass, iStem, iIrregular, naStem]);

  const adjClass: AdjectiveClass = adjective.type;
  const basic = conjugateAdjective(adjective, "基本形");
  const decl = typeDeclaration(adjective);

  const en =
    mode === "preset" ? presetEntry?.en : undefined;

  return (
    <section className={styles.lab}>
      {/* ---- Selection panel -------------------------------------------- */}
      <div className={`tj-card ${styles.controls}`}>
        <div className={styles.modeRow}>
          <button
            type="button"
            className={`tj-btn ${mode === "preset" ? "tj-btn--primary" : ""}`}
            onClick={() => setMode("preset")}
            aria-pressed={mode === "preset"}
          >
            Preset
          </button>
          <button
            type="button"
            className={`tj-btn ${mode === "custom" ? "tj-btn--primary" : ""}`}
            onClick={() => setMode("custom")}
            aria-pressed={mode === "custom"}
          >
            Custom
          </button>
        </div>

        {mode === "preset" ? (
          <div className={styles.field}>
            <label className="tj-label" htmlFor="adj-preset">
              Sample adjective
            </label>
            <select
              id="adj-preset"
              className="tj-select jp"
              value={presetKey}
              onChange={(e) => setPresetKey(e.target.value)}
            >
              {SAMPLE_ADJECTIVES.map((e) => (
                <option key={e.key} value={e.key}>
                  {e.key} — {e.en}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className={styles.customGrid}>
            <div className={styles.field}>
              <label className="tj-label" htmlFor="adj-class">
                Adjective class
              </label>
              <select
                id="adj-class"
                className="tj-select"
                value={customClass}
                onChange={(e) =>
                  setCustomClass(e.target.value as AdjectiveClass)
                }
              >
                <option value="i-adjective">い形容詞 (i-adjective)</option>
                <option value="na-adjective">な形容詞 (na-adjective)</option>
              </select>
            </div>

            {customClass === "i-adjective" ? (
              <>
                <div className={styles.field}>
                  <label className="tj-label" htmlFor="adj-istem">
                    Stem
                  </label>
                  <div className={styles.stemRow}>
                    <input
                      id="adj-istem"
                      className="tj-input jp"
                      value={iStem}
                      placeholder="楽し"
                      onChange={(e) => setIStem(e.target.value)}
                      disabled={iIrregular}
                    />
                    <span className={`tj-chip jp ${styles.endingChip}`}>
                      + い
                    </span>
                  </div>
                </div>
                <div className={styles.field}>
                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      checked={iIrregular}
                      onChange={(e) => {
                        const on = e.target.checked;
                        setIIrregular(on);
                        if (on) setIStem("い");
                      }}
                    />
                    <span>
                      irregular (<span className="jp">いい</span>)
                    </span>
                  </label>
                </div>
              </>
            ) : (
              <div className={styles.field}>
                <label className="tj-label" htmlFor="adj-nastem">
                  Stem
                </label>
                <input
                  id="adj-nastem"
                  className="tj-input jp"
                  value={naStem}
                  placeholder="綺麗"
                  onChange={(e) => setNaStem(e.target.value)}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* ---- Headline --------------------------------------------------- */}
      <div className={`tj-card ${styles.headline}`}>
        <div className={styles.headlineMain}>
          <span className={`tj-result ${styles.basic}`}>{basic ?? "—"}</span>
          <span className={`tj-chip jp ${styles.classChip}`}>
            {CLASS_LABEL[adjClass]}
          </span>
        </div>
        {en ? <p className={`tj-subtle ${styles.gloss}`}>{en}</p> : null}
        <code className={`tj-code jp ${styles.decl}`}>{decl}</code>
      </div>

      {/* ---- Conjugation table ------------------------------------------ */}
      <div className={`tj-card ${styles.tableCard}`}>
        <h2 className="tj-panel-title">Conjugations</h2>
        <p className="tj-subtle">
          Computed via <code className="tj-code">conjugateAdjective</code>.
        </p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thForm}>Form</th>
                <th>English</th>
                <th>Romaji</th>
                <th className={styles.thValue}>Result</th>
              </tr>
            </thead>
            <tbody>
              {ADJECTIVE_FORMS.map((f) => {
                const value = conjugateAdjective(adjective, f.form);
                return (
                  <tr key={f.form}>
                    <td className={`jp ${styles.formName}`}>{f.form}</td>
                    <td className={styles.en}>{f.en}</td>
                    <td className={styles.romaji}>{f.romaji}</td>
                    <td className={`jp ${styles.value}`}>
                      {value ?? <span className={styles.none}>—</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
