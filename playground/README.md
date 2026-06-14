# 🌸 Typed Japanese Playground

An interactive, visual playground for the
[Typed Japanese](../README.md) type-level grammar library.

It turns the library's TypeScript types into something you can *play with*:

| Tab | What it does |
| --- | --- |
| **⌨️ Type Playground** | A real in-browser TypeScript editor (Monaco) with the library's `.d.ts` files loaded. Write `ConjugateVerb<話す, "て形">` and **hover** to watch the compiler resolve it to `"話して"`. Live diagnostics included. |
| **🎴 Verb Lab** | Pick or build any godan / ichidan / irregular verb and see the full 12-form conjugation table — plus the exact TypeScript type that produces it. |
| **🌈 Adjective Lab** | The same for i- and na-adjectives, including the irregular `いい → よかった`. |
| **🧩 Phrase Builder** | Compose a sentence from typed *parts* (nouns, conjugated verbs, particles, punctuation…) and watch them assemble, with a structural breakdown. |
| **🖼️ Sentence Gallery** | Showcase sentences (Frieren, Himmel, …) with interactive, token-by-token grammar breakdowns. |

The conjugation tables are powered by a runtime engine
(`src/data/conjugation.ts`) that is a **faithful 1:1 mirror** of the type-level
logic in [`../src/verb-types.d.ts`](../src/verb-types.d.ts) and
[`../src/adjective-types.d.ts`](../src/adjective-types.d.ts). The Type Playground
tab, by contrast, runs the *actual* type system in your browser.

## Development

```bash
pnpm install      # from this playground/ directory
pnpm dev          # start Vite dev server
pnpm build        # type-check + production build to dist/
pnpm preview      # preview the production build
pnpm typecheck    # tsc --noEmit
```

> The Vite config allows importing the sibling `../src/*.d.ts` files as raw text
> so Monaco can load them — keep the playground inside the repo next to `src/`.

## Tech

Vite · React 18 · TypeScript (strict) · `@monaco-editor/react` · CSS Modules.
No runtime dependency on the library itself — it consumes the type definitions
directly.
