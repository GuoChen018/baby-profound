# Toast — `2:10155` (was `1:8719` in stale README)

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Toast"

> Note: README's `1:8719` is stale. The current node ID is `2:10155`. The MCP returned "node not found" for the old ID.

## Interpretation summary

A 384px-wide notification card with four type variants. Each renders the same outer chrome — white surface, 1px border `--fill-quaternary`, `radius-6`, large `High` drop shadow (`0 16 32 shadow-2` + `0 0 5 shadow-1`) — but swaps the content + leading icon + bottom progress bar color per type.

## Component API

```tsx
type ToastProps = {
  type?: 'Default' | 'Success' | 'Alert' | 'Beta';
  bodyText?: boolean;
  icon?: boolean;                        // shown for Success and Alert (Default uses no icon, Beta uses a Pill)
  timeDetractor?: boolean;               // bottom progress bar (auto-dismiss timer)
};
```

## Anatomy

```
Card: 384w · radius-6 · border-1 fill-quaternary · bg-bg-primary
      shadow "High": 0 16 32 shadow-2 + 0 0 5 shadow-1
      flex gap-16 items-center p-16
[ leading slot ]
  - Default: nothing
  - Success: 16px check-circle (heroicons-micro)
  - Alert: 16px exclamation-triangle (heroicons-micro)
  - Beta: a "Beta" pill — bg rgba(0,154,255,0.1) · text #009aff · radius-4 · py-2 px-6 · 12/14 Medium
[ copy block ]
  - Title: Body/Regular (14/1.4) Medium · text-primary
  - Body (optional): Body/Small (13/16) Regular · text-secondary
[ trailing button(s) ]
  - Default/Success/Alert: single x-mark close button (28×28 max, p-y6 px-8, radius-6)
  - Beta: pencil-square (edit feedback) + x-mark close
[ time progress bar (optional) ]
  - 277px wide, 3px tall, rounded-99px, position absolute bottom-left
  - color: --fill-tertiary (Default/Beta), --fill-green (Success), --fill-red (Alert)
```

## New tokens / values discovered

- `High` shadow effect = `0 16 32 shadow-2` + `0 0 5 shadow-1` — a much taller drop than `Flat`. Used by Toast and Tooltip.
- Beta pill uses **brand blue** `#009aff` (one-off; not a tokenized color)

## Variant matrix

`type` (4) × `bodyText` (2) × `icon` (2) × `timeDetractor` (2) ≈ 32 leaf variants.

## Asset URLs

- Screenshot: `https://www.figma.com/api/mcp/asset/f70982ad-680a-4a2c-b295-85711cd61168`
