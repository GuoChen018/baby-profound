/**
 * ChartActions — the right-aligned control cluster that lives next to a
 * `SectionHeader` for chart sections. Renders Chart Config + chart-type
 * toggle + Download CSV.
 *
 * The grouping mirrors the action group on `_reference/profound/answer-
 * engine-insights/screenshot.png` (Chart Config ▾  bar/line toggle  ⤓).
 *
 * Used at the page level next to `<SectionHeader>`, NOT inside `<ChartPanel>`.
 */

"use client";

import {
  ArrowDownTrayIcon,
  ChartBarIcon,
  ChevronDownIcon,
  PresentationChartLineIcon,
} from "@/components/ui/icons";
import { Button } from "@/components/ui";
import type { ChartType } from "@/lib/types/answer-engine-insights";
import { cn } from "@/lib/cn";

export interface ChartActionsProps {
  /** Hide the "Chart Config ▾" select trigger. */
  hideConfig?: boolean;
  /** When provided, renders the bar/line icon toggle. */
  chartType?: ChartType;
  onChartTypeChange?: (next: ChartType) => void;
  /** Hide the Download CSV icon button. */
  hideDownload?: boolean;
  className?: string;
}

export function ChartActions({
  hideConfig,
  chartType,
  onChartTypeChange,
  hideDownload,
  className,
}: ChartActionsProps) {
  return (
    <div className={cn("flex items-center gap-6", className)}>
      {!hideConfig ? (
        <Button size="sm" variant="default" iconRight={<ChevronDownIcon />}>
          Chart Config
        </Button>
      ) : null}
      {chartType ? (
        <div className="inline-flex items-center gap-2 p-2 rounded-6 bg-bg-secondary">
          <IconButton
            aria-label="Switch to bar chart"
            active={chartType === "bar"}
            onClick={() => onChartTypeChange?.("bar")}
          >
            <ChartBarIcon className="size-14" />
          </IconButton>
          <IconButton
            aria-label="Switch to line chart"
            active={chartType === "line"}
            onClick={() => onChartTypeChange?.("line")}
          >
            <PresentationChartLineIcon className="size-14" />
          </IconButton>
        </div>
      ) : null}
      {!hideDownload ? (
        <IconButton aria-label="Download CSV">
          <ArrowDownTrayIcon className="size-14" />
        </IconButton>
      ) : null}
    </div>
  );
}

function IconButton({
  children,
  active,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center size-24 rounded-4",
        "text-text-tertiary",
        "hover:bg-bg-tertiary hover:text-text-primary",
        "transition-colors",
        "focus-visible:outline-none focus-visible:shadow-focus",
        active && "bg-bg-tertiary text-text-primary",
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
