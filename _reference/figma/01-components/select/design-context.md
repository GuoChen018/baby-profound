# Select — `1:8431`

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Select"

## Interpretation summary

A **filter-pill / facet-selector** style trigger button (NOT a native HTML `<select>`). It's the chip you click to open a dropdown — think "Engine ▼", "Platform ▼" pills at the top of a Profound query results table. The trigger is small, has an optional leading icon, an optional **counter badge** (showing how many filters are active), and a chevron. When `state="Active"` it inverts to a black pill.

## Component API

```tsx
type SelectProps = {
  size?: 'Small' | 'Default';            // 14px or 16px icon, 12 or 13 label
  state?: 'Default' | 'Hover' | 'Focus' | 'Active';
  type?: 'Mono' | 'Multi';               // Mono = chevron-up-down icon (single select), Multi = chevron-down (multi)
  leftIcon?: boolean;
  counter?: boolean;                     // small numeric pill showing active count
};
```

## Anatomy

```
[ leftIcon (16/14) ][ Label (13/12 Medium, --text-primary) ][ counter pill ][ chevron ]
```

- Padding: Default `p-[6px]`, Small `px-[6px] py-[5px]`
- Gap between icon group and chevron group: 8px
- Inner gap (icon ↔ label): 5px (with extra `pl-[2px]` on label)
- Radius: `--radius-6`
- Counter pill: `bg-[--fill-quaternary]` rounded-`--radius-rounded` (10000px), 16×16 (Default) / 14×14 (Small), text 10/14 Medium `--text-secondary`
- Active state: `bg-[--control-primary]` (black), `--text-inverse` text, counter inverts to `bg-[--fill-inverse]` (white) with `--text-primary` numeral

## States

| State | Bg | Shadow |
|---|---|---|
| Default | `--control-bg` | `Flat` |
| Hover | `--control-hover` | `Flat` |
| Focus | `--control-bg` | `Flat` + `Focus ring` |
| Active | `--control-primary` (black) | `Flat` |

## New tokens discovered

- `--radius-rounded` = `10000px` — for fully circular/pill shapes
- `--fill-inverse` = white (used for counter on Active black pill)

## Asset URLs

- Screenshot: `https://www.figma.com/api/mcp/asset/867e4677-0f82-41fb-8631-e3a8d3f38933` (1280×800)
- chevron-up-down: `https://www.figma.com/api/mcp/asset/6efa25a3-82ec-4fec-8e8e-2c28ee57c37f`
- chevron-down: `https://www.figma.com/api/mcp/asset/06d9499a-9fcf-4aa8-bf7f-51148ca90e2f`
