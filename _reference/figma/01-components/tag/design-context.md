# Tag — `1:8583`

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Tag"

## Interpretation summary

A grey, rounded-pill tag — different from `Badge` (color-coded) and from `Select` (filter pill with chevron). Tag is the workhorse for **labels you can hover and tap** (e.g. citation chips, attribute tags, "+3 more" overflow indicators). It's monochromatic — only Grey on the `--bg-tertiary` surface — but with three sizes (Small/Default/Large) and the standard hover/focus interactive treatment.

## Component API

```tsx
type TagProps = {
  size?: 'Small' | 'Default' | 'Large';
  state?: 'Default' | 'Hover' | 'Focus';
  iconLeft?: boolean;
  iconRight?: boolean;
};
```

## Anatomy

```
Pill: rounded-rounded
Bg: --bg-tertiary (Default/Focus) | --fill-quaternary (Hover)
Focus: + 3-layer Flat shadow + focus ring
Padding & sizes:
  Small:   px=10 py=7   (text 12/14)
  Default: px=12 py=6   (text 13/16)
  Large:   px=16 py=10  (text 13/16)
Gap with icon: 8px (slightly larger than Buttons' 6px)
Icon: 14px (Small) / 16px (Default+Large)
Label: Inter Variable Medium · text-primary
```

## Variant matrix

`size` (3) × `state` (3) × `iconLeft` (2) × `iconRight` (2) = 36 leaf variants. Note: only `iconLeft XOR iconRight` is observed (not both at once) — the leaf nodes show 27 actual variants.

## Asset URLs

- Screenshot: `https://www.figma.com/api/mcp/asset/940023ac-e47a-4cd9-8867-f66d1c289f43`
