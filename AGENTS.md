<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Baby Profound — agent guide

Sandbox for exploring product ideas grounded in the real Profound product and its design system.

## Repo layout

```
app/                  # Next.js app router routes (one per Profound tab)
  layout.tsx
  globals.css         # @theme tokens, sourced from Figma foundations
  page.tsx            # Overview (the canonical first page)
  explorations/       # Variant prototypes — non-canonical, throwaway-friendly
    [slug]/page.tsx
components/
  ui/                 # Design system primitives (Button, Input, etc.)
  shell/              # App chrome: Sidebar, TopBar, Layout
  <feature>/          # One folder per Profound feature area
lib/
  mockData.ts         # Genericized mock data (no real customer data)
  store.ts            # Zustand stores
  types.ts            # Shared types
  cn.ts               # clsx wrapper
_reference/           # Captured context (the spec). Re-readable on demand.
  profound/           # Live product crawl (auth required)
    sitemap.md
    interactions.md
    <slug>/
      screenshot.png
      snapshot.yaml
      notes.md
  figma/              # Design system extracted from Figma MCP
    README.md         # node-id map for re-fetching any frame
    00-foundations/
    01-components/<name>/
      design-context.md
      screenshot.png
      variants.md
    02-screens/
    icons/
```

## Conventions

- **Tailwind 4 CSS-first.** All tokens live in `app/globals.css` under `@theme`. No `tailwind.config.js`.
- **Spacing scale is 1px/unit** (`--spacing: 1px`). Every Tailwind spacing/sizing utility matches Figma px directly: `h-24 = 24px`, `gap-6 = 6px`, `p-12 = 12px`. This is a deliberate deviation from Tailwind defaults (normally 4px/unit) — it eliminates mental conversion between Figma specs and code.
- **No shadcn/ui.** Primitives are built from scratch in `components/ui/` against captured Figma frames.
- **`clsx` for class merging.** Use `lib/cn.ts` (re-export).
- **Zustand for state.** One slice per feature.
- **`framer-motion` for animation,** **`@/components/ui/icons` for icons** (Figma-extracted SVGs + heroicons solid for conceptual glyphs + heroicons outline for chevrons/arrows), `@floating-ui/react` for popovers/menus.
- **`_reference/` is the source of truth.** Before implementing a page or component, re-read its `_reference/` folder.
- **Never ship real customer data.** Use mock data with Brex/fintech-themed values.
- **Explorations live in `app/explorations/<slug>/`.** They never touch canonical pages. Register every new exploration in `lib/explorations.ts` so it surfaces on the `/explorations` index. The shared `app/explorations/layout.tsx` provides a minimal top-bar — the page itself owns everything below.

## Data + types file layout (per-tab isolation)

- `lib/mockData.ts` — Overview-specific data + shared formatters (`formatCompact`, `formatPercentDelta`, `formatSignedCompact`).
- `lib/types.ts` — shared types (`SignedPercent`, `SignedCount`, `SeriesPoint`, `Platform`, `DateRangePreset`, plus Overview + Opportunity types kept here for back-compat).
- `lib/data/<slug>.ts` — per-tab mock data. Tab-specific.
- `lib/types/<slug>.ts` — per-tab types. Tab-specific.

When building a new tab, put your mock data in `lib/data/<slug>.ts` and your types in `lib/types/<slug>.ts`. Don't touch the top-level shared files unless you're adding genuinely shared concepts.

## Available primitives

`@/components/ui` exports: `Button`, `Tag`, `Badge`, `Toggle`, `SegmentedControl`, `Input`, `Select`, `Tooltip`, `Card`, `Delta`, `Meter`, `Disclosure`, `EmptyState`, `Table`.

`@/components/shell` exports: `Layout`, `Sidebar`, `PageHeader` (page title row), `SectionHeader` (title-outside-card row), `navSections`.

`@/components/opportunities/OpportunityCard` — flat-list opportunity row, reusable across Overview + Opportunities.

`@/components/charts/LineChart` — tiny inline SVG line chart for KPI surfaces.

`@/components/ui/icons` — see file for the full export list. Imports from this module only; never from `@heroicons/react/*` directly.

## Page composition pattern

- Titled cards (What's New, Visibility Score) → use `<Card title=... subtitle=... action=...>` with content inside.
- Section with title OUTSIDE the card (Top Keywords, Top Opportunities, Website Activity) → wrap in `<section className="space-y-20">` with `<SectionHeader>` then the content (Table, list, etc.) below.
- Tables → use `<Table>` compound API (`Table.Head`, `Table.Body`, `Table.Row`, `Table.HeaderCell`, `Table.Cell`).
- Page padding: `mx-auto max-w-1280 px-32 py-24 space-y-32`.

## Capture workflow (Profound)

1. User logs into `platform.tryprofound.com` in a Cursor browser tab.
2. Agent locks the tab, walks each top-level nav tab once.
3. Per tab: `screenshot.png`, `snapshot.yaml`, `notes.md` into `_reference/profound/<slug>/`.
4. Trigger key interactions on the landing view; capture before/after.
5. Do NOT recursively crawl sub-pages — note them in `notes.md` as deferred.

## Capture workflow (Figma)

1. File: `ms5KIXErDeevPJ3a1zIOcr` (Profound-Design-Exercise).
2. Per frame: `get_design_context` → `design-context.md`, `get_screenshot` → `screenshot.png`.
3. Variants/states summarized in `variants.md`.
4. Maintain `_reference/figma/README.md` with the node-id map.

## When building a page

1. Read `_reference/profound/<slug>/` (screenshot + snapshot + notes).
2. Read relevant `_reference/figma/01-components/*` for any primitives used.
3. Build to match the live product behavior. If Figma diverges from live product, follow the live product.
4. Seed `lib/mockData.ts` with new genericized data as needed.
