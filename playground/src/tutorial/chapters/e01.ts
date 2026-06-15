import type { Chapter } from "../types";

const chapter: Chapter = {
  id: "e01",
  level: "elementary",
  order: 1,
  titleEn: "Noun sentences: です / だ",
  titleZh: "名词谓语句：です / だ",
  summaryEn:
    "Picture yourself at a meetup in Tokyo: someone turns to you and you want to say “I'm a student.” Right now you can't say anything at all — so we start with the single most fundamental sentence in any language, naming what one thing is. You'll meet the topic particle は (“as for…”), the polite copula です that seals “it is so,” and how to turn that same sentence into a denial or a question.",
  summaryZh:
    "想象你在东京的一场聚会上：有人转向你，你想说「我是学生」。可现在你还什么都说不出来——所以我们从任何语言里最根本的那种句子开始：指明一个事物是什么。本章会带你认识提示主题的助词 は（「说到…」）、为「确实如此」收尾的礼貌体系动词 です，以及如何把同一个句子变成否定或疑问。",
  points: [
    {
      id: "e01-1",
      titleEn: "A は B です — “A is B”",
      titleZh: "A は B です ——「A 是 B」",
      bodyEn:
        "You're standing at a registration desk, or being introduced to a circle of new faces, and the first thing you ever need to do in a language is identify something: this is me, that is water, she is the teacher. Up to now you couldn't even do that. This pattern is the door.\n\nA Japanese noun sentence has the shape `Topic は Noun です`. The little particle `は` (written with the hiragana for `ha` but pronounced `wa` here) marks the topic — it literally means something like “as for…”. So `私は` is “as for me…”, and then the sentence comments on that topic. `です` is the polite copula at the very end, roughly “is / am / are”.\n\nNotice what Japanese does NOT do: there's no verb that changes for I / you / she, no singular-versus-plural agreement. `です` just sits there after the noun, the same every time. The intuition is that you first announce what you're talking about, then drop the comment, then close it politely — topic first, predicate last, always.\n\nSo at that meetup, you point at yourself and say `私は学生です` — “as for me, student, it is.” Introducing someone else works identically: `田中さんは先生です`, “Mr. Tanaka is a teacher.” (`さん` is a polite “Mr./Ms.” tag you attach to names; never attach it to your own name.)\n\nOne habit to build early: `です` always comes last. Resist the English urge to put “is” in the middle — in Japanese the closing `です` is what makes the sentence feel finished and polite.",
      bodyZh:
        "你正站在签到台前，或被介绍给一圈陌生面孔，而在任何语言里你最先需要做的事，就是指认某物：这是我、那是水、她是老师。在此之前你连这都做不到，而这个句型就是那扇门。\n\n日语的名词句结构是「主题 は 名词 です」。小小的助词 `は`（写作平假名的 `ha`，但在这里读作 `wa`）用来提示主题——它的意思接近「说到…」。所以 `私は` 就是「说到我…」，然后句子再对这个主题作出评述。`です` 是位于句末的礼貌体系动词，相当于「是」。\n\n请注意日语「不做」什么：没有随「我 / 你 / 她」变化的动词，也没有单复数的一致变化。`です` 就那样跟在名词后面，每次都一样。这里的直觉是：你先宣布要谈的对象，再抛出评述，最后礼貌地收尾——主题在前，谓语在后，永远如此。\n\n于是在那场聚会上，你指着自己说 `私は学生です`——「说到我，学生，是。」介绍别人也完全一样：`田中さんは先生です`，「田中先生是老师。」（`さん` 是加在名字后表示「先生／女士」的礼貌后缀；但绝不要加在自己名字上。）\n\n要尽早养成一个习惯：`です` 永远在最后。别被英语那种把「是」放中间的冲动牵着走——在日语里，正是句末的 `です` 让整句显得完整又有礼貌。",
      examples: [
        {
          jp: "私は学生です",
          reading: "わたしはがくせいです",
          en: "I am a student.",
          zh: "我是学生。",
          code: `import type { ProperNoun, PhraseWithParticle, ConjugateCopula } from "typed-japanese";

type 私 = ProperNoun<"私">;
type 学生 = ProperNoun<"学生">;

// 私 + は (topic) + 学生 + です
type 私は学生です = \`\${PhraseWithParticle<私, "は">}\${ConjugateCopula<学生, "Polite">}\`;
`,
        },
        {
          jp: "田中さんは先生です",
          reading: "たなかさんはせんせいです",
          en: "Mr. Tanaka is a teacher.",
          zh: "田中先生是老师。",
          code: `import type { ProperNoun, PhraseWithParticle, ConjugateCopula } from "typed-japanese";

type 田中さん = ProperNoun<"田中さん">;
type 先生 = ProperNoun<"先生">;

type 田中さんは先生です = \`\${PhraseWithParticle<田中さん, "は">}\${ConjugateCopula<先生, "Polite">}\`;
`,
        },
      ],
    },
    {
      id: "e01-2",
      titleEn: "Negation: では ありません",
      titleZh: "否定：では ありません",
      bodyEn:
        "You just learned to say what something IS. But half of identifying yourself is correcting a mistake: the clerk thinks you're Mr. Smith, or someone assumes you're the doctor when you're not. For that you need to say “A is not B,” and `です` alone can't do it.\n\nThe fix is small: keep the whole `Topic は Noun` part exactly as before, and just swap the closing `です` for `ではありません`. That's the formal negative, “is not.” So the only thing that changes is the ending — everything you already built stays put.\n\nIt helps to see where `ではありません` comes from: it's that same topic-marking `は` again (the `wa` sound), riding on `で`, followed by `ありません`, a polite “there is not.” You don't need to dissect it to use it — treat `ではありません` as one fixed “…is not” block for now — but knowing the `は` is hiding in there explains why it's pronounced `de-wa` and not `de-ha`.\n\nPicture the mix-up: someone greets you as the doctor and you smile and correct them — `私は医者ではありません`, “As for me, I'm not a doctor.” Calm, clear, polite.\n\nA quick note for your ear: in relaxed conversation among friends this same negative collapses to `じゃない`. You'll hear it everywhere, but for meeting new people and any formal setting, `ではありません` is the safe, respectful choice.",
      bodyZh:
        "你刚学会说某物「是」什么。但自我介绍有一半其实是在纠正误会：前台以为你是史密斯先生，或有人把你当成了医生，而你并不是。这时你需要说「A 不是 B」，光靠 `です` 是办不到的。\n\n解决办法很小：把整个「主题 は 名词」部分原封不动地保留，只把句末的 `です` 换成 `ではありません`。这就是郑重的否定式「不是」。唯一变化的只是结尾——你之前搭好的一切都纹丝不动。\n\n看看 `ではありません` 的来历会有帮助：里面又是那个提示主题的 `は`（读 `wa` 的音），搭在 `で` 上，后面接 `ありません`，即礼貌的「没有、不存在」。你不必拆解它就能用——现在把 `ではありません` 当成一整块固定的「…不是」即可——但知道里头藏着个 `は`，就能解释它为什么读成 `de-wa` 而不是 `de-ha`。\n\n设想那个误会：有人把你当医生招呼，你微笑着纠正——`私は医者ではありません`，「说到我，我不是医生。」从容、清楚、有礼。\n\n给你的耳朵提个醒：在朋友间轻松的对话里，同样的否定会简化成 `じゃない`。这个说法到处都能听到，但在初次见面以及任何正式场合，`ではありません` 才是稳妥、得体的选择。",
      examples: [
        {
          jp: "私は医者ではありません",
          reading: "わたしはいしゃではありません",
          en: "I am not a doctor.",
          zh: "我不是医生。",
          code: `import type { ProperNoun, PhraseWithParticle, ConjugateCopula } from "typed-japanese";

type 私 = ProperNoun<"私">;
type 医者 = ProperNoun<"医者">;

type 私は医者ではありません = \`\${PhraseWithParticle<私, "は">}\${ConjugateCopula<医者, "PoliteNegative">}\`;
`,
        },
      ],
    },
    {
      id: "e01-3",
      titleEn: "Questions: …か",
      titleZh: "疑问：…か",
      bodyEn:
        "So far you can state things and deny them. But conversation runs on questions — the hotel clerk wants to know if you're a guest, you want to confirm what's on the menu — and English asks by flipping the word order: “You are a student” becomes “Are you a student?” Japanese refuses to do that reshuffling, which is good news for you.\n\nThe rule is wonderfully lazy: take any statement and stick the particle `か` on the very end. Nothing moves. `あなたは学生です` (“you are a student”) becomes `あなたは学生ですか` (“are you a student?”). The order stays identical; `か` is simply a spoken question mark.\n\nWhy build it this way? Japanese tends to ask by tagging rather than by rearranging — you say the whole thought, then append a small word that flips its mood. You don't even need rising intonation or a written “?”; the `か` carries the question all by itself. This same tag-it-on-the-end logic will come back again and again, so it's worth feeling natural now.\n\nImagine checking in: the clerk glances at you and asks `あなたは学生ですか` to see whether the student discount applies. You can answer with the patterns you already own — `はい、学生です` to confirm, or fall back on the negative from the last section to deny it.\n\nOne gentle caution: because `か` already signals a question, everyday written Japanese often skips the question mark after it. Seeing a sentence end in `か` with just a period is completely normal, not a typo.",
      bodyZh:
        "到目前为止，你能陈述事情，也能否定它们。但对话靠的是提问——酒店前台想知道你是不是住客，你想确认菜单上是什么——而英语靠颠倒语序来提问：「You are a student」变成「Are you a student?」。日语拒绝这种重新排列，这对你来说是好消息。\n\n规则懒得出奇：拿任何一个陈述句，在最末尾贴上助词 `か` 就行。什么都不用动。`あなたは学生です`（「你是学生」）变成 `あなたは学生ですか`（「你是学生吗？」）。语序完全一样；`か` 就是个说出来的问号。\n\n为什么这样设计？日语倾向于通过「加标记」而非「重排语序」来提问——你把整个想法说完，再附上一个小词来翻转它的语气。你甚至不需要升调，也不需要写出「？」；`か` 自己就扛起了整个疑问。这种「在末尾贴一个词」的逻辑还会反复出现，所以现在就把它体会顺畅很值得。\n\n想象办理入住：前台瞥你一眼，问 `あなたは学生ですか`，看看学生折扣适不适用。你可以用已经掌握的句型来回答——用 `はい、学生です` 确认，或者搬出上一节的否定式来否认。\n\n温和提醒一句：因为 `か` 本身已经表示疑问，日常的书面日语常常在它后面省略问号。看到一句话以 `か` 结尾、只跟一个句号，是完全正常的，并不是写错。",
      examples: [
        {
          jp: "あなたは学生ですか",
          reading: "あなたはがくせいですか",
          en: "Are you a student?",
          zh: "你是学生吗?",
          code: `import type { ProperNoun, PhraseWithParticle, ConjugateCopula } from "typed-japanese";

type あなた = ProperNoun<"あなた">;
type 学生 = ProperNoun<"学生">;

type あなたは学生ですか = \`\${PhraseWithParticle<あなた, "は">}\${ConjugateCopula<学生, "Polite">}か\`;
`,
        },
      ],
    },
  ],
};

export default chapter;
