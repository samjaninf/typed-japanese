/**
 * Runtime conjugation engine.
 *
 * This is a faithful 1:1 mirror of the type-level logic in
 *   ../../../src/verb-types.d.ts
 *   ../../../src/adjective-types.d.ts
 *
 * The library does all of this in TypeScript's *type system*; here we replay the
 * exact same maps and rules at runtime so the interactive panels can render
 * results without invoking the compiler. The Type Playground tab shows the real
 * type-level computation (via Monaco) — these tables are the same answers,
 * computed eagerly.
 *
 * If you change a conjugation map in src/*.d.ts, change it here too.
 */

// ----------------------------------------------------------------------------
// Verbs
// ----------------------------------------------------------------------------

export type VerbClass = "godan" | "ichidan" | "irregular";

export type GodanEnding =
  | "う"
  | "く"
  | "ぐ"
  | "す"
  | "つ"
  | "ぬ"
  | "ぶ"
  | "む"
  | "る";

export type IrregularDictionary = "する" | "来る" | "くる";

export type GodanVerb = { type: "godan"; stem: string; ending: GodanEnding };
export type IchidanVerb = { type: "ichidan"; stem: string; ending: "る" };
export type IrregularVerb = { type: "irregular"; dictionary: IrregularDictionary };
export type Verb = GodanVerb | IchidanVerb | IrregularVerb;

export type ConjugationForm =
  | "辞書形"
  | "ます形"
  | "て形"
  | "た形"
  | "ない形"
  | "可能形"
  | "受身形"
  | "使役形"
  | "意向形"
  | "命令形"
  | "条件形"
  | "仮定形";

/** Ordered list of verb forms with bilingual labels, for rendering tables. */
export const VERB_FORMS: ReadonlyArray<{
  form: ConjugationForm;
  en: string;
  romaji: string;
}> = [
  { form: "辞書形", en: "Dictionary", romaji: "jisho-kei" },
  { form: "ます形", en: "Polite", romaji: "masu-kei" },
  { form: "て形", en: "Te-form", romaji: "te-kei" },
  { form: "た形", en: "Past", romaji: "ta-kei" },
  { form: "ない形", en: "Negative", romaji: "nai-kei" },
  { form: "可能形", en: "Potential", romaji: "kanou-kei" },
  { form: "受身形", en: "Passive", romaji: "ukemi-kei" },
  { form: "使役形", en: "Causative", romaji: "shieki-kei" },
  { form: "意向形", en: "Volitional", romaji: "ikou-kei" },
  { form: "命令形", en: "Imperative", romaji: "meirei-kei" },
  { form: "条件形", en: "Conditional", romaji: "jouken-kei" },
  { form: "仮定形", en: "Hypothetical", romaji: "katei-kei" },
];

export const GODAN_ENDINGS: ReadonlyArray<GodanEnding> = [
  "う",
  "く",
  "ぐ",
  "す",
  "つ",
  "ぬ",
  "ぶ",
  "む",
  "る",
];

type FormSuffixMap = Partial<Record<ConjugationForm, string>>;

// Mirror of GodanConjugationMap in verb-types.d.ts (suffix appended to the stem).
const GODAN_MAP: Record<GodanEnding, FormSuffixMap> = {
  う: { ます形: "い", て形: "って", た形: "った", ない形: "わ", 可能形: "え", 受身形: "わ", 使役形: "わ", 意向形: "お", 命令形: "え", 条件形: "え", 仮定形: "え" },
  く: { ます形: "き", て形: "いて", た形: "いた", ない形: "か", 可能形: "け", 受身形: "か", 使役形: "か", 意向形: "こ", 命令形: "け", 条件形: "け", 仮定形: "け" },
  ぐ: { ます形: "ぎ", て形: "いで", た形: "いだ", ない形: "が", 可能形: "げ", 受身形: "が", 使役形: "が", 意向形: "ご", 命令形: "げ", 条件形: "げ", 仮定形: "げ" },
  す: { ます形: "し", て形: "して", た形: "した", ない形: "さ", 可能形: "せ", 受身形: "さ", 使役形: "さ", 意向形: "そ", 命令形: "せ", 条件形: "せ", 仮定形: "せ" },
  つ: { ます形: "ち", て形: "って", た形: "った", ない形: "た", 可能形: "て", 受身形: "た", 使役形: "た", 意向形: "と", 命令形: "て", 条件形: "て", 仮定形: "て" },
  ぬ: { ます形: "に", て形: "んで", た形: "んだ", ない形: "な", 可能形: "ね", 受身形: "な", 使役形: "な", 意向形: "の", 命令形: "ね", 条件形: "ね", 仮定形: "ね" },
  ぶ: { ます形: "び", て形: "んで", た形: "んだ", ない形: "ば", 可能形: "べ", 受身形: "ば", 使役形: "ば", 意向形: "ぼ", 命令形: "べ", 条件形: "べ", 仮定形: "べ" },
  む: { ます形: "み", て形: "んで", た形: "んだ", ない形: "ま", 可能形: "め", 受身形: "ま", 使役形: "ま", 意向形: "も", 命令形: "め", 条件形: "め", 仮定形: "め" },
  る: { ます形: "り", て形: "って", た形: "った", ない形: "ら", 可能形: "れ", 受身形: "ら", 使役形: "ら", 意向形: "ろ", 命令形: "れ", 条件形: "れ", 仮定形: "れ" },
};

// Mirror of IrregularConjugationMap (full surface form, not a suffix).
const IRREGULAR_MAP: Record<IrregularDictionary, Record<ConjugationForm, string>> = {
  する: { 辞書形: "する", ます形: "し", て形: "して", た形: "した", ない形: "し", 可能形: "でき", 受身形: "され", 使役形: "させ", 意向形: "しよう", 命令形: "しろ", 条件形: "すれ", 仮定形: "すれ" },
  来る: { 辞書形: "来る", ます形: "来", て形: "来て", た形: "来た", ない形: "来", 可能形: "来られ", 受身形: "来られ", 使役形: "来させ", 意向形: "来よう", 命令形: "来い", 条件形: "来れ", 仮定形: "来れ" },
  くる: { 辞書形: "くる", ます形: "き", て形: "きて", た形: "きた", ない形: "こ", 可能形: "こられ", 受身形: "こられ", 使役形: "こさせ", 意向形: "こよう", 命令形: "こい", 条件形: "くれ", 仮定形: "くれ" },
};

/**
 * Conjugate a verb into a given form. Returns null for combinations the type
 * system maps to `never` (so the UI can flag them as not defined).
 */
export function conjugateVerb(verb: Verb, form: ConjugationForm): string | null {
  if (verb.type === "godan") {
    if (form === "辞書形") return `${verb.stem}${verb.ending}`;
    const suffix = GODAN_MAP[verb.ending][form];
    return suffix === undefined ? null : `${verb.stem}${suffix}`;
  }

  if (verb.type === "ichidan") {
    switch (form) {
      case "辞書形":
        return `${verb.stem}${verb.ending}`;
      case "ます形":
      case "ない形":
        return `${verb.stem}`;
      case "て形":
        return `${verb.stem}て`;
      case "た形":
        return `${verb.stem}た`;
      case "可能形":
      case "受身形":
      case "使役形":
      case "仮定形":
      case "条件形":
        return `${verb.stem}られ`;
      case "意向形":
        return `${verb.stem}よう`;
      case "命令形":
        return `${verb.stem}ろ`;
      default:
        return null;
    }
  }

  // irregular
  return IRREGULAR_MAP[verb.dictionary][form] ?? null;
}

// ----------------------------------------------------------------------------
// Adjectives
// ----------------------------------------------------------------------------

export type AdjectiveClass = "i-adjective" | "na-adjective";

export type IAdjective = {
  type: "i-adjective";
  stem: string;
  ending: "い";
  irregular?: boolean;
};
export type NaAdjective = { type: "na-adjective"; stem: string };
export type Adjective = IAdjective | NaAdjective;

export type AdjectiveConjugationForm = "基本形" | "丁寧形" | "過去形" | "否定形";

export const ADJECTIVE_FORMS: ReadonlyArray<{
  form: AdjectiveConjugationForm;
  en: string;
  romaji: string;
}> = [
  { form: "基本形", en: "Basic", romaji: "kihon-kei" },
  { form: "丁寧形", en: "Polite", romaji: "teinei-kei" },
  { form: "過去形", en: "Past", romaji: "kako-kei" },
  { form: "否定形", en: "Negative", romaji: "hitei-kei" },
];

// Mirror of IAdjectiveConjugationMap (suffix appended to the stem).
const I_ADJ_MAP: Record<AdjectiveConjugationForm, string> = {
  基本形: "い",
  丁寧形: "いです",
  過去形: "かった",
  否定形: "くない",
};

// Mirror of IrregularAdjectiveMap for いい (full forms; 基本形 falls back to stem+ending).
const IRREGULAR_I_ADJ_MAP: Partial<Record<AdjectiveConjugationForm, string>> = {
  過去形: "よかった",
  否定形: "よくない",
  丁寧形: "いいです",
};

export function conjugateAdjective(
  adj: Adjective,
  form: AdjectiveConjugationForm
): string | null {
  if (adj.type === "i-adjective") {
    if (adj.irregular && adj.stem === "い") {
      if (form === "基本形") return `${adj.stem}${adj.ending}`;
      return IRREGULAR_I_ADJ_MAP[form] ?? `${adj.stem}${I_ADJ_MAP[form]}`;
    }
    if (form === "基本形") return `${adj.stem}${adj.ending}`;
    return `${adj.stem}${I_ADJ_MAP[form]}`;
  }

  // na-adjective
  switch (form) {
    case "基本形":
      return `${adj.stem}な`;
    case "丁寧形":
      return `${adj.stem}です`;
    case "過去形":
      return `${adj.stem}でした`;
    case "否定形":
      return `${adj.stem}ではない`;
    default:
      return null;
  }
}
