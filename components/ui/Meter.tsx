/**
 * Meter — horizontal progress bar.
 *
 * Spec: `_reference/profound/opportunities/notes.md` ("Current Performance"
 * indicator), `_reference/figma/01-components/sidebar/design-context.md`
 * (progress radius-rounded).
 *
 * Sizes:
 *   - md (default): 6px tall, used inline in opportunity cards
 *   - sm: 4px tall, used in compact lists
 *
 * Fill color follows performance intent:
 *   - "high" (>= 70%) green
 *   - "med"  (30-70%) orange
 *   - "low"  (< 30%)  red
 *   - explicit color override available
 */

import { cn } from "@/lib/cn";

export type MeterIntent = "auto" | "neutral" | "high" | "med" | "low";
export type MeterSize = "sm" | "md";

export interface MeterProps {
  /** 0-100. Clamped. */
  value: number;
  max?: number;
  intent?: MeterIntent;
  size?: MeterSize;
  className?: string;
}

const sizeStyles: Record<MeterSize, string> = {
  sm: "h-4",
  md: "h-6",
};

const intentStyles: Record<Exclude<MeterIntent, "auto">, string> = {
  neutral: "bg-fill-secondary",
  high: "bg-fill-green",
  med: "bg-badge-orange-emphasis",
  low: "bg-fill-red",
};

function resolveIntent(value: number, intent: MeterIntent): Exclude<MeterIntent, "auto"> {
  if (intent !== "auto") return intent;
  if (value >= 70) return "high";
  if (value >= 30) return "med";
  return "low";
}

export function Meter({
  value,
  max = 100,
  intent = "auto",
  size = "md",
  className,
}: MeterProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const resolved = resolveIntent(pct, intent);

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn(
        "w-full rounded-full bg-fill-quaternary overflow-hidden",
        sizeStyles[size],
        className,
      )}
    >
      <div
        className={cn("h-full rounded-full transition-[width] duration-300", intentStyles[resolved])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
