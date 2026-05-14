/**
 * EmptyState — empty/onboarding state with optional illustration and CTA.
 *
 * Source: `_reference/profound/overview/notes.md` (Website Activity
 * unconfigured state with browser-mock illustration), Ask empty state, etc.
 *
 * Pattern: centered illustration + title + body + CTA button.
 */

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface EmptyStateProps {
  illustration?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  action?: ReactNode;
  /** Make the surface darker than the surrounding Card. */
  inset?: boolean;
  className?: string;
}

export function EmptyState({
  illustration,
  title,
  body,
  action,
  inset,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center gap-16",
        "rounded-8 px-24 py-48",
        inset && "bg-bg-secondary",
        className,
      )}
    >
      {illustration ? <div className="opacity-90">{illustration}</div> : null}
      <div className="space-y-6">
        <p className="text-title-mini font-medium text-text-primary">{title}</p>
        {body ? <p className="text-small text-text-secondary max-w-prose">{body}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
