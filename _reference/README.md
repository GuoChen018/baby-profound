# `_reference/` — captured context

This folder is the **source of truth** that grounds the agent. Before implementing any page or component, re-read the relevant subfolder.

Two sources:

- `figma/` — design system extracted via Figma MCP from file `ms5KIXErDeevPJ3a1zIOcr` (Profound-Design-Exercise). Tokens + primitives.
- `profound/` — live product crawl from `platform.tryprofound.com`. Screens, layouts, interactions.

Re-capture protocol:

- **Figma**: open `figma/README.md` for the node-id map, then `get_design_context` + `get_screenshot` on the frame you want.
- **Profound**: user logs in → agent locks the tab → captures into `profound/<slug>/`.

Privacy: captured Profound screenshots may contain real-looking demo data. Treat as reference only; never copy verbatim into `lib/mockData.ts`.
