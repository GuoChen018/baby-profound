/**
 * Agent reviews — mock data feeding the AEO Overview "Agent for review"
 * right-rail section.
 *
 * Each entry represents an output an agent produced that's waiting on a
 * human review/approve step. The `agentId` reuses an id from
 * `lib/data/agents.ts` so the whole card can link to a real
 * `/agents/<id>` page (the canonical detail surface) — no dead links.
 *
 * Kept intentionally small (2 entries) so the right rail stays scannable
 * inside the new prototype layout.
 */

import { agents } from "./agents";
import type { AgentBrand } from "@/lib/types/agents";

export type AgentReview = {
  id: string;
  /** Must match an agent in `lib/data/agents.ts` so links resolve. */
  agentId: string;
  /** Human-facing title of the artifact awaiting review. */
  headline: string;
  /** Friendly relative-time label — pre-rendered so the surface stays static. */
  timeAgo: string;
};

/** Helper: resolve the brand for a review by reading from the agents list. */
export function agentBrand(agentId: string): AgentBrand {
  return agents.find((a) => a.id === agentId)?.brand ?? "profound";
}

/** Helper: resolve the agent name for a review by reading from the agents list. */
export function agentName(agentId: string): string {
  return agents.find((a) => a.id === agentId)?.name ?? "Untitled Agent";
}

export const agentReviews: AgentReview[] = [
  {
    id: "rev-reddit-insights-001",
    agentId: "ag-reddit-sentiment-tracker",
    headline: "Review content brief for 'top business credit cards'",
    timeAgo: "2h ago",
  },
  {
    id: "rev-weekly-content-gap-002",
    agentId: "ag-weekly-content-gap",
    headline: "Approve weekly brand health digest for May 6–12",
    timeAgo: "yesterday",
  },
];
