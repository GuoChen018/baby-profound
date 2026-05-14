"use client";

/**
 * OpportunityTile — right-rail tile for the AEO Overview prototype's
 * "Top Opportunities" section.
 *
 * Profound's opportunity surface follows a 4-zone pattern:
 *
 *   1. **Pill** — the action type (Outreach, Optimize Page, …). Tells
 *      the user *what they'd be doing*, not what the content is about.
 *   2. **Title** — action-first opportunity framing ("Create a content
 *      brief for a high-volume topic where Brex lost ranking this
 *      week"). Leads with what's possible, not what went wrong.
 *   3. **Context line** — one sentence explaining why this matters
 *      *right now*. Pre-joined with middots in the data layer so the
 *      tile just renders it. Should answer at least one of: what's the
 *      volume, where's the competitive gap, what's the timing.
 *   4. **Current performance** — the specific gap signal ("Citation
 *      share: Not mentioned · top business credit cards"). The label
 *      is the metric, the value is the gap, and the optional
 *      sub-context tells you WHERE the gap is.
 *
 * The whole tile is the `<Link>` — no separate CTA. Hover lifts the
 * surface; the parent `<RailGroup>` owns the bordered chrome and
 * hairline dividers between sibling tiles (see `AgentReviewCard` for
 * the matching pattern).
 *
 * Earlier versions of this tile shipped a `mode="metrics"` API that
 * stacked 2-3 metric rows under the headline. We've dropped that
 * entirely — three stacked metrics added cognitive load instead of
 * reducing it. Title + context + a single performance line do the
 * same work and scan in one beat.
 */

import Link from "next/link";
import {
  ChevronRightIcon,
  BoltIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  PencilIcon,
  SparklesIcon,
} from "@/components/ui/icons";
import { Tag } from "@/components/ui";
import { cn } from "@/lib/cn";

export type PrototypeOpportunityType =
  | "Content Creation"
  | "Optimize Page"
  | "Create Content Brief"
  | "Outreach"
  | "Set Up Agent";

export type PrototypeOpportunity = {
  id: string;
  type: PrototypeOpportunityType;
  /** Action-first opportunity framing, 2-3 lines max in the rail. */
  title: string;
  /** One-sentence context. Already joined with " · " in the data layer. */
  context: string;
  /** Specific gap signal. `label` is the metric, `value` is the gap. */
  currentPerformance: { label: string; value: string };
  /** Detail-page href, baked already-prefixed if this lives inside a
   *  prototype namespace. The tile passes it straight to `<Link>`. */
  href: string;
};

export interface OpportunityTileProps {
  opportunity: PrototypeOpportunity;
  className?: string;
}

/**
 * Per-action-type icon + accent tone. Tone matches the badge palette
 * conventions used by `OpportunityCard` so the AEO Overview prototype
 * stays visually consistent with the canonical opportunities surface.
 *
 *   - Content actions (Creation, Brief, Optimize Page) → green / amber
 *   - Outreach → green (relationship work)
 *   - Set Up Agent → blue (automation)
 */
const TYPE_META: Record<
  PrototypeOpportunityType,
  { Icon: React.ElementType; tone: string }
> = {
  "Content Creation": { Icon: PencilIcon, tone: "text-text-green" },
  "Optimize Page": { Icon: SparklesIcon, tone: "text-badge-amber-emphasis" },
  "Create Content Brief": {
    Icon: DocumentTextIcon,
    tone: "text-badge-amber-emphasis",
  },
  Outreach: { Icon: EnvelopeIcon, tone: "text-text-green" },
  "Set Up Agent": { Icon: BoltIcon, tone: "text-badge-blue-emphasis" },
};

export function OpportunityTile({
  opportunity,
  className,
}: OpportunityTileProps) {
  const { type, title, context, currentPerformance, href } = opportunity;
  const { Icon: TypeIcon, tone } = TYPE_META[type];

  return (
    <Link
      href={href}
      className={cn(
        // No own border — parent `<RailGroup>` owns the rounded
        // container + hairline dividers.
        "group block px-14 py-12",
        "transition-colors hover:bg-bg-secondary",
        "focus-visible:outline-none focus-visible:bg-bg-secondary",
        className,
      )}
    >
      {/* Top row — action pill + trailing chevron. The chevron is the
          only "this opens something" cue (the whole row is clickable
          but the chevron makes it explicit). */}
      <div className="flex items-center justify-between gap-8">
        <Tag
          asSpan
          size="sm"
          iconLeft={<TypeIcon className={cn("size-12", tone)} />}
          className="bg-bg-tertiary"
        >
          {type}
        </Tag>
        <ChevronRightIcon
          aria-hidden
          className="size-14 text-text-tertiary shrink-0 group-hover:text-text-primary transition-colors"
        />
      </div>

      {/* Title — action-first, 14/20 so two-line wraps breathe.
          `font-medium` puts it visually above the body but below
          headlines/KPIs which use SemiBold. */}
      <p className="mt-10 text-paragraph font-medium text-text-primary line-clamp-3">
        {title}
      </p>

      {/* Context — secondary text, pre-joined middot string. 2-line
          clamp catches the rare longer string (e.g. "Jerod Morales ·
          Forbes · cited Ramp 12x this month · Brex 0x"). */}
      <p className="mt-6 text-mini text-text-secondary line-clamp-2">
        {context}
      </p>

      {/* Current performance — the gap signal. Label gets `font-medium`
          so the metric name reads as a header for the value. The
          value + optional sub-context (joined into one string by the
          data layer) stays at the tertiary weight so the eye lands on
          the label first. */}
      <p className="mt-10 text-mini text-text-tertiary line-clamp-2">
        <span className="font-medium text-text-secondary">
          {currentPerformance.label}:
        </span>{" "}
        {currentPerformance.value}
      </p>
    </Link>
  );
}
