# Color — variants

Every token ships in two themes: **Light** and **Dark**. The frame is a 19-row table (rows = tokens, columns = themes).

## Variant axes

- **Theme**: Light · Dark — every token has both. Some are intentionally theme-stable (status colors and `control-primary`).
- **Category**: `bg` · `fill` · `control` · `text` — semantic role grouping.

## Theme-invariant tokens (same hex in both modes)

- `fill-green` `#15b462`
- `fill-red` `#ff5f57`
- `control-primary` `#18181a`
- `text-secondary` `#787878`
- `text-tertiary` `#969696`
- `text-green` `#15b462`
- `text-red` `#ff5f57`

## States NOT in this frame

The Color frame does NOT define hover/active/disabled state colors per component. Those are derived inside each component using `control-hover` / `control-selected` washes. There is no `*-disabled` token — disabled state is presumably opacity-driven or uses `text-quaternary` / `fill-tertiary`.

## See also

- `tokens.md` — full hex table + Tailwind `@theme` mapping
- `design-context.md` — frame structure + interpretation
