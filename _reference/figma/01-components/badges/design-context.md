# Badges — `1:8313`

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Badge"

## Interpretation summary

A pill-shaped badge / tag with **8 color variants × 2 sizes × icon-or-not = 32 leaf variants**. Each color uses a three-token recipe:

- `<color>-badge/muted-fill` — pale tinted background
- `<color>-badge/border` — slightly darker border (1px)
- `<color>-badge/emphasis` — saturated text + icon color

Grey badge is the only one that maps to existing semantic tokens (`--bg-tertiary` background, `--fill-quaternary` border, `--text-primary` text). The other seven colors introduce a brand-new chromatic palette that doesn't appear anywhere else in the foundation Color frame.

## Component API

```tsx
type BadgeProps = {
  color?: 'Grey' | 'Green' | 'Red' | 'Blue' | 'Orange' | 'Amber' | 'Cyan' | 'Purple';
  size?: 'Small' | 'Regular';            // 18h / 22h
  icon?: boolean;                        // 12px leading icon
};
```

## Anatomy

```
Pill:    border-1px  rounded-100px  py-px
         Small:  h=18 px=6 (gap=3 if icon)
         Regular: h=22 px=7 (gap=3 if icon)
Icon:    12×12 (only if icon=true), color = <color>-emphasis
Text:    Body/MiniMedium = 12/14 Medium, center, color = <color>-emphasis
```

## Color tokens (NEW — these are not in the Color frame!)

| Color | Muted fill (bg) | Border | Emphasis (text/icon) |
|---|---|---|---|
| Grey | `--bg-tertiary` (`#f5f5f5`) | `--fill-quaternary` (`#e8e8e8`) | `--text-primary` (`#18181a`) |
| Green | `#e6fbec` | `#c7f4d7` | `#0d542b` |
| Red | `#fef2f2` | `#ffe6e6` | `#9f0712` |
| Blue | `#eff6ff` | `#e0edff` | `#1b3ea7` |
| Orange | `#fff7ed` | `#f7e4cb` | `#9f2d00` |
| Amber | `#fffbeb` | `#f5ecc4` | `#973c00` |
| Cyan | `#ecfeff` | `#cefafe` | `#005f78` |
| Purple | `#faf5ff` | `#f1e4fa` | `#59168b` |

→ **21 new chromatic tokens** introduced just for badges. These mostly look Tailwind-like (matches `green-50/200/900` pattern) — Profound likely vendored them from Tailwind 3 default palette.

## Asset URLs

- Screenshot: `https://www.figma.com/api/mcp/asset/65febd55-5c07-48da-9a0d-98b9a666b445`
- Sample icon (newspaper, 8 colored variants): `https://www.figma.com/api/mcp/asset/32244071-0784-43e1-964d-5508965581bd` (and 7 others)
