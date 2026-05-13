# Toggle — variants

| Axis | Values |
|---|---|
| `state` | `Default` · `Hover` · `Focus` |
| `disabled` | bool |
| `toggle` | bool — on/off |
| `label` | bool |

→ 24 leaf variants total.

## Track color logic

| disabled | toggle | state | track |
|---|---|---|---|
| no | off | any | `--fill-quaternary` |
| no | on | Default/Focus | `--fill-green` |
| no | on | Hover | `--fill-green-hover` (`#01a04e`) |
| yes | off | any | `--fill-quaternary` + opacity-30 |
| yes | on | Default/Focus | `--fill-green` + opacity-30 |
| yes | on | Hover | `--fill-green-hover` + opacity-30 |

## Knob is always white

`bg-bg-base` (off) or `bg-fill-inverse` (on) — both resolve to white on light theme.

## Phase 3 mapping

```tsx
<Toggle checked onChange={...} disabled label="Real-time updates" />
```
