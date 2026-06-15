import type {
  ConjugateVerb,
  GodanVerb,
  IchidanVerb,
  IrregularVerb,
} from "../verb-types";

// Example Godan verbs (五段動詞)
type 話す = GodanVerb & { stem: "話"; ending: "す" };
type 書く = GodanVerb & { stem: "書"; ending: "く" };
type 遊ぶ = GodanVerb & { stem: "遊"; ending: "ぶ" };
type 読む = GodanVerb & { stem: "読"; ending: "む" };
type 死ぬ = GodanVerb & { stem: "死"; ending: "ぬ" };
type 買う = GodanVerb & { stem: "買"; ending: "う" };
type 待つ = GodanVerb & { stem: "待"; ending: "つ" };
type 泳ぐ = GodanVerb & { stem: "泳"; ending: "ぐ" };
type 走る = GodanVerb & { stem: "走"; ending: "る" };

// Example Ichidan verbs (一段動詞)
type 食べる = IchidanVerb & { stem: "食べ"; ending: "る" };
type 見る = IchidanVerb & { stem: "見"; ending: "る" };
type 着る = IchidanVerb & { stem: "着"; ending: "る" };
type 寝る = IchidanVerb & { stem: "寝"; ending: "る" };
type 起きる = IchidanVerb & { stem: "起き"; ending: "る" };

// Example Irregular verbs (不規則動詞)
type する = IrregularVerb & { dictionary: "する" };
type 来る = IrregularVerb & { dictionary: "来る" };
type くる = IrregularVerb & { dictionary: "くる" };

// Examples of conjugation for Godan verbs
// 話す (to speak)
type 話すDictionary = ConjugateVerb<話す, "Dictionary">; // 話す
type 話すMasu = ConjugateVerb<話す, "Masu">; // 話し
type 話すTe = ConjugateVerb<話す, "Te">; // 話して
type 話すTa = ConjugateVerb<話す, "Ta">; // 話した
type 話すNai = ConjugateVerb<話す, "Nai">; // 話さ
type 話すPotential = ConjugateVerb<話す, "Potential">; // 話せ
type 話すImperative = ConjugateVerb<話す, "Imperative">; // 話せ

// 買う (to buy)
type 買うMasu = ConjugateVerb<買う, "Masu">; // 買い
type 買うTe = ConjugateVerb<買う, "Te">; // 買って
type 買うTa = ConjugateVerb<買う, "Ta">; // 買った
type 買うVolitional = ConjugateVerb<買う, "Volitional">; // 買お
// Examples of conjugation for Ichidan verbs
// 食べる (to eat)
type 食べるDictionary = ConjugateVerb<食べる, "Dictionary">; // 食べる
type 食べるMasu = ConjugateVerb<食べる, "Masu">; // 食べ
type 食べるTe = ConjugateVerb<食べる, "Te">; // 食べて
type 食べるTa = ConjugateVerb<食べる, "Ta">; // 食べた
type 食べるNai = ConjugateVerb<食べる, "Nai">; // 食べ
type 食べるPotential = ConjugateVerb<食べる, "Potential">; // 食べられ
type 食べるImperative = ConjugateVerb<食べる, "Imperative">; // 食べろ

// Examples of conjugation for Irregular verbs
// する (to do)
type するDictionary = ConjugateVerb<する, "Dictionary">; // する
type するMasu = ConjugateVerb<する, "Masu">; // し
type するTe = ConjugateVerb<する, "Te">; // して
type するTa = ConjugateVerb<する, "Ta">; // した
type するNai = ConjugateVerb<する, "Nai">; // し
type するPotential = ConjugateVerb<する, "Potential">; // でき
type するImperative = ConjugateVerb<する, "Imperative">; // しろ

// 来る (to come)
type 来るMasu = ConjugateVerb<来る, "Masu">; // 来
type 来るTe = ConjugateVerb<来る, "Te">; // 来て
type 来るImperative = ConjugateVerb<来る, "Imperative">; // 来い

// Type checking
// These should work
const verifyHanasu: 話すMasu = "話し";
const verifyTaberu: 食べるTe = "食べて";
const verifySuru: するImperative = "しろ";

// @ts-expect-error
const wrongHanasu: 話すMasu = "話す"; // Type error: '話す' is not assignable to type '話し'
// @ts-expect-error
const wrongTaberu: 食べるTe = "食べた"; // Type error: '食べた' is not assignable to type '食べて'
// @ts-expect-error
const wrongSuru: するImperative = "する"; // Type error: 'する' is not assignable to type 'しろ'
