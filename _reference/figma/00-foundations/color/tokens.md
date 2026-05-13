# Color tokens — Profound design system

**Source**: Figma frame `1:9983` ("Color")
**Themes**: Two — `Light` and `Dark`. The frame ships every semantic token in both modes.
**Naming**: Semantic, not palette-based. Tokens are grouped by category prefix (`bg`, `fill`, `control`, `text`).

## All tokens (19)

| Token | Light | Dark |
|---|---|---|
| `bg-primary` | `#ffffff` | `#1e1e1e` |
| `bg-secondary` | `#fafafa` | `#252525` |
| `bg-tertiary` | `#f5f5f5` | `#343434` |
| `fill-primary` | `#18181a` | `#ffffff` |
| `fill-secondary` | `#969696` | `#5a5a5a` |
| `fill-tertiary` | `#d4d4d8` | `#464646` |
| `fill-quaternary` | `#e8e8e8` | `#323232` |
| `fill-green` | `#15b462` | `#15b462` |
| `fill-red` | `#ff5f57` | `#ff5f57` |
| `control-bg` | `#ffffff` | `#292929` |
| `control-hover` | `#fafafa` | `#333333` |
| `control-selected` | `#f1f1f1` | `#393939` |
| `control-primary` | `#18181a` | `#18181a` |
| `text-primary` | `#18181a` | `#ffffff` |
| `text-secondary` | `#787878` | `#787878` |
| `text-tertiary` | `#969696` | `#969696` |
| `text-quaternary` | `#b4b4b4` | `#5a5a5a` |
| `text-green` | `#15b462` | `#15b462` |
| `text-red` | `#ff5f57` | `#ff5f57` |

## Categories

### `bg-*` — Page / surface backgrounds (3)
Three layered surfaces (canonical "primary/secondary/tertiary" pattern). In light: white → near-white → light grey. In dark: near-black with subtle steps up.

### `fill-*` — Foreground / icon / divider fills (6)
Inverted semantics relative to `bg`: `fill-primary` is the strongest contrast (near-black on light, white on dark). `fill-quaternary` is the lightest divider (`#e8e8e8` light). `fill-green` (`#15b462`) and `fill-red` (`#ff5f57`) are theme-stable status fills.

### `control-*` — Form/button surface tokens (4)
- `control-bg`: default control surface
- `control-hover`: subtle hover wash
- `control-selected`: subtle pressed/selected wash
- `control-primary`: high-emphasis filled control (always near-black `#18181a` in both themes — i.e. dark primary buttons sit on dark backgrounds and stay dark)

### `text-*` — Text colors (6)
Four neutral steps (`primary` → `quaternary`) plus `text-green` and `text-red` for status. `text-secondary` and `text-tertiary` are theme-invariant — Profound uses the same mid-grey for body emphasis levels in both modes.

## Notable observations

1. **Status colors are theme-stable.** `fill-green`, `fill-red`, `text-green`, `text-red` use the same hex in both themes — same applies to `control-primary` (always `#18181a`).
2. **`fill-*` flips on theme** — `fill-primary` is `#18181a` in light but `#ffffff` in dark. So "fill" semantically means "ink against the page".
3. **No accent / brand color in this frame.** No blue, no purple. The system is intentionally chromatic-neutral; status uses green/red only. Brand color (if any) lives in the logo, not in tokens.
4. **`bg-*` and `control-bg` overlap in light** (both `#ffffff`) but diverge in dark (`#1e1e1e` vs `#292929`), so controls sit slightly higher than the page.
5. **No alpha tokens** in the frame (all are opaque hex). Translucency, if needed, is computed at usage site.

## Tailwind 4 `@theme` mapping (Phase 3 target)

```css
@theme {
  /* Backgrounds — surface layers */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #fafafa;
  --color-bg-tertiary: #f5f5f5;

  /* Fills — ink/icon/divider */
  --color-fill-primary: #18181a;
  --color-fill-secondary: #969696;
  --color-fill-tertiary: #d4d4d8;
  --color-fill-quaternary: #e8e8e8;
  --color-fill-green: #15b462;
  --color-fill-red: #ff5f57;

  /* Controls */
  --color-control-bg: #ffffff;
  --color-control-hover: #fafafa;
  --color-control-selected: #f1f1f1;
  --color-control-primary: #18181a;

  /* Text */
  --color-text-primary: #18181a;
  --color-text-secondary: #787878;
  --color-text-tertiary: #969696;
  --color-text-quaternary: #b4b4b4;
  --color-text-green: #15b462;
  --color-text-red: #ff5f57;
}

/* Dark theme overrides — apply via .dark class or [data-theme="dark"] */
.dark {
  --color-bg-primary: #1e1e1e;
  --color-bg-secondary: #252525;
  --color-bg-tertiary: #343434;
  --color-fill-primary: #ffffff;
  --color-fill-secondary: #5a5a5a;
  --color-fill-tertiary: #464646;
  --color-fill-quaternary: #323232;
  --color-control-bg: #292929;
  --color-control-hover: #333333;
  --color-control-selected: #393939;
  --color-text-primary: #ffffff;
  --color-text-quaternary: #5a5a5a;
  /* fill-green, fill-red, control-primary, text-{secondary,tertiary,green,red} are theme-stable */
}
```
