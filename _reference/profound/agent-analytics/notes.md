# Agent Analytics tab

**Route**: `/<workspace-id>/<site>/agent-analytics`
**Theme observed**: Dark
**Capture context**: This screenshot is from a **different workspace** ("Profound" demo workspace, not "Brex") — visible because the Brex workspace likely doesn't have this feature enabled, or the user has access to multiple workspaces. The sidebar also shows additional items not in Brex: **Custom Views (Alpha)**, **Brand Hub (Beta)** — feature-flagged.

## Purpose

Measure how AI engines (bots/crawlers) and humans interact with **your website specifically** — beyond just "who's citing you" into "who's visiting and being trained on you". This is a webmaster/SEO-flavored view: AI Citations, AI Training, Human Referrals, and the share of human traffic referred from AI.

This is the **only tab so far with a site URL header** — it operates at the site level, not the workspace level. Multi-site support is implied via "Add new site" button.

## Layout (top to bottom)

1. **Site header bar**:
   - Site URL chip "www.tryprofound.com" with up/down chevron (site switcher)
   - Sub-tabs: **Overview** (active, underlined) · Pages · Bot Visits · Human Visits · Google Analytics · Logs
   - Right-aligned: `+ Add new site` link · `Settings` link
2. **Filter bar**:
   - `Last 7 Days ▾` · `vs.` · `Prev. Period ▾` · `Daily ▾`
   - Right-aligned: 4 platform filter pills (`ChatGPT ↗`, `Perplexity ↗`, `Anthropic ↗`, `Google ↗`) — note the ↗ icon suggests each is a link-out-able pill (toggleable filter + external link to that platform's bot docs?)
3. **KPI row (4 cards)** with consistent shape: label + info icon + big number + delta:
   - AI Citations · `28.9k` · `-291` (red)
   - AI Training · `24.8k` · `+4.9k` (green)
   - Human Referrals · `10k` · `-3.8k` (red)
   - % Humans Referred from AI Systems · `3.1%` · `-1.2%` (red)
   - The first card has an underline accent indicating it's the "selected metric" driving the chart below — like a clickable header for the chart.
4. **Main chart area**: large line chart spanning the row, with x-axis dates (Feb 7 → Feb 14) and y-axis scale 1.8k → 5k. Shows the selected KPI (AI Citations) over time.
   - Bottom legend: `Current Period` toggle · `Previous Period` toggle · "Compare bots" checkbox (right-aligned)
5. **Below the fold** (partially visible): "cited in AI responses." text + a **Referrals** section title and **Platforms** section title side-by-side (two-up layout starting), with a `Share | Totals` toggle for Platforms.

## Data shapes

```ts
type AgentAnalytics = {
  site: { url: string; sites: SiteRef[] };  // site switcher
  subTab: 'overview' | 'pages' | 'bot-visits' | 'human-visits' | 'google-analytics' | 'logs';
  dateRange: { current: DateRange; comparison: DateRange; granularity: Granularity };
  platforms: PlatformId[];  // filter chips

  kpis: {
    aiCitations: { value: number; delta: number };
    aiTraining: { value: number; delta: number };
    humanReferrals: { value: number; delta: number };
    percentHumansReferredFromAI: { value: number; delta: number };
    selected: keyof Kpis;  // drives the main chart
  };
  chart: { series: TimeSeries[] };
  referrals: { /* human traffic by source */ };
  platforms: { /* per-platform breakdown, Share or Totals view */ };
};
```

## Primitives used

- Site-URL chip / switcher (compact, with chevron — same `Select` primitive)
- `TabBar` (sub-tabs, with underline-active state — slightly different from the 8-tab variant on Answer Engine Insights)
- Filter chips (date range, comparison, granularity) — `Select` primitive
- Platform pills with `↗` external-link icon (`Select` variant with icon-only-right?)
- **KPI card** — recurring primitive: label + info icon + value + delta. Use a `<KpiCard>` primitive. The "selected" state with bottom underline is a clickable state.
- Line chart with current/previous overlay + compare-bots toggle (same as Answer Engine Insights)
- "Compare bots" checkbox (right-aligned, same pattern as "Compare competitors" on Answer Engine Insights)
- Section headers (Referrals, Platforms)
- `SegmentedControl` (Share | Totals — same primitive as time-range)

## Interactions inferred

- Click site URL → site switcher dropdown
- Click KPI card → switch the main chart to that metric
- Click sub-tabs → swap entire view (Pages, Bot Visits, etc.)
- Hover chart line → tooltip with date + value
- Toggle Current/Previous Period → show/hide comparison line
- Compare bots checkbox → add per-bot lines to chart
- Platform filter pills → toggle inclusion (and `↗` opens external docs?)
- Add new site → modal/form

## Deferred sub-pages

- All 5 sibling sub-tabs: Pages, Bot Visits, Human Visits, Google Analytics, Logs
- Settings (top right) — likely site-specific settings
- Add new site flow
- Custom Views (Alpha) sidebar item — new feature
- Brand Hub (Beta) sidebar item — new feature
- The bottom-of-page sections (Referrals, Platforms) — partially visible only

## Build notes

- **KPI card pattern** is high-value. Almost certainly recurs across other analytics tabs. Build `<KpiCard label info value delta selected onClick />` as a primitive.
- The "selected KPI drives the chart" pattern is **clever UX** — saves the user from needing to switch tabs to see different metrics. Worth replicating in our composition.
- This tab's sidebar layout has the extra items that aren't in Brex's view — confirms there's a **feature-flag / plan-gated sidebar** rendering. Worth modeling as: `<Sidebar items={navItems.filter(i => i.enabled)} />`.
- The site URL chip with selector (top-left of main content) is a **scoping affordance** that doesn't exist on workspace-level tabs. This is a sub-scope within the workspace.
- The platform filter pills with `↗` icon — implies these are both filters AND outbound links. Slightly unusual mixed affordance.
