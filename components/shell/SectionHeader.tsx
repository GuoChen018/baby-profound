/**
 * SectionHeader — title + subtitle + right-aligned action, sitting OUTSIDE
 * any card chrome. Used on Overview for "Top Keywords" / "Top Opportunities" /
 * "Website Activity" where the title is part of the page, not part of the card.
 *
 * Distinct from `Card`'s built-in header, which lives inside the card surface
 * and is used when the section is a single visual unit (e.g. What's New,
 * Visibility Score).
 *
 * Source: `_reference/profound/overview/screenshot.png`.
 */

import { type ReactNode } from "react";
import { InformationCircleIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export interface SectionHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Renders an (i) icon next to the title. Set to `true` for a plain icon,
   *  or pass a tooltip string for a `title` attribute. */
  info?: boolean | string;
  /** Right-aligned content (usually a Button or icon group). */
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  info,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-start justify-between gap-16",
        className,
      )}
    >
      {/* Title-to-subtitle gap is 4px so the two lines breathe — 2px was
          claustrophobic given the title's 24px line-height. */}
      <div className="space-y-4">
        <h2 className="text-title-mini font-semibold text-text-primary inline-flex items-center gap-6">
          <span>{title}</span>
          {info ? (
            <InformationCircleIcon
              className="size-14 text-text-tertiary shrink-0"
              {...(typeof info === "string" ? { "aria-label": info } : {})}
            />
          ) : null}
        </h2>
        {subtitle ? (
          <p className="text-small text-text-secondary">{subtitle}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
