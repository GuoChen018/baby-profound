# Text styles — variants

Text system uses **Inter Variable** (UI) and **Inter** Regular at 80px (display headlines). Two-column layout in the frame demonstrates each style in **Medium/SemiBold** and **Regular** weights.

## Families × sizes

- **Display** — `Display1`: 80/80/-5.25 (Inter Regular)
- **Title** — three sizes, each with SemiBold + Regular weights:
  - `Regular` 28/32/-0.25
  - `Small` 24/32/-0.25
  - `Mini` 18/24/0
- **Body** — four sizes, each with Medium + Regular weights (Micro is Medium-only):
  - `Regular` 14 / line-height ratio 1.4
  - `Small` 13/16
  - `Mini` 12/14
  - `Micro` 10/14 (Medium only)

## Weight axes observed

- Title: SemiBold (600) and Regular (400)
- Body: Medium (500) and Regular (400)
- Display: Regular (400) only

## Global font features

All UI text enables `'ss03' 1, 'cv08' 1, 'lnum' 1, 'tnum' 1` (alt-3, alt-cv08, lining numerals, tabular numerals). The 80px display only enables `'ss03' 1`.

## Mapping suggestion (Phase 3 — Tailwind 4 `@theme`)

```css
--font-display: "Inter", system-ui, sans-serif;
--font-sans:    "Inter Variable", "Inter", system-ui, sans-serif;

--text-display-1: 5rem; /* 80px */
--text-title-lg:  1.75rem; /* 28px */
--text-title-md:  1.5rem;  /* 24px */
--text-title-sm:  1.125rem; /* 18px */
--text-body:      0.875rem; /* 14px */
--text-body-sm:   0.8125rem; /* 13px */
--text-body-mini: 0.75rem;  /* 12px */
--text-body-micro: 0.625rem; /* 10px */
```
