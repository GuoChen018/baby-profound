# Data Viz (main blocks) — `2:8437` (was `1:7001`)

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Data Viz" / "Data Viz Blocks"

## Interpretation summary

The big composite frame containing **all standalone chart block primitives**: Header, Footer, Pie, Line, Table — each as a separate component. Plus a "Line chart" sub-grid of 5 width variants (1–5 lines).

## Sub-components in this frame

| Component | Node ID | Notes |
|---|---|---|
| `Data Viz / Header` | `2:8440` | The header bar above each chart — title + big stat + change% + buttons |
| `Data Viz / Footer` | `2:8451` | Series-toggle checkbox row (used under multi-series charts) |
| `Chart / Line` | `2:8452` | Single line chart variant |
| `Chart / Pie` | `2:8471` | Pie chart variant |
| `Chart / Table` | `2:8474` | Tabular ranking variant (Brand / Score / Change) |
| `Line chart` group | `2:8541` | 5 line-chart variants `Lines=1..5` (different series counts) |
| `Pie chart` group | `2:8647` | 4 pie-chart variants `Lines=2..5` |

## DataVizHeader

```tsx
type DataVizHeaderProps = {
  title: string;            // small label e.g. "Visibility"
  stat: string;             // big number e.g. "99.99%"
  change?: { value: string; direction: 'up' | 'down' };  // green or red badge
  button?: boolean;         // "Expand" pill button (right)
  dropdown?: boolean;       // ellipsis-horizontal more menu
};
```

Anatomy:
```
DataVizHeader: h=56, px=24, flex justify-between
  [Copy]: title 13/16 Medium text-secondary
          stat 24/32 SemiBold text-primary + change pill (icon + 18/24 SemiBold colored)
  [Right]: "Expand" button (control-bg, Flat shadow) + ellipsis-horizontal icon button
```

## Chart / Table (the most code-relevant)

A ranked list with row anatomy:
```
Row: py=16, px=8, border-b 1 fill-quaternary
  [Info]: rank number (24w, text-tertiary) + avatar 16 (radius-4, bg overlay rgba(0,0,0,0.03)) + brand name 13/16 Medium + optional Tag ("Your Site")
  [Stat]: value 13/16 Medium + change pill (plus/minus icon 12 + colored 13/16 Medium)
```

## Change pill colors

- Positive: `--text-green` (`#15b462`) + `plus` icon
- Negative: `--text-red` (`#ff5f57`) + `minus` icon

## Avatar treatment in table rows

The brand avatar gets a subtle `rgba(0,0,0,0.03)` overlay — this is a darken-on-hover-like effect baked in even at rest, to soften the brand logo against the white bg.

## Tag inside row

The Ramp row shows a `Your Site` tag inline — uses the `Tag` component (`bg-tertiary`, radius-rounded, 10/1.2 Medium text-secondary). Use this pattern to highlight the user's own brand in any ranking.

## Asset URLs

- Screenshot: `_reference/figma/01-components/data-viz/screenshot-1.png` (`https://www.figma.com/api/mcp/asset/051150ed-9ad8-4a4c-8441-d52f684363b2`)
