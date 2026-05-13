# Content tab

**Route**: `/<workspace-id>/Brex/content`
**Theme observed**: Dark
**Captures**:
- `screenshot.png` — Content overview (create/optimize launchpad + projects table)
- `screenshot-content-detail.png` — inside a specific piece (rich-text editor + AEO sidebar)

## Purpose

A **content generation + optimization workspace** — produce AEO-optimized articles (Content Brief → Final Draft) and audit existing content for AI-visibility gaps. Output of these projects is structured content briefs ready for publication.

Two top-level workflows: **Create** (greenfield content from scratch) and **Optimize** (improve an existing URL). Documents move through statuses (Draft → Completed → Published?).

## View 1: Content Overview

### Layout

1. **Page header**: title "Content" · sub-tabs (**Generate Content** active, underlined · Tools)
2. **Section: Start a New Project**:
   - Two-up card grid:
     - **Create** card: small `+` icon · "Create" title · "Generate high-performing AEO content in minutes." subtitle · `+ Create New Content` button (disabled-looking)
     - **Optimize** card: small `✦` icon + "Optimize **Beta**" pill · "Use Profound AI to enhance your content to boost visibility." subtitle · `✦ Optimize Existing Content` button
3. **SegmentedControl**: `Content Generation` (active, dark) · `Content Optimization` (inactive, lighter) — this controls which set of projects is shown in the table
4. **Table area**:
   - Right-aligned `↻ Refresh table` button + "Showing 1-2 of 2 items" counter + pagination arrows
   - Columns: Title · Status · Template · Updated · (action column with status dropdown)
   - Row 1: "Financial Experts' Definitive Guide to the Highest Rated Business Credit Cards" + 5 platform avatars below title + `● Completed` (green) status + "Blog Post" template + "1 month ago" + `● Draft ▾` action
   - Row 2: "Top 7 Business Credit Cards With Highest Sign-Up Bonuses 2026" + `● Completed` + "Blog Post" + "1 month ago" + `● Draft ▾`

## View 2: Content Detail (article editor)

A full-featured rich-text editor with an AEO-focused side panel.

### Layout

1. **Top bar**:
   - `‹ Back` link
   - Title: "Financial Experts' Definitive Guide to the Highest Rated Business Credit Cards"
   - Right: `Document saved` pill (green) · `● Draft ▾` status dropdown · `📋 Copy ▾` split-button · `⬇ Export ▾` split-button
2. **Sub-tab bar**: **Content Brief** (active) · Final Draft (greyed out / not yet ready) · right-aligned `Create Final Draft ➜` link
3. **Two-pane layout**:
   - **Left pane** (the editor):
     - h1 "Financial Experts' Definitive Guide to the Highest Rated Business Credit Cards"
     - Horizontal divider
     - h2 "Strategic Overview"
     - Bulleted content with `h2`, `p`, `ul`, `li` labels in the **left gutter** — this is a **structured-editor with semantic-tag annotations** showing element type (helps with AEO compliance):
       - "**Target topic**: top business credit cards"
       - "**Target prompts**:"
         - bullet: "What are the highest rated business credit cards right now?"
       - "**Target platforms**: Meta AI, Perplexity, ChatGPT, Microsoft Copilot, Google Gemini, Grok, Google AI Overviews, Google AI Mode"
       - "**Top-cited pages**:" with bulleted list of nerdwallet.com, bankrate.com, forbes.com, thepointsguy.com, money.usnews.com, wallethub.com, creditkarma.com URLs
   - **Right pane** (AEO sidebar):
     - Sub-tabs at top: **AEO** (active, underlined) · History · Workflow · Inputs
     - **Word Count** card: "2,175 — Total words in content"
     - **Metadata** card: rows with "Meta title", "Meta description", "Slug" each with pencil-edit icon and computed values
     - **Headings** card: "35 total" + scrollable list of headings (h1 "Financial Experts' Definitive Guide...", h2 "Strategic Overview", h2 "Content Brief", h1 (duplicate), h2 "Brex Business Credit Card", etc.)

## Data shapes

```ts
type ContentProject = {
  id: string;
  title: string;
  status: 'Draft' | 'Completed' | 'Published' | 'Archived';
  template: 'Blog Post' | 'FAQ' | 'Comparison' | ...;
  workflow: 'generation' | 'optimization';
  citedPlatforms: PlatformId[];  // shown as avatars below title
  updatedAt: ISODate;
  
  // The brief / draft document:
  brief: {
    title: string;
    targetTopic: string;
    targetPrompts: string[];
    targetPlatforms: PlatformId[];
    topCitedPages: { url: string; }[];
    body: RichTextDocument;  // semantic-tagged
  };
  finalDraft?: RichTextDocument;
  
  metadata: {
    metaTitle: string;
    metaDescription: string;
    slug: string;
  };
  headings: Array<{ level: 1|2|3|...; text: string }>;
  wordCount: number;
};
```

## Primitives used

- `TabBar` (sub-tabs at page + editor levels)
- `SegmentedControl` (Content Generation / Content Optimization)
- `Card` (Create + Optimize launchpad cards)
- `Button` (Create New Content, Optimize Existing, Refresh table, Back, Create Final Draft)
- **Split-button** (Copy ▾, Export ▾) — confirms need for this primitive (same as Agents `+ New Agent ▾`)
- **Status dot + dropdown** (`● Draft ▾`, `● Completed`) — `StatusDot` + dropdown
- **"Document saved" pill** — new variant of Badge? Or a status pill? Green muted bg with green text.
- **Platform avatar stack** (5 platforms below row title) — recurring pattern
- **Rich text editor** with semantic-tag annotations in left gutter (custom component, probably TipTap/ProseMirror)
- **Right-pane metadata editor** (Metadata card with inline-editable fields)
- **Headings list** (collapsible scroll list)

## Interactions inferred

- Click "Create New Content" → opens template picker / new project flow
- Click "Optimize Existing Content" → URL input → analysis
- SegmentedControl switches the visible projects table
- Click a project row → opens the content detail view
- In editor: edit content live, "Document saved" pill updates
- Change status via dropdown → moves between Draft / Completed
- Copy ▾ → quick copy as markdown / HTML / etc.
- Export ▾ → export as DOCX / MD / publish to CMS
- AEO sub-tab: inline-edit metadata fields with pencil
- History sub-tab → revision log
- Workflow sub-tab → see the agent flow that generated this doc (links back to Agents)
- Inputs sub-tab → see what prompts/parameters drove this content
- Heading row click → scrolls editor to that heading

## Deferred sub-pages

- Tools sub-tab on page header
- Create New Content flow (template picker, agent selection?)
- Optimize Existing Content flow (URL input)
- Final Draft view (Content Brief → Final Draft transition)
- History / Workflow / Inputs sub-tabs in detail view
- Status menu options (full state machine)
- The full Copy ▾ and Export ▾ menus

## Build notes

- **The editor side panel pattern (AEO / History / Workflow / Inputs)** is a useful design pattern — context tabs at the document level. Worth noting in interactions.md.
- **Semantic-tag gutter annotations** (`h1`, `h2`, `p`, `ul`, `li` labels next to each block in the editor) are a distinctive Profound touch — emphasizes the AEO mission (structured content matters). It's a clever marriage of editor UX + AEO checklist.
- This view connects to **Agents** ("Workflow" sub-tab in the right pane links back to the generating agent). Builds intuition for cross-tab navigation patterns.
- **Confirms split-button primitive** is needed (3 in this view: Copy, Export, status). Definitely worth promoting to `components/ui/SplitButton.tsx`.
- The platform-avatar stack pattern (5 avatars next to a title) is the same as Prompt Volumes and Answer Engine Insights. Definitely a `<PlatformAvatarStack max={5} />` primitive.
