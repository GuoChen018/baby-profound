# Cursor — `2:8294` (was `1:6858`)

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Cursor"

## Interpretation summary

A **decorative bitmap cursor asset set** — used in marketing illustrations or onboarding mockups to show user pointer state. Four bitmap variants (macOS-style cursors).

## Component API

```tsx
type CursorProps = {
  type?: 'Default' | 'Text' | 'Open hand' | 'Pointing';
  size?: number;     // wrapper is 20×20; the inner bitmap centers
};
```

## Anatomy

Each variant is a 20×20 wrapper containing a centered raster image:

| type | bitmap size | image |
|---|---|---|
| `Default` | 10×17 | macOS arrow |
| `Text` | 8×14 | I-beam |
| `Open hand` | 12×12 | open hand |
| `Pointing` | 12×13 | pointing hand |

## Notes

- Not interactive — purely a static image asset for illustration.
- For real cursor changes in the app, use CSS `cursor: pointer | text | grab | ...`.
- Phase 3: copy the bitmaps to `/public/cursors/` if needed for marketing mockups; otherwise skip.

## Asset URLs

- Screenshot: `https://www.figma.com/api/mcp/asset/5f7ef550-ad47-4b99-bc2e-4cc77d12c290`
