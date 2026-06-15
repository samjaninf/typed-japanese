import type { Chapter } from "../types";

const chapter: Chapter = {
  id: "e03",
  level: "elementary",
  order: 3,
  titleEn: "Existence: あります / います, location に",
  titleZh: "存在句：あります／います，场所に",
  summaryEn:
    "Picture yourself in an unfamiliar neighborhood, hunting for a restroom, a station, or someone's office. So far you could name things and say whose they are, but not announce that something simply exists somewhere. This chapter gives you the place words `ここ / そこ / あそこ`, the two existence verbs — `あります` for lifeless things and `います` for living ones — and the anchor pattern `Place に Thing があります` for pinning a thing to a spot.",
  summaryZh:
    "想象你身处一个陌生的街区，急着找洗手间、车站，或某个人的办公室。到目前为止你能给事物命名、说出它属于谁，却还无法说出「某处有某物」这件最基本的事。本章会给你场所词 `ここ / そこ / あそこ`，两个表示存在的动词 ——「无生命的东西用 `あります`，有生命的用 `います`」—— 以及把事物「钉」在某地的句型「场所 に 事物 があります」。",
  points: [
    {
      id: "e03-1",
      titleEn: "ここ / そこ / あそこ — here, there, over there",
      titleZh: "ここ / そこ / あそこ ——这里、那里、那边",
      bodyEn:
        "In chapter 2 you met the これ・それ・あれ family — this one / that one / that one over there — sorted by distance from the speaker and listener. Place words run on exactly the same machinery, just pointing at locations instead of objects: `ここ` is here (the speaker's spot), `そこ` is there (the listener's spot), and `あそこ` is over there (far from you both). If you already feel the ko-so-a rhythm, you already know these.\n\nWhy a third tier instead of a plain here/there split? Japanese cares about whose space something sits in. `そこ` isn't just \"not here\" — it's specifically near the person you're talking to, which is why it feels rude to use それ/そこ for something in your own hand.\n\nThese are nouns, so they take particles exactly like any other noun. Pair one with the topic particle `は` and the copula `です` from chapter 1, and you get the everyday \"orientation\" sentence `ここ は Noun です` — \"this place is …\".\n\nSay a visitor asks where the library is and you can point to the building you're standing in front of: `ここは図書館です`, \"this place is a library.\" Or you nod toward a building down the street and say `あそこは駅です`, \"over there is the station.\" One small word does all the pointing.",
      bodyZh:
        "第二章里你认识了 これ・それ・あれ 这一组 ——「这个／那个／那个（更远的）」—— 按照「离说话人、听话人的远近」来区分。场所词用的是完全相同的机制，只是指向「地点」而非「物体」：`ここ` 是「这里」(说话人所在处)，`そこ` 是「那里」(听话人所在处)，`あそこ` 是「那边」(离双方都远)。只要你已经熟悉了 ko-so-a 的节奏，这三个词其实早就会了。\n\n为什么要分三档，而不是简单的「这里／那里」两分？因为日语很在意东西落在「谁的空间」里。`そこ` 不只是「不在这里」——它特指「靠近你正在交谈的那个人」，所以拿着自己手里的东西却用 それ／そこ 去指，会显得有点失礼。\n\n这些词都是名词，因此和别的名词一样能接助词。把它和第一章的提示助词 `は`、判断词 `です` 搭起来，就得到了日常的「定位句」「ここ は 名词 です」——「这里是……」。\n\n比如有访客问图书馆在哪，你正好站在那栋楼前，就能指着说：`ここは図書館です`，「这里是图书馆。」或者朝街那头一栋楼点点头：`あそこは駅です`，「那边是车站。」一个小小的词，就把「指」这件事全办了。",
      examples: [
        {
          jp: "ここは図書館です",
          reading: "ここはとしょかんです",
          en: "This place is a library.",
          zh: "这里是图书馆。",
          code: `import type { ProperNoun, PhraseWithParticle, ConjugateCopula } from "typed-japanese";

type ここ = ProperNoun<"ここ">;
type 図書館 = ProperNoun<"図書館">;

// ここ + は (topic) + 図書館 + です
type ここは図書館です = \`\${PhraseWithParticle<ここ, "は">}\${ConjugateCopula<図書館, "Polite">}\`;
`,
        },
        {
          jp: "あそこは駅です",
          reading: "あそこはえきです",
          en: "Over there is the station.",
          zh: "那边是车站。",
          code: `import type { ProperNoun, PhraseWithParticle, ConjugateCopula } from "typed-japanese";

type あそこ = ProperNoun<"あそこ">;
type 駅 = ProperNoun<"駅">;

type あそこは駅です = \`\${PhraseWithParticle<あそこ, "は">}\${ConjugateCopula<駅, "Polite">}\`;
`,
        },
      ],
    },
    {
      id: "e03-2",
      titleEn: "あります (things) / います (people & animals)",
      titleZh: "あります(物)/ います(人和动物)",
      bodyEn:
        "Your です sentences from chapter 1 can identify something — \"this is a book\", \"that is a cat\". But they can't yet announce that the book or the cat is simply present: \"there is a book\", \"there's a cat around\". For that, Japanese reaches for a verb of existence.\n\nHere's the twist that surprises every beginner: Japanese has two such verbs, and which one you pick depends on whether the thing can move on its own. `あります` is for inanimate things — books, buildings, money, an umbrella by the door. `います` is for animate beings — people and animals, anything with its own will to wander off. The intuition is that Japanese quietly tracks life and agency in its grammar, so \"a thing sits there\" and \"a creature is hanging around\" feel like genuinely different statements.\n\nThe thing that exists gets marked with the subject particle `が` — your first new particle since `は` and the linking `の`. Use `が` to spotlight the thing whose existence you're reporting: `Noun があります` / `Noun がいます`. Both verbs already appear in the polite ます-form, the same courteous register as `です`.\n\nSo glance at a shelf and report `本があります`, \"there is a book.\" Notice a pet wandering in and say `猫がいます`, \"there is a cat\" — animate, so `います`. Spot someone in the room and it's `学生がいます`, \"there is a student.\" Pick the wrong verb (saying あります for the cat) and you'll be understood, but you'll have quietly demoted a living creature to furniture.",
      bodyZh:
        "第一章的 です 句能给东西「下定义」——「这是书」「那是猫」。但它还说不出书或猫只是「在那儿」这件事:「有一本书」「有只猫在附近」。要表达这层意思，日语要请出「存在动词」。\n\n这里有个让每个初学者都吃一惊的转折:日语有「两个」存在动词，选哪一个取决于那东西能不能自己移动。`あります` 用于无生命的事物 —— 书、建筑、钱、门边的一把伞。`います` 用于有生命的存在 —— 人和动物，任何有自己意志、会自己跑掉的东西。背后的直觉是:日语在语法里悄悄地追踪「生命与能动性」，所以「一个东西摆在那里」和「一只生物在那儿晃」对它来说是两种本质不同的陈述。\n\n存在的那个事物要用主语助词 `が` 标记 —— 这是继 `は` 和表示连接的 `の` 之后你遇到的第一个新助词。用 `が` 把你要报告其「存在」的那个东西聚焦出来:「名词 があります」/「名词 がいます」。两个动词在这里都已经是礼貌的 ます 形，和 `です` 同属一种客气的语体。\n\n于是，瞥一眼书架就能说 `本があります`，「有一本书。」看到宠物溜进来就说 `猫がいます`，「有只猫」—— 有生命，所以用 `います`。发现房间里有人，就是 `学生がいます`，「有一名学生。」要是选错了动词(给猫用了 あります)，对方虽然听得懂，但你已经悄悄把一只活物降格成了家具。",
      examples: [
        {
          jp: "本があります",
          reading: "ほんがあります",
          en: "There is a book.",
          zh: "有一本书。",
          code: `import type { ProperNoun, GodanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 本 = ProperNoun<"本">;
// ある is a godan verb (stem あ, ending る); ます形 → あり, then + ます
type ある = GodanVerb & { stem: "あ"; ending: "る" };

type 本があります = \`\${PhraseWithParticle<本, "が">}\${ConjugateVerb<ある, "Masu">}ます\`;
`,
        },
        {
          jp: "猫がいます",
          reading: "ねこがいます",
          en: "There is a cat.",
          zh: "有一只猫。",
          code: `import type { ProperNoun, IchidanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 猫 = ProperNoun<"猫">;
// いる is an ichidan verb (stem い, ending る); ます形 → い, then + ます
type いる = IchidanVerb & { stem: "い"; ending: "る" };

type 猫がいます = \`\${PhraseWithParticle<猫, "が">}\${ConjugateVerb<いる, "Masu">}ます\`;
`,
        },
        {
          jp: "学生がいます",
          reading: "がくせいがいます",
          en: "There is a student.",
          zh: "有一名学生。",
          code: `import type { ProperNoun, IchidanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 学生 = ProperNoun<"学生">;
type いる = IchidanVerb & { stem: "い"; ending: "る" };

type 学生がいます = \`\${PhraseWithParticle<学生, "が">}\${ConjugateVerb<いる, "Masu">}ます\`;
`,
        },
      ],
    },
    {
      id: "e03-3",
      titleEn: "Place に Thing があります — “At PLACE there is THING”",
      titleZh: "场所 に 事物 があります ——「某地有某物」",
      bodyEn:
        "You can now say that something exists and you can name places. The last step is to fuse them: not just \"there's a book\" but \"there's a book here\", not just \"there's a cat\" but \"there's a cat on the desk\". This is where the location particle `に` earns its keep.\n\nThe order matters and it's wonderfully logical. Name the place first, tag it with `に` to mean \"at / in\", then deliver the thing with `が` and the existence verb: `Place に Thing があります / がいます`. Think of `に` as dropping an anchor — it marks the fixed point in space, and everything that follows tells you what sits at that anchor. Japanese builds the sentence the way you'd scan a scene: location, then contents.\n\nThis is the workhorse pattern for the scenarios you'll actually face. Standing at a counter, you can ask a clerk whether a restroom exists right where you're pointing. Giving directions, you nod down the street and say `あそこに駅があります`, \"there is a station over there.\" Hand someone a book and explain `ここに本があります`, \"there is a book here.\"\n\nThe place slot is happy to hold a compound location too. Remember the linking `の` from chapter 2? 机の上 literally stitches \"desk\" + の + \"top\" into \"the top of the desk\", and it drops straight into the `に` slot: `机の上に猫がいます`, \"there is a cat on the desk\" — animate cat, so `います` again. The pattern never changes; only the place and the verb's animacy do.",
      bodyZh:
        "现在你既能说「某物存在」，又能给「场所」命名。最后一步就是把两者合体:不只是「有一本书」，而是「这里有一本书」;不只是「有只猫」，而是「桌子上有只猫」。这正是场所助词 `に` 大显身手的地方。\n\n语序很关键，而且妙在合乎逻辑。先说场所，用 `に` 标记它表示「在……(里／上)」，再用 `が` 引出事物和存在动词:「场所 に 事物 があります / がいます」。可以把 `に` 想成「抛下一只锚」—— 它标定空间中那个固定的点，后面的一切都在告诉你「这个锚点上有什么」。日语造句的顺序，正像你扫视一个场景的顺序:先看地点，再看内容。\n\n这是你真正会遇到的场景里最常用的主力句型。站在柜台前，你可以问店员你指的地方有没有洗手间。给人指路时，朝街那头一点头就说 `あそこに駅があります`，「那边有一个车站。」把书递给别人时解释 `ここに本があります`，「这里有一本书。」\n\n场所那一格也乐意装下「复合场所」。还记得第二章表示连接的 `の` 吗? 机の上 字面上就是把「桌子」+ の +「上面」缝成「桌子的上面」，它能直接塞进 `に` 那一格:`机の上に猫がいます`，「桌子上有一只猫」—— 猫是活物，所以又用 `います`。句型本身从不改变，变的只是场所，以及动词随生命性而定的选择。",
      examples: [
        {
          jp: "ここに本があります",
          reading: "ここにほんがあります",
          en: "There is a book here.",
          zh: "这里有一本书。",
          code: `import type { ProperNoun, GodanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type ここ = ProperNoun<"ここ">;
type 本 = ProperNoun<"本">;
type ある = GodanVerb & { stem: "あ"; ending: "る" };

// ここ + に (place) + 本 + が + あり + ます
type ここに本があります = \`\${PhraseWithParticle<ここ, "に">}\${PhraseWithParticle<本, "が">}\${ConjugateVerb<ある, "Masu">}ます\`;
`,
        },
        {
          jp: "机の上に猫がいます",
          reading: "つくえのうえにねこがいます",
          en: "There is a cat on the desk.",
          zh: "桌子上有一只猫。",
          code: `import type { ProperNoun, IchidanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 机の上 = ProperNoun<"机の上">;
type 猫 = ProperNoun<"猫">;
type いる = IchidanVerb & { stem: "い"; ending: "る" };

// 机の上 + に + 猫 + が + い + ます
type 机の上に猫がいます = \`\${PhraseWithParticle<机の上, "に">}\${PhraseWithParticle<猫, "が">}\${ConjugateVerb<いる, "Masu">}ます\`;
`,
        },
        {
          jp: "あそこに駅があります",
          reading: "あそこにえきがあります",
          en: "There is a station over there.",
          zh: "那边有一个车站。",
          code: `import type { ProperNoun, GodanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type あそこ = ProperNoun<"あそこ">;
type 駅 = ProperNoun<"駅">;
type ある = GodanVerb & { stem: "あ"; ending: "る" };

type あそこに駅があります = \`\${PhraseWithParticle<あそこ, "に">}\${PhraseWithParticle<駅, "が">}\${ConjugateVerb<ある, "Masu">}ます\`;
`,
        },
      ],
    },
  ],
};

export default chapter;
