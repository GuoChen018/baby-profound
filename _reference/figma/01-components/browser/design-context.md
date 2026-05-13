# Browser — `2:8374` (was `1:6938`)

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Browser" (Browser Toolbar)

## Interpretation summary

A **chrome-only mockup of a Safari (Big Sur) browser toolbar** — used to wrap webpage screenshots in marketing/onboarding contexts. Two themes: `Light` and `Dark`. Not a functional component — it's a presentational frame.

## Component API

```tsx
type BrowserProps = {
  url: string;
  theme?: 'Light' | 'Dark';
  children: ReactNode;        // the web content shown beneath the toolbar
};
```

## Anatomy

```
BrowserToolbar: w=1432 (full screen), h=53
  bg: #fafafa (Light) or #191c1f (Dark)
  shadow: drop-shadow 0 0.5 0 rgba(0,0,0,0.15) (Light) or inset border (Dark)
[Traffic lights]: 12×52 close/minimize/fullscreen at left=21 top=20
[Left toolbar group]: 3 items at left=134
[Forward/Back/Sidebar buttons]: at left=92
[URL bar (Search Bar Default)]: centered, left=26.56% right=26.56%, h=28, radius-6
  bg: rgba(0,0,0,0.05) (Light) or #0c0f12 (Dark)
  Lock icon 7.8×11.4 + URL text 13 Regular tracking-tight
  text color: #4c4c4c (Light) or white (Dark)
[Right toolbar group]: 3 items at right=12
```

## Notes

- The toolbar content is **all bitmap images** (`Toolbar Item` images) — Figma is using PNGs of macOS chrome rather than SVG icons. For our app, we'd want to swap with a simplified chrome (or just our own minimal browser frame).
- The actual webpage content is meant to be slotted in below this toolbar — it's a wrapper.
- Use case: mockup illustrations, onboarding screenshots — NOT user-facing in a "real" page.

## Phase 3 recommendation

Skip building this exactly — instead, build a minimal `<BrowserFrame>` that shows traffic lights + URL bar (no fake macOS chrome buttons), themed to `Light/Dark`. Use only when displaying a webpage screenshot.

## Asset URLs

- Screenshot: `https://www.figma.com/api/mcp/asset/dde78764-2849-4a06-ab00-3e28dbe1bc80`
