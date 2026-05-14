/**
 * DonutChart — share-of-voice donut for AEI.
 *
 * Pure SVG, no library. Each segment is a stroked arc on a single circle so
 * the colors line up like a Profound donut. Includes a centered "headline"
 * slot for the focal asset percentage.
 */

import type { DonutSegment } from "@/lib/types/answer-engine-insights";
import { cn } from "@/lib/cn";

export interface DonutChartProps {
  segments: DonutSegment[];
  /** Center text — typically the focal asset's share. */
  centerLabel?: string;
  centerHint?: string;
  size?: number;
  /** Width of the ring. Default 22. */
  thickness?: number;
  className?: string;
}

export function DonutChart({
  segments,
  centerLabel,
  centerHint,
  size = 200,
  thickness = 22,
  className,
}: DonutChartProps) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const cx = size / 2;
  const cy = size / 2;

  const total = segments.reduce((acc, s) => acc + s.share, 0) || 1;

  let offset = 0;
  const arcs = segments.map((s) => {
    const length = (s.share / total) * circumference;
    const arc = (
      <circle
        key={s.id}
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={`var(${s.colorVar})`}
        strokeWidth={thickness}
        strokeDasharray={`${length} ${circumference - length}`}
        strokeDashoffset={-offset}
        // Render starting from 12 o'clock
        transform={`rotate(-90 ${cx} ${cy})`}
      />
    );
    offset += length;
    return arc;
  });

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        role="img"
        aria-label="Donut chart"
      >
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="var(--fill-quaternary)"
          strokeWidth={thickness}
        />
        {arcs}
      </svg>

      {(centerLabel || centerHint) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {centerLabel ? (
            <span className="text-title-mini font-semibold text-text-primary tabular-nums">
              {centerLabel}
            </span>
          ) : null}
          {centerHint ? (
            <span className="text-mini text-text-tertiary mt-2">{centerHint}</span>
          ) : null}
        </div>
      )}
    </div>
  );
}
