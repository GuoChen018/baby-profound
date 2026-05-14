/**
 * Delta — colored signed percentage indicator.
 *
 * Used across KPIs (Overview "Visibility Score", "Top Keywords" rows, KPI strip
 * on Agent Analytics). Positive = green, negative = red, exactly zero = muted.
 *
 * Profound's convention (observed): negative = `--text-red`, positive = `--text-green`,
 * no leading arrow icon by default. Tabular numerals come from the global
 * `font-feature-settings` so columns of deltas line up.
 */

import { cn } from "@/lib/cn";
import { formatPercentDelta } from "@/lib/mockData";

export interface DeltaProps {
  value: number;
  /** Override default formatting (signed % with one decimal). */
  format?: (value: number) => string;
  /** "auto" picks green/red/muted based on sign; "neutral" always uses muted. */
  intent?: "auto" | "neutral";
  className?: string;
}

export function Delta({ value, format, intent = "auto", className }: DeltaProps) {
  const colorClass =
    intent === "neutral"
      ? "text-text-tertiary"
      : value > 0
        ? "text-text-green"
        : value < 0
          ? "text-text-red"
          : "text-text-tertiary";

  return (
    <span className={cn("text-small font-medium tabular-nums", colorClass, className)}>
      {(format ?? formatPercentDelta)(value)}
    </span>
  );
}
