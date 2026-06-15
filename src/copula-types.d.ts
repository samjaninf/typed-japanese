// Copula (だ / です) types
//
// だ is the predicate that turns a 体言 (noun / na-adjective stem) into a
// statement — "X is …". It is NOT a particle: like a verb or an adjective it
// inflects for politeness, tense and polarity, so we model it as a conjugable
// word with `ConjugateCopula<Taigen, Form>`, mirroring `ConjugateVerb` and
// `ConjugateAdjective`.

// Copula conjugation forms
export type CopulaForm =
  | "断定形" // Plain assertive (だ)
  | "丁寧形" // Polite (です)
  | "過去形" // Plain past (だった)
  | "丁寧過去形" // Polite past (でした)
  | "否定形" // Plain negative (ではない)
  | "丁寧否定形" // Polite negative (ではありません)
  | "否定過去形" // Plain negative past (ではなかった)
  | "丁寧否定過去形" // Polite negative past (ではありませんでした)
  | "口語否定形" // Casual negative (じゃない)
  | "口語丁寧否定形" // Casual polite negative (じゃありません)
  | "である形" // Formal written style (である)
  | "て形"; // Connective (で)
// Note: there is deliberately no generic attributive form here. The copula's
// attributive surfaces as な only for 形容動詞 (na-adjectives), not for plain
// nouns (×医者な人 — a noun takes の: 病気の人). That な is scoped to NaAdjective
// in ./adjective-types, not exposed for arbitrary 体言.

// The surface suffix produced by each form, independent of the 体言 it attaches
// to. Use `Copula<Form>` when the predicate stands alone (e.g. a sentence-final
// だ after a nominalizer); use `ConjugateCopula` to bind it to a 体言.
export type Copula<F extends CopulaForm = "断定形"> = F extends "断定形"
  ? "だ"
  : F extends "丁寧形"
  ? "です"
  : F extends "過去形"
  ? "だった"
  : F extends "丁寧過去形"
  ? "でした"
  : F extends "否定形"
  ? "ではない"
  : F extends "丁寧否定形"
  ? "ではありません"
  : F extends "否定過去形"
  ? "ではなかった"
  : F extends "丁寧否定過去形"
  ? "ではありませんでした"
  : F extends "口語否定形"
  ? "じゃない"
  : F extends "口語丁寧否定形"
  ? "じゃありません"
  : F extends "である形"
  ? "である"
  : F extends "て形"
  ? "で"
  : never;

// Predicate a 体言 with the copula: `${Taigen}${Copula<Form>}`.
// Parallels `PhraseWithParticle<Phrase, P>`, but the suffix is a conjugated
// copula rather than a particle.
export type ConjugateCopula<
  Taigen extends string,
  F extends CopulaForm = "断定形"
> = `${Taigen}${Copula<F>}`;

// Example usage
type 医者断定 = ConjugateCopula<"医者", "断定形">; // "医者だ"
type 医者丁寧否定 = ConjugateCopula<"医者", "丁寧否定形">; // "医者ではありません"
type 学生でした = ConjugateCopula<"学生", "丁寧過去形">; // "学生でした"
