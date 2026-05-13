# Profound design system — Figma capture report

**Date**: 2026-05-12
**File**: `ms5KIXErDeevPJ3a1zIOcr` (Profound-Design-Exercise)
**Canvas**: `0:1` ("Design System")
**Output**: `_reference/figma/`

---

## 1. Frames captured

**Total: 29 frames** across 21 logical components / surfaces.

### Foundations (5)

| Frame | Node ID | Output |
|---|---|---|
| Text styles | `1:3020` | `00-foundations/text-styles/` (design-context, screenshot, tokens, variants) |
| Color | `1:9983` | `00-foundations/color/` (design-context, screenshot, tokens, variants) |
| Icons | `1:3081` | `icons/` (screenshot, notes — no design-context per spec) |
| Flags | `1:4271` | `00-foundations/flags/` |
| Providers & Platforms | `1:6683` | `00-foundations/providers-platforms/` |

### Components (23 frames in 16 component folders)

| Frame | Node ID | Output |
|---|---|---|
| Buttons | `1:7734` | `01-components/buttons/` |
| Input — text field | `1:9387` | `01-components/input/` (-1 suffix) |
| Input — text area | `1:9740` | `01-components/input/` (-2 suffix) |
| Select | `1:8431` | `01-components/select/` |
| Dropdown | `1:8858` | `01-components/dropdown/` |
| Radio | `1:8193` | `01-components/radio/` (-1) |
| **Checkbox** (mislabeled "Radio (2)" in README) | `1:8243` | `01-components/radio/` (-2) |
| Toggle | `1:8663` | `01-components/toggle/` |
| Badges | `1:8313` | `01-components/badges/` |
| Tag | `1:8583` | `01-components/tag/` |
| Segmented control | `1:8293` | `01-components/segmented-control/` |
| Toast | `2:10155` (was `1:8719`) | `01-components/toast/` |
| Tooltip | `2:10194` (was `1:8758`) | `01-components/tooltip/` |
| Inline tooltip | `2:10285` (was `1:8849`) | `01-components/inline-tooltip/` |
| Stepper | `2:8343` (was `1:6907`) | `01-components/stepper/` |
| Date Selector | `2:8359` (was `1:6923`) | `01-components/date-selector/` |
| Tab Bar | `2:8310` (was `1:6874`) | `01-components/tab-bar/` |
| Search | `2:8330` (was `1:6894`) | `01-components/search/` |
| Sidebar | `2:8843` (was `1:7407`) | `01-components/sidebar/` |
| Browser | `2:8374` (was `1:6938`) | `01-components/browser/` |
| Section Title | `2:8428` (was `1:6992`) | `01-components/section-title/` |
| Cursor | `2:8294` (was `1:6858`) | `01-components/cursor/` |
| Data Viz — main | `2:8437` (was `1:7001`) | `01-components/data-viz/` (-1) |
| Data Viz — composed | `2:8682` (was `1:7246`) | `01-components/data-viz/` (-2) |
| **Workflow Side Nav** (mislabeled "Data Viz alt 2") | `2:8702` (was `1:7266`) | `01-components/data-viz/` (-3) |

### Screens (1)

| Frame | Node ID | Output |
|---|---|---|
| Starter screen / Brand visibility | `1:16860` | `02-screens/starter-screen/` |

### Generated cross-cuts

- `00-foundations/SUMMARY.md` — single cheat sheet of all tokens (colors, type, radii, shadows, spacing, palettes)
- `00-foundations/color/tokens.md` — full Color frame token table (19 base + Tailwind 4 mapping)
- `00-foundations/text-styles/tokens.md` — full Text Styles token table + Tailwind 4 mapping
- `CAPTURE_ERRORS.md` — log of stale node-IDs and resolutions
- `README.md` — checkboxes all updated (`✓`)

---

## 2. Frames that failed

**None permanent.** All target frames were captured.

### Transient failures (resolved by remapping IDs)

The original `README.md` listed several frames using `1:xxxx` node IDs that no longer exist (the file was edited and IDs migrated to the `2:xxxx` namespace). Initial `get_design_context` calls for the following returned `node ID provided was invalid`:

- `1:8719` Toast
- `1:8758` Tooltip
- `1:8849` Inline tooltip
- `1:6907` Stepper
- `1:6923` Date Selector
- `1:6874` Tab Bar
- `1:6894` Search
- `1:7407` Sidebar
- `1:6938` Browser
- `1:6992` Section Title
- `1:6858` Cursor
- `1:7001` / `1:7246` / `1:7266` Data Viz (3 frames)

**Resolution**: ran `get_metadata` on canvas `0:1` and remapped each frame name to its current `2:xxxx` ID. All re-fetches succeeded. The README and `CAPTURE_ERRORS.md` were updated with the new IDs (and original IDs preserved for traceability).

---

## 3. MCP call usage

Approximate totals across both sessions:

| Bucket | Calls |
|---|---|
| Foundations (5 frames × ~2 calls + extras like `get_variable_defs` for Color) | ~12 |
| Components — earlier session (16 frames × 2) plus sub-layer fetches for sparse frames (Buttons, Flags, Dropdown) | ~36 |
| Components — this session (Toast → Cursor + Data Viz, ~14 frames × 2 + 1 sidebar sub-state + 1 metadata + 4 wasted retries on stale IDs) | ~32 |
| Starter screen | 2 |
| `get_metadata` (canvas remap) | 1 |
| **Total** | **~83 / 200 daily** |

Well within the 200-call/day quota. Pacing held to <10 calls/min throughout (typical batch: 4 calls per 30s).

---

## 4. Token inventory extracted

| Category | Count | Notes |
|---|---|---|
| Color tokens (base, two-theme) | **19** | `bg-*` (3), `fill-*` (6), `control-*` (4), `text-*` (6) |
| Color tokens (badges, chromatic) | **21** | 7 colors × 3 ranks (`muted-fill`, `border`, `emphasis`) |
| Color tokens (workflow palette) | **4** | `workflow-fill-{purple,green,blue,orange}` (from Workflow Side Nav) |
| Color tokens (other discovered) | ~5 | `text-inverse`, `bg-base`, `fill-inverse`, `fill-green-hover`, `shadow-{1,2,3,focus}` |
| Text styles | **13** + 2 ad-hoc | Display, Title (3 sizes × Regular/Semibold), Body (4 sizes × Regular/Medium), Paragraph |
| Radii | **4** | `radius-4`, `radius-6`, `radius-8`, `radius-rounded` |
| Shadow recipes | **3 named** + Focus | `Flat`, `Low`, `High` |
| Icons | ~150+ | Heroicons + custom (full inventory in `icons/notes.md`) |
| Country flags | ~252 | Single `Flag` component, ISO-2 mapped |
| Platform avatars | **19** platforms | Perplexity, Google, ChatGPT, Microsoft Copilot, Claude, Gemini, etc. |

---

## 5. Top 5 things learned about the design system (Phase 3 priorities)

### 1. **The "Flat" surface treatment is the central visual idiom**
A 1px inset border ring (`shadow-3` color) + two soft drops (`shadow-1` + `shadow-2`) on `control-bg` with `radius-6` defines virtually every interactive control: buttons, selects, segmented control segments, search bar, sidebar promo button, even chart Expand buttons. Get this right ONCE in CSS (`box-shadow: var(--shadow-flat)` or a Tailwind component class) and ~80% of UI controls are themed.

### 2. **Semantic tokens, not palettes**
There is no `slate-50` / `gray-100` ladder. Every color is named by **role**: `bg-primary`, `text-secondary`, `control-hover`, `fill-quaternary`. This makes Tailwind 4 `@theme` translation extremely clean — no aliases needed. There is also **no brand color** in the foundation; `#009aff` for "Beta" pills is a one-off, and chromatic accents only exist inside the Badge palette.

### 3. **Inter Variable + tabular numerals everywhere**
`font-feature-settings: 'ss03' 1, 'cv08' 1, 'lnum' 1, 'tnum' 1` is applied globally. Numeric tables, KPIs, badges, percentages — they all use **tabular lining numerals**. You'll need `next/font` or `@fontsource-variable/inter` to load Inter Variable, then apply the feature settings on `body`. Do not skip — the design literally relies on it for column alignment in the chart tables and stat callouts.

### 4. **The README node IDs were stale — verify before trusting**
Half the README's `1:xxxx` node IDs no longer resolved. The Figma file has been edited since the README was written, shifting many components into the `2:xxxx` ID namespace. **Always run `get_metadata` on the canvas first** to map names → current IDs. Updated mappings are in this file and `CAPTURE_ERRORS.md`.

### 5. **The DS is dense but reusable: the Overview screen is mostly free**
The starter screen (`1:16860`, "Brand/visibility") composes **9 system primitives** with very little custom code: Sidebar + TabBar + DateSelector + Filter Select + SectionTitle + DataViz card + ChartTable + Button + Tag. Build the primitives first and the page falls out almost mechanically. Phase 3 build order: **tokens → primitives → TabBar/Sidebar shell → SectionTitle/DataViz → page composition**.

---

## 6. Concerns and surprises

### Surprises

- **`Radio (2)` is actually Checkbox**. The README labelling was wrong — `1:8243` (now `2:9679`) is a Checkbox component, not a second Radio variant. I documented both correctly under `01-components/radio/` and noted the mislabel.
- **`Data Viz (alt 2)` is actually the Workflow feature's left side-nav** — `2:8702` is mislabeled in Figma. It introduced a new color palette (`workflow-fill-{purple,green,blue,orange}`) that's not in the core Color frame.
- **The Tooltip frame contains 6 fundamentally different layouts**, not 6 variants of one component. Better to build them as 6 separate React components on a shared `<TooltipSurface>` primitive.
- **The Beta pill brand blue (`#009aff`)** is the only chromatic accent in the system outside the Badge palette and the Workflow palette. There is no general "primary brand" color token — Profound's primary is just black (`fill-primary` `#18181a`).
- **A "High" shadow (drop-shadow filter)** is used for floating overlays (Toast, Tooltip) — not a `box-shadow`. This matters because tooltips often have arrow-tails the shadow needs to follow.

### Concerns

- **No formal spacing-token system** in the Color/Text frames. All spacing is ad-hoc px values (2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 48). These align with Tailwind defaults — no custom theme needed — but worth confirming against the live product.
- **Dark theme tokens are present but not designed-against everywhere.** `text-secondary` / `text-tertiary` are theme-stable greys; `inline-tooltip` uses `--fill-primary` which inverts in dark mode (becomes white on white) — likely needs a hard override. Inspect each component on dark mode before shipping.
- **The Browser frame is bitmap macOS chrome.** Skip recreating; use a minimal browser-frame primitive when needed.
- **Cursor frame is bitmap raster cursors.** Almost certainly skip for Phase 3.
- **Asset URLs from `get_design_context` expire after 7 days.** The captured screenshots are saved locally as PNG, but the inline image references in `design-context.md` files (like brand logos) will eventually 404. If we need those later, we'll need to re-fetch.

---

## 7. Confirmation

- ✓ All `_reference/figma/README.md` checkboxes updated to `✓` (foundations, components, screens)
- ✓ `_reference/figma/00-foundations/SUMMARY.md` exists and consolidates every observed token
- ✓ `_reference/figma/CAPTURE_REPORT.md` exists (this file)
- ✓ `_reference/figma/CAPTURE_ERRORS.md` exists with the full stale-ID resolution log
- ✓ Every captured frame folder has at minimum `screenshot.png` + `variants.md`; all except Icons also have `design-context.md` (Icons has `notes.md` per spec)

Phase 3 can begin against `00-foundations/SUMMARY.md` as the single source of truth for token translation.
