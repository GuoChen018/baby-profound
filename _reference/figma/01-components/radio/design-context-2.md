# Checkbox — `1:8243` (mis-labeled in README as "Radio (2)")

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Checkbox"

> **Frame is actually `Checkbox`, not Radio.** The README labels this as "Radio (2)" because the second frame in the system sits visually next to Radio in the Figma layout. The Figma frame name is "Checkbox" and the component is `Checkbox`.

## Interpretation summary

A checkbox with the same wrapper geometry as Radio (`1:8193`) — they're built as a sibling pair, intentionally identical except for the control shape:

- **Radio**: `rounded-rounded` (circle), filled with a centered dot when selected
- **Checkbox**: `radius-4` (square), filled `--fill-primary` (black) with a 10×10 white check (heroicons-micro/check) when selected

## Component API

```tsx
type CheckboxProps = {
  state?: 'Default' | 'Hover' | 'Focus';
  disabled?: boolean;
  label?: boolean;
  checkbox?: boolean;                    // selected state
};
```

## Anatomy

```
Outer: identical to Radio (px=6 py=6 h=24, gap=8, radius-6, bg/focus same as Radio)
Control: 12×12  radius-4
         off:  border-[1.5px] border-fill-tertiary
         on:   bg-fill-primary + 10×10 heroicons-micro/check (white) centered
         disabled: opacity-20 on the control (both off and on)
Label: identical to Radio
```

## Notable difference from Radio

- Disabled state actually uses **`opacity-20`** on the control (Radio doesn't appear to dim its control — only the label color shifts).

## Asset URLs

- Screenshot: `https://www.figma.com/api/mcp/asset/eb9da0b5-a161-47b1-9e31-8b8acb0cb889`
- Check stroke: `https://www.figma.com/api/mcp/asset/0f7cac40-e675-4f5f-b9fb-9d57898ab8f5`
