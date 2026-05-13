# Flags — variants

Single 16×16 px component family: `Flag` with one variant property `Name=<Country>` and ~252 enum values.

- **No size variants** observed — only 16px. If a larger flag is needed in the live product, it's likely scaled up from the same SVG.
- **No state variants** (no hover/disabled/selected variants on the flag itself).
- **No rounded vs. squared variants** — all flags appear as rounded-square chips at 16px.
- **Component property**: `Name` (variant) — string enum.

## Implementation suggestion (Phase 3)

For Baby Profound, recommend **not** rebuilding the entire 252-flag library. Instead:

1. Add a small `<Flag code="us" />` primitive in `components/ui/Flag.tsx` that resolves ISO-2 codes via `country-flag-icons` (npm) for the common cases.
2. Vendor only the **non-ISO supranational marks** (EU, UN, NATO) and **disputed regions** (Kosovo, Somaliland, Transnistria) as inline SVGs.
3. Map ISO-2 → display name via `i18n-iso-countries` if needed.

`country-flag-icons` ships SVG components — they render at 1:1.5 aspect by default but can be wrapped in a 16×12 box to match the visual weight of the Figma chips.
