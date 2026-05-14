/**
 * Card — generic Profound section surface.
 *
 * Source pattern: every Overview/Opportunities/Content section is a self-
 * contained card with: title + subtitle + right-aligned action + content.
 * (See `_reference/profound/overview/notes.md`.)
 *
 * Use the structural API when a section wants a title row. For a "naked"
 * card surface, drop children directly.
 */

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface CardProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  /** Right-aligned action(s) in the title row (e.g. a deep-link Button). */
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
  /** Strip surface chrome — useful when nesting cards. */
  bare?: boolean;
  /** Make the inner content fill the card with no extra padding. */
  flush?: boolean;
}

export function Card({
  title,
  subtitle,
  action,
  children,
  className,
  bare,
  flush,
}: CardProps) {
  const hasHeader = Boolean(title || subtitle || action);

  return (
    <section
      className={cn(
        !bare && "bg-bg-primary rounded-8 shadow-flat",
        className,
      )}
    >
      {hasHeader ? (
        <header className="flex items-start justify-between gap-16 px-24 pt-24 pb-12">
          <div className="space-y-2">
            {title ? (
              <h3 className="text-title-mini font-semibold text-text-primary">
                {title}
              </h3>
            ) : null}
            {subtitle ? (
              <p className="text-small text-text-secondary">{subtitle}</p>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </header>
      ) : null}
      <div className={cn(!flush && (hasHeader ? "px-24 pb-24" : "p-24"))}>
        {children}
      </div>
    </section>
  );
}
