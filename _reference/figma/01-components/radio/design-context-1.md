# Radio — `1:8193` (the actual Radio button)

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Radio"

## Interpretation summary

A standard radio button with optional label, all wrapped in an interactive `--radius-6` container that adopts the system's focus ring. The radio control itself is 12×12 with a 1.5px `--fill-tertiary` ring (off) or a filled circular dot (on, asset: `imgRadio`).

## Component API

```tsx
type RadioProps = {
  state?: 'Default' | 'Hover' | 'Focus';
  disabled?: boolean;
  label?: boolean;
  radio?: boolean;                       // selected state
};
```

## Anatomy

```
Outer:  px=6 py=6 h=24  flex gap=8 items-center  rounded-radius-6
        bg = bg-base | control-hover (Hover) | bg-base + focus ring (Focus)
Control: 12×12  rounded-radius-rounded
         off:  border-[1.5px] border-fill-tertiary
         on:   filled with circular dot SVG (imgRadio)
Label: 13/16 Medium · text-primary
       (disabled: 13/16 Regular · text-quaternary)
Disabled: opacity not used here; just label color shifts (and label hidden on the disabled-no-label variant)
```

## Variant matrix

`state` (3) × `disabled` (2) × `radio` (2) × `label` (2) = 24 leaf variants.

## Asset URLs

- Screenshot: `https://www.figma.com/api/mcp/asset/b7a94bee-569e-49d8-a6ef-e501dfee2326`
- Selected dot: `https://www.figma.com/api/mcp/asset/8e6fce65-3535-43d1-a2bb-3cf4da9b6112`
