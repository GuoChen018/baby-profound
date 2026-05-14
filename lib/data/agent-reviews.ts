/**
 * Agent reviews — mock data feeding the Overview "Agent for review"
 * right-rail section.
 *
 * Each entry represents an output an agent produced that's waiting on a
 * human review/approve step. The `agentId` reuses an id from
 * `lib/data/agents.ts` so the card can link to a real `/agents/<id>`
 * page (the canonical detail surface) — no dead links. When an artifact
 * lives in a different surface (e.g. the content editor for a Reddit
 * reply draft), `href` overrides that default.
 *
 * Three entries — ordered so the rail's `slice(0, 2)` on the Overview
 * page picks the two concrete-artifact reviews (Reddit reply draft +
 * AEO suggestions) and leaves the periodic Weekly Brand Health digest
 * at position 3 (spills to the agents list). The two visible cards
 * thread together as "agents are actively reviewing your contested
 * topics today" — Reddit catches a community gap, AEO catches an
 * on-page gap — which pairs cleanly with the neighboring Top
 * Opportunities rail.
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
  /**
   * Optional deep-link target. Defaults to `/agents/<agentId>`. Use this
   * when the artifact lives in a different surface (e.g. a Reddit reply
   * draft routes to `/content/<id>`).
   */
  href?: string;
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
    // Reddit Sentiment Tracker → drafts a reply when it detects a thread
    // where Brex is missing from the comments. The card deep-links to
    // the content editor so the human can review the tone before
    // approving (instead of bouncing through the agent detail page).
    // Position 1 because it's the most concrete artifact (a specific
    // reply for a specific thread) and the most time-sensitive (the
    // Reddit thread is live now).
    id: "rev-reddit-reply-startups-best-corp-card",
    agentId: "ag-reddit-sentiment-tracker",
    headline:
      "Review draft response for r/startups \u00b7 \u2018Best corporate card for early-stage startups?\u2019",
    timeAgo: "2h ago",
    href: "/content/reddit-reply-startups-best-corporate-card",
  },
  {
    // AEO Article Optimizer drafted suggestions for the high-limit
    // page — which is also opportunity #3 on the spillover. The
    // pairing is intentional: the marketer can review the AI
    // suggestions here without going to the listing first. Position
    // 2 because it's also a concrete content artifact, just less
    // time-pressing than a live Reddit thread.
    id: "rev-aeo-article-optimizer-003",
    agentId: "ag-aeo-article-optimizer",
    headline:
      "Review AEO suggestions for brex.com/high-limit-business-credit-card",
    timeAgo: "3h ago",
  },
  {
    // Weekly brand health digest — periodic, lower-urgency review.
    // Demoted to position 3 (off-rail) because the rail's 2-card
    // cap should prioritize concrete artifact reviews over periodic
    // approvals. Still visible on the Agents listing.
    id: "rev-weekly-content-gap-002",
    agentId: "ag-weekly-content-gap",
    headline: "Approve weekly brand health digest for May 6\u201312",
    // Capitalized — matches how Apple/Linear/etc. write relative
    // dates when they appear as standalone labels (vs. mid-sentence
    // "yesterday"). Consistent with how the first review reads
    // "2h ago" — both are pill-like meta labels.
    timeAgo: "Yesterday",
  },
];
