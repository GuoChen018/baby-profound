/**
 * MultiLineChart — multi-series line chart for AEI dashboards.
 *
 * Sibling of `LineChart`. Same visual idiom (dashed grid + minimal SVG, no
 * library) but supports N named series, dashed strokes, a legend chip row
 * beneath the chart, and a multi-row hover tooltip.
 *
 * Sizing strategy mirrors `LineChart`: the SVG renders at the exact pixel
 * dimensions of its container (measured via `ResizeObserver`), so axis
 * labels never get horizontally stretched by `preserveAspectRatio="none"`.
 *
 * Used by: Visibility trend (current + comparison + competitors) and the
 * Platform breakdown chart on Answer Engine Insights.
 */

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { NamedSeries } from "@/lib/types/answer-engine-insights";
import { Favicon, PLATFORM_DOMAIN } from "@/components/ui";
import { cn } from "@/lib/cn";
import { ChartTooltip } from "./LineChart";

/**
 * Resolve a `NamedSeries` to a domain we can pass to `<Favicon>`. Prefer an
 * explicit `domain` field; otherwise fall back to the AI engine's domain.
 */
function seriesDomain(s: NamedSeries): string | undefined {
  if (s.domain) return s.domain;
  if (s.platform) return PLATFORM_DOMAIN[s.platform];
  return undefined;
}

export interface MultiLineChartProps {
  series: NamedSeries[];
  /** Fallback dimensions used before the ResizeObserver fires (SSR + first paint). */
  fallbackWidth?: number;
  fallbackHeight?: number;
  yFormat?: (v: number) => string;
  /** Pass `"rank"` for inverted (lower = better) axis. Default percent-ish. */
  yMode?: "percent" | "decimal" | "rank";
  pad?: { top: number; right: number; bottom: number; left: number };
  className?: string;
  /** Render the colored-dot legend below the chart. Default true. */
  showLegend?: boolean;
}

const DEFAULT_PAD = { top: 16, right: 16, bottom: 28, left: 44 };

export function MultiLineChart({
  series,
  fallbackWidth = 600,
  fallbackHeight = 240,
  yFormat,
  yMode = "percent",
  pad = DEFAULT_PAD,
  className,
  showLegend = true,
}: MultiLineChartProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: fallbackWidth, h: fallbackHeight });
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

  const chart = useMemo(() => {
    if (!series.length || series[0]!.data.length < 2) return null;

    const VB_W = size.w;
    const VB_H = size.h;
    const plotW = Math.max(VB_W - pad.left - pad.right, 0);
    const plotH = Math.max(VB_H - pad.top - pad.bottom, 0);

    const allValues = series.flatMap((s) => s.data.map((d) => d.value));
    const rawMin = Math.min(...allValues);
    const rawMax = Math.max(...allValues);
    const padY = (rawMax - rawMin) * 0.2 || 1;
    const yMin = rawMin - padY;
    const yMax = rawMax + padY;
    const ySpan = yMax - yMin || 1;

    const xLabels = series[0]!.data.map((d) => d.date);
    const xStep = xLabels.length > 1 ? plotW / (xLabels.length - 1) : 0;

    const inverted = yMode === "rank";
    const toY = (v: number) =>
      inverted
        ? pad.top + ((v - yMin) / ySpan) * plotH
        : pad.top + plotH - ((v - yMin) / ySpan) * plotH;

    const tickCount = 4;
    const yTicks = Array.from({ length: tickCount }, (_, i) => {
      const t = i / (tickCount - 1);
      return rawMin + t * (rawMax - rawMin);
    });

    const fmt =
      yFormat ??
      ((v: number) =>
        yMode === "rank"
          ? `#${Math.round(v)}`
          : yMode === "decimal"
            ? v.toFixed(1)
            : `${Math.round(v)}%`);

    const paths = series.map((s) => {
      const points = s.data.map((d, i) => ({
        x: pad.left + i * xStep,
        y: toY(d.value),
        value: d.value,
      }));
      const path = points
        .map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`))
        .join(" ");
      return {
        id: s.id,
        label: s.label,
        path,
        dashed: !!s.dashed,
        colorVar: s.colorVar,
        domain: seriesDomain(s),
        points,
      };
    });

    const xPoints = xLabels.map((label, i) => ({
      x: pad.left + i * xStep,
      label,
    }));

    return { VB_W, VB_H, plotW, plotH, paths, xPoints, xStep, yTicks, toY, fmt };
  }, [series, size, pad, yFormat, yMode]);

  const handleMove = (e: React.MouseEvent<SVGRectElement>) => {
    if (!chart || chart.xStep === 0) return;
    const svg = e.currentTarget.ownerSVGElement;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const idx = Math.round((x - pad.left) / chart.xStep);
    const clamped = Math.max(0, Math.min(chart.xPoints.length - 1, idx));
    setHoverIdx(clamped);
  };

  const handleLeave = () => setHoverIdx(null);

  return (
    <div className={cn("w-full h-full flex flex-col gap-12", className)}>
      <div ref={wrapperRef} className="flex-1 min-h-0 relative">
        {chart ? (
          <>
            <svg
              width={chart.VB_W}
              height={chart.VB_H}
              viewBox={`0 0 ${chart.VB_W} ${chart.VB_H}`}
              role="img"
              aria-label="Line chart with multiple series"
              className="block"
            >
              {chart.yTicks.map((t, i) => {
                const y = chart.toY(t);
                return (
                  <g key={i}>
                    <line
                      x1={pad.left}
                      x2={chart.VB_W - pad.right}
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
                      {chart.fmt(t)}
                    </text>
                  </g>
                );
              })}

              {chart.xPoints.map((p, i) => {
                // Anchor the first / last labels at the plot edges so
                // wide labels (e.g. "May 12") don't get clipped by the
                // SVG right edge. See `LineChart.tsx` for the same fix.
                const isFirst = i === 0;
                const isLast = i === chart.xPoints.length - 1;
                return (
                  <text
                    key={i}
                    x={p.x}
                    y={chart.VB_H - pad.bottom + 16}
                    textAnchor={isFirst ? "start" : isLast ? "end" : "middle"}
                    fontSize={11}
                    fill="var(--text-tertiary)"
                  >
                    {p.label}
                  </text>
                );
              })}

              {chart.paths.map((p) => (
                <path
                  key={p.id}
                  d={p.path}
                  fill="none"
                  stroke={`var(${p.colorVar})`}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={p.dashed ? "4 4" : undefined}
                  opacity={p.dashed ? 0.7 : 1}
                />
              ))}

              {/* Hover crosshair + dot per series */}
              {hoverIdx !== null && chart.xPoints[hoverIdx] ? (
                <g pointerEvents="none">
                  <line
                    x1={chart.xPoints[hoverIdx].x}
                    x2={chart.xPoints[hoverIdx].x}
                    y1={pad.top}
                    y2={chart.VB_H - pad.bottom}
                    stroke="var(--fill-tertiary)"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                  />
                  {chart.paths.map((p) => {
                    const pt = p.points[hoverIdx];
                    if (!pt) return null;
                    return (
                      <circle
                        key={p.id}
                        cx={pt.x}
                        cy={pt.y}
                        r={4}
                        fill={`var(${p.colorVar})`}
                        stroke="var(--bg-primary)"
                        strokeWidth={2}
                        opacity={p.dashed ? 0.7 : 1}
                      />
                    );
                  })}
                </g>
              ) : null}

              {/* Transparent capture rect for mouse tracking */}
              {chart.plotW > 0 && chart.plotH > 0 ? (
                <rect
                  x={pad.left}
                  y={pad.top}
                  width={chart.plotW}
                  height={chart.plotH}
                  fill="transparent"
                  onMouseMove={handleMove}
                  onMouseLeave={handleLeave}
                />
              ) : null}
            </svg>

            {/* Multi-row tooltip */}
            {hoverIdx !== null && chart.xPoints[hoverIdx] ? (
              <ChartTooltip
                chartWidth={chart.VB_W}
                anchorX={chart.xPoints[hoverIdx].x}
                anchorY={Math.min(
                  ...chart.paths.map((p) => p.points[hoverIdx]?.y ?? Infinity),
                )}
                title={chart.xPoints[hoverIdx].label}
              >
                <ul className="space-y-4">
                  {chart.paths.map((p) => {
                    const pt = p.points[hoverIdx];
                    if (!pt) return null;
                    return (
                      <li
                        key={p.id}
                        className="flex items-center gap-8 text-mini"
                      >
                        <span
                          aria-hidden
                          className="inline-block size-8 rounded-full shrink-0"
                          style={{ background: `var(${p.colorVar})` }}
                        />
                        {p.domain ? (
                          <Favicon
                            domain={p.domain}
                            size={14}
                            fallbackLabel={p.label}
                          />
                        ) : null}
                        <span className="text-text-secondary truncate max-w-[140px]">
                          {p.label}
                        </span>
                        <span className="ml-auto font-semibold text-text-primary tabular-nums">
                          {chart.fmt(pt.value)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </ChartTooltip>
            ) : null}
          </>
        ) : null}
      </div>

      {showLegend ? (
        <ul className="flex flex-wrap items-center gap-x-16 gap-y-6">
          {series.map((s) => {
            const domain = seriesDomain(s);
            return (
              <li
                key={s.id}
                className="inline-flex items-center gap-6 text-mini text-text-secondary"
              >
                <span
                  aria-hidden
                  className={cn("inline-block size-8 rounded-full shrink-0")}
                  style={{ background: `var(${s.colorVar})` }}
                />
                {domain ? (
                  <Favicon domain={domain} size={14} fallbackLabel={s.label} />
                ) : null}
                <span className="whitespace-nowrap">{s.label}</span>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
