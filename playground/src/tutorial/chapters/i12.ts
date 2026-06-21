import type { Chapter } from "../types";

const chapter: Chapter = {
  id: "i12",
  level: "intermediate",
  order: 12,
  titleEn: "Transitive & intransitive verbs",
  titleZh: "自动词与他动词",
  summaryEn:
    "You come home and the front door is open. Did the wind do it, or did your roommate leave it open on purpose? Japanese answers this with paired verbs — a transitive one you do to an object (開ける, takes を) and an intransitive sibling for what happens by itself (開く, takes が) — and then with 〜てある for a state someone deliberately set up versus 〜ている for a state that simply exists. This chapter finally explains why some of your verbs wanted を and others wanted が.",
  summaryZh:
    "你回到家,发现大门开着。是风吹开的,还是室友特意留着开的?日语用成对的动词来回答这个问题 —— 一个是你对宾语施加动作的他动词(開ける,用 を),一个是事物自己发生变化的自动词搭档(開く,用 が)—— 再用 〜てある 表示有人特意造成的状态,用 〜ている 表示单纯存在的状态。这一章终于会讲清楚,为什么你之前有些动词要用 を、有些却要用 が。",
  points: [
    {
      id: "i12-1",
      titleEn: "Paired verbs: 開ける (transitive) / 開く (intransitive)",
      titleZh: "成对动词:開ける(他动词)/ 開く(自动词)",
      bodyEn:
        "Back in chapter 5 you learned to mark an object with `を`: `窓を開ける` “(someone) opens the window”. But not every sentence about a window has an actor doing the opening — sometimes the window just opens. Up to now you had no clean way to say that second kind of sentence, where nobody is in focus and the thing changes on its own.\n\nJapanese solves this by giving many verbs a pair. A transitive verb (他動詞) describes an action a person performs on something: `窓を開ける`. Its intransitive partner (自動詞) describes the very same change happening by itself, with no one in the picture: `窓が開く` “the window opens / comes open”. Think of them as two doors into the same event — one from the actor's side, one from the thing's side.\n\nThe pair 開ける (an ichidan verb) / 開く (a godan verb) shows the most common shape: the transitive member often ends in `-eru`, the intransitive in a plain `-u`. You will meet many such couples — `閉める`/`閉まる` (close), `つける`/`つく` (switch on / come on), `入れる`/`入る` (put in / go in) — and the only reliable strategy is to learn each pair together, like vocabulary twins.\n\nImagine a stuffy meeting room. If you walk over and crack a window yourself, that act is `窓を開ける`. If you just notice the breeze and remark that the window came open, that is `窓が開く`. Same window, same opening — different verb, because the speaker's attention is on a different participant.",
      bodyZh:
        "在第 5 章你学过用 `を` 标记宾语:`窓を開ける`「(某人)打开窗户」。但并不是每个关于窗户的句子都有人去开它 —— 有时窗户就是自己开了。到目前为止,你还没有干净的办法去说第二种句子:没有动作者出场,事物自己发生了变化。\n\n日语的解决办法是给很多动词配上一个搭档。他动词(他動詞)描述人对某物施加的动作:`窓を開ける`。它的自动词(自動詞)搭档则描述同样的变化自己发生,画面里没有人:`窓が開く`「窗户开了 / 窗户开着」。可以把它们想成通往同一件事的两扇门 —— 一扇从动作者那一侧进,一扇从事物那一侧进。\n\n開ける(一段动词)/ 開く(五段动词)展示了最常见的形态:他动词常以 `-eru` 结尾,自动词常以朴素的 `-u` 结尾。你会遇到很多这样的词对 —— `閉める`/`閉まる`(关)、`つける`/`つく`(打开 / 亮起)、`入れる`/`入る`(放进 / 进入)—— 唯一可靠的办法就是成对地记,像记一对双胞胎单词。\n\n想象一间闷热的会议室。如果你走过去亲手把窗户推开,这个动作就是 `窓を開ける`。如果你只是注意到有风,顺口说窗户开了,那就是 `窓が開く`。同一扇窗、同一次打开 —— 动词却不同,因为说话人的注意力落在了不同的参与者身上。",
      examples: [
        {
          jp: "窓を開ける",
          reading: "まどをあける",
          en: "to open the window (someone opens it)",
          zh: "打开窗户(有人去开)",
          code: `import type { CommonNoun, IchidanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 窓 = CommonNoun<"窓">;
type 開ける = IchidanVerb & { stem: "開け"; ending: "る" };

// 窓 + を (object) + 開ける (transitive, dictionary form)
type 窓を開ける = \`\${PhraseWithParticle<窓, "を">}\${ConjugateVerb<開ける, "Dictionary">}\`;
`,
        },
        {
          jp: "窓が開く",
          reading: "まどがあく",
          en: "the window opens / the window is open",
          zh: "窗户开了 / 窗户开着",
          code: `import type { CommonNoun, GodanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 窓 = CommonNoun<"窓">;
type 開く = GodanVerb & { stem: "開"; ending: "く" };

// 窓 + が (subject) + 開く (intransitive, dictionary form)
type 窓が開く = \`\${PhraseWithParticle<窓, "が">}\${ConjugateVerb<開く, "Dictionary">}\`;
`,
        },
        {
          jp: "ドアを閉めます",
          reading: "ドアをしめます",
          en: "I will close the door.",
          zh: "我来关门。",
          code: `import type { CommonNoun, IchidanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type ドア = CommonNoun<"ドア">;
type 閉める = IchidanVerb & { stem: "閉め"; ending: "る" };

// ドア + を (object) + 閉め (ます stem) + ます
type ドアを閉めます = \`\${PhraseWithParticle<ドア, "を">}\${ConjugateVerb<閉める, "Masu">}\`;
`,
        },
      ],
    },
    {
      id: "i12-2",
      titleEn: "Particles: を with transitive, が with intransitive",
      titleZh: "助词:他动词用 を,自动词用 が",
      bodyEn:
        "Now for the payoff. You already know `を` marks an object (ch. 5) and `が` marks a subject (ch. 3); what you were missing was a reliable rule for which one a given verb demands. Transitive and intransitive verbs give you exactly that rule — the verb decides the particle.\n\nA transitive verb always points at an object you act on, marked with `を`: `電気を消す` “turn off the light” (you do the turning-off). An intransitive verb has no object at all — the thing that changes is the grammatical subject, marked with `が`: `電気が消える` “the light goes out” (it just goes out). So whenever you reach for a verb in a pair, the particle is not a free choice; it comes attached.\n\nPicture flipping a switch versus a power cut. You acting on the light is `電気を消す`. The light dying on its own is `電気が消える`. Or at a sink: you don't normally say “I water-out” — hot water simply comes, so it is `お湯が出ます`, the water as subject with `が`.\n\nThe classic learner slip is to glue `を` onto an intransitive verb out of habit, saying something like ✗`電気を消える`. That sounds as odd as “I out the light” in English. Train yourself to recall the pair together with its particle: 消す goes with `を`, 消える goes with `が`.",
      bodyZh:
        "现在到了收获的时刻。你已经知道 `を` 标记宾语(第 5 章)、`が` 标记主语(第 3 章);之前缺的,是一条可靠的规则来判断某个动词到底要哪一个。他动词与自动词正好给了你这条规则 —— 动词决定助词。\n\n他动词总是指向你施加动作的宾语,用 `を` 标记:`電気を消す`「关灯」(关这个动作是你做的)。自动词则根本没有宾语 —— 发生变化的事物是语法上的主语,用 `が` 标记:`電気が消える`「灯灭了」(它自己灭了)。所以每当你从一对动词里挑一个用,助词都不是随你选的;它是随动词一起来的。\n\n想象手动按开关和突然停电的区别。你对灯施加动作就是 `電気を消す`。灯自己熄灭就是 `電気が消える`。又比如在水池边:你一般不会说「我把热水出」—— 热水是自己来的,所以是 `お湯が出ます`,水作主语,用 `が`。\n\n初学者最经典的口误,是出于习惯把 `を` 硬塞给自动词,说成 ✗`電気を消える`。这就像英语里说「I out the light」一样别扭。训练自己把词对连同助词一起记:消す 配 `を`,消える 配 `が`。",
      examples: [
        {
          jp: "電気を消す",
          reading: "でんきをけす",
          en: "to turn off the light",
          zh: "关灯",
          code: `import type { CommonNoun, GodanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 電気 = CommonNoun<"電気">;
type 消す = GodanVerb & { stem: "消"; ending: "す" };

// 電気 + を (object) + 消す (transitive)
type 電気を消す = \`\${PhraseWithParticle<電気, "を">}\${ConjugateVerb<消す, "Dictionary">}\`;
`,
        },
        {
          jp: "電気が消える",
          reading: "でんきがきえる",
          en: "the light goes out",
          zh: "灯灭了",
          code: `import type { CommonNoun, IchidanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 電気 = CommonNoun<"電気">;
type 消える = IchidanVerb & { stem: "消え"; ending: "る" };

// 電気 + が (subject) + 消える (intransitive)
type 電気が消える = \`\${PhraseWithParticle<電気, "が">}\${ConjugateVerb<消える, "Dictionary">}\`;
`,
        },
        {
          jp: "お湯が出ます",
          reading: "おゆがでます",
          en: "Hot water comes out.",
          zh: "出热水了。",
          code: `import type { CommonNoun, IchidanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type お湯 = CommonNoun<"お湯">;
type 出る = IchidanVerb & { stem: "出"; ending: "る" };

// お湯 + が (subject) + 出 (ます stem) + ます
type お湯が出ます = \`\${PhraseWithParticle<お湯, "が">}\${ConjugateVerb<出る, "Masu">}\`;
`,
        },
      ],
    },
    {
      id: "i12-3",
      titleEn: "〜てある: a state someone set up (transitive)",
      titleZh: "〜てある:有人特意造成的状态(他动词)",
      bodyEn:
        "In chapter 11 `〜ている` let you describe a resulting state — “the door is open”. But that form is silent about intention: it can't tell a guest “I opened the window for you on purpose”. To express a state that exists because someone deliberately arranged it, Japanese hooks `ある` (the existence verb from ch. 3) onto the て-form (ch. 10) of a transitive verb.\n\nSo `窓が開けてある` means “the window has been opened — and left that way on purpose, for a reason”. The transitive verb 開ける carries the idea that a person did it; tacking on `ある` says that the done-ness still lingers. The agent is offstage but firmly implied: somebody set this up.\n\nNotice the object usually takes `が`, not `を`, in this pattern. That feels surprising after the last point, but it makes sense: with `〜てある` the spotlight is on the resulting state of the thing, so the thing behaves like a subject. The flavor is strongly one of preparation — “it's already been taken care of”.\n\nPicture readying a room before guests arrive. You glance around and confirm `電気が消してあります` “the light's been turned off (as planned)” and the tickets are laid out on the table. Saying it with `〜てある` reassures the listener that these things didn't just happen — you handled them in advance.",
      bodyZh:
        "在第 11 章,`〜ている` 让你能描述结果状态 ——「门开着」。但那个形式对「有没有意图」保持沉默:它没法对客人说「我是特意为你把窗户打开的」。要表达某个状态之所以存在,是因为有人有意安排好的,日语就把 `ある`(第 3 章学过的存在动词)接在他动词的て形(第 10 章)之后。\n\n于是 `窓が開けてある` 意为「窗户被打开了 —— 而且是有意留成这样、有缘由的」。他动词 開ける 本身带有「有人做了它」的含义;再加上 `ある`,就表示这个「做完了」的结果还保留着。动作者退到幕后,却被牢牢暗示出来:有人把它安排好了。\n\n注意在这个句型里,宾语通常用 `が` 而不是 `を`。在上一节之后这会让人有点意外,但其实说得通:用 `〜てある` 时,焦点落在事物的结果状态上,所以事物表现得像主语。整句的味道是强烈的「事先准备好」——「这事已经办妥了」。\n\n想象客人到来前在收拾房间。你环视一圈,确认 `電気が消してあります`「灯(按计划)关好了」,票也摆在桌上了。用 `〜てある` 这么一说,就让对方明白这些不是碰巧发生的 —— 是你提前打理好的。",
      examples: [
        {
          jp: "窓が開けてある",
          reading: "まどがあけてある",
          en: "The window has been (deliberately) opened.",
          zh: "窗户(被人特意)打开着。",
          code: `import type { CommonNoun, IchidanVerb, GodanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 窓 = CommonNoun<"窓">;
type 開ける = IchidanVerb & { stem: "開け"; ending: "る" };
type ある = GodanVerb & { stem: "あ"; ending: "る" };

// 窓 + が + 開けて (て形) + ある
type 窓が開けてある = \`\${PhraseWithParticle<窓, "が">}\${ConjugateVerb<開ける, "Te">}\${ConjugateVerb<ある, "Dictionary">}\`;
`,
        },
        {
          jp: "電気が消してあります",
          reading: "でんきがけしてあります",
          en: "The light has been turned off (on purpose).",
          zh: "灯(被人特意)关好了。",
          code: `import type { CommonNoun, GodanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 電気 = CommonNoun<"電気">;
type 消す = GodanVerb & { stem: "消"; ending: "す" };
type ある = GodanVerb & { stem: "あ"; ending: "る" };

// 電気 + が + 消して (て形) + あります
type 電気が消してあります = \`\${PhraseWithParticle<電気, "が">}\${ConjugateVerb<消す, "Te">}\${ConjugateVerb<ある, "Masu">}\`;
`,
        },
      ],
    },
    {
      id: "i12-4",
      titleEn: "〜ている: a resulting state (intransitive)",
      titleZh: "〜ている:自然呈现的结果状态(自动词)",
      bodyEn:
        "Now place `〜ている` from chapter 11 onto an intransitive verb, and you get the agent-neutral twin of the pattern you just learned. `窓が開いている` simply means “the window is open”. It reports how things stand after a change, claiming nothing about who or what caused it — maybe the wind, maybe it was never shut. It is the plain observation you make when you walk in and just see an open window.\n\nThe contrast with `〜てある` is the whole lesson of this chapter in miniature. `窓が開けてある` uses the transitive 開ける and quietly says “someone opened it on purpose”. `窓が開いている` uses the intransitive 開く and says only “it's open”, no agent implied. Same English translation, very different message: one hints at a planner, the other just describes the scene.\n\nA quick reminder from chapter 11: `〜ている` has two readings. On an action verb it can mean an action in progress, and on a change-of-state verb it usually means the resulting state. Context settles which — and with these intransitive change verbs (開く, 閉まる) the resulting-state reading is the natural one.\n\nSo picture arriving at a friend's place. You notice `ドアが閉まっています` “the door is closed” and `窓が開いている` “a window's open”, and you simply describe what you see. If instead you wanted to imply your friend had set the room up a certain way for you, you'd reach back for `〜てある`. Choosing between the two is choosing whether to point at a person or just at the world.",
      bodyZh:
        "现在把第 11 章的 `〜ている` 接到自动词上,你就得到了刚学的那个句型的「不带动作者」版孪生兄弟。`窓が開いている` 就只是「窗户开着」。它陈述变化之后事物所处的状态,完全不交代是谁、是什么造成的 —— 也许是风,也许本来就没关。这是你走进房间、单纯看见一扇开着的窗时会说的那种平实观察。\n\n它与 `〜てある` 的对比,正是本章主旨的浓缩。`窓が開けてある` 用他动词 開ける,悄悄说出「有人特意开的」。`窓が開いている` 用自动词 開く,只说「它开着」,不暗示任何动作者。中文译文可以一样,传递的信息却大不相同:一个暗示有人在安排,一个只是描述眼前的景象。\n\n顺便复习第 11 章:`〜ている` 有两种读法。接在动作动词上可表示动作进行中,接在变化动词上通常表示结果状态。具体哪一种由上下文决定 —— 而对这些表变化的自动词(開く、閉まる)来说,结果状态那一种才是自然的读法。\n\n想象你到朋友家。你注意到 `ドアが閉まっています`「门关着」、`窓が開いている`「有扇窗开着」,只是如实描述所见。要是你想暗示朋友为你把房间布置成了某个样子,那就该回头用 `〜てある` 了。在这两者之间做选择,就是在选择:是指向某个人,还是只指向这个世界本身。",
      examples: [
        {
          jp: "窓が開いている",
          reading: "まどがあいている",
          en: "The window is open.",
          zh: "窗户开着。",
          code: `import type { CommonNoun, GodanVerb, IchidanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 窓 = CommonNoun<"窓">;
type 開く = GodanVerb & { stem: "開"; ending: "く" };
type いる = IchidanVerb & { stem: "い"; ending: "る" };

// 窓 + が + 開いて (て形) + いる
type 窓が開いている = \`\${PhraseWithParticle<窓, "が">}\${ConjugateVerb<開く, "Te">}\${ConjugateVerb<いる, "Dictionary">}\`;
`,
        },
        {
          jp: "ドアが閉まっています",
          reading: "ドアがしまっています",
          en: "The door is closed.",
          zh: "门关着。",
          code: `import type { CommonNoun, GodanVerb, IchidanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type ドア = CommonNoun<"ドア">;
type 閉まる = GodanVerb & { stem: "閉ま"; ending: "る" };
type いる = IchidanVerb & { stem: "い"; ending: "る" };

// ドア + が + 閉まって (て形) + います
type ドアが閉まっています = \`\${PhraseWithParticle<ドア, "が">}\${ConjugateVerb<閉まる, "Te">}\${ConjugateVerb<いる, "Masu">}\`;
`,
        },
      ],
    },
  ],
};

export default chapter;
