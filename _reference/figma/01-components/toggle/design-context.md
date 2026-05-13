# Toggle — `1:8663`

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Toggle"

## Interpretation summary

A standard pill switch (32×20 track, 14×14 knob). Same outer wrapper geometry as Radio/Checkbox (`p-[8px]`, `gap-[8px]`, `radius-6` interactive container with focus ring). Track color flips between `--fill-quaternary` (off) and `--fill-green` (on).

## Component API

```tsx
type ToggleProps = {
  state?: 'Default' | 'Hover' | 'Focus';
  disabled?: boolean;
  toggle?: boolean;                      // on/off
  label?: boolean;
};
```

## Anatomy

```
Outer:   px=8 py=8 gap=8 items-center radius-6
         bg = bg-base (Default/Focus) | control-hover (Hover)
         Focus adds the standard 4-layer focus shadow
Track:   32×20 radius-rounded
         off:           bg-fill-quaternary (#e8e8e8)
         on:            bg-fill-green (#15b462)
         on Hover:      bg-fill-green-hover (#01a04e)   ← NEW token!
         disabled adds opacity-30 to the track
Knob:    14×14 absolute, top-3
         off:  left-3,  bg-bg-base (white)
         on:   left-15, bg-fill-inverse (white)
Label:   13/16 Medium · text-primary
         disabled: same Medium weight but text-quaternary (different from Radio which switched to Regular)
```

## Variant matrix

`state` (3) × `disabled` (2) × `toggle` (2) × `label` (2) = 24 leaf variants.

## New tokens discovered

- `--fill-green-hover`: `#01a04e` — only used on toggle Hover state (not in the Color frame!)

## Asset URLs

- Screenshot: `https://www.figma.com/api/mcp/asset/9e403275-2feb-4c5c-a70e-18c03bdf4fe3`
