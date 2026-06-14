import { useMemo, useState } from "react";
import type {
  GodanEnding,
  IrregularDictionary,
  Verb,
  VerbClass,
} from "../data/conjugation";
import {
  conjugateVerb,
  GODAN_ENDINGS,
  VERB_FORMS,
} from "../data/conjugation";
import { SAMPLE_VERBS, VERB_CLASS_LABELS } from "../data/dictionary";
import styles from "./VerbLab.module.css";

type Mode = "preset" | "custom";

const IRREGULAR_DICTIONARIES: ReadonlyArray<IrregularDictionary> = [
  "する",
  "来る",
  "くる",
];

const DEFAULT_VERB: Verb = { type: "godan", stem: "話", ending: "す" };

/** Build the TypeScript type declaration string for a verb. */
function verbTypeDeclaration(verb: Verb): string {
  const dictionary = conjugateVerb(verb, "辞書形") ?? "?";
  if (verb.type === "godan") {
    return `type ${dictionary} = GodanVerb & { stem: "${verb.stem}"; ending: "${verb.ending}" };`;
  }
  if (verb.type === "ichidan") {
    return `type ${dictionary} = IchidanVerb & { stem: "${verb.stem}"; ending: "る" };`;
  }
  return `type ${dictionary} = IrregularVerb & { dictionary: "${verb.dictionary}" };`;
}

export default function VerbLab() {
  const [mode, setMode] = useState<Mode>("preset");
  const [verb, setVerb] = useState<Verb>(DEFAULT_VERB);

  // Which preset is currently selected (by key); empty if none matches.
  const presetKey = useMemo(() => {
    const dict = conjugateVerb(verb, "辞書形");
    const match = SAMPLE_VERBS.find((entry) => entry.key === dict);
    return match ? match.key : "";
  }, [verb]);

  const presetGloss = useMemo(() => {
    const match = SAMPLE_VERBS.find((entry) => entry.key === presetKey);
    return match ? match.en : null;
  }, [presetKey]);

  const dictionaryForm = conjugateVerb(verb, "辞書形") ?? "—";
  const classLabel = VERB_CLASS_LABELS[verb.type];
  const typeDecl = verbTypeDeclaration(verb);

  function selectPreset(key: string) {
    const match = SAMPLE_VERBS.find((entry) => entry.key === key);
    if (match) setVerb(match.verb);
  }

  function changeClass(next: VerbClass) {
    if (next === "godan") {
      setVerb({ type: "godan", stem: "話", ending: "す" });
    } else if (next === "ichidan") {
      setVerb({ type: "ichidan", stem: "食べ", ending: "る" });
    } else {
      setVerb({ type: "irregular", dictionary: "する" });
    }
  }

  function changeStem(stem: string) {
    setVerb((prev) => {
      if (prev.type === "godan") return { ...prev, stem };
      if (prev.type === "ichidan") return { ...prev, stem };
      return prev;
    });
  }

  function changeGodanEnding(ending: GodanEnding) {
    setVerb((prev) =>
      prev.type === "godan" ? { ...prev, ending } : prev
    );
  }

  function changeIrregular(dictionary: IrregularDictionary) {
    setVerb({ type: "irregular", dictionary });
  }

  return (
    <section className={styles.lab}>
      {/* ---- Builder card ------------------------------------------------ */}
      <div className={`tj-card ${styles.builder}`}>
        <div className={styles.modeRow}>
          <button
            type="button"
            className={`tj-btn ${mode === "preset" ? "tj-btn--primary" : ""}`}
            aria-pressed={mode === "preset"}
            onClick={() => setMode("preset")}
          >
            Preset verb
          </button>
          <button
            type="button"
            className={`tj-btn ${mode === "custom" ? "tj-btn--primary" : ""}`}
            aria-pressed={mode === "custom"}
            onClick={() => setMode("custom")}
          >
            Build custom
          </button>
        </div>

        {mode === "preset" ? (
          <div className={styles.field}>
            <label className="tj-label" htmlFor="verblab-preset">
              Sample verb
            </label>
            <select
              id="verblab-preset"
              className="tj-select jp"
              value={presetKey}
              onChange={(e) => selectPreset(e.target.value)}
            >
              {presetKey === "" && (
                <option value="">— custom (not a preset) —</option>
              )}
              {SAMPLE_VERBS.map((entry) => (
                <option key={entry.key} value={entry.key}>
                  {entry.key} — {entry.en}
                </option>
              ))}
            </select>
            {presetGloss && (
              <p className={`tj-subtle ${styles.gloss}`}>{presetGloss}</p>
            )}
          </div>
        ) : (
          <div className={styles.customGrid}>
            <div className={styles.field}>
              <label className="tj-label" htmlFor="verblab-class">
                Verb class
              </label>
              <select
                id="verblab-class"
                className="tj-select"
                value={verb.type}
                onChange={(e) => changeClass(e.target.value as VerbClass)}
              >
                {(Object.keys(VERB_CLASS_LABELS) as VerbClass[]).map((cls) => (
                  <option key={cls} value={cls}>
                    {VERB_CLASS_LABELS[cls]}
                  </option>
                ))}
              </select>
            </div>

            {verb.type === "godan" && (
              <>
                <div className={styles.field}>
                  <label className="tj-label" htmlFor="verblab-stem">
                    Stem
                  </label>
                  <input
                    id="verblab-stem"
                    className="tj-input jp"
                    value={verb.stem}
                    onChange={(e) => changeStem(e.target.value)}
                    placeholder="話"
                  />
                </div>
                <div className={styles.field}>
                  <label className="tj-label" htmlFor="verblab-ending">
                    Ending
                  </label>
                  <select
                    id="verblab-ending"
                    className="tj-select jp"
                    value={verb.ending}
                    onChange={(e) =>
                      changeGodanEnding(e.target.value as GodanEnding)
                    }
                  >
                    {GODAN_ENDINGS.map((end) => (
                      <option key={end} value={end}>
                        {end}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {verb.type === "ichidan" && (
              <>
                <div className={styles.field}>
                  <label className="tj-label" htmlFor="verblab-stem">
                    Stem
                  </label>
                  <input
                    id="verblab-stem"
                    className="tj-input jp"
                    value={verb.stem}
                    onChange={(e) => changeStem(e.target.value)}
                    placeholder="食べ"
                  />
                </div>
                <div className={styles.field}>
                  <span className="tj-label">Ending (fixed)</span>
                  <div className={`tj-input jp ${styles.fixedEnding}`}>る</div>
                </div>
              </>
            )}

            {verb.type === "irregular" && (
              <div className={styles.field}>
                <label className="tj-label" htmlFor="verblab-irregular">
                  Dictionary form
                </label>
                <select
                  id="verblab-irregular"
                  className="tj-select jp"
                  value={verb.dictionary}
                  onChange={(e) =>
                    changeIrregular(e.target.value as IrregularDictionary)
                  }
                >
                  {IRREGULAR_DICTIONARIES.map((dict) => (
                    <option key={dict} value={dict}>
                      {dict}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ---- Headline ---------------------------------------------------- */}
      <div className={`tj-card ${styles.headline}`}>
        <div className={styles.headlineMain}>
          <span className="tj-subtle">Dictionary form / 辞書形</span>
          <span className={`tj-result jp ${styles.bigForm}`}>
            {dictionaryForm}
          </span>
        </div>
        <span className={`tj-chip jp ${styles.classChip}`}>{classLabel}</span>
      </div>

      {/* ---- Type declaration ------------------------------------------- */}
      <div className={`tj-card ${styles.typeCard}`}>
        <span className="tj-label">TypeScript type</span>
        <pre className={styles.typeBlock}>
          <code className="jp">{typeDecl}</code>
        </pre>
      </div>

      {/* ---- Conjugation table ------------------------------------------ */}
      <div className={`tj-card ${styles.tableCard}`}>
        <span className="tj-label">Conjugation table</span>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Form</th>
                <th>English</th>
                <th>Romaji</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {VERB_FORMS.map(({ form, en, romaji }) => {
                const value = conjugateVerb(verb, form);
                const isDict = form === "辞書形";
                return (
                  <tr
                    key={form}
                    className={isDict ? styles.dictRow : undefined}
                  >
                    <td className="jp">{form}</td>
                    <td className={styles.enCell}>{en}</td>
                    <td className={styles.romajiCell}>{romaji}</td>
                    <td>
                      {value === null ? (
                        <span className={styles.notDefined}>
                          —
                          <span className={styles.notDefinedHint}>
                            not defined
                          </span>
                        </span>
                      ) : (
                        <span className={`jp ${styles.resultCell}`}>
                          {value}
                        </span>
                      )}
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
