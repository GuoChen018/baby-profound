# baby-profound

A sandbox for exploring product ideas, grounded in the real Profound product UX and its design system.

## Stack

- Next.js 16 + React 19 + Tailwind 4 (CSS-first)
- TypeScript 5
- Zustand · framer-motion · lucide-react · @floating-ui/react · clsx
- No shadcn — primitives built from captured Figma frames

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Context lives in `_reference/`

The agent is grounded in two captured sources:

- `_reference/figma/` — design system (tokens, primitives) extracted from Figma MCP.
- `_reference/profound/` — live product screens, layouts, and interactions captured from `platform.tryprofound.com` (auth required).

See [AGENTS.md](./AGENTS.md) for the full workflow.

## Explorations

Variant prototypes live in `app/explorations/<slug>/`. They never touch canonical pages.
