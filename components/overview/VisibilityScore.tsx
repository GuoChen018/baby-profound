/**
 * VisibilityScore — KPI + trendline panel.
 *
 * Source: `_reference/profound/overview/notes.md` (Visibility Score card,
 * right column of the top-of-page grid).
 */

"use client";

import {
  ArrowDownTrayIcon,
  ChartBarIcon,
  InformationCircleIcon,
  PresentationChartLineIcon,
} from "@/components/ui/icons";
import { LineChart } from "@/components/charts/LineChart";
import { Delta } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { VisibilityScore as VisibilityScoreData } from "@/lib/types";

export interface VisibilityScoreProps {
  data: VisibilityScoreData;
}

export function VisibilityScore({ data }: VisibilityScoreProps) {
  return (
    <article className="bg-bg-primary rounded-8 shadow-flat p-24 h-full flex flex-col gap-16">
      <header className="flex items-start justify-between gap-16">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-4 text-small font-medium text-text-secondary">
            <span>Visibility Score</span>
            <InformationCircleIcon className="size-14" />
          </div>
          <div className="flex items-baseline gap-8">
            <span className="text-title-regular font-semibold text-text-primary tabular-nums">
              {data.current}%
            </span>
            <Delta value={data.delta} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <IconButton aria-label="Download">
            <ArrowDownTrayIcon className="size-14" />
          </IconButton>
          <IconButton aria-label="Switch to bar chart">
            <ChartBarIcon className="size-14" />
          </IconButton>
          <IconButton aria-label="Switch to line chart" active>
            <PresentationChartLineIcon className="size-14" />
          </IconButton>
        </div>
      </header>

      <div className="flex-1 min-h-180">
        <LineChart
          data={data.series}
          domain="brex.com"
          seriesLabel="Brex"
        />
      </div>
    </article>
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
