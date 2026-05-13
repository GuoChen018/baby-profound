# Toast — variants

| Axis | Values |
|---|---|
| `type` | `Default` · `Success` · `Alert` · `Beta` |
| `bodyText` | bool |
| `icon` | bool (only meaningful for Success/Alert) |
| `timeDetractor` | bool — bottom auto-dismiss progress bar |

## Per-type indicator color

- Default → `--fill-tertiary` progress bar (grey)
- Success → green `check-circle` icon + `--fill-green` progress bar
- Alert → red `exclamation-triangle` icon + `--fill-red` progress bar
- Beta → `Beta` pill (brand blue `#009aff` on 10% opacity bg) + grey progress bar; also shows a pencil-square edit affordance + close button

## Trailing actions

| Type | Actions |
|---|---|
| Default / Success / Alert | `x-mark` close |
| Beta | `pencil-square` (open feedback) + `x-mark` close |

## Phase 3 mapping

```tsx
<Toast variant="success" title="Indexed" body="Source added to citations" autoClose={5000} />
<Toast variant="beta" title="This page is new" body="Your feedback helps us get it right." onEdit={...} />
```
