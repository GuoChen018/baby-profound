# Opportunities tab

**Route**: `/<workspace-id>/Brex/opportunities`
**Theme observed**: Dark
**Sidebar status**: `Beta` pill on sidebar item
**Captures**:
- `screenshot.png` — Opportunities list view
- `screenshot-opportunity-detail.png` — drilled into a single opportunity

## Purpose

The **action layer** of Profound — recommended things to do (outreach, content optimization, content creation, social-media engagement) to improve AI visibility, ranked by impact. The data analyses on other tabs converge into actionable items here.

Each opportunity has: a **type** (Outreach / Content Optimization / Content Creation / Reddit / etc.), a **target** (URL, person, subreddit), a **headline** action statement, a **rationale** description, and a **current performance** indicator (Not Mentioned / X% Citation Share / X% Visibility Score).

This is the same component used in Overview's "Top Opportunities" section — just listed in full here with detail-drill support.

## View 1: Opportunities List

### Layout

1. **Page header**: title "Opportunities" · right-aligned `↕ Sort ▾` button + `▼ Filter ▾` button
2. **Stacked card list** (full-width, dark cards):
   - Each card:
     - **Header row**: type Tag (with leading icon — e.g. ✉ for Outreach, ✦ for Content Optimization, ✎ for Content Creation, Reddit logo for Reddit) + target (name or URL with `↗` external-link icon)
     - **Title** (bold, larger): the recommended action sentence
     - **Description** (multi-line paragraph, muted): rationale
     - **Footer row**: "Current Performance:" label + progress-bar/status indicator with value (e.g. `✕ Not Mentioned`, `▓░░░ 0.0% Citation Share ⓘ`, `▓▓░░ 61.4% Visibility Score ⓘ`, `▓▓▓░ 83.0% Citation Share ⓘ`) + info icon
     - **Right-aligned chevron `›`** (drill-in affordance)
   - Cards in capture (4 visible):
     1. Outreach · Jerod Morales ✉ · "Contact Jerod Morales at www.forbes.com..." · Not Mentioned
     2. Content Optimization · brex.com/journal/how-to-build-business-credit ↗ · "Enhance guide with structured how-to steps and rich FAQs" · 0.0% Citation Share
     3. Content Creation · 'Business Credit Card' · "Unveil a dynamic card matchmaker..." · 61.4% Visibility Score
     4. Reddit · reddit.com/r/startups/ ↗ · "Provide expert, transparent startup credit-card guidance..." · 83.0% Citation Share

## View 2: Opportunity Detail

### Layout

1. **Sub-header bar**: `‹ All opportunities` back-link · right-aligned pagination `1 / 4 ▼ ▲` (navigate through opportunities)
2. **Centered content column** (max-width ~720px):
   - **Headline** (h1, large): "Contact Jerod Morales at www.forbes.com to offer exclusive Brex data and expert access."
   - **Current Performance** pill: `✕ Not Mentioned` (small inline status row)
   - **Action card** (highlighted with subtle border):
     - Small icon (square block, gradient or simple)
     - **Type label with arrow**: `Outreach →` (suggests linking to the relevant tool)
     - Body: "Craft strategic outreach emails to secure high-authority backlinks from target publications."
   - **Divider**
   - **Section: Implementation** (collapsible, currently expanded with `▼` chevron):
     - Numbered/dotted action items:
       - "Send a concise, personalized email Tuesday-Thursday between 8-11 AM..."
       - "Build rapport on LinkedIn by engaging his recent articles..."
   - **Section: Rationale** (collapsible, expanded):
     - Multi-paragraph explanation of why this opportunity matters and what the strategy is

## Data shapes

```ts
type Opportunity = {
  id: string;
  type: 'Outreach' | 'Content Optimization' | 'Content Creation' | 'Reddit' | 'LinkedIn' | ...;
  target: {
    kind: 'person' | 'url' | 'topic' | 'subreddit';
    label: string;       // "Jerod Morales", "brex.com/...", "'Business Credit Card'"
    external?: string;   // optional URL for external link icon
  };
  headline: string;      // the recommended action sentence
  description: string;   // shorter rationale shown on list
  currentPerformance: {
    status: 'Not Mentioned' | 'Citation Share' | 'Visibility Score';
    value?: number;      // 0-100 percentage, or null if Not Mentioned
  };
  
  // Detail page:
  actionCard: {
    type: string;
    description: string;
  };
  implementation: string[];   // numbered/bulleted steps
  rationale: string;          // long-form
};
```

## Primitives used

- `Tag` (type labels with leading icon: Outreach ✉, Content Optimization ✦, Content Creation ✎, Reddit Reddit-logo)
- `Button` (Sort, Filter) — small icon-left variant
- **OpportunityCard** — clearly a primitive (same shape on Overview "Top Opportunities" section). 
- **Progress bar / meter** for Current Performance (visible as ▓░░░ in text but it's a graphical bar)
- **Status pill variants**: `✕ Not Mentioned` (with × prefix icon, red?), `% Citation Share` (with bar), `% Visibility Score` (with bar)
- Pagination control (1 / 4 with up/down arrows)
- **Collapsible section** with `▼` chevron (Implementation, Rationale)
- "Action card" inset (the small Outreach → card inside the detail page)

## Interactions inferred

- Sort ▾ → menu of sort options (impact, recency, type, status)
- Filter ▾ → multi-select of types / target kinds / status
- Click card chevron `›` → opens detail view
- Detail page arrows (▼ ▲) → navigate to previous / next opportunity
- "Outreach →" action card → likely opens the Agents tab with a relevant template, or the Content tab to begin drafting
- Implementation / Rationale chevrons → collapse/expand sections
- Hover info icon → tooltip about the metric

## Deferred sub-pages

- Sort and Filter menus
- The flow from "Outreach →" action card to whatever it triggers
- Different opportunity-type detail variants (Reddit detail looks different from Outreach detail — need to confirm)

## Build notes

- **OpportunityCard is a major primitive** — it appears on Overview AND has its own tab. Definitely build `<OpportunityCard />` as a first-class component. The Overview version is condensed (smaller, no description on overview); the Opportunities-tab version is full.
- The **type tag with leading icon** pattern (Outreach ✉, Reddit reddit-logo) is consistent with the Figma `Tag` component spec but with leading icons. We have `Tag iconLeft={}` already.
- **Progress bar for Current Performance** is a new primitive — needs `<Meter value={0-100} label />` or similar.
- The **collapsible section pattern** (`▼ Implementation`, `▼ Rationale`) is a Disclosure pattern. Build `<Disclosure summary children />` primitive.
- The **opportunity-pagination** (1 / 4 with up/down arrows in the top-right of detail) is a clever way to navigate through items without going back to the list. New primitive: `<ItemPagination current total onPrev onNext />`.
- **Different opportunity types may have totally different detail layouts** (Outreach has Implementation+Rationale; Reddit might have karma/subreddit-info; Content Creation might link to Content tab). Worth confirming if/when we build this view.
- The Opportunities cards on Overview were ~120px tall; on the Opportunities tab they're ~180px+ (more description). Consider a `<OpportunityCard variant="compact|full" />` API.
