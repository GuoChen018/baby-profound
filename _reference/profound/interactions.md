# Profound interactions catalog

Cross-cutting interactions and patterns inferred from captured screenshots. Use this as the "behavior bible" when building components and pages — the screenshots are the static blueprint; this doc describes the dynamic side.

## Global navigation

- **Sidebar nav**: clicking a top-level item routes to that tab's landing page. Highlighted state uses inverted (white-on-dark) treatment.
- **Sidebar grouping headers** ("Analytics", "Action", "Context") are non-interactive labels.
- **Workspace switcher** (top of sidebar — "Brex ▸") opens a dropdown to switch between workspaces the user belongs to.
- **Sidebar footer toggles**:
  - `⚙` Settings → opens settings page (TBD)
  - `?` Help → opens help/docs (probably modal or external)
  - `▣` Sidebar toggle → collapses the sidebar (TBD: behavior in collapsed state)
- **Focused mode**: Agents → Editor view hides the sidebar entirely. Implies `<Layout focused>` variant.

## Filter bars (recurring pattern)

Most analytics tabs (Overview, Answer Engine Insights, Prompt Volumes, Agent Analytics) share a similar filter bar shape:

- **Time range picker**: `Last 7 Days ▾` (or "Last 30 Days", "Custom") — opens a date-range popover
- **Comparison toggle**: `vs.` separator + `Prev. Period ▾` (or "Same Period Last Year", custom)
- **Granularity**: `Daily ▾` (or Weekly, Monthly)
- **Platform filter chips**: ChatGPT, Perplexity, Anthropic, Google, etc. — multi-select with brand icons. On Agent Analytics, each has a `↗` icon suggesting they're also outbound links.
- **Topic / scope filters** vary per tab.

Filter chips are `Select` primitive variants. Date-range picker is custom (uses popover + calendar grid).

## KPI cards + linked chart pattern

On Agent Analytics, the 4 KPI cards at top control the main chart below — clicking a KPI selects it, and the chart re-renders to show that metric. The selected card has an underline accent.

Build as: `<KpiCard label info value delta selected onClick />` + `<TimeSeriesChart metric=... />`.

## Time-series chart conventions

Across Overview, Answer Engine Insights, and Agent Analytics:
- **Current period** = solid line in the brand color (blue/indigo)
- **Previous period** = dashed/faded same-color line (toggleable)
- **Compare bots / Compare competitors** = adds per-entity lines to the chart, with a legend showing the entities
- **Hover** = vertical guide line + tooltip with date + values

## Sub-tab bars

Many tabs have horizontal sub-tab strips inside the page (different from the sidebar):

- Answer Engine Insights: Overview · Prompts · Query Formats · Platforms · Regions · Personas · Sentiment · Citations (8 tabs)
- Agent Analytics: Overview · Pages · Bot Visits · Human Visits · Google Analytics · Logs (6 tabs)
- Agents: Overview · All Agents · Templates · Scheduled (4 tabs)
- Content (page): Generate Content · Tools (2 tabs)
- Content (detail): Content Brief · Final Draft (2 tabs, second may be greyed out until generated)
- Ask: not visible in capture but inferred from build-mode
- Prompt Volumes: Relevant Prompts · Keyword Lists (2 tabs)

All use an **underline-active** treatment with a subtle bottom border on the active tab.

## Cards / accordion patterns

Three card patterns appear across the product:

### 1. Insight tile (Overview)
Compact, fixed-height card with a title + small chart or single number. Used in 2x2 or grid layouts on Overview.

### 2. Opportunity card (Overview + Opportunities)
Wider card with a type tag, target, headline, description, and performance indicator. Drill-in chevron on right. Has compact and full variants.

### 3. Web page accordion (Prompt Volumes)
Collapsible row with path + count, expands to reveal a nested table. Unique to this tab.

## Tables

- **Sortable column headers** (implied — chevrons visible on some)
- **Info tooltips** on column labels (ⓘ icon)
- **Footer**: "Showing N-M of T items" + pagination arrows + (sometimes) `Expand ▾` to collapse-all
- **Action columns** on the right: status dropdowns (Draft ▾), overflow `...` menus, history icon, etc.
- **Platform-avatar stacks** in cells: small brand-colored circles, with `+N` overflow indicator if >5

## Status indicators

- **Status dot + label**: `● Published` (green), `● Unpublished` (yellow), `● Draft` (yellow), `● Completed` (green) — see Agents + Content tabs
- **Status pill**: `Document saved` (green), `Plan limit reached` (red warning banner)
- **Performance meter**: progress bar with label like "61.4% Visibility Score" or "✕ Not Mentioned"

Build as `<StatusDot color>` + `<StatusPill variant>` + `<Meter value label>`.

## Split-button pattern

Recurring pattern: primary action with a dropdown caret for variations.

Examples:
- Agents: `+ New Agent ▾`, `Run test ▾`, `Publish changes ▾`
- Content: `📋 Copy ▾`, `⬇ Export ▾`, `● Draft ▾`

Build as `<SplitButton primary={{label, onClick}} options={[...]} />`.

## Composers (text-input with action)

Three variants observed:

- **Ask composer**: chat-style input, multi-line, with mic + send + maybe context attachments
- **Agents hero composer**: "Describe the agent you want to build..." — same shape as Ask, used for AI agent generation
- **Prompt Volumes composer**: keyword + bulk-analysis toggle + Analyze button — narrower

The Ask + Agents composers look ~identical → `<HeroComposer />` primitive.

## Banners

- **Warning banner** (red, top-of-page): "Plan limit reached • Using overage credits View usage" — observed on Agents tab
- Build as `<Banner variant="info|warning|error" action />`.

## Disclosures / collapsibles

- Opportunity detail: `▼ Implementation`, `▼ Rationale` — click chevron to collapse
- Prompt Volumes: page rows are accordions
- Agent Editor sidebar: node categories collapse

Build as `<Disclosure summary defaultOpen children />`.

## Drill-in / detail navigation

Two patterns observed:

### Sub-page navigation (with back link)
- Opportunities list → opportunity detail: `‹ All opportunities` back link in top-left + pagination `1/4` arrows in top-right
- Content list → content detail: `‹ Back` back link in top-left
- Agents list → agent run: `‹ Back` back link in top-left + sub-actions in top-right (`Past runs`, `Edit agent`)

### Item-pagination control
Detail views have `1 / N ▼ ▲` to navigate prev/next within the same collection. New primitive: `<ItemPagination current total />`.

## Hover affordances inferred

- Info icons (ⓘ) on metric labels → tooltip with definition
- Platform avatars → tooltip with platform name (and maybe last-cited date?)
- KPI deltas → tooltip with the actual previous value
- Chart points → tooltip with date + value
- Truncated text (long paths, long titles) → full-text tooltip

## Loading / empty states observed

- **Agent Run empty pane**: greyed-out skeleton blocks behind centered "Begin by completing the inputs" message — a teaser of what filled state looks like
- **Templates "Created by" filter**: implies user-filterable lists, with creator metadata
- Other empty states not captured — TBD

## Cross-tab navigation

The product is highly interconnected. Observed cross-links:
- Overview "Top Keywords" → Prompt Volumes
- Overview "Top Opportunities" → Opportunities tab
- Content detail → Workflow side-tab → likely links to Agents tab
- Opportunity detail "Outreach →" action card → likely triggers an Agent run or opens Content tab

Worth modeling these as explicit href/route data in mock data.

## Open questions

- **Is there a light theme?** All captures are dark. The `_reference/figma/` extracts include light tokens — but is there a runtime toggle, or is dark just the default for this user?
- **Mobile behavior**: the platform shows a "Mobile not supported" overlay (which blocked our earlier crawl). So this is **desktop-only** — we should not worry about responsive design below ~1024px.
- **Real-time updates**: do KPIs update live? Agent runs likely stream output — but the rest is probably polled.
- **Permissions / sharing**: are dashboards / agents / content shareable across workspace members? No share buttons visible in captures so far.
