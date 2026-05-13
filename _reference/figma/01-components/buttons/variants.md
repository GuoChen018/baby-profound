# Buttons — variants

**Variant axes (5)**: `Size` × `Style` × `State` × `Label` × `Icon left` × `Icon right`. Total **≈ 270 leaf variants** in the frame.

| Axis | Values | Notes |
|---|---|---|
| `Size` | `Large` · `Default` · `Small` | 38 / 28 / 24 px tall |
| `Style` | `Default` · `Inverse` · `Destructive` · `Ghost` · `Disabled` | "Disabled" is its own style rather than a state — meaning the disabled appearance overrides any other style |
| `State` | `Default` · `Hover` · `Focus` | (No explicit `Active`/`Pressed` state) |
| `Label` | `True` · `False` | `False` = icon-only square button |
| `Icon left` | `True` · `False` | |
| `Icon right` | `True` · `False` | |

## Common patterns observed

- **Icon-only square** = `Label=False, Icon left=False, Icon right=False` → square `Size×Size` chip
- **Label-only** = `Label=True, Icon left=False, Icon right=False` → narrow pill, no icons
- **Trailing icon** (e.g. dropdown chevron) = `Icon right=True`
- **Leading icon** (most common) = `Icon left=True`

## States NOT in the frame

- **Pressed/Active** — likely treated as a fast Hover variation in implementation
- **Loading** — not present; build separately as an overlay/spinner

## Sizing derivations

| Size | Height | Implied padding (16px icon) | Label font | Label line height |
|---|---|---|---|---|
| Large | 38 | `p-[11px]` (verified) | 13px Medium | 16 |
| Default | 28 | `p-[6px]` (derived) | 13px Medium | 16 (assumed; same as Large) |
| Small | 24 | `p-[4px]` (derived) | 13px Medium | 16 (assumed) |

> Confirm Default/Small font sizes during component build by sampling individual instances or measuring the screenshot.

## Recommended Phase 3 API

```tsx
type ButtonProps = {
  size?: 'sm' | 'md' | 'lg';            // Small / Default / Large
  variant?: 'default' | 'inverse' | 'destructive' | 'ghost';
  disabled?: boolean;                    // collapses any variant into Disabled visual
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children?: ReactNode;                  // omit for icon-only
};
```
