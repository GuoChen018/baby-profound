# Data Viz — variants

Three frames captured into this folder. They're related but distinct:

## Frame 1 — Data Viz Blocks (`2:8437`)

The catalog of standalone chart block primitives.

| Component | Variants |
|---|---|
| `DataVizHeader` | `button` (bool) · `dropdown` (bool) |
| `DataVizFooter` | series-toggle row, # of series varies |
| `Chart / Line` | (n/a — single shape) |
| `Chart / Pie` | (n/a — single shape) |
| `Chart / Table` | (n/a — single shape, varies by row count) |
| `Line chart` grid | `Lines` ∈ {1,2,3,4,5} |
| `Pie chart` grid | `Lines` ∈ {2,3,4,5} |

## Frame 2 — Data Viz panel (`2:8682`)

The composed `DataViz` wrapper.

| Axis | Values |
|---|---|
| `type` | `Pie` · `Line` · `Table` |
| `expandable` | bool — controls "Expand" header button |

Header button is `false` by default for Table type.

## Frame 3 — Workflow Side Nav (`2:8702`) — **mislabeled as "Data viz"**

Workflow-feature left rail. Not a chart.

| Axis | Values |
|---|---|
| `state` | `Blocks` · `Settings` · `Rest` (collapsed) |

## Phase 3 mapping

```tsx
<DataViz type="line" title="Visibility" stat="99.99%" change={{ value: '+99.99%', direction: 'up' }}>
  <LineChart series={[...]} />
</DataViz>

<DataViz type="table" title="Top brands">
  <ChartTable rows={brandRows} highlightYourSite />
</DataViz>
```

For actual chart rendering, use a real chart library (Recharts / Visx / D3). The Figma chart canvases are bitmaps.
