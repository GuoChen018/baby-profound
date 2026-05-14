/**
 * KpiCard — single tile in the KPI strip at the top of AEI.
 *
 * Layout: label (with info icon) → headline value + delta → optional micro
 * sparkline that fills the bottom of the card.
 *
 * Local primitive — could be promoted to `components/ui/` if/when other
 * analytics tabs (Dashboards, Agent Analytics) need the same tile shape.
 */

"use client";

import { InformationCircleIcon } from "@/components/ui/icons";
import { Delta } from "@/components/ui";
import { LineChart } from "@/components/charts/LineChart";
import type { KpiMetric } from "@/lib/types/answer-engine-insights";
import { cn } from "@/lib/cn";

export interface KpiCardProps {
  metric: KpiMetric;
  active?: boolean;
  onClick?: () => void;
}

export function KpiCard({ metric, active, onClick }: KpiCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex flex-col text-left",
        "bg-bg-primary rounded-8 shadow-flat",
        "p-16 gap-12",
        "transition-colors",
        "focus-visible:outline-none focus-visible:shadow-focus",
        "hover:bg-bg-secondary",
        active && "ring-1 ring-text-primary",
      )}
    >
      <header className="flex items-center gap-4 text-mini font-medium text-text-secondary">
        <span>{metric.label}</span>
        <InformationCircleIcon className="size-12 text-text-tertiary" />
      </header>

      <div className="flex items-baseline gap-8">
        <span className="text-title-mini font-semibold text-text-primary tabular-nums">
          {metric.value}
        </span>
        <Delta value={metric.delta} />
      </div>

      {metric.spark && metric.spark.length >= 2 ? (
        <div className="h-32 -mx-4">
          <LineChart
            data={metric.spark}
            fallbackHeight={32}
            pad={{ top: 4, right: 4, bottom: 4, left: 4 }}
            yFormat={() => ""}
            disableHover
          />
        </div>
      ) : metric.hint ? (
        <p className="text-mini text-text-tertiary">{metric.hint}</p>
      ) : null}
    </button>
  );
}
