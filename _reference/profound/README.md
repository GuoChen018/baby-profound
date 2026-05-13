# Profound capture — live product

**Source**: `https://platform.tryprofound.com/`
**Auth required**: yes (user logs in first; agent then locks the tab and walks each top-level nav tab once).

## Scope

- Capture each **top-level nav tab** once (5-10 pages).
- Do NOT recursively crawl sub-pages — note them in the tab's `notes.md` under a "Deferred" section.
- For the landing view of each tab, trigger obvious interactions (filters, dropdowns, modals, hovers) and capture before/after.

## Per-tab layout

```
<slug>/
  screenshot.png       # full viewport (browser_take_screenshot)
  snapshot.yaml        # aria/DOM (browser_snapshot)
  notes.md             # purpose, sections, data shapes, deferred sub-pages
  interactions/        # before/after captures for triggered interactions
    <interaction>/
      before.png
      after.png
      notes.md
```

## Top-level docs

- `sitemap.md` — every captured tab + the deferred sub-page list
- `interactions.md` — cross-page patterns (nav, command-k, toasts, etc.)
