// Copula (だ / です) types
//
// だ is the predicate that turns a 体言 (noun / na-adjective stem) into a
// statement — "X is …". It is NOT a particle: like a verb or an adjective it
// inflects for politeness, tense and polarity, so we model it as a conjugable
// word with `ConjugateCopula<Taigen, Form>`, mirroring `ConjugateVerb` and
// `ConjugateAdjective`.

// Copula conjugation forms
export type CopulaForm =
  | "Plain" // Plain assertive (だ)
  | "Polite" // Polite (です)
  | "Past" // Plain past (だった)
  | "PolitePast" // Polite past (でした)
  | "Negative" // Plain negative (ではない)
  | "PoliteNegative" // Polite negative (ではありません)
  | "NegativePast" // Plain negative past (ではなかった)
  | "PoliteNegativePast" // Polite negative past (ではありませんでした)
  | "CasualNegative" // Casual negative (じゃない)
  | "CasualPoliteNegative" // Casual polite negative (じゃありません)
  | "Written" // Formal written style (である)
  | "Te"; // Connective (で)
// Note: there is deliberately no generic attributive form here. The copula's
// attributive surfaces as な only for 形容動詞 (na-adjectives), not for plain
// nouns (×医者な人 — a noun takes の: 病気の人). That な is scoped to NaAdjective
// in ./adjective-types, not exposed for arbitrary 体言.

// The surface suffix produced by each form, independent of the 体言 it attaches
// to. Use `Copula<Form>` when the predicate stands alone (e.g. a sentence-final
// だ after a nominalizer); use `ConjugateCopula` to bind it to a 体言.
export type Copula<F extends CopulaForm = "Plain"> = F extends "Plain"
  ? "だ"
  : F extends "Polite"
  ? "です"
  : F extends "Past"
  ? "だった"
  : F extends "PolitePast"
  ? "でした"
  : F extends "Negative"
  ? "ではない"
  : F extends "PoliteNegative"
  ? "ではありません"
  : F extends "NegativePast"
  ? "ではなかった"
  : F extends "PoliteNegativePast"
  ? "ではありませんでした"
  : F extends "CasualNegative"
  ? "じゃない"
  : F extends "CasualPoliteNegative"
  ? "じゃありません"
  : F extends "Written"
  ? "である"
  : F extends "Te"
  ? "で"
  : never;

// Predicate a 体言 with the copula: `${Taigen}${Copula<Form>}`.
// Parallels `PhraseWithParticle<Phrase, P>`, but the suffix is a conjugated
// copula rather than a particle.
export type ConjugateCopula<
  Taigen extends string,
  F extends CopulaForm = "Plain"
> = `${Taigen}${Copula<F>}`;

// Example usage
type 医者断定 = ConjugateCopula<"医者", "Plain">; // "医者だ"
type 医者丁寧否定 = ConjugateCopula<"医者", "PoliteNegative">; // "医者ではありません"
type 学生でした = ConjugateCopula<"学生", "PolitePast">; // "学生でした"
