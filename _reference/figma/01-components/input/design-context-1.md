# Input — Text Field — `1:9387`

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Text field"

## Interpretation summary

A complete `TextField` component family — single-line input with optional label above, hint below, leading icon, trailing icon, and an attached trailing button. The component is wrapped in a vertical container (`flex-col gap-[8px]`) that holds: `[Label] [Input row] [Hint]`. The Input row itself is `[Icon] [Text/Placeholder/Caret] [Right Icon] [Trailing Button]`.

The input ships with a sophisticated state matrix: **2 sizes × 5 types × 3 states = 30 visual variants**, plus four boolean toggles for label / hint / left icon / right icon / button.

## Component API

```tsx
type TextFieldProps = {
  size?: 'Small' | 'Default';            // 28h / 38h
  state?: 'Default' | 'Hover' | 'Focus';
  type?: 'Default' | 'Typing' | 'Completed' | 'Error' | 'Disabled';
  label?: boolean;                       // show label above (default true)
  hint?: boolean;                        // show hint below (default true)
  leftIcon?: boolean;                    // 16px icon at start of input
  rightIcon?: boolean;                   // 16px icon at end of input
  button?: boolean;                      // attached trailing dark button
};
```

## Anatomy & exact tokens

```
[ Label · 13/16 Medium · text-primary ]
[ Input row · h=28 (Small) or 38 (Default) · radius-6 · px-12 py-8 · gap-5 ]
  ├─ leftIcon (16×16, heroicons-micro)
  ├─ text/placeholder
  └─ rightIcon (16×16) | button (control-primary, 11px or 5×8 padding)
[ Hint · 12/14 Regular · text-tertiary (or text-quaternary if Disabled) ]
```

### Background by `type` × `state`

| Type | Default | Hover | Focus |
|---|---|---|---|
| `Default` / `Completed` | `--bg-base` (white) | `--control-hover` (`#fafafa`) | `--bg-base` + focus ring |
| `Typing` | `--bg-base` + `1.5px` border `--fill-primary` | `--control-hover` + dark border | `--bg-base` + dark border + focus ring |
| `Error` | `--bg-base` + `1.5px` border `--fill-red` | `--control-hover` + red border | `--bg-base` + red border + focus ring |
| `Disabled` | `--bg-tertiary` (`#f5f5f5`), no shadow | same | same + focus ring (rare) |

### Shadows (named `Flat` and `Focus`)

- **Flat** (resting): `0 1 2 0 shadow-2 (0,0,0,0.05)` + `0 2 4 0 shadow-1 (0,0,0,0.02)` + `0 0 0 1 shadow-3 (#ebebeb)` — same 3-layer stack as Buttons
- **Focus** (adds): `0 0 0 3 shadow-focus (#f2f2f2)` — a 3px ring drawn as a 4th drop shadow

### Text styles

- Label: 13/16 Medium · `--text-primary`
- Placeholder: Default 14/1.4 Regular · `--text-tertiary`; Small 13/16 Regular · `--text-tertiary`
- Filled value (Completed): Default 14/1.4 **Medium** · `--text-primary`; Small 13/16 Medium · `--text-primary`
- Hint: 12/14 Regular · `--text-tertiary` (Disabled → `--text-quaternary`)

### Trailing button

A fully self-contained `Button` instance with `style="Inverse"` (dark `--control-primary` bg, white label) or `style="Disabled"` when the field is disabled. Sized to match the input row height (Small: `px-8 py-5`, Default: `p-11`).

## Container sizing

```
max-w-[560px] min-w-[120px] w=400px (default canvas width — actual width is fluid)
```

## Reference React + Tailwind code

The frame returned a single very large `TextField` component definition with the `Button` sub-component inlined — see the captured response. Key takeaways:
- `--radius-6` for the input
- `border-[1.5px]` for `Typing` and `Error` types (the active "interactive" types)
- Default and Completed types have no border, just shadow
- Focus ring is a 3px outer drop shadow with `--shadow-focus` (`#f2f2f2` light)

## New tokens discovered

- `--shadow-1`: `rgba(0,0,0,0.02)`
- `--shadow-2`: `rgba(0,0,0,0.05)`
- `--shadow-3`: `#ebebeb` (1px hairline)
- `--shadow-focus`: `#f2f2f2` (3px focus ring)
- `--text-inverse`: `white` (used by the trailing Inverse button)

## Asset URLs (7-day expiry)

- Screenshot: `https://www.figma.com/api/mcp/asset/ab1fa56a-a568-4ea9-a2eb-1002b65cc39d` (1500×2130, downscaled to 1443×2048)
- Sample icon (heroicons-micro/eye): `https://www.figma.com/api/mcp/asset/9cf9b0b6-6e03-4c57-a93e-8f49a8318dc2`
- Caret stroke: `https://www.figma.com/api/mcp/asset/a096fe0c-75f1-42d4-b444-52e8080d0fb3`
