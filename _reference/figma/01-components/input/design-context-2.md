# Input — Text Area — `1:9740`

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Text area"

## Interpretation summary

The multi-line companion to Text Field (`1:9387`). Same variant matrix and same token language; the only structural differences are:

1. The input box is taller (default `h-[128px]`) and uses `p-[12px]` (uniform padding instead of `px-12 py-8`).
2. The inline trailing **Button** is replaced by a corner **resize handle** (a tiny diagonal-grip glyph at bottom-right) that appears on Hover.
3. There's no leading icon position — only an `icon` prop for a single trailing icon at top-right.
4. Text alignment is top (`items-start` on the input box) so multi-line content flows downward.

## Component API

```tsx
type TextAreaProps = {
  size?: 'Small' | 'Default';            // same as TextField
  state?: 'Default' | 'Hover' | 'Focus';
  type?: 'Default' | 'Typing' | 'Completed' | 'Error' | 'Disabled';
  label?: boolean;
  hint?: boolean;
  icon?: boolean;                        // single trailing 16px icon
};
```

## Anatomy

```
[ Label · 13/16 Medium · text-primary ]
[ Textarea box · h=128 default · radius-6 · p-12 · items-start ]
  ├─ text/placeholder (top-left)
  ├─ trailing icon (top-right, 16×16, optional)
  └─ resize handle (bottom-right, 16×16, only on Hover)
[ Hint · 12/14 Regular · text-tertiary | text-quaternary if Disabled ]
```

## Borders / shadows / colors

Identical to TextField — same `--bg-base / --control-hover / --bg-tertiary` swaps, same `--fill-primary` border for Typing, same `--fill-red` border for Error, same `Flat` and `Focus` shadow stacks.

## Notable: the resize handle

Appears on `Hover` state for these types: Default, Disabled, Completed, Typing, Error. It's a 16×16 SVG (a diagonal stripe pattern) anchored bottom-right inside the box. Not a real CSS `resize:` corner — it's purely visual; the actual resize behavior would be implemented separately.

## Asset URLs (7-day expiry)

- Screenshot: `https://www.figma.com/api/mcp/asset/27a0e114-7a27-4656-a84b-e7b5cc9dd008` (1500×2680, downscaled to 1147×2048)
- Sample icon (heroicons-micro/eye): `https://www.figma.com/api/mcp/asset/1275981e-0cea-4874-aa79-30f4a4e0d15c`
- Resize handle: `https://www.figma.com/api/mcp/asset/d0aa41d6-77f9-4384-921f-e245a6237f31`
