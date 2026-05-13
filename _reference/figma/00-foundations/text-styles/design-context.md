# Text Styles — `1:3020`

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Text styles"

## Interpretation summary

The Profound text system is built on **Inter Variable** (with a fallback Display style on plain "Inter" Regular at 80px for marketing display headers). It's organized in three main families: **Display**, **Title**, and **Body**, each with size variants (Regular / Small / Mini / Micro). Most styles ship in two weights: **Regular (400)** and **Medium (500) or SemiBold (600)**. The frame uses CSS variables `--text-primary` (`#18181a`), `--text-tertiary` (`#969696`), `--bg-base` (white), `--bg-tertiary` (`#f5f5f5`) and `--fill-quaternary` (`#e8e8e8`), suggesting the same `text-*` and `bg-*` semantic naming will appear in the Color frame.

Notable details:
- All sizes use Inter Variable; the only "Inter" (non-variable) usage is the 80px display headline.
- Body sizes use `leading: 1.4` (a unitless ratio) rather than fixed line heights — meaningful for Tailwind `leading-[1.4]` vs `leading-5/6` choices.
- Several `fontFeatureSettings` stack `'ss03'`, `'cv08'`, `'lnum'`, `'tnum'` — Profound enables tabular/lining numerals and stylistic alternates globally on UI text.
- Title sizes have negative letter-spacing (-0.25 to -5.25 for the display).

## Token table (extracted from "These styles are contained in the design")

| Token | Family / Style | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| `Desktop/Display1` | Inter / Regular | 80 | 400 | 80 | -5.25 |
| `Title/RegularSemibold` | Inter Variable / SemiBold | 28 | 600 | 32 | -0.25 |
| `Title/SmallSemibold` | Inter Variable / SemiBold | 24 | 600 | 32 | -0.25 |
| `Title/Small` | Inter Variable / Regular | 24 | 400 | 32 | -0.25 |
| `Title/MiniSemibold` | Inter Variable / SemiBold | 18 | 600 | 24 | 0 |
| `Title/Mini` | Inter Variable / Regular | 18 | 400 | 24 | 0 |
| `Body/RegularMedium` | Inter Variable / Medium | 14 | 500 | 1.4 (ratio) | 0 |
| `Body/Regular` | Inter Variable / Regular | 14 | 400 | 1.4 (ratio) | 0 |
| `Body/SmallMedium` | Inter Variable / Medium | 13 | 500 | 16 | 0 |
| `Body/Small` | Inter Variable / Regular | 13 | 400 | 16 | 0 |
| `Body/MiniMedium` | Inter Variable / Medium | 12 | 500 | 14 | 0 |
| `Body/Mini` | Inter Variable / Regular | 12 | 400 | 14 | 0 |
| `Body/MicroMedium` | Inter Variable / Medium | 10 | 500 | 14 | 0 |

## Reference React + Tailwind code

```tsx
const imgFrame1597884067 = "https://www.figma.com/api/mcp/asset/57d91c77-ab10-4d0c-81df-77f4c2b4f836";

export default function TextStyles() {
  return (
    <div className="bg-[var(--bg-base,white)] content-stretch flex flex-col items-start overflow-clip relative rounded-[16px] size-full" data-node-id="1:3020" data-name="Text styles">
      <div className="border-[var(--fill-quaternary,#e8e8e8)] border-b border-solid h-[120px] overflow-clip relative shrink-0 w-full" data-node-id="1:3021">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[80px] left-[24px] not-italic text-[80px] text-[color:var(--text-primary,#18181a)] top-[24px] tracking-[-4.2px] whitespace-nowrap" data-node-id="1:3022" style={{ fontFeatureSettings: "'ss03' 1" }}>
          Text styles
        </p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[88px] items-start min-h-px overflow-clip px-[24px] py-[32px] relative w-full" data-node-id="1:3023">
        {/* Title family — Regular (28/32, -0.25), Small (24/32, -0.25), Mini (18/24, 0) — each in SemiBold and Regular */}
        {/* Body family — Regular (14/1.4), Small (13/16), Mini (12/14), Micro (10/14) — each in Medium and Regular */}
      </div>
      <div className="bg-[var(--bg-tertiary,#f5f5f5)] h-[80px] overflow-clip relative shrink-0 w-full" data-node-id="1:3077">
        <p>System & Components</p>
      </div>
    </div>
  );
}
```

> Full markup omitted from this archived copy — the type-style table above is the authoritative spec. Re-fetch via `get_design_context` against `1:3020` if the full block is needed.

## Asset URLs (7-day expiry from capture)

- Logo image at footer: `https://www.figma.com/api/mcp/asset/57d91c77-ab10-4d0c-81df-77f4c2b4f836`
- Screenshot: `https://www.figma.com/api/mcp/asset/c76ab04b-4ddb-4798-8015-b6552d0cfbdd` (1500×1980 PNG)

## CSS variables observed (foreshadowing color tokens)

- `--bg-base` → white
- `--bg-tertiary` → `#f5f5f5`
- `--fill-quaternary` → `#e8e8e8`
- `--text-primary` → `#18181a`
- `--text-tertiary` → `#969696`
