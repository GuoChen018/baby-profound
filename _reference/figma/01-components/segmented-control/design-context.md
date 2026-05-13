# Segmented Control — `1:8293`

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Segmented control"

## Interpretation summary

A compact horizontal toggle group — all-segments-equal-width inside a `radius-4` container. The selected segment "lifts" to white with the standard `Flat` 3-layer shadow stack; unselected segments sit on `--bg-secondary` with a 1px left divider between each.

This is the time-range / interval selector used in chart headers (`1d / 7d / 28d / 90d / 1y / All`).

## Component API

```tsx
type SegmentedControlProps = {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  width?: number | 'fluid';              // observed at 240px in the frame
};

type SegmentProps = {
  selected: boolean;
};
```

## Anatomy

```
Container: bg-bg-primary  radius-4  shadow-Flat (1px hairline + 2 drops)  w=240 (observed)
           flex items-center  with each Segment flex-1
Segment (selected):
  bg-control-bg + Flat shadow (renders as a "lifted" tile)
  text: Body/SmallMedium 13/16 Medium · text-primary
  no left border
Segment (unselected):
  bg-bg-secondary
  text: Body/Small 13/16 Regular · text-tertiary (or text-quaternary in some renderings)
  border-l 1px fill-quaternary
Padding (each): px=12 py=6
```

## Variant matrix

A single-prop boolean: `state` (selected/unselected). The visual variation comes from how segments are composed inside the parent control.

## Notable

- The selected segment **uses the same `Flat` shadow as Buttons/Inputs** — it's not just a color shift, it's a depth shift. The 1px `shadow-3` border around the selected tile sits on top of the container's own `shadow-3` border, creating the "raised" feel.
- No icon-only segment variant in the frame (text-only), but adding one would just reuse the Button anatomy.

## Asset URLs

- Screenshot: `https://www.figma.com/api/mcp/asset/b7bffd9a-fa21-4444-a845-e7259b1ede5f`
