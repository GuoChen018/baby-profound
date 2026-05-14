/**
 * OpportunityFilters — single-select chip row for filtering by type.
 *
 * Visual idiom: low-chrome rounded pills (re-using `Tag`'s shape) with a
 * subtle shadow-flat on the selected chip — same treatment SegmentedControl
 * uses for its raised tile, but laid out as a wider chip row because we
 * have 6 categories and SegmentedControl was designed for compact mode
 * selectors. A type-icon leads each chip so the row reads at a glance.
 *
 * NOTE: This is a simple local primitive — if a second tab needs the same
 * "single-select chip row" pattern (e.g. Knowledge Bases > source type),
 * it should be promoted to `components/ui/FilterChips.tsx`.
 */

"use client";

import {
  BoltIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  PencilIcon,
  SparklesIcon,
  Squares2X2Icon,
} from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import {
  OPPORTUNITY_FILTERS,
  type OpportunityFilter,
} from "@/lib/types/opportunities";

const FILTER_ICON: Record<
  OpportunityFilter,
  { Icon: React.ElementType; tone: string }
> = {
  All: { Icon: Squares2X2Icon, tone: "text-text-tertiary" },
  Outreach: { Icon: EnvelopeIcon, tone: "text-text-green" },
  "Content Optimization": {
    Icon: SparklesIcon,
    tone: "text-badge-amber-emphasis",
  },
  "Content Creation": { Icon: PencilIcon, tone: "text-text-green" },
  Reddit: { Icon: ChatBubbleLeftRightIcon, tone: "text-badge-orange-emphasis" },
  LinkedIn: {
    Icon: ChatBubbleLeftRightIcon,
    tone: "text-badge-blue-emphasis",
  },
  // Bolt + purple matches the rest of the Agent surface (list card,
  // detail header, action card glyph).
  Agent: { Icon: BoltIcon, tone: "text-badge-purple-emphasis" },
};

export interface OpportunityFiltersProps {
  value: OpportunityFilter;
  onChange: (value: OpportunityFilter) => void;
  /** Optional counts shown after each label, e.g. "Outreach · 3". */
  counts?: Partial<Record<OpportunityFilter, number>>;
  className?: string;
}

export function OpportunityFilters({
  value,
  onChange,
  counts,
  className,
}: OpportunityFiltersProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Filter opportunities by type"
      className={cn("flex flex-wrap items-center gap-8", className)}
    >
      {OPPORTUNITY_FILTERS.map((option) => {
        const isSelected = option === value;
        const { Icon, tone } = FILTER_ICON[option];
        const count = counts?.[option];
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option)}
            className={cn(
              "inline-flex items-center gap-8",
              "rounded-full px-12 py-6 text-small font-medium",
              "transition-colors duration-100",
              "focus-visible:outline-none focus-visible:shadow-focus",
              isSelected
                ? "bg-control-bg text-text-primary shadow-flat"
                : "bg-bg-tertiary text-text-secondary hover:text-text-primary hover:bg-fill-quaternary",
            )}
          >
            <Icon
              aria-hidden
              className={cn(
                "size-14 shrink-0",
                isSelected ? tone : "text-text-tertiary",
              )}
            />
            <span className="whitespace-nowrap">{option}</span>
            {typeof count === "number" ? (
              <span
                className={cn(
                  "tabular-nums text-mini",
                  isSelected ? "text-text-tertiary" : "text-text-quaternary",
                )}
              >
                {count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
