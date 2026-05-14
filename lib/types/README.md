# `lib/types/`

Per-tab types. Each tab owns its own types file:

```
lib/types/opportunities.ts
lib/types/content.ts
lib/types/ask.ts
lib/types/agents.ts
lib/types/answer-engine-insights.ts
lib/types/prompt-volumes.ts
```

Shared types (`SignedPercent`, `SignedCount`, `SeriesPoint`, `Platform`, etc.) stay in `lib/types.ts`.

Tab subagents add their own types here without touching the shared file.
