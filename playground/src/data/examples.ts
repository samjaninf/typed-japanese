/**
 * Showcase sentences with grammar breakdowns, plus starter snippets for the
 * Type Playground. The code snippets are real Typed Japanese and type-check
 * against the library's .d.ts files loaded into Monaco.
 */

export interface PlaygroundSnippet {
  id: string;
  title: string;
  /** Japanese sentence / phrase this snippet builds. */
  jp: string;
  /** English gloss. */
  en: string;
  code: string;
}

const importLine = `import type {
  ProperNoun,
  GodanVerb, IchidanVerb, IrregularVerb, ConjugateVerb,
  IAdjective, NaAdjective, ConjugateAdjective,
  PhraseWithParticle, ConnectedPhrases, ConditionalPhrase,
  DemonstrativeAction, InterrogativePhrase,
} from "typed-japanese";`;

export const SNIPPETS: ReadonlyArray<PlaygroundSnippet> = [
  {
    id: "verb-basics",
    title: "Verb conjugation",
    jp: "話す → 話して",
    en: "Conjugate a Godan verb into its て-form",
    code: `${importLine}

// 話す (to speak) — a godan verb
type 話す = GodanVerb & { stem: "話"; ending: "す" };

// Hover over each type to see TypeScript compute the conjugation:
type 話すて形 = ConjugateVerb<話す, "て形">;   // "話して"
type 話すた形 = ConjugateVerb<話す, "た形">;   // "話した"
type 話す可能形 = ConjugateVerb<話す, "可能形">; // "話せ"

// The compiler enforces the right answer:
const ok: 話すて形 = "話して";
// @ts-expect-error — wrong conjugation is a type error
const bad: 話すて形 = "話した";
`,
  },
  {
    id: "ichidan-irregular",
    title: "Ichidan & irregular",
    jp: "食べる・する・来る",
    en: "Group 2 and irregular verbs",
    code: `${importLine}

type 食べる = IchidanVerb & { stem: "食べ"; ending: "る" };
type する = IrregularVerb & { dictionary: "する" };
type 来る = IrregularVerb & { dictionary: "来る" };

type 食べるた形 = ConjugateVerb<食べる, "た形">;  // "食べた"
type する命令形 = ConjugateVerb<する, "命令形">;   // "しろ"
type 来る命令形 = ConjugateVerb<来る, "命令形">;   // "来い"
`,
  },
  {
    id: "adjective",
    title: "Adjectives",
    jp: "いい → よかった",
    en: "i-adjectives, na-adjectives and the irregular いい",
    code: `${importLine}

type いい = IAdjective & { stem: "い"; ending: "い"; irregular: true };
type 綺麗 = NaAdjective & { stem: "綺麗" };

type いい過去形 = ConjugateAdjective<いい, "過去形">;   // "よかった"
type 綺麗丁寧形 = ConjugateAdjective<綺麗, "丁寧形">;   // "綺麗です"
`,
  },
  {
    id: "himmel",
    title: "Conditional — Himmel",
    jp: "ヒンメルならそうした",
    en: "If it were Himmel, he would have done so",
    code: `${importLine}

type ヒンメル = ProperNoun<"ヒンメル">;
type する = IrregularVerb & { dictionary: "する" };

// そうした = past form of そうする
type そうした = DemonstrativeAction<"そう", する, "た形">;

type ヒンメルならそうした = ConditionalPhrase<ヒンメル, "なら", そうした>;

const sentence: ヒンメルならそうした = "ヒンメルならそうした";
`,
  },
  {
    id: "frieren",
    title: "Interrogative — Frieren",
    jp: "なんでもっとTypeScriptを知ろうと思わなかったんだろう",
    en: "Why didn't I think to learn more TypeScript?!",
    code: `${importLine}

type TypeScript = ProperNoun<"TypeScript">;
type 知る = GodanVerb & { stem: "知"; ending: "る" };
type 思う = GodanVerb & { stem: "思"; ending: "う" };

type 知ろうと思わなかった = ConnectedPhrases<
  ConjugateVerb<知る, "意向形">,
  ConjugateVerb<思う, "ない形"> & "た"
>;
`,
  },
];

export interface BreakdownPart {
  surface: string;
  role: string;
  note: string;
}

export interface ShowcaseSentence {
  id: string;
  jp: string;
  reading?: string;
  en: string;
  zh?: string;
  source: string;
  parts: ReadonlyArray<BreakdownPart>;
}

export const SHOWCASE: ReadonlyArray<ShowcaseSentence> = [
  {
    id: "himmel",
    jp: "ヒンメルならそうした",
    en: "If it were Himmel, he would have done so.",
    zh: "如果是辛美尔的话，他也会这么做的。",
    source: "Frieren: Beyond Journey's End (葬送のフリーレン)",
    parts: [
      { surface: "ヒンメル", role: "ProperNoun", note: "The hero Himmel" },
      { surface: "なら", role: "ConditionalParticle", note: "“if it were…”" },
      { surface: "そう", role: "Demonstrative", note: "“that way / so”" },
      { surface: "した", role: "Verb する → た形", note: "past form of する" },
    ],
  },
  {
    id: "frieren",
    jp: "日本語はわかってたのに、なんでもっとTypeScriptを知ろうと思わなかったんだろう",
    en: "I understood Japanese, so why didn't I think to learn more TypeScript?!",
    source: "Project tagline",
    parts: [
      { surface: "日本語", role: "ProperNoun", note: "“Japanese (language)”" },
      { surface: "は", role: "Particle", note: "topic marker" },
      { surface: "わかってた", role: "Verb わかる → て形 + た", note: "“understood”" },
      { surface: "のに", role: "Conjunction", note: "“even though / despite”" },
      { surface: "なんで", role: "WhyInterrogative", note: "“why”" },
      { surface: "もっと", role: "Adverb", note: "“more”" },
      { surface: "TypeScriptを", role: "Noun + を", note: "direct object" },
      { surface: "知ろう", role: "Verb 知る → 意向形", note: "volitional “let's learn”" },
      { surface: "と思わなかった", role: "Verb 思う → ない形 + た", note: "“didn't think”" },
      { surface: "んだろう", role: "Sentence ending", note: "musing / rhetorical" },
    ],
  },
  {
    id: "kanmuri",
    jp: "いいよ、来いよ",
    en: "It's fine — come on!",
    source: "phrase-types.d.ts example",
    parts: [
      { surface: "いい", role: "IAdjective 基本形", note: "“good / fine”" },
      { surface: "よ", role: "Particle", note: "emphasis" },
      { surface: "、", role: "PunctuationMark", note: "comma (読点)" },
      { surface: "来い", role: "Verb 来る → 命令形", note: "imperative “come”" },
      { surface: "よ", role: "Particle", note: "emphasis" },
    ],
  },
];
