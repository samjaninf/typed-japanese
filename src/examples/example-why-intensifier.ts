import type { WhyInterrogative } from "../adverb-types";
import type {
  AdverbPart,
  ContractedPart,
  CopulaPart,
  IntensifierPart,
  JoinPhrasePartsValue,
  ParticlePart,
  VerbPart,
  WhyIntensifierPatternWithEmphasis,
} from "../phrase-types";
import type { IchidanVerb } from "../verb-types";

// Define the verb 慣れる (to get used to)
type 慣れる = IchidanVerb & { stem: "慣れ"; ending: "る" };

// Define example components
type なんで = WhyInterrogative & "なんで";
type そんなに = "そんなに";

// Type representation for "なんでそんなに慣れてんだよ"
// (Why are you so used to it?!)
type WhyIntensifierSentence = WhyIntensifierPatternWithEmphasis<
  なんで,
  そんなに,
  慣れる,
  "よ"
>;
const whyIntensifierSentence: WhyIntensifierSentence["value"] =
  "なんでそんなに慣れてんだよ";

// Constructing the same phrase piece by piece
type SentenceParts = [
  AdverbPart<"なんで">,
  IntensifierPart<"そんなに">,
  VerbPart<慣れる, "Te">,
  ContractedPart<"ん">,
  CopulaPart<"Plain">,
  ParticlePart<"よ">
];

type TestJoinedSentence = JoinPhrasePartsValue<SentenceParts>;
const joinedSentence: TestJoinedSentence = "なんでそんなに慣れてんだよ";

// Demonstrate usage in console
console.log("Sentence: なんでそんなに慣れてんだよ");
console.log("Grammar breakdown:");
console.log("- なんで: why (interrogative adverb)");
console.log("- そんなに: that much, so (intensifier)");
console.log("- 慣れて: 慣れる (to get used to) in te-form");
console.log("- ん: contracted form of の (nominalizer)");
console.log("- だ: copula");
console.log("- よ: emphasis particle");
