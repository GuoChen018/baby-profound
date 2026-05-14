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
 *   4. Right rail — TopOpportunitiesRail (first 3 of 5 themed
 *      opportunities) and AgentReviewsRail (3 reviews).
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
 * **shimmering skeleton + blur-fade reveal** to simulate the
 * generation arriving:
 *
 *   - **Loading (0–1200ms)**: the real headline + body are already
 *     in the DOM (and set the container height) but rendered at
 *     `opacity-0 blur-md`. A skeleton overlay of shimmering gray
 *     rectangles sits on top via `absolute inset-0`. Eyebrow shows
 *     "Generating this week's summary…" with a shimmering text gradient.
 *   - **Ready (1200ms+)**: the skeleton overlay fades out AND the
 *     real content fades in *while un-blurring* over 700ms. The
 *     blur-fade direction (heavy → 0) is what makes the content
 *     read as "AI just finished thinking" rather than a flat
 *     crossfade. Eyebrow swaps to "What's new".
 *
 * Key property — **zero layout shift**: the real content is always
 * mounted at its final dimensions, so the chart, prompts table, and
 * right rail below never move when the hero "arrives". The skeleton
 * is positioned ABSOLUTELY so it doesn't compete with the real
 * content for layout space; the page is geometrically identical at
 * t=0 and t=∞.
 *
 * Skeleton bars are wrapped in fixed-height boxes that match the
 * REAL line-heights (36px for the title, 20px for the body), so the
 * silhouette during loading lines up vertically with the eventual
 * content. Total skeleton height = real content height = 120px.
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

       Headline responsiveness:
       - The headline font scales fluidly with `clamp(22px, 2.4vw,
         28px)` — 28px at ≥~1170px viewport, 22px at ≤~917px, and a
         linear glide in between. The previous fixed 28px font held
         steady right until a word couldn't fit anymore, then snapped
         to an extra line, which read as "broken responsiveness."
         Fluid sizing softens the perception: as the viewport
         narrows, the headline visibly shrinks (and the wrap
         threshold slides with it) so the change feels continuous
         instead of stepped. Line wraps are still fundamentally
         discrete events — that's how CSS layout works — but the
         font transition smooths the eye.
       - Line-height uses the same 1.28 ratio via `clamp(28px, 3.1vw,
         36px)` so leading scales with the font and the headline
         never gets visually cramped at smaller sizes.
       - `text-wrap: balance` (via `text-balance`) is on both the
         headline and the body so lines stay roughly equal width
         instead of stranding a single word on the last line. */
    <section className="flex items-start justify-between gap-16">
      <div className="min-w-0 flex-1">
        <HeroEyebrow loading={loading} />
        {/* Stable-height area. The real content is always rendered
            (sets the container height); the skeleton overlay sits on
            top via `absolute inset-0`. Crossfading + blur on the
            content layer creates the "AI un-blur" reveal effect. */}
        <div className="relative mt-12">
          <div
            aria-busy={loading || undefined}
            aria-live="polite"
            className={cn(
              "transition-[opacity,filter] duration-700 ease-out",
              // `will-change` hints the GPU so the blur transition
              // doesn't jank on slower machines.
              "[will-change:opacity,filter]",
              loading
                ? "opacity-0 blur-[6px] select-none pointer-events-none"
                : "opacity-100 blur-0",
            )}
          >
            <h2
              className={cn(
                "font-semibold text-text-primary text-balance",
                "text-[clamp(22px,2.4vw,28px)]",
                "leading-[clamp(28px,3.1vw,36px)]",
              )}
            >
              {themeOfWeek.headline}
            </h2>
            <p className="mt-8 text-paragraph text-text-secondary max-w-[68ch] text-balance">
              {themeOfWeek.body}
            </p>
          </div>
          <div
            aria-hidden
            className={cn(
              // `overflow-hidden` is the safety net for bar-count
              // mismatches: `<HeroSkeleton />` has fixed-height
              // rows, and if their sum exceeds the parent (which is
              // sized by the real content underneath), the trailing
              // bars used to overflow visually onto the KPI tabs
              // below. Clipping keeps the silhouette neatly inside
              // the hero's text area at every wrap variant.
              "absolute inset-0 overflow-hidden",
              "transition-opacity duration-500 ease-out",
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
 * text area during the AI-generation loading state.
 *
 * Each skeleton bar is wrapped in a fixed-height row matching the
 * REAL content's line-height (36px for title lines, 20px for body
 * lines). The bar itself is shorter than its row so the visual
 * "text height" reads correctly while the row owns the line spacing.
 *
 * Bar counts are tuned to roughly the WRAP of the real headline
 * (~3 lines for the long Profound-style title) and body (~5-6 lines
 * for the three-sentence summary). The skeleton overlay is
 * `absolute inset-0`, so the container always matches the real
 * content's height — these bar counts only affect what the
 * silhouette LOOKS like during the load, not the layout. Small
 * mismatches between bar count and real-content wrap are harmless;
 * any leftover height just shows the page bg through, which reads
 * fine because the bars at the top already anchor the silhouette.
 *
 * Widths vary so the silhouette doesn't read as a stack of identical
 * rectangles (which would feel mechanical).
 */
function HeroSkeleton() {
  return (
    <div>
      {/* Title — 2 rows. Row height tracks the clamp-based line-height
          on the real headline (clamp(28px, 3.1vw, 36px)) so the
          skeleton silhouette stays vertically aligned with the
          post-load title at every viewport width. Real headlines
          wrap to 2-3 lines depending on viewport; 2 bars here is
          intentional — it leaves a small "first body line peek" of
          page bg between the title silhouette and the body
          silhouette below, which the eye reads as natural paragraph
          spacing rather than a stack of identical placeholders.
          The third row that used to live here was overflowing the
          short-headline case anyway, which is why it occasionally
          got clipped by the `overflow-hidden` wrapper. */}
      <div>
        <div className="h-[clamp(28px,3.1vw,36px)] flex items-center">
          <div className="h-22 w-[94%] rounded-4 skeleton-shimmer" />
        </div>
        <div className="h-[clamp(28px,3.1vw,36px)] flex items-center">
          <div className="h-22 w-[68%] rounded-4 skeleton-shimmer" />
        </div>
      </div>
      {/* Body — 2 rows. `mt-8` matches the real title→body gap. Body
          font isn't fluid (still 14/20), so the rows stay at fixed
          20px. Widths step down (96% → 62%) so the silhouette
          terminates with a short trailing bar — the same shape as
          a real paragraph's last line. */}
      <div className="mt-8">
        <div className="h-[20px] flex items-center">
          <div className="h-12 w-[96%] rounded-4 skeleton-shimmer" />
        </div>
        <div className="h-[20px] flex items-center">
          <div className="h-12 w-[62%] rounded-4 skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

/**
 * HeroEyebrow — crossfades between the "Generating this week's
 * summary…" loading state and the final `themeOfWeek.eyebrow` label.
 *
 * Why grid-stacking (vs. a ternary swap):
 *   The first version swapped the eyebrow content with a ternary,
 *   which made the "Generating…" text appear to wipe out left-to-right
 *   when phase flipped — the trailing edge of the still-running
 *   shimmer gradient was visible during the instant DOM swap.
 *
 * Instead, both states are mounted in the same CSS grid cell
 * (`grid-cols-1` + both children pinned to `row-start-1 col-start-1`)
 * so they share the same layout slot. Opacity-crossfading them gives
 * the eyebrow the same smooth reveal as the headline below.
 *
 * Two coordinated details prevent the prior wipe artefact:
 *   1. The `.text-shimmer` class is REMOVED the moment loading flips
 *      to false. The text reverts to a uniform `text-text-secondary`
 *      before the opacity fade kicks in, so what's fading is a
 *      single-color glyph stack, not a gradient-clipped one.
 *   2. The Sparkles icon's `animate-pulse` is conditioned the same
 *      way — pulsing while loading, static while fading out — so the
 *      whole cluster decelerates as one.
 *
 * The container's intrinsic width comes from whichever state is
 * wider (the loading copy in practice). Empty space to the right of
 * the shorter "What's new" label after the fade-in is intentional;
 * the eyebrow is its own row with nothing competing for that space.
 */
function HeroEyebrow({ loading }: { loading: boolean }) {
  return (
    <div className="grid">
      {/* Loading state */}
      <span
        aria-hidden={!loading}
        className={cn(
          "row-start-1 col-start-1",
          "inline-flex items-center gap-6 text-small font-medium text-text-secondary",
          "transition-opacity duration-500 ease-out",
          loading ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        <SparklesIcon
          className={cn(
            "size-14 text-text-tertiary",
            loading && "animate-pulse",
          )}
        />
        <span className={loading ? "text-shimmer" : undefined}>
          Generating this week&rsquo;s summary&hellip;
        </span>
      </span>
      {/* Ready state */}
      <span
        aria-hidden={loading}
        className={cn(
          "row-start-1 col-start-1",
          "inline-flex items-center gap-6 text-small font-medium text-text-secondary",
          "transition-opacity duration-500 ease-out",
          loading ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
      >
        {themeOfWeek.eyebrow}
      </span>
    </div>
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
          canonical product page for the active KPI. `justify-center`
          anchors the label + arrow to the strip's centerline so the
          full-bleed surface reads as a single CTA rather than a
          left-aligned link with a lot of dead space to the right. */}
      <Link
        href={kpi.viewIn.href}
        className={cn(
          "group flex items-center justify-center gap-6",
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
 * Shows the first TWO entries (defense + agent). The catalog has 5,
 * the remaining 3 spill into the Opportunities listing via "View
 * all". The cap at two keeps the rail short enough that the
 * neighboring AgentReviewsRail stays visible without scrolling on
 * a typical viewport.
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

/**
 * AgentReviewsRail — sibling rail to TopOpportunitiesRail.
 *
 * Same two-card cap, same reasoning: keep both rails visible
 * without scroll. Picks the first two `agentReviews` entries; the
 * data layer is ordered so the most-time-sensitive concrete
 * artifacts (Reddit reply draft, AEO suggestions) come first and
 * the periodic-digest review spills to position 3.
 */
function AgentReviewsRail() {
  const reviews = agentReviews.slice(0, 2);
  return (
    <section className="space-y-12">
      <RailHeader title="Agent for review" viewAllHref="/agents" />
      <RailGroup>
        {reviews.map((review) => (
          // Don't pass `href` here — let `AgentReviewCard` use the
          // per-review `review.href` (so e.g. a Reddit reply draft
          // routes to `/content/<id>`) and fall back to the agent
          // detail page only when no override exists.
          <AgentReviewCard key={review.id} review={review} />
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
