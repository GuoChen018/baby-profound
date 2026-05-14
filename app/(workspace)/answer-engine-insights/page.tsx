/**
 * Answer Engine Insights — page composition.
 *
 * Source: `_reference/profound/answer-engine-insights/screenshot.png` +
 *         `_reference/profound/answer-engine-insights/notes.md`.
 *
 * Layout (top → bottom):
 *   1. Top bar — brand label ("Brex" w/ favicon) + Ask.
 *   2. Sub-tab row — Visibility / Prompts / Query Fanouts / … + Settings,
 *      Export 6.6k answers on the right.
 *   3. Filter row — date range, comparison, granularity, region, persona,
 *      topics, platform.
 *   4. KPI strip — Visibility / SoV / Avg Position / Citation Share.
 *   5. Visibility section — SectionHeader OUTSIDE + ChartPanel + leaderboard.
 *      Defaults to single-line (Brex Current). Compare competitors toggle
 *      adds Ramp + Capital One. Previous Period toggle adds the dashed
 *      comparison series.
 *   6. Share of Voice — donut + leaderboard.
 *   7. Platform breakdown — per-engine multi-line chart.
 *   8. Citations table.
 */

"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  SparklesIcon,
} from "@/components/ui/icons";
import { PageHeader, SectionHeader } from "@/components/shell";
import { Button, Favicon, Toggle } from "@/components/ui";
import { MultiLineChart } from "@/components/charts/MultiLineChart";
import { LineChart } from "@/components/charts/LineChart";
import { DonutChart } from "@/components/charts/DonutChart";
import {
  ChartActions,
  ChartPanel,
  CitationsTable,
  FilterRow,
  KpiCard,
  RankLeaderboard,
  SubTabs,
} from "@/components/answer-engine-insights";
import { answerEngineInsightsData } from "@/lib/data/answer-engine-insights";
import type {
  AeiSubTab,
  ChartType,
  KpiMetricId,
  NamedSeries,
} from "@/lib/types/answer-engine-insights";

export default function AnswerEngineInsightsPage() {
  const data = answerEngineInsightsData;
  const [subTab, setSubTab] = useState<AeiSubTab>("visibility");
  const [activeKpi, setActiveKpi] = useState<KpiMetricId>("visibility-score");
  const [visibilityChartType, setVisibilityChartType] =
    useState<ChartType>("line");
  const [platformChartType, setPlatformChartType] = useState<ChartType>("line");

  // Compare-competitors + previous-period toggles for the Visibility chart.
  // Default: only "Brex (Current)" is visible — a single line.
  const [showPrevious, setShowPrevious] = useState(false);
  const [compareCompetitors, setCompareCompetitors] = useState(false);

  const visibilityCurrent = useMemo<NamedSeries | undefined>(
    () => data.visibility.chart.series.find((s) => s.id === "brex-current"),
    [data.visibility.chart.series],
  );

  const visibilitySeries = useMemo<NamedSeries[]>(() => {
    return data.visibility.chart.series.filter((s) => {
      if (s.id === "brex-current") return true;
      if (s.id === "brex-previous") return showPrevious;
      return compareCompetitors;
    });
  }, [data.visibility.chart.series, showPrevious, compareCompetitors]);

  // Decide whether to render the simple single-line chart (default) or the
  // multi-series chart (any optional toggle on).
  const visibilityIsMulti = showPrevious || compareCompetitors;

  return (
    <div className="mx-auto max-w-1280 px-32 py-24 space-y-24">
      {/* ── Top bar: brand label + Ask ──────────────────────────────────── */}
      <PageHeader
        title={
          <span className="inline-flex items-center gap-8">
            <Favicon domain="brex.com" size={20} fallbackLabel="Brex" />
            <span>Brex</span>
          </span>
        }
        actions={
          <Button size="sm" variant="default" iconLeft={<SparklesIcon />}>
            Ask
          </Button>
        }
      />

      {/* ── Sub-tabs row + Settings / Export ───────────────────────────── */}
      <div className="flex items-end justify-between gap-16 border-b border-fill-quaternary">
        <div className="flex-1 min-w-0 -mb-px">
          <SubTabs active={subTab} onChange={setSubTab} />
        </div>
        <div className="flex items-center gap-8 pb-8 shrink-0">
          <button
            type="button"
            className="text-small text-text-secondary hover:text-text-primary transition-colors px-4"
          >
            Settings
          </button>
          <Button
            size="sm"
            variant="default"
            iconLeft={<ArrowDownTrayIcon />}
          >
            Export 6.6k answers
          </Button>
        </div>
      </div>

      {/* ── Filter row ────────────────────────────────────────────────── */}
      <FilterRow filters={data.filters} />

      {/* ── KPI strip ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
        {data.kpis.map((kpi) => (
          <KpiCard
            key={kpi.id}
            metric={kpi}
            active={activeKpi === kpi.id}
            onClick={() => setActiveKpi(kpi.id)}
          />
        ))}
      </div>

      {/* ── Visibility trend ──────────────────────────────────────────── */}
      <section className="space-y-16">
        <SectionHeader
          title="Visibility Score"
          subtitle="How often Brex appears in AI-generated answers"
          info
          action={
            <ChartActions
              chartType={visibilityChartType}
              onChartTypeChange={setVisibilityChartType}
            />
          }
        />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">
          <ChartPanel
            headline={data.visibility.headline}
            footer={
              <>
                <div className="flex items-center gap-12">
                  <Toggle
                    checked={showPrevious}
                    onCheckedChange={setShowPrevious}
                    label="Previous Period"
                  />
                  <Toggle
                    checked={compareCompetitors}
                    onCheckedChange={setCompareCompetitors}
                    label="Compare competitors"
                  />
                </div>
                <button
                  type="button"
                  className="text-mini text-text-tertiary hover:text-text-primary transition-colors"
                >
                  Expand
                </button>
              </>
            }
          >
            {visibilityIsMulti ? (
              <MultiLineChart series={visibilitySeries} yMode="percent" />
            ) : visibilityCurrent ? (
              <LineChart
                data={visibilityCurrent.data}
                domain="brex.com"
                seriesLabel="Brex"
              />
            ) : null}
          </ChartPanel>

          <section className="bg-bg-primary rounded-8 shadow-flat p-24">
            <RankLeaderboard
              rank={1}
              metricLabel="Visibility Score"
              rows={data.shareOfVoice.leaderboard.map((r) => ({
                ...r,
                value:
                  r.id === "brex"
                    ? "78.0%"
                    : r.id === "ramp"
                      ? "17.1%"
                      : r.id === "capital-one"
                        ? "32.4%"
                        : r.id === "amex"
                          ? "32.1%"
                          : "5.3%",
              }))}
            />
          </section>
        </div>
      </section>

      {/* ── Share of Voice ────────────────────────────────────────────── */}
      <section className="space-y-16">
        <SectionHeader
          title="Share of Voice"
          subtitle="Mentions of Brex in AI-generated answers in relation to competitors"
          info
          action={<ChartActions hideDownload />}
        />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">
          <ChartPanel headline={data.shareOfVoice.headline}>
            <div className="flex items-center justify-center gap-32 py-16">
              <DonutChart
                segments={data.shareOfVoice.segments}
                centerLabel={data.shareOfVoice.headline.value}
                centerHint="Brex"
                size={200}
              />
              <ul className="flex flex-col gap-10 text-small text-text-secondary min-w-180">
                {data.shareOfVoice.segments.map((s) => (
                  <li key={s.id} className="inline-flex items-center gap-8">
                    <span
                      aria-hidden
                      className="inline-block size-10 rounded-full shrink-0"
                      style={{ background: `var(${s.colorVar})` }}
                    />
                    {s.domain ? (
                      <Favicon domain={s.domain} size={16} fallbackLabel={s.label} />
                    ) : null}
                    <span className="whitespace-nowrap">{s.label}</span>
                    <span className="ml-auto tabular-nums text-text-tertiary">
                      {(s.share * 100).toFixed(1)}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ChartPanel>

          <section className="bg-bg-primary rounded-8 shadow-flat p-24">
            <RankLeaderboard
              rank={1}
              metricLabel="Share of Voice"
              rows={data.shareOfVoice.leaderboard}
            />
          </section>
        </div>
      </section>

      {/* ── Platform breakdown ────────────────────────────────────────── */}
      <section className="space-y-16">
        <SectionHeader
          title="Visibility by Platform"
          subtitle="Per-engine visibility across the tracked AI surfaces"
          info
          action={
            <ChartActions
              chartType={platformChartType}
              onChartTypeChange={setPlatformChartType}
            />
          }
        />
        <ChartPanel>
          <MultiLineChart
            series={data.platformBreakdown.chart.series}
            yMode="percent"
          />
        </ChartPanel>
      </section>

      {/* ── Citations table ───────────────────────────────────────────── */}
      <section className="space-y-16">
        <SectionHeader
          title="Top Citations"
          subtitle="Sources surfaced by AI engines in the past 7 days"
          action={
            <Button size="sm" iconRight={<ArrowTopRightOnSquareIcon />}>
              All citations
            </Button>
          }
        />
        <CitationsTable rows={data.citations} />
      </section>
    </div>
  );
}
