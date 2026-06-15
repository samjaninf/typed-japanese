import type { Chapter } from "../types";

const chapter: Chapter = {
  id: "i09",
  level: "intermediate",
  order: 9,
  titleEn: "Appearance & hearsay",
  titleZh: "样态与传闻",
  summaryEn:
    "You glance at the sky and want to say \"looks like rain\"; a coworker leans over and whispers gossip you want to pass on as \"I hear she's transferring\"; you read a sign and conclude \"apparently the store's closed.\" Back in ch.19 `でしょう` let you hedge with a flat \"probably,\" but it couldn't say how you know — whether you saw it, were told it, or pieced it together. This chapter adds that missing layer: `〜そうだ` for what you see and for what you heard, `〜らしい` for what you gather, and casual `〜みたい` for likening one thing to another.",
  summaryZh:
    "你抬头看天,想说「看起来要下雨」;同事凑过来低声八卦,你想转述成「听说她要调走了」;你看了一眼告示,推断出「那家店好像关门了」。第 19 章的 `でしょう` 让你能笼统地说一句「大概吧」,却说不清你凭什么知道——是亲眼看见、听人说起,还是自己推断出来的。本章补上这缺失的一层:`〜そうだ` 表示眼见与耳闻,`〜らしい` 表示综合判断,口语的 `〜みたい` 则把一物比作另一物。",
  points: [
    {
      id: "i09-1",
      titleEn: "〜そうだ (appearance) — “it looks like…”",
      titleZh: "〜そうだ(样态)——「看起来……」",
      bodyEn:
        "Picture yourself in front of a bakery window, looking at a cake you haven't tasted yet. In ch.8 you learned to call something `おいしい` (\"delicious\") only when you know it is. But here you don't know — you're judging from the look of it. That gap is exactly what this `そうだ` fills: it reports an impression drawn from what your eyes can see, before anything is confirmed.\n\nBecause it's a fresh judgement and not a settled fact, it grabs the bare core of the word — the stem — rather than a complete dictionary form. For an i-adjective, drop the final `い`: `おいしい` → `おいしそう` (\"looks delicious\"). For a na-adjective, the stem already is the core: `元気` → `元気そう` (\"looks well\"). For a verb, use the `ます`-stem you met in ch.5: `降る` → `降り` → `降りそう` (\"looks like it'll rain\"). Add `です` for politeness.\n\nSo standing under a darkening sky you'd say `雨が降りそうです` — not because anyone told you, but because the clouds tell you. Watch one trap: `いい` (\"good\") becomes `よさそう`, never `いそう`. The same odd `よ`-stem shows up wherever `いい` conjugates, as it did with `よかった` in ch.8.",
      bodyZh:
        "想象你站在面包店橱窗前,望着一块还没尝过的蛋糕。第 8 章里你学过,只有在确知某物好吃时才说 `おいしい`。可现在你并不确知——你是凭它的卖相在判断。这道缺口正是这个 `そうだ` 要填补的:它转述的是眼睛所见、尚未证实的那份直观印象。\n\n正因为这是一个新鲜的判断、而非定论,它只抓住词的赤裸内核——词干——而不接完整的简体形。i 形容词去掉词尾 `い`:`おいしい` → `おいしそう`(「看起来好吃」)。na 形容词的词干本身就是内核:`元気` → `元気そう`(「看起来有精神」)。动词用第 5 章学过的 `ます` 词干:`降る` → `降り` → `降りそう`(「看起来要下雨」)。加 `です` 即为礼貌体。\n\n于是站在阴沉的天空下,你会说 `雨が降りそうです`——不是因为有人告诉你,而是因为乌云告诉了你。注意一个陷阱:`いい`(「好」)要变成 `よさそう`,绝不能说 `いそう`。这个古怪的 `よ` 词干在 `いい` 的各种活用里都会出现,正如第 8 章的 `よかった`。",
      examples: [
        {
          jp: "このケーキはおいしそうです",
          reading: "このケーキはおいしそうです",
          en: "This cake looks delicious.",
          zh: "这块蛋糕看起来很好吃。",
          code: `import type { ProperNoun, IAdjective, PhraseWithParticle } from "typed-japanese";

type このケーキ = ProperNoun<"このケーキ">;
type おいしい = IAdjective & { stem: "おいし"; ending: "い" };

// i-adjective: drop い (= stem) + そうです
type このケーキはおいしそうです = \`\${PhraseWithParticle<このケーキ, "は">}\${おいしい["stem"]}そうです\`;
`,
        },
        {
          jp: "雨が降りそうです",
          reading: "あめがふりそうです",
          en: "It looks like it's going to rain.",
          zh: "看起来要下雨了。",
          code: `import type { ProperNoun, GodanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 雨 = ProperNoun<"雨">;
type 降る = GodanVerb & { stem: "降"; ending: "る" };

// verb: ます-stem (降り) + そうです
type 雨が降りそうです = \`\${PhraseWithParticle<雨, "が">}\${ConjugateVerb<降る, "Masu">}そうです\`;
`,
        },
        {
          jp: "彼は元気そうです",
          reading: "かれはげんきそうです",
          en: "He looks well / in good spirits.",
          zh: "他看起来很有精神。",
          code: `import type { ProperNoun, NaAdjective, PhraseWithParticle } from "typed-japanese";

type 彼 = ProperNoun<"彼">;
type 元気 = NaAdjective & { stem: "元気" };

// na-adjective: stem + そうです
type 彼は元気そうです = \`\${PhraseWithParticle<彼, "は">}\${元気["stem"]}そうです\`;
`,
        },
      ],
    },
    {
      id: "i09-2",
      titleEn: "〜そうだ (hearsay) — “I hear that…”",
      titleZh: "〜そうだ(传闻)——「听说……」",
      bodyEn:
        "Now imagine you didn't see the sky at all — a friend texted you the forecast, and you want to relay it. In ch.20 you learned `〜と言う` to quote someone's exact words; this is gentler. You're not quoting word-for-word, you're passing along news you picked up secondhand: \"I hear it's going to rain.\" Strikingly, Japanese reuses the very same `そうだ` for this — but flips the attachment rule.\n\nHere `そうだ` follows the plain form of the whole clause, the complete plain-form sentences you built in ch.13, not the bare stem. That one difference carries the entire meaning. Compare `降りそうだ` (stem → appearance: I see signs of rain) with `降るそうだ` (plain form → hearsay: I'm told it'll rain). Same four kana on the end; opposite source of knowledge.\n\nIn practice you'll often front it with `〜によると` (\"according to…\") to name where the news came from — `天気予報によると…降るそうです`. Unlike `らしい`, which we'll meet next, hearsay `そうだ` stays close to what your source actually said, so it's the natural choice for relaying a forecast, a headline, or a friend's announcement faithfully.",
      bodyZh:
        "现在设想你根本没看天——是朋友把天气预报发给了你,你想把它转述出去。第 20 章里你学过用 `〜と言う` 引用别人的原话;这里更柔和些。你不是逐字引用,而是把二手听来的消息传下去:「听说要下雨。」耐人寻味的是,日语在这里沿用了同一个 `そうだ`——却把接续规则反了过来。\n\n这里的 `そうだ` 接在整个小句的简体形之后,也就是第 13 章里你搭建过的完整简体句,而不是光秃秃的词干。仅这一点之差,便承载了全部意义。对比 `降りそうだ`(词干 → 样态:我看见有要下雨的迹象)与 `降るそうだ`(简体形 → 传闻:我听说要下雨)。结尾同是这几个假名,知识来源却截然相反。\n\n实际使用时,常在前面配上 `〜によると`(「据……说」)点明消息出处——`天気予報によると…降るそうです`。与下面要讲的 `らしい` 不同,传闻 `そうだ` 紧贴消息来源的原话,因此最适合忠实地转述天气预报、新闻标题或朋友的通知。",
      examples: [
        {
          jp: "明日は雨が降るそうです",
          reading: "あしたはあめがふるそうです",
          en: "I hear it's going to rain tomorrow.",
          zh: "听说明天会下雨。",
          code: `import type { ProperNoun, GodanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 明日 = ProperNoun<"明日">;
type 雨 = ProperNoun<"雨">;
type 降る = GodanVerb & { stem: "降"; ending: "る" };

// plain (dictionary) form 降る + そうです
type 明日は雨が降るそうです = \`\${PhraseWithParticle<明日, "は">}\${PhraseWithParticle<雨, "が">}\${ConjugateVerb<降る, "Dictionary">}そうです\`;
`,
        },
        {
          jp: "田中さんは来週来るそうです",
          reading: "たなかさんはらいしゅうくるそうです",
          en: "I hear Mr. Tanaka is coming next week.",
          zh: "听说田中先生下周来。",
          code: `import type { ProperNoun, IrregularVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 田中さん = ProperNoun<"田中さん">;
type 来週 = ProperNoun<"来週">;
type 来る = IrregularVerb & { dictionary: "来る" };

// plain form 来る + そうです
type 田中さんは来週来るそうです = \`\${PhraseWithParticle<田中さん, "は">}\${来週}\${ConjugateVerb<来る, "Dictionary">}そうです\`;
`,
        },
      ],
    },
    {
      id: "i09-3",
      titleEn: "〜らしい — “it seems / apparently”",
      titleZh: "〜らしい ——「似乎、好像」",
      bodyEn:
        "Hearsay `そうだ` faithfully relays one source. But often your information is fuzzier: you overheard something, saw a closed sign, noticed the lights off, and put it together into \"apparently the store's shut today.\" You're not quoting anyone exactly, and you're not claiming it as your own firsthand fact — you're drawing a reasonable conclusion from circumstantial evidence. That's the job of `らしい`.\n\nIt feels more detached and objective than `そうだ`, as if to say \"from everything I gather, it seems that…\" — useful when you want to report without taking full responsibility for the claim. Grammatically it's easy: attach it straight to a noun, or to the plain form of a verb or i-adjective, dropping the `だ` after nouns and na-adjectives. So `学生らしい` (\"seems to be a student\"), `安いらしい` (\"apparently cheap\"), `行くらしい` (\"seems they're going\").\n\nText a friend that the shop is closed and you'd type `あの店は今日休みらしい` — you didn't phone the shop, but the dark window and the gossip add up. Compared with `そうだ`, which points at a single source, `らしい` points at the weight of evidence around you.",
      bodyZh:
        "传闻 `そうだ` 忠实转述单一来源。但你掌握的信息往往更模糊:你隐约听到一句、看见一块「停业」的牌子、注意到灯没开,把这些拼成「那家店今天好像关门了」。你既没逐字引用谁,也没把它当作自己亲历的事实——你是从旁证里推出一个合理结论。这正是 `らしい` 的活儿。\n\n它比 `そうだ` 更显疏离客观,仿佛在说「综合我所了解的一切,似乎……」——当你想转述、又不愿对这说法负全责时正合用。语法上很简单:直接接名词,或接动词、i 形容词的简体形,名词和 na 形容词后去掉 `だ`。于是 `学生らしい`(「好像是学生」)、`安いらしい`(「好像很便宜」)、`行くらしい`(「似乎要去」)。\n\n给朋友发消息说店关了,你会打 `あの店は今日休みらしい`——你没打电话去问,但漆黑的窗子加上传言凑到了一起。与指向单一来源的 `そうだ` 相比,`らしい` 指向的是你周遭那一堆证据的分量。",
      examples: [
        {
          jp: "彼は学生らしいです",
          reading: "かれはがくせいらしいです",
          en: "He seems to be a student.",
          zh: "他好像是学生。",
          code: `import type { ProperNoun, PhraseWithParticle } from "typed-japanese";

type 彼 = ProperNoun<"彼">;
type 学生 = ProperNoun<"学生">;

// noun + らしいです (no だ)
type 彼は学生らしいです = \`\${PhraseWithParticle<彼, "は">}\${学生}らしいです\`;
`,
        },
        {
          jp: "あの店は安いらしいです",
          reading: "あのみせはやすいらしいです",
          en: "Apparently that shop is cheap.",
          zh: "听说那家店很便宜。",
          code: `import type { ProperNoun, IAdjective, ConjugateAdjective, PhraseWithParticle } from "typed-japanese";

type あの店 = ProperNoun<"あの店">;
type 安い = IAdjective & { stem: "安"; ending: "い" };

// i-adjective plain form 安い + らしいです
type あの店は安いらしいです = \`\${PhraseWithParticle<あの店, "は">}\${ConjugateAdjective<安い, "Basic">}らしいです\`;
`,
        },
      ],
    },
    {
      id: "i09-4",
      titleEn: "〜みたい — “like… / it seems (casual)”",
      titleZh: "〜みたい ——「像…… / 似乎(口语)」",
      bodyEn:
        "The expressions so far lean formal. But chatting with friends — the casual register from ch.13 — you want something lighter, and that's `みたい`. It's the everyday spoken cousin of the bookish `〜のようだ`, and it pulls double duty.\n\nFirst, resemblance: it likens one thing to another, \"like / similar to.\" Watching a grown coworker sulk over a snack, you'd grin and say `子供みたい` (\"like a child\"). Second, conjecture: \"it seems / looks like,\" much like a relaxed `らしい`. Step outside, feel drizzle, and mutter `雨みたい` (\"looks like rain\"). Context tells the two senses apart effortlessly.\n\nAttachment mirrors `らしい`: hook it onto a noun, or the plain form of a verb or i-adjective, dropping `だ` after nouns and na-adjectives. And since `みたい` itself behaves like a na-adjective, you can dress it up with `です` when you want a notch more politeness — `子供みたいです`, `雨みたいです` — making it a handy bridge between casual chat and softly polite speech.",
      bodyZh:
        "目前为止的表达都偏正式。但和朋友闲聊——第 13 章那种随意语体——你想要更轻快的说法,那就是 `みたい`。它是书面味的 `〜のようだ` 的口语版,身兼两职。\n\n其一,比喻:把一物比作另一物,「像、类似」。看着成年同事为一包零食闹脾气,你会笑着说 `子供みたい`(「像个小孩」)。其二,推测:「似乎、好像」,跟轻松版的 `らしい` 差不多。走出门,感到毛毛雨,你会嘟囔一句 `雨みたい`(「好像要下雨」)。两种意思靠语境就能毫不费力地区分开。\n\n接续与 `らしい` 一致:接名词,或接动词、i 形容词的简体形,名词和 na 形容词后去掉 `だ`。又因为 `みたい` 本身像 na 形容词一样活用,想稍微礼貌一点时可加 `です`——`子供みたいです`、`雨みたいです`——它由此成了随意闲聊与柔和礼貌之间的一座方便桥梁。",
      examples: [
        {
          jp: "彼は子供みたいです",
          reading: "かれはこどもみたいです",
          en: "He's like a child.",
          zh: "他像个小孩。",
          code: `import type { ProperNoun, PhraseWithParticle } from "typed-japanese";

type 彼 = ProperNoun<"彼">;
type 子供 = ProperNoun<"子供">;

// noun + みたいです (resemblance)
type 彼は子供みたいです = \`\${PhraseWithParticle<彼, "は">}\${子供}みたいです\`;
`,
        },
        {
          jp: "外は雨みたいです",
          reading: "そとはあめみたいです",
          en: "It looks like it's raining outside.",
          zh: "外面好像在下雨。",
          code: `import type { ProperNoun, PhraseWithParticle } from "typed-japanese";

type 外 = ProperNoun<"外">;
type 雨 = ProperNoun<"雨">;

// noun + みたいです (conjecture)
type 外は雨みたいです = \`\${PhraseWithParticle<外, "は">}\${雨}みたいです\`;
`,
        },
      ],
    },
  ],
};

export default chapter;
