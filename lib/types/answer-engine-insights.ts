/**
 * Answer Engine Insights types.
 *
 * Source: `_reference/profound/answer-engine-insights/notes.md` +
 *         `_reference/profound/answer-engine-insights/screenshot.png`.
 *
 * AEI is the densest analytics surface in Profound. We model:
 *   1. Sub-tab + filter state (`AeiSubTab`, `AeiFilters`)
 *   2. KPI strip (`KpiMetric`) — top-of-page summary tiles
 *   3. Multi-series time-series chart (`MultiSeries`) — visibility trend
 *   4. Platform breakdown chart (`PlatformSeries`) — per-engine lines
 *   5. Rank leaderboard (`RankRow`) — competitor table rendered next to charts
 *   6. Donut breakdown (`DonutSegment`) — share-of-voice donut
 *   7. Citations table (`CitationRow`) — bottom-of-page sources table
 */

import type { Platform, SeriesPoint, SignedPercent } from "@/lib/types";

// ────────────────────────────────────────────────────────────────────
// Sub-tab + filter state
// ────────────────────────────────────────────────────────────────────

export type AeiSubTab =
  | "visibility"
  | "prompts"
  | "query-fanouts"
  | "platforms"
  | "regions"
  | "personas"
  | "sentiment"
  | "citations";

export type AeiGranularity = "daily" | "weekly" | "monthly";

/** A single chip in the filter row. The sandbox is non-functional — the
 *  trigger displays its current value and would open a popover in prod. */
export type AeiFilterPill = {
  id: string;
  label: string;
  value: string;
};

export type AeiFilters = {
  dateRange: AeiFilterPill;
  comparison: AeiFilterPill;
  granularity: AeiFilterPill;
  topics: AeiFilterPill;
  platforms: AeiFilterPill;
  region: AeiFilterPill;
  persona: AeiFilterPill;
};

// ────────────────────────────────────────────────────────────────────
// KPI strip
// ────────────────────────────────────────────────────────────────────

export type KpiMetricId =
  | "visibility-score"
  | "citation-share"
  | "share-of-voice"
  | "average-position"
  | "sentiment";

export type KpiMetric = {
  id: KpiMetricId;
  label: string;
  /** Pre-formatted display value (e.g. `"78.5%"`, `"#2"`, `"82"`). */
  value: string;
  /** Signed percentage delta vs comparison range. */
  delta: SignedPercent;
  /** Optional micro-sparkline hint — kept simple; could be wired into a tiny chart later. */
  spark?: SeriesPoint[];
  /** Inline hint copy under the headline (e.g. "vs. Prev. Period"). */
  hint?: string;
};

// ────────────────────────────────────────────────────────────────────
// Charts — multi-series + donut
// ────────────────────────────────────────────────────────────────────

/** Single named series rendered on the multi-line chart. */
export type NamedSeries = {
  id: string;
  label: string;
  /** CSS variable name (without `var()`), e.g. `"--workflow-blue"`. */
  colorVar: string;
  /** When true the series renders as a dashed line (e.g. comparison range). */
  dashed?: boolean;
  data: SeriesPoint[];
  /** Optional brand domain — surfaced as a favicon in legend + hover tooltip. */
  domain?: string;
  /** Optional AI engine — surfaced as a platform favicon when no `domain` is set. */
  platform?: Platform;
};

/** Time-series chart payload — multiple competitor or platform lines. */
export type MultiSeries = {
  /** Y-axis label suffix; defaults to "%". */
  yUnit?: string;
  /** Optional override for tick formatter (used for non-percent metrics). */
  yTickFormat?: "percent" | "decimal" | "rank";
  series: NamedSeries[];
};

/** One slice of the share-of-voice donut. */
export type DonutSegment = {
  id: string;
  label: string;
  /** 0..1 — fraction of total. */
  share: number;
  colorVar: string;
  /** Optional brand domain — surfaced in the donut legend as a favicon. */
  domain?: string;
};

// ────────────────────────────────────────────────────────────────────
// Rank leaderboard (re-used across the three two-up sections)
// ────────────────────────────────────────────────────────────────────

export type RankRow = {
  id: string;
  asset: string;
  /** Mark "Brex (Owned)" — emphasises the focal asset. */
  isOwned?: boolean;
  /** Pre-formatted display value (e.g. `"78.0%"`, `"2.8"`). */
  value: string;
  delta?: SignedPercent;
  /** Optional brand domain — used to pull a favicon for the leaderboard avatar. */
  domain?: string;
};

// ────────────────────────────────────────────────────────────────────
// Citations table (bottom of the page)
// ────────────────────────────────────────────────────────────────────

export type CitationRow = {
  id: string;
  /** Display URL — the host (e.g. "forbes.com"). */
  source: string;
  /** Full URL the citation points to. */
  href: string;
  /** Which AI engine surfaced the citation. */
  platform: Platform;
  mentions: number;
  /** 0..1 share of citations attributable to this source. */
  share: number;
  /** ISO date — last time we saw this citation. */
  lastSeenAt: string;
};

// ────────────────────────────────────────────────────────────────────
// Top-level page payload
// ────────────────────────────────────────────────────────────────────

export type AnswerEngineInsightsData = {
  workspace: { name: string; site: string };
  filters: AeiFilters;
  kpis: KpiMetric[];

  /** Visibility trend chart — multi-line (current period + comparison + competitors). */
  visibility: {
    headline: { value: string; delta: SignedPercent };
    chart: MultiSeries;
  };

  /** Platform breakdown — multi-line chart with one series per engine. */
  platformBreakdown: {
    headline: { value: string; delta: SignedPercent };
    chart: MultiSeries;
  };

  /** Share-of-voice donut + rank leaderboard. */
  shareOfVoice: {
    headline: { value: string; delta: SignedPercent };
    segments: DonutSegment[];
    leaderboard: RankRow[];
  };

  citations: CitationRow[];
};

export type ChartType = "line" | "bar";

export const SUB_TABS: { id: AeiSubTab; label: string; disabled?: boolean }[] = [
  { id: "visibility", label: "Visibility" },
  { id: "prompts", label: "Prompts", disabled: true },
  { id: "query-fanouts", label: "Query Fanouts", disabled: true },
  { id: "platforms", label: "Platforms", disabled: true },
  { id: "regions", label: "Regions", disabled: true },
  { id: "personas", label: "Personas", disabled: true },
  { id: "sentiment", label: "Sentiment", disabled: true },
  { id: "citations", label: "Citations", disabled: true },
];
