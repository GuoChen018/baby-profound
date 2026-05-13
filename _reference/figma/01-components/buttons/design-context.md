# Buttons — `1:7734`

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Buttons"

## Interpretation summary

A complete button component with five variant axes. The frame contains **270 instances** (≈ all combinations of Size × Style × State × Label × Icon-left × Icon-right). The metadata response gave us the variant grid; one example instance (`1:7747` — Large/Default/Default with left icon) gave us the exact token+styling spec. Together they're enough to translate.

The Default style is a near-flat white button with a 1px outline shadow plus a subtle drop. Buttons use `Body/SmallMedium` (13/16 Medium Inter Variable) for labels and 16px icons. The button is built around the `control-*` color tokens for fills and `text-primary` for label.

## Component API (variant axes)

| Prop | Values |
|---|---|
| `size` | `Large` (38×) · `Default` (28×) · `Small` (24×) |
| `style` | `Default` · `Inverse` · `Destructive` · `Ghost` · `Disabled` |
| `state` | `Default` · `Hover` · `Focus` |
| `label` | `True` · `False` (icon-only when False) |
| `iconLeft` | `True` · `False` |
| `iconRight` | `True` · `False` |

→ 3 sizes × 5 styles × 3 states × {label+icon configs} ≈ 270 leaf variants in the frame.

## Size table (from frame metadata)

| Size | With label height | Icon-only square |
|---|---|---|
| `Large` | 38px | 38×38 |
| `Default` | 28px | 28×28 |
| `Small` | 24px | 24×24 |

Width grows with content. Common widths from the frame (with label "Label" + 1 icon): Small ≈ 68px, Default ≈ 72px, Large ≈ 78px. Label-only widths: Small ≈ 48px, Default ≈ 50px, Large ≈ 56px.

## Anatomy (from `Size=Large, Style=Default, State=Default, Label+IconLeft`)

```tsx
<div className="
  bg-[var(--control-bg, white)]
  flex items-center justify-center gap-[6px]
  p-[11px]                             /* Large: 11px on all sides → 38px square w/ 16px icon */
  rounded-[var(--radius-6, 6px)]
  shadow-[
    0px_1px_2px_0px_var(--shadow-2, rgba(0,0,0,0.05)),
    0px_2px_4px_0px_var(--shadow-1, rgba(0,0,0,0.02)),
    0px_0px_0px_1px_var(--shadow-3, #ebebeb)
  ]
">
  <Icon className="size-[16px]" />
  <span className="font-['Inter_Variable:Medium'] text-[13px] leading-[16px] text-[color:var(--text-primary, #18181a)]">
    Label
  </span>
</div>
```

## Tokens used

- `--control-bg` (white in light, `#292929` in dark) — Default style background
- `--text-primary` — Default label color
- `--radius-6` — 6px corner radius (likely the system has `--radius-2/4/6/8/12/16` in 2px steps)
- `--shadow-1` `rgba(0,0,0,0.02)` — soft outer drop
- `--shadow-2` `rgba(0,0,0,0.05)` — close drop
- `--shadow-3` `#ebebeb` — 1px hairline border (drawn as a 1px-spread shadow rather than a CSS border so it renders crisply)
- Typography: `Body/SmallMedium` = Inter Variable Medium 13/16
- Effect: a layered shadow named `Flat` in Figma — three drop shadows stacked

## Style mapping (extrapolated from variant names)

| Style | Background | Text/Icon | Border |
|---|---|---|---|
| `Default` | `--control-bg` | `--text-primary` | hairline `--shadow-3` |
| `Inverse` | `--fill-primary` (black on light) | white | none/inverted |
| `Destructive` | (likely white) | `--text-red` | `--text-red` outline |
| `Ghost` | transparent | `--text-primary` | none, hover-only fill |
| `Disabled` | `--control-bg` muted | `--text-quaternary` | hairline `--shadow-3` |

> The exact destructive/ghost/inverse colors should be confirmed by inspecting the screenshot during component build (the screenshot is the authoritative reference). The destructive/inverse colors weren't returned in the variable defs of the single Default-style instance we sampled.

## Padding by size (derived)

- Large (38h): `p-[11px]` (38 - 11×2 = 16 = icon size)
- Default (28h): `p-[6px]` likely (28 - 6×2 = 16)
- Small (24h): `p-[4px]` likely (24 - 4×2 = 16)

→ All sizes use a 16px icon. Vertical padding shrinks with size; horizontal padding grows with the label.

## State semantics

- **Default** → resting
- **Hover** → background shift to `--control-hover` (Default style); brightness shift on others
- **Focus** → keyboard focus ring (likely a 2px ring around the button using outline)

## Reference React + Tailwind code

See `Button` snippet above. Full button matrix isn't fetched (the metadata shows the structure cleanly, and individual variants would each take an MCP call). For Phase 3 implementation, build a single `<Button>` primitive that accepts `size`, `variant`, `disabled`, `iconLeft`, `iconRight` props and maps each combo to the correct token classes.

## Asset URLs (7-day expiry)

- Frame screenshot: `https://www.figma.com/api/mcp/asset/c8dac341-0fc7-45eb-83a3-0297d877d484` (1500×1412)
- Sample icon (heroicons-micro/adjustments-horizontal): `https://www.figma.com/api/mcp/asset/8aa92c1e-ba20-4d95-af51-42a8bf6bf89d`
