# Radio + Checkbox — variants

This folder holds two sibling components (the README mis-names the second frame as "Radio (2)" — it's actually `Checkbox`). They share an identical 24h wrapper, only the control glyph differs.

## Shared variant axes

| Axis | Values |
|---|---|
| `state` | `Default` · `Hover` · `Focus` |
| `disabled` | bool |
| `selected` | bool — `radio` for Radio, `checkbox` for Checkbox |
| `label` | bool |

→ 3 × 2 × 2 × 2 = **24 visual variants** per component.

## Control geometry

| | Off | On |
|---|---|---|
| Radio | 12×12, 1.5px ring `--fill-tertiary`, `radius-rounded` | filled circular dot |
| Checkbox | 12×12, 1.5px ring `--fill-tertiary`, `radius-4` | bg `--fill-primary` + white check (heroicons-micro/check 10×10) |

## State semantics (both)

- Default → `bg-bg-base`
- Hover → `bg-control-hover`
- Focus → `bg-bg-base` + 3-layer Flat shadow + `0 0 0 3 shadow-focus` ring
- Disabled → control gets `opacity-20` (Checkbox confirmed; Radio likely same), label switches to `--text-quaternary` Regular

## Phase 3 mapping

```tsx
<Radio name="chart-type" value="line" checked label="Line chart" />
<Checkbox checked indeterminate={false} label="Show legend" />
```

Both should accept `disabled`, `label`, `name`, `value` (Radio) / `checked` (Checkbox), `onChange`. The interactive wrapper styling can be a shared `<ChoiceControl>` HOC.
