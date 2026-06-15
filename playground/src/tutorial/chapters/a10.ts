import type { Chapter } from "../types";

const chapter: Chapter = {
  id: "a10",
  level: "advanced",
  order: 10,
  titleEn: "〜ばかりか / 〜どころか / 〜のみならず",
  titleZh: "〜ばかりか／〜どころか／〜のみならず",
  summaryEn:
    "You praise a new hire and want to say more than \"she's smart, and she's kind too\" — you want a climax: not only smart, but kind on top of that. Back in chapter i14 you learned `〜し` to pile up facts, but it just lists; it can't escalate, reverse a listener's expectation, or sound formal enough for a report. This chapter gives you three sharper tools: `〜ばかりか` escalates (\"not only X but even Y\"), `〜どころか` flips an expectation on its head (\"far from X, the opposite\"), and `〜のみならず` is the bookish twin of だけでなく for essays and speeches.",
  summaryZh:
    "你想夸一位新同事,但不满足于「她聪明,而且也温柔」这种平铺直叙 —— 你想要一个递进的高潮:不仅聪明,还在此之上很温柔。第 i14 章学过用 `〜し` 来堆叠事实,但它只是罗列,无法层层递进、无法推翻听者的预期,也不够正式得体写进报告。本章给你三件更锋利的工具:`〜ばかりか` 表递进(「不仅 X,甚至 Y」),`〜どころか` 把预期彻底翻转(「别说 X,反而相反」),`〜のみならず` 则是 だけでなく 的书面孪生兄弟,用于论说文与演讲。",
  points: [
    {
      id: "a10-1",
      titleEn: "〜ばかりか — not only … (but even)",
      titleZh: "〜ばかりか ——「不仅……(甚至)」",
      bodyEn:
        "Imagine you're recommending a new colleague to your boss. With `〜し` from chapter i14 you could say \"she's smart, and she's kind,\" but that just lays two facts side by side. What you really want is a build-up: she's smart — and on top of that, even kind. That extra punch, where the second fact outshines the first, is exactly what `〜ばかりか` delivers: \"not only X, but even Y.\"\n\nThe shape comes from `ばかり`, the \"just / only\" you've met before (think of the merely-feel in `〜にすぎない` from chapter a05). `ばかりか` literally asks \"is it only X?\" and the answer is \"no — there's even more.\" So X is presented as already true, and Y goes a step further, usually more extreme or more surprising. The second part very often carries `も` (\"also\") or `さえ` (\"even\") to underline that climb.\n\nGrammatically it's easy: attach it to the plain form of verbs and i-adjectives, to na-adjectives plus `な`, or directly to a noun. So `英語ばかりか` (not only English) and `美しいばかりか` (not only beautiful) both work straight off the plain form.\n\nThe one thing to hold onto: `ばかりか` always pushes in the same direction as the first clause — both facts are praise, or both are complaints. If she's smart, Y must be something equally or more impressive, like kind. That sameness of direction is what separates it from `どころか` in the next point, which deliberately reverses course.",
      bodyZh:
        "想象你正向上司推荐一位新同事。用第 i14 章的 `〜し`,你可以说「她聪明,而且温柔」,但那只是把两个事实并排摆着。你真正想要的是层层加码:她聪明 —— 而且在此之上,竟然还很温柔。这种第二项盖过第一项的冲击力,正是 `〜ばかりか` 所提供的:「不仅 X,甚至 Y」。\n\n这个形式来自你早已认识的「只、仅」之意的 `ばかり`(回想第 a05 章 `〜にすぎない` 里那种「不过如此」的语感)。`ばかりか` 字面上是在问「难道只有 X 吗?」,答案是「不 —— 还更甚」。所以 X 被当作已然成立的事实,Y 再进一层,通常更极端、更出人意料。后项常带 `も`(也)或 `さえ`(甚至)来强调这一递进。\n\n语法上很简单:接在动词、形容词普通形之后,接在形容动词 + `な` 之后,或直接接名词。因此 `英語ばかりか`(不仅英语)和 `美しいばかりか`(不仅漂亮)都能直接由普通形接出。\n\n要牢牢记住的一点:`ばかりか` 的方向始终与前项一致 —— 两个事实要么都是褒,要么都是贬。她聪明,那 Y 就得是同样或更出彩的东西,比如温柔。正是这种方向的一致,把它与下一个会刻意反转的 `どころか` 区分开来。",
      examples: [
        {
          jp: "彼は英語ばかりか中国語も話す",
          reading: "かれはえいごばかりかちゅうごくごもはなす",
          en: "He speaks not only English but Chinese as well.",
          zh: "他不仅会说英语,还会说中文。",
          code: `import type { ProperNoun, GodanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 彼 = ProperNoun<"彼">;
type 英語 = ProperNoun<"英語">;
type 中国語 = ProperNoun<"中国語">;
type 話す = GodanVerb & { stem: "話"; ending: "す" };

// 彼 は + 英語 + ばかりか + 中国語 も + 話す (辞書形)
type 彼は英語ばかりか中国語も話す = \`\${PhraseWithParticle<彼, "は">}\${英語}ばかりか\${PhraseWithParticle<中国語, "も">}\${ConjugateVerb<話す, "辞書形">}\`;
`,
        },
        {
          jp: "彼女は美しいばかりか優しい",
          reading: "かのじょはうつくしいばかりかやさしい",
          en: "She is not only beautiful but also kind.",
          zh: "她不仅漂亮,而且温柔。",
          code: `import type { ProperNoun, IAdjective, ConjugateAdjective, PhraseWithParticle } from "typed-japanese";

type 彼女 = ProperNoun<"彼女">;
type 美しい = IAdjective & { stem: "美し"; ending: "い" };
type 優しい = IAdjective & { stem: "優し"; ending: "い" };

// 彼女 は + 美しい (基本形) + ばかりか + 優しい (基本形)
type 彼女は美しいばかりか優しい = \`\${PhraseWithParticle<彼女, "は">}\${ConjugateAdjective<美しい, "基本形">}ばかりか\${ConjugateAdjective<優しい, "基本形">}\`;
`,
        },
      ],
    },
    {
      id: "a10-2",
      titleEn: "〜どころか — far from … / on the contrary",
      titleZh: "〜どころか ——「别说……、反而」",
      bodyEn:
        "Now picture the opposite emotional moment. You helped a friend move all weekend, and instead of a thank-you he complained you'd packed his boxes wrong. You're not just disappointed that he didn't thank you — reality went to the other extreme. That gap between what was expected and what actually happened is the home of `〜どころか`: \"far from X, it was the opposite.\"\n\nWhere `ばかりか` keeps pushing in one direction, `どころか` yanks the listener's expectation around. It first names X — the modest, reasonable thing you'd assume — then announces that the truth lies at the far end. English reaches for \"far from …,\" \"let alone …,\" or \"on the contrary.\"\n\nThere are two everyday flavours. In the contrast pattern (X どころか Y), Y is the surprising opposite: `お金持ちどころか貧乏だ`, \"far from rich, he's broke.\" In the scaling pattern (X どころか Y も …ない), you set up a big X and then deny even a smaller Y: \"forget a house — I can't even afford a car.\" It attaches to plain forms and to bare nouns.\n\nA quick tip on tone: `どころか` carries real feeling — surprise, exasperation, indignation — so it shines when you're venting. \"Far from apologizing, he got angry at me\" is precisely the kind of expectation-flip it was built for, and it lands far harder than a flat \"he didn't apologize.\"",
      bodyZh:
        "现在设想相反的情绪时刻。你帮朋友搬了一整个周末的家,结果他非但不道谢,还抱怨你箱子装错了。你失望的不只是他没道谢 —— 现实走向了另一个极端。这种「预期」与「实际」之间的落差,正是 `〜どころか` 的用武之地:「别说 X 了,反而相反」。\n\n如果说 `ばかりか` 是朝一个方向持续加码,`どころか` 则是把听者的预期猛地扭转过来。它先点出 X —— 你本会理所当然设想的那个温和、合理的情况 —— 再宣告真相落在了另一端。对应英语的 “far from …”“let alone …” 或 “on the contrary”。\n\n它有两种日常用法。表对比时(X どころか Y),Y 是出人意料的相反情况:`お金持ちどころか貧乏だ`,「别说有钱,他穷得很」。表程度递降时(X どころか Y も …ない),先立一个大的 X,再连更小的 Y 都否定:「别说房子,连车都买不起」。它接在普通形和裸名词之后。\n\n关于语气的小提示:`どころか` 带有真切的情绪 —— 惊讶、恼火、愤慨 —— 所以最适合用来发牢骚。「别说道歉,他反倒冲我发火」正是它为之而生的预期反转,比干巴巴的「他没道歉」要有力得多。",
      examples: [
        {
          jp: "彼はお金持ちどころか貧乏だ",
          reading: "かれはおかねもちどころかびんぼうだ",
          en: "Far from being rich, he is poor.",
          zh: "他别说有钱了,反而很穷。",
          code: `import type { ProperNoun, PhraseWithParticle, ConjugateCopula } from "typed-japanese";

type 彼 = ProperNoun<"彼">;
type お金持ち = ProperNoun<"お金持ち">;
type 貧乏 = ProperNoun<"貧乏">;

// 彼 は + お金持ち + どころか + 貧乏 だ
type 彼はお金持ちどころか貧乏だ = \`\${PhraseWithParticle<彼, "は">}\${お金持ち}どころか\${ConjugateCopula<貧乏, "断定形">}\`;
`,
        },
        {
          jp: "休むどころか働いた",
          reading: "やすむどころかはたらいた",
          en: "Far from resting, I worked.",
          zh: "别说休息了,反而干了活。",
          code: `import type { GodanVerb, ConjugateVerb } from "typed-japanese";

type 休む = GodanVerb & { stem: "休"; ending: "む" };
type 働く = GodanVerb & { stem: "働"; ending: "く" };

// 休む (辞書形) + どころか + 働いた (た形)
type 休むどころか働いた = \`\${ConjugateVerb<休む, "辞書形">}どころか\${ConjugateVerb<働く, "た形">}\`;
`,
        },
      ],
    },
    {
      id: "a10-3",
      titleEn: "〜のみならず — not only … but also (formal)",
      titleZh: "〜のみならず ——「不仅……而且」(书面)",
      bodyEn:
        "`ばかりか` is perfect for chatting about a colleague, but suppose you're now writing the quarterly report itself. \"This downturn affects not only sales but the whole industry\" needs a register to match — `ばかりか` would feel a touch too conversational on the page. This is where `〜のみならず` steps in: it's the literary, formal counterpart of `ばかりか` and of the plain `だけでなく`, meaning \"not only X but also Y.\"\n\nThe key here is register, not meaning — a theme you've been tracking since the keigo chapters (i04, i05) and the formal connectives of a09. `のみ` is the bookish word for \"only\" (the everyday `だけ` dressed up for print), so `のみならず` literally reads \"not being only,\" the elegant way to say \"not just.\" You'll meet it in essays, news articles, and speeches far more than in everyday talk, and the following clause usually adds a broader or weightier point, often marked with `も`.\n\nMechanically, attach it directly to nouns and to the plain form of verbs and i-adjectives; na-adjectives take `である` first, as in `静かであるのみならず`. So `学生のみならず先生も来た` frames the students as just one slice of a bigger turnout that the teachers complete, and `国内のみならず海外でも` widens the scope from home to abroad.\n\nThe takeaway: when you need to say \"not only,\" let the setting choose the word. Talking to a friend, reach for `だけでなく` or `ばかりか`; writing something that should sound authoritative, switch to `のみならず` and your sentence instantly reads like print.",
      bodyZh:
        "`ばかりか` 用来闲聊同事再合适不过,但假设你现在要亲手写季度报告。「这次下滑不仅影响销售,还波及整个行业」需要相称的语体 —— `ばかりか` 落在纸面上会略显口语。这时 `〜のみならず` 登场:它是 `ばかりか` 以及口语 `だけでなく` 的文言、正式对应形式,意为「不仅 X,而且 Y」。\n\n这里的关键在语体而非语义 —— 这正是你从敬语章节(i04、i05)和第 a09 章的正式连接词一路追踪的主题。`のみ` 是「只」的书面词(日常 `だけ` 的盛装版),所以 `のみならず` 字面上是「不只是」,是「不仅」的雅致说法。它多见于论说文、新闻和演讲,远多于日常对话,而后续小句通常补充范围更广或分量更重的内容,常带 `も`。\n\n语法上,它直接接名词,以及动词、形容词的普通形;形容动词需先加 `である`,如 `静かであるのみならず`。因此 `学生のみならず先生も来た` 把学生视为更大到场人群的一部分,由老师来补全;`国内のみならず海外でも` 则把范围从国内扩展到海外。\n\n要领是:当你需要表达「不仅」时,让场合来挑词。与朋友交谈,用 `だけでなく` 或 `ばかりか`;写需要显得权威的文字,换成 `のみならず`,你的句子立刻读来如同印刷体。",
      examples: [
        {
          jp: "学生のみならず先生も来た",
          reading: "がくせいのみならずせんせいもきた",
          en: "Not only the students but also the teachers came.",
          zh: "不仅学生,连老师也来了。",
          code: `import type { ProperNoun, IrregularVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 学生 = ProperNoun<"学生">;
type 先生 = ProperNoun<"先生">;
type 来る = IrregularVerb & { dictionary: "来る" };

// 学生 + のみならず + 先生 も + 来た (た形 of 来る)
type 学生のみならず先生も来た = \`\${学生}のみならず\${PhraseWithParticle<先生, "も">}\${ConjugateVerb<来る, "た形">}\`;
`,
        },
        {
          jp: "国内のみならず海外でも有名だ",
          reading: "こくないのみならずかいがいでもゆうめいだ",
          en: "It is famous not only domestically but also abroad.",
          zh: "它不仅在国内,在海外也很有名。",
          code: `import type { ProperNoun, ConjugateCopula } from "typed-japanese";

type 国内 = ProperNoun<"国内">;
type 海外 = ProperNoun<"海外">;
type 有名 = ProperNoun<"有名">;

// 国内 + のみならず + 海外 + でも + 有名だ
type 国内のみならず海外でも有名だ = \`\${国内}のみならず\${海外}でも\${ConjugateCopula<有名, "断定形">}\`;
`,
        },
      ],
    },
  ],
};

export default chapter;
