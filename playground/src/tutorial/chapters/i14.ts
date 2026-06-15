import type { Chapter } from "../types";

const chapter: Chapter = {
  id: "i14",
  level: "intermediate",
  order: 14,
  titleEn: "Connectives",
  titleZh: "连接词",
  summaryEn:
    "Imagine phoning your boss to call in sick. You can already say “I have a fever” and “I'll rest today” as two separate facts — but you can't yet glue them into one argument: “Because I have a fever, I'll rest.” So far you've only joined clauses loosely, sequencing actions with the て-form or tossing in a でも. This chapter hands you the real logical connectors: `から` and `ので` for reasons (“because”), `が` and `けど` for contrast (“but, although”), and `し` for stacking up supporting reasons (“and what's more”). Each clips onto the end of a clause, so the only trick is choosing plain or polite before it.",
  summaryZh:
    "想象你打电话向上司请病假。你已经会说「我发烧了」和「我今天休息」这两个独立的事实——但还没法把它们拼成一个有逻辑的句子:「因为发烧,所以我休息。」到目前为止,你只能松散地把分句拼在一起:用 て形把动作排成顺序,或丢一个 でも 进去。本章给你真正的逻辑连接器:表示原因的 `から` 与 `ので`(「因为」)、表示转折的 `が` 与 `けど`(「但是、虽然」),以及用来叠加理由的 `し`(「而且、再加上」)。它们都夹在分句末尾,所以唯一的诀窍就是在它前面选简体还是礼貌体。",
  points: [
    {
      id: "i14-1",
      titleEn: "から / ので — giving a reason",
      titleZh: "から / ので ——陈述原因",
      bodyEn:
        "You met `から` back in chapter 4 meaning “from” (a starting point in `〜から〜まで`), and the “after” sense of `〜てから` in chapter 10. Here `から` grows up into a full logical “because”. Until now you could lay two facts side by side, but you had no clean way to say one BECAUSE of the other. Both `から` and `ので` fix that, attaching to the reason clause: `[reason] から/ので、[result]`.\n\nThe two differ in tone, and that difference is the whole reason Japanese keeps both. `から` is direct and subjective — it announces the speaker's own grounds, almost “the way I see it” — so it's the natural choice for personal reasons, excuses, and commands. `ので` is softer and more objective; it frames the reason as a natural, almost inevitable cause, which is why it lands as more polite. When you phone in sick, `熱があるので休みます` (“since I have a fever, I'll rest”) sounds humble and reasonable, whereas `熱があるから休みます` sounds blunter, like you've already decided.\n\nMind the connection. `から` attaches to either plain or polite predicates (`高いから`, `行きますから`). `ので` prefers the plain form on verbs and i-adjectives (`忙しいので`), but after a noun or na-adjective it grabs a `な` and becomes `なので` (`雨なので`) — that `な` is the same linking shape you'll recognize from na-adjectives before a noun.\n\nA tiny pitfall: don't pile on `ので` when you're making a demand. “Move, because you're in the way!” wants the punchy `から`; the gentle `ので` would feel oddly mismatched with a harsh order.",
      bodyZh:
        "你在第 4 章见过 `から` 表示「从」(`〜から〜まで` 里的起点),第 10 章又见过 `〜てから` 表示「……之后」。这里的 `から` 长大成了完整的逻辑「因为」。在此之前,你只能把两个事实并排摆着,却没有干净的办法说出一个是另一个的原因。`から` 和 `ので` 都解决了这个问题,它们接在原因分句后:`[原因] から/ので、[结果]`。\n\n两者在语气上有别,而正是这个差别让日语保留了它们两个。`から` 直接、主观——它宣布说话人自己的理由,几乎是「在我看来」——所以最适合个人原因、辩解和命令。`ので` 较委婉、客观;它把原因呈现为一种自然、近乎必然的因果,因而显得更礼貌。请病假时,`熱があるので休みます`(「因为发烧,所以休息」)听上去谦和有理;而 `熱があるから休みます` 则更生硬,像是你早已自己拍板。\n\n注意接续。`から` 可接简体或礼貌体谓语(`高いから`、`行きますから`)。`ので` 在动词和形容词后多用简体(`忙しいので`),但接名词或形容动词时会带上一个 `な`,变成 `なので`(`雨なので`)——这个 `な` 正是你熟悉的形容动词修饰名词时的连接形。\n\n一个小陷阱:在提要求时别硬塞 `ので`。「让开,你挡路了!」要用利落的 `から`;温吞的 `ので` 配上严厉的命令会显得别扭。",
      examples: [
        {
          jp: "高いから買いません",
          reading: "たかいからかいません",
          en: "I won't buy it because it's expensive.",
          zh: "因为太贵了,我不买。",
          code: `import type { IAdjective, ConjugateAdjective, PhraseWithParticle, GodanVerb, ConjugateVerb } from "typed-japanese";

type 高い = IAdjective & { stem: "高"; ending: "い" };
type 買う = GodanVerb & { stem: "買"; ending: "う" };

// 高い (基本形) + から (reason) + 買い (ます形) + ません
type 高いから買いません = \`\${PhraseWithParticle<ConjugateAdjective<高い, "基本形">, "から">}\${ConjugateVerb<買う, "ます形">}ません\`;
`,
        },
        {
          jp: "忙しいので行きません",
          reading: "いそがしいのでいきません",
          en: "I won't go because I'm busy.",
          zh: "因为很忙,我不去。",
          code: `import type { IAdjective, ConjugateAdjective, GodanVerb, ConjugateVerb } from "typed-japanese";

type 忙しい = IAdjective & { stem: "忙し"; ending: "い" };
type 行く = GodanVerb & { stem: "行"; ending: "く" };

// 忙しい (基本形) + ので (reason) + 行き (ます形) + ません
type 忙しいので行きません = \`\${ConjugateAdjective<忙しい, "基本形">}ので\${ConjugateVerb<行く, "ます形">}ません\`;
`,
        },
        {
          jp: "雨なので休みます",
          reading: "あめなのでやすみます",
          en: "I'll take a rest because it's raining.",
          zh: "因为下雨,我休息。",
          code: `import type { ProperNoun, GodanVerb, ConjugateVerb } from "typed-japanese";

type 雨 = ProperNoun<"雨">;
type 休む = GodanVerb & { stem: "休"; ending: "む" };

// 雨 + なので (noun + ので) + 休み (ます形) + ます
type 雨なので休みます = \`\${雨}なので\${ConjugateVerb<休む, "ます形">}ます\`;
`,
        },
      ],
    },
    {
      id: "i14-2",
      titleEn: "が / けど — but, although",
      titleZh: "が / けど ——但是、虽然",
      bodyEn:
        "You learned でも as a casual “but” to set facts against each other. Now you need contrast that lives INSIDE a sentence — joining two clauses into one breath of “A, but B”. Picture a shop clerk recommending a bag you like: it's gorgeous, yet the price makes you wince. You want to concede both halves in one sentence rather than two clipped statements. That's what `が` and `けど` do: `[clause A] が/けど、[clause B]`.\n\nThe split between them is register. `が` feels formal and a touch written, and it usually rides on the polite form (`高いですが`). `けど` — along with its tidier sibling `けれど` — is the conversational one, happy after either plain or polite forms (`高いけど`). Reach for `が` in a careful email to a client; reach for `けど` chatting with a friend.\n\nThere's a second, softer job both do: a non-committal lead-in. “It's a little pricey, but…” trailing off, leaving your hesitation for the listener to fill in. Declining politely often relies on exactly this — `いいですけど、ちょっと高いですね`, “it's nice, but a bit expensive, isn't it,” lets you say no without ever saying no.\n\nOne thing to keep straight: this clause-linking `が` is NOT the subject-marking particle `が` from earlier chapters. The giveaway is position — the connective `が` sits at the very end of a whole clause, not snug behind a single noun.",
      bodyZh:
        "你学过 でも,把它当作随口一句的「但是」,用来让两个事实彼此对照。现在你需要一种活在句子内部的转折——把两个分句连成一口气的「A,但是 B」。想象店员向你推荐一只你喜欢的包:款式很美,可价格让你皱眉。你想在一句话里把两半都让出来,而不是说成两句干巴巴的话。这正是 `が` 和 `けど` 的用途:`[分句 A] が/けど、[分句 B]`。\n\n两者之分在于语体。`が` 显得正式、略偏书面,通常搭礼貌体(`高いですが`)。`けど`——连同更整齐的 `けれど`——是口语的那个,简体、礼貌体都乐意接(`高いけど`)。给客户写郑重的邮件时用 `が`;跟朋友闲聊时用 `けど`。\n\n两者还有第二个、更柔和的用法:作不把话说满的开场白。「有点贵,不过……」就此打住,把你的犹豫留给对方去体会。委婉地拒绝往往正靠这一手——`いいですけど、ちょっと高いですね`(「挺好的,不过有点贵呢」)让你不必明说「不」就把「不」表达了出来。\n\n有一点要分清:这个连接分句的 `が`,不是前面学过的作主语标记的助词 `が`。判别的关键是位置——连接用的 `が` 位于整个分句的末尾,而不是紧贴在某个名词后面。",
      examples: [
        {
          jp: "高いですが買います",
          reading: "たかいですがかいます",
          en: "It's expensive, but I'll buy it.",
          zh: "虽然贵,但我还是买。",
          code: `import type { IAdjective, ConjugateAdjective, PhraseWithParticle, GodanVerb, ConjugateVerb } from "typed-japanese";

type 高い = IAdjective & { stem: "高"; ending: "い" };
type 買う = GodanVerb & { stem: "買"; ending: "う" };

// 高いです (丁寧形) + が (contrast) + 買い (ます形) + ます
type 高いですが買います = \`\${PhraseWithParticle<ConjugateAdjective<高い, "丁寧形">, "が">}\${ConjugateVerb<買う, "ます形">}ます\`;
`,
        },
        {
          jp: "安いけど買いません",
          reading: "やすいけどかいません",
          en: "It's cheap, but I won't buy it.",
          zh: "虽然便宜,但我不买。",
          code: `import type { IAdjective, ConjugateAdjective, GodanVerb, ConjugateVerb } from "typed-japanese";

type 安い = IAdjective & { stem: "安"; ending: "い" };
type 買う = GodanVerb & { stem: "買"; ending: "う" };

// 安い (基本形) + けど (contrast) + 買い (ます形) + ません
type 安いけど買いません = \`\${ConjugateAdjective<安い, "基本形">}けど\${ConjugateVerb<買う, "ます形">}ません\`;
`,
        },
        {
          jp: "行きますが遅れます",
          reading: "いきますがおくれます",
          en: "I'll go, but I'll be late.",
          zh: "我会去,不过会迟到。",
          code: `import type { GodanVerb, ConjugateVerb, IchidanVerb } from "typed-japanese";

type 行く = GodanVerb & { stem: "行"; ending: "く" };
type 遅れる = IchidanVerb & { stem: "遅れ"; ending: "る" };

// 行き (ます形) + ますが (polite + contrast) + 遅れ (ます形) + ます
type 行きますが遅れます = \`\${ConjugateVerb<行く, "ます形">}ますが\${ConjugateVerb<遅れる, "ます形">}ます\`;
`,
        },
      ],
    },
    {
      id: "i14-3",
      titleEn: "〜し — and what's more",
      titleZh: "〜し ——而且、再加上",
      bodyEn:
        "`から` gave you one reason; but when you want to talk someone into a place, one reason rarely closes the deal. You want to pile them on: it's cheap, AND the food's great too, AND it's close to the station. The て-form could merely chain facts in sequence; `し` does something sharper — it stacks reasons that all push toward the same conclusion. The pattern is `[A] し、[B] し、…`, with a built-in “not only… but also…” flavour.\n\nThe key intuition is that `し` is not a neutral “and”. Each `し` clause is offered as a CONTRIBUTING reason. Recommending a ramen shop to a friend, `安いし、おいしいし、行こうよ` (“it's cheap, it's tasty, so let's go”) lets every plus add weight to the verdict — even when you leave the verdict unspoken, the listener feels it coming.\n\nFor the connection, `し` attaches to the plain form of verbs and i-adjectives (`安いし`), and after a noun or na-adjective you slip in `だ` first (`便利だし`, `雨だし`). You don't have to keep all clauses casual to the end: it's perfectly normal to list a quality with `し` and then round off with a polite predicate, as in `安いし便利です`.\n\nA handy move: a single lone `し` clause can stand by itself to hint that more reasons exist. `今日はちょっと…。疲れてるし` — “Not today… I'm tired, for one thing (and there are others)” — softly declines while implying you'd rather not spell everything out.",
      bodyZh:
        "`から` 给了你一个理由;但当你想说服别人去某个地方时,光一个理由往往不够。你想把理由堆起来:又便宜,而且菜又好吃,而且离车站还近。て形只能把事实排成顺序;`し` 做的更进一步——它叠加的是一组共同指向同一结论的理由。句型是 `[A] し、[B] し、……`,自带「不仅……而且……」的味道。\n\n关键的语感是:`し` 不是中性的「和」。每个 `し` 分句都是作为一条「助攻」的理由提出来的。向朋友推荐一家拉面店,`安いし、おいしいし、行こうよ`(「又便宜又好吃,去吧」)让每一个优点都为结论加码——哪怕你把结论留着不说,对方也能感到它呼之欲出。\n\n接续方面,`し` 接动词和形容词的简体(`安いし`),接名词或形容动词时先加 `だ`(`便利だし`、`雨だし`)。你不必把所有分句都用简体收尾:先用 `し` 列出一项性质,再以礼貌体谓语作结,是完全自然的,如 `安いし便利です`。\n\n一个好用的招数:单独一个 `し` 分句也能独立成句,暗示「还有别的理由」。`今日はちょっと…。疲れてるし`(「今天不太方便……再说我也累了(还有别的)」)既委婉地推辞,又暗示你不想把话都挑明。",
      examples: [
        {
          jp: "安いし便利です",
          reading: "やすいしべんりです",
          en: "It's cheap, and convenient too.",
          zh: "又便宜,而且方便。",
          code: `import type { IAdjective, NaAdjective, ConjugateAdjective } from "typed-japanese";

type 安い = IAdjective & { stem: "安"; ending: "い" };
type 便利 = NaAdjective & { stem: "便利" };

// 安い (基本形) + し + 便利です (na-adj 丁寧形)
type 安いし便利です = \`\${ConjugateAdjective<安い, "基本形">}し\${ConjugateAdjective<便利, "丁寧形">}\`;
`,
        },
        {
          jp: "雨だし寒いです",
          reading: "あめだしさむいです",
          en: "It's raining, and it's cold too.",
          zh: "又下雨,而且又冷。",
          code: `import type { ProperNoun, IAdjective, ConjugateAdjective, ConjugateCopula } from "typed-japanese";

type 雨 = ProperNoun<"雨">;
type 寒い = IAdjective & { stem: "寒"; ending: "い" };

// 雨 + だし (noun + し) + 寒いです (丁寧形)
type 雨だし寒いです = \`\${ConjugateCopula<雨, "断定形">}し\${ConjugateAdjective<寒い, "丁寧形">}\`;
`,
        },
      ],
    },
  ],
};

export default chapter;
