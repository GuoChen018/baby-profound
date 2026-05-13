# Tag — variants

| Axis | Values |
|---|---|
| `size` | `Small` (28h) · `Default` (28h) · `Large` (38h) |
| `state` | `Default` · `Hover` · `Focus` |
| `iconLeft` | bool |
| `iconRight` | bool |

→ 3 × 3 × 4 = 36 max; ~27 observed (only one of left/right per variant).

## How Tag differs from Badge / Select

| Aspect | Tag | Badge | Select |
|---|---|---|---|
| Shape | Rounded-rounded pill | Rounded-100px pill | radius-6 chip |
| Background | grey only (`--bg-tertiary`) | 8 colors with muted-fill/border | white control surface |
| Text weight | Medium | Medium | Medium |
| Sizes | 3 (S/D/L) | 2 (S/R) | 2 (S/D) |
| Interactive states | Hover/Focus | none | Hover/Focus/Active |
| Trailing affordance | optional icon | none | counter + chevron |
| Use | citation chips, attribute tags, overflow indicators | status colored tags | filter pills |
