# Select — variants

| Axis | Values |
|---|---|
| `size` | `Small` · `Default` |
| `state` | `Default` · `Hover` · `Focus` · `Active` |
| `type` | `Mono` (chevron-up-down) · `Multi` (chevron-down) |
| `leftIcon` | bool |
| `counter` | bool — shows numeric badge |

→ 2 × 4 × 2 = **16 visual variants** × icon/counter toggles.

## Type semantic

- **Mono** uses `chevron-up-down` icon (signals single-value selection)
- **Multi** uses `chevron-down` (signals multi-select dropdown)

## State `Active` is unique

It's the only inverted variant — used when the dropdown is **open**. The component flips bg → black, text → white, counter → white-on-black.

## Phase 3 mapping

`<Select>` should accept `multi`, `count`, `icon`, `open` props. When `open` is true (and state is anything), render the Active visual.
