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

## Captured tabs

| Slug | Status | Screenshot | Notes |
|---|---|---|---|
| `overview` | ✓ | [screenshot.png](overview/screenshot.png) | [notes.md](overview/notes.md) |
| `ask` | ✓ (3 states) | [screenshot.png](ask/screenshot.png) + build-mode + active-conversation | [notes.md](ask/notes.md) |
| `answer-engine-insights` | ✓ | [screenshot.png](answer-engine-insights/screenshot.png) | [notes.md](answer-engine-insights/notes.md) |

## Deferred (not yet captured)

| Slug | Section | Priority guess |
|---|---|---|
| `dashboards` | Analytics | High — likely a builder of custom views |
| `prompt-volumes` | Analytics | High — Top Keywords on Overview drills here |
| `agent-analytics` | Analytics | Medium |
| `shopping` | Analytics | Lower — probably niche |
| `agents` | Action | High — autonomous agents (linked to Ask "Build" mode) |
| `sheets` | Action | Medium — bulk data manipulation? |
| `content` | Action | Medium |
| `opportunities` | Action | High — drilled into from Overview |
| `knowledge-bases` | Context | Medium |

## Aggregated deferred sub-pages (across all captured tabs)

Tabs noted but not captured (sub-pages within a captured tab):

- Date range picker popover (Overview + Answer Engine Insights both use it)
- Filter dropdowns (Topics, Platforms, Chart Config — all on Answer Engine Insights)
- Opportunity drill-down (clicking an opportunity card on Overview)
- The 7 other sub-tabs on Answer Engine Insights: Prompts, Query Formats, Platforms, Regions, Personas, Sentiment, Citations
- Chat history list (Ask tab title dropdown)
- The Build-mode agent creation flow (Ask tab Build suggestion → ???)
- Settings (sidebar footer + Answer Engine Insights top-right)
