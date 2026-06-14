import type { Chapter } from "../types";

const chapter: Chapter = {
  id: "e15",
  level: "elementary",
  order: 15,
  titleEn: "Desire: 〜たい / 〜がほしい",
  titleZh: "愿望：〜たい／〜がほしい",
  summaryEn:
    "You're standing at a café counter, or telling a friend your weekend plans, and you need to say not just what you do but what you WANT. Attach `〜たい` to a verb's `ます`-stem to say “want to (do)”, use `〜がほしい` to say you want a thing, and negate `〜たい` as `〜たくない` to turn an invitation down.",
  summaryZh:
    "你正站在咖啡店的柜台前,或在跟朋友聊周末的打算,这时你需要说的不只是「我做什么」,而是「我想要什么」。在动词的「ます形」词干后接 `〜たい` 表示「想做(某事)」,用 `〜がほしい` 表示「想要(某物)」,并把 `〜たい` 否定为 `〜たくない`,用来婉拒别人的邀约。",
  points: [
    {
      id: "e15-1",
      titleEn: "〜たい — “want to do”",
      titleZh: "〜たい ——「想做」",
      bodyEn:
        "Back in chapter 5 you learned `飲みます` (“drink”), and in chapter 7 you could push it into the past. But every one of those sentences was about what you actually do or did — you still had no way to say “I'd LIKE to drink water,” the wish behind the action. That gap is exactly what `〜たい` fills.\n\nThe rule is wonderfully simple because you already own half of it. Remember the `ます`-stem — the piece that sits right before `ます`? Take that stem and, instead of `ます`, attach `たい`. So `飲む` → `飲み` → `飲みたい` (“want to drink”), and `行く` → `行き` → `行きたい` (“want to go”). If you can say the polite form, you can already form the desire.\n\nHere is the part worth pausing on: once you've made `飲みたい`, it stops behaving like a verb and starts behaving like an `い`-adjective. Japanese treats wanting-to-do as a describable state of you — a feeling you're in — rather than an action you perform. That intuition is why it conjugates like `高い` or `新しい` from chapter 8, and it's the key to the whole chapter.\n\nA small side effect: the object of a `〜たい` sentence is often marked with `が` instead of the `を` you'd expect (e.g. `水が飲みたい`), as if the water is the thing your desire is pointed at. Using `を` is also fine and common, so don't agonize over it.\n\nPicture telling friends over lunch where you dream of going: `日本へ行きたいです` — “I want to go to Japan.” Add `です` for politeness, just as you'd politely round off any adjective. One caution: `〜たい` states YOUR own desire. To report what someone else wants, Japanese switches to `〜たがっている`, because you can't directly see inside another person's heart.",
      bodyZh:
        "在第 5 章你学会了 `飲みます`(「喝」),第 7 章又能把它推到过去时。但那些句子说的都是你实际「做」或「做过」什么——你仍然没办法说出「我『想』喝水」这层藏在动作背后的愿望。`〜たい` 填的正是这个空缺。\n\n规则简单得令人欣慰,因为你早就握着它的一半了。还记得「ます形」词干吗——也就是 `ます` 前面那一截?把那截词干留下,不接 `ます`,改接 `たい`。于是 `飲む` → `飲み` → `飲みたい`(「想喝」),`行く` → `行き` → `行きたい`(「想去」)。只要你会说礼貌体,就已经会造愿望句了。\n\n有一点值得停下来体会:一旦造出 `飲みたい`,它就不再像动词,而开始像 `い` 形容词那样活用。日语把「想做某事」看成你身上一种可被描述的状态——一种你正处在其中的感受——而非你执行的动作。正是这种直觉,让它的变化跟第 8 章的 `高い`、`新しい` 一样,而这也是理解整章的钥匙。\n\n还有个小小的副作用:`〜たい` 句子的宾语常用 `が` 标记,而不是你预期的 `を`(如 `水が飲みたい`),仿佛那杯水正是你愿望所指向的对象。用 `を` 也完全可以、也很常见,所以不必为此纠结。\n\n想象你在午饭时告诉朋友自己梦想去哪里:`日本へ行きたいです`——「我想去日本。」加上 `です` 表示礼貌,就像给任何形容词收个礼貌的尾。要提醒一句:`〜たい` 说的是「你自己」的愿望。要转述别人想做什么,日语会改用 `〜たがっている`,因为你没法直接看进别人的心里。",
      examples: [
        {
          jp: "私は水が飲みたい",
          reading: "わたしはみずがのみたい",
          en: "I want to drink water.",
          zh: "我想喝水。",
          code: `import type { ProperNoun, GodanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 私 = ProperNoun<"私">;
type 水 = ProperNoun<"水">;
type 飲む = GodanVerb & { stem: "飲"; ending: "む" };

// 私 + は + 水 + が + 飲み(ます形) + たい
type 私は水が飲みたい = \`\${PhraseWithParticle<私, "は">}\${PhraseWithParticle<水, "が">}\${ConjugateVerb<飲む, "ます形">}たい\`;
`,
        },
        {
          jp: "寿司が食べたい",
          reading: "すしがたべたい",
          en: "I want to eat sushi.",
          zh: "我想吃寿司。",
          code: `import type { ProperNoun, IchidanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 寿司 = ProperNoun<"寿司">;
type 食べる = IchidanVerb & { stem: "食べ"; ending: "る" };

// 寿司 + が + 食べ(ます形) + たい
type 寿司が食べたい = \`\${PhraseWithParticle<寿司, "が">}\${ConjugateVerb<食べる, "ます形">}たい\`;
`,
        },
        {
          jp: "日本へ行きたいです",
          reading: "にほんへいきたいです",
          en: "I want to go to Japan.",
          zh: "我想去日本。",
          code: `import type { ProperNoun, GodanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 日本 = ProperNoun<"日本">;
type 行く = GodanVerb & { stem: "行"; ending: "く" };

// 日本 + へ + 行き(ます形) + たい + です (polite)
type 日本へ行きたいです = \`\${PhraseWithParticle<日本, "へ">}\${ConjugateVerb<行く, "ます形">}たいです\`;
`,
        },
      ],
    },
    {
      id: "e15-2",
      titleEn: "〜がほしい — “want a thing”",
      titleZh: "〜がほしい ——「想要某物」",
      bodyEn:
        "`〜たい` handles wanting to do something — but what about simply wanting to have something? At a café you don't want to “do” a coffee; you just want a coffee. For a birthday you don't perform a new bag; you want one. There's no verb to bolt `たい` onto, so Japanese gives the thing-wanting a word of its own: `ほしい`.\n\nThe pattern is `Noun が ほしい`. Notice the `が` — the very same particle that marked existence back in chapter 3 (`水があります`). It points at the thing your wish lands on. So `車がほしい` is “I want a car,” and `コーヒーがほしい` is the natural thing to think at that café counter.\n\nWhy `が` again, and why does it feel so adjective-like? Because `ほしい` IS an `い`-adjective, just like `新しい` or `高い`. You're not really performing an action; you're describing a state of longing. That's also why it slots in beside other adjectives so smoothly: `新しいかばんがほしいです` — “I want a new bag,” with `新しい` modifying `かばん` exactly as you learned in chapter 8.\n\nFor politeness, treat it like any adjective and add `です`: `ほしいです`. And the same warning as before applies — `ほしい` describes your own want. Imagine hinting to family before your birthday what you'd love to receive: that's `〜がほしいです` doing precisely the job it was built for.",
      bodyZh:
        "`〜たい` 负责「想做」某事——但只是「想拥有」某样东西呢?在咖啡店,你并不想「做」一杯咖啡,你只是想要一杯咖啡;过生日,你不会去「执行」一个新包,你只是想要一个。这里没有动词可以挂上 `たい`,所以日语给「想要某物」配了个专属的词:`ほしい`。\n\n句型是「名词 が ほしい」。注意这个 `が`——正是第 3 章标记存在的那个助词(`水があります`)。它指向你愿望落脚的那样东西。于是 `車がほしい` 是「我想要一辆车」,而 `コーヒーがほしい` 正是你在咖啡柜台前自然会冒出的念头。\n\n为什么又是 `が`,又为什么这么像形容词?因为 `ほしい` 本身就是 `い` 形容词,跟 `新しい`、`高い` 一样。你并不是在执行动作,而是在描述一种渴望的状态。这也是它能跟其他形容词如此顺滑地拼在一起的原因:`新しいかばんがほしいです`——「我想要一个新包」,其中 `新しい` 修饰 `かばん`,正如你在第 8 章学过的那样。\n\n要表示礼貌,就把它当普通形容词,加 `です`:`ほしいです`。前面那句提醒同样适用——`ほしい` 描述的是你自己的愿望。想象你在生日前向家人暗示自己最想收到什么:那正是 `〜がほしいです` 在干它生来就该干的活。",
      examples: [
        {
          jp: "私は車がほしい",
          reading: "わたしはくるまがほしい",
          en: "I want a car.",
          zh: "我想要一辆车。",
          code: `import type { ProperNoun, PhraseWithParticle } from "typed-japanese";

type 私 = ProperNoun<"私">;
type 車 = ProperNoun<"車">;

// 私 + は + 車 + が + ほしい
type 私は車がほしい = \`\${PhraseWithParticle<私, "は">}\${PhraseWithParticle<車, "が">}ほしい\`;
`,
        },
        {
          jp: "新しいかばんがほしいです",
          reading: "あたらしいかばんがほしいです",
          en: "I want a new bag.",
          zh: "我想要一个新包。",
          code: `import type { ProperNoun, IAdjective, ConjugateAdjective, PhraseWithParticle } from "typed-japanese";

type 新しい = IAdjective & { stem: "新し"; ending: "い" };
type かばん = ProperNoun<"かばん">;

// 新しい(基本形) + かばん + が + ほしいです
type 新しいかばんがほしいです = \`\${ConjugateAdjective<新しい, "基本形">}\${PhraseWithParticle<かばん, "が">}ほしいです\`;
`,
        },
      ],
    },
    {
      id: "e15-3",
      titleEn: "Negative: 〜たくない",
      titleZh: "否定：〜たくない",
      bodyEn:
        "Sometimes the honest answer is no. A coworker asks if you'll come in this weekend; a host offers you a dish you'd rather skip. You need to say not “I want to,” but “I'd rather not.” Here all the groundwork from point 1 pays off in a single move.\n\nRecall that `飲みたい` behaves like an `い`-adjective. And how did you negate `い`-adjectives back in chapter 8? Drop the final `い`, add `くない`: `高い` → `高くない`. Apply the exact same rule here: `飲みたい` → `飲みたくない` (“don't want to drink”). Nothing new to memorize — you're just reusing a tool you already trust.\n\nFor a polite negative, tack on `です`: `〜たくないです`. There's also a more formal flavor, `〜たくありません`, which you may meet in stiffer settings; either is correct, with `〜たくないです` feeling a touch softer and more conversational.\n\nSo when you'd rather stay home, you can say it cleanly: `今日は働きたくない` — “I don't want to work today.” And because `ほしい` is an `い`-adjective too, the very same surgery turns it negative: `ほしい` → `ほしくない` (“don't want it”). Learn the adjective negative once, and both kinds of desire bend to your will.",
      bodyZh:
        "有时候,诚实的答案就是「不」。同事问你这周末来不来加班;主人端上一道你宁可不碰的菜。你需要说的不是「我想」,而是「我不太想」。这时第 1 点打下的全部地基,会在一个动作里一次兑现。\n\n回想一下:`飲みたい` 像 `い` 形容词那样活用。而第 8 章里你是怎么否定 `い` 形容词的?去掉词尾的 `い`,加 `くない`:`高い` → `高くない`。把同一条规则照搬到这里:`飲みたい` → `飲みたくない`(「不想喝」)。没有任何新东西要背——你只是在复用一件早已信得过的工具。\n\n要表示礼貌否定,接上 `です`:`〜たくないです`。还有一种更郑重的说法 `〜たくありません`,你可能在较正式的场合遇到;两者都对,而 `〜たくないです` 听起来稍微柔和、更口语一些。\n\n于是当你宁愿待在家里时,可以干脆地说出口:`今日は働きたくない`——「今天不想工作。」而由于 `ほしい` 也是 `い` 形容词,完全相同的手法也能把它变否定:`ほしい` → `ほしくない`(「不想要」)。把形容词的否定学会一次,两种愿望就都任你拿捏了。",
      examples: [
        {
          jp: "今日は働きたくない",
          reading: "きょうははたらきたくない",
          en: "I don't want to work today.",
          zh: "今天不想工作。",
          code: `import type { ProperNoun, GodanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 今日 = ProperNoun<"今日">;
type 働く = GodanVerb & { stem: "働"; ending: "く" };

// 今日 + は + 働き(ます形) + たくない
type 今日は働きたくない = \`\${PhraseWithParticle<今日, "は">}\${ConjugateVerb<働く, "ます形">}たくない\`;
`,
        },
        {
          jp: "肉は食べたくないです",
          reading: "にくはたべたくないです",
          en: "I don't want to eat meat.",
          zh: "我不想吃肉。",
          code: `import type { ProperNoun, IchidanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 肉 = ProperNoun<"肉">;
type 食べる = IchidanVerb & { stem: "食べ"; ending: "る" };

// 肉 + は + 食べ(ます形) + たくないです
type 肉は食べたくないです = \`\${PhraseWithParticle<肉, "は">}\${ConjugateVerb<食べる, "ます形">}たくないです\`;
`,
        },
      ],
    },
  ],
};

export default chapter;
