# Color — `1:9983`

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Color"

## Interpretation summary

The Color frame is a swatch sheet with **19 semantic tokens** organized into four categories — `bg`, `fill`, `control`, `text` — each shown in both **Light** and **Dark** theme variants. There is **no chromatic palette** (no blue/purple/etc.); the only chromatic tokens are `*-green` (`#15b462`) and `*-red` (`#ff5f57`) for status. The system is fully neutral with status accents.

Token semantics are **role-based, not appearance-based**:
- `bg-*` → page surfaces (3 levels)
- `fill-*` → ink, icons, dividers (6 tokens including status)
- `control-*` → form/button surfaces (4 tokens)
- `text-*` → text (6 tokens including status)

`fill-*` deliberately inverts on theme — `fill-primary` is `#18181a` on light, `#ffffff` on dark. `bg-*` does not invert; it shifts on a dark scale (`#1e1e1e` → `#252525` → `#343434`). Several tokens are intentionally **theme-stable** (`text-secondary`, `text-tertiary`, `text-green`, `text-red`, `fill-green`, `fill-red`, `control-primary`).

→ Full token table with hex values lives in `tokens.md` (this folder).

## Token sections observed in the frame (in display order)

1. **bg-primary** group: `bg-primary`, `bg-secondary`, `bg-tertiary`
2. **fill-primary** group: `fill-primary`, `fill-secondary`, `fill-tertiary`, `fill-quaternary`, `fill-green`, `fill-red`
3. **control-bg** group: `control-bg`, `control-hover`, `control-selected`, `control-primary`
4. **text-primary** group: `text-primary`, `text-secondary`, `text-tertiary`, `text-quaternary`, `text-green`, `text-red`

## Variable defs returned by Figma MCP (subset of frame's referenced vars)

```json
{
  "bg-base": "#ffffff", "bg-secondary": "#fafafa", "bg-tertiary": "#f5f5f5",
  "fill-primary": "#18181a", "fill-secondary": "#969696", "fill-tertiary": "#d4d4d8",
  "fill-quaternary": "#e8e8e8", "fill-green": "#15b462", "fill-red": "#ff5f57",
  "control-bg": "#ffffff", "control-hover": "#fafafa", "control-selected": "#f1f1f1",
  "control-primary": "#18181a",
  "text-primary": "#18181a", "text-secondary": "#787878", "text-tertiary": "#969696",
  "text-quaternary": "#b4b4b4", "text-green": "#15b462", "text-red": "#ff5f57"
}
```

> Note: the `get_variable_defs` response uses `bg-base` (`#ffffff`) which is the same value as `bg-primary` shown in the frame. Treat `bg-base` and `bg-primary` as aliases — the canonical name in the frame is `bg-primary`.

## Reference React + Tailwind code (truncated)

The full frame markup is large (~75KB) and structurally repetitive — every row is `[label] [Light chip + hex] [Dark chip + hex]`. A representative row:

```tsx
<div className="content-stretch flex gap-[24px] items-start py-[24px] w-[1080px]" data-name="bg-primary">
  <div className="w-[320px]" data-name="color-title">
    <p className="text-[13px] text-[var(--text-primary,#18181a)]">bg-primary</p>
  </div>
  <div className="flex flex-1 gap-[16px]" data-name="color-code-block-Light">
    <img src={lightChip} className="size-[20px]" />
    <p>Light</p>
    <p>#ffffff</p>
  </div>
  <div className="flex flex-1 gap-[16px]" data-name="color-code-block-Dark">
    <img src={darkChip} className="size-[20px]" />
    <p>Dark</p>
    <p>#1e1e1e</p>
  </div>
</div>
```

Re-fetch via `get_design_context` against `1:9983` if the full markup is needed.

## Asset URLs (7-day expiry from capture)

- Screenshot: `https://www.figma.com/api/mcp/asset/84cb706e-858a-4f29-b606-4b0a791acd53` (1500×1980 PNG)
- Per-token color chip thumbnails referenced via `imgColorChipLight*` / `imgColorChipDark*` constants in the original markup.
