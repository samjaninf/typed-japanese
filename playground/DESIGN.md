# Design System — Washi & Sumi (和紙・墨) 🌸

> Category: Education · Developer Tools
>
> A cherry-blossom design language for Typed Japanese. Warm washi paper, near-black
> sumi ink, and a single muted dusty-rose sakura accent. The same system dresses
> both the tutorial playground (this repo) and the typedgrammar.com landing page, so
> the two read as one product.

This document is the source of truth. The canonical token implementation lives in
[`src/theme.css`](./src/theme.css) (CSS custom properties, light under `:root`, dark
under `:root[data-theme="dark"]`); the landing page mirrors the same values in its
own `globals.css`. Authored against the [Open Design](https://github.com/nexu-io/open-design)
9-section schema.

## 1. Color

The palette is built from three ideas: **washi** (paper) for surfaces, **sumi** (ink)
for text, and **sakura** (cherry blossom) as the one accent. Sakura is a quiet, dusty
rose — not a saturated hot pink — so the app feels editorial rather than cheap.

| Role | Token | Light | Dark |
| --- | --- | --- | --- |
| Page | `--paper` | `#faf7f4` | `#16121a` |
| Card surface | `--surface` | `#fffdfb` | `#1f1a22` |
| Subtle fill | `--surface-2` | `#f7eef0` | `#2a232d` |
| Hairline | `--border` / `--border-strong` | `#efe2e6` / `#e3cdd5` | `#322a35` / `#45394a` |
| Text | `--ink-900` → `--ink-300` | `#211b1f` → `#ab9fa4` | `#f3ebee` → `#7c6f76` |
| Accent | `--sakura-500` | `#c95b7a` | `#ef93b1` |
| Accent deep / link | `--sakura-600` | `#a8456a` | `#f4a8c0` |
| On-accent text | `--on-accent` | `#ffffff` | `#211b1f` |
| Success / error | `--ok` / `--err` | `#1a8f63` / `#c4485a` | `#4cc08c` / `#f0788a` |

The sakura ramp (`--sakura-50` … `--sakura-600`) **inverts** between modes: in light, 50
is the faintest wash and 600 the deepest link; in dark, 50 becomes the deepest fill and
600 the brightest petal, with 500 staying the accent in both. This keeps semantic usage
(`background: --sakura-100`, `color: --sakura-600`) correct without per-component dark rules.

Grammar-category accents (`--cat-*`, used by the composition tree) keep their distinct hues
but ship a lightened/desaturated dark variant so they stay legible on sumi.

**Always reference tokens, never raw hex.** Text-on-accent uses `--on-accent` (it flips to
dark ink in dark mode, where the accent is a light petal). Soft status backgrounds use
`--ok-soft` / `--err-soft`, not literal tints.

## 2. Typography

- **UI** — `--font-ui`: system-ui stack. Tight, functional.
- **Japanese** — `--font-jp`: Hiragino Kaku Gothic ProN / Yu Gothic / Noto Sans JP. Applied
  automatically via `:lang(ja)` and `.jp`; example sentences render larger (1.3rem+).
- **Mono** — `--font-mono`: SF Mono / JetBrains Mono. Inline code (`.tj-code`) and the editor.

Weights: body 400, labels/UI 600–700, titles 800. Section labels are 0.72rem, uppercase,
`letter-spacing: 0.04em`, `--ink-500`. Body line-height 1.7 for prose.

## 3. Spacing

A soft 4px rhythm (gaps of 6/8/10/12/16/20px). Cards pad 12–20px; page gutters 20px; max
content width 1280px. Prose columns cap at ~72ch for readability.

## 4. Layout

- App shell: centered column, 1280px max, 20px gutter (`.app`).
- Tutorial: sticky 268px sidebar + fluid content; collapses to one column < 900px.
- Analyzer: two equal panes (editor | tree), 520px min height.
- The analyzer opens in a right-side drawer (`min(760px, 94vw)`) over a `--scrim`.

## 5. Components

Shared primitives live as `.tj-*` utilities in `theme.css`, so every tab looks related:

- `.tj-card` — surface + hairline + `--shadow-sm`, `--radius` (14px).
- `.tj-btn` / `.tj-btn--primary` — pill buttons; primary fills `--sakura-500` with `--on-accent`.
- `.tj-chip` — rounded tag, `--surface-2` fill, `--sakura-600` text.
- `.tj-input` / `.tj-select` — focus shows `--sakura-400` border + a 3px `--ring` halo.
- `.tj-label`, `.tj-subtle`, `.tj-result`, `.tj-code`.

Active/selected states fill `--sakura-500` (language toggle, tabs, filters, chips). Radii:
14px cards, 9px controls, 999px pills.

## 6. Motion

Restrained and short. Color/border transitions 0.12–0.2s ease. Drawer slides in 0.26s
`cubic-bezier(0.4,0,0.2,1)`. The landing page adds a slow, low-opacity falling-petal motif
(`fall` + `sway`, ~12–18s) behind the hero — ambient, never distracting. No bouncing,
no spin. Respect `prefers-reduced-motion` for decorative animation.

## 7. Voice

Calm, precise, encouraging — a good programming tutorial, not a textbook. Bilingual EN /
简体中文 at equal depth. Concepts are motivated before mechanics. Avoid hype; let the type
checker make the claims.

## 8. Brand

The mark is the sakura blossom (🌸). The wordmark "Typed Japanese" / "TypedGrammar" uses a
sakura-600 → sakura-400 gradient on the title. The throughline: *grammar you can verify* —
every sentence is a type the compiler reads.

## 9. Anti-patterns

- ❌ Saturated hot pink (the old `#f5447a`) — reads cheap. Sakura is dusty, not neon.
- ❌ Raw hex / `rgba()` in component CSS — breaks dark mode. Use tokens.
- ❌ White text hardcoded on accents — use `--on-accent`.
- ❌ Indigo/purple anywhere — that was the old, off-brand landing palette.
- ❌ Heavy drop shadows or glows — keep elevation soft (`--shadow-sm` / `--shadow-md`).
- ❌ Theme set after mount (causes a flash) — resolve `data-theme` before first paint.
