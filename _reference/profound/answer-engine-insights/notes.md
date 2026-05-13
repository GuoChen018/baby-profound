# Answer Engine Insights tab

**Route**: `/<workspace-id>/Brex/answer-engine-insights`
**Theme observed**: Dark
**Capture**: full-page CleanShot

## Purpose

The **flagship analytics view** — the densest data dashboard in the product. Shows how the brand performs in AI-generated answers across all tracked engines, topics, and dimensions. This is where most of the "real work" of Profound happens for an analyst.

It's a tabbed dashboard with 8 sub-tabs (Visibility, Prompts, Query Formats, Platforms, Regions, Personas, Sentiment, Citations) — captured here on the **Visibility** sub-tab.

## Layout (top to bottom, Visibility sub-tab)

1. **Page header**: workspace title "Brex" (left, with chart icon) · right side has `Ask` button (likely launches the Ask tab pre-populated with context from this view) · `Export Edit answers ↗` button
2. **Sub-tab bar** (8 tabs): **Visibility** (active) · Prompts · Query Formats · Platforms · Regions · Personas · Sentiment · Citations · then far right "Settings"
3. **Filter / context bar**: three filter pills with chevrons + a separator + segmented controls:
   - `Last 7 Days ▾` (date range)
   - `vs.` label
   - `Prev. Period ▾` (comparison range)
   - `Daily ▾` (granularity)
   - Filter pills: `Topics ▾` (with chevron, multi-select) · `Platform ▾`
4. **Section 1: Visibility Score** with header "How often does Brex appear in AI-generated answers"
   - Two-up: chart (left) + rank leaderboard (right)
   - Left: 78.5% (-1.3%) headline + line chart (May 6 → May 12) with "Current Period" vs "Previous Period" + "Compare competitors" checkbox at bottom
   - Right: card titled `#1` showing rank table — columns: Asset · Visibility Score · (delta). Rows: 1. Brex (Owned) 78.0% -1.2%, 2. Ramp 17.1% -0.1%, 3. Capital One 32.4% -1.6%, 4. American Express 32.1%, 5. Chase 5.3% +2%. Footer "Expand" link.
   - Each section has a chart-config dropdown top-right (`Chart Config ▾`)
5. **Section 2: Share of Voice** "Mentions of Brex in AI-generated answers in relation to competitors"
   - Two-up again: donut chart (left) + rank leaderboard (right)
   - Left: 11.1% (-0.2%) headline + donut chart with colored segments + color-key legend below (Brex purple, Ramp pink, Capital One blue, American Express red, Chase orange, Other grey)
   - Right: `#1` rank card with Asset · Share of Voice · delta columns. Brex (Owned) 11.1% -0.2%, Ramp 10.8% -, Capital One 7.2% +0.1%, etc.
   - Same `Chart Config ▾` affordance
6. **Section 3: Average Position** "Average rank of Brex in AI-generated answers"
   - Two-up: line chart (left, showing position numbers 1-5 inverted scale) + rank leaderboard (right)
   - Left: 2.8 (+0.1) headline + line chart from May 6 to May 12 showing position trend, with `Current Period` vs `Previous Period` toggle + Compare competitors
   - Right: `#2` rank card with Asset · Average Position · delta. Ramp 2.7 -, Brex (Owned) 2.8 +0.1, BrickRubli 3.2 +0.4, Chase 3.4 -, Forbes 3.5 +0.4
7. **Section 4: Visibility Rankings By Topic** "Brex's visibility rankings compared to Corporate Cards brands by topic"
   - Wide table with sortable columns: Topic · `#1` rank flag · then 9-10 columns of platform avatars (small circular icons — likely each AI engine: ChatGPT, Perplexity, Google, Microsoft Copilot, Claude, Gemini, etc.) · "Loser" / "Leader" tags inline
   - Rows: Brex acquisition (Leader), Business Credit Card, business credit card a... (Leader), business credit card rewards, Compliance risk (Leader), Corporate Card, corporate cards, en cely business credit cards, employee spending cards, Expense Management (visible at bottom)
   - Each row has a chevron `>` (expandable)
   - Footer: "Showing 1-10 of 10 items"

## Data shapes observed

```ts
type AnswerEngineInsights = {
  dateRange: { current: DateRange; comparison: DateRange; granularity: 'daily'|'weekly'|...; };
  filters: { topics: string[]; platforms: string[]; };
  subTab: 'visibility' | 'prompts' | 'query-formats' | 'platforms' | 'regions' | 'personas' | 'sentiment' | 'citations';

  visibility: {
    score: { current: number; delta: number; series: TimeSeries[] };
    rank: { rank: number; competitors: CompetitorRow[] };  // Asset / Visibility Score / delta
  };
  shareOfVoice: {
    percentage: { current: number; delta: number };
    breakdown: Array<{ asset: string; share: number; color: string }>;  // donut
    rank: { rank: number; competitors: CompetitorRow[] };
  };
  averagePosition: {
    value: { current: number; delta: number; series: TimeSeries[] };
    rank: { rank: number; competitors: CompetitorRow[] };
  };
  rankingsByTopic: Array<{
    topic: string;
    status?: 'Leader' | 'Loser';
    rankings: Array<{ platform: PlatformId; rank: number }>;  // per-platform ranks shown as avatars
  }>;
};

type CompetitorRow = {
  asset: string;
  isOwned?: boolean;       // "Brex (Owned)"
  value: number;
  delta?: number;
};
```

## Primitives used (HEAVY — this page exercises most of the design system)

- `Select` (filter pills — Topics, Platform, date ranges, granularity, Chart Config) — variants with chevron-down, counter, leftIcon
- `SegmentedControl` (possibly for date range presets, or Current vs Previous toggle)
- `Tag` ("Leader", "Loser" inline in table rows; "Owned" suffix on Brex)
- `Badge` (potentially for status pills — though "Leader"/"Loser" look like Tags)
- `Button` (Ask, Export Edit answers ↗, Expand link, Settings)
- `Checkbox` ("Compare competitors")
- **PlatformAvatar** (the small circular brand icons in the Topic rankings table — this is the `Providers & Platforms` Figma component, 16x16, brand-colored)
- **Flag** (none observed on this page, but mentioned in foundations)
- `TabBar` (sub-tabs at top)
- **Multiple chart types**:
  - Line chart (Visibility Score, Average Position)
  - Donut chart (Share of Voice)
- **Leaderboard / RankCard** — a recurring two-column card showing rank + competitor table with delta — this should be a primitive
- **DataViz card shell** — section title + subtitle + Chart Config + chart + footer expand — this is the `Section Title` + chart card composition from Figma
- **Sortable table** with platform-avatar column heads (this might be a unique table variant — many small icon columns)

## Interactions inferred / to confirm

- Hover on chart line/dot → Chart Tooltip (Multi or Single data point per Figma)
- Hover on donut segment → tooltip with brand + value
- Click filter pill → opens dropdown with checkboxes (for Topics, Platform)
- Click date range pill → date range picker popover (likely the Date Selector from Figma)
- Sort column headers in tables and the topic rankings table
- "Compare competitors" checkbox → adds competitor lines to the chart
- "Chart Config ▾" → menu to swap chart type / customize series
- "Expand" link in rank cards → modal or expanded view with all competitors
- Row chevron in topic rankings → expand to show platform-by-platform detail
- Sub-tab switching (Prompts, Citations, etc.) — each likely has a similar but different content shape

## Deferred sub-pages (lots — this view alone has 7+ sibling views)

- **Prompts** sub-tab — likely a list/table of tracked prompts
- **Query Formats** sub-tab
- **Platforms** sub-tab — per-engine breakdown
- **Regions** sub-tab — uses Flag component
- **Personas** sub-tab
- **Sentiment** sub-tab
- **Citations** sub-tab
- "Settings" button (far right of sub-tab bar)
- All filter dropdowns (Topics, Platform, Chart Config)
- Date range picker
- Chart hover tooltips
- Topic row expanded state
- Rank card expanded state
- The `Ask` button (likely passes context to Ask tab)
- `Export Edit answers ↗` flow

## Notes for the build

- **This is THE page**. If we build one tab to depth, it should be this one — it exercises almost every primitive and validates the chart/table primitives we'll need everywhere.
- **The two-up "chart + leaderboard" pattern** is reused three times in a single view. Definitely a primitive: `<MetricCard chart={...} leaderboard={...} />`.
- **Tabular numerals are load-bearing** here — every percentage, rank, and delta is a number; column alignment matters. Confirms the `font-feature-settings: 'tnum' 1` decision from Phase 3.
- **The platform avatar column pattern** in the Topic Rankings table is unusual and visually distinctive — it's where the brand "personality" of Profound shows up. Each column header is a circular brand avatar; each cell is just a circular avatar (filled = high rank, lighter = lower? or color-coded by performance?). Worth capturing this as a discrete primitive.
- **The filter bar pattern** (date range + comparison + granularity + multi-select filters) is going to recur on every analytics tab. Build a `<FilterBar>` primitive that orchestrates this combination.
- The **donut chart** is the only one in our captures so far — we have the chart palette colors from Figma (purple, orange, green, blue) but no formal `Chart` primitive in the design system. We'll need to pick a charting library or hand-roll SVG.
- This page is the right one to use for validating the eventual `Chart` primitive — if it can handle the line chart with hover-tooltip + comparison line + dotted-marker for a date, it can handle anything else.
