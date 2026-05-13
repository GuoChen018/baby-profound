# Input (Text Field + Text Area) — variants

Two sibling components share an almost-identical variant model.

## Shared variant axes

| Axis | Values |
|---|---|
| `size` | `Small` (28h) · `Default` (38h) |
| `state` | `Default` · `Hover` · `Focus` |
| `type` | `Default` · `Typing` · `Completed` · `Error` · `Disabled` |
| `label` | bool — show label above |
| `hint` | bool — show hint below |

→ 2 × 3 × 5 = **30 visual variants** per component (× ~16 boolean combos for icons/button).

## Type semantics

- **Default** — empty + idle, shows placeholder
- **Typing** — has caret visible, dark border on the input (1.5px `--fill-primary`)
- **Completed** — value present, label-style "filled" weight, no border (still has hairline shadow)
- **Error** — red border `--fill-red`, error icon (typically `exclamation-circle`) replaces the right icon
- **Disabled** — grey `--bg-tertiary` background, no shadow, text-quaternary text

## Specific to Text Field (`1:9387`)

- `leftIcon` (bool) — leading 16px icon
- `rightIcon` (bool) — trailing 16px icon
- `button` (bool) — attached **trailing dark button** that fills the input height (uses `Button style="Inverse"` for active types, `style="Disabled"` for Disabled)

## Specific to Text Area (`1:9740`)

- `icon` (bool) — single trailing 16px icon (top-right corner)
- **No button** prop
- **Resize handle glyph** appears bottom-right on Hover state (visual only)
- Default height: `128px` (vs Text Field's row-height 28/38)

## States NOT in the frame

- `Read-only` (likely Disabled with subtly different text contrast — not a separate variant)
- `Auto-suggest` / `loading` — not present

## Recommended Phase 3 API

```tsx
type InputProps = {
  size?: 'sm' | 'md';
  variant?: 'default' | 'error';
  disabled?: boolean;
  label?: ReactNode;
  hint?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  trailingButton?: ReactNode;            // text-field only
  multiline?: boolean;                   // collapses to TextArea behavior
  rows?: number;                         // multiline only
};
```
