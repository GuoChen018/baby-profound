# Segmented Control — variants

Two parts:

## (1) Container — no variants

Always `bg-bg-primary` (white) · `radius-4` · `shadow-Flat`. Width is observed at 240px but is intended to be fluid.

## (2) Segment — single bool variant

| `state` | Bg | Text | Left border |
|---|---|---|---|
| `true` (selected) | `--control-bg` (white) + `Flat` shadow stack | `Body/SmallMedium` · `--text-primary` | none |
| `false` (unselected) | `--bg-secondary` (`#fafafa`) | `Body/Small` Regular · `--text-tertiary` | `1px solid --fill-quaternary` |

## Phase 3 mapping

```tsx
<SegmentedControl
  value={range}
  onChange={setRange}
  options={[
    { value: '1d', label: '1d' },
    { value: '7d', label: '7d' },
    { value: '28d', label: '28d' },
    { value: '90d', label: '90d' },
    { value: '1y', label: '1y' },
    { value: 'all', label: 'All' },
  ]}
/>
```
