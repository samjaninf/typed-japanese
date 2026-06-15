import type { Chapter } from "../types";

const chapter: Chapter = {
  id: "a09",
  level: "advanced",
  order: 9,
  titleEn: "〜とはいえ / 〜といっても / 〜からといって",
  titleZh: "〜とはいえ／〜といっても／〜からといって",
  summaryEn:
    "Picture writing an essay: you want to say “granted it's convenient — but there are still risks,” the kind of polished concession that 〜ても and 〜のに from i07 can't quite reach. This chapter gives you three “quote-then-push-back” moves, all built from the quotative `と` (“saying that”) you already know from i20: `〜とはいえ` grants a fact before qualifying it, `〜といっても` walks back your own overstated label, and `〜からといって` blocks a faulty inference (“just because X doesn't mean Y”). Each one quotes a claim, then concedes or rejects the conclusion drawn from it — which is exactly why they feel like argument moves.",
  summaryZh:
    "想象你正在写一篇文章:你想说「虽说方便,但仍有风险」——这种漂亮的让步,是 i07 学过的「〜ても」和「〜のに」难以表达的。本章给你三个「先引用、再反驳」的招式,它们都建立在你早已熟悉的引用助词 `と`(「说…」,见 i20)之上:`〜とはいえ` 先承认事实再加以限定,`〜といっても` 把自己说大了的标签收回来,`〜からといって` 挡住一个站不住脚的推论(「不能因为 X 就认定 Y」)。每个句型都先引用一个说法,再否定由它推出的结论——这正是它们读起来像辩论招式的原因。",
  points: [
    {
      id: "a09-1",
      titleEn: "〜とはいえ — although; even so",
      titleZh: "〜とはいえ ——「虽说…」",
      bodyEn:
        "You already have two ways to concede a point: `〜ても` (“even if”) handles hypotheticals, and `〜のに` (“although, and yet”) from i07 carries a note of reproach about an actual fact. But neither sounds right at the head of a written argument, where you want to grant a point cleanly and then qualify it — “granted it's spring, but it's still cold.” That polished, essay-like concession is what `〜とはいえ` (to wa ie) is for.\n\nLook at where it comes from and the meaning falls out. It is the quotative `と` (“that”) + topic `は` + an old form of 言う (“to say”), so literally “though one says thus.” You acknowledge the claim out loud, then signal that the expectation it raises doesn't fully hold.\n\nMechanically it attaches straight onto a plain-form predicate or a noun: `Noun + とはいえ`, `い-adjective (基本形) + とはいえ`, `Verb (plain) + とはいえ`. With a noun the copula だ is usually dropped, as in `便利とはいえ` (“granted it's convenient”).\n\nImagine you're drafting a work email about a new tool: `便利とはいえ高い` — “convenient, yes, but expensive.” You've conceded the upside in three syllables and pivoted to your real point. The tone is reflective and a touch literary, so it shines in essays and considered speech, but would feel stiff in a quick text to a friend.",
      bodyZh:
        "你已经有两种让步的方式:`〜ても`(「即使」)处理假设情况,而 i07 学过的 `〜のに`(「虽然…却」)则带着对既成事实的一丝责怪。但这两者都不适合放在书面论述的开头——在那里你想干脆利落地先承认一点,再加以限定:「虽说是春天,却还很冷」。这种漂亮的、随笔式的让步,正是 `〜とはいえ`(to wa ie)的用武之地。\n\n看看它的来历,意思便不言自明。它是引用助词 `と`(「说…」)+ 提示助词 `は` + 「言う」(说)的古老形式,字面就是「虽这么说」。你先把这个说法摆出来承认,再提示由它带来的预期其实并不完全成立。\n\n结构上它直接接在简体谓语或名词之后:「名词 + とはいえ」「形容词(基本形)+ とはいえ」「动词(简体)+ とはいえ」。接名词时通常省去系动词「だ」,如 `便利とはいえ`(「虽说方便」)。\n\n设想你正在草拟一封介绍新工具的工作邮件:`便利とはいえ高い`——「方便是方便,但很贵」。短短几个音节就承认了优点,随即转向你真正要说的。它语气沉稳、略带书面色彩,因此在文章和经过斟酌的发言中最为出色,放进给朋友的随手短信里则会显得生硬。",
      examples: [
        {
          jp: "春とはいえまだ寒い",
          reading: "はるとはいえまださむい",
          en: "Although it's spring, it's still cold.",
          zh: "虽说是春天,却还很冷。",
          code: `import type { ProperNoun, IAdjective, ConjugateAdjective } from "typed-japanese";

type 春 = ProperNoun<"春">;
type 寒い = IAdjective & { stem: "寒"; ending: "い" };

// 春 + とはいえ + まだ + 寒い (基本形)
type 春とはいえまだ寒い = \`\${春}とはいえまだ\${ConjugateAdjective<寒い, "Basic">}\`;
`,
        },
        {
          jp: "便利とはいえ高い",
          reading: "べんりとはいえたかい",
          en: "Although it's convenient, it's expensive.",
          zh: "虽说方便,但很贵。",
          code: `import type { ProperNoun, IAdjective, ConjugateAdjective } from "typed-japanese";

type 便利 = ProperNoun<"便利">;
type 高い = IAdjective & { stem: "高"; ending: "い" };

// 便利 (noun, だ dropped) + とはいえ + 高い (基本形)
type 便利とはいえ高い = \`\${便利}とはいえ\${ConjugateAdjective<高い, "Basic">}\`;
`,
        },
      ],
    },
    {
      id: "a09-2",
      titleEn: "〜といっても — even though one says",
      titleZh: "〜といっても ——「虽说是…,其实」",
      bodyEn:
        "Sometimes the problem isn't conceding someone else's point — it's that a word you yourself just used sounds bigger than the truth. You text a friend “I got a raise,” then realize “raise” is wildly generous for the few extra coins involved, and you want to take it back in the same breath. `〜といっても` (to itte mo) is the move for that: “I say —, but in fact ….”\n\nThe shape spells out the logic. It's the quotative `と` (“that”) + the て形 of 言う (`言って`, “saying”) + the concessive `も` (“even”) you met in `〜ても`. So it's literally “even saying X” — you let the label stand, then immediately undercut it.\n\nIt attaches to a noun or a plain-form clause: `Noun + といっても`, `Verb/Adj (plain) + といっても`. The second clause almost always carries a downgrading word — `だけ` (“only”), `ほんの` (“just a”), or a small number — to deliver the deflation.\n\nSo when your friend asks about your “study abroad,” you head off the wrong impression: `留学といっても一週間だけ` — “I say study abroad, but it was only a week.” You named the impressive thing and shrank it in one line, which is precisely the honest, self-deprecating tone `〜といっても` is built for.",
      bodyZh:
        "有时候要让步的并不是别人的观点,而是你自己刚用的某个词听起来比实情大得多。你给朋友发消息说「我涨工资了」,随即意识到对那几个铜板而言「涨工资」实在太夸张,于是想在同一句话里把它收回来。`〜といっても`(to itte mo)正是为此而生:「虽说是…,其实…」。\n\n它的构造把这层逻辑摊开来看。它是引用助词 `と`(「说…」)+ 「言う」的て形(`言って`,「说着」)+ 你在「〜ても」里见过的让步助词 `も`(「即使」)。所以字面就是「即使这么说」——你先让这个标签立住,再立刻把它削下去。\n\n它接在名词或简体小句之后:「名词 + といっても」「动词/形容词(简体)+ といっても」。后句几乎总带一个降调的词——`だけ`(「仅仅」)、`ほんの`(「只是」),或是一个小数目——来完成这一「泄气」。\n\n于是当朋友问起你的「留学」时,你抢先打消误会:`留学といっても一週間だけ`——「说是留学,其实只有一个星期」。你先点出那个听着风光的词,再用一句把它缩小,这正是 `〜といっても` 所擅长的那种诚实而自谦的语气。",
      examples: [
        {
          jp: "留学といっても一週間だけ",
          reading: "りゅうがくといっていしゅうかんだけ",
          en: "I say I studied abroad, but it was only a week.",
          zh: "虽说是留学,其实只有一个星期。",
          code: `import type { ProperNoun } from "typed-japanese";

type 留学 = ProperNoun<"留学">;
type 一週間 = ProperNoun<"一週間">;

// 留学 + といっても + 一週間 + だけ
type 留学といっても一週間だけ = \`\${留学}といっても\${一週間}だけ\`;
`,
        },
        {
          jp: "高いといっても千円だ",
          reading: "たかいといってもせんえんだ",
          en: "Even though I say it's expensive, it's a thousand yen.",
          zh: "虽说贵,也就一千日元。",
          code: `import type { ProperNoun, IAdjective, ConjugateAdjective, ConjugateCopula } from "typed-japanese";

type 高い = IAdjective & { stem: "高"; ending: "い" };
type 千円 = ProperNoun<"千円">;

// 高い (基本形) + といっても + 千円 + だ
type 高いといっても千円だ = \`\${ConjugateAdjective<高い, "Basic">}といっても\${ConjugateCopula<千円, "Plain">}\`;
`,
        },
      ],
    },
    {
      id: "a09-3",
      titleEn: "〜からといって — just because",
      titleZh: "〜からといって ——「仅仅因为…(并不就)」",
      bodyEn:
        "From i14 you know `から` asserts a reason: 安いから, “because it's cheap.” But what if you want to attack that very inference — to say someone is jumping from a fact to a conclusion that doesn't follow? You're cautioning a friend who assumes a rich acquaintance must be happy, and you need to say “just because he's rich doesn't mean he's happy.” `〜からといって` (kara to itte) is the rebuttal twin of `から`.\n\nThe construction is `から` (“because”) + the quotative `と` + 言って (“saying”): “just because one says it's from this reason.” You quote the would-be reason, then refuse to let it settle the matter. Because of this, the second half almost always lands on a negative — `〜とは限らない` (“isn't necessarily”), `〜わけではない` (“it's not that”), or a plain `〜ない`.\n\nIt attaches to a plain-form clause: `Verb/Adj (plain) + からといって`, and for nouns you keep だ: `Noun + だ + からといって`.\n\nSo standing in a shop, resisting an impulse buy, you tell yourself `安いからといって買わない` — “I won't buy it just because it's cheap.” The cheapness is real; you simply deny that it forces the purchase. The pitfall to remember: leaving the sentence positive feels unfinished to a Japanese ear — `〜からといって` sets up a denial, so let the second clause actually deliver one.",
      bodyZh:
        "你在 i14 学过 `から` 用来断定一个理由:安いから,「因为便宜」。可如果你想攻击的恰恰是这个推论本身——指出对方从一个事实跳到了并不成立的结论呢?你在劝一位朋友,他想当然地以为某个有钱的熟人一定幸福,而你需要说「不能因为他有钱就认定他幸福」。`〜からといって`(kara to itte)就是 `から` 的反驳版。\n\n它的构造是 `から`(「因为」)+ 引用助词 `と` + 言って(「说着」):「仅仅说是出于这个理由」。你先把那个所谓的理由引述出来,再拒绝让它就此定论。正因如此,后半句几乎总落在否定上——`〜とは限らない`(「未必」)、`〜わけではない`(「并不是」),或干脆 `〜ない`。\n\n它接在简体小句之后:「动词/形容词(简体)+ からといって」;接名词时要保留「だ」:「名词 + だ + からといって」。\n\n于是站在店里,忍住冲动消费时,你对自己说 `安いからといって買わない`——「不会仅仅因为便宜就买」。便宜是真的,你只是否认它能逼你掏钱。要记住的陷阱是:把句子停在肯定处,在日本人听来会觉得话没说完——`〜からといって` 摆好的是一个否定的架势,所以一定要让后句真正给出那个否定。",
      examples: [
        {
          jp: "安いからといって買わない",
          reading: "やすいからといってかわない",
          en: "I won't buy it just because it's cheap.",
          zh: "不会仅仅因为便宜就买。",
          code: `import type { IAdjective, ConjugateAdjective, GodanVerb, ConjugateVerb } from "typed-japanese";

type 安い = IAdjective & { stem: "安"; ending: "い" };
type 買う = GodanVerb & { stem: "買"; ending: "う" };

// 安い (基本形) + からといって + 買わ (ない形 stem) + ない
type 安いからといって買わない = \`\${ConjugateAdjective<安い, "Basic">}からといって\${ConjugateVerb<買う, "Nai">}ない\`;
`,
        },
        {
          jp: "学生だからといって暇ではない",
          reading: "がくせいだからといってひまではない",
          en: "Just because I'm a student doesn't mean I'm free.",
          zh: "并不是因为是学生就有空。",
          code: `import type { ProperNoun, NaAdjective, ConjugateAdjective, ConjugateCopula } from "typed-japanese";

type 学生 = ProperNoun<"学生">;
type 暇 = NaAdjective & { stem: "暇" };

// 学生 + だ + からといって + 暇ではない (否定形)
type 学生だからといって暇ではない = \`\${ConjugateCopula<学生, "Plain">}からといって\${ConjugateAdjective<暇, "Negative">}\`;
`,
        },
      ],
    },
  ],
};

export default chapter;
