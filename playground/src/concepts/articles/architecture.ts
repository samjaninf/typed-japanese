import type { ConceptArticle } from "../types";

/**
 * The flagship Foundations article. Method: teach each structural idea by
 * showing one thought three ways — Japanese, English, and a small piece of
 * lightweight TypeScript (comments in the reader's language, syntax-highlighted)
 * — and define every jargon term inline. The spine is the function idea: a
 * clause is a verb (function) applied to tagged arguments, with the verb last,
 * and sentences nest those calls.
 */
const article: ConceptArticle = {
  id: "architecture",
  order: 1,
  titleEn: "How a Japanese Sentence Is Built",
  titleZh: "日语句子是怎么搭起来的",
  taglineEn: "Read Japanese grammar like a programming language.",
  taglineZh: "把日语语法当成一门编程语言来读。",
  introEn:
    "A Japanese sentence is put together by rules that are unusually regular — regular enough that this whole site models them as TypeScript types. We'll lean on that. For each idea below you'll see one thought written three ways: the **Japanese**, its closest **English**, and a small piece of **TypeScript** that makes the structural difference impossible to miss. You don't have to write TypeScript — reading it is enough, and it keeps the grammar terms (particle, topic, predicate) concrete instead of abstract. Read top to bottom; each idea rests on the one before it.",
  introZh:
    "日语句子是按一套异常规则的方式搭起来的 —— 规则到整个网站都把它们建模成了 TypeScript 类型。我们正好借这一点。下面每个概念，你都会看到同一个想法的三种写法：**日语**、最接近的**英语**，以及一小段让结构差异无所遁形的 **TypeScript**。你不必会写 TypeScript —— 能读就够了，它会把那些语法术语（助词、主题、谓语）从抽象变得具体。请从上往下读，每个概念都搭在前一个之上。",
  sections: [
    {
      id: "particles",
      headingEn: "Roles come from tags, not from position",
      headingZh: "角色靠标签，不靠位置",
      blocks: [
        {
          kind: "prose",
          en: "Take the most basic English sentence and ask a strange question: how do you know **who** is doing the action? In 'the dog bit the man', the only thing telling you the dog did the biting is **word order** — 'dog' sits before the verb, 'man' after it. Swap them and the meaning reverses. English grammar is, at its core, positional.\n\nJapanese works the other way. Each noun is followed by a tiny word — a **particle** — that names its job in the sentence. Once a noun is tagged 'this is the subject' or 'this is the object', its position no longer carries that information, so the order becomes flexible. The tag does the work that English makes position do.",
          zh: "拿最基础的英语句子，问一个奇怪的问题：你怎么知道是**谁**在做这个动作？在 'the dog bit the man'（狗咬了人）里，唯一告诉你是狗在咬的，是**语序** —— 'dog' 在动词前，'man' 在动词后。把两者调换，意思就反了。英语语法的内核是「靠位置」。\n\n日语反其道而行。每个名词后面都跟一个小词 —— **助词** —— 来点明它在句中的职责。名词一旦被贴上「这是主语」或「这是宾语」的标签，它的位置就不再承载这份信息，于是顺序变得灵活。标签干的，正是英语让位置去干的活。",
        },
        {
          kind: "compare",
          jp: "私はコーヒーを飲む",
          reading: "わたしはコーヒーをのむ",
          en: "I drink coffee.",
          zh: "我喝咖啡。",
          tsEn: `// English marks roles by POSITION — the slots are fixed:
drink("I", "coffee")          // I drink coffee
drink("coffee", "I")          // coffee drinks me — order flipped the meaning

// Japanese marks roles by TAG — は = subject/topic, を = object:
const subject = "私" + "は"          // tagged 'topic'
const object  = "コーヒー" + "を"     // tagged 'object'

// because the tags carry the roles, the order is free:
"私はコーヒーを飲む"   // natural
"コーヒーを私は飲む"   // object first — same meaning`,
          tsZh: `// 英语靠位置标记角色 —— 槽位是固定的：
drink("I", "coffee")          // 我喝咖啡
drink("coffee", "I")          // 咖啡喝我 —— 顺序一换，意思就反了

// 日语靠标签标记角色 —— は = 主语/主题，を = 宾语：
const subject = "私" + "は"          // 贴上「主题」标签
const object  = "コーヒー" + "を"     // 贴上「宾语」标签

// 因为标签扛着角色，顺序是自由的：
"私はコーヒーを飲む"   // 自然
"コーヒーを私は飲む"   // 宾语在前 —— 意思相同`,
          noteEn:
            "`は` and `を` are glued onto the nouns like little labels. Move the labelled chunks around and the sentence still means the same thing — try that with the English and it breaks.",
          noteZh:
            "`は`、`を` 像小标签一样粘在名词上。把带标签的整块挪来挪去，句子意思不变 —— 同样的事在英语里一做就崩。",
        },
        {
          kind: "define",
          term: "助詞",
          reading: "じょし",
          romaji: "joshi",
          en: "Particle — a short word placed **after** a noun (or clause) that labels its grammatical job: `は`/`が` mark the subject-ish roles, `を` the object, `に` a destination or time, `で` a location or means, `へ` a direction. The nearest English thing is a preposition, but particles come *after* the word and never change form.",
          zh: "助词 —— 放在名词（或小句）**之后**、给它的语法角色贴标签的短词：`は`/`が` 标记主语类角色，`を` 标记宾语，`に` 标记目的地或时间，`で` 标记地点或方式，`へ` 标记方向。最接近的英语类比是介词，但助词放在词*后面*，且永不变形。",
        },
        {
          kind: "prose",
          en: "A handful of particles covers most of what you'll read at first — think of them as the label set: `は` topic ('as for…', more in Principle 3), `が` subject (the doer), `を` object (the thing acted on), `に` destination/time ('to', 'at'), `で` location/means ('at a place', 'by a tool'), `へ` direction ('toward').\n\nBecause every role is spelled out, Japanese can drop whatever is obvious — including the subject — and still be unambiguous. `コーヒーを飲む` ('drink coffee') is a complete, normal sentence; the *who* is simply understood.",
          zh: "少数几个助词就覆盖了你最初要读的绝大部分 —— 把它们当作一套标签：`は` 主题（「说到……」，详见原理 3）、`が` 主语（施事者）、`を` 宾语（被作用的东西）、`に` 目的地/时间（「到」「在」）、`で` 地点/方式（「在某地」「用某工具」）、`へ` 方向（「朝」）。\n\n正因为每个角色都被写明，日语可以省掉任何不言自明的成分 —— 包括主语 —— 还不产生歧义。`コーヒーを飲む`（喝咖啡）就是一句完整、自然的话；那个「谁」不说也懂。",
        },
        {
          kind: "diagram",
          captionEn:
            "Each noun wears its role as a label (は, を). Because the labels carry the meaning, you could swap the order of the two and nothing changes.",
          captionZh:
            "每个名词都把自己的角色当标签戴着（は、を）。正因为标签扛着意思，你把这两个的顺序对调，意思也不变。",
          root: {
            label: "飲む",
            args: [
              { label: "私", tag: "は", roleEn: "topic", roleZh: "主题" },
              { label: "コーヒー", tag: "を", roleEn: "object", roleZh: "宾语" },
            ],
          },
        },
        { kind: "chapters", ids: ["e01", "e05", "e06"] },
      ],
    },
    {
      id: "predicate-last",
      headingEn: "A clause is a function with the verb last — and sentences nest them",
      headingZh: "小句是动词在最后的函数 —— 而句子把它们层层嵌套",
      blocks: [
        {
          kind: "prose",
          en: "First, the one word this principle leans on: a **clause**. Everything below is about how clauses are shaped and how they nest inside one another, so let's pin the term down before we use it.",
          zh: "先说这条原理要依赖的那个词：**小句**。下面讲的全是小句怎么成形、又怎么彼此嵌套，所以先把这个词定下来再用。",
        },
        {
          kind: "define",
          term: "節",
          reading: "せつ",
          romaji: "setsu",
          en: "Clause — a group of words with its own predicate (its own closing verb, adjective, or noun-plus-copula). A whole sentence is one clause; a complex sentence is clauses nested inside other clauses. Japanese grammar calls it 節.",
          zh: "小句（节，せつ）—— 拥有自己谓语（自己的收尾动词、形容词，或名词加系动词）的一组词。一句完整的话就是一个小句；复杂的句子，就是小句嵌在别的小句里。日语语法称它为「節」。",
        },
        {
          kind: "prose",
          en: "Here is the mental model that makes the rest click. Treat a **verb as a function** and the tagged nouns as the **arguments** you pass it. English writes the function name first, then the arguments: `eat(I, sushi)`. Japanese writes the **arguments first and the function last** — the same call, with the name moved to the end. The verb (or whatever does the asserting) is pinned to the very end of the clause, always.",
          zh: "这是让其余一切都豁然开朗的思维模型。把**动词看作一个函数**，把带标签的名词看作传给它的**参数**。英语先写函数名，再写参数：`eat(I, sushi)`。日语则**参数在前、函数在最后** —— 同一个调用，只是把名字挪到了末尾。动词（或任何负责下断言的成分）永远被钉在小句的最末尾。",
        },
        {
          kind: "compare",
          jp: "私は寿司を食べる",
          reading: "わたしはすしをたべる",
          en: "I eat sushi.",
          zh: "我吃寿司。",
          tsEn: `// Treat the verb as a function, the nouns as its arguments.
eat(I, sushi)        // English: the function (verb) comes FIRST
(I, sushi, eat)      // Japanese: the verb comes LAST — 私は 寿司を 食べる`,
          tsZh: `// 把动词看作函数，名词看作它的参数。
eat(I, sushi)        // 英语：函数（动词）在最前
(I, sushi, eat)      // 日语：动词在最后 —— 私は 寿司を 食べる`,
          noteEn:
            "Read to the last word before you decide what a Japanese sentence means — whether it's negative, past, or a question is all settled by that final verb, not by anything up front.",
          noteZh:
            "读到最后一个词，再判断一句日语的意思 —— 它是否定、过去还是疑问，全由结尾那个动词决定，跟前面无关。",
        },
        {
          kind: "diagram",
          captionEn:
            "The clause as a picture: the tagged arguments feed into the verb, which closes the box at the end.",
          captionZh:
            "把这个小句画出来：带标签的参数汇入动词，而动词在末尾为这个盒子收尾。",
          root: {
            label: "食べる",
            args: [
              { label: "私", tag: "は", roleEn: "topic", roleZh: "主题" },
              { label: "寿司", tag: "を", roleEn: "object", roleZh: "宾语" },
            ],
          },
        },
        {
          kind: "prose",
          en: "Now the part most courses bury, and the one that actually matters: **a whole clause can itself be an argument to another verb.** Sentences don't just line up — they **nest**, like function calls inside function calls. 'Tanaka said that I bought a book' is `say(Tanaka, bought(I, book))`. In Japanese, each verb still lands at the end of *its own* clause, so as clauses nest, their verbs stack up toward the end.",
          zh: "接下来是大多数教程都埋没、却真正要紧的一点：**一整个小句本身可以成为另一个动词的参数。** 句子不是简单排队 —— 而是**嵌套**，像函数调用里套函数调用。「田中说我买了书」就是 `say(Tanaka, bought(I, book))`。在日语里，每个动词依然落在*它自己*小句的末尾，于是小句一层层嵌套时，动词也一个个往后堆。",
        },
        {
          kind: "compare",
          jp: "田中さんは私が本を買ったと言った",
          reading: "たなかさんはわたしがほんをかったといった",
          en: "Tanaka said that I bought a book.",
          zh: "田中说我买了书。",
          tsEn: `// A whole clause becomes an argument of another verb — calls in calls:
say(Tanaka, bought(I, book))

// Japanese keeps each verb at the END of its own clause. と ('that')
// wraps the inner clause before the outer verb 言った consumes it:
//   田中さんは [ 私が 本を 買った ] と 言った
//   topic        (I-ga  book-wo  bought)  quote  said`,
          tsZh: `// 一整个小句成为另一个动词的参数 —— 调用里套调用：
say(Tanaka, bought(I, book))

// 日语让每个动词都待在自己小句的末尾。と（「……这件事」）先把
// 内层小句包起来，再交给外层动词 言った 去「消费」：
//   田中さんは [ 私が 本を 買った ] と 言った
//   主题         （我-が 书-を 买了）   引用   说了`,
          noteEn:
            "Read the verbs from the inside out: `買った` (bought) closes the inner thought, `言った` (said) closes the outer one. Two functions, two endings, nested — and that recursion is how Japanese builds long sentences.",
          noteZh:
            "从里往外读这些动词：`買った`（买了）结束内层的想法，`言った`（说了）结束外层的。两个函数，两个收尾，层层相套 —— 而这种递归，正是日语搭出长句的方式。",
        },
        {
          kind: "diagram",
          captionEn:
            "Nesting, drawn out: the inner clause is a box that sits inside the outer one as a single argument. と is the tag that hands it over; each verb still closes its own box.",
          captionZh:
            "把嵌套画出来：内层小句是一个盒子，作为单个参数嵌在外层盒子里。と 是把它递交出去的标签；每个动词仍为自己的盒子收尾。",
          root: {
            label: "言った",
            args: [
              { label: "田中さん", tag: "は", roleEn: "topic", roleZh: "主题" },
              {
                label: "買った",
                tag: "と",
                roleEn: "inner clause, quoted with と",
                roleZh: "内层小句，用 と 引用",
                args: [
                  { label: "私", tag: "が", roleEn: "subject", roleZh: "主语" },
                  { label: "本", tag: "を", roleEn: "object", roleZh: "宾语" },
                ],
              },
            ],
          },
        },
        {
          kind: "prose",
          en: "This nesting is not an exotic feature — it *is* the architecture. Relative clauses, quotations, reasons, conditions: all of them are just one clause handed to another as an argument, each closing with its own verb. Everything that turns a bare verb into 'didn't', 'will', or 'politely' attaches to those closing verbs — which is what the next principles are about.",
          zh: "这种嵌套不是什么冷僻特性 —— 它*就是*整个架构。定语从句、引用、原因、条件：全都不过是把一个小句当参数交给另一个，各自用自己的动词收尾。一切把光秃秃的动词变成「没有」「将要」「礼貌地」的成分，都挂在这些收尾的动词上 —— 而这正是后面几条原理要讲的。",
        },
        {
          kind: "compare",
          jp: "私が買った本は高い",
          reading: "わたしがかったほんはたかい",
          en: "The book I bought is expensive.",
          zh: "我买的书很贵。",
          tsEn: `// A clause can also DESCRIBE a noun — that's a relative clause:
isExpensive(book(boughtBy(I)))

//   [ 私が 買った ] 本は 高い
//   (I-ga   bought)  book(topic)  is-expensive
//   the inner clause describes 本; then 本は is the topic of 高い`,
          tsZh: `// 一个小句也可以「描述」一个名词 —— 这就是定语从句：
isExpensive(book(boughtBy(I)))

//   ［ 私が 買った ］ 本は 高い
//   （我-が 买了）    书（主题）  贵
//   内层小句描述「本」；然后 本は 是 高い 的主题`,
          noteEn:
            "Same recursion as before, but the inner clause now *modifies a noun* instead of being quoted. `買った` still closes its own clause; `高い` (an adjective — Principle 4) closes the sentence.",
          noteZh:
            "和之前一样的递归，只是内层小句这次去*修饰一个名词*，而不是被引用。`買った` 仍为自己的小句收尾；`高い`（一个形容词 —— 见原理 4）为整句收尾。",
        },
        {
          kind: "diagram",
          captionEn:
            "A relative clause is the same nesting in another guise: [私が→買った] is a box that describes 本, which then becomes the topic of the adjective 高い.",
          captionZh:
            "定语从句是同一种嵌套换了身衣裳：[私が→買った] 是一个描述「本」的盒子，「本」再成为形容词 高い 的主题。",
          root: {
            label: "高い",
            args: [
              {
                label: "買った",
                roleEn: "inner clause — describes 本",
                roleZh: "内层小句 —— 描述「本」",
                args: [
                  { label: "私", tag: "が", roleEn: "subject", roleZh: "主语" },
                ],
              },
              { label: "本", tag: "は", roleEn: "topic", roleZh: "主题" },
            ],
          },
        },
        { kind: "chapters", ids: ["e01", "e05", "e20"] },
      ],
    },
    {
      id: "topic-subject",
      headingEn: "Topic vs. subject — は and が",
      headingZh: "主题与主语 —— は 和 が",
      blocks: [
        {
          kind: "prose",
          en: "Now the trap every learner trips on. Two particles, `は` and `が`, both look like they mark the English subject — and they are not interchangeable, because they answer different questions.\n\n`が` marks the grammatical **subject**: the specific thing doing or being something, often *new* information — the answer to 'who?' or 'what?'. `は` marks the **topic**: it lifts something up as the frame for the rest of the sentence, 'as for X, …', usually something already known. English has no dedicated word for the topic, so it hides inside the subject and we never notice the difference.",
          zh: "现在轮到每个学习者都会栽的坑。`は` 和 `が` 这两个助词，看起来都像在标记英语的主语 —— 但它们不能互换，因为它们回答的是不同的问题。\n\n`が` 标记语法**主语**：那个具体地做某事或处于某状态的东西，常是*新*信息 —— 「谁？」「什么？」的答案。`は` 标记**主题**：它把某物拎出来，作为句子其余部分的框架，「说到 X，……」，通常是已知的东西。英语没有专门表示主题的词，于是主题藏在主语里，我们从不留意这点区别。",
        },
        {
          kind: "define",
          term: "主題",
          reading: "しゅだい",
          romaji: "shudai",
          en: "Topic — what the sentence is *about*, announced up front with `は`, roughly 'as for…'. It frames the comment that follows, and it is **not necessarily the grammatical subject** — a topic can be a time, a place, or even the object.",
          zh: "主题 —— 句子*在谈论*的东西，用 `は` 在句首点出，大致是「说到……」。它为后面的评述搭框架，而且**不一定是语法主语** —— 主题可以是时间、地点，甚至宾语。",
        },
        {
          kind: "define",
          term: "主語",
          reading: "しゅご",
          romaji: "shugo",
          en: "Subject — the grammatical doer of the action or holder of the state, marked with `が` when it must be made explicit or is new information. This is 'the subject' in the ordinary English sense.",
          zh: "主语 —— 动作的施事者或状态的承载者，在需要明示或属于新信息时用 `が` 标记。这就是英语通常意义上的「主语」。",
        },
        {
          kind: "compare",
          jp: "象は鼻が長い",
          reading: "ぞうははながながい",
          en: "Elephants have long noses. (literally: as for elephants, the nose is long)",
          zh: "大象鼻子长。（字面：说到大象，鼻子长）",
          tsEn: `// English forces ONE 'subject'. Japanese splits the job in two:
const sentence = {
  topic:     "象",    // は — 'as for the elephant…'
  subject:   "鼻",    // が — '…the NOSE'
  predicate: "長い",  // 'is long'
}  // 象は鼻が長い`,
          tsZh: `// 英语只能有一个「主语」。日语把这份活儿拆成两半：
const sentence = {
  topic:     "象",    // は —— 「说到大象……」
  subject:   "鼻",    // が —— 「……是鼻子」
  predicate: "長い",  // 「长」
}  // 象は鼻が長い`,
          noteEn:
            "A first rule of thumb: **`は` frames, `が` identifies.** `私は` sets you as the topic under discussion; `誰が来た?` ('who came?') demands `が` because it's hunting for the specific subject. You'll refine this for years, but that one line carries you far.",
          noteZh:
            "一个初步判据：**`は` 搭框架，`が` 作指认。** `私は` 把你设为正在谈论的主题；`誰が来た?`（谁来了？）必须用 `が`，因为它在找那个具体的主语。这条你会打磨很多年，但单凭它就能走很远。",
        },
        {
          kind: "diagram",
          captionEn:
            "Two different slots, side by side: 象は is the topic that frames the whole sentence, while 鼻が is the actual subject of 長い. English would have to pick just one 'subject'.",
          captionZh:
            "两个不同的槽，并排放着：象は 是为整句搭框架的主题，而 鼻が 才是 長い 真正的主语。换成英语，只能从中挑一个当「主语」。",
          root: {
            label: "長い",
            args: [
              { label: "象", tag: "は", roleEn: "topic (frame)", roleZh: "主题（框架）" },
              { label: "鼻", tag: "が", roleEn: "subject", roleZh: "主语" },
            ],
          },
        },
        { kind: "chapters", ids: ["e01"] },
      ],
    },
    {
      id: "three-predicates",
      headingEn: "Three kinds of predicate — and a noun needs a copula",
      headingZh: "三种谓语 —— 而名词需要系动词",
      blocks: [
        {
          kind: "prose",
          en: "Principle 2 said every clause ends in a predicate — the function that closes it. Exactly three kinds of word can play that role, and Japanese sorts them by a single test: **does the word change its own shape, or not?**",
          zh: "原理 2 说过，每个小句都以谓语收尾 —— 就是那个为它收尾的函数。能担当这个角色的词恰好有三种，而日语用一个测试给它们分类：**这个词自己会不会变形？**",
        },
        {
          kind: "define",
          term: "用言",
          reading: "ようげん",
          romaji: "yōgen",
          en: "Inflecting words — **verbs** and **adjectives**. They are complete predicates on their own and they change shape (conjugate). `食べる` (eat) and `高い` (is expensive) can each end a sentence with no help.",
          zh: "用言 —— **动词**和**形容词**。它们自身就是完整的谓语，并且会变形（活用）。`食べる`（吃）和 `高い`（贵）都能独立结句，无需帮手。",
        },
        {
          kind: "define",
          term: "体言",
          reading: "たいげん",
          romaji: "taigen",
          en: "Non-inflecting words — **nouns**. A noun never changes shape and cannot end a statement by itself. To say 'X is a student', it borrows a helper called the copula (`だ`/`です`).",
          zh: "体言 —— 不变形的词，即**名词**。名词永不变形，也不能独立结句。要说「X 是学生」，它得借一个叫系动词（`だ`/`です`）的帮手。",
        },
        {
          kind: "prose",
          en: "Here's the catch English speakers miss. In English *every* statement needs the verb 'to be': 'it is **expensive**', 'she is **a student**' — so you expect a word for 'is' everywhere. Japanese needs a copula only for the **noun** case. An adjective already contains its 'is':",
          zh: "这里有个英语母语者常忽略的关键。在英语里，*每一句*陈述都需要 be 动词：'it is **expensive**'、'she is **a student**' —— 于是你以为到处都要有个「是」。可日语只在**名词**这种情况才需要系动词。形容词自身就已经含着那个「是」：",
        },
        {
          kind: "compare",
          jp: "高い",
          reading: "たかい",
          en: "(It) is expensive.",
          zh: "（它）贵。",
          tsEn: `// English: the adjective NEEDS a separate 'is'.
"it" + " is " + "expensive"

// Japanese: 高い already MEANS 'is expensive' — there is no 'is' word.
"高い"        // a complete sentence: '(it) is expensive'
"高いだ"      // WRONG — never bolt a copula onto an adjective`,
          tsZh: `// 英语：形容词需要一个单独的「是」。
"it" + " is " + "expensive"

// 日语：高い 本身就是「（是）贵的」—— 根本没有「是」这个词。
"高い"        // 一句完整的话：「（它）贵」
"高いだ"      // 错 —— 绝不要给形容词硬加系动词`,
          noteEn:
            "`高い` is not the word 'expensive'; it's the whole statement 'is expensive'. Verbs and adjectives are self-contained predicates.",
          noteZh:
            "`高い` 不是「贵」这个词，而是「（是）贵的」这整句陈述。动词和形容词都是自带谓语的。",
        },
        {
          kind: "compare",
          jp: "学生です",
          reading: "がくせいです",
          en: "(I) am a student.",
          zh: "（我）是学生。",
          tsEn: `// A noun can't assert on its own. The three predicate kinds, as a union:
type Predicate =
  | Verb            // 食べる    eat
  | Adjective       // 高い      is expensive
  | NounWithCopula  // 学生です   is a student

"学生"        // just a noun: 'student' — not a sentence
"学生です"    // noun + copula です → '(I) am a student'`,
          tsZh: `// 名词无法独立下断言。三种谓语，写成一个联合类型：
type Predicate =
  | Verb            // 食べる    吃
  | Adjective       // 高い      （是）贵
  | NounWithCopula  // 学生です   （是）学生

"学生"        // 只是个名词：「学生」—— 不成句
"学生です"    // 名词 + 系动词 です → 「（我）是学生」`,
          noteEn:
            "The copula `だ`/`です` is the noun's borrowed 'is'. It's also the one piece here that itself inflects — which leads straight into the last principle.",
          noteZh:
            "系动词 `だ`/`です` 就是名词借来的「是」。它也是这里唯一自身会变形的部分 —— 这正好引出最后一条原理。",
        },
        {
          kind: "diagram",
          captionEn:
            "A verb or adjective could close a clause alone. A noun can't — so です, the copula, takes the closing slot. 学生 is just the complement it carries.",
          captionZh:
            "动词或形容词能独自为小句收尾。名词不能 —— 于是系动词 です 占住了收尾的槽位，而 学生 只是它带着的那个名词。",
          root: {
            label: "です",
            args: [
              { label: "私", tag: "は", roleEn: "topic", roleZh: "主题" },
              { label: "学生", roleEn: "noun (complement)", roleZh: "名词（谓语核心）" },
            ],
          },
        },
        { kind: "chapters", ids: ["e01", "e08", "e05", "e13"] },
      ],
    },
    {
      id: "conjugation",
      headingEn: "Inflection swaps the ending, it doesn't add words",
      headingZh: "变形靠改词尾，不靠加词",
      blocks: [
        {
          kind: "prose",
          en: "Last piece, and it's where the regularity turns almost mechanical. To say *not*, *did*, *will*, or *politely*, English keeps the verb fixed and stacks helper words around it: 'eat' → 'did not eat' → 'will eat'. Japanese keeps it to **one word** and rewrites its **ending**:",
          zh: "最后一块，也是规则性变得近乎机械的地方。要表达*否定*、*过去*、*将来*或*礼貌*，英语让动词不动，在它周围堆助词：'eat' → 'did not eat' → 'will eat'。日语只用**一个词**，改写它的**词尾**：",
        },
        {
          kind: "compare",
          jp: "食べる → 食べない → 食べた → 食べます",
          reading: "たべる → たべない → たべた → たべます",
          en: "eat → don't eat → ate → eat (polite)",
          zh: "吃 → 不吃 → 吃了 → 吃（礼貌）",
          tsEn: `// English wraps the verb in helper words; 'eat' itself stays put.
"eat"  ->  "do not eat"  ->  "will eat"  ->  "ate"

// Japanese rewrites the ENDING of one verb. Same stem 食べ, new tail:
conjugate("食べる", "negative") === "食べない"   // 食べ + ない
conjugate("食べる", "past")     === "食べた"     // 食べ + た
conjugate("食べる", "polite")   === "食べます"   // 食べ + ます`,
          tsZh: `// 英语用助词把动词裹起来；动词「eat」本身一动不动。
"eat"  ->  "do not eat"  ->  "will eat"  ->  "ate"

// 日语改写同一个动词的词尾。词干 食べ 不变，换个尾巴：
conjugate("食べる", "negative") === "食べない"   // 食べ + ない（否定）
conjugate("食べる", "past")     === "食べた"     // 食べ + た（过去）
conjugate("食べる", "polite")   === "食べます"   // 食べ + ます（礼貌）`,
          noteEn:
            "Politeness is just another ending: plain `食べる` vs. polite `食べます`, plain `学生だ` vs. polite `学生です`. Same meaning, different tail — and you pick a level for every sentence you speak.",
          noteZh:
            "礼貌也不过是另一种词尾：简体 `食べる` 对礼貌 `食べます`，简体 `学生だ` 对礼貌 `学生です`。意思相同，词尾不同 —— 而你说的每一句话都要选一个语体。",
        },
        {
          kind: "diagram",
          captionEn:
            "Only the ending moves. The stem 食べ is fixed; each form is the same word wearing a different tail (shown in pink).",
          captionZh:
            "动的只有词尾。词干 食べ 固定不变；每个形都是同一个词换了一条尾巴（粉色部分）。",
          row: [
            { label: "食べ", tag: "る", roleEn: "dictionary", roleZh: "辞书形" },
            { label: "食べ", tag: "ない", roleEn: "negative", roleZh: "否定" },
            { label: "食べ", tag: "た", roleEn: "past", roleZh: "过去" },
            { label: "食べ", tag: "ます", roleEn: "polite", roleZh: "礼貌" },
          ],
        },
        {
          kind: "define",
          term: "活用",
          reading: "かつよう",
          romaji: "katsuyō",
          en: "Conjugation / inflection — the systematic reshaping of a verb's, adjective's, or copula's **ending** to express tense, negation, politeness, or mood. The stem stays; only the tail changes, by fixed rules.",
          zh: "活用 —— 对动词、形容词或系动词**词尾**进行系统性改写，以表达时态、否定、礼貌或语气。词干不变，只有词尾按固定规则变化。",
        },
        {
          kind: "prose",
          en: "Because those rules are fixed and finite, the ending is **computable** from the stem and the form you want — which is the entire premise of this site. `食べる` plus the form 'て' *is* `食べて`, the way a function returns a value. That's why a Japanese sentence here can be a TypeScript type the compiler checks: not a metaphor, but the same determinism you just saw in every `conjugate(...)` line above.",
          zh: "正因为这些规则固定而有限，词尾可以由词干和你想要的活用形**算出来** —— 这就是整个网站的根本前提。`食べる` 加上「て」这个形，*就等于* `食べて`，像函数返回一个值一样。这也是为什么这里一句日语能成为编译器可校验的 TypeScript 类型：不是比喻，而是你刚在上面每一行 `conjugate(...)` 里看到的同一种确定性。",
        },
        { kind: "chapters", ids: ["e05", "e08", "e13"] },
      ],
    },
    {
      id: "together",
      headingEn: "Putting it together — one sentence, all five",
      headingZh: "把它们拼起来 —— 一句话，五条全用上",
      numbered: false,
      blocks: [
        {
          kind: "prose",
          en: "No principle lives alone. A real sentence runs them all at once and nests them, exactly like the function-in-function shape from Principle 2. Here's one a beginner would find opaque — and that you can now take apart cleanly:",
          zh: "没有一条原理是孤立的。真实的句子会把它们同时跑起来、层层嵌套，正是原理 2 那种「函数里套函数」的形状。下面这句，初学者会觉得不透 —— 而你现在能干净利落地把它拆开：",
        },
        {
          kind: "breakdown",
          jp: "私は田中さんが図書館で借りた本を読みました",
          reading: "わたしはたなかさんがとしょかんでかりたほんをよみました",
          en: "I read the book that Tanaka borrowed at the library.",
          zh: "我读了田中在图书馆借的那本书。",
          layers: [
            {
              fragment: "私は",
              depth: 0,
              en: "**topic** (`は`) — as for me, the one doing the reading",
              zh: "**主题**（`は`）—— 说到我，也就是读书的人",
            },
            {
              fragment: "田中さんが",
              depth: 1,
              en: "**subject** (`が`) — Tanaka, the doer *inside* a mini-clause that describes the book",
              zh: "**主语**（`が`）—— 田中，是*描述这本书*的小句里的施事者",
            },
            {
              fragment: "図書館で",
              depth: 1,
              en: "**place** (`で`) — at the library (still inside that mini-clause)",
              zh: "**地点**（`で`）—— 在图书馆（仍在那个小句里）",
            },
            {
              fragment: "借りた",
              depth: 1,
              en: "**inner verb** — plain past of 借りる 'borrow'; it ends the clause and the whole clause now describes 本",
              zh: "**内层动词** —— 借りる「借」的简体过去；它结束这个小句，整段小句就成了 本 的修饰语",
            },
            {
              fragment: "本を",
              depth: 0,
              en: "**object** (`を`) — the book: the very one the inner clause just described",
              zh: "**宾语**（`を`）—— 那本书：正是内层小句刚刚描述的那一本",
            },
            {
              fragment: "読みました",
              depth: 0,
              en: "**main verb** — polite past of 読む 'read'; the outer clause's final word",
              zh: "**主句动词** —— 読む「读」的礼貌过去；外层小句的收尾词",
            },
          ],
        },
        {
          kind: "compare",
          jp: "私は田中さんが図書館で借りた本を読みました",
          reading: "わたしはたなかさんがとしょかんでかりたほんをよみました",
          en: "I read the book that Tanaka borrowed at the library.",
          zh: "我读了田中在图书馆借的那本书。",
          tsEn: `// Same nesting as Principle 2 — one call wrapped inside another:
read(                               // 読みました — outer verb, LAST
  topic:  I,                        // 私は
  object: theBook(                  // 本を — and which book?
    borrowed(Tanaka, atLibrary)     // [ 田中さんが 図書館で 借りた ]
  ),
)

// Every principle is here at once:
// 1 tags (は が で を)   2 verbs last & nested   3 は vs が
// 4 a verb-predicate (読む) closes it   5 endings: 借りた past, 読みました polite-past`,
          tsZh: `// 和原理 2 一样的嵌套 —— 一个调用包在另一个里面：
read(                               // 読みました —— 外层动词，在最后
  topic:  I,                        // 私は
  object: theBook(                  // 本を —— 是哪本书？
    borrowed(Tanaka, atLibrary)     // ［ 田中さんが 图书馆で 借りた ］
  ),
)

// 五条原理在此同时出现：
// 1 标签（は が で を）  2 动词在最后且嵌套  3 は 与 が
// 4 用动词谓语（読む）收尾  5 词尾：借りた 过去、読みました 礼貌过去`,
          noteEn:
            "Read it inside-out, exactly like nested function calls: `借りた` closes the clause describing the book, then `読みました` closes the whole sentence. That's the entire architecture in one line of Japanese.",
          noteZh:
            "像读嵌套的函数调用一样，从里往外读：`借りた` 结束描述这本书的小句，然后 `読みました` 结束整句。这一行日语里，就装着全部的架构。",
        },
        {
          kind: "diagram",
          captionEn:
            "The same sentence as nested boxes. The inner clause describes 本 and rides along as one argument; 読みました closes the whole thing at the very end.",
          captionZh:
            "同一句话画成嵌套的盒子。内层小句描述「本」，作为一个参数一起被带入；読みました 在最末尾为整句收尾。",
          root: {
            label: "読みました",
            args: [
              { label: "私", tag: "は", roleEn: "topic", roleZh: "主题" },
              {
                label: "借りた",
                roleEn: "inner clause — describes 本",
                roleZh: "内层小句 —— 描述「本」",
                args: [
                  {
                    label: "田中さん",
                    tag: "が",
                    roleEn: "subject",
                    roleZh: "主语",
                  },
                  { label: "図書館", tag: "で", roleEn: "place", roleZh: "地点" },
                ],
              },
              { label: "本", tag: "を", roleEn: "object", roleZh: "宾语" },
            ],
          },
        },
        {
          kind: "prose",
          en: "That's the whole frame: **tag** each noun with a particle, **order** the tagged pieces freely, set **topic** and **subject** with `は`/`が`, close each clause with a **predicate** at the end, **nest** clauses inside one another, and **inflect** those closing predicates for tense and politeness. The **Grammar Course** now reads less like a list of patterns and more like filling in this frame one feature at a time — start with the noun sentence (`です`/`だ`), then verbs and the `を` object, then the everyday particles, then adjectives. And whenever a sentence looks opaque, drop it into the **Playground** and watch its type resolve, ending and all, into the Japanese you're reading.",
          zh: "这就是整个框架：给每个名词**贴标签**（助词），把带标签的零件**自由排序**，用 `は`/`が` 设定**主题**与**主语**，让每个小句都以末尾的**谓语**收尾，把小句**层层嵌套**，再为这些收尾的谓语做时态与礼貌的**活用**。现在再看**语法教程**，它不再像一串句型清单，而更像往这个框架里一次填一个特性 —— 从名词句（`です`/`だ`）开始，然后是动词与 `を` 宾语，接着是日常助词，再到形容词。而每当一句话看不透，就把它丢进**演练场**，看它的类型连词尾一起，求值成你正在读的那句日语。",
        },
        { kind: "chapters", ids: ["e01", "e05", "e06", "e08", "e13"] },
      ],
    },
  ],
};

export default article;
