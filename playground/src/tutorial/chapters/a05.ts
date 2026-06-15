import type { Chapter } from "../types";

const chapter: Chapter = {
  id: "a05",
  level: "advanced",
  order: 5,
  titleEn: "Assertion suffixes",
  titleZh: "断定后缀",
  summaryEn:
    "Someone praises your win and you want to wave it off — “oh, it was merely luck” — or you spot a dripping umbrella by the door and conclude “he must be home.” Back in ch.19 you learned to hedge with `でしょう` (“probably”) and in ch.30 to claim an expectation with `はず` (“should be”), but you still had no way to deflate a claim, pin an identity emphatically, or assert near-certainty stronger than `でしょう`. This chapter adds three fixed `に〜ない` suffixes — `〜にすぎない` (merely), `〜にほかならない` (none other than), and `〜にちがいない` (must be) — each of which, intriguingly, reaches its force by negating every alternative rather than asserting directly.",
  summaryZh:
    "有人夸你赢了,你想摆摆手:「不过是运气罢了」;或者你看到门口一把还在滴水的伞,于是断定:「他一定在家」。第 19 章你学会了用 `でしょう`(「大概」)留有余地,第 30 章学会了用 `はず`(「应该」)主张某种预期,但你还没法把一个说法压低、强调地锁定某个身份,或表达比 `でしょう` 更强的近乎确定。本章补上三个固定的 `に〜ない` 后缀——`〜にすぎない`(不过是)、`〜にほかならない`(正是)、`〜にちがいない`(一定是)——有趣的是,它们都是靠否定一切其他可能,而非直接断言,来获得各自的力度。",
  points: [
    {
      id: "a05-1",
      titleEn: "〜にすぎない — merely, nothing more than",
      titleZh: "〜にすぎない ——不过是、仅仅是",
      bodyEn:
        "Picture a colleague congratulating you: your project succeeded brilliantly. You feel it was mostly chance, and you want to push the praise back down to its real size. `でしょう` won't help — that hedges a guess, not the scale of a claim. What you need is a way to say “it is no more than X.”\n\nThat is exactly `〜にすぎない`. The verb `すぎる` means “to exceed,” so its negation `すぎない` means “does not exceed”: whatever comes before is the ceiling, nothing reaches past it. The shape of the form already encodes the meaning — you are literally declaring an upper limit. This is your first taste of the chapter's recurring trick: Japanese arrives at a firm statement by closing off everything beyond it.\n\nIt attaches directly to a bare noun (`子供にすぎない`, “is merely a child”) and to the plain dictionary or `た` form of verbs and i-adjectives (`言い訳にすぎない`). You met plain forms back in ch.13; here they simply slot in front of the suffix unchanged.\n\nSo when that excuse is offered, you cut it down with `それは言い訳にすぎない` — “that's merely an excuse, and nothing weightier.” The whole phrase closes the sentence; in polite speech, add `です` to get `にすぎません`, which is what you'd say modestly deflecting praise in front of a boss.",
      bodyZh:
        "想象一位同事来恭喜你:你的项目大获成功。你心里觉得多半是碰巧,想把这份夸奖压回它真实的大小。`でしょう` 帮不上忙——那是给猜测留余地,而不是给说法的「分量」定级。你需要的是一种说「不超过 X」的方式。\n\n这正是 `〜にすぎない`。动词 `すぎる` 意为「超过」,其否定 `すぎない` 就是「不超过」:前面的内容是上限,什么都越不过去。形式本身已经把意思编码进去了——你字面上是在宣告一个上限。这是本章反复出现的窍门的第一次亮相:日语靠封死之外的一切,来抵达一个坚定的陈述。\n\n它直接接光杆名词(`子供にすぎない`,「不过是个孩子」),也接动词和形容词的简体辞书形或 `た` 形(`言い訳にすぎない`)。简体形你在第 13 章已经见过;在这里它们原封不动地塞在后缀前面即可。\n\n于是当那个借口抛出来时,你用 `それは言い訳にすぎない` 把它削平——「那不过是借口,没有更重的分量」。整个短语收束全句;礼貌体加 `です` 变成 `にすぎません`,这正是你在上司面前谦逊地推掉夸奖时会说的话。",
      examples: [
        {
          jp: "それは言い訳にすぎない",
          reading: "それはいいわけにすぎない",
          en: "That is merely an excuse.",
          zh: "那不过是借口而已。",
          code: `import type { ProperNoun, PhraseWithParticle } from "typed-japanese";

type それ = ProperNoun<"それ">;
type 言い訳 = ProperNoun<"言い訳">;

// それ + は (topic) + 言い訳 + にすぎない
type それは言い訳にすぎない = \`\${PhraseWithParticle<それ, "は">}\${言い訳}にすぎない\`;
`,
        },
        {
          jp: "彼は子供にすぎません",
          reading: "かれはこどもにすぎません",
          en: "He is nothing more than a child.",
          zh: "他不过是个孩子罢了。",
          code: `import type { ProperNoun, PhraseWithParticle } from "typed-japanese";

type 彼 = ProperNoun<"彼">;
type 子供 = ProperNoun<"子供">;

// 彼 + は (topic) + 子供 + にすぎません (polite)
type 彼は子供にすぎません = \`\${PhraseWithParticle<彼, "は">}\${子供}にすぎません\`;
`,
        },
      ],
    },
    {
      id: "a05-2",
      titleEn: "〜にほかならない — none other than, nothing but",
      titleZh: "〜にほかならない ——正是、无非是",
      bodyEn:
        "Now flip the energy. Instead of shrinking a claim, you want to nail it to one identity and slam the door on every other explanation. In a speech you declare: this success was not luck, not connections, not timing — it was hard work, full stop. `はず` (“should be,” ch.30) only voices an expectation; it can't carry that emphatic “and nothing else.”\n\n`〜にほかならない` does. The word `ほか` means “other,” and `ならない` negates it: “there is nothing other than X.” Once again the certainty comes from negation — you don't praise X directly, you eliminate every rival until X is all that's left. That's why it lands so heavily: it sounds like a verdict.\n\nIt usually follows a bare noun, very often in the framing `〜は〜にほかならない`, which reuses the topic-`は` plus predicate frame you've used since ch.6. This shape is perfect for definitions and for revealing the real reason behind something: `成功は努力にほかならない` — “success is nothing but effort.”\n\nThe register is formal and assertive, so you'll meet it in editorials, speeches, and writing far more than in casual chat. Pointing at a piece of evidence in a meeting, you might say `これは証拠にほかなりません` (polite `にほかなりません`) — “this is proof, and it could be nothing else.”",
      bodyZh:
        "现在把劲头反过来。你不是要缩小一个说法,而是要把它钉死在某一个身份上,并对其他一切解释关门。在演讲里你宣告:这次成功不是运气,不是关系,不是时机——就是努力,没别的。`はず`(「应该」,第 30 章)只能道出一种预期,扛不起那句强调的「别无其他」。\n\n`〜にほかならない` 扛得起。`ほか` 意为「其他」,`ならない` 将其否定:「除了 X 没有别的」。确定感再一次来自否定——你不直接夸 X,而是排除每一个对手,直到只剩 X。这正是它落地如此沉重的原因:它听起来像一句定论。\n\n它通常接光杆名词,且常以 `〜は〜にほかならない` 的框架出现,这复用了你从第 6 章起就在用的「主题 `は` + 谓语」结构。这种形式特别适合下定义、揭示事情背后的真正原因:`成功は努力にほかならない`——「成功无非就是努力」。\n\n语体正式而果断,所以你更多会在社论、演讲和书面中遇到它,而非日常闲聊。会议上指着一份证据,你可以说 `これは証拠にほかなりません`(礼貌体 `にほかなりません`)——「这正是证据,绝不会是别的」。",
      examples: [
        {
          jp: "成功は努力にほかならない",
          reading: "せいこうはどりょくにほかならない",
          en: "Success is nothing but effort.",
          zh: "成功无非就是努力。",
          code: `import type { ProperNoun, PhraseWithParticle } from "typed-japanese";

type 成功 = ProperNoun<"成功">;
type 努力 = ProperNoun<"努力">;

// 成功 + は (topic) + 努力 + にほかならない
type 成功は努力にほかならない = \`\${PhraseWithParticle<成功, "は">}\${努力}にほかならない\`;
`,
        },
        {
          jp: "これは証拠にほかなりません",
          reading: "これはしょうこにほかなりません",
          en: "This is none other than proof.",
          zh: "这正是证据,不会是别的。",
          code: `import type { ProperNoun, PhraseWithParticle } from "typed-japanese";

type これ = ProperNoun<"これ">;
type 証拠 = ProperNoun<"証拠">;

// これ + は (topic) + 証拠 + にほかなりません (polite)
type これは証拠にほかなりません = \`\${PhraseWithParticle<これ, "は">}\${証拠}にほかなりません\`;
`,
        },
      ],
    },
    {
      id: "a05-3",
      titleEn: "〜にちがいない — must be, surely",
      titleZh: "〜にちがいない ——一定是、肯定是",
      bodyEn:
        "Here is the deduction you couldn't quite make before. A wet umbrella stands by the genkan; the lights are off but you saw it dripping. You're not guessing loosely — `でしょう` would be too weak — yet you didn't watch him walk in either, so you can't state it as plain fact. You want that sweet spot: “he must be home.”\n\n`〜にちがいない` is that spot. `ちがい` means “a difference, a discrepancy,” and `ない` negates it: “there is no discrepancy — it can be nothing but this.” Same engine as the other two: you reach certainty by ruling out the possibility of being wrong. It sits a notch above `でしょう` in confidence, but it remains your judgement, not eyewitness reporting — which is exactly why it shines in detective reasoning and everyday hunches.\n\nIt attaches to a bare noun (`彼にちがいない`, “it must be him”), to the plain form of verbs (`来るにちがいない`, “he'll surely come”), and to i-adjectives (`高いにちがいない`). The preceding plain forms are the ones from ch.13, dropped in untouched.\n\nSo, surveying the clues, you announce `犯人は彼にちがいない` — “the culprit must be him.” Reassuring a nervous friend about a strange noise outside, you'd reach for the same pattern; and to sound polished or formal, swap in the polite tail `にちがいありません`, as in `あの店は高いにちがいありません` — “that shop must be expensive.”",
      bodyZh:
        "这就是你之前还做不到的那种推断。玄关旁立着一把湿伞;灯没开,但你看见它还在滴水。你不是随口猜测——`でしょう` 太弱了——可你也没亲眼看他走进来,所以无法当成铁板钉钉的事实陈述。你想要那个恰到好处的点:「他一定在家」。\n\n`〜にちがいない` 就是那个点。`ちがい` 意为「差异、出入」,`ない` 将其否定:「没有出入——只能是这个」。引擎和前两个一样:你靠排除「会错」的可能性来抵达确定。它的把握比 `でしょう` 高一档,但仍是你的判断,而非亲眼目睹的报道——这恰恰是它在破案推理和日常直觉中大放异彩的原因。\n\n它接光杆名词(`彼にちがいない`,「一定是他」)、动词简体(`来るにちがいない`,「他肯定会来」),以及形容词(`高いにちがいない`)。前接的简体形正是第 13 章那些,原样放入即可。\n\n于是,审视完线索,你宣布 `犯人は彼にちがいない`——「犯人一定是他」。安抚一位被门外怪声吓到的朋友时,你也会用同一句型;想显得正式或得体,就换上礼貌体词尾 `にちがいありません`,如 `あの店は高いにちがいありません`——「那家店肯定很贵」。",
      examples: [
        {
          jp: "犯人は彼にちがいない",
          reading: "はんにんはかれにちがいない",
          en: "The culprit must be him.",
          zh: "犯人一定是他。",
          code: `import type { ProperNoun, PhraseWithParticle } from "typed-japanese";

type 犯人 = ProperNoun<"犯人">;
type 彼 = ProperNoun<"彼">;

// 犯人 + は (topic) + 彼 + にちがいない
type 犯人は彼にちがいない = \`\${PhraseWithParticle<犯人, "は">}\${彼}にちがいない\`;
`,
        },
        {
          jp: "彼は来るにちがいない",
          reading: "かれはくるにちがいない",
          en: "He will surely come.",
          zh: "他肯定会来。",
          code: `import type { ProperNoun, PhraseWithParticle, IrregularVerb, ConjugateVerb } from "typed-japanese";

type 彼 = ProperNoun<"彼">;
type 来る = IrregularVerb & { dictionary: "来る" };

// 彼 + は (topic) + 来る (辞書形 = 来る) + にちがいない
type 彼は来るにちがいない = \`\${PhraseWithParticle<彼, "は">}\${ConjugateVerb<来る, "Dictionary">}にちがいない\`;
`,
        },
        {
          jp: "あの店は高いにちがいありません",
          reading: "あのみせはたかいにちがいありません",
          en: "That shop must be expensive.",
          zh: "那家店肯定很贵。",
          code: `import type { ProperNoun, PhraseWithParticle, IAdjective, ConjugateAdjective } from "typed-japanese";

type あの店 = ProperNoun<"あの店">;
type 高い = IAdjective & { stem: "高"; ending: "い" };

// あの店 + は (topic) + 高い (基本形) + にちがいありません (polite)
type あの店は高いにちがいありません = \`\${PhraseWithParticle<あの店, "は">}\${ConjugateAdjective<高い, "Basic">}にちがいありません\`;
`,
        },
      ],
    },
  ],
};

export default chapter;
