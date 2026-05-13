# Profound crawl report

Snapshot of capture status and what we know vs. what's still pending.

## Summary

- **Workspace captured**: "Brex" (demo workspace) — except Agent Analytics which is from the "Profound" demo workspace because Brex doesn't have Agent Analytics enabled.
- **Theme**: Dark mode across all captures. Light-mode existence not confirmed.
- **Capture method**: Manual screenshots provided by the user, after automated browser crawling was blocked by Profound's anti-bot detection (the `navigator.webdriver=true` triggers an un-dismissable "Mobile not supported" overlay).
- **Capture date**: 2026-05-13

## Tab coverage (12 expected, 8 captured)

| Slug | Status | States | Source |
|---|---|---|---|
| `overview` | ✓ Captured | landing | Brex workspace |
| `ask` | ✓ Captured | empty + build-mode + active conversation | Brex workspace |
| `answer-engine-insights` | ✓ Captured | landing (1 of 8 sub-tabs) | Brex workspace |
| `prompt-volumes` | ✓ Captured | landing | Brex workspace |
| `agent-analytics` | ✓ Captured | landing | **tryprofound.com workspace** (Brex doesn't have it) |
| `agents` | ✓ Captured | overview + agent-run + agent-editor (3 distinct UIs) | Brex workspace |
| `content` | ✓ Captured | overview + content-detail | Brex workspace |
| `opportunities` | ✓ Captured | list + opportunity-detail | Brex workspace |
| `dashboards` | ✗ Not captured | — | — |
| `shopping` | ✗ User has no access | — | — |
| `sheets` | ✗ Not captured | — | — |
| `knowledge-bases` | ✗ Not captured | — | — |

## What we got for each tab

### Overview
Full landing page. Captures the KPI strip, the main bot-traffic chart, the Top Keywords + Top Opportunities sections, and the page header with date-range/comparison/granularity filters.

### Ask
Three states (this is the highest-coverage tab):
- Empty composer state
- Build-mode (AI agent generation flow)
- Active conversation with response streaming
This is enough to model the entire surface area of Ask.

### Answer Engine Insights
Just the Overview sub-tab — the most heavily filtered, most chart-dense analytics view. 7 more sibling sub-tabs (Prompts, Query Formats, Platforms, Regions, Personas, Sentiment, Citations) not captured.

### Prompt Volumes
Landing view with the prompt-explorer composer + the citing-pages accordion. Bulk-analysis state, Keyword Lists sub-tab, and per-prompt drill-down not captured.

### Agent Analytics
**Limited capture** — from a different workspace (tryprofound.com) because Brex doesn't have Agent Analytics. Only the Overview sub-tab visible. 5 sibling sub-tabs and the entire Custom Views (Alpha) + Brand Hub (Beta) features not captured. The sidebar in this capture also reveals features that aren't in the Brex workspace.

### Agents
Three captures cover three distinct views:
1. Overview (template gallery + recent agents table)
2. Agent Run (input form + output pane)
3. Agent Editor (full-screen node canvas — sidebar hidden)

This is the most product-surface-heavy tab. The Editor alone could be a separate sub-product. For sandbox purposes, recommend modeling Overview + Agent Run as first-class views and leaving the Editor as a deferred placeholder.

### Content
Two captures cover the launch surface + the article editor:
1. Overview (Create/Optimize cards + projects table)
2. Content Detail (rich-text editor + AEO/History/Workflow/Inputs side panel)

The Tools sub-tab and the Create-flow are not captured.

### Opportunities
Two captures: list view (4 opportunity types visible: Outreach, Content Optimization, Content Creation, Reddit) + detail view (just Outreach type). Different opportunity types may have different detail layouts — only Outreach confirmed.

## Cross-cutting observations

- **Feature flags / plan gating visible**: Custom Views (Alpha), Brand Hub (Beta), Opportunities (Beta), Knowledge Bases (Beta) — all visible across captures. Implies a tiered product roadmap.
- **Full-screen modes** exist (Agent Editor). The Layout shell must support hiding the sidebar.
- **Site-level scope** exists on Agent Analytics (per-site URL with switcher) — different from the workspace-level scope of every other tab.
- **Banners** for plan-limit warnings observed.
- **Status indicators** (dots + colored pills) appear in 3+ tabs (Agents, Content, Opportunities).
- **Split-buttons** appear in 2+ tabs (Agents, Content).
- **Hero composers** appear in 3 tabs (Ask, Agents-Overview, Prompt-Volumes).

## Primitives confirmed needed by capture

Tier 1 (already built or scheduled in `components/ui/`):
- Button, Tag, Badge, Input, Select, Tooltip, Toggle, SegmentedControl ✓

Tier 2 (newly confirmed by these captures, need to be built):
- **StatusDot** (Agents, Content) — colored dot + optional label
- **Banner** (Agents plan-limit) — info/warning/error full-width band
- **SplitButton** (Agents, Content) — primary action + dropdown caret
- **KpiCard** (Overview, Agent Analytics) — label + info + value + delta + selected state
- **Disclosure** (Opportunities, Prompt Volumes accordions, Agent Editor side panel categories)
- **HeroComposer** (Ask, Agents Overview, Prompt Volumes) — large input + mic + send
- **PlatformAvatar + PlatformAvatarStack** (Overview, Prompt Volumes, Content) — brand-colored circles
- **Meter / ProgressBar** (Opportunities Current Performance, possibly elsewhere)
- **ItemPagination** (Opportunities detail) — 1/N with prev/next arrows
- **OpportunityCard** (Overview + Opportunities) — composite, reusable

Tier 3 (specialized — build if/when needed):
- **Date-range picker popover** (Overview, Answer Engine Insights, Agent Analytics)
- **Time-series chart** (current + previous + per-entity overlays)
- **Stacked bar / horizontal bar charts** (Answer Engine Insights)
- **Rich-text editor with semantic-tag gutter** (Content detail)
- **Node-based workflow canvas** (Agent Editor — largest investment, recommend deferring)

## Limitations / things we don't know

1. **Light theme**: not captured.
2. **Mobile / responsive**: explicitly unsupported by the product. Treat as desktop-only ≥1024px.
3. **Sidebar collapsed state**: not captured.
4. **Settings pages**: not captured.
5. **User profile / workspace switcher dropdowns**: not captured.
6. **Hover / focus / loading / error states**: largely inferred, not directly captured.
7. **Real-time behavior** (streaming output, live updates): inferred from product nature.
8. **Cross-workspace navigation**: Brex vs tryprofound.com — different sidebars observed; the routing pattern that handles this is not yet modeled.
9. **Permissions / roles**: no role-related UI captured.

## Recommendation for build phase

Given coverage, suggest building in this order:

1. **Shell** (Sidebar, TopBar, Layout, focused-mode support) — high coverage, well-understood
2. **Overview** — most cross-referenced tab, exercises KPI + chart + tile + opportunity primitives
3. **Tier 2 primitives** that Overview needs (StatusDot, SplitButton, Banner, KpiCard, PlatformAvatarStack)
4. **Opportunities** (list + detail) — clean two-view drilldown, good for solidifying patterns
5. **Content** (list + detail) — exercises rich-text editor pattern at a sandbox level
6. **Ask** (3 states already captured) — main composer surface
7. **Agents** (overview + run only; defer editor)
8. **Answer Engine Insights** (Overview sub-tab only)
9. **Prompt Volumes**
10. **Stubs for `dashboards`, `sheets`, `knowledge-bases`, `agent-analytics`** — show route, but page can be "coming soon" until we capture them

If we want full parity, we'll need additional screenshots for `dashboards`, `sheets`, and `knowledge-bases` later. Shopping is permanently skipped.
