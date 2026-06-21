import type { Chapter } from "../types";

const chapter: Chapter = {
  id: "i05",
  level: "intermediate",
  order: 5,
  titleEn: "Humble & polite 謙譲語・丁寧語",
  titleZh: "谦让语与郑重语",
  summaryEn:
    "Picture yourself at a job interview, or a waiter promising to bring your dish right away: in ch.24 you learned to raise the other person with 尊敬語 (`お〜になる`, 召し上がる), but you still had no way to lower your OWN actions, and no copula more formal than plain `です`. Japanese keigo is a seesaw — you elevate them AND humble yourself — so this chapter adds the missing half: 謙譲語 (humble language) via the productive `お〜する` pattern plus a set of special humble verbs, and 丁寧語 via `でございます`, the extra-polished `です` of shops and announcements.",
  summaryZh:
    "想象你正在面试,或是一名服务员承诺马上把菜端来:第24章你学过用 尊敬語(`お〜になる`、召し上がる)来抬高对方,但你还没有办法贬低自己的动作,也没有比普通的 `です` 更正式的系动词。日语的敬语是一座跷跷板——既抬高对方,又放低自己——本章便补上缺失的另一半:用高产的 `お〜する` 句型加一组特殊谦让动词构成的 谦让语(謙譲語),以及在商店和广播中常听的、比 `です` 更精致的 丁寧語 `でございます`。",
  points: [
    {
      id: "i05-1",
      titleEn: "お〜する — the humble pattern",
      titleZh: "お〜する ——谦让句型",
      bodyEn:
        "In ch.24 you raised the other person with `お + [ます-stem] + になる` — their action becomes lofty. But when YOU are the one acting, you can't elevate yourself; that would be rude. What you need is the mirror image: a frame that takes your own action and bows it low as a service offered upward.\n\nThat frame is `お + [ます-stem] + する`. The shape deliberately echoes the respectful pattern — same `お`, same ます-stem you already know from ch.5 — but ends in humble `する` instead of `になる`, pointing the action back at yourself. So 持つ → 持ち → `お持ちします` literally frames \"my carrying\" as a humble service: \"I'll carry it (for you).\"\n\nThe `する` part conjugates like any する verb, so the everyday polite ending is simply `します`. Picture a hotel bellhop reaching for your suitcase: `お持ちします`. A clerk seeing you to the door: `お送りします`. You waiting on a client: `お待ちします`.\n\nOne guardrail: only use this when the action actually touches or benefits the listener. You wouldn't say `お寝します` for sleeping at home — there's no one to defer to. And verbs that already own a special humble form (next point) don't take this frame.",
      bodyZh:
        "第24章里,你用 `お + [ます形词干] + になる` 抬高对方——对方的动作被「举高」。但当动作的主体是「你」时,你不能抬高自己,那样反而失礼。你需要的是它的镜像:一个把自己的动作放低、当作向上奉献之服务的框架。\n\n这个框架就是 `お + [ます形词干] + する`。它的形状刻意呼应尊敬句型——同样的 `お`、同样是你在第5章学过的 ます形词干——只是把结尾的 `になる` 换成谦恭的 `する`,从而把动作指回自己。于是 持つ → 持ち → `お持ちします` 字面上把「我来拿」框成一种谦卑的服务:「我来(替您)拿」。\n\n其中的 `する` 像任何 する 动词一样变化,所以日常礼貌结尾就是 `します`。设想酒店行李员伸手去接你的行李箱:`お持ちします`;店员送你到门口:`お送りします`;你在等候客户:`お待ちします`。\n\n一条护栏:只在动作确实触及或惠及对方时使用。你不会用 `お寝します` 来说在家睡觉——那里并没有要恭敬的对象。此外,已有专用谦让形的动词(见下一节)不套用此框架。",
      examples: [
        {
          jp: "お持ちします",
          reading: "おもちします",
          en: "I'll carry it (for you).",
          zh: "我来(替您)拿。",
          code: `import type { GodanVerb, IrregularVerb, ConjugateVerb } from "typed-japanese";

type 持つ = GodanVerb & { stem: "持"; ending: "つ" };
type する = IrregularVerb & { dictionary: "する" };

// お + 持ち (ます形) + し (する の連用形) + ます
type お持ちします = \`お\${ConjugateVerb<持つ, "MasuStem">}\${ConjugateVerb<する, "Masu">}\`;
`,
        },
        {
          jp: "私がお送りします",
          reading: "わたしがおおくりします",
          en: "I'll see you off / send it.",
          zh: "由我来送(您/它)。",
          code: `import type { Pronoun, PhraseWithParticle, GodanVerb, IrregularVerb, ConjugateVerb } from "typed-japanese";

type 私 = Pronoun<"私">;
type 送る = GodanVerb & { stem: "送"; ending: "る" };
type する = IrregularVerb & { dictionary: "する" };

// 私 + が + お + 送り (ます形) + し (する の連用形) + ます
type 私がお送りします = \`\${PhraseWithParticle<私, "が">}お\${ConjugateVerb<送る, "MasuStem">}\${ConjugateVerb<する, "Masu">}\`;
`,
        },
        {
          jp: "ここでお待ちします",
          reading: "ここでおまちします",
          en: "I'll wait here.",
          zh: "我在这里等候。",
          code: `import type { Pronoun, PhraseWithParticle, GodanVerb, IrregularVerb, ConjugateVerb } from "typed-japanese";

type ここ = Pronoun<"ここ">;
type 待つ = GodanVerb & { stem: "待"; ending: "つ" };
type する = IrregularVerb & { dictionary: "する" };

// ここ + で + お + 待ち (ます形) + し (する の連用形) + ます
type ここでお待ちします = \`\${PhraseWithParticle<ここ, "で">}お\${ConjugateVerb<待つ, "MasuStem">}\${ConjugateVerb<する, "Masu">}\`;
`,
        },
      ],
    },
    {
      id: "i05-2",
      titleEn: "Special humble verbs",
      titleZh: "特殊谦让动词",
      bodyEn:
        "Just as 尊敬語 had irregulars (いらっしゃる, 召し上がる) that refused the `お〜になる` frame, the most frequent verbs have their own irreplaceable humble forms instead of `お〜する`. These are exactly the verbs you reach for first when meeting someone, so they're worth burning into memory as set pairs.\n\nLearn four: 言う → 申す for naming yourself, 行く and 来る → 参る for coming and going, もらう/食べる/飲む → いただく for receiving and consuming (you've met `いただきます` before a meal — same verb), and する → いたす for doing.\n\nMechanically they behave like ordinary Group I verbs, so you just add ます to the stem: `申します`, `参ります`, `いただきます`, `いたします`. No special rules to recall once you know the base word.\n\nThe scenario that makes these click is the interview. You walk in and say `田中と申します` — \"my name is Tanaka,\" humbly. Asked to handle a task, you answer `私がいたします` — \"I'll do it.\" Phoning a client, you promise `すぐ参ります` — \"I'll come right away.\" Each one quietly lowers you and, by the seesaw, lifts them.",
      bodyZh:
        "正如 尊敬語 也有拒绝 `お〜になる` 框架的特殊形(いらっしゃる、召し上がる),最高频的几个动词也有自己专属、不可替换的谦让形,而非套用 `お〜する`。这些恰恰是你初次见面时最先要用的动词,值得作为固定对照牢记。\n\n记住四组:言う → 申す 用于自报姓名;行く 与 来る → 参る 用于来与去;もらう/食べる/飲む → いただく 用于接受与饮食(你在饭前说的 `いただきます` 正是此词);する → いたす 用于「做」。\n\n变位上它们就像普通的一类动词,只需把 ます 接到词干后:`申します`、`参ります`、`いただきます`、`いたします`。只要记住原词,就无需另背规则。\n\n让这些瞬间生效的场景是面试。你走进去说 `田中と申します`——谦恭地「我叫田中」;被请去处理某事,你答 `私がいたします`——「由我来做」;给客户打电话,你承诺 `すぐ参ります`——「我马上就来」。每一句都悄悄放低自己,借跷跷板抬高对方。",
      examples: [
        {
          jp: "田中と申します",
          reading: "たなかともうします",
          en: "My name is Tanaka.",
          zh: "我叫田中。",
          code: `import type { ProperNoun, PhraseWithParticle, GodanVerb, ConjugateVerb } from "typed-japanese";

type 田中 = ProperNoun<"田中">;
type 申す = GodanVerb & { stem: "申"; ending: "す" };

// 田中 + と + 申し (ます形) + ます
type 田中と申します = \`\${PhraseWithParticle<田中, "と">}\${ConjugateVerb<申す, "Masu">}\`;
`,
        },
        {
          jp: "すぐ参ります",
          reading: "すぐまいります",
          en: "I'll come right away.",
          zh: "我马上就来。",
          code: `import type { Adverb, GodanVerb, ConjugateVerb } from "typed-japanese";

type すぐ = Adverb<"すぐ">;
type 参る = GodanVerb & { stem: "参"; ending: "る" };

// すぐ + 参り (ます形) + ます
type すぐ参ります = \`\${すぐ}\${ConjugateVerb<参る, "Masu">}\`;
`,
        },
        {
          jp: "私がいたします",
          reading: "わたしがいたします",
          en: "I will do it.",
          zh: "由我来做。",
          code: `import type { Pronoun, PhraseWithParticle, GodanVerb, ConjugateVerb } from "typed-japanese";

type 私 = Pronoun<"私">;
type いたす = GodanVerb & { stem: "いた"; ending: "す" };

// 私 + が + いたし (ます形) + ます
type 私がいたします = \`\${PhraseWithParticle<私, "が">}\${ConjugateVerb<いたす, "Masu">}\`;
`,
        },
      ],
    },
    {
      id: "i05-3",
      titleEn: "でございます — the extra-polite copula",
      titleZh: "でございます ——超礼貌系动词",
      bodyEn:
        "You've leaned on the copula `です` since ch.1 to say \"A is B,\" and it already feels polite. But step into a department store or listen to a station announcement and `です` can sound too plain for the occasion — service speech wants an extra layer of polish. That layer is `でございます`.\n\nIt is the most courteous form of `です`, built from the humble/polite verb ござる, and it slots in at the exact spot where `です` would: `Noun でございます`. So `こちらは受付でございます` is just \"This is the reception desk,\" said with maximum decorum — the same sentence frame you already know, only dressed up.\n\nThe natural home for it is anywhere staff address customers. A hotel front desk announcing where things are: `レストランは2階でございます`. A shop sign or recorded message: `営業中でございます`, \"we're open.\"\n\nOne distinction worth keeping straight: `でございます` is 丁寧語, not 尊敬語. It doesn't raise your listener the way `お〜になる` does — it has no particular subject to honor — it simply lifts the overall tone of the utterance. Use it to sound formal and refined, not to single anyone out for deference.",
      bodyZh:
        "从第1章起你就用系动词 `です` 来说「A 是 B」,它本身已经够礼貌。但走进百货公司、或听车站广播时,`です` 在那种场合会显得太朴素——服务用语想要再添一层精致。这层精致就是 `でございます`。\n\n它是 `です` 最郑重的形式,由谦恭动词 ござる 构成,位置与 `です` 完全相同:`名词 でございます`。所以 `こちらは受付でございます` 不过是极有礼地说「这里是接待处」——句型你早已熟悉,只是盛装打扮了一番。\n\n它的天然归宿,是任何店员面向顾客之处。酒店前台告知方位:`レストランは2階でございます`;店招或录音提示:`営業中でございます`,「正在营业」。\n\n一处值得分清的区别:`でございます` 属于 丁寧語,而非 尊敬語。它不像 `お〜になる` 那样抬高对方——它没有特定要敬重的主语——只是整体提升话语的格调。用它来显得正式而文雅,而非专门向某人致敬。",
      examples: [
        {
          jp: "こちらは受付でございます",
          reading: "こちらはうけつけでございます",
          en: "This is the reception desk.",
          zh: "这里是接待处。",
          code: `import type { CommonNoun, Pronoun, PhraseWithParticle } from "typed-japanese";

type こちら = Pronoun<"こちら">;
type 受付 = CommonNoun<"受付">;

// こちら + は + 受付 + でございます
type こちらは受付でございます = \`\${PhraseWithParticle<こちら, "は">}\${受付}でございます\`;
`,
        },
        {
          jp: "営業中でございます",
          reading: "えいぎょうちゅうでございます",
          en: "We are open (for business).",
          zh: "正在营业中。",
          code: `import type { CommonNoun } from "typed-japanese";

type 営業中 = CommonNoun<"営業中">;

// 営業中 + でございます
type 営業中でございます = \`\${営業中}でございます\`;
`,
        },
      ],
    },
  ],
};

export default chapter;
