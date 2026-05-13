# Stepper — variants

| Component | Axis | Values |
|---|---|---|
| `Stepper` | `label` | bool |
| `Indicator` | `state` | `Active` (12×4 pill) · `Inactive` (4×4 grey dot) · `Completed` (4×4 black dot) |
| `Indicator1` (legacy?) | `state` | bool — on/off only |

## Color tokens

- Active/Completed dot: `--fill-primary`
- Inactive dot: `--fill-quaternary`

## Phase 3 mapping

```tsx
<Stepper steps={5} current={1} showLabel />
```

Internally render N indicators where the one matching `current` is `Active`, those before are `Completed`, those after are `Inactive`.
