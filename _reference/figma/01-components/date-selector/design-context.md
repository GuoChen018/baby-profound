# Date Selector — `2:8359` (was `1:6923`)

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Date Selector"

## Interpretation summary

A pre-built date-range picker that wraps a Segmented Control (range presets) and an optional comparison Select pill. Two top-level variants — `Comparison` (segmented + "vs. Prev. period" select) and `Range` (segmented only).

## Component API

```tsx
type DateSelectorProps = {
  variant?: 'Range' | 'Comparison';
  value?: '7d' | '15d' | '30d' | { start: Date; end: Date } | 'Custom';
  comparison?: 'Prev. period' | 'Prev. year' | { start: Date; end: Date };
  onChange?: (value) => void;
};
```

## Anatomy

```
DateSelector: flex gap-8 items-center
[ Segmented Control ]
  - 4 segments: "7d" | "15d" | "30d" | "Custom"   (Range variant uses "Last 7d" | "Last 14d" | "Last 30d" | "Custom")
  - active segment: bg-control-bg, white, "Flat" shadow
  - inactive: bg-bg-secondary, text-tertiary, divided by left border-fill-quaternary
  - radius-4
[ vs Prev container ]  (Comparison only, when showVsPrevContainer)
  - "vs." Body/Mini text-secondary
  - Select pill — bg-control-bg, "Flat" shadow, radius-6, p-6
    - "Prev. period" 13/16 Medium
    - chevron-down 16px (heroicons-micro)
```

## Notes

- Segmented Control is reused from the `segmented-control` component.
- The trailing Select is a smaller variant of the main `Select` component (also "Flat" shadow surface).
- "Custom" segment opens a popover with a date-range calendar (the Dropdown frame contains a calendar variant for this).

## Asset URLs

- Screenshot: `https://www.figma.com/api/mcp/asset/1790c31d-ae76-400b-ae67-bb4803216cd1`
