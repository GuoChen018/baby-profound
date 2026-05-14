# `lib/data/`

Per-tab mock data files. Each tab owns its own data file:

```
lib/data/opportunities.ts
lib/data/content.ts
lib/data/ask.ts
lib/data/agents.ts
lib/data/answer-engine-insights.ts
lib/data/prompt-volumes.ts
```

Pages and components for tab `<slug>` import from `@/lib/data/<slug>`.

This pattern keeps parallel work isolated — each tab's subagent writes only to its own file and doesn't conflict with siblings on `lib/mockData.ts`.

`lib/mockData.ts` remains for Overview (which is cross-cutting) and shared formatters.
