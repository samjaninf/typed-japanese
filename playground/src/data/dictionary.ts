/**
 * Sample word dictionaries used to pre-populate the interactive labs.
 * Drawn from the examples in ../../../src/examples.
 */
import type {
  Adjective,
  GodanEnding,
  Verb,
  VerbClass,
} from "./conjugation";

export interface VerbEntry {
  /** Display key (dictionary form), e.g. "話す". */
  key: string;
  en: string;
  verb: Verb;
}

export interface AdjectiveEntry {
  key: string;
  en: string;
  adjective: Adjective;
}

const godan = (stem: string, ending: GodanEnding, en: string): VerbEntry => ({
  key: `${stem}${ending}`,
  en,
  verb: { type: "godan", stem, ending },
});

const ichidan = (stem: string, en: string): VerbEntry => ({
  key: `${stem}る`,
  en,
  verb: { type: "ichidan", stem, ending: "る" },
});

export const SAMPLE_VERBS: ReadonlyArray<VerbEntry> = [
  godan("話", "す", "to speak"),
  godan("書", "く", "to write"),
  godan("泳", "ぐ", "to swim"),
  godan("待", "つ", "to wait"),
  godan("死", "ぬ", "to die"),
  godan("遊", "ぶ", "to play"),
  godan("読", "む", "to read"),
  godan("買", "う", "to buy"),
  godan("走", "る", "to run"),
  godan("わか", "る", "to understand"),
  godan("知", "る", "to know"),
  godan("思", "う", "to think"),
  ichidan("食べ", "to eat"),
  ichidan("見", "to see"),
  ichidan("着", "to wear"),
  ichidan("寝", "to sleep"),
  ichidan("起き", "to wake up"),
  { key: "する", en: "to do", verb: { type: "irregular", dictionary: "する" } },
  { key: "来る", en: "to come", verb: { type: "irregular", dictionary: "来る" } },
  { key: "くる", en: "to come (kana)", verb: { type: "irregular", dictionary: "くる" } },
];

export const SAMPLE_ADJECTIVES: ReadonlyArray<AdjectiveEntry> = [
  {
    key: "いい",
    en: "good (irregular)",
    adjective: { type: "i-adjective", stem: "い", ending: "い", irregular: true },
  },
  {
    key: "楽しい",
    en: "fun",
    adjective: { type: "i-adjective", stem: "楽し", ending: "い" },
  },
  {
    key: "高い",
    en: "expensive / tall",
    adjective: { type: "i-adjective", stem: "高", ending: "い" },
  },
  {
    key: "新しい",
    en: "new",
    adjective: { type: "i-adjective", stem: "新し", ending: "い" },
  },
  {
    key: "綺麗",
    en: "pretty / clean",
    adjective: { type: "na-adjective", stem: "綺麗" },
  },
  {
    key: "静か",
    en: "quiet",
    adjective: { type: "na-adjective", stem: "静か" },
  },
  {
    key: "好き",
    en: "liked",
    adjective: { type: "na-adjective", stem: "好き" },
  },
];

export const VERB_CLASS_LABELS: Record<VerbClass, string> = {
  godan: "五段動詞 (Godan / Group 1)",
  ichidan: "一段動詞 (Ichidan / Group 2)",
  irregular: "不規則動詞 (Irregular)",
};

export interface ParticleEntry {
  particle: string;
  en: string;
}

/** Mirror of the Particle union in ../../../src/phrase-types.d.ts. */
export const PARTICLES: ReadonlyArray<ParticleEntry> = [
  { particle: "は", en: "topic marker" },
  { particle: "が", en: "subject marker" },
  { particle: "を", en: "direct object" },
  { particle: "に", en: "indirect object / direction" },
  { particle: "へ", en: "direction" },
  { particle: "で", en: "means / location" },
  { particle: "と", en: "and / with" },
  { particle: "から", en: "from" },
  { particle: "まで", en: "until" },
  { particle: "よ", en: "emphasis" },
  { particle: "ね", en: "agreement-seeking" },
  { particle: "か", en: "question" },
  { particle: "よね", en: "emphasis + agreement" },
  { particle: "の", en: "nominalizer / question" },
  { particle: "だ", en: "copula" },
  { particle: "も", en: "also / even" },
];

/** Mirror of the PunctuationMark union. */
export const PUNCTUATION: ReadonlyArray<ParticleEntry> = [
  { particle: "、", en: "comma (読点)" },
  { particle: "。", en: "period (句点)" },
  { particle: "！", en: "exclamation" },
  { particle: "？", en: "question mark" },
  { particle: "「", en: "open quote" },
  { particle: "」", en: "close quote" },
];
