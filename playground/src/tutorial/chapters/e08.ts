import type { Chapter } from "../types";

const chapter: Chapter = {
  id: "e08",
  level: "elementary",
  order: 8,
  titleEn: "Adjectives: い & な",
  titleZh: "形容词：い与な",
  summaryEn:
    "You sit down at a ramen counter and want to say more than 'it is ramen' — you want to say it is DELICIOUS ramen, or that the room was small, or that today's weather isn't good. So far です gave you 'it is X' and の linked nouns, but neither lets you describe qualities. Japanese solves this with two adjective families: い-adjectives like 高い carry their own tense inside the word, while な-adjectives lean on です/でした just like the nouns you already know. This chapter shows how each one sits before a noun, turns negative (〜くない / 〜ではない), and shifts into the past (〜かった / 〜でした).",
  summaryZh:
    "你在拉面店坐下，想说的不只是「这是拉面」，而是「这是好吃的拉面」、「房间（曾经）很小」、或者「今天天气不好」。目前 です 让你能说「这是 X」，の 能把名词连起来，但都没法描述「性质」。日语用两个形容词家族来解决这个问题：像 高い 这样的 い形容词把时态藏在词内部，而 な形容词则像你已经熟悉的名词一样依赖 です/でした。本章讲解两类形容词如何放在名词前、如何变否定（〜くない / 〜ではない），以及如何变过去（〜かった / 〜でした）。",
  points: [
    {
      id: "e08-1",
      titleEn: "Attributive form: modifying a noun",
      titleZh: "连体形：修饰名词",
      bodyEn:
        "In chapter 2 you learned to glue two nouns together with `の` — `私の本` (my book). But `の` only links nouns; it can't tell you the book is THICK or the mountain is HIGH. For qualities you need an adjective sitting directly in front of the noun, and that slot is called the attributive (basic) form.\n\nHere the two families diverge. An `い`-adjective is already in attributive shape, so you just drop it in front: `高い + 山 → 高い山` (a high mountain). A `な`-adjective is built differently — it needs a `な` glued between itself and the noun: `静か + な + 部屋 → 静かな部屋` (a quiet room). That little linking `な` is literally why we call this whole class the 'na-adjective'.\n\nThink of the scene: you're hiking and point across the valley — `高い山`. Later you check into a guesthouse and the host promises you `静かな部屋`. Same pattern, two different machineries depending on the word's family.\n\nThe one habit to build now is to always ask, for a new adjective, 'is this an い or a な?' — because that single fact decides whether you write `静かな部屋` or, wrongly, `静か部屋`. The な is not optional for that family.",
      bodyZh:
        "第 2 章里你学会了用 `の` 把两个名词粘起来——`私の本`（我的书）。但 `の` 只能连接名词，没法告诉别人这本书「很厚」、那座山「很高」。要描述性质，就得让一个形容词直接站在名词前面，这个位置叫连体形（基本形）。\n\n这里两个家族分道扬镳。`い`形容词本身就已是连体形，直接放在名词前即可：`高い + 山 → 高い山`（高山）。`な`形容词构造不同——它需要在自己和名词之间夹一个 `な`：`静か + な + 部屋 → 静かな部屋`（安静的房间）。正是这个起连接作用的 `な`，使整类词被称为「な形容词」。\n\n想象这个场景：你在登山，指着山谷对面——`高い山`。之后你入住民宿，老板答应给你 `静かな部屋`。同一种模式，却因词的家族不同而走两套机制。\n\n现在要养成的习惯是：遇到新形容词就问自己「这是 い 还是 な？」——因为单凭这一点就决定了你该写 `静かな部屋`，而不是错误的 `静か部屋`。对 な 家族来说，这个 な 不能省。",
      examples: [
        {
          jp: "高い山",
          reading: "たかいやま",
          en: "a high mountain",
          zh: "高山",
          code: `import type { IAdjective, ConjugateAdjective, ProperNoun } from "typed-japanese";

type 高い = IAdjective & { stem: "高"; ending: "い" };
type 山 = ProperNoun<"山">;

// i-adjective in 基本形 sits directly before the noun
type 高い山 = \`\${ConjugateAdjective<高い, "Basic">}\${山}\`;
`,
        },
        {
          jp: "静かな部屋",
          reading: "しずかなへや",
          en: "a quiet room",
          zh: "安静的房间",
          code: `import type { NaAdjective, ConjugateAdjective, ProperNoun } from "typed-japanese";

type 静か = NaAdjective & { stem: "静か" };
type 部屋 = ProperNoun<"部屋">;

// na-adjective 基本形 already carries the linking な
type 静かな部屋 = \`\${ConjugateAdjective<静か, "Basic">}\${部屋}\`;
`,
        },
        {
          jp: "きれいな花です",
          reading: "きれいなはなです",
          en: "It is a pretty flower.",
          zh: "是漂亮的花。",
          code: `import type { NaAdjective, ConjugateAdjective, ProperNoun, ConjugateCopula } from "typed-japanese";

type きれい = NaAdjective & { stem: "きれい" };
type 花 = ProperNoun<"花">;

// 静かな部屋 pattern, then close with です
type きれいな花です = \`\${ConjugateAdjective<きれい, "Basic">}\${ConjugateCopula<花, "Polite">}\`;
`,
        },
      ],
    },
    {
      id: "e08-2",
      titleEn: "Predicate adjectives: 〜です",
      titleZh: "形容词谓语：〜です",
      bodyEn:
        "Putting an adjective in front of a noun describes that noun, but often you want the quality to be the whole point of the sentence: not 'a hot day' but 'today IS hot'. In chapter 1 you closed noun sentences with `です` — `これは本です`. Adjectives can be the predicate too, in the same final slot: `Topic は Adjective です`.\n\nFor an `い`-adjective, you just stick `です` onto the end of the plain form: `暑い → 暑いです`. The key intuition: the `い` already means 'is hot' all by itself, so `です` here is pure politeness, not the verb 'to be'. That's why `暑い` alone is a complete (casual) sentence. For a `な`-adjective, you take the bare stem and add `です` — and crucially you DROP the `な`: `元気 → 元気です`, never `元気なです`.\n\nPicture stepping outside in August and sighing to a coworker, `今日は暑いです`. Or someone asks after your family and you reassure them, `父は元気です` — my father is well. Both end on `です`, but only the `な`-word leaned on it to carry the 'is'; the `い`-word was already standing on its own.\n\nThe pitfall to avoid: that linking `な` from the previous point belongs only before a noun. The moment the adjective becomes the predicate, the `な` disappears and `です` takes over.",
      bodyZh:
        "把形容词放在名词前是在描述那个名词，但很多时候你想让「性质」成为整句的重点：不是「炎热的一天」，而是「今天（很）热」。第 1 章里你用 `です` 收尾名词句——`これは本です`。形容词同样能作谓语，占据句末同一个位置：`主题 は 形容词 です`。\n\n对 `い`形容词，直接在简体形末尾加 `です`：`暑い → 暑いです`。关键直觉是：`い` 本身就已经表示「（是）热的」，所以这里的 `です` 纯粹是礼貌，并不是「是」这个动词。这也是为什么单说 `暑い` 就已是一句完整的（口语）句子。对 `な`形容词，取光秃秃的词干加 `です`——而且关键是要去掉 `な`：`元気 → 元気です`，绝不是 `元気なです`。\n\n想象八月里你走到屋外，对同事叹气说 `今日は暑いです`。或者有人问起你家人，你安心地回答 `父は元気です`——我父亲很健康。两句都以 `です` 结尾，但只有 `な`词靠它来承担「是」；`い`词早就能独自站立。\n\n要避开的坑是：上一节那个起连接作用的 `な` 只在名词前出现。一旦形容词变成谓语，`な` 就消失，由 `です` 接手。",
      examples: [
        {
          jp: "今日は暑いです",
          reading: "きょうはあついです",
          en: "Today is hot.",
          zh: "今天很热。",
          code: `import type { IAdjective, ConjugateAdjective, ProperNoun, PhraseWithParticle } from "typed-japanese";

type 今日 = ProperNoun<"今日">;
type 暑い = IAdjective & { stem: "暑"; ending: "い" };

// 丁寧形 of an i-adjective = stem + いです
type 今日は暑いです = \`\${PhraseWithParticle<今日, "は">}\${ConjugateAdjective<暑い, "Polite">}\`;
`,
        },
        {
          jp: "父は元気です",
          reading: "ちちはげんきです",
          en: "My father is well.",
          zh: "我父亲很健康。",
          code: `import type { NaAdjective, ConjugateAdjective, ProperNoun, PhraseWithParticle } from "typed-japanese";

type 父 = ProperNoun<"父">;
type 元気 = NaAdjective & { stem: "元気" };

// 丁寧形 of a na-adjective = stem + です (no な)
type 父は元気です = \`\${PhraseWithParticle<父, "は">}\${ConjugateAdjective<元気, "Polite">}\`;
`,
        },
      ],
    },
    {
      id: "e08-3",
      titleEn: "Negative: 〜くない / 〜ではない",
      titleZh: "否定：〜くない / 〜ではない",
      bodyEn:
        "You can now say 'this book is expensive', but in a shop you often need the opposite — 'no, it's NOT expensive'. In chapter 1 you negated noun sentences with `では ありません`; adjectives need their own negative forms, and once again the two families part ways.\n\nAn `い`-adjective negates from the inside: drop the final `い` and add `くない`. `高い → 高くない` (not high/expensive). Notice the `い` itself flexes — there's no separate 'not' word, the negation is baked into the adjective. A `な`-adjective, true to its noun-like nature, reuses the very `では` pattern from chapter 1: add `ではない` to the stem. `静か → 静かではない` (not quiet). In everyday speech that `では` gets squeezed down to `じゃ`, so you'll hear `静かじゃない` on the street.\n\nImagine browsing a market stall and checking the price tag: `この本は高くない` — this book isn't expensive, I'll take it. Or you arrive at a guesthouse near a busy road and grumble, `この町は静かではない`. Same job, two mechanisms decided purely by family.\n\nTo make either polite, just tack on `です`: `高くないです` is the courteous version you'd use with a shopkeeper. The negation is already complete before `です` arrives — `です` only raises the register.",
      bodyZh:
        "你现在能说「这本书很贵」，但在店里你常常需要相反的话——「不，它不贵」。第 1 章里你用 `では ありません` 否定名词句；形容词需要自己的否定形式，而两个家族又一次分道扬镳。\n\n`い`形容词从内部否定：去掉词尾 `い`，加 `くない`。`高い → 高くない`（不高／不贵）。注意是 `い` 本身在变形——没有单独的「不」字，否定就嵌在形容词里。`な`形容词忠于它像名词的本性，沿用第 1 章那个 `では` 模式：在词干后加 `ではない`。`静か → 静かではない`（不安静）。日常口语里 `では` 会被压缩成 `じゃ`，所以街上你会听到 `静かじゃない`。\n\n想象你在市场摊位前翻看价签：`この本は高くない`——这本书不贵，我买了。或者你住进了靠近闹市马路的民宿，抱怨道 `この町は静かではない`。同一件事，机制却纯粹由家族决定。\n\n要让任意一种变礼貌，只需补上 `です`：`高くないです` 就是你对店员会用的客气说法。否定在 `です` 出现之前就已经完成了——`です` 只负责抬高语体。",
      examples: [
        {
          jp: "この本は高くない",
          reading: "このほんはたかくない",
          en: "This book is not expensive.",
          zh: "这本书不贵。",
          code: `import type { IAdjective, ConjugateAdjective, ProperNoun, PhraseWithParticle } from "typed-japanese";

type この本 = ProperNoun<"この本">;
type 高い = IAdjective & { stem: "高"; ending: "い" };

// 否定形 of an i-adjective = stem + くない
type この本は高くない = \`\${PhraseWithParticle<この本, "は">}\${ConjugateAdjective<高い, "Negative">}\`;
`,
        },
        {
          jp: "この町は静かではない",
          reading: "このまちはしずかではない",
          en: "This town is not quiet.",
          zh: "这个城镇不安静。",
          code: `import type { NaAdjective, ConjugateAdjective, ProperNoun, PhraseWithParticle } from "typed-japanese";

type この町 = ProperNoun<"この町">;
type 静か = NaAdjective & { stem: "静か" };

// 否定形 of a na-adjective = stem + ではない
type この町は静かではない = \`\${PhraseWithParticle<この町, "は">}\${ConjugateAdjective<静か, "Negative">}\`;
`,
        },
      ],
    },
    {
      id: "e08-4",
      titleEn: "Past: 〜かった / 〜でした",
      titleZh: "过去：〜かった / 〜でした",
      bodyEn:
        "In chapter 7 you learned to push verbs into the past with `〜ました` and nouns with `でした` — `学生でした`, was a student. Adjectives need a past too: you don't just want 'the trip is fun', you want to tell a friend afterward that 'the trip WAS fun'. And here the design split you've been tracking pays off beautifully.\n\nAn `い`-adjective keeps its tense inside the word, so the past is formed inside too: drop `い` and add `かった`. `高い → 高かった` (was high). Watch out for the trap — because the `い`-adjective already carries the past, you do NOT add `でした`: it's `寒かった`, never `寒いでした`. A `な`-adjective, behaving like the nouns of chapter 7, simply reuses `でした`: `静か → 静かでした` (was quiet).\n\nPicture the morning after a winter night, telling a coworker `昨日は寒かった` — yesterday was cold. Back from a holiday, you beam `旅行は楽しかった`, the trip was fun. And recalling a peaceful afternoon, `公園は静かでした`, the park was quiet. Three pasts, but the `い`-words tensed themselves while the `な`-word borrowed `でした`.\n\nIf you can feel why `寒いでした` is wrong, you've internalized the whole chapter: an `い`-adjective is its own little tensed verb, so stacking `でした` on top would be saying 'was' twice.",
      bodyZh:
        "第 7 章里你学会了用 `〜ました` 把动词推入过去，用 `でした` 处理名词——`学生でした`，曾是学生。形容词也需要过去式：你想说的不只是「旅行很开心」，而是事后告诉朋友「旅行（曾）很开心」。而你一直在追踪的那个设计分歧，在这里漂亮地兑现了。\n\n`い`形容词把时态藏在词内，所以过去式也在词内构成：去掉 `い`，加 `かった`。`高い → 高かった`（（曾）很高）。当心一个陷阱——因为 `い`形容词本身已经带着过去，所以不要再加 `でした`：是 `寒かった`，绝不是 `寒いでした`。`な`形容词表现得像第 7 章的名词，干脆沿用 `でした`：`静か → 静かでした`（（曾）很安静）。\n\n想象冬夜过后的清晨，你对同事说 `昨日は寒かった`——昨天很冷。度假归来，你笑着说 `旅行は楽しかった`，旅行很开心。回想一个宁静的下午，`公園は静かでした`，公园很安静。三个过去式，但 `い`词自己变了时态，`な`词则借用了 `でした`。\n\n如果你能体会到为什么 `寒いでした` 是错的，你就把整章都内化了：`い`形容词本身就是个带时态的小动词，再叠一个 `でした` 等于把「（曾经）是」说了两遍。",
      examples: [
        {
          jp: "昨日は寒かった",
          reading: "きのうはさむかった",
          en: "Yesterday was cold.",
          zh: "昨天很冷。",
          code: `import type { IAdjective, ConjugateAdjective, ProperNoun, PhraseWithParticle } from "typed-japanese";

type 昨日 = ProperNoun<"昨日">;
type 寒い = IAdjective & { stem: "寒"; ending: "い" };

// 過去形 of an i-adjective = stem + かった
type 昨日は寒かった = \`\${PhraseWithParticle<昨日, "は">}\${ConjugateAdjective<寒い, "Past">}\`;
`,
        },
        {
          jp: "旅行は楽しかった",
          reading: "りょこうはたのしかった",
          en: "The trip was fun.",
          zh: "旅行很开心。",
          code: `import type { IAdjective, ConjugateAdjective, ProperNoun, PhraseWithParticle } from "typed-japanese";

type 旅行 = ProperNoun<"旅行">;
type 楽しい = IAdjective & { stem: "楽し"; ending: "い" };

type 旅行は楽しかった = \`\${PhraseWithParticle<旅行, "は">}\${ConjugateAdjective<楽しい, "Past">}\`;
`,
        },
        {
          jp: "公園は静かでした",
          reading: "こうえんはしずかでした",
          en: "The park was quiet.",
          zh: "公园很安静。",
          code: `import type { NaAdjective, ConjugateAdjective, ProperNoun, PhraseWithParticle } from "typed-japanese";

type 公園 = ProperNoun<"公園">;
type 静か = NaAdjective & { stem: "静か" };

// 過去形 of a na-adjective = stem + でした
type 公園は静かでした = \`\${PhraseWithParticle<公園, "は">}\${ConjugateAdjective<静か, "Past">}\`;
`,
        },
      ],
    },
    {
      id: "e08-5",
      titleEn: "The irregular いい (good)",
      titleZh: "不规则形容词 いい（好）",
      bodyEn:
        "Every language has its one ultra-common word that refuses to follow the rules — in English it's 'good/better/best'. Japanese has `いい` (good), and you'll reach for it constantly: good weather, good mood, a good idea. It looks like a textbook `い`-adjective, and in its plain basic form it behaves like one. But the moment you conjugate it, it reverts to its older stem `よ`.\n\nSo the rules you just learned still apply — you just apply them to `よ`, not `い`. The negative is `よくない` (not the expected `いくない`), and the past is `よかった` (not `いかった`). It's as if the word quietly swaps its root before letting any ending attach. In Typed Japanese you flag this by writing `irregular: true` alongside `stem: \"い\"`, and the conjugator then produces the `よ`-forms for you.\n\nPicture remembering a perfect hiking day and telling a friend `天気がよかった` — the weather was good. Or, feeling under the weather at work, you admit `気分がよくない` — I don't feel well. In both, the surface `いい` has vanished and `よ` has stepped in.\n\nThe practical takeaway: only the bare `いい` keeps the `い`; the instant you make it negative, past, or attach almost anything, switch to `よ`. Memorize `よかった` and `よくない` as fixed phrases now and you'll never trip on this word again.",
      bodyZh:
        "每种语言都有那么一个超常用却偏不守规矩的词——英语里是 good／better／best。日语里是 `いい`（好），而你会不停地用到它：好天气、好心情、好主意。它看起来就像教科书里的 `い`形容词，在光秃秃的基本形里也确实如此。但你一旦让它变形，它就会退回到更古老的词干 `よ`。\n\n所以你刚学的规则仍然适用——只是要套在 `よ` 上，而不是 `い` 上。否定是 `よくない`（不是你以为的 `いくない`），过去是 `よかった`（不是 `いかった`）。仿佛这个词在让任何词尾接上之前，悄悄换掉了自己的词根。在 Typed Japanese 中，你通过在 `stem: \"い\"` 旁边写 `irregular: true` 来标记它，变形器随后就会替你生成 `よ` 系列形式。\n\n想象你回忆起一个完美的登山日，对朋友说 `天気がよかった`——天气很好。或者在公司觉得身体不适，你坦白 `気分がよくない`——我不太舒服。两句里表面的 `いい` 都消失了，由 `よ` 顶上。\n\n实用要点是：只有光秃秃的 `いい` 保留 `い`；一旦变否定、变过去、或接上几乎任何东西，就换成 `よ`。现在就把 `よかった` 和 `よくない` 当作固定短语记住，你以后再也不会在这个词上栽跟头。",
      examples: [
        {
          jp: "天気がよかった",
          reading: "てんきがよかった",
          en: "The weather was good.",
          zh: "天气很好。",
          code: `import type { IAdjective, ConjugateAdjective, ProperNoun, PhraseWithParticle } from "typed-japanese";

type 天気 = ProperNoun<"天気">;
type いい = IAdjective & { stem: "い"; ending: "い"; irregular: true };

// irregular: 過去形 becomes よかった, not いかった
type 天気がよかった = \`\${PhraseWithParticle<天気, "が">}\${ConjugateAdjective<いい, "Past">}\`;
`,
        },
        {
          jp: "気分がよくない",
          reading: "きぶんがよくない",
          en: "I don't feel well.",
          zh: "心情/身体不太好。",
          code: `import type { IAdjective, ConjugateAdjective, ProperNoun, PhraseWithParticle } from "typed-japanese";

type 気分 = ProperNoun<"気分">;
type いい = IAdjective & { stem: "い"; ending: "い"; irregular: true };

// irregular: 否定形 becomes よくない, not いくない
type 気分がよくない = \`\${PhraseWithParticle<気分, "が">}\${ConjugateAdjective<いい, "Negative">}\`;
`,
        },
      ],
    },
  ],
};

export default chapter;
