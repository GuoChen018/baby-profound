# Profound product sitemap

Captured live from `platform.tryprofound.com/<workspace-id>/Brex/*`. Workspace is "Brex" (demo).

## Layout fundamentals (observed across all captures)

- **Dark theme** is the dominant rendering in our captures. Whether there's a light-theme toggle is TBD (need to check user/profile menu).
- **Persistent left sidebar** with workspace switcher at top, then 12 nav items grouped into:
  - (top-level) Overview · Ask
  - **Analytics** section: Answer Engine Insights · Dashboards · Prompt Volumes · Agent Analytics · Shopping
  - **Action** section: Agents · Sheets · Content · Opportunities (Beta)
  - **Context** section: Knowledge Bases
- **Sidebar footer** has 3 small icons (left): settings · help · sidebar-toggle
- Main content area to the right of the sidebar.
- **Some workspaces have extra sidebar items**: Custom Views (Alpha) and Brand Hub (Beta) — observed on the `tryprofound.com` Agent Analytics capture but NOT in the Brex workspace. Implies feature-flagged or plan-gated sidebar rendering.
- **Full-screen modes hide the sidebar** — observed in the Agent Editor (workflow node canvas). Layout shell must support a "focused" mode.

## Captured tabs

| Slug | States captured | Screenshot files | Notes |
|---|---|---|---|
| `overview` | landing | `screenshot.png` | [notes.md](overview/notes.md) |
| `ask` | empty + build-mode + active | `screenshot.png` + 2 more | [notes.md](ask/notes.md) |
| `answer-engine-insights` | landing | `screenshot.png` | [notes.md](answer-engine-insights/notes.md) |
| `prompt-volumes` | landing | `screenshot.png` | [notes.md](prompt-volumes/notes.md) |
| `agent-analytics` | landing (from `tryprofound.com` workspace — Brex doesn't have this enabled) | `screenshot.png` | [notes.md](agent-analytics/notes.md) |
| `agents` | overview + agent-run + agent-editor | `screenshot.png` + 2 more | [notes.md](agents/notes.md) |
| `content` | overview + content-detail | `screenshot.png` + 1 more | [notes.md](content/notes.md) |
| `opportunities` | list + opportunity-detail | `screenshot.png` + 1 more | [notes.md](opportunities/notes.md) |

## Deferred (not yet captured)

| Slug | Section | Reason | Priority |
|---|---|---|---|
| `dashboards` | Analytics | not captured this round | Medium — custom dashboard builder |
| `shopping` | Analytics | **user has no access** | Skip indefinitely |
| `sheets` | Action | not captured this round | Medium — bulk data manipulation? |
| `knowledge-bases` | Context | not captured this round | Medium — uploaded docs that feed agents |

## Aggregated deferred sub-pages (across all captured tabs)

Sub-pages noted but not captured:

### Overview
- Opportunity drill-down (now captured via `opportunities/screenshot-opportunity-detail.png`)
- Date-range picker popover content

### Ask
- Chat history list (title dropdown)
- The Build-mode agent creation flow → links into Agents tab

### Answer Engine Insights
- All 7 sibling sub-tabs: Prompts, Query Formats, Platforms, Regions, Personas, Sentiment, Citations
- Filter dropdowns (Topics, Platforms, Chart Config)
- Settings (top-right)

### Prompt Volumes
- Bulk-analysis composer state
- Keyword Lists sub-tab
- Domain selector dropdown content
- Per-prompt drill (clicking a specific prompt)

### Agent Analytics
- All 5 sibling sub-tabs: Pages, Bot Visits, Human Visits, Google Analytics, Logs
- Site switcher · Add new site flow · Settings
- Custom Views (Alpha) and Brand Hub (Beta) entire surfaces

### Agents
- All Agents · Templates · Scheduled sub-tabs
- The full node config UI for each node type (12+ node types)
- The `✨ Assistant` AI-build mode in editor
- Plan usage page (linked from warning banner)
- Past runs / history view

### Content
- Tools sub-tab
- Create New Content flow (template picker)
- Optimize Existing Content flow (URL input)
- Final Draft view (Brief → Final Draft transition)
- History / Workflow / Inputs side-panel sub-tabs
- The full Copy ▾ and Export ▾ menus

### Opportunities
- Sort and Filter menus
- Other opportunity-type detail variants (Reddit, Content Optimization, Content Creation — only Outreach captured in detail)
- The "Outreach →" action card linking target (probably opens an agent or content draft)

### Global / cross-tab
- Settings (sidebar footer + per-page settings links)
- User profile menu / theme toggle
- Workspace switcher (top of sidebar)
- Notifications, if any
