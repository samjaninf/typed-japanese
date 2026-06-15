import type { Chapter } from "../types";

const chapter: Chapter = {
  id: "a12",
  level: "advanced",
  order: 12,
  titleEn: "Written & literary style",
  titleZh: "书面语与文语",
  summaryEn:
    "Open a newspaper editorial, a research paper, or a stern public notice and you'll hit a wall: none of it is written in the friendly `です・ます` you learned in ch.1, nor even the casual `だ` of ch.13. Formal prose runs on a separate, older engine — the written copula `である`, the literary obligation `〜ねばならぬ` (a cousin of the `〜なければならない` from ch.17), the classical negative `〜ぬ` behind today's `〜ない`, and the `〜べし／〜べき` whose modern shadow you already met in ch.30. This chapter hands you the register you've been reading all along but never had to speak.",
  summaryZh:
    "翻开报纸社论、研究论文,或一张措辞严厉的公告,你会撞上一堵墙:它既不用你在第1章学的亲切的 `です・ます`,也不用第13章那种随意的 `だ`。正式文章运转在另一套更古老的引擎上 —— 书面系动词 `である`、文语义务 `〜ねばならぬ`(第17章 `〜なければならない` 的表亲)、藏在今日 `〜ない` 背后的文语否定 `〜ぬ`,以及第30章你已见过其现代影子的 `〜べし／〜べき`。本章把这套你一直在读、却从不需要说出口的语体交到你手上。",
  points: [
    {
      id: "a12-1",
      titleEn: "である style — the written copula",
      titleZh: "である 体 —— 书面系动词",
      bodyEn:
        "Since ch.1 you've ended noun sentences two ways: politely with `です` (`これは本です`) and casually with `だ` (`これは本だ`). But neither fits an essay. `です` sounds like it's addressing a listener — too warm, too conversational — and bare `だ` can feel blunt or self-talky on the page. So what does a thesis or editorial use when it wants to simply state a fact to no one in particular?\n\nThe answer is `である`, the written copula. It means exactly the same as `です／だ` — \"is, to be\" — but carries zero politeness and zero intimacy. It's the neutral, declarative voice of print. A noun-predicate sentence keeps the familiar shape `A は B である`: the topic still rides the `は` particle you've used since ch.1, only the ending changes.\n\nWhy this form? Historically `である` is `で` + `ある` (the `ある` you learned for existence in ch.3) — literally \"exists as.\" That little compositional history is why it sounds detached and authoritative: it asserts that something stands as a fact, without leaning toward any reader.\n\nPicture a linguistics paper opening with `言語は文化である` — \"Language is culture.\" No one is being addressed; a claim is simply being planted on the page. The one rule of thumb: pick a register and hold it. A whole document stays in `である`, or stays in `です`; you never weave the two together. Its negative is `ではない` and its past is `であった`.",
      bodyZh:
        "从第1章起,你用两种方式结束名词句:礼貌的 `です`(`これは本です`)与随意的 `だ`(`これは本だ`)。但这两者都不适合一篇文章。`です` 听上去像在对某个听者说话 —— 太亲切、太口语;而光秃秃的 `だ` 落在纸面上又显得生硬,或像自言自语。那么,论文或社论若只想向无特定对象陈述一个事实,该用什么?\n\n答案是 `である`,即书面系动词。它的意思与 `です／だ` 完全相同 ——「是、为」—— 但不含任何敬意,也不含任何亲近感。它是印刷文字里中立、断定的声音。名词谓语句仍保持你熟悉的「A は B である」结构:主题依旧由你从第1章就用着的 `は` 提示,只有句尾变了。\n\n为何是这个形式?从源流看,`である` 是 `で` + `ある`(第3章学过的表存在的 `ある`)—— 字面即「以……而存在」。正是这一小段构词史使它听来超然而权威:它断言某物作为事实成立,而不倾向任何读者。\n\n想象一篇语言学论文以 `言語は文化である`(「语言即文化」)开篇。没有谁在被招呼;一个论断只是被栽在了纸上。唯一的要领:选定一种语体并贯彻到底。整篇文章要么用 `である`,要么用 `です`,绝不交织。其否定为 `ではない`,过去式为 `であった`。",
      examples: [
        {
          jp: "言語は文化である",
          reading: "げんごはぶんかである",
          en: "Language is culture.",
          zh: "语言即文化。",
          code: `import type { ProperNoun, PhraseWithParticle, ConjugateCopula } from "typed-japanese";

type 言語 = ProperNoun<"言語">;
type 文化 = ProperNoun<"文化">;

// 言語 + は + 文化 + である (written copula)
type 言語は文化である = \`\${PhraseWithParticle<言語, "は">}\${ConjugateCopula<文化, "Written">}\`;
`,
        },
        {
          jp: "これは重要な問題である",
          reading: "これはじゅうようなもんだいである",
          en: "This is an important problem.",
          zh: "这是一个重要的问题。",
          code: `import type { ProperNoun, NaAdjective, ConjugateAdjective, PhraseWithParticle, ConjugateCopula } from "typed-japanese";

type これ = ProperNoun<"これ">;
type 重要 = NaAdjective & { stem: "重要" };
type 問題 = ProperNoun<"問題">;

// これ + は + 重要な(基本形) + 問題 + である
type これは重要な問題である = \`\${PhraseWithParticle<これ, "は">}\${ConjugateAdjective<重要, "Basic">}\${ConjugateCopula<問題, "Written">}\`;
`,
        },
      ],
    },
    {
      id: "a12-2",
      titleEn: "〜ねばならぬ / 〜ねばならない — must (literary)",
      titleZh: "〜ねばならぬ／〜ねばならない ——「必须」(文语)",
      bodyEn:
        "In ch.17 you learned to express obligation with `〜なければならない` — \"must do.\" It's correct and common, but it's a long, spoken-feeling chain, and in a formal paper or proclamation it reads as a touch ordinary. Written Japanese keeps a tighter, weightier version for exactly these moments.\n\nThat version is `〜ねばならぬ`. The recipe mirrors what you already know: take the verb's negative (`ない`) stem — the very stem `〜なければ` is built on — and instead of the long modern tail, attach `ねばならぬ`. So `行く → 行か → 行かねばならぬ` (\"must go\"), `食べる → 食べ → 食べねばならぬ` (\"must eat\").\n\nWhy does it feel so grave? Because it's literally older. The `ね` is the classical negative `ず`/`ね`, and the final `ぬ` is the classical negative you'll meet head-on in the next point — \"if not... then it cannot be.\" It's the same logic as `〜なければならない`, just preserved in its ancestral skin. Soften that ancestral `ぬ` to modern style and you get the middle-register `〜ねばならない`, common in essays and serious journalism.\n\nImagine the discussion section of a paper: `この点を考えねばならない` — \"we must consider this point.\" It states a scholarly duty without a single conversational marker. One irregular to lock in: `する` does not become ✗`しねばならぬ` but `せねばならぬ`. That `せ` is the classical base of `する`, and it'll keep showing up across this chapter.",
      bodyZh:
        "第17章里,你学过用 `〜なければならない` 表达义务 ——「必须做」。它正确又常见,但毕竟是一长串、带口语味的连缀,落进正式论文或公告里,读来略显平常。书面日语为这些场合保留了一个更紧凑、更有分量的版本。\n\n这个版本就是 `〜ねばならぬ`。配方与你已知的如出一辙:取动词的否定(`ない`)词干 —— 正是 `〜なければ` 所依托的那个词干 —— 不接现代的长尾巴,而换上 `ねばならぬ`。于是 `行く → 行か → 行かねばならぬ`(「必须去」)、`食べる → 食べ → 食べねばならぬ`(「必须吃」)。\n\n它为何如此庄重?因为它字面上更古老。`ね` 源自文语否定 `ず`/`ね`,末尾的 `ぬ` 则是下一节将正面登场的文语否定 ——「若不……则不可」。逻辑与 `〜なければならない` 全然一致,只是包裹在祖辈的外皮里。把那个古旧的 `ぬ` 软化为现代语体,便得到居中语体的 `〜ねばならない`,常见于随笔与严肃新闻。\n\n设想一篇论文的讨论部分:`この点を考えねばならない` ——「我们必须考虑这一点」。它陈述了一项学术上的应尽之责,却不带一个口语标记。须牢记一个特例:`する` 不变成 ✗`しねばならぬ`,而是 `せねばならぬ`。那个 `せ` 是 `する` 的文语词基,本章里它还会反复出现。",
      examples: [
        {
          jp: "我々は行かねばならぬ",
          reading: "われわれはいかねばならぬ",
          en: "We must go.",
          zh: "我们必须前往。",
          code: `import type { ProperNoun, GodanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 我々 = ProperNoun<"我々">;
type 行く = GodanVerb & { stem: "行"; ending: "く" };

// 我々 + は + 行か(ない形) + ねばならぬ
type 我々は行かねばならぬ = \`\${PhraseWithParticle<我々, "は">}\${ConjugateVerb<行く, "Nai">}ねばならぬ\`;
`,
        },
        {
          jp: "規則を守らねばならない",
          reading: "きそくをまもらねばならない",
          en: "One must obey the rules.",
          zh: "必须遵守规则。",
          code: `import type { ProperNoun, GodanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 規則 = ProperNoun<"規則">;
type 守る = GodanVerb & { stem: "守"; ending: "る" };

// 規則 + を + 守ら(ない形) + ねばならない
type 規則を守らねばならない = \`\${PhraseWithParticle<規則, "を">}\${ConjugateVerb<守る, "Nai">}ねばならない\`;
`,
        },
        {
          jp: "努力せねばならぬ",
          reading: "どりょくせねばならぬ",
          en: "One must make an effort.",
          zh: "必须努力。",
          code: `import type { ProperNoun } from "typed-japanese";

type 努力 = ProperNoun<"努力">;

// する is irregular here: する → せねばならぬ (NOT しねばならぬ). Spelled as a literal.
type 努力せねばならぬ = \`\${努力}せねばならぬ\`;
`,
        },
      ],
    },
    {
      id: "a12-3",
      titleEn: "〜ぬ — the classical negative",
      titleZh: "〜ぬ —— 文语否定",
      bodyEn:
        "Every negative you've used — `知らない`, `言わない`, the `〜ない` from ch.13 — descends from an older form, and that ancestor hasn't fully died. In the previous point you saw its trace inside `ねばならぬ`. Now meet it on its own: `〜ぬ`, the classical negative. You read it constantly in proverbs, set phrases, and elevated prose, so even if you never say it, you must be able to parse it.\n\nThe build is reassuringly familiar: take the same negative (`ない`) stem and swap `ない` for `ぬ`. `知る → 知ら → 知らぬ` (\"not knowing / unknown\"), `言う → 言わ → 言わぬ` (\"unspoken\"). It carries the same meaning as `〜ない`; it simply sounds terser and more literary, the way an old motto sounds heavier than plain speech.\n\nHere's the part that catches learners: `ぬ` doesn't only end sentences — it also sits directly before a noun, because in classical grammar the same form did double duty as the modifier. So `知らぬ人` is \"a person one does not know,\" i.e. a stranger; `思わぬ事故` is \"an unexpected accident.\" When you see `ぬ` hugging a following noun, read it as a relative clause: \"[noun] that one does/did not ___.\"\n\nPicture the scene `知らぬ人に声をかけられた` — \"a stranger spoke to me.\" The `知らぬ` quietly does the work of \"whom I don't know\" while sounding more bookish than `知らない人`. And the same irregular from before holds: `する`'s `ぬ`-form is `せぬ`, never ✗`しぬ`.",
      bodyZh:
        "你用过的每一个否定 ——`知らない`、`言わない`,以及第13章的 `〜ない`—— 都承继自一个更古老的形式,而那位祖先并未彻底消亡。上一节你已在 `ねばならぬ` 内部见过它的踪迹。现在让它单独登场:`〜ぬ`,文语否定。你会在谚语、固定短语和高雅文章中不断读到它,所以哪怕你永远不说,也必须能读懂。\n\n构词令人安心地熟悉:取同一个否定(`ない`)词干,把 `ない` 换成 `ぬ`。`知る → 知ら → 知らぬ`(「不知道的/未知的」)、`言う → 言わ → 言わぬ`(「未说出口的」)。它与 `〜ない` 意义相同,只是更简洁、更具文语色彩 —— 一如古训听来比白话更有分量。\n\n这里有一处易绊住学习者:`ぬ` 不只结束句子 —— 它还可直接置于名词之前,因为在文语语法里同一形式兼作连体修饰。于是 `知らぬ人` 是「不认识的人」,即陌生人;`思わぬ事故` 是「意外的事故」。当你看到 `ぬ` 紧贴着后面的名词,就把它当作定语从句来读:「不/未……的[名词]」。\n\n想象 `知らぬ人に声をかけられた`(「一个不认识的人跟我搭话了」)这一幕。`知らぬ` 不动声色地担起「我不认识的」之意,却比 `知らない人` 更书卷气。同样,前一节的特例依旧成立:`する` 的 `ぬ` 形是 `せぬ`,绝非 ✗`しぬ`。",
      examples: [
        {
          jp: "彼は何も知らぬ",
          reading: "かれはなにもしらぬ",
          en: "He knows nothing.",
          zh: "他一无所知。",
          code: `import type { ProperNoun, GodanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 彼 = ProperNoun<"彼">;
type 何 = ProperNoun<"何">;
type 知る = GodanVerb & { stem: "知"; ending: "る" };

// 彼 + は + 何 + も + 知ら(ない形) + ぬ
type 彼は何も知らぬ = \`\${PhraseWithParticle<彼, "は">}\${PhraseWithParticle<何, "も">}\${ConjugateVerb<知る, "Nai">}ぬ\`;
`,
        },
        {
          jp: "知らぬ人に声をかけられた",
          reading: "しらぬひとにこえをかけられた",
          en: "A stranger spoke to me.",
          zh: "一个不认识的人跟我搭话了。",
          code: `import type { ProperNoun, GodanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 知る = GodanVerb & { stem: "知"; ending: "る" };
type 人 = ProperNoun<"人">;
type 声 = ProperNoun<"声">;

// 知ら(ない形) + ぬ + 人 + に + 声 + を + かけられた(literal)
type 知らぬ人に声をかけられた = \`\${ConjugateVerb<知る, "Nai">}ぬ\${PhraseWithParticle<人, "に">}\${PhraseWithParticle<声, "を">}かけられた\`;
`,
        },
      ],
    },
    {
      id: "a12-4",
      titleEn: "〜べき / 〜べし — classical traces in modern writing",
      titleZh: "〜べき／〜べし —— 现代文中的文语残留",
      bodyEn:
        "Back in ch.30 you met `〜べきだ`, \"ought to\" — the sense of moral or social propriety. What you weren't told then is where that `べき` comes from: it's a fragment of an old auxiliary verb, `べし`, meaning \"should / ought to / must.\" This point reunites the modern survivor with its classical parent, both of which you'll see in print.\n\nThe full sentence-final form `べし` lives on in slogans and maxims — the punchy, carved-in-stone register. Its attributive form `べき` is fully alive in everyday formal writing and clamps onto a following noun: `読むべき本` = \"a book one should read,\" `守るべき規則` = \"rules to be observed.\" To build either, attach to the verb's dictionary form (the plain form from ch.12): `行く → 行くべき`, `守る → 守るべき`.\n\nThere's a logic to why editorials love it. `べき` asserts that an action is the right or necessary one — not because someone is forcing you (`ねばならぬ`), but because reason or duty demands it. That's perfect for a policy line like `対策をとるべきである`, \"measures ought to be taken,\" where you stack today's point onto the `である` from point one.\n\nOne predictable quirk, and it's the same `する` story: classically `する` gives `すべし`/`すべき` (`今こそ行動すべし`, \"now is the time to act\"), though modern writers also accept `するべき`. If you remember nothing else, remember that `べき` modifies a noun and `べし` ends a proclamation — and that both are the formal-writing face of the obligation you first met conversationally in ch.30.",
      bodyZh:
        "早在第30章,你就见过 `〜べきだ`,「应当」—— 那种道德或社会层面的合宜之意。当时没告诉你的是 `べき` 从何而来:它是一个古老助动词 `べし` 的残片,意为「应该、应当、必须」。本节让现代的幸存者与它的文语母体重逢,二者你都会在印刷品里读到。\n\n完整的终止形 `べし` 留存于标语与格言 —— 那种铿锵、镌刻于石的语体。其连体形 `べき` 则在日常正式书面语中完全鲜活,紧扣后面的名词:`読むべき本` =「应该读的书」、`守るべき規則` =「应当遵守的规则」。无论构造哪一个,都接在动词的辞书形(第12章的原形)之后:`行く → 行くべき`、`守る → 守るべき`。\n\n社论钟爱它是有道理的。`べき` 断言某一行动是正确或必要的 —— 不是因为有人在强迫你(`ねばならぬ`),而是因为道理或责任如此要求。这非常契合像 `対策をとるべきである`(「应当采取对策」)这样的政策措辞 —— 在那里你把本节的句式叠在了第一节的 `である` 之上。\n\n还有一个可预料的特例,仍是同一个 `する` 的故事:文语中 `する` 作 `すべし`/`すべき`(`今こそ行動すべし`,「正是该行动之时」),不过现代作者也接受 `するべき`。若别的都忘了,请记住:`べき` 修饰名词,`べし` 结束宣言 —— 二者都是你在第30章口语初遇的那种义务,在正式书面语里的面孔。",
      examples: [
        {
          jp: "今こそ行動すべし",
          reading: "いまこそこうどうすべし",
          en: "Now is the time to act.",
          zh: "正是该行动之时。",
          code: `import type { ProperNoun } from "typed-japanese";

type 今 = ProperNoun<"今">;
type 行動 = ProperNoun<"行動">;

// 今 + こそ + 行動 + すべし (classical する → すべし, spelled as literal)
type 今こそ行動すべし = \`\${今}こそ\${行動}すべし\`;
`,
        },
        {
          jp: "これは読むべき本である",
          reading: "これはよむべきほんである",
          en: "This is a book one should read.",
          zh: "这是一本应该读的书。",
          code: `import type { ProperNoun, GodanVerb, ConjugateVerb, PhraseWithParticle, ConjugateCopula } from "typed-japanese";

type これ = ProperNoun<"これ">;
type 読む = GodanVerb & { stem: "読"; ending: "む" };
type 本 = ProperNoun<"本">;

// これ + は + 読む(辞書形) + べき + 本 + である
type これは読むべき本である = \`\${PhraseWithParticle<これ, "は">}\${ConjugateVerb<読む, "Dictionary">}べき\${ConjugateCopula<本, "Written">}\`;
`,
        },
      ],
    },
  ],
};

export default chapter;
