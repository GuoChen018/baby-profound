# Prompt Volumes tab

**Route**: `/<workspace-id>/Brex/prompt-volumes`
**Theme observed**: Dark

## Purpose

A query-research tool — surface the **specific prompts users are asking AI engines** that result in citations to your domain (or related domains). Click an explorer keyword to see how it's being phrased in real AI conversations. Inverse of "what keywords show up in Profound" — this is "what are people actually typing into AI to land at your page."

The page name doesn't quite match the UI either: the heading says "Explore what people are prompting in AI" — it's effectively a **prompt explorer / search tool**, with citation analytics underneath.

## Layout (top to bottom)

1. **Hero header band** (a flat dark panel):
   - Center title "Explore what people are prompting in AI"
   - Below: a search/composer pill with `Enter a keyword...` placeholder, plus a left icon group (looks like advanced filter toggles), and a right-side "Bulk analysis" toggle + "Analyze" button (disabled until input). The "Analyze" button is in the disabled / control-bg state.
2. **Sub-tab bar**: "Relevant Prompts" (active, underlined) · "Keyword Lists"
3. **Section: Prompts Citing** + filter chip `brex.com ▾` (domain selector) + right-aligned search input `Search web pages` with magnifying icon
4. **Subtitle**: "A sample of user prompts that drove citations to pages on this domain"
5. **Web page accordion list** — each row is a collapsible card showing:
   - Path (e.g. `/spend-trends/corporate-credit-cards/easiest-business-credit-cards-to-get`)
   - "29 prompts" subtitle
   - Chevron-right link icon (opens the page externally)
6. **First row is expanded** showing nested table of prompts:
   - Columns: User Prompt · Cited Websites · Date Asked
   - User Prompt cell (with info icon "ⓘ"): the actual question typed by the user
   - Cited Websites cell: a row of small **PlatformAvatar**s (4-5 brand-colored circles per prompt) + optionally `+1` overflow indicator
   - Date Asked cell: formatted date (e.g. "15 Apr, 2026")
   - Footer of expanded row: "View more ↗" link
7. **More collapsed rows** below: `/product/business-account 27 prompts`, `/support/brex-account-requirements 22 prompts`, `/product/credit-card 19 prompts`, `/ (Home) 18 prompts`, etc.
8. **Bottom controls**:
   - `Expand ▾` button (collapse/expand all)
   - Right: pagination "Showing 1-10 of 348 items"

## Data shapes

```ts
type PromptVolumesPage = {
  domain: string;
  pages: Array<{
    path: string;
    promptCount: number;
    prompts: Array<{
      text: string;
      citedPlatforms: PlatformId[];   // up to ~5 visible, rest as +N overflow
      askedAt: ISODate;
    }>;
  }>;
  pagination: { page: number; pageSize: number; total: number };
};
```

## Primitives used

- **Composer / search input** (custom variant — wider, more prominent than `Input`; with action button slot on the right)
- `Select` (domain filter `brex.com ▾`)
- `Toggle` ("Bulk analysis")
- `Button` (Analyze, Expand, View more)
- `TabBar` (Relevant Prompts / Keyword Lists)
- **Accordion list** — page-row collapsibles
- **Nested table** inside expanded rows (3 columns)
- **PlatformAvatar** row (recurring pattern — multiple avatars in one cell, common across the product)
- Pagination footer

## Interactions inferred

- Enter keyword in composer → analyze single prompt
- Toggle "Bulk analysis" → composer expands to multi-line / list input
- Click "Analyze" → dispatch query, results appear
- Click `brex.com ▾` → domain selector dropdown (other tracked domains)
- Search web pages → filter the accordion list
- Click accordion row chevron → expand/collapse
- Click chevron-right on row → open external page
- "View more ↗" → load more prompts for that page
- Hover platform avatar → tooltip with platform name + maybe link to that AI engine's response
- Sort table columns (info icon next to User Prompt suggests there's metadata exposed on hover)

## Deferred sub-pages

- Bulk analysis input UI
- Keyword Lists sub-tab
- Domain selector dropdown content
- Analyze-results view (what shows up after running analysis)
- Per-prompt drill (clicking a specific prompt → maybe show the full AI response)

## Build notes

- This is a **research-tool aesthetic** — the hero composer is the focal point. The accordion list below is secondary navigation through results.
- The accordion + nested table pattern is unique to this tab; not used elsewhere in our captures.
- "Cited Websites" cells with stacked PlatformAvatars are essentially **mini chip groups** — pattern probably worth a `<PlatformAvatarStack platforms={...} max={5} />` primitive.
- Domain selector chip `brex.com ▾` is interesting — likely uses `Select` with custom label that shows the domain. The Figma `Select` design context mentioned a `Website selector` dropdown type (208×192) for exactly this kind of picker.
