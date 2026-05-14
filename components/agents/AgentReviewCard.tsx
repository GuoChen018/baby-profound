"use client";

/**
 * AgentReviewCard — right-rail tile for the "Agent for review" section on
 * the AEO Overview prototype.
 *
 * Visual rules (improved over current flat list):
 *   - Bold headline first ("Review content brief for …") so the reviewer
 *     sees the artifact, not the agent.
 *   - Meta row: <BrandMark> + agent name + dot + relative time.
 *   - Hover lifts the surface and reveals a trailing chevron.
 *   - The entire tile is wrapped in `<Link>` → `/agents/<agentId>`. If we
 *     later model a review against a specific run, this is the right place
 *     to deep-link to `/agents/<agentId>/runs/<runId>` instead.
 */

import Link from "next/link";
import { ChevronRightIcon } from "@/components/ui/icons";
import { BrandMark } from "./BrandMark";
import { agentBrand, agentName, type AgentReview } from "@/lib/data/agent-reviews";
import { cn } from "@/lib/cn";

export interface AgentReviewCardProps {
  review: AgentReview;
  /** Optional override — defaults to `/agents/<agentId>`. */
  href?: string;
  className?: string;
}

export function AgentReviewCard({
  review,
  href,
  className,
}: AgentReviewCardProps) {
  const { agentId, headline, timeAgo } = review;
  // Resolution order: call-site `href` prop (rare override) →
  // `review.href` (per-artifact target, e.g. `/content/<id>` for a
  // Reddit reply draft) → `/agents/<agentId>` (the default agent
  // detail surface).
  const target = href ?? review.href ?? `/agents/${agentId}`;
  const brand = agentBrand(agentId);
  const name = agentName(agentId);

  return (
    <Link
      href={target}
      className={cn(
        // No own border — parent `<RailGroup>` wraps siblings in a single
        // rounded container with hairline dividers.
        "group block px-14 py-12",
        "transition-colors hover:bg-bg-secondary",
        "focus-visible:outline-none focus-visible:bg-bg-secondary",
        className,
      )}
    >
      <div className="flex items-start gap-12">
        <div className="flex-1 min-w-0">
          {/* Headline = Body/Medium (14/20, weight 500) so it sits in
              the same typographic register as the OpportunityTile title
              below. Body/SmallMedium (13/16) felt cramped at the rail
              width; regular weight didn't read as a card title. */}
          <p className="text-paragraph font-medium text-text-primary line-clamp-2">
            {headline}
          </p>
          <div className="mt-8 flex items-center gap-8 text-mini text-text-secondary min-w-0">
            <BrandMark brand={brand} size="sm" />
            <span className="truncate font-medium text-text-secondary">
              {name}
            </span>
            <span className="text-fill-tertiary" aria-hidden>
              •
            </span>
            <span className="text-text-tertiary whitespace-nowrap">{timeAgo}</span>
          </div>
        </div>
        <ChevronRightIcon
          aria-hidden
          className="size-14 self-center text-text-tertiary shrink-0 group-hover:text-text-primary transition-colors"
        />
      </div>
    </Link>
  );
}
