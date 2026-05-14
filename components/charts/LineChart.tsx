"use client";

/**
 * LineChart — minimal SVG line chart for KPI surfaces.
 *
 * Deliberately tiny: no animations, no library. Just enough fidelity to
 * recognize the Overview "Visibility Score" trend panel. Replace with a
 * real charting layer (e.g. visx/recharts) if we ever need axis logic
 * beyond linear / categorical.
 *
 * Renders:
 *   - light dashed horizontal grid lines (3 inner lines)
 *   - y-axis labels on the left
 *   - x-axis labels on the bottom
 *   - smooth polyline (no markers)
 *   - hover crosshair + dot + tooltip — snap to nearest data index
 *
 * Sizing strategy: the chart fills its container via a `ResizeObserver`
 * and renders the SVG at the exact pixel dimensions of that container.
 * That way the viewBox matches CSS pixels 1:1 and text labels stay at
 * their natural size — no horizontal stretching from
 * `preserveAspectRatio="none"`.
 *
 * Tokens: `--fill-quaternary` for grid, `--text-tertiary` for labels,
 * `--workflow-blue` for the stroke (Profound's go-to chart series color).
 */

import { useEffect, useRef, useState } from "react";
import type { SeriesPoint } from "@/lib/types";
import { Favicon } from "@/components/ui/Favicon";
import { cn } from "@/lib/cn";

export interface LineChartProps {
  data: SeriesPoint[];
  /** Fallback dimensions used before the ResizeObserver fires (SSR + first paint). */
  fallbackWidth?: number;
  fallbackHeight?: number;
  /** Stroke color CSS var name (without var()). Default `--workflow-blue`. */
  strokeVar?: string;
  /** Format the y-axis tick (default returns rounded integer + %). */
  yFormat?: (v: number) => string;
  /** Padding inside the chart viewBox in pixels. */
  pad?: { top: number; right: number; bottom: number; left: number };
  /** Disable the hover crosshair + tooltip (use for tiny sparklines). */
  disableHover?: boolean;
  /** Optional brand domain — surfaces as a favicon in the hover tooltip. */
  domain?: string;
  /** Optional series label rendered next to the favicon in the hover tooltip. */
  seriesLabel?: string;
  className?: string;
}

/**
 * Default chart padding inside the SVG viewBox.
 *
 * `left = 56` reserves enough room for a 5-character y-axis label (e.g.
 * "79.8%") rendered at fontSize 11 + the 8px gap before the plot edge.
 * The previous 40px clipped the leading digit on any 4–5-char tick.
 */
const DEFAULT_PAD = { top: 16, right: 16, bottom: 28, left: 56 };

export function LineChart({
  data,
  fallbackWidth = 600,
  fallbackHeight = 220,
  strokeVar = "--workflow-blue",
  yFormat = (v) => `${Math.round(v)}%`,
  pad = DEFAULT_PAD,
  disableHover,
  domain,
  seriesLabel,
  className,
}: LineChartProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number }>({
    w: fallbackWidth,
    h: fallbackHeight,
  });
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setSize({ w: rect.width, h: rect.height });
      }
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  if (data.length < 2) {
    return <div ref={wrapperRef} className={cn("w-full h-full", className)} />;
  }

  const VB_W = size.w;
  const VB_H = size.h;
  const plotW = Math.max(VB_W - pad.left - pad.right, 0);
  const plotH = Math.max(VB_H - pad.top - pad.bottom, 0);

  const values = data.map((d) => d.value);
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const padY = (rawMax - rawMin) * 0.2 || 1;
  const yMin = rawMin - padY;
  const yMax = rawMax + padY;

  const xStep = data.length > 1 ? plotW / (data.length - 1) : 0;
  const ySpan = yMax - yMin || 1;
  const toY = (v: number) => pad.top + plotH - ((v - yMin) / ySpan) * plotH;

  const points = data.map((d, i) => ({
    x: pad.left + i * xStep,
    y: toY(d.value),
    label: d.date,
    value: d.value,
  }));

  const path = points
    .map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`))
    .join(" ");

  const tickCount = 4;
  const yTicks = Array.from({ length: tickCount }, (_, i) => {
    const t = i / (tickCount - 1);
    return rawMin + t * (rawMax - rawMin);
  });

  /* ----------------------------- hover handlers ----------------------------- */

  const handleMove = (e: React.MouseEvent<SVGRectElement>) => {
    if (disableHover || xStep === 0) return;
    const svg = e.currentTarget.ownerSVGElement;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const idx = Math.round((x - pad.left) / xStep);
    const clamped = Math.max(0, Math.min(data.length - 1, idx));
    setHoverIdx(clamped);
  };

  const handleLeave = () => setHoverIdx(null);

  const hover = hoverIdx !== null ? points[hoverIdx] : null;

  return (
    <div
      ref={wrapperRef}
      className={cn("w-full h-full block relative", className)}
    >
      <svg
        width={VB_W}
        height={VB_H}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        role="img"
        aria-label="Line chart"
        className="block"
      >
        {/* Horizontal grid */}
        {yTicks.map((t, i) => {
          const y = toY(t);
          return (
            <g key={i}>
              <line
                x1={pad.left}
                x2={VB_W - pad.right}
                y1={y}
                y2={y}
                stroke="var(--fill-quaternary)"
                strokeDasharray="2 4"
                strokeWidth={1}
              />
              <text
                x={pad.left - 8}
                y={y + 4}
                textAnchor="end"
                fontSize={11}
                fill="var(--text-tertiary)"
              >
                {yFormat(t)}
              </text>
            </g>
          );
        })}

        {/* X-axis labels.
            First label uses `textAnchor="start"` (anchored at the plot's
            left edge) and the last uses `textAnchor="end"` so multi-char
            labels like "May 12" don't extend past `VB_W` and get clipped.
            Middle labels stay centered on their data point — that's where
            most users expect them visually. */}
        {points.map((p, i) => {
          const isFirst = i === 0;
          const isLast = i === points.length - 1;
          return (
            <text
              key={i}
              x={p.x}
              y={VB_H - pad.bottom + 16}
              textAnchor={isFirst ? "start" : isLast ? "end" : "middle"}
              fontSize={11}
              fill="var(--text-tertiary)"
            >
              {p.label}
            </text>
          );
        })}

        {/* Series line */}
        <path
          d={path}
          fill="none"
          stroke={`var(${strokeVar})`}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Hover crosshair + dot */}
        {hover ? (
          <g pointerEvents="none">
            <line
              x1={hover.x}
              x2={hover.x}
              y1={pad.top}
              y2={VB_H - pad.bottom}
              stroke="var(--fill-tertiary)"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <circle
              cx={hover.x}
              cy={hover.y}
              r={5}
              fill={`var(${strokeVar})`}
              stroke="var(--bg-primary)"
              strokeWidth={2}
            />
          </g>
        ) : null}

        {/* Transparent capture rect — keeps mouse tracking working over the
            entire plot area even on gaps between data points. */}
        {!disableHover && plotW > 0 && plotH > 0 ? (
          <rect
            x={pad.left}
            y={pad.top}
            width={plotW}
            height={plotH}
            fill="transparent"
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          />
        ) : null}
      </svg>

      {/* Tooltip — HTML overlay so we can use real typography + tokens. */}
      {hover && !disableHover ? (
        <ChartTooltip
          chartWidth={VB_W}
          anchorX={hover.x}
          anchorY={hover.y}
          title={hover.label}
        >
          <div className="flex items-center gap-8">
            <span
              aria-hidden
              className="inline-block size-8 rounded-full shrink-0"
              style={{ background: `var(${strokeVar})` }}
            />
            {domain ? (
              <Favicon domain={domain} size={14} fallbackLabel={seriesLabel} />
            ) : null}
            {seriesLabel ? (
              <span className="text-mini text-text-secondary truncate max-w-[140px]">
                {seriesLabel}
              </span>
            ) : null}
            <span className="ml-auto text-mini font-semibold text-text-primary tabular-nums">
              {yFormat(hover.value)}
            </span>
          </div>
        </ChartTooltip>
      ) : null}
    </div>
  );
}

/**
 * ChartTooltip — shared floating callout used by both chart variants.
 *
 * Positions itself above the hover point by default, flipping below when
 * there's no room. Horizontally clamped to stay inside `chartWidth`.
 */
export function ChartTooltip({
  chartWidth,
  anchorX,
  anchorY,
  title,
  children,
}: {
  chartWidth: number;
  anchorX: number;
  anchorY: number;
  title: string;
  children: React.ReactNode;
}) {
  const PAD = 8;
  const ESTIMATED_W = 160;
  // Clamp x so the tooltip doesn't overflow the chart bounds.
  let left = anchorX;
  if (left + ESTIMATED_W / 2 + PAD > chartWidth)
    left = chartWidth - ESTIMATED_W / 2 - PAD;
  if (left - ESTIMATED_W / 2 - PAD < 0) left = ESTIMATED_W / 2 + PAD;
  // Position above the dot; if too close to the top, drop below.
  const placeAbove = anchorY > 70;

  return (
    <div
      className="absolute pointer-events-none z-10"
      style={{
        left,
        top: placeAbove ? anchorY - 14 : anchorY + 14,
        transform: placeAbove
          ? "translate(-50%, -100%)"
          : "translate(-50%, 0)",
      }}
    >
      {/* Tooltip surface — 12/8 padding and a 6px gap between the date
          header and the metric row so the callout breathes. The earlier
          10/6 + 2px gap had the header butting up against the data row. */}
      <div className="min-w-140 px-12 py-8 rounded-6 bg-bg-primary border border-fill-quaternary shadow-high">
        <div className="text-mini text-text-tertiary mb-6">{title}</div>
        {children}
      </div>
    </div>
  );
}
