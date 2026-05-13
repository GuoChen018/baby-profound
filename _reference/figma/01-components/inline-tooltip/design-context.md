# Inline Tooltip — `2:10285` (was `1:8849`)

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Inline tooltip"

## Interpretation summary

A minimal **dark, single-line tooltip** for short helper hints — totally distinct from the rich `Tooltip` (`2:10194`) variants. This is the "Bootstrap-style" hover hint: black pill with white text.

```
bg: --fill-primary (#18181a — flips to white in dark theme!)
text: --text-inverse (white)
font: Body/MiniMedium (12/14 Medium)
padding: px=8 py=6
radius: --radius-4 (4px)
max-width: 200px
no shadow, no border
```

## Component API

```tsx
type InlineTooltipProps = {
  text: string;
  // No state/size variants — single visual treatment.
};
```

## Notable

- `bg-fill-primary` means in dark theme this becomes **white** (and `text-inverse` would need to swap to black). That's likely a Figma quirk — in practice on dark theme, the inline tooltip should stay dark for contrast against the page; you may need a hard-coded `bg-black` rather than the token.
- No tail/arrow in the frame — pure pill.

## Asset URLs

- Screenshot: `https://www.figma.com/api/mcp/asset/797b06b4-ee41-40ef-89b5-bca371d72052`
