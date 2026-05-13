# Text style tokens — Profound design system

**Source**: Figma frame `1:3020` ("Text styles")
**Font**: Inter Variable (UI) + Inter (Regular only, used for the 80px display marketing headline)
**Global font features**: `'ss03' 1` everywhere; UI text additionally enables `'cv08' 1, 'lnum' 1, 'tnum' 1` (lining + tabular numerals + stylistic alternates).

## Token table

| Token | Family / Style | Size | Weight | Line height | Letter spacing | Notes |
|---|---|---|---|---|---|---|
| `Desktop/Display1` | Inter / Regular | 80 | 400 | 80 | -5.25 | Marketing-only headline |
| `Title/RegularSemibold` | Inter Variable / SemiBold | 28 | 600 | 32 | -0.25 | Page H1 (rare) |
| `Title/SmallSemibold` | Inter Variable / SemiBold | 24 | 600 | 32 | -0.25 | Page title ("Overview"), big stat values |
| `Title/Small` | Inter Variable / Regular | 24 | 400 | 32 | -0.25 | rarely used |
| `Title/MiniSemibold` | Inter Variable / SemiBold | 18 | 600 | 24 | 0 | Section title ("Visibility Score") |
| `Title/Mini` | Inter Variable / Regular | 18 | 400 | 24 | 0 | rare |
| `Body/RegularMedium` | Inter Variable / Medium | 14 | 500 | 1.4 (ratio) | 0 | Toast titles |
| `Body/Regular` | Inter Variable / Regular | 14 | 400 | 1.4 (ratio) | 0 | Section subtitles, body text |
| `Body/SmallMedium` | Inter Variable / Medium | 13 | 500 | 16 | 0 | Buttons, tabs, selects, chart labels (most common UI text) |
| `Body/Small` | Inter Variable / Regular | 13 | 400 | 16 | 0 | Toast body, tooltip body, list item text |
| `Body/MiniMedium` | Inter Variable / Medium | 12 | 500 | 14 | 0 | Pills, badges, sidebar section headers |
| `Body/Mini` | Inter Variable / Regular | 12 | 400 | 14 | 0 | Date selector "vs.", placeholders |
| `Body/MicroMedium` | Inter Variable / Medium | 10 | 500 | 14 | 0 | Sidebar `/` key hint, super-tiny labels |

Additional ad-hoc styles observed in components (not in foundation frame):

| Used at | Family / Style | Size | Weight | Line height |
|---|---|---|---|---|
| Citation snippet body | Inter Variable / Regular | 13 | 400 | 1.7 (ratio) | `Paragraph/Small` — explainer/citation tooltip |
| Beta pill text | Inter Variable / Medium | 12 | 500 | 14 | uses brand blue `#009aff` |

## Tailwind 4 `@theme` mapping (Phase 3 target)

```css
@theme {
  --font-sans: "Inter Variable", "Inter", ui-sans-serif, system-ui, sans-serif;

  /* Body sizes */
  --text-micro: 10px;       --text-micro--line-height: 14px;
  --text-mini: 12px;        --text-mini--line-height: 14px;
  --text-small: 13px;       --text-small--line-height: 16px;
  --text-base: 14px;        --text-base--line-height: 1.4;
  --text-paragraph: 13px;   --text-paragraph--line-height: 1.7;

  /* Title sizes */
  --text-title-mini: 18px;     --text-title-mini--line-height: 24px;
  --text-title-small: 24px;    --text-title-small--line-height: 32px;  /* tracking -0.25 */
  --text-title-regular: 28px;  --text-title-regular--line-height: 32px;
  --text-display: 80px;        --text-display--line-height: 80px;       /* tracking -5.25 */
}

/* Apply globally */
html, body {
  font-family: var(--font-sans);
  font-feature-settings: 'ss03' 1, 'cv08' 1, 'lnum' 1, 'tnum' 1;
}
```

## Notes

- `Body/Regular` and `Body/RegularMedium` use **unitless line-height 1.4**, not a px value. Use `leading-[1.4]` in Tailwind.
- All Title sizes have `letter-spacing: -0.25` (small) or `-5.25` (display). Use `tracking-[-0.25px]` etc.
- Inter Variable is required as a webfont; use `next/font` or `@fontsource-variable/inter` with `weight: '100 900'`.
- The `cv08` feature swaps the lowercase `l` for a tailed variant — Profound's signature numeral/letter style.
