# Starter screen — variants

The page itself doesn't have variants in Figma — it's a single Brand/visibility view. But the underlying components used here have variants we should respect when reproducing it:

| Component | Variant used |
|---|---|
| Sidebar | `state=Default` |
| TabBar | `selected="Visibility"`, no Beta badges, no number callouts |
| DateSelector | `variant=Range` (`showVsPrevContainer={false}`) |
| Filter pill | `Select` with leading icon, no counter badge |
| Section grid | 2-up cards, 1px fill-quaternary gutter, "Low" shadow envelope |
| Card | bg-bg-base, p=24, gap=24 |
| Stats | 24/32 SemiBold + green/red change pill |
| Chart | Line variant (no Footer toggles in this layout) |
| Brand row | rank# (24w text-tertiary) + 16px avatar + name + Tag (optional, "Your Site") + score + change pill |

## Phase 3 — what to build first

Build in this order to land on this page exactly:

1. Tokens (`@theme` from `00-foundations/SUMMARY.md`)
2. Button, Tag, Badge, Select, Input, Search, Toggle (primitives)
3. TabBar
4. Sidebar (Default state only)
5. SectionTitle
6. DataViz wrapper
7. ChartTable + LineChart (use a real chart lib for the line)
8. Page composition matching this frame
