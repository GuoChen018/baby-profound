"use client";

/**
 * OpportunityTile — right-rail tile for the Overview "Top
 * Opportunities" section.
 *
 * The card is small but layered:
 *
 *   1. **Impact badge** — `High Impact` / `Medium` / `Low`, color-coded
 *      so a marketer can scan the rail and immediately separate the
 *      "drop everything and do this" tiles from the "useful but not
 *      urgent" ones. The earlier version of this card omitted impact
 *      and relied on the `reason` line alone to convey urgency — but
 *      reading three middot-joined fields takes longer than glancing
 *      at a colored pill, so we put the pill back in for at-a-glance
 *      priority signaling.
 *   2. **Action** — a single sentence, verb-first, that names what
 *      to do and the target it acts on. Examples:
 *        - "Create content brief for 'top business credit cards'"
 *        - "Strengthen page brex.com/high-limit-business-credit-card"
 *        - "Reach out to Jerod Morales (Forbes)"
 *      The verb tells you the action type, which is why we dropped
 *      the action-type pill that used to live at the top of the card
 *      — it was carrying information already present in the title.
 *   3. **Reason** — a 3-slot middot string that answers "why this
 *      one?". The slots, in order, are:
 *        - **anchor**     — the magnitude ("164k/mo", "0.1% share",
 *                           "12 mentions"). Always required.
 *        - **scope**      — optional channel/time qualifier when not
 *                           already baked into the action ("May
 *                           coverage", "Forbes"). Most cards skip it.
 *        - **comparison** — the trend, competitor signal, or gap
 *                           callout that makes this notable ("slipped
 *                           #2 → #3", "Ramp at 14%", "unmonitored").
 *                           Always required.
 *      Reason answers "why this one?", while the badge answers "how
 *      urgent?". Both are needed because they're different questions.
 *
 * The chevron sits on a `self-center` so it floats vertically
 * centered against the badge+action+reason stack (matches
 * AgentReviewCard). The whole tile is the `<Link>`. Parent
 * `<RailGroup>` provides the bordered container + hairline dividers.
 *
 * Earlier versions of this tile had a pill (action type), an
 * action-type icon table (TYPE_META), a free-form context paragraph,
 * and a "currentPerformance" footer row. All four are gone — the
 * new schema replaces them with the structured (impact, action,
 * reason) triple.
 */

import Link from "next/link";
import { ChevronRightIcon } from "@/components/ui/icons";
import { Badge, type BadgeColor } from "@/components/ui";
import { cn } from "@/lib/cn";

/**
 * Impact tiers. Three levels are enough — adding a fourth ("Urgent",
 * "Critical", etc.) starts diluting the signal. Profound's product
 * tends to use the same three-tier scheme so the marketer doesn't
 * have to relearn a vocabulary across surfaces.
 *
 * The tier→color mapping uses the existing chromatic badge tokens:
 *   - High   → green  (think "high-leverage opportunity to grab" —
 *                      green reads as positive/actionable, not
 *                      alarming. We tried red first; the dark-mode
 *                      red pill was visually loud enough that it
 *                      overshadowed the action title underneath
 *                      and felt closer to a crisis indicator than a
 *                      priority signal. Green keeps the same
 *                      muted-bg-plus-light-text recipe but with a
 *                      calmer hue.)
 *   - Medium → amber  (warm but not alarming — same recipe as green)
 *   - Low    → grey   (neutral parking lot)
 *
 * Labels are pinned to the original screenshot — "High Impact" spells
 * the noun out, but "Medium" and "Low" stand alone (because "Medium
 * Impact" reads slightly redundant once the High Impact neighbor has
 * established the dimension).
 */
export type OpportunityImpact = "High" | "Medium" | "Low";

const IMPACT_META: Record<
  OpportunityImpact,
  { label: string; color: BadgeColor }
> = {
  High: { label: "High Impact", color: "green" },
  Medium: { label: "Medium", color: "amber" },
  Low: { label: "Low", color: "grey" },
};

/**
 * Structured reason. The data layer is responsible for filling
 * `anchor` and `comparison`; `scope` is reserved for the cases
 * where the action doesn't already name the scope (e.g. an
 * outreach card where the action is "Reach out to <person>" and
 * the scope adds the publication/time window).
 */
export type OpportunityReason = {
  /** Primary magnitude: "164k/mo", "0.1% share", "12 mentions". */
  anchor: string;
  /** Optional channel / time-window qualifier. */
  scope?: string;
  /** Comparison, trend, or gap callout. */
  comparison: string;
};

export type PrototypeOpportunity = {
  id: string;
  /**
   * Priority signal. Required — every rail tile gets a badge so the
   * column reads as a scannable triage list rather than five
   * equal-weight options. Cards default to `Medium` if the data
   * author can't decide.
   */
  impact: OpportunityImpact;
  /**
   * Full action sentence. Verb-first; the target (topic, URL,
   * person, channel) is embedded inline. Examples:
   *   - "Create content brief for 'top business credit cards'"
   *   - "Strengthen page brex.com/high-limit-business-credit-card"
   *   - "Reach out to Jerod Morales (Forbes)"
   *   - "Monitor r/startups corporate card threads"
   */
  action: string;
  reason: OpportunityReason;
  /** Detail-page href. Resolved already-prefixed by the data layer. */
  href: string;
};

export interface OpportunityTileProps {
  opportunity: PrototypeOpportunity;
  className?: string;
}

/**
 * Compose the reason slots into a single middot-joined string.
 * Filtering out empty slots keeps the rendered line clean when
 * `scope` is omitted (the common case).
 */
function formatReason(reason: OpportunityReason): string {
  return [reason.anchor, reason.scope, reason.comparison]
    .filter(Boolean)
    .join(" \u00b7 ");
}

export function OpportunityTile({
  opportunity,
  className,
}: OpportunityTileProps) {
  const { impact, action, reason, href } = opportunity;
  const reasonLine = formatReason(reason);
  const impactMeta = IMPACT_META[impact];

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
      <div className="flex items-start gap-12">
        <div className="flex-1 min-w-0">
          {/* Impact badge — top of the card so it's the first thing
              you see when scanning the rail. `mb-10` gives it a
              clear pause from the action title underneath; tighter
              spacing made the badge feel attached to the title
              instead of acting as a separate metadata row.
              `h-24 px-10` overrides the Badge's default `sm` sizing
              (`h-18 px-6`) — the sm size was visually pinched once
              the muted-bg dark-mode recipe was applied, and h-24
              gives ~5px of vertical padding around the 14px-tall
              text-mini glyphs (vs. ~4px at h-22), which reads as
              the roomier pill the user wanted without going so far
              that the badge dwarfs the action title underneath.
              `!border-0` strips the Badge's default 1px hairline
              border — needs `!` because the project's `cn()` is
              plain clsx (no tailwind-merge), so without important
              the base `border-[1px]` may or may not lose the cascade
              fight depending on source order. */}
          <Badge
            color={impactMeta.color}
            size="sm"
            className="mb-10 h-24 px-10 !border-0"
          >
            {impactMeta.label}
          </Badge>
          {/* Action — primary text. Body/Medium (14/20, weight 500)
              keeps it level with `AgentReviewCard`'s headline so
              both rail tiles share one typographic register.
              3-line clamp protects against very long actions while
              giving titles like "Create content brief for 'top
              business credit cards'" room to wrap. */}
          <p className="text-paragraph font-medium text-text-primary line-clamp-3">
            {action}
          </p>
          {/* Reason — the current-state evidence. 2-line clamp
              catches the rare 3-slot string that runs long
              (e.g. "12 Ramp citations · Forbes · 0 Brex citations").
              `leading-[18px]` overrides the default `text-mini`
              line-height (14px, which is too tight for two-line wraps
              — at 12px font that's a 1.17 ratio that reads as
              cramped). 18px gives a 1.5 ratio, matching what we use
              for body paragraphs. */}
          <p className="mt-8 text-mini leading-[18px] text-text-secondary line-clamp-3">
            {reasonLine}
          </p>
        </div>
        <ChevronRightIcon
          aria-hidden
          className="size-14 self-center text-text-tertiary shrink-0 group-hover:text-text-primary transition-colors"
        />
      </div>
    </Link>
  );
}
