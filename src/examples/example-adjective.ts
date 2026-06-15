import type { PhraseWithParticle } from "../phrase-types";
import type { ConjugateAdjective, IAdjective } from "../adjective-types";

// This file tests the irregular adjective いい (good) and its conjugations

// Define the adjective
type いい例 = IAdjective & {
  dictionary: "いい";
  stem: "い";
  ending: "い";
  irregular: true;
};

// Test all conjugation forms
type いいBasic = "いい" | "よい"; // Accept both forms
type いいPast = ConjugateAdjective<いい例, "Past">; // よかった
type いいPolite = ConjugateAdjective<いい例, "Polite">; // いいです
type いいNegative = ConjugateAdjective<いい例, "Negative">; // よくない

// Verify with particles
type いいよ = PhraseWithParticle<"いい", "よ">; // いいよ
type よかったね = PhraseWithParticle<いいPast, "ね">; // よかったね

// Type checking
// These should work
const verifyBasic: いいBasic = "よい";
const verifyPast: いいPast = "よかった";
const verifyNegative: いいNegative = "よくない";
const verifyPolite: いいPolite = "いいです";

// These should now produce type errors because they have wrong forms
// @ts-expect-error - Wrong form
const wrongBasic: いいBasic = "はい";
// @ts-expect-error - Should be よかった
const wrongPast: いいPast = "いかった";
// @ts-expect-error - Should be よくない
const wrongNegative: いいNegative = "いくない";

// Print results
console.log("Testing いい adjective conjugations:");
console.log(`Basic form: ${verifyBasic}`);
console.log(`Past form: ${verifyPast}`);
console.log(`Negative form: ${verifyNegative}`);
console.log(`Polite form: ${verifyPolite}`);

// Test with particles
const verifyWithParticle1: いいよ = "いいよ";
const verifyWithParticle2: よかったね = "よかったね";

console.log(`With particle: ${verifyWithParticle1}`);
console.log(`Past with particle: ${verifyWithParticle2}`);
