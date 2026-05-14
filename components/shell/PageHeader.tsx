/**
 * PageHeader — the title row at the top of each tab.
 *
 * Observed pattern (see `_reference/profound/<slug>/notes.md`):
 *   - left: title (text-title-small semibold) — sometimes with sub-tabs underneath
 *   - right: filter/CTA buttons (date range, "+ New Agent", "Sort / Filter")
 */

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface PageHeaderProps {
  title: ReactNode;
  /** Right-aligned controls — typically a flex row of Buttons / Selects. */
  actions?: ReactNode;
  /** Optional sub-tab row directly under the title (e.g. Agents Overview / All Agents). */
  tabs?: ReactNode;
  className?: string;
}

export function PageHeader({ title, actions, tabs, className }: PageHeaderProps) {
  return (
    <header className={cn("space-y-16", className)}>
      <div className="flex items-center justify-between gap-16">
        <h1 className="text-title-small font-semibold text-text-primary">{title}</h1>
        {actions ? <div className="flex items-center gap-8">{actions}</div> : null}
      </div>
      {tabs ? <div>{tabs}</div> : null}
    </header>
  );
}
