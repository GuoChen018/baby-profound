"use client";

/**
 * CitationCard — small clickable card representing a source the assistant
 * relied on. Lives in a horizontal scroll row beneath the assistant
 * response. Each card surfaces:
 *   - a brand-colored platform avatar (which engine surfaced the citation)
 *   - the article title (truncated to 2 lines)
 *   - the source domain
 */

import { ArrowTopRightOnSquareIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type { Citation } from "@/lib/types/ask";
import { PlatformAvatar } from "./PlatformAvatar";

export interface CitationCardProps {
  citation: Citation;
  /** Position number (1-indexed) displayed in the corner. */
  index?: number;
  className?: string;
}

export function CitationCard({ citation, index, className }: CitationCardProps) {
  return (
    <a
      href={citation.href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group block w-220 shrink-0",
        "rounded-8 bg-bg-secondary shadow-flat p-12",
        "transition-colors hover:bg-bg-tertiary",
        "focus-visible:outline-none focus-visible:shadow-focus",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-8 pb-8">
        <div className="flex items-center gap-6 min-w-0">
          <PlatformAvatar platform={citation.platform} size={16} />
          <span className="text-mini text-text-tertiary truncate">
            {citation.domain}
          </span>
        </div>
        <div className="flex items-center gap-6 shrink-0">
          {index ? (
            <span className="text-mini text-text-quaternary tabular-nums">
              {index}
            </span>
          ) : null}
          <ArrowTopRightOnSquareIcon className="size-12 text-text-quaternary group-hover:text-text-primary transition-colors" />
        </div>
      </div>
      <p className="text-small font-medium text-text-primary line-clamp-2">
        {citation.title}
      </p>
    </a>
  );
}
