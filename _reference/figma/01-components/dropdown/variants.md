# Dropdown — variants

Two variant systems exist in this frame:

## (1) Dropdown surface — `Type` enum (18 values)

`Global nav` · `Filters` · `Platforms` · `List Select` · `Double` · `Data Export` · `Recommendation Options` · `Prompt Editor` · `Type17` · `Profile` · `Theme Switcher` · `Sort` · `Website selector` · `New Asset` · `Compare Periods` · `Chart Config` · `Tags`

→ Each is a complete pre-laid-out dropdown for a specific feature, not a primitive variant.

## (2) Item rows — `Type` × `State`

Item kinds: `Basic` · `Input` · `Action` · `Header` · `Divider`
States: `Default` · `Hover` · `Selected`
→ 5 × 3 = 15 row variants.

## Item heights

- `Basic` 36 (Hover bumps to 40 — likely a 4px top padding shift on hover for the active highlight)
- `Input` 32
- `Action` 36
- `Header` 26
- `Divider` 1px line (height 0 in the frame — a hairline rendered as border)

## Common widths

`216–264 px` — matches the typical Select trigger pill width (Default Select pill is ≈100px so the popover is wider).

## Phase 3 strategy

Build:

1. **`Menu` primitive** (uses `@floating-ui/react`): handles positioning, focus, keyboard nav, arrow keys, selection.
2. **Item subcomponents**: `Menu.Item`, `Menu.Header`, `Menu.Action`, `Menu.Divider`, `Menu.Input`.
3. **Per-feature wrappers** for each of the 18 types — these go in `components/<feature>/` and compose the primitives.
