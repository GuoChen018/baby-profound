# Tooltip — `2:10194` (was `1:8758` in stale README)

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Tooltip"

> Note: README's `1:8758` is stale. Current node ID is `2:10194`.

## Interpretation summary

Six distinct tooltip layouts, all sharing the same surface treatment (white card, hairline border, `radius-6` or `radius-8`, "High" drop shadow). Tooltips in Profound are content-rich — many include inline data, charts, region info, citations, etc.

## Component API

```tsx
type TooltipProps = {
  type?:
    | 'Date & Time'                      // 172w · 49h · dark glassy
    | 'Citation'                         // 400w · favicon + headline + snippet
    | 'Explainer'                        // 400w · term + API name + description
    | 'Chart - Single Data Point'        // 248w · single value + delta + platform
    | 'Chart - Multiple Data Points'     // 248w · stacked rows of platform + value + colored key
    | 'Region';                          // 248w · flag + region name + KPI rows
  term?: string;                         // Explainer
  apiName?: string;                      // Explainer
  description?: string;                  // Explainer
  keyColor?: boolean;                    // Chart - Multi: show colored key bar next to each row
};
```

## Surface treatment (shared)

```
bg: --bg-primary (white)
border: 1px solid --fill-quaternary
radius: --radius-6 (Citation/Region/Charts) or --radius-8 (Explainer)
shadow "High": 0 16 32 shadow-2 + 0 0 2.5 shadow-1   ← drop-shadow filter, NOT box-shadow
padding: 16px
```

## Per-type contents

| Type | Width | Height | Contents |
|---|---|---|---|
| Date & Time | 172 | 49 | Black glassy capsule, white time text + caret. Background image `imgTypeDateTime`. |
| Citation | 400 | auto | 14×14 circular favicon + source name + 13/16 Medium headline + 13/1.7 Regular snippet (text-secondary) |
| Explainer | 400 | auto | term + apiName (right) + 13/1.7 description |
| Chart - Single | 248 | auto | "Visibility Score" + date (right) + 24px SemiBold value (52.1%) + platform avatar + label |
| Chart - Multi | 248 | auto | Same header + N rows (color key + platform avatar + label + value) |
| Region | 248 | auto | Flag (16) + region name + date + KPI rows (label + value, divided) |

## Notable

- The shadow is **`drop-shadow`** (filter) not `box-shadow` — needed because tooltips often have arrows/notches that should follow the actual silhouette.
- Region tooltip uses the `Flag` component with 16×16 sizing.
- Chart tooltips use the `PlatformAvatar` component with 16×16 sizing.
- Inline color "key bars" are 2×12 rounded rectangles (`bg-[#9747ff] rounded-[2px]` etc.) — no token, just per-series hex.
- Chart series colors observed: `#9747ff` (purple), `#ff9811` (orange), `#15b462` (green/`--fill-green`), `#4285f4` (blue/Google) — these are likely Profound's chart palette.

## New tokens discovered

- `--radius-8`: 8px (used for Explainer tooltip; previously `radius-6` was the only standard)

## Asset URLs

- Screenshot: `https://www.figma.com/api/mcp/asset/2f6de954-1742-4547-93cc-4232265bbd01`
