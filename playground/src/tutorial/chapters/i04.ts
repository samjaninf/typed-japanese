import type { Chapter } from "../types";

const chapter: Chapter = {
  id: "i04",
  level: "intermediate",
  order: 4,
  titleEn: "Respectful language 尊敬語",
  titleZh: "尊敬语",
  summaryEn:
    "Picture yourself behind a shop counter, speaking to a customer you want to treat with care. With `です`/`ます` you can sound polite, but that only adjusts how you yourself sound — it does not lift the other person up. Respectful language (尊敬語) does exactly that: it elevates the actions of the person you are talking about — a customer, a boss, a teacher. This chapter gives you three tools for it: the productive pattern `お〜になる`, the honorific reuse of the `〜（ら）れる` form you already met as the passive, and a few special replacement verbs such as `いらっしゃる`.",
  summaryZh:
    "想象你站在店铺柜台后,面对一位想要好好对待的客人。用 `です`/`ます` 你能让自己说得客气,但那只是调整你自己的语气,并不能把对方抬起来。尊敬语(尊敬語)正是做这件事:它抬高你所谈论对象的动作 —— 客人、上司、老师。本章给你三种工具:能产的句型 `お〜になる`、你在被动里已经见过的 `〜（ら）れる` 形的尊敬再利用,以及若干特殊替换动词,例如 `いらっしゃる`。",
  points: [
    {
      id: "i04-1",
      titleEn: "お + ます-stem + になる",
      titleZh: "お + ます形词干 + になる",
      bodyEn:
        "Until now your verbs only had two registers: plain (`読む`) and polite (`読みます`). Both describe an action flatly — neither one tells the listener that the doer is someone you respect. When a customer reads your menu or a professor reads your paper, you want a form that wraps their action in dignity. That is what `お〜になる` is for.\n\nThe recipe is mechanical: take `お`, the polite prefix you already know from set words, add the verb's `ます`-stem, then close with `になる`. So `読む` gives the `ます`-stem `読み`, and you build `お読みになる`. Only the `なる` at the very end conjugates, exactly like any other `〜る` verb: `お読みになります`, `お読みになりました`.\n\nWhy `なる` (“to become”)? The intuition is that you are not bluntly stating that the honored person flatly does something; you frame their action as a dignified state they graciously enter into — they “come to read”, almost like an event unfolding around them. That gentle distance is what makes it sound respectful rather than blunt.\n\nPicture a bookshop clerk noticing a regular customer leafing through a novel: `先生は本をお読みになります` lifts the simple act of reading into something worthy of note. The pattern works with most native Godan and Ichidan verbs, but it does not combine with the special verbs in the last section — those have their own replacements, so never say `お行きになる`; use `いらっしゃる` instead.",
      bodyZh:
        "到目前为止,你的动词只有两个语气层次:普通体(`読む`)和礼貌体(`読みます`)。两者都只是平铺直叙地描述动作,谁都没有告诉听者:做这件事的人是你所尊敬的对象。当客人在看你的菜单、教授在读你的论文时,你需要一个能把他们的动作裹上敬意的形式。这正是 `お〜になる` 的用途。\n\n做法很机械:取 `お`(你在固定词语里已熟悉的礼貌前缀),接动词的 `ます` 形词干,再用 `になる` 收尾。于是 `読む` 的 `ます` 形词干是 `読み`,组成 `お読みになる`。只有句末的 `なる` 活用,和任何 `〜る` 动词一样:`お読みになります`、`お読みになりました`。\n\n为什么用 `なる`(「成为」)?其中的直觉是:你不是生硬地陈述受敬者「做」了某事,而是把他们的动作框成一种他们优雅进入的得体状态 —— 仿佛事情是围绕他们自然展开的。正是这份温和的距离感,让句子听起来尊敬而非直白。\n\n想象书店店员注意到一位老顾客正在翻一本小说:`先生は本をお読みになります` 把「读」这个简单动作抬升成值得留意的事。该句型适用于大多数固有的五段、一段动词,但它不能与最后一节的特殊动词搭配 —— 那些词有自己的替换形,所以绝不要说 `お行きになる`,而要用 `いらっしゃる`。",
      examples: [
        {
          jp: "先生は本をお読みになります",
          reading: "せんせいはほんをおよみになります",
          en: "The teacher reads a book. (respectful)",
          zh: "老师在读书。(尊敬)",
          code: `import type { CommonNoun, GodanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 先生 = CommonNoun<"先生">;
type 本 = CommonNoun<"本">;
type 読む = GodanVerb & { stem: "読"; ending: "む" };
type なる = GodanVerb & { stem: "な"; ending: "る" };

// 読む ます形 → "読み";  お + 読み + に + なる(Masu → "なります")
type 先生は本をお読みになります = \`\${PhraseWithParticle<先生, "は">}\${PhraseWithParticle<本, "を">}お\${ConjugateVerb<読む, "MasuStem">}に\${ConjugateVerb<なる, "Masu">}\`;
`,
        },
        {
          jp: "社長はもうお帰りになりました",
          reading: "しゃちょうはもうおかえりになりました",
          en: "The company president has already gone home. (respectful)",
          zh: "社长已经回去了。(尊敬)",
          code: `import type { CommonNoun, GodanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 社長 = CommonNoun<"社長">;
type 帰る = GodanVerb & { stem: "帰"; ending: "る" };
type なる = GodanVerb & { stem: "な"; ending: "る" };

// 帰る ます形 → "帰り";  お + 帰り + に + なる(MasuPast → "なりました")
type 社長はもうお帰りになりました = \`\${PhraseWithParticle<社長, "は">}もうお\${ConjugateVerb<帰る, "MasuStem">}に\${ConjugateVerb<なる, "MasuPast">}\`;
`,
        },
      ],
    },
    {
      id: "i04-2",
      titleEn: "〜（ら）れる as an honorific",
      titleZh: "〜（ら）れる 的尊敬用法",
      bodyEn:
        "You have now seen the `（ら）れる` shape do two very different jobs: it marked the passive in chapter 21 (`書かれる` = “is written”), and it sat inside the causative-passive in chapter 23. Here it picks up a third job — and once you see why, it stops feeling like a coincidence.\n\nThe form is built exactly like the passive. For Godan verbs, take the passive stem and add `れる`: `書く` → `書かれる`, `飲む` → `飲まれる`. For Ichidan verbs it is `〜られる`. Nothing new to memorize; you already know how to make it.\n\nWhy would the passive shape also mean respect? The intuition is the same gentle distancing as before. Just as `お〜になる` treats the action as something that unfolds rather than something baldly done, `〜（ら）れる` frames the honored person's action as happening on its own, beyond your reach to command — you observe it from a respectful remove rather than pinning it directly on them.\n\nThis form is lighter and less formal than `お〜になる`, which is why it is the workhorse of business speech: it attaches to almost any verb without fuss. Imagine asking a visiting professor `先生はいつ書かれましたか` — “When did you write it?” — about a paper they sent. The obvious risk is ambiguity with the passive, but context and the polite `ます` tail resolve it: when the honored person is clearly the subject and there is no “by” agent in sight, it reads as respect, not as something being done to them.",
      bodyZh:
        "到现在,你已经见过 `（ら）れる` 这个形态承担两份截然不同的工作:它在第 21 章标记被动(`書かれる` =「被写」),又在第 23 章嵌进使役被动里。这里它接下第三份工作 —— 而一旦你明白其中道理,这就不再像是巧合。\n\n它的构成与被动完全一样。五段动词取被动词干加 `れる`:`書く` → `書かれる`、`飲む` → `飲まれる`。一段动词为 `〜られる`。没有新东西要背,你早就会做了。\n\n为什么被动形也能表尊敬?直觉和前面一样,是同一种温和的拉开距离。正如 `お〜になる` 把动作当作自然展开而非生硬地「做」,`〜（ら）れる` 把受敬者的动作框成自行发生、超出你所能差遣的范围 —— 你是从一段尊敬的距离去观察它,而不是直接把它按在对方头上。\n\n这个形式比 `お〜になる` 更轻、更不正式,因此是商务用语的主力:它几乎能毫无负担地接在任何动词后面。想象你问一位来访的教授 `先生はいつ書かれましたか` ——「您是什么时候写的?」—— 谈的是他寄来的论文。显而易见的风险是与被动混淆,但语境和句末的礼貌 `ます` 会化解:当受敬者明显是主语、且看不到表示「被…」的施事时,它就读作尊敬,而非某事「被」施加在他身上。",
      examples: [
        {
          jp: "部長は新聞を読まれます",
          reading: "ぶちょうはしんぶんをよまれます",
          en: "The department head reads the newspaper. (respectful)",
          zh: "部长在看报纸。(尊敬)",
          code: `import type { CommonNoun, GodanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 部長 = CommonNoun<"部長">;
type 新聞 = CommonNoun<"新聞">;
type 読む = GodanVerb & { stem: "読"; ending: "む" };

// 読む 受身形 → "読ま";  読ま + れます
type 部長は新聞を読まれます = \`\${PhraseWithParticle<部長, "は">}\${PhraseWithParticle<新聞, "を">}\${ConjugateVerb<読む, "Passive">}れます\`;
`,
        },
        {
          jp: "先生はいつ書かれましたか",
          reading: "せんせいはいつかかれましたか",
          en: "When did the teacher write it? (respectful)",
          zh: "老师是什么时候写的?(尊敬)",
          code: `import type { CommonNoun, GodanVerb, ConjugateVerb, PhraseWithParticle } from "typed-japanese";

type 先生 = CommonNoun<"先生">;
type 書く = GodanVerb & { stem: "書"; ending: "く" };

// 書く 受身形 → "書か";  書か + れましたか
type 先生はいつ書かれましたか = \`\${PhraseWithParticle<先生, "は">}いつ\${ConjugateVerb<書く, "Passive">}れましたか\`;
`,
        },
      ],
    },
    {
      id: "i04-3",
      titleEn: "Special respectful verbs: いらっしゃる",
      titleZh: "特殊尊敬动词:いらっしゃる",
      bodyEn:
        "Patterns like `お〜になる` and `〜（ら）れる` cover most verbs, but the handful of verbs you say constantly — be, come, go, eat, say, do — get their own dedicated respectful words instead. This is the same instinct any language has: the most frequent things wear down into special forms rather than following the general rule.\n\nThe one to learn first is `いらっしゃる`, a single verb that covers `いる` (to be/exist), `来る` (to come) and `行く` (to go) all at once. Its polite form is mildly irregular — the expected `いらっしゃります` shortens to `いらっしゃいます`. So at a reception desk, greeting a client who has just arrived, `先生は教室にいらっしゃいます` can mean the teacher is here, is coming, or is on the way, depending on context.\n\nA few more pairs earn their keep: `言う` → `おっしゃる` (`おっしゃいます`), `する` → `なさる` (`なさいます`), and `食べる`/`飲む` → `召し上がる` (`召し上がります`). Notice that `おっしゃる`, `なさる` and `いらっしゃる` all share that same `〜います` softening in the polite form, so once you have the rhythm of one you have all three.\n\nThese are exactly the verbs a shop clerk reaches for: `何を召し上がりますか` to ask a guest what they will eat, or `社長は何とおっしゃいましたか` to ask respectfully what the president said. The pitfall to avoid is doubling up — since these words are already respectful, you never wrap them in `お〜になる`. Just use the special verb on its own and it carries all the honor it needs.",
      bodyZh:
        "像 `お〜になる`、`〜（ら）れる` 这样的句型能覆盖大多数动词,但那几个你天天挂在嘴边的词 —— 在、来、去、吃、说、做 —— 反而各有专属的尊敬词。这是任何语言都有的本能:用得最频繁的东西会磨成特殊形,而不肯老老实实遵守通则。\n\n最先要学的是 `いらっしゃる`,这一个动词同时覆盖 `いる`(在/存在)、`来る`(来)和 `行く`(去)。它的礼貌形略有不规则 —— 本该是 `いらっしゃります`,缩短成了 `いらっしゃいます`。所以在接待台迎接刚到的客户时,`先生は教室にいらっしゃいます` 可以表示老师在这里、正在来、或在路上,具体看语境。\n\n另有几对也很值当:`言う` → `おっしゃる`(`おっしゃいます`)、`する` → `なさる`(`なさいます`)、`食べる`/`飲む` → `召し上がる`(`召し上がります`)。注意 `おっしゃる`、`なさる`、`いらっしゃる` 在礼貌形里都共用那个 `〜います` 的软化,所以你掌握了一个的节奏,三个就都会了。\n\n这正是店员会随手取用的动词:用 `何を召し上がりますか` 问客人要吃什么,或用 `社長は何とおっしゃいましたか` 恭敬地问社长说了什么。要避开的陷阱是叠加 —— 既然这些词本身已经是尊敬的,就绝不要再用 `お〜になる` 把它们包起来。直接单用这个特殊动词,它已自带它所需要的全部敬意。",
      examples: [
        {
          jp: "先生は教室にいらっしゃいます",
          reading: "せんせいはきょうしつにいらっしゃいます",
          en: "The teacher is in the classroom. (respectful)",
          zh: "老师在教室里。(尊敬)",
          code: `import type { CommonNoun, PhraseWithParticle } from "typed-japanese";

type 先生 = CommonNoun<"先生">;
type 教室 = CommonNoun<"教室">;

// いらっしゃいます is the irregular honorific polite form of いる/来る/行く
type 先生は教室にいらっしゃいます = \`\${PhraseWithParticle<先生, "は">}\${PhraseWithParticle<教室, "に">}いらっしゃいます\`;
`,
        },
        {
          jp: "社長は何とおっしゃいましたか",
          reading: "しゃちょうはなんとおっしゃいましたか",
          en: "What did the president say? (respectful)",
          zh: "社长说了什么?(尊敬)",
          code: `import type { CommonNoun, Pronoun, PhraseWithParticle } from "typed-japanese";

type 社長 = CommonNoun<"社長">;
type 何 = Pronoun<"何">;

// おっしゃいました is the irregular honorific past polite form of 言う
type 社長は何とおっしゃいましたか = \`\${PhraseWithParticle<社長, "は">}\${PhraseWithParticle<何, "と">}おっしゃいましたか\`;
`,
        },
      ],
    },
  ],
};

export default chapter;
