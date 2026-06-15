import type { Chapter } from "../types";

const chapter: Chapter = {
  id: "e04",
  level: "elementary",
  order: 4,
  titleEn: "Numbers, time & counters",
  titleZh: "数字、时间与量词",
  summaryEn:
    "You're standing at the register and the clerk says a number — but in chapter 3 you could only say that apples exist, not that there are three of them or that they cost 500 yen. This chapter wires numbers into the sentences you already build: prices in `〜円`, clock time in `〜時〜分`, counting with the right counter (`〜つ`, `〜人`, `〜枚` …), and the `から〜まで` frame for any span from a start point to an end point.",
  summaryZh:
    "你正站在收银台前,店员报出一个数字——可是在第 3 章里,你只能说苹果「存在」,却说不出「有三个」或「卖 500 日元」。本章把数字接进你已经会搭的句子里:用 `〜円` 说价格,用 `〜時〜分` 说时间,用合适的量词(`〜つ`、`〜人`、`〜枚`……)数东西,再用 `から〜まで` 框住任何「从起点到终点」的范围。",
  points: [
    {
      id: "e04-1",
      titleEn: "Prices: 〜円 (yen)",
      titleZh: "价格:〜円(日元)",
      bodyEn:
        "Since chapter 1 you've been able to say `これはコーヒーです` — \"this is coffee.\" What you couldn't yet say is how much that coffee costs. Japanese fills the gap simply: it treats a price as just another noun and drops it into the very same `Aは Bです` frame.\n\nMoney is counted with the counter `円` (en, yen), glued directly onto the number with no space: `300円` is three hundred yen. Then the whole price acts as the predicate noun: `Topic は <price>円 です`. There is no separate verb for \"to cost\" — `です` does all the work, exactly as it did for \"this is coffee.\"\n\nImagine you pick up a paperback in a bookshop and want to confirm the price. You point and ask with the price question word `いくら` (\"how much\"): `これはいくらですか` — \"How much is this?\" The clerk answers `1500円です`, slotting the number straight into the same pattern.\n\nOne thing to watch: Japanese reads big numbers in groups of four, not three, so `1500` is `せんごひゃく` (one-thousand-five-hundred), not \"fifteen hundred.\" The readings on these examples are worth saying aloud a few times.",
      bodyZh:
        "从第 1 章起,你就会说 `これはコーヒーです`——「这是咖啡」。可你还说不出这杯咖啡多少钱。日语的解决办法很省事:它把「价格」当成又一个名词,直接塞进你早就熟悉的 `Aは Bです` 句型里。\n\n金额用量词 `円`(en,日元)来数,紧贴在数字后面、中间不留空:`300円` 就是三百日元。整个价格就充当谓语名词:「主题 は <价格>円 です」。日语里没有单独表示「值多少钱」的动词——全靠 `です`,和说「这是咖啡」时一模一样。\n\n设想你在书店拿起一本平装书,想确认价钱。你指着它,用价格疑问词 `いくら`(「多少钱」)问:`これはいくらですか`——「这个多少钱?」店员回答 `1500円です`,把数字直接套进同一个句型。\n\n有一点要留心:日语的大数字是每四位一组来读,不是三位,所以 `1500` 读作 `せんごひゃく`(一千五百),而不是「十五个百」。例句上的读音值得多念几遍。",
      examples: [
        {
          jp: "これは300円です",
          reading: "これはさんびゃくえんです",
          en: "This is 300 yen.",
          zh: "这个是 300 日元。",
          code: `import type { ProperNoun, PhraseWithParticle, ConjugateCopula } from "typed-japanese";

type これ = ProperNoun<"これ">;
type 値段 = ProperNoun<"300円">;

// これ + は (topic) + 300円 + です
type これは300円です = \`\${PhraseWithParticle<これ, "は">}\${ConjugateCopula<値段, "丁寧形">}\`;
`,
        },
        {
          jp: "この本は1500円です",
          reading: "このほんはせんごひゃくえんです",
          en: "This book is 1500 yen.",
          zh: "这本书是 1500 日元。",
          code: `import type { ProperNoun, PhraseWithParticle, ConjugateCopula } from "typed-japanese";

type この本 = ProperNoun<"この本">;
type 値段 = ProperNoun<"1500円">;

type この本は1500円です = \`\${PhraseWithParticle<この本, "は">}\${ConjugateCopula<値段, "丁寧形">}\`;
`,
        },
      ],
    },
    {
      id: "e04-2",
      titleEn: "Telling time: 〜時〜分",
      titleZh: "说时间:〜時〜分",
      bodyEn:
        "Prices were a number plus a counter; clock time works the same way, just with two counters stacked together. Up to now you could say where the meeting is (`会議はここです`), but not when it starts. Time fills that in.\n\nThe hour is counted with `時` (ji) and the minute with `分` (fun, which softens to pun after certain numbers): `7時30分` reads `しちじさんじゅっぷん` and means 7:30. To pin down morning or afternoon, a time-of-day word goes in front — `午前` (a.m.) or `午後` (p.m.) — so `午後3時` is 3 p.m. The order mirrors English's \"3 p.m.\" only reversed: the broad frame (afternoon) comes first, then the precise point (3 o'clock).\n\nPicture yourself in front of a shop that isn't open yet, asking a passer-by `今何時ですか` — \"What time is it now?\", using the question word `何時` (\"what time\"). Or a colleague leans over and you tell them when the meeting kicks off: `会議は午後3時からです` — \"The meeting is from 3 p.m.\" Notice `から` (\"from\") riding on the time; that's the start-point marker we'll meet in full at the end of this chapter.\n\nThe pattern `今7時30分です` shows that, like a price, a clock time is just a noun predicate sitting in front of `です`.",
      bodyZh:
        "价格是「数字 + 量词」;时间也一样,只是把两个量词叠在一起。到现在为止,你能说会议「在哪里」(`会議はここです`),却说不出它「几点」开始。时间正好补上这一块。\n\n小时用 `時`(ji)来数,分钟用 `分`(fun,在某些数字后会变成 pun)来数:`7時30分` 读作 `しちじさんじゅっぷん`,意思是 7:30。要标明上午还是下午,就在前面加一个时段词——`午前`(上午)或 `午後`(下午)——所以 `午後3時` 是下午 3 点。这个顺序和英语的「3 p.m.」正好相反:先说大范围(下午),再说精确点(3 点)。\n\n想象你站在一家还没开门的店前,问路人 `今何時ですか`——「现在几点?」,用的是疑问词 `何時`(「几点」)。又或者同事凑过来,你告诉他会议什么时候开始:`会議は午後3時からです`——「会议从下午 3 点开始。」注意 `から`(「从」)挂在时间后面,这正是本章末尾要详谈的「起点」标记。\n\n句型 `今7時30分です` 表明:和价格一样,钟点时间也只是一个名词谓语,稳稳坐在 `です` 前面。",
      examples: [
        {
          jp: "今7時30分です",
          reading: "いましちじさんじゅっぷんです",
          en: "It is 7:30 now.",
          zh: "现在是 7 点 30 分。",
          code: `import type { ProperNoun, ConjugateCopula } from "typed-japanese";

type 今 = ProperNoun<"今">;
type 時刻 = ProperNoun<"7時30分">;

// 今 (now) + 7時30分 + です
type 今7時30分です = \`\${今}\${ConjugateCopula<時刻, "丁寧形">}\`;
`,
        },
        {
          jp: "会議は午後3時からです",
          reading: "かいぎはごごさんじからです",
          en: "The meeting is from 3 p.m.",
          zh: "会议从下午 3 点开始。",
          code: `import type { ProperNoun, PhraseWithParticle, ConjugateCopula } from "typed-japanese";

type 会議 = ProperNoun<"会議">;
type 午後3時 = ProperNoun<"午後3時">;

// 会議 + は + 午後3時 + から + です
type 会議は午後3時からです = \`\${PhraseWithParticle<会議, "は">}\${ConjugateCopula<PhraseWithParticle<午後3時, "から">, "丁寧形">}\`;
`,
        },
      ],
    },
    {
      id: "e04-3",
      titleEn: "Counters: 〜つ, 〜人, 〜枚",
      titleZh: "量词:〜つ、〜人、〜枚",
      bodyEn:
        "In chapter 3 you learned `りんごがあります` — \"there are apples.\" But how many? You can't just say \"three apples\" in Japanese the way English does. Japanese refuses to let a bare number touch a noun; it insists on a counter word in between that agrees with the kind of thing being counted, much as `あります` and `います` already agreed with whether a thing is inanimate or alive.\n\nThe all-purpose native counter is `〜つ`, used for one through nine and for objects with no special counter: `一つ, 二つ, 三つ (みっつ)` and so on — handy when you don't know the \"correct\" counter. People get `〜人` (nin), with the irregular readings `一人 (ひとり)` and `二人 (ふたり)` for one and two. Flat, thin things — sheets of paper, tickets, shirts, plates — get `〜枚` (mai). The shape of the object literally chooses the word.\n\nThe counter phrase normally floats just before the verb, separate from the noun it counts: `りんごを三つください` — \"three apples, please,\" the line you'd say handing over your basket at a fruit stand. To report a head count it can be the predicate: `学生は二人です` — \"there are two students.\" And buying train tickets, you'd say `切符を二枚買います` — \"I'll buy two tickets,\" with `二枚` sitting right before the verb.\n\nThe common beginner trap is reaching for `〜つ` everywhere. It's a fine safety net for objects, but never for people (`二つ` students is wrong — say `二人`) and never for flat goods at the ticket window (`二枚`, not `二つ`).",
      bodyZh:
        "第 3 章里你学过 `りんごがあります`——「有苹果」。可到底有几个?在日语里,你没法像英语那样直接说「三个苹果」。日语不允许光秃秃的数字碰名词,它坚持在中间插一个量词,这个量词要和所数事物的种类相配——就像 `あります` 和 `います` 早就分清了东西是无生命还是有生命一样。\n\n最通用的固有量词是 `〜つ`,用于一到九,以及没有专属量词的物品:`一つ、二つ、三つ(みっつ)` 等等——当你不知道「正确」量词时特别管用。数人用 `〜人`(nin),其中一和二读法不规则:`一人(ひとり)`、`二人(ふたり)`。又扁又薄的东西——纸张、车票、衬衫、盘子——用 `〜枚`(mai)。物品的形状字面上决定了用哪个词。\n\n量词短语通常浮动在动词前,和它所数的名词分开:`りんごを三つください`——「请给我三个苹果」,这正是你在水果摊递上篮子时会说的话。要报人数,它可以当谓语:`学生は二人です`——「学生有两人」。买火车票时,你会说 `切符を二枚買います`——「我要买两张票」,`二枚` 就紧挨在动词前。\n\n初学者常见的陷阱是处处都想用 `〜つ`。对物品来说它是个不错的保险,但绝不能用于人(说「二つ」个学生是错的,要说 `二人`),也绝不能用于售票窗口的扁平货品(用 `二枚`,不是 `二つ`)。",
      examples: [
        {
          jp: "りんごを三つください",
          reading: "りんごをみっつください",
          en: "Three apples, please.",
          zh: "请给我三个苹果。",
          code: `import type { ProperNoun, PhraseWithParticle } from "typed-japanese";

type りんご = ProperNoun<"りんご">;
type 三つ = ProperNoun<"三つ">;

// りんご + を (object) + 三つ + ください
type りんごを三つください = \`\${PhraseWithParticle<りんご, "を">}\${三つ}ください\`;
`,
        },
        {
          jp: "学生は二人です",
          reading: "がくせいはふたりです",
          en: "There are two students.",
          zh: "学生有两人。",
          code: `import type { ProperNoun, PhraseWithParticle, ConjugateCopula } from "typed-japanese";

type 学生 = ProperNoun<"学生">;
type 二人 = ProperNoun<"二人">;

type 学生は二人です = \`\${PhraseWithParticle<学生, "は">}\${ConjugateCopula<二人, "丁寧形">}\`;
`,
        },
        {
          jp: "切符を二枚買います",
          reading: "きっぷをにまいかいます",
          en: "I will buy two tickets.",
          zh: "我要买两张票。",
          code: `import type { ProperNoun, GodanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 切符 = ProperNoun<"切符">;
type 二枚 = ProperNoun<"二枚">;
type 買う = GodanVerb & { stem: "買"; ending: "う" };

// 切符 + を + 二枚 + 買い (ます形) + ます
type 切符を二枚買います = \`\${PhraseWithParticle<切符, "を">}\${二枚}\${ConjugateVerb<買う, "ます形">}ます\`;
`,
        },
      ],
    },
    {
      id: "e04-4",
      titleEn: "から〜まで — “from … to …”",
      titleZh: "から〜まで ——「从……到……」",
      bodyEn:
        "You've now met `から` once already, marking 3 p.m. as a start point. Here's the full idea. In chapter 3 a particle like `に` pinned a single point in space; now you often want a whole span instead — a journey that goes from one place to another, or hours that run from one time to another. Japanese bounds a range with a matched pair: `から` (\"from\") for the start, `まで` (\"to / until\") for the end.\n\nEach particle clings directly to the noun it bounds, just like `は` and `を` do, so you read the range as two labeled posts: `東京から大阪まで` — from-Tokyo, to-Osaka. The very same pair handles time with zero new machinery: `9時から5時まで` is \"from 9 to 5.\" That reuse is the point — one frame, whether the axis is space or the clock.\n\nThis is exactly what you need to tell a colleague the meeting runs `1時から3時まで`, or to read a shop's hours off the door: `店は9時から5時までです` — \"the shop is open from 9 to 5,\" the whole range again sitting as a predicate before `です`.\n\nYou don't always need both halves. Either can stand alone: `3時から` means \"from 3 o'clock\" (open-ended), and `駅まで` means \"as far as the station.\" Reach for just the half that carries the information you actually want to give.",
      bodyZh:
        "你刚才已经见过一次 `から`,用它把下午 3 点标成起点。现在来看完整的概念。第 3 章里,像 `に` 这样的助词钉住空间中的一个点;可你常常想表达的是一整段范围——一段从某地到某地的行程,或一段从某时到某时的时间。日语用一对搭配的助词来框住范围:`から`(「从」)标起点,`まで`(「到 / 直到」)标终点。\n\n每个助词都像 `は`、`を` 一样直接贴在它所框的名词上,于是这段范围读起来就是两根带标签的桩子:`東京から大阪まで`——从东京、到大阪。同一对助词不需任何新装置就能用于时间:`9時から5時まで` 就是「从 9 点到 5 点」。这种复用正是关键所在——无论坐标轴是空间还是钟表,都是同一个框架。\n\n这恰好就是你告诉同事会议 `1時から3時まで` 时所需要的,也是你从门上读出营业时间时所需要的:`店は9時から5時までです`——「店从 9 点开到 5 点」,整段范围又一次充当谓语,坐在 `です` 前面。\n\n两半不一定都要用。任意一半都能单独出现:`3時から` 表示「从 3 点起」(没说到几点),`駅まで` 表示「到车站为止」。只取那一半真正承载你想给出的信息就够了。",
      examples: [
        {
          jp: "東京から大阪まで",
          reading: "とうきょうからおおさかまで",
          en: "From Tokyo to Osaka.",
          zh: "从东京到大阪。",
          code: `import type { ProperNoun, PhraseWithParticle } from "typed-japanese";

type 東京 = ProperNoun<"東京">;
type 大阪 = ProperNoun<"大阪">;

// 東京 + から + 大阪 + まで
type 東京から大阪まで = \`\${PhraseWithParticle<東京, "から">}\${PhraseWithParticle<大阪, "まで">}\`;
`,
        },
        {
          jp: "店は9時から5時までです",
          reading: "みせはくじからごじまでです",
          en: "The shop is open from 9 to 5.",
          zh: "店从 9 点开到 5 点。",
          code: `import type { ProperNoun, PhraseWithParticle, ConjugateCopula } from "typed-japanese";

type 店 = ProperNoun<"店">;
type 九時 = ProperNoun<"9時">;
type 五時 = ProperNoun<"5時">;

// 店 + は + 9時 + から + 5時 + まで + です
type 店は9時から5時までです = \`\${PhraseWithParticle<店, "は">}\${PhraseWithParticle<九時, "から">}\${ConjugateCopula<PhraseWithParticle<五時, "まで">, "丁寧形">}\`;
`,
        },
      ],
    },
  ],
};

export default chapter;
