import type { Chapter } from "../types";

const chapter: Chapter = {
  id: "e02",
  level: "elementary",
  order: 2,
  titleEn: "Demonstratives & の",
  titleZh: "指示词与の",
  summaryEn:
    "You're standing in a shop and want to say “I'll take that one” — but in chapter 1 you could only say “it is a book”, never which book or whose. This chapter gives you Japanese's tidy こ/そ/あ pointing system (これ/それ/あれ alone, この/その/あの before a noun) and the all-purpose linker の, which glues two nouns so the first owns or describes the second — making “A's B” as easy as `AのB`.",
  summaryZh:
    "你站在店里,想说「我要那个」—— 可是第一章里你只会说「这是书」,却说不出是哪一本、是谁的。本章会给你日语整齐的 こ/そ/あ 指示体系(これ/それ/あれ 单独使用,この/その/あの 放在名词前),以及万能的连接词 の —— 它把两个名词粘在一起,让前者拥有或修饰后者,于是「A 的 B」就简单地写成 `AのB`。",
  points: [
    {
      id: "e02-1",
      titleEn: "これ・それ・あれ — “this one / that one”",
      titleZh: "これ・それ・あれ ——「这个 / 那个」",
      bodyEn:
        "In chapter 1 you could already say `これは本です` — but notice you needed `これ` to do it, and we never explained where it comes from. Here it is: when you want to point at a thing without naming it, Japanese gives you three pronouns instead of English's two-way “this/that”.\n\nThe split is by distance. `これ` (kore) is near you, the speaker — “this one, here by me”. `それ` (sore) is near the listener — “that one, by you”. `あれ` (are) is far from both of you — “that one over there”. Japanese cares about whose space the thing sits in, which is why there's a separate word for the listener's zone that English just folds into “that”.\n\nBecause these are pronouns, they behave exactly like the nouns you already plug into `A は B です`. So pointing at something on the counter and asking the clerk `あれは何ですか` — “what is that over there?” — is just the chapter-1 question pattern with `あれ` in the A slot.\n\nPicture buying a drink: you hold yours and say `これは…`, you nod at the one in your friend's hand and say `それは…`, and you gesture at the bottle on a high shelf and say `あれは…`. The pitfall to avoid is choosing by your own distance only — `それ` is keyed to the listener, so a thing right next to them is `それ`, not `あれ`, even if it's far from you.",
      bodyZh:
        "第一章里你其实已经说过 `これは本です` —— 但请注意,你当时需要 `これ` 才能造这句话,而我们一直没解释它从哪来。现在揭晓:当你想指着某物而不说出它的名字时,日语给你三个代词,而不是英语那种「这/那」的两分法。\n\n区分的依据是距离。`これ`(kore)离你这个说话人近 ——「我这边的这个」;`それ`(sore)离听话人近 ——「你那边的那个」;`あれ`(are)离双方都远 ——「那边的那个」。日语在意东西落在谁的空间里,所以专门有一个词指向听话人的区域,而英语把这一切都笼统归进「那」。\n\n因为这些是代词,它们的表现和你已经会往 `A は B です` 里塞的名词一模一样。所以指着柜台上的东西问店员 `あれは何ですか` ——「那边那个是什么?」—— 不过就是第一章的疑问句型,把 `あれ` 放进 A 的位置。\n\n想象买饮料:你举着自己的那瓶说 `これは…`,朝朋友手里那瓶点头说 `それは…`,再指向高架子上那瓶说 `あれは…`。要避开的陷阱是只按你自己的距离来选 —— `それ` 是以听话人为基准的,所以紧挨着对方的东西是 `それ` 而不是 `あれ`,哪怕它离你很远。",
      examples: [
        {
          jp: "これは本です",
          reading: "これはほんです",
          en: "This is a book.",
          zh: "这是书。",
          code: `import type { ProperNoun, PhraseWithParticle, ConjugateCopula } from "typed-japanese";

type これ = ProperNoun<"これ">;
type 本 = ProperNoun<"本">;

// これ + は (topic) + 本 + です
type これは本です = \`\${PhraseWithParticle<これ, "は">}\${ConjugateCopula<本, "Polite">}\`;
`,
        },
        {
          jp: "それは私のかばんです",
          reading: "それはわたしのかばんです",
          en: "That (by you) is my bag.",
          zh: "那(你那边的)是我的包。",
          code: `import type { ProperNoun, PhraseWithParticle, ConjugateCopula } from "typed-japanese";

type それ = ProperNoun<"それ">;
type 私 = ProperNoun<"私">;
type かばん = ProperNoun<"かばん">;

// それ + は + 私 + の + かばん + です
type それは私のかばんです = \`\${PhraseWithParticle<それ, "は">}\${PhraseWithParticle<私, "の">}\${ConjugateCopula<かばん, "Polite">}\`;
`,
        },
        {
          jp: "あれは何ですか",
          reading: "あれはなんですか",
          en: "What is that over there?",
          zh: "那边的那个是什么?",
          code: `import type { ProperNoun, PhraseWithParticle, ConjugateCopula } from "typed-japanese";

type あれ = ProperNoun<"あれ">;
type 何 = ProperNoun<"何">;

// あれ + は + 何 + ですか
type あれは何ですか = \`\${PhraseWithParticle<あれ, "は">}\${ConjugateCopula<何, "Polite">}か\`;
`,
        },
      ],
    },
    {
      id: "e02-2",
      titleEn: "この・その・あの + noun",
      titleZh: "この・その・あの + 名词",
      bodyEn:
        "`これ` lets you say “this one”, but on a crowded train platform that's not enough — you need to say “this train” versus “that train” so your friend boards the right one. The bare pronoun can't carry a noun; you need a form that attaches.\n\nThat's what `この`・`その`・`あの` are for: put them directly in front of a noun and they pick out a specific one. The distance meanings are exactly the same as before — `この` is near you, `その` is near the listener, `あの` is far from both — only the grammar changes. `これ` stands alone; `この` must lean on a following noun.\n\nThink of it as the difference between `これは本です` (“this is a book”) and `この本は…` (“this book is…”). The first identifies a thing; the second keeps the noun in hand so you can go on to say something about it. Whenever you want to say more about the very thing you're pointing at — `この本は面白いです`, “this book is interesting” — reach for the noun-modifying form.\n\nSo on that platform you'd say `この電車` for the one at your feet and `あの電車` for one across the tracks; in a shop you'd say `その店` about the one your friend just mentioned. The common slip is mixing the families: it's never `これ本` — that's two words crashing together — it's `この本`.",
      bodyZh:
        "`これ` 能让你说「这个」,但在拥挤的站台上这还不够 —— 你得说清「这班车」和「那班车」,好让朋友上对车。光秃秃的代词带不了名词,你需要一个能接上去的形式。\n\n这正是 `この`・`その`・`あの` 的用处:把它们直接放在名词前面,就能限定出具体的某一个。距离含义和前面完全一样 —— `この` 离你近,`その` 离听话人近,`あの` 离双方都远 —— 变的只是语法。`これ` 可以单独站立;`この` 必须靠在后面的名词上。\n\n可以把它想成 `これは本です`(「这是书」)和 `この本は…`(「这本书……」)的区别。前者点明一样东西;后者把名词握在手里,好让你接着评论它。每当你想对正指着的那样东西再多说几句 —— `この本は面白いです`,「这本书很有趣」—— 就用这个连体形式。\n\n于是在站台上,脚边那班车说 `この電車`,对面轨道那班说 `あの電車`;在店里,朋友刚提到的那家说 `その店`。常见的错误是把两套形式搞混:绝不能说 `これ本` —— 那是两个词硬撞在一起 —— 要说 `この本`。",
      examples: [
        {
          jp: "この本は面白いです",
          reading: "このほんはおもしろいです",
          en: "This book is interesting.",
          zh: "这本书很有趣。",
          code: `import type { ProperNoun, IAdjective, ConjugateAdjective, PhraseWithParticle } from "typed-japanese";

type 本 = ProperNoun<"本">;
type 面白い = IAdjective & { stem: "面白"; ending: "い" };

// この + 本 + は + 面白い + です
type この本は面白いです = \`この\${PhraseWithParticle<本, "は">}\${ConjugateAdjective<面白い, "Basic">}です\`;
`,
        },
        {
          jp: "その人は田中さんです",
          reading: "そのひとはたなかさんです",
          en: "That person is Mr. Tanaka.",
          zh: "那个人是田中先生。",
          code: `import type { ProperNoun, PhraseWithParticle, ConjugateCopula } from "typed-japanese";

type 人 = ProperNoun<"人">;
type 田中さん = ProperNoun<"田中さん">;

// その + 人 + は + 田中さん + です
type その人は田中さんです = \`その\${PhraseWithParticle<人, "は">}\${ConjugateCopula<田中さん, "Polite">}\`;
`,
        },
        {
          jp: "あの店は新しいです",
          reading: "あのみせはあたらしいです",
          en: "That shop over there is new.",
          zh: "那边那家店是新的。",
          code: `import type { ProperNoun, IAdjective, ConjugateAdjective, PhraseWithParticle } from "typed-japanese";

type 店 = ProperNoun<"店">;
type 新しい = IAdjective & { stem: "新し"; ending: "い" };

// あの + 店 + は + 新しい + です
type あの店は新しいです = \`あの\${PhraseWithParticle<店, "は">}\${ConjugateAdjective<新しい, "Basic">}です\`;
`,
        },
      ],
    },
    {
      id: "e02-3",
      titleEn: "Possessive の — AのB (“A's B”)",
      titleZh: "所属的 の —— AのB(「A 的 B」)",
      bodyEn:
        "You can now point at things and pick out specific ones, but you still can't say whose they are. Someone holds up an umbrella at the entrance and asks `これは誰の傘ですか` — “whose umbrella is this?” — and you want to answer “that's mine”. For that you need a way to bolt one noun onto another.\n\nThe particle `の` does exactly that: `A の B` means “A's B” / “B of A”. The owner or modifier comes first and `の` links it to the thing it describes. So `私の傘` is “my umbrella”, `田中さんの車` is “Mr. Tanaka's car”. The order feels backwards from the English word “of” but lines up neatly with “'s”: whatever owns comes first, just like “Tanaka's car”.\n\nWhy build it this way? Japanese consistently puts the describing word before the described one — you already saw it with `この本`, where `この` sits ahead of `本`. `の` is the general-purpose version of that idea for two full nouns, and the same particle quietly appeared inside `それは私のかばんです` back in the first point of this chapter.\n\nIt's worth knowing `の` reaches past pure ownership. It also marks origin and type: `日本の車` is “a Japanese car” — a car from Japan — and `大学の先生` is “a university teacher”. You can even chain it, `私の友達の本` = “my friend's book”, reading left to right as me → friend → book. So at that entrance, you'd settle it with `これは私の傘です`, “this is my umbrella”, and the question is answered.",
      bodyZh:
        "现在你能指着东西、挑出具体的某一个了,可还是说不出它们是谁的。有人在门口举起一把伞问 `これは誰の傘ですか` ——「这是谁的伞?」—— 你想答「那是我的」。要做到这点,你需要一种把一个名词拴到另一个名词上的办法。\n\n助词 `の` 正是干这个的:`A の B` 意思是「A 的 B」。所有者或修饰语在前,`の` 把它和它所修饰的东西连起来。于是 `私の傘` 是「我的伞」,`田中さんの車` 是「田中先生的车」。这个语序和英语的 “of” 正好相反,却和中文的「的」严丝合缝:谁拥有,谁就在前,就像「田中的车」。\n\n为什么这么造?日语始终把修饰的词放在被修饰的词前面 —— 你在 `この本` 里已经见过,`この` 就排在 `本` 前头。`の` 就是这个想法用在两个完整名词上的通用版本;而且本章第一点的 `それは私のかばんです` 里,这个 `の` 早已悄悄出现过了。\n\n值得知道的是,`の` 不止管单纯的所有。它还标记来源和种类:`日本の車` 是「日本(产)的车」—— 来自日本的车,`大学の先生` 是「大学的老师」。它甚至能连用,`私の友達の本` =「我朋友的书」,从左往右读就是 我 → 朋友 → 书。所以在那个门口,你一句 `これは私の傘です`,「这是我的伞」,问题就解决了。",
      examples: [
        {
          jp: "これは私の傘です",
          reading: "これはわたしのかさです",
          en: "This is my umbrella.",
          zh: "这是我的伞。",
          code: `import type { ProperNoun, PhraseWithParticle, ConjugateCopula } from "typed-japanese";

type これ = ProperNoun<"これ">;
type 私 = ProperNoun<"私">;
type 傘 = ProperNoun<"傘">;

// これ + は + 私 + の + 傘 + です
type これは私の傘です = \`\${PhraseWithParticle<これ, "は">}\${PhraseWithParticle<私, "の">}\${ConjugateCopula<傘, "Polite">}\`;
`,
        },
        {
          jp: "田中さんの車は赤いです",
          reading: "たなかさんのくるまはあかいです",
          en: "Mr. Tanaka's car is red.",
          zh: "田中先生的车是红的。",
          code: `import type { ProperNoun, IAdjective, ConjugateAdjective, PhraseWithParticle } from "typed-japanese";

type 田中さん = ProperNoun<"田中さん">;
type 車 = ProperNoun<"車">;
type 赤い = IAdjective & { stem: "赤"; ending: "い" };

// 田中さん + の + 車 + は + 赤い + です
type 田中さんの車は赤いです = \`\${PhraseWithParticle<田中さん, "の">}\${PhraseWithParticle<車, "は">}\${ConjugateAdjective<赤い, "Basic">}です\`;
`,
        },
        {
          jp: "あれは日本の車です",
          reading: "あれはにほんのくるまです",
          en: "That over there is a Japanese car.",
          zh: "那边那辆是日本(产)的车。",
          code: `import type { ProperNoun, PhraseWithParticle, ConjugateCopula } from "typed-japanese";

type あれ = ProperNoun<"あれ">;
type 日本 = ProperNoun<"日本">;
type 車 = ProperNoun<"車">;

// あれ + は + 日本 + の + 車 + です
type あれは日本の車です = \`\${PhraseWithParticle<あれ, "は">}\${PhraseWithParticle<日本, "の">}\${ConjugateCopula<車, "Polite">}\`;
`,
        },
      ],
    },
  ],
};

export default chapter;
