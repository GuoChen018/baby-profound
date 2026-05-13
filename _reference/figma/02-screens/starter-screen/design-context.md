# Starter screen — `1:16860` (Brand/visibility)

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Brand/visibility"

## Interpretation summary

This is the canonical Profound **Overview** page — what users land on after auth. It's the "brand visibility" view for a single workspace (the Figma uses "Ramp" as the example brand). It composes most of the design system primitives in their canonical positions, and is the gold-standard reference for building the home page in Phase 3.

## Layout hierarchy

```
Frame: 1432×1380, bg-bg-base, radius-12

[Sidebar]: absolute left=0 top=52 w=232 h=1328 (full-height left rail, see sidebar component)
  bg-bg-secondary, border-r-0.5 fill-quaternary, p=12, justify-between

[Top bar]: implied at top=0..52 (not in this frame — Profound has a workspace bar/header)

[Body]: absolute left=232 top=52 w=1200 h=1328 — flex flex-col gap-24, py(12,48), px=24

  [Headers stack]
    [Header row]: py=12 — "Overview" title (24/32 SemiBold)
    [List = TabBar]: h=48, border-b 1 fill-quaternary
      Tabs: Visibility (selected, border-b-2 black) · Sentiment · Topics · Platforms · Regions · Citations
      Right: ellipsis-horizontal icon button + "5.6k answers" Flat surface button (radius-6)
    [Filters row]: py=16
      Left: DateSelector (range only, no comparison)
      Right: Filters Select pill (adjustments-horizontal icon + "Filters" + chevron)

  [Content stack]: gap=48
    [Section 1: "Visibility Score"]
      Title: "Visibility Score" 18/24 SemiBold + "Percentage of AI answers that mention Ramp" 14/20 Regular text-secondary
      Right: "View options" button (Flat surface)
      Grid: 2-up cards, 1px gutter, fill-quaternary frame, radius-8, "Low" shadow
        Card 1: "Visibility Score" label + "77.1%" stat 24/32 SemiBold + change pill — Line chart below
        Card 2: 5 Asset rows (avatar + brand name + score + change pill)

    [Section 2]: same pattern, different metric (likely Citations / Sentiment)
      Title + Grid (2-up cards) with Line chart on left, Asset rows on right
```

## Component reuse

This page directly composes:

- `Sidebar` (left rail, default state)
- `TabBar` (the "List" — Visibility/Sentiment/Topics/...)
- `DateSelector` (Range variant, no comparison)
- `Select` pill (the "Filters" button)
- `SectionTitle` (each section header with optional trailing button)
- `DataViz` (Card containing Header + Line chart)
- `ChartTable` (the Asset rows in the right card)
- `Button` (control-bg Flat — "5.6k answers", "View options")

If you build all the primitives, this page becomes nearly free.

## Canonical Profound tabs (from this frame)

`Visibility` · `Sentiment` · `Topics` · `Platforms` · `Regions` · `Citations`

(The standalone Tab Bar frame also showed `Prompts`, `Personas (Beta)`, `Query Fanout` — those may be on other tabs or hidden by default.)

## Layout numbers

- Sidebar width: 232
- Top reserved space: 52 (top bar)
- Body width: 1200 (so total = 232 + 1200 = 1432)
- Content max-width inside body: 1152 (24px left/right padding inside 1200)
- Section gap: 48
- Card grid gap: 1px (inset border using `bg-fill-quaternary` as separator)
- Card radius: `--radius-8`
- Card surface: `bg-bg-base` with `Low` shadow (single drop `0 2 4 shadow-1`)
- Card padding: 24

## Text styles in use

- Page title ("Overview"): `Title/SmallSemibold` (24/32 SemiBold tracking -0.25)
- Section title ("Visibility Score"): `Title/MiniSemibold` (18/24 SemiBold)
- Section subtitle: `Body/Regular` (14/20 Regular text-secondary)
- Stat value ("77.1%"): `Title/SmallSemibold` (24/32 SemiBold)
- Tab label / button label: `Body/SmallMedium` (13/16 Medium)

## "Low" shadow effect (newly observed)

The card grid container uses `Low: 0 2 4 0 shadow-1` — a single soft drop shadow. This is a **lighter** elevation than `Flat` (which has 3 stacked shadows including the inset border ring). Used for grouping at the section level.

## Asset URLs

- Screenshot: `_reference/figma/02-screens/starter-screen/screenshot.png` (`https://www.figma.com/api/mcp/asset/612389f3-4b4b-4e74-8a03-9f69c8d5b65e`)
