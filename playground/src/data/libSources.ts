/**
 * Raw text of the Typed Japanese library's .d.ts files, imported as strings so
 * the Type Playground can register them as Monaco extra-libs. This is what lets
 * the in-browser TypeScript service actually resolve types like
 * `ConjugateVerb<話す, "て形">` to their string literal results on hover.
 *
 * We rewrite the relative imports (`./verb-types`) to a virtual module path so
 * Monaco resolves them against the files we add.
 */
import verbTypes from "../../../src/verb-types.d.ts?raw";
import adjectiveTypes from "../../../src/adjective-types.d.ts?raw";
import adverbTypes from "../../../src/adverb-types.d.ts?raw";
import nounTypes from "../../../src/noun-types.d.ts?raw";
import phraseTypes from "../../../src/phrase-types.d.ts?raw";

const ROOT = "file:///node_modules/typed-japanese";

export interface LibFile {
  /** Virtual URI Monaco uses to resolve the module. */
  path: string;
  contents: string;
}

export const LIB_FILES: ReadonlyArray<LibFile> = [
  { path: `${ROOT}/verb-types.d.ts`, contents: verbTypes },
  { path: `${ROOT}/adjective-types.d.ts`, contents: adjectiveTypes },
  { path: `${ROOT}/adverb-types.d.ts`, contents: adverbTypes },
  { path: `${ROOT}/noun-types.d.ts`, contents: nounTypes },
  { path: `${ROOT}/phrase-types.d.ts`, contents: phraseTypes },
  {
    // Barrel that re-exports everything, importable as "typed-japanese".
    path: `${ROOT}/index.d.ts`,
    contents: [
      'export * from "./verb-types";',
      'export * from "./adjective-types";',
      'export * from "./adverb-types";',
      'export * from "./noun-types";',
      'export * from "./phrase-types";',
    ].join("\n"),
  },
];

/** The import path users write in the playground editor. */
export const LIB_IMPORT = "typed-japanese";
