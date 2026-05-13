# Browser — variants

| Axis | Values |
|---|---|
| `theme` | `Light` · `Dark` |

## Theme tokens (hard-coded — not from design system)

| | Light | Dark |
|---|---|---|
| Toolbar bg | `#fafafa` | `#191c1f` |
| URL bar bg | `rgba(0,0,0,0.05)` | `#0c0f12` |
| URL bar text | `#4c4c4c` | `white` |
| Border/shadow | drop 0.5 0 rgba(0,0,0,0.15) | inset white 0.4 highlights + #47494b sides |

These are macOS Safari chrome colors and **don't map to Profound design tokens** — leave them hard-coded.

## Notable

- Not a functional component; it's a presentational wrapper for marketing/screenshots.
- Most of the toolbar UI is bitmap art baked in by Figma (PNGs of macOS toolbar items).
