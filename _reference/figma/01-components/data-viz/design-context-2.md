# Data Viz (composed page) — `2:8682` (was `1:7246`)

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Data viz"

## Interpretation summary

A higher-level wrapper showing how the three chart variants compose into a panel: a **DataViz card** with Header → chart body → optional Footer, all wrapped in `bg-bg-primary` 24px-padded card.

## Component API

```tsx
type DataVizProps = {
  type: 'Pie' | 'Line' | 'Table';
  title: string;
  stat?: string;
  change?: { value: string; direction: 'up' | 'down' };
  series?: SeriesSpec[];      // for Pie/Line — drives the Footer checkbox row
  rows?: TableRow[];          // for Table
  expandable?: boolean;
};
```

## Anatomy

```
DataViz: bg-bg-primary, h=512, py=24, between layout
  DataVizHeader (top)
  [chart body]: 272h, px=24
    Pie: 220×220 SVG centered on a Pattern background
    Line: 5 line-chart canvas with grid lines, x-axis labels, y-axis labels
    Table: ranked list (no Footer)
  DataViz/Footer (bottom, only for Pie/Line):
    series checkboxes (one per series)
    each checkbox: 12×12 with `--radius-4`, brand color bg when active
```

## Footer (series toggle)

```
Checkbox row:
  bg-bg-base, h=24, p=6, gap=8, radius-6
  inner Checkbox: 12×12 colored to match the series
  label "01" (or platform name) 13/16 Medium text-primary
```

This is the legend-as-toggle pattern — series checkboxes both label and toggle the line.

## Tokens used

- Card surface: `--bg-primary`
- Footer checkbox row surface: `--bg-base`
- Series colors (observed in this frame): `#16b463` (green) — matches `--fill-green`/`--text-green`

## Asset URLs

- Screenshot: `_reference/figma/01-components/data-viz/screenshot-2.png` (`https://www.figma.com/api/mcp/asset/892d15d3-3b07-4f00-a970-40ab877cd365`)
