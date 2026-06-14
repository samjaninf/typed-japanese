import { useMemo, useState } from "react";
import type {
  AdjectiveConjugationForm,
  ConjugationForm,
} from "../data/conjugation";
import {
  ADJECTIVE_FORMS,
  conjugateAdjective,
  conjugateVerb,
  VERB_FORMS,
} from "../data/conjugation";
import {
  PARTICLES,
  PUNCTUATION,
  SAMPLE_ADJECTIVES,
  SAMPLE_VERBS,
} from "../data/dictionary";
import styles from "./PhraseBuilder.module.css";

/* --------------------------------------------------------------------------
   Part model — a discriminated union mirroring the library's PhrasePart /
   JoinPhrasePartsValue system. Each part carries a stable id; the displayed
   phrase is the concatenation of every part's resolved `value`.
-------------------------------------------------------------------------- */

type NounPart = { id: number; kind: "noun"; text: string };
type VerbPart = {
  id: number;
  kind: "verb";
  entryKey: string;
  form: ConjugationForm;
};
type AdjectivePart = {
  id: number;
  kind: "adjective";
  entryKey: string;
  form: AdjectiveConjugationForm;
};
type ParticlePart = { id: number; kind: "particle"; value: string };
type PunctuationPart = { id: number; kind: "punctuation"; value: string };

type Part =
  | NounPart
  | VerbPart
  | AdjectivePart
  | ParticlePart
  | PunctuationPart;

type PartKind = Part["kind"];

/** Stable id source — deterministic, never Date.now / Math.random. */
let nextId = 0;
const makeId = () => ++nextId;

/* ----- type-chip metadata (the "AST node" labels) ----------------------- */

const KIND_META: Record<
  PartKind,
  { typeName: string; jp: string; icon: string }
> = {
  noun: { typeName: "NounPart", jp: "名詞", icon: "📝" },
  verb: { typeName: "VerbPart", jp: "動詞", icon: "🏃" },
  adjective: { typeName: "AdjectivePart", jp: "形容詞", icon: "🌸" },
  particle: { typeName: "ParticlePart", jp: "助詞", icon: "・" },
  punctuation: { typeName: "PunctuationPart", jp: "句読点", icon: "。" },
};

/* ----- defaults for newly-appended parts -------------------------------- */

const DEFAULT_VERB_FORM: ConjugationForm = "辞書形";
const DEFAULT_ADJ_FORM: AdjectiveConjugationForm = "基本形";

function firstVerbKey(): string {
  const e = SAMPLE_VERBS[0];
  return e ? e.key : "";
}
function firstAdjKey(): string {
  const e = SAMPLE_ADJECTIVES[0];
  return e ? e.key : "";
}
function firstParticle(): string {
  const e = PARTICLES[0];
  return e ? e.particle : "";
}
function firstPunctuation(): string {
  const e = PUNCTUATION[0];
  return e ? e.particle : "";
}

function makeDefaultPart(kind: PartKind): Part {
  switch (kind) {
    case "noun":
      return { id: makeId(), kind: "noun", text: "言葉" };
    case "verb":
      return {
        id: makeId(),
        kind: "verb",
        entryKey: firstVerbKey(),
        form: DEFAULT_VERB_FORM,
      };
    case "adjective":
      return {
        id: makeId(),
        kind: "adjective",
        entryKey: firstAdjKey(),
        form: DEFAULT_ADJ_FORM,
      };
    case "particle":
      return { id: makeId(), kind: "particle", value: firstParticle() };
    case "punctuation":
      return {
        id: makeId(),
        kind: "punctuation",
        value: firstPunctuation(),
      };
  }
}

/* ----- value resolution (the JoinPhrasePartsValue analogue) ------------- */

interface Resolved {
  /** rendered string, or null when the type system maps the combo to never */
  value: string | null;
  /** human-readable source description, like an AST leaf label */
  source: string;
}

function resolvePart(part: Part): Resolved {
  switch (part.kind) {
    case "noun":
      return { value: part.text, source: `noun "${part.text}"` };
    case "verb": {
      const entry = SAMPLE_VERBS.find((v) => v.key === part.entryKey);
      if (!entry) return { value: null, source: "verb (unknown)" };
      return {
        value: conjugateVerb(entry.verb, part.form),
        source: `${entry.key} → ${part.form}`,
      };
    }
    case "adjective": {
      const entry = SAMPLE_ADJECTIVES.find((a) => a.key === part.entryKey);
      if (!entry) return { value: null, source: "adjective (unknown)" };
      return {
        value: conjugateAdjective(entry.adjective, part.form),
        source: `${entry.key} → ${part.form}`,
      };
    }
    case "particle":
      return { value: part.value, source: `particle ${part.value}` };
    case "punctuation":
      return { value: part.value, source: `punctuation ${part.value}` };
  }
}

/* ----- seed: いいよ来いよ (from the phrase-types.d.ts example) ----------- */

function seedParts(): Part[] {
  return [
    { id: makeId(), kind: "adjective", entryKey: "いい", form: "基本形" },
    { id: makeId(), kind: "particle", value: "よ" },
    { id: makeId(), kind: "verb", entryKey: "来る", form: "命令形" },
    { id: makeId(), kind: "particle", value: "よ" },
  ];
}

const TOOLBAR: ReadonlyArray<{ kind: PartKind; label: string }> = [
  { kind: "noun", label: "Noun" },
  { kind: "verb", label: "Verb" },
  { kind: "adjective", label: "Adjective" },
  { kind: "particle", label: "Particle" },
  { kind: "punctuation", label: "Punctuation" },
];

export default function PhraseBuilder() {
  const [parts, setParts] = useState<Part[]>(seedParts);

  const resolved = useMemo(
    () => parts.map((p) => ({ part: p, ...resolvePart(p) })),
    [parts]
  );

  const assembled = useMemo(
    () => resolved.map((r) => r.value ?? "").join(""),
    [resolved]
  );

  const hasError = resolved.some((r) => r.value === null);

  /* ----- mutations ------------------------------------------------------ */

  const addPart = (kind: PartKind) =>
    setParts((prev) => [...prev, makeDefaultPart(kind)]);

  const removePart = (id: number) =>
    setParts((prev) => prev.filter((p) => p.id !== id));

  const updatePart = (id: number, patch: Partial<Part>) =>
    setParts((prev) =>
      prev.map((p) => (p.id === id ? ({ ...p, ...patch } as Part) : p))
    );

  const movePart = (index: number, dir: -1 | 1) =>
    setParts((prev) => {
      const target = index + dir;
      if (target < 0 || target >= prev.length) return prev;
      const next = prev.slice();
      const a = next[index];
      const b = next[target];
      if (!a || !b) return prev;
      next[index] = b;
      next[target] = a;
      return next;
    });

  const reset = () => setParts(seedParts());

  return (
    <section className={styles.wrap}>
      {/* assembled result --------------------------------------------- */}
      <div className={`tj-card ${styles.resultCard}`}>
        <span className="tj-label">Assembled phrase · JoinPhrasePartsValue</span>
        {assembled ? (
          <div className={`jp ${styles.assembled}`}>{assembled}</div>
        ) : (
          <div className={styles.assembledEmpty}>
            Add parts below to compose a phrase.
          </div>
        )}
        <div className={styles.resultMeta}>
          <span className="tj-chip">
            {parts.length} part{parts.length === 1 ? "" : "s"}
          </span>
          {hasError && (
            <span className={`tj-chip ${styles.errChip}`}>
              ⚠ a part resolves to never
            </span>
          )}
        </div>
      </div>

      {/* toolbar ------------------------------------------------------- */}
      <div className={styles.toolbar}>
        {TOOLBAR.map((t) => (
          <button
            key={t.kind}
            type="button"
            className="tj-btn"
            onClick={() => addPart(t.kind)}
          >
            + {t.label}
          </button>
        ))}
        <button
          type="button"
          className={`tj-btn ${styles.resetBtn}`}
          onClick={reset}
        >
          ↺ Reset
        </button>
      </div>

      {/* editable rows ------------------------------------------------- */}
      <div className={styles.rows}>
        {resolved.length === 0 && (
          <p className="tj-subtle">No parts yet — start with the buttons above.</p>
        )}
        {resolved.map(({ part, value, source }, index) => {
          const meta = KIND_META[part.kind];
          return (
            <div key={part.id} className={`tj-card ${styles.row}`}>
              <div className={styles.rowHead}>
                <span className="tj-chip">
                  <span aria-hidden>{meta.icon}</span>
                  {meta.typeName} <span className="jp">{meta.jp}</span>
                </span>
                <div className={styles.rowControls}>
                  <button
                    type="button"
                    className={styles.iconBtn}
                    onClick={() => movePart(index, -1)}
                    disabled={index === 0}
                    aria-label="Move up"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className={styles.iconBtn}
                    onClick={() => movePart(index, 1)}
                    disabled={index === resolved.length - 1}
                    aria-label="Move down"
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className={`${styles.iconBtn} ${styles.removeBtn}`}
                    onClick={() => removePart(part.id)}
                    aria-label="Remove part"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className={styles.rowBody}>
                <div className={styles.fields}>
                  <PartFields part={part} update={updatePart} />
                </div>
                <div className={styles.valueBox}>
                  <span className="tj-label">value</span>
                  {value === null ? (
                    <span className={styles.valueNever}>never</span>
                  ) : (
                    <span className={`jp ${styles.valueText}`}>
                      {value === "" ? "—" : value}
                    </span>
                  )}
                  <span className={styles.sourceText}>{source}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* structure (AST-ish) view ------------------------------------- */}
      <div className={`tj-card ${styles.structureCard}`}>
        <h3 className="tj-panel-title">Structure</h3>
        <p className="tj-subtle">
          Ordered breakdown — each node and its resolved surface, joined into the
          phrase above.
        </p>
        <ol className={styles.structureList}>
          {resolved.map(({ part, value, source }) => {
            const meta = KIND_META[part.kind];
            return (
              <li key={part.id} className={styles.structureItem}>
                <code className="tj-code">{meta.typeName}</code>
                <span className={styles.structureSource}>{source}</span>
                <span className={styles.structureArrow}>→</span>
                {value === null ? (
                  <span className={styles.valueNever}>never</span>
                ) : (
                  <span className={`jp ${styles.structureValue}`}>
                    {value === "" ? "∅" : value}
                  </span>
                )}
              </li>
            );
          })}
          {resolved.length === 0 && (
            <li className="tj-subtle">empty phrase</li>
          )}
        </ol>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Per-kind editing fields
-------------------------------------------------------------------------- */

function PartFields({
  part,
  update,
}: {
  part: Part;
  update: (id: number, patch: Partial<Part>) => void;
}) {
  switch (part.kind) {
    case "noun":
      return (
        <label className={styles.field}>
          <span className="tj-label">Text</span>
          <input
            className={`tj-input jp ${styles.grow}`}
            value={part.text}
            placeholder="自由入力 (free text)"
            onChange={(e) => update(part.id, { text: e.target.value })}
          />
        </label>
      );

    case "verb":
      return (
        <>
          <label className={styles.field}>
            <span className="tj-label">Verb</span>
            <select
              className="tj-select"
              value={part.entryKey}
              onChange={(e) => update(part.id, { entryKey: e.target.value })}
            >
              {SAMPLE_VERBS.map((v) => (
                <option key={v.key} value={v.key}>
                  {v.key} — {v.en}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span className="tj-label">Form 活用形</span>
            <select
              className="tj-select"
              value={part.form}
              onChange={(e) =>
                update(part.id, { form: e.target.value as ConjugationForm })
              }
            >
              {VERB_FORMS.map((f) => (
                <option key={f.form} value={f.form}>
                  {f.form} · {f.en}
                </option>
              ))}
            </select>
          </label>
        </>
      );

    case "adjective":
      return (
        <>
          <label className={styles.field}>
            <span className="tj-label">Adjective</span>
            <select
              className="tj-select"
              value={part.entryKey}
              onChange={(e) => update(part.id, { entryKey: e.target.value })}
            >
              {SAMPLE_ADJECTIVES.map((a) => (
                <option key={a.key} value={a.key}>
                  {a.key} — {a.en}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span className="tj-label">Form 活用形</span>
            <select
              className="tj-select"
              value={part.form}
              onChange={(e) =>
                update(part.id, {
                  form: e.target.value as AdjectiveConjugationForm,
                })
              }
            >
              {ADJECTIVE_FORMS.map((f) => (
                <option key={f.form} value={f.form}>
                  {f.form} · {f.en}
                </option>
              ))}
            </select>
          </label>
        </>
      );

    case "particle":
      return (
        <label className={styles.field}>
          <span className="tj-label">Particle 助詞</span>
          <select
            className="tj-select"
            value={part.value}
            onChange={(e) => update(part.id, { value: e.target.value })}
          >
            {PARTICLES.map((p) => (
              <option key={p.particle} value={p.particle}>
                {p.particle} — {p.en}
              </option>
            ))}
          </select>
        </label>
      );

    case "punctuation":
      return (
        <label className={styles.field}>
          <span className="tj-label">Mark 句読点</span>
          <select
            className="tj-select"
            value={part.value}
            onChange={(e) => update(part.id, { value: e.target.value })}
          >
            {PUNCTUATION.map((p) => (
              <option key={p.particle} value={p.particle}>
                {p.particle} — {p.en}
              </option>
            ))}
          </select>
        </label>
      );
  }
}
