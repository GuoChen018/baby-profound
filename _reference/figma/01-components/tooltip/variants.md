# Tooltip — variants

Single `type` enum with 6 specialized layouts. No state variants (no hover/disabled — tooltips are themselves the hover state of something else).

| Type | Width | Use |
|---|---|---|
| `Date & Time` | 172 | Hover-on a chart point or timestamp; shows the full date + clock time |
| `Citation` | 400 | Hover-on a citation chip; shows source favicon, headline, date, snippet |
| `Explainer` | 400 | Hover-on a term/metric label; shows term + API name + description |
| `Chart - Single Data Point` | 248 | Hover-on a single chart point; metric name, value, date, platform |
| `Chart - Multiple Data Points` | 248 | Hover-on a chart with N series; rows for each platform |
| `Region` | 248 | Hover-on a flag/region; flag, name, KPI rows |

## Implementation strategy (Phase 3)

These should be 6 separate React components composed on a shared `<TooltipSurface>` primitive (the popover positioning + the surface chrome). Use `@floating-ui/react` for placement.

```tsx
<TooltipSurface><CitationTooltip source="..." /></TooltipSurface>
<TooltipSurface><RegionTooltip code="us" /></TooltipSurface>
```

Don't try to model all 6 as a single `type` enum — each has fundamentally different content shape.
