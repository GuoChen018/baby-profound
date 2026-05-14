/**
 * ChartPanel — the card surface that wraps a chart.
 *
 * Contains ONLY the chart-side content: a headline KPI strip, the chart body,
 * and an optional footer (compare-competitors toggle, expand link, etc.).
 *
 * The section title + description + Chart Config button sit OUTSIDE this
 * card on the page — see `<SectionHeader>` next to each usage. This matches
 * the Profound product where titles are page-level chrome and the card is
 * the data surface.
 *
 * Source: `_reference/profound/answer-engine-insights/screenshot.png`.
 */

"use client";

import { type ReactNode } from "react";
import { Delta } from "@/components/ui";
import { cn } from "@/lib/cn";

export interface ChartPanelProps {
  /** Big headline KPI inside the card (e.g. "78.5%" with a Δ). */
  headline?: { value: string; delta: number };
  children: ReactNode;
  /** Bottom strip — typically a "Compare competitors" toggle + "Expand" link. */
  footer?: ReactNode;
  className?: string;
}

export function ChartPanel({
  headline,
  children,
  footer,
  className,
}: ChartPanelProps) {
  return (
    <section
      className={cn(
        "bg-bg-primary rounded-8 shadow-flat",
        "p-24 flex flex-col gap-16",
        className,
      )}
    >
      {headline ? (
        <div className="flex items-baseline gap-8">
          <span className="text-title-regular font-semibold text-text-primary tabular-nums">
            {headline.value}
          </span>
          <Delta value={headline.delta} />
        </div>
      ) : null}

      <div className="min-h-220 flex-1">{children}</div>

      {footer ? (
        <footer className="flex items-center justify-between gap-12 pt-12 border-t border-fill-quaternary">
          {footer}
        </footer>
      ) : null}
    </section>
  );
}
