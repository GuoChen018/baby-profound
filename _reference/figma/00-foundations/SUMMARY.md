# Foundations summary — Profound design system cheat sheet

This is the consolidated token reference for Phase 3 token translation. All values pulled from the Figma frames captured under `_reference/figma/00-foundations/` and additional tokens discovered while parsing component frames under `_reference/figma/01-components/`.

---

## 1. Color tokens (semantic, two-theme)

Source: `00-foundations/color/tokens.md` (Figma `1:9983` "Color"). 19 base tokens, 4 categories.

| Category | Tokens |
|---|---|
| **`bg-*`** (3) — page surfaces | `bg-primary` · `bg-secondary` · `bg-tertiary` |
| **`fill-*`** (6) — ink, dividers, status | `fill-primary` · `fill-secondary` · `fill-tertiary` · `fill-quaternary` · `fill-green` · `fill-red` |
| **`control-*`** (4) — form/button | `control-bg` · `control-hover` · `control-selected` · `control-primary` |
| **`text-*`** (6) | `text-primary` · `text-secondary` · `text-tertiary` · `text-quaternary` · `text-green` · `text-red` |

### Hex values (Light → Dark)

| Token | Light | Dark |
|---|---|---|
| `bg-primary` | `#ffffff` | `#1e1e1e` |
| `bg-secondary` | `#fafafa` | `#252525` |
| `bg-tertiary` | `#f5f5f5` | `#343434` |
| `fill-primary` | `#18181a` | `#ffffff` |
| `fill-secondary` | `#969696` | `#5a5a5a` |
| `fill-tertiary` | `#d4d4d8` | `#464646` |
| `fill-quaternary` | `#e8e8e8` | `#323232` |
| `fill-green` | `#15b462` | `#15b462` |
| `fill-red` | `#ff5f57` | `#ff5f57` |
| `control-bg` | `#ffffff` | `#292929` |
| `control-hover` | `#fafafa` | `#333333` |
| `control-selected` | `#f1f1f1` | `#393939` |
| `control-primary` | `#18181a` | `#18181a` |
| `text-primary` | `#18181a` | `#ffffff` |
| `text-secondary` | `#787878` | `#787878` |
| `text-tertiary` | `#969696` | `#969696` |
| `text-quaternary` | `#b4b4b4` | `#5a5a5a` |
| `text-green` | `#15b462` | `#15b462` |
| `text-red` | `#ff5f57` | `#ff5f57` |

### Also discovered in components (not in the Color frame)

| Token | Hex | Discovered in |
|---|---|---|
| `text-inverse` | `#ffffff` | Inline tooltip, dark surfaces |
| `bg-base` | `#ffffff` (light), `#1e1e1e` (dark) | A "page wrapper" alias — appears identical to `bg-primary` |
| `fill-inverse` | (matches inverse direction) | Used for white icons on dark fills |
| `fill-green-hover` | (a darker green) | Toggle component on hover |

### Badge chromatic palette (21 tokens — 7 colors × 3 ranks)

Source: Badges frame (`01-components/badges/`). Each badge color has a 3-token recipe:

| Color | `<color>-badge/muted-fill` | `<color>-badge/border` | `<color>-badge/emphasis` |
|---|---|---|---|
| `green` | `#e8f7ee` | `#cdedd8` | `#0d6c3a` |
| `blue` | `#eff6ff` | `#e0edff` | `#1b3ea7` |
| `red` | `#fff1f0` | `#ffe0de` | `#bf2c2a` |
| `orange` | `#fff8eb` | `#ffefd0` | `#a25700` |
| `yellow` | `#fffaeb` | `#fef0c7` | `#92722f` |
| `purple` | `#f6f3ff` | `#e9e1ff` | `#5b32cc` |
| `pink` / `gray` (varies) | … | … | … |

(Verify exact hex in `01-components/badges/design-context.md`.)

### Workflow palette (4 tokens, from Workflow Side Nav)

| Token | Hex |
|---|---|
| `workflow-fill-purple` | `#9362F4` |
| `workflow-fill-green` | `#4EA852` |
| `workflow-fill-blue` | `#4894EE` |
| `workflow-fill-orange` | `#EF704A` |

### Chart palette (per-series, observed in tooltips)

`#9747ff` purple · `#ff9811` orange · `#15b462` green · `#4285f4` blue (Google) · `#16b463` (alt green for series 1)

These are series-key colors, not tokens — hard-code as a `chartPalette` array.

### One-off brand colors

- `#009aff` — "Beta" pill text + 10% bg
- macOS Safari chrome colors (Browser frame): `#fafafa` / `#191c1f` / `#0c0f12` etc. — leave hard-coded.

---

## 2. Text styles

Source: `00-foundations/text-styles/tokens.md`. **Inter Variable** for UI; Inter Regular for the 80px display.

### Sizes summary

| Style | Size | Weight | LH | Tracking |
|---|---|---|---|---|
| Display1 | 80 | 400 | 80 | -5.25 |
| Title/Regular(Semibold) | 28 | 400/600 | 32 | -0.25 |
| Title/Small(Semibold) | 24 | 400/600 | 32 | -0.25 |
| Title/Mini(Semibold) | 18 | 400/600 | 24 | 0 |
| Body/Regular(Medium) | 14 | 400/500 | **1.4 ratio** | 0 |
| Body/Small(Medium) | 13 | 400/500 | 16 | 0 |
| Body/Mini(Medium) | 12 | 400/500 | 14 | 0 |
| Body/MicroMedium | 10 | 500 | 14 | 0 |
| Paragraph/Small | 13 | 400 | **1.7 ratio** | 0 |

### Global font features

`'ss03' 1, 'cv08' 1, 'lnum' 1, 'tnum' 1` — apply to `body { font-feature-settings: ... }`.

---

## 3. Radii

| Token | Value | Used in |
|---|---|---|
| `radius-4` | 4px | Avatars, badge inner check, inline tooltip, key hint pill |
| `radius-6` | 6px | Buttons, selects, segmented control, search bar, tooltip (compact) |
| `radius-8` | 8px | Sidebar tabs, section grid envelope, explainer tooltip, promo card |
| `radius-rounded` | 10000px (full pill) | Tags, progress bars, status pills |

(Larger frame radii like `12px` or `16px` exist but only on the design-system frames themselves, not real components — those are container chrome.)

---

## 4. Shadows / elevations

| Token | Recipe | Used in |
|---|---|---|
| `Flat` | `0 1 2 shadow-2` + `0 2 4 shadow-1` + `0 0 0 1 shadow-3` (inset border ring) | Default control surface (buttons, selects, cards on white) |
| `Low` | `0 2 4 shadow-1` (single) | Section grid envelope (card grouping) |
| `High` | `0 16 32 shadow-2` + `0 0 5 shadow-1` (or `0 0 2.5 shadow-1`) | Toast, Tooltip — elevated overlays |
| `Focus` | (shadow + ring) | Input focus state — see `input/design-context-1.md` |

### Shadow color tokens (used inside the recipes above)

| Token | Light | Dark |
|---|---|---|
| `shadow-1` | `rgba(0,0,0,0.02)` | `rgba(0,0,0,0)` |
| `shadow-2` | `rgba(0,0,0,0.05)` | `rgba(0,0,0,0)` |
| `shadow-3` | `#ebebeb` | `#323232` |
| `shadow-focus` | (focus ring color) | — |

The "Flat" surface treatment is THE defining visual language for Profound controls — a 1px inset border ring + two soft drops. Use it everywhere a control needs to "lift" off the page.

---

## 5. Spacing values (observed; no formal spacing tokens)

Profound doesn't expose a `--space-*` token system in the Color frame. Spacing values seen in components, in px:

`2 · 4 · 6 · 8 · 10 · 12 · 14 · 16 · 20 · 24 · 32 · 48`

These map directly to Tailwind defaults — no custom theme needed.

Common patterns:
- Button padding: `py-6 px-8` (small) → `py-12 px-16` (large)
- Section padding (cards): `p-24`
- Page section gap: `48`
- Component group gap: `24`
- Inline gap: `4 / 6 / 8`

---

## 6. Iconography

Source: `_reference/figma/icons/notes.md`.

- Library: **Heroicons (heroicons.com)** + custom additions
- Sizes: 12, 16 (most common), 20, 24
- Recommendation: install `lucide-react` (close subset of Heroicons; better tree-shaking) for Phase 3, with a fallback strategy for the few custom icons not in lucide.
- Inline SVGs in Figma frames use raster images — for production, render with the icon library.

---

## 7. Country flags

Source: `_reference/figma/00-foundations/flags/`.

- ~252 country flags as a `Flag` component with a `name` variant
- 16×16 standard size
- Recommendation: install `country-flag-icons` package; map ISO-2 codes to component variants.

---

## 8. Provider / Platform avatars

Source: `_reference/figma/00-foundations/providers-platforms/`.

- 16×16 `PlatformAvatar` component, 19 platform variants (Perplexity, Google, ChatGPT, Microsoft Copilot, Claude, Gemini, etc.)
- Brand-specific bg color + 10×10 inner brand icon
- `radius-4`

Phase 3: build a `<PlatformAvatar platform="openai" />` component with hardcoded brand color + svg.

---

## Phase 3 token translation checklist

- [ ] Add `Inter Variable` to `app/layout.tsx` via `next/font/google`
- [ ] Create `app/globals.css` `@theme` block with all 19 base color tokens
- [ ] Add `.dark` override block
- [ ] Add Badge chromatic palette tokens
- [ ] Add Workflow palette tokens
- [ ] Add `radius-4/6/8/rounded` tokens
- [ ] Add `shadow-1/2/3/focus` tokens
- [ ] Define `--shadow-flat`, `--shadow-low`, `--shadow-high` composite shadow vars
- [ ] Apply global `font-feature-settings`
- [ ] Install `lucide-react` + `country-flag-icons`
- [ ] Build `PlatformAvatar` component with brand colors
