/**
 * OpportunityCard — shared opportunity surface.
 *
 * Used by Overview's Top Opportunities and the Opportunities tab.
 *
 * Visual rules (sampled from `_reference/profound/opportunities/screenshot.png`):
 *   - FLAT list item — no card chrome, no rounded corners, no lifted bg.
 *   - Items are separated by a hairline `border-b border-fill-quaternary`
 *     placed by the parent list. We just render the inner row.
 *   - Header line: <Tag with type icon> <Target label + action icon>
 *   - Person target: just the name + an envelope icon (no avatar circle, no chevron).
 *   - URL target: text + external-link icon.
 *   - Headline: `text-base font-semibold text-text-primary`.
 *   - Description: `text-small text-text-secondary`, line-clamp-2 in compact.
 *   - Current Performance: muted label + status / meter.
 *   - Right edge: chevron-right when the row is a link.
 */

"use client";

import Link from "next/link";
import {
  ArrowTopRightOnSquareIcon,
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  InformationCircleIcon,
  PencilIcon,
  SparklesIcon,
  XMarkIcon,
} from "@/components/ui/icons";
import type {
  CurrentPerformance,
  Opportunity,
  OpportunityTarget,
  OpportunityType,
} from "@/lib/types";
import { cn } from "@/lib/cn";
import { Meter, Tag } from "@/components/ui";

export interface OpportunityCardProps {
  opportunity: Opportunity;
  /** Where clicking the row navigates. */
  href?: string;
  /** Compact (Overview) trims description to 2 lines. */
  compact?: boolean;
  className?: string;
}

const TYPE_ICON: Record<OpportunityType, { Icon: React.ElementType; tone: string }> = {
  Outreach: { Icon: EnvelopeIcon, tone: "text-text-green" },
  "Content Optimization": { Icon: SparklesIcon, tone: "text-badge-amber-emphasis" },
  "Content Creation": { Icon: PencilIcon, tone: "text-text-green" },
  Reddit: { Icon: ChatBubbleLeftRightIcon, tone: "text-badge-orange-emphasis" },
  LinkedIn: { Icon: ChatBubbleLeftRightIcon, tone: "text-badge-blue-emphasis" },
};

export function OpportunityCard({
  opportunity,
  href,
  compact = false,
  className,
}: OpportunityCardProps) {
  const { type, target, headline, description, currentPerformance } = opportunity;
  const { Icon: TypeIcon, tone } = TYPE_ICON[type];

  const inner = (
    <article
      className={cn(
        "group flex items-stretch gap-16",
        "py-20",
        href && "transition-colors hover:bg-bg-secondary/40 cursor-pointer",
        className,
      )}
    >
      <div className="flex-1 min-w-0 space-y-8">
        <div className="flex items-center gap-12 flex-wrap">
          <Tag
            asSpan
            size="sm"
            iconLeft={<TypeIcon className={cn("size-12", tone)} />}
            className="bg-bg-tertiary"
          >
            {type}
          </Tag>
          <TargetLabel target={target} type={type} />
        </div>

        <p className="text-base font-semibold text-text-primary leading-snug">
          {headline}
        </p>

        {description ? (
          <p
            className={cn(
              "text-small text-text-secondary leading-relaxed",
              compact && "line-clamp-2",
            )}
          >
            {description}
          </p>
        ) : null}

        <CurrentPerformanceRow performance={currentPerformance} />
      </div>

      {href ? (
        <ChevronRightIcon
          aria-hidden
          className="size-16 self-center text-text-tertiary shrink-0 group-hover:text-text-secondary"
        />
      ) : null}
    </article>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block focus-visible:outline-none focus-visible:shadow-focus rounded-4"
      >
        {inner}
      </Link>
    );
  }
  return inner;
}

// ───────────────── helpers ─────────────────

function TargetLabel({
  target,
  type,
}: {
  target: OpportunityTarget;
  type: OpportunityType;
}) {
  if (target.kind === "person") {
    return (
      <span className="inline-flex items-center gap-6 text-small text-text-secondary">
        <span className="text-text-primary font-medium">{target.label}</span>
        {/* Action affordance icon — Outreach implies email; default to envelope. */}
        {type === "Outreach" ? (
          <EnvelopeIcon className="size-12 text-text-tertiary" />
        ) : null}
      </span>
    );
  }
  if (target.kind === "url" || target.kind === "subreddit") {
    return (
      <span className="inline-flex items-center gap-4 text-small text-text-secondary font-medium truncate">
        <span className="text-text-primary truncate">{target.label}</span>
        <ArrowTopRightOnSquareIcon className="size-12 text-text-tertiary shrink-0" />
      </span>
    );
  }
  return (
    <span className="text-small text-text-secondary font-medium italic">{target.label}</span>
  );
}

function CurrentPerformanceRow({ performance }: { performance: CurrentPerformance }) {
  return (
    <div className="flex items-center gap-12 pt-4 whitespace-nowrap">
      <span className="text-mini text-text-tertiary">Current Performance:</span>
      {performance.status === "Not Mentioned" ? (
        <span className="inline-flex items-center gap-4 text-small font-medium text-text-red">
          <XMarkIcon className="size-12" />
          Not Mentioned
        </span>
      ) : (
        <span className="inline-flex items-center gap-8">
          <Meter value={performance.value} className="w-80 shrink-0" />
          <span className="text-small text-text-primary tabular-nums">
            {performance.value.toFixed(1)}%
          </span>
          <span className="text-small text-text-secondary">{performance.status}</span>
          <InformationCircleIcon className="size-12 text-text-tertiary shrink-0" />
        </span>
      )}
    </div>
  );
}
