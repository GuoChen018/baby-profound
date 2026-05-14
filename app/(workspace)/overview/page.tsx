"use client";

/**
 * Overview — canonical homepage.
 *
 * Originally shipped as the `aeo-overview` exploration; promoted to
 * the canonical surface after iterating on the design. The parent
 * `(workspace)/layout.tsx` owns the sidebar + scrollable main column,
 * so this page renders content-only.
 *
 * Top-down:
 *   1. WhatsNewHero — eyebrow + AI-generated theme-of-the-week
 *      headline + body. Loading state simulates AI generation (~1.2s
 *      shimmering skeleton blocks → crossfade reveal). The headline +
 *      body together form the narrative anchor that the opportunity
 *      rail addresses.
 *   2. ActiveKpiPanel — segmented Visibility Score / Visibility Rank /
 *      AI Citations / Bot Visits tabs with chart body and footer-strip
 *      deep-link to the matching analytics surface.
 *   3. PromptsSection — `<Table>` with hover-revealed row CTAs (see
 *      `PromptsTable`). Volumes + tracked rows align with `themeOfWeek`
 *      so the table reads as evidence for the narrative.
 *   4. Right rail — TopOpportunitiesRail (first 2 of 5 themed
 *      opportunities) and AgentReviewsRail.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/shell";
import {
  ArrowUpRightIcon,
  InformationCircleIcon,
  SparklesIcon,
} from "@/components/ui/icons";
import { Button, Delta, Select } from "@/components/ui";
import { LineChart } from "@/components/charts/LineChart";
import { OpportunityTile } from "@/components/opportunities";
import { AgentReviewCard } from "@/components/agents";
import { agentReviews } from "@/lib/data/agent-reviews";
import { cn } from "@/lib/cn";
import { Favicon } from "@/components/ui";
import {
  categoryPrompts,
  kpis,
  overviewOpportunities,
  rankLeaderboard,
  themeOfWeek,
  type KpiId,
} from "./data";
import { PromptsTable } from "./PromptsTable";

export default function OverviewPage() {
  const [activeKpi, setActiveKpi] = useState<KpiId>("visibility-score");
  const kpi = kpis.find((k) => k.id === activeKpi)!;

  return (
    <div className="mx-auto max-w-1280 px-32 py-32">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-32">
        {/* Main column. */}
        <div className="space-y-32 min-w-0">
          <WhatsNewHero />

          <ActiveKpiPanel
            kpi={kpi}
            activeKpi={activeKpi}
            onTabChange={setActiveKpi}
          />

          <PromptsSection />
        </div>

        {/* Right rail — sticky on wide viewports so it stays in view while
            scrolling the main column. */}
        <aside className="space-y-32 lg:sticky lg:top-32 lg:self-start">
          <TopOpportunitiesRail />
          <AgentReviewsRail />
        </aside>
      </div>
    </div>
  );
}

/* -------------------------------------------------------- what's new hero */

/**
 * WhatsNewHero — anchors the Overview with the AI-generated weekly
 * narrative (`themeOfWeek`). The headline + body together form a
 * single coherent thread that the opportunity rail below explicitly
 * addresses.
 *
 * The content is AI-generated each week, so the hero ships with a
 * **shimmering skeleton + crossfade reveal** to simulate the
 * generation arriving:
 *
 *   - **Loading (0–1200ms)**: the real headline + body are already
 *     in the DOM (and set the container height) but rendered at
 *     `opacity-0`. A skeleton overlay of shimmering gray rectangles
 *     sits on top via `absolute inset-0`. Eyebrow shows "Generating
 *     this week's summary…" with a pulsing SparklesIcon.
 *   - **Ready (1200ms+)**: the skeleton overlay fades out and the
 *     real content fades in over 500ms (a crossfade — both halves
 *     animate simultaneously). Eyebrow swaps to "What's new".
 *
 * Key property — **zero layout shift**: the real content is always
 * mounted at its final dimensions, so the chart, prompts table, and
 * right rail below never move when the hero "arrives". The skeleton
 * is positioned ABSOLUTELY so it doesn't compete with the real
 * content for layout space; the page is geometrically identical at
 * t=0 and t=∞.
 *
 * Users with `prefers-reduced-motion: reduce` skip the loading phase
 * entirely (and the shimmer animation itself is paused via CSS).
 */
function WhatsNewHero() {
  const [phase, setPhase] = useState<"loading" | "ready">(() => {
    if (typeof window === "undefined") return "loading";
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "ready"
      : "loading";
  });

  useEffect(() => {
    if (phase === "ready") return;
    const t = setTimeout(() => setPhase("ready"), 1200);
    return () => clearTimeout(t);
  }, [phase]);

  const loading = phase === "loading";

  return (
    /* Layout:
       - Left column owns the text stack (eyebrow → headline → body).
       - Right column hosts the date-range pill, pinned to the TOP-right
         so it visually anchors against the eyebrow row even when the
         headline wraps to two lines.

       `leading-[36px]` is pinned in px because this project sets
       `--spacing: 1px` (see globals.css), which would silently turn
       `leading-9` into a 9px line-height. */
    <section className="flex items-start justify-between gap-16">
      <div className="min-w-0 flex-1">
        <HeroEyebrow loading={loading} />
        {/* Stable-height area. The real content is always rendered
            (sets the container height); the skeleton overlay sits on
            top via `absolute inset-0`. Crossfading the two layers
            means the page geometry never changes — only the visual
            inside this fixed-size box does. */}
        <div className="relative mt-12">
          <div
            aria-busy={loading || undefined}
            aria-live="polite"
            className={cn(
              "transition-opacity duration-500 ease-out",
              loading
                ? "opacity-0 select-none pointer-events-none"
                : "opacity-100",
            )}
          >
            <h2
              className={cn(
                "text-title-regular font-semibold text-text-primary text-balance",
                "leading-[36px]",
              )}
            >
              {themeOfWeek.headline}
            </h2>
            <p className="mt-8 text-paragraph text-text-secondary max-w-[68ch]">
              {themeOfWeek.body}
            </p>
          </div>
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 transition-opacity duration-500 ease-out",
              loading ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          >
            <HeroSkeleton />
          </div>
        </div>
      </div>
      <DateRangeSelect />
    </section>
  );
}

/**
 * HeroSkeleton — shimmering rectangle stack that occupies the hero
 * text area during the AI-generation loading state. Bar widths are
 * picked to roughly approximate where the real headline + body wrap
 * (88/56% for the title, 92/70% for the body) so the silhouette feels
 * like the eventual content rather than a generic loader.
 */
function HeroSkeleton() {
  return (
    <div>
      {/* Title — 2 lines, h-22 ≈ visual height of a 28px title. */}
      <div className="space-y-12">
        <div className="h-22 w-[88%] rounded-4 skeleton-shimmer" />
        <div className="h-22 w-[56%] rounded-4 skeleton-shimmer" />
      </div>
      {/* Body — 2 lines, h-14 ≈ visual height of a 14px paragraph. */}
      <div className="mt-20 space-y-8">
        <div className="h-14 w-[92%] rounded-4 skeleton-shimmer" />
        <div className="h-14 w-[70%] rounded-4 skeleton-shimmer" />
      </div>
    </div>
  );
}

/**
 * HeroEyebrow — single inline-flex container in both states so the
 * eyebrow row has the same baseline + height whether we're showing
 * the "Generating…" status or the final "What's new" label.
 */
function HeroEyebrow({ loading }: { loading: boolean }) {
  return (
    <span className="inline-flex items-center gap-6 text-small font-medium text-text-secondary">
      {loading ? (
        <>
          <SparklesIcon className="size-14 text-text-tertiary animate-pulse" />
          Generating this week&rsquo;s summary&hellip;
        </>
      ) : (
        themeOfWeek.eyebrow
      )}
    </span>
  );
}

/**
 * DateRangeSelect — top-right control on the hero. Local state keeps
 * the prototype self-contained; clicking the pill cycles through the
 * preset ranges as a stand-in until we wire up a real menu primitive.
 */
const DATE_RANGES = [
  "Last 7 days",
  "Last 14 days",
  "Last 30 days",
  "Last 90 days",
  "All time",
] as const;
type DateRange = (typeof DATE_RANGES)[number];

function DateRangeSelect() {
  const [range, setRange] = useState<DateRange>("Last 7 days");
  return (
    <Select
      size="md"
      multiple={false}
      onClick={() => {
        const next = DATE_RANGES[(DATE_RANGES.indexOf(range) + 1) % DATE_RANGES.length]!;
        setRange(next);
      }}
      className="shrink-0"
    >
      {range}
    </Select>
  );
}

/* -------------------------------------------------------- KPI panel */

interface ActiveKpiPanelProps {
  kpi: (typeof kpis)[number];
  activeKpi: KpiId;
  onTabChange: (next: KpiId) => void;
}

function ActiveKpiPanel({ kpi, activeKpi, onTabChange }: ActiveKpiPanelProps) {
  return (
    /* Single panel — KPI tile row sits flush against the chart body with no
       gap. The tiles share their bottom border with the toolbar's top
       divider so the active tile's accent underline lands exactly on the
       seam (matches Profound's Bot Visits surface). */
    <section
      className={cn(
        "rounded-8 border border-fill-quaternary bg-bg-primary overflow-hidden",
        "flex flex-col",
      )}
    >
      <div
        className="grid grid-cols-4 border-b border-fill-quaternary"
        role="tablist"
        aria-label="KPI"
      >
        {kpis.map((tab, i) => {
          const active = tab.id === activeKpi;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative min-w-0 text-left px-16 py-12",
                "flex flex-col gap-4",
                "cursor-pointer",
                "transition-colors",
                "focus-visible:outline-none focus-visible:bg-bg-secondary",
                i > 0 && "border-l border-fill-quaternary",
                active ? "bg-bg-primary" : "hover:bg-bg-secondary/60",
              )}
            >
              <span className="inline-flex items-center gap-4 text-mini font-medium text-text-tertiary">
                <span>{tab.label}</span>
                <InformationCircleIcon className="size-12 shrink-0" />
              </span>
              <span className="flex items-baseline gap-6 min-w-0">
                <span className="text-title-mini font-semibold text-text-primary tabular-nums">
                  {tab.format(tab.value)}
                </span>
                <Delta value={tab.delta} format={tab.deltaFormat} />
              </span>
              {active ? (
                <span
                  aria-hidden
                  className="absolute -bottom-px left-0 right-0 h-[2px] bg-text-primary"
                />
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Chart body — no toolbar. Padding is asymmetric so the chart
          flushes against the footer strip below. */}
      <div className="flex flex-col px-24 pt-24">
        <div className="min-h-240">
          {/* Visibility Rank is best expressed as a competitor leaderboard —
              a rank-over-time line chart is unreadable when the value only
              moves by ±1. Every other KPI renders the trend line. */}
          {activeKpi === "visibility-rank" ? (
            <RankLeaderboard />
          ) : (
            <LineChart
              data={kpi.series}
              domain="brex.com"
              seriesLabel={kpi.label}
              yFormat={kpi.yFormat ?? kpi.format}
            />
          )}
        </div>
      </div>

      {/* Footer strip — full-width clickable surface that deep-links to the
          canonical product page for the active KPI. */}
      <Link
        href={kpi.viewIn.href}
        className={cn(
          "group flex items-center gap-6",
          "px-24 py-12",
          "border-t border-fill-quaternary",
          "text-small font-medium text-text-secondary",
          "hover:bg-bg-secondary hover:text-text-primary transition-colors",
          "focus-visible:outline-none focus-visible:bg-bg-secondary",
        )}
      >
        <span>{kpi.viewIn.label}</span>
        <ArrowUpRightIcon
          aria-hidden
          className="size-14 text-text-tertiary group-hover:text-text-primary transition-colors"
        />
      </Link>
    </section>
  );
}

/**
 * RankLeaderboard — competitor visibility-score leaderboard rendered as
 * the Visibility Rank tab's chart body.
 */
function RankLeaderboard() {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[20px_1fr_auto] items-center gap-12 px-12 pb-8 border-b border-fill-quaternary">
        <span className="text-mini font-medium text-text-tertiary">#</span>
        <span className="text-mini font-medium text-text-tertiary">Asset</span>
        <span className="text-mini font-medium text-text-tertiary">
          Visibility Score
        </span>
      </div>
      {rankLeaderboard.map((row) => (
        <div
          key={row.brand}
          className={cn(
            "grid grid-cols-[20px_1fr_auto] items-center gap-12 px-12 py-10",
            "border-b border-fill-quaternary last:border-b-0",
            row.isOwn && "bg-bg-secondary/40",
          )}
        >
          <span className="text-small text-text-tertiary tabular-nums">
            {row.rank}
          </span>
          <span className="flex items-center gap-10 min-w-0">
            {/* `logoSrc` wins over the favicon fetch — used for brands
                whose published favicon is unreadable on dark theme (e.g.
                Mercury). The curated assets are dark-on-white SVG/PNG, so
                we apply `invert` to flip them into a white-on-dark glyph
                that reads against our `bg-bg-primary` page surface. */}
            {row.logoSrc ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={row.logoSrc}
                alt=""
                aria-hidden
                width={20}
                height={20}
                className="shrink-0 size-20 rounded-4 invert"
              />
            ) : (
              <Favicon
                domain={row.domain}
                size={20}
                fallbackLabel={row.brand}
                className="rounded-4"
              />
            )}
            <span className="text-small font-medium text-text-primary truncate">
              {row.brand}
            </span>
          </span>
          <span className="flex items-baseline gap-8 tabular-nums">
            <span className="text-small font-medium text-text-primary">
              {row.visibilityScore.toFixed(1)}%
            </span>
            <Delta
              value={row.delta}
              format={(v) => `${v >= 0 ? "+" : ""}${v.toFixed(1)}%`}
            />
          </span>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------- prompts section */

function PromptsSection() {
  return (
    <section className="space-y-16 pt-12">
      <SectionHeader
        title="Top prompts in your category"
        subtitle="The queries driving the most AI answer traffic for corporate-card buyers right now."
        action={<ViewAllButton href="/prompt-volumes" />}
      />
      <PromptsTable rows={categoryPrompts} />
    </section>
  );
}

/* -------------------------------------------------------- right rail */

/**
 * TopOpportunitiesRail — rail surface for `overviewOpportunities`.
 *
 * Shows the first two entries by default. All five are themed around
 * the weekly narrative in `themeOfWeek` so this rail reads as "here's
 * what to do about it" for the hero above.
 */
function TopOpportunitiesRail() {
  const items = overviewOpportunities.slice(0, 2);
  return (
    <section className="space-y-12">
      <RailHeader title="Top Opportunities" viewAllHref="/opportunities" />
      <RailGroup>
        {items.map((op) => (
          <OpportunityTile key={op.id} opportunity={op} />
        ))}
      </RailGroup>
    </section>
  );
}

function AgentReviewsRail() {
  return (
    <section className="space-y-12">
      <RailHeader title="Agent for review" viewAllHref="/agents" />
      <RailGroup>
        {agentReviews.map((review) => (
          <AgentReviewCard
            key={review.id}
            review={review}
            href={`/agents/${review.agentId}`}
          />
        ))}
      </RailGroup>
    </section>
  );
}

/**
 * RailGroup — wraps a vertical list of rail tiles in a single rounded
 * bordered surface and inserts hairline dividers between rows.
 */
function RailGroup({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-8 border border-fill-quaternary bg-bg-primary overflow-hidden",
        "divide-y divide-fill-quaternary",
      )}
    >
      {children}
    </div>
  );
}

function RailHeader({
  title,
  viewAllHref,
}: {
  title: string;
  viewAllHref: string;
}) {
  return (
    <div className="flex items-center justify-between gap-12">
      <h3 className="text-title-mini font-semibold text-text-primary">{title}</h3>
      <ViewAllButton href={viewAllHref} />
    </div>
  );
}

function ViewAllButton({ href }: { href: string }) {
  return (
    <Link href={href}>
      <Button size="sm" iconRight={<ArrowUpRightIcon />}>
        View all
      </Button>
    </Link>
  );
}
