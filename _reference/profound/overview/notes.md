# Overview tab

**Route**: `/<workspace-id>/Brex/overview` (default landing page)
**Theme observed**: Dark
**Capture**: full-page CleanShot scrolling capture, May 13 2026

## Purpose

The "homepage" of a Profound workspace. Surfaces what changed in the AI visibility landscape for the brand over the selected time period — combining an AI-generated narrative summary, the headline KPI (Visibility Score) with its trend, signal on website crawler activity, top-volume keywords, and recommended actions.

## Layout (top to bottom)

1. **Page header**: title "Overview" (left) · date range button "Last 7 Days" with chevron (right).
2. **What's New** + **Visibility Score** — two-up grid:
   - **What's New** (left): AI-summarized narrative. Bold title ("Brex Maintains Top AI Visibility Despite Slight Decline and Decreasing Citation Share"), body paragraph synthesizing trends, footer credit "Summarized by Profound at May 13, 12:46 AM"
   - **Visibility Score** (right): big KPI `78.5%` with delta indicator `-1.3%` (red), 3 icon buttons (top right — looks like download/chart-type/trend toggle), and a line chart with x-axis dates (May 6 → May 12) and y-axis percentages (~76% → 80%)
3. **Website Activity** section: subtitle "How AI bots index, score, and surface your site". Right-aligned "Website ↗" button. Below is a large dark panel with a centered illustration (browser-frame mockup with `ramp.com` URL + a small line chart) and CTA copy "See how AI bots crawl and evaluate your site" + "Configure Website" button. This is an empty/onboarding state — not yet configured.
4. **Top Keywords** section: subtitle "High volume queries lowering AI mentions in your space". Right-aligned "Prompt Volumes ↗" button. Table below with columns: Keyword (sortable), Prompt Volume (sortable). Rows show keyword + volume + delta (e.g. "acquisition news 1.4k -58%", "business credit card 19.6k -4.2%", "compliance risk 58.1k -5.2%", "expense management 10.9k -1.3%"). Mix of positive and negative deltas. Subtle dividers between rows.
5. **Top Opportunities** section: subtitle "High impact opportunities with the biggest AI visibility needs". Right-aligned "Opportunities ↗" button. Cards (two visible in capture):
   - Card 1: Tag "Outreach" + small profile thumbnail "Jared Morales ▾". Body: "Contact Jared Morales at www.forbes.com to offer exclusive Brex data and expert access." Description paragraph. Footer "Current Performance: ▓░░░ Not Monitored"
   - Card 2: Tag "Content Optimization" + a URL `brex.com/ess-business...`. Body: "Enhance guide with structured how-to steps and rich FAQs". Description. Footer "Current Performance: ▓▓▓▓▓ 86% Citation Share"
   - Each card has a right-arrow `>` chevron indicator (drill-in affordance)

## Data shapes observed

```ts
type OverviewData = {
  dateRange: { label: string; presets: ('last-7-days'|'last-28-days'|...) };
  whatsNew: {
    title: string;
    body: string;
    summarizedAt: ISODate;
  };
  visibilityScore: {
    current: number;        // 0-100 percentage
    delta: number;          // signed percentage points
    series: Array<{ date: ISODate; value: number }>;
    viewMode: 'line' | 'area' | 'bar';  // 3 icons in top right
  };
  websiteActivity: {
    configured: boolean;    // empty state when false
    site?: string;
    // when configured: time series of crawl activity
  };
  topKeywords: Array<{
    keyword: string;
    promptVolume: number;
    delta: number;          // signed percentage
  }>;
  topOpportunities: Array<{
    type: 'Outreach' | 'Content Optimization' | ...;
    target: string;         // person + site, or URL
    title: string;
    body: string;
    currentPerformance: { label: string; value?: number };  // "Not Monitored" or "86% Citation Share"
  }>;
};
```

## Primitives used (cross-ref to `_reference/figma/01-components/`)

- `Button` (default + label + iconRight chevron — used for "Configure Website", "Website ↗", "Prompt Volumes ↗", "Opportunities ↗", "Last 7 Days")
- `Tag` (used on Opportunities cards — "Outreach", "Content Optimization")
- `Table` (Top Keywords table — sortable columns)
- `Card` / panel surface with `shadow-flat` (everywhere — What's New, Visibility Score, Website Activity, each Opportunity, each Top Keywords container)
- `Badge` likely used somewhere (need to confirm — "Beta" pill in nav)
- Line chart component (Visibility Score)
- Avatar/thumbnail (Outreach card)
- Progress bar / meter (Current Performance bar)
- Section heading + subtitle composition (every section uses this)

## Interactions inferred / to confirm

- **Date range button** opens a popover with presets (Last 7/28/90 Days, Last Year, Custom)
- **3 icons top-right of Visibility Score**: chart type toggle (line/area/bar?) + download
- Hover on chart line should show a Chart Tooltip (per `_reference/figma/01-components/tooltip/`)
- Sortable column headers in Top Keywords (arrows visible)
- Opportunity card `>` → drills into a detail view (not captured)
- "Website ↗", "Prompt Volumes ↗", "Opportunities ↗" → cross-page navigation

## Deferred sub-pages

- Date range popover content
- Visibility Score expanded view (download/share dialog?)
- Website Activity configured-state
- Opportunity drill-down detail page
- Click-through targets of section "↗" buttons (each tab in sidebar)

## Notes for the build

- The page is **mostly empty/onboarding** for the Brex demo workspace — Website Activity is unconfigured and Outreach has "Not Monitored" status. In the implementation, model both empty and populated states.
- The structure is **highly modular** — each section is a self-contained card with: title + subtitle + right-aligned action button + content area. This screams "build a `<SectionCard>` shell component first" and compose the rest into it.
- AI-generated narrative ("Summarized by Profound at...") is a recurring pattern worth promoting to a primitive — `<AiSummaryCard>`.
- The "right-arrow ↗ to drill into another tab" pattern is the link between Overview and the deeper tabs.
