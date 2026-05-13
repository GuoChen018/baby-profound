# Agents tab

**Route**: `/<workspace-id>/Brex/agents`
**Theme observed**: Dark
**Captures**:
- `screenshot.png` — Agents Overview sub-tab (template gallery + recent agents list)
- `screenshot-agent-run.png` — running a specific agent (input form on left, output panel on right)
- `screenshot-agent-editor.png` — **the agent BUILDER** (full-screen node-based workflow editor, sidebar hidden)

## Purpose

Profound's **autonomous workflow engine**. Users build multi-step LLM-powered workflows (Pull Prompt Responses → Top Cited Domains → Synthesize Insights → Create Brief → etc.) that produce structured outputs (content briefs, FAQ drafts, AEO checklists). Three personas:
- **Templates** — pre-built workflows to start from (8 visible)
- **Agent Run** — fill in inputs + click Run on an existing agent
- **Agent Editor** — visually compose a workflow from nodes (LLMs, web search, code, integrations)

This is a non-trivial **product within a product** — it's effectively a Zapier-meets-AutoGPT canvas builder.

## View 1: Agents Overview

### Layout

1. **Page header**: title "Agents" · sub-tabs (**Overview** active, underlined · All Agents · Templates · Scheduled) · right: `+ New Agent ▾` button (split-button style — primary action + dropdown)
2. **Hero composer**:
   - Centered title "✨ What do you want to build?" with sparkle prefix icon
   - Large dark composer pill: "Describe the agent you want to build..." + microphone + send button (disabled)
3. **Start from a template** section title with `See all ›` right-aligned link
4. **Template grid** — 4-up × 2 rows (8 templates visible):
   - Each card: small icon/avatar top-left + template name (e.g. "Starter Template", "AEO-Optimized FAQ Generator", "Content Optimization...", "Content Brief Creation", "AEO + SEO Research Report", "Generate Blog Post From...", "Reddit Insights Generator", "Weekly Brand Health Report")
   - Different brand icons per template (Google, Reddit, etc.)
   - Subtle border + dark fill
5. **Recent agents table**:
   - Filter chips: `Created by ▾` · `Status ▾`
   - Right: `Search agents` input · `See all ›` link
   - Columns: Agent · Status · Created by · Last modified · (icon column for actions)
   - Rows show status dots: `● Published` (green), `● Unpublished` (yellow/orange)
   - Right action icons: history clock + `...` overflow per row

## View 2: Agent Run

Visible: a specific agent ("Business Credit Card AEO Asset Builder") with a "Plan limit reached • Using overage credits View usage" warning banner at top.

### Layout

1. **Banner**: red warning banner across full width: `⚠ Plan limit reached • Using overage credits View usage` (the View usage link is underlined)
2. **Sub-header bar**: `‹ Back` link · right-aligned `History clock Past runs` · `Edit agent` button
3. **Two-pane layout**:
   - **Left pane** (form):
     - Agent name as h1
     - Description paragraph (multi-line)
     - Divider
     - "Primary Prompt *" label
     - Text input "Enter the value"
     - `▶ Run` button (disabled because no input) + small history-clock icon next to it
     - "Estimated usage ⚡ ~17" footer (token/credit estimate)
   - **Right pane** (output):
     - Background of placeholder boxes (light-grey block silhouettes — visualization of "what the output will look like" as a teaser)
     - Centered placeholder text: "Begin by completing the inputs" + "Results will show up here after running the agent"

## View 3: Agent Editor (full-screen)

The MOST distinctive view in Profound — a full-screen workflow editor that **hides the main sidebar entirely**. Critical UX signal: this is a focused-task mode.

### Layout

1. **Top bar**: `‹` back arrow · agent name "Business Credit Card AEO Asset Builder" · `...` overflow ··· right: `▶ Run test ▾` (split button) · `Publish changes ▾` (split button)
2. **Three-pane workspace**:
   - **Left sidebar** (nodes palette):
     - Tabs: **Nodes** (active) · `✨ Assistant` (build-with-AI mode)
     - Search input "Search"
     - Categories with expandable rows:
       - **Logic**: Conditional · Iteration
       - **AI**: Prompt LLM (with sparkle icon)
       - **Web Research**: Get Sitemap · Web Page Scrape · Parallel Deep Research · Parallel Web Search · Perplexity Search · Google Search · Exa (with brand icons each)
       - **Code**: Call API · Code
       - **Integrations**: (truncated)
     - Each node row: icon + name (some with sub-arrow indicating it expands further)
   - **Center canvas** (the actual workflow):
     - Series of nodes connected with arrows top-to-bottom
     - Node header: small colored icon + node name (e.g. "Forecast Related Queries...", "Pull Prompt Responses f...", "Top Cited Domains on B...", "Synthesize Insights for B...", "Create AEO Content Brie...", "Generate FAQ Drafts and...")
     - Each node shows Output: with a typed pill (e.g. `Query Fanout Estimator Out...`, `Prompt Responses`, `Citation Domains`, `Create Content Brief Output`, `LLM Response`)
     - Start node at top (input definition) + End node at bottom
     - Canvas controls (bottom center): pan-cursor toggle · zoom out · zoom in · fit-to-screen · fullscreen · undo/redo · `?` help
   - **Right pane** (node configuration):
     - Active node ("Start" — selected): title "Start" · `...` overflow
     - **Input** section
     - One input chip "T Primary Prompt" (string-typed) + pencil edit + trash delete
     - "+ Add input" button below

### Data shapes

```ts
type Agent = {
  id: string;
  name: string;
  description: string;
  status: 'Published' | 'Unpublished' | 'Draft';
  createdBy: User;
  lastModified: ISODate;
  workflow: {
    nodes: Array<{
      id: string;
      type: NodeType;   // 'start' | 'prompt-llm' | 'web-page-scrape' | ...
      name: string;
      config: Record<string, unknown>;
      output: { name: string; type: 'string'|'json'|'array'|... };
    }>;
    edges: Array<{ from: string; to: string }>;
  };
  inputs: Array<{
    name: string;
    type: 'string' | 'number' | 'json' | ...;
    required: boolean;
  }>;
  estimatedUsage: number;  // credits per run
};

type AgentRun = {
  agentId: string;
  inputs: Record<string, unknown>;
  status: 'pending' | 'running' | 'success' | 'failed';
  startedAt: ISODate;
  results: Array<NodeOutput>;
};
```

## Primitives used

- `TabBar` (Overview / All Agents / Templates / Scheduled)
- **Split-button** (`+ New Agent ▾`, `Run test ▾`, `Publish changes ▾`) — new primitive: button with action + dropdown caret
- Hero composer (similar shape to Ask tab composer)
- **Template card** grid — small icon + title, subtle border, hoverable
- **Status dot + label** pattern (` ● Published` / `● Unpublished`) — needs `<StatusDot color>` primitive (green/yellow/red/grey)
- `Select` (Created by, Status filters)
- `Input` (Search agents, Primary Prompt)
- `Button` (Run, Back, Edit agent, Add input)
- **Warning banner** (red, top-of-page) — new primitive
- **Node-based workflow canvas** — major custom component, probably uses ReactFlow or similar
- **Node palette** (left sidebar with categorized expandable lists)
- Node config side panel (right)
- Two-pane Agent Run layout
- Output placeholder skeleton (light-grey block silhouettes)

## Interactions inferred

- Type in hero composer → AI generates an agent from description (the `✨ Assistant` mode in editor too)
- Click template card → opens the agent (probably duplicates into "your agents")
- Click recent agent row → opens Agent Run view (or editor if unpublished)
- `+ New Agent ▾` split → primary creates blank agent, dropdown shows quick-start options
- In Agent Run: fill input → Run button activates → output streams into right pane
- In Editor: drag node from palette to canvas, connect nodes, click to configure
- `Run test ▾` (in editor): one-off test runs without publishing
- `Publish changes ▾`: deploy with optional scheduling

## Deferred sub-pages

- All Agents · Templates · Scheduled sub-tabs
- See all → for templates and agents
- Plan usage page (linked from warning banner)
- `...` overflow menus (row + agent header)
- Agent history / Past runs
- The full node config UI for each node type (12+ node types × their schemas)
- Assistant tab in editor (AI-assisted agent building)
- Integrations category contents

## Build notes

- **This is a massive product surface** — Phase 2 of building this sandbox could spend significant time on the agent editor alone if we wanted to. For exploration purposes, **don't try to recreate the full editor** — model the simpler views (Overview, Agent Run) and put the editor in `_reference/profound/agents/_deferred/agent-editor.md` as future work.
- **Split-button primitive** is needed (also in Content tab — Draft ▾, Export ▾, Copy ▾). Promote to `components/ui/SplitButton.tsx` early.
- **Status dot** is needed (also in Content tab). Promote to `components/ui/StatusDot.tsx`.
- **Warning banner** is needed (plan-limit case). New primitive: `<Banner variant="warning|info|error">`.
- **Hero composer** is the same pattern as the Ask tab — promote that to a reusable `<HeroComposer />` shape.
- **Skeleton/placeholder visualization** (the grey blocks in Agent Run output pane) is an interesting "preview of what's coming" affordance. Worth modeling.
- The Agent Editor hiding the main sidebar is a strong product UX signal — full-screen workspace mode. Our `Layout` should support a "focused mode" that hides the sidebar.
