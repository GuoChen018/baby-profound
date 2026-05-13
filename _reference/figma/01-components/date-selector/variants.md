# Date Selector — variants

| Axis | Values |
|---|---|
| `variant` | `Range` (segmented only) · `Comparison` (segmented + "vs. Prev period" select) |
| `showVsPrevContainer` | bool (only for Comparison) |

## Per-variant labels

| Variant | Segments |
|---|---|
| `Range` | Last 7d · Last 14d · Last 30d · Custom |
| `Comparison` | 7d · 15d · 30d · Custom |

## Compositional reuse

- Inner segmented control = reuse `segmented-control` primitive.
- Comparison select = reuse `select` primitive (the small "control" sized variant).
- Custom range opens an embedded calendar (see `dropdown` frame for the calendar variant).
