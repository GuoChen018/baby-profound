# Data Viz (alt 2) — `2:8702` (was `1:7266`)

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Data viz" — actually titled **"Workflow Side Nav"**

> ⚠️ This frame is mislabeled. It's not a chart at all — it's the **Workflow feature's left side-nav** with three states: `Blocks`, `Settings`, `Rest` (collapsed).

## Interpretation summary

A 272px-wide expanding nav rail that sits next to the main Workflow canvas. It has a 52px collapsed state ("Rest") and two expanded states for Blocks (drag-and-drop building blocks) and Settings (workflow config).

## Sub-components

| Component | Node IDs | Notes |
|---|---|---|
| `LeftNavigation` (Workflow) | `2:8705` parent, states `2:8706/8765/8780` | The whole rail |
| `NavigationActions` | inline | Action buttons (state × type) |
| `User` | `2:9019`-ish | User chip with state |
| `Tooltip` | inline | hover tooltip on the rail buttons |
| `Dropdown` | inline (type=Profile etc.) | menu opened from rail |

## State summary

- **Rest**: 52px collapsed rail (icons only); `Nav/Blocks` panel `opacity-0` and `left-0`
- **Blocks**: full 272w rail showing draggable Block items (search engines: Google, Bing, Perplexity, Semrush, etc.)
- **Settings**: full 272w rail showing workflow settings

## NEW WORKFLOW PALETTE TOKENS

This frame introduces a new color palette previously unseen — used for the colored block badges in the workflow builder:

| Token | Hex |
|---|---|
| `--workflow-fill-purple` | `#9362F4` |
| `--workflow-fill-green` | `#4EA852` |
| `--workflow-fill-blue` | `#4894EE` |
| `--workflow-fill-orange` | `#EF704A` |

These should be added to `@theme` in Phase 3 — they're the canonical colors for Workflow node types.

## Phase 3 strategy

This is Workflow-feature scoped, not a system primitive. Defer until building the Workflow page itself; recapture against the live product first.

## Asset URLs

- Screenshot: `_reference/figma/01-components/data-viz/screenshot-3.png` (`https://www.figma.com/api/mcp/asset/2bc14a1b-d082-45c0-aa6e-b9dd5ff8b94a`)
