/**
 * Overview — mock data for the canonical AEO-style homepage.
 *
 * This was originally an exploration (`app/explorations/aeo-overview/`)
 * but we promoted it to the canonical surface — see git history for
 * the move. Colocated with the page rather than shoved into
 * `lib/data/` because it's overview-specific composition (rail items
 * worded around the weekly theme, prompts table aligned with
 * `themeOfWeek`, etc.) rather than reusable seed data.
 *
 * Hrefs point at real canonical routes. No prefix rewriting — every
 * sidebar nav, KPI footer-strip, opportunity tile, and prompt row
 * deep-links into the rest of the app.
 */

import { formatCompact, formatPercentDelta } from "@/lib/mockData";
import type { SeriesPoint } from "@/lib/types";
import type { PrototypeOpportunity } from "@/components/opportunities";
import { withBasePath } from "@/lib/basePath";

export type KpiId = "visibility-score" | "visibility-rank" | "ai-citations" | "bot-visits";

export type KpiTab = {
  id: KpiId;
  label: string;
  /** Headline KPI value. */
  value: number;
  /** Signed delta — already oriented so that **positive = good**. For
   *  ranks (where smaller is better) the data file expresses the
   *  improvement direction directly, not the raw numeric change. */
  delta: number;
  /** How to format the headline value. */
  format: (n: number) => string;
  /** How to format the delta — defaults to signed percent (e.g. "-1.3%"). */
  deltaFormat?: (n: number) => string;
  /** Y-axis tick formatter for the chart. Defaults to `format`. */
  yFormat?: (n: number) => string;
  /** Footer-strip CTA below the chart body. `label` is the full strip
   *  copy (e.g. "View more insights about AI visibility"); `href` is the
   *  canonical product route to deep-link into. */
  viewIn: { label: string; href: string };
  /** 7-point trendline. */
  series: SeriesPoint[];
};

const signed = (n: number, body: string) => `${n > 0 ? "+" : n < 0 ? "−" : ""}${body}`;

export const formatSignedRank = (n: number): string => signed(n, `${Math.abs(n)}`);
export const formatSignedCount = (n: number): string =>
  signed(n, formatCompact(Math.abs(n)));

const DATES = ["May 6", "May 7", "May 8", "May 9", "May 10", "May 11", "May 12"];

const series = (values: number[]): SeriesPoint[] =>
  DATES.map((date, i) => ({ date, value: values[i]! }));

const formatCount = (v: number): string =>
  v >= 1_000 ? formatCompact(v) : `${Math.round(v)}`;

export const kpis: KpiTab[] = [
  {
    id: "visibility-score",
    label: "Visibility Score",
    value: 78.5,
    delta: -1.3,
    format: (v) => `${v.toFixed(1)}%`,
    deltaFormat: formatPercentDelta,
    viewIn: {
      label: "View more insights about AI visibility",
      href: "/answer-engine-insights",
    },
    series: series([79.4, 78.1, 79.8, 76.2, 79.6, 78.0, 78.5]),
  },
  {
    id: "visibility-rank",
    label: "Visibility Rank",
    value: 2,
    // Rank moved from 3 → 2 — expressed as a positive improvement so the
    // sign-based color logic still works ("up the leaderboard" = green).
    delta: 1,
    format: (v) => `#${Math.round(v)}`,
    yFormat: (v) => `#${Math.round(v)}`,
    deltaFormat: formatSignedRank,
    viewIn: {
      label: "View more insights about AI visibility",
      href: "/answer-engine-insights",
    },
    series: series([3, 3, 2, 2, 2, 3, 2]),
  },
  {
    id: "ai-citations",
    label: "AI Citations",
    value: 6_643,
    delta: 412,
    format: formatCount,
    yFormat: formatCount,
    deltaFormat: formatSignedCount,
    viewIn: {
      label: "View more insights about AI citations",
      href: "/agent-analytics",
    },
    series: series([880, 920, 980, 940, 990, 1_010, 923]),
  },
  {
    id: "bot-visits",
    label: "Bot Visits",
    value: 12_840,
    delta: 1_240,
    format: formatCount,
    yFormat: formatCount,
    deltaFormat: formatSignedCount,
    viewIn: {
      label: "View more insights about bot visits",
      href: "/agent-analytics",
    },
    series: series([1_650, 1_720, 1_810, 1_900, 1_980, 1_900, 1_880]),
  },
];

// ────────────────────────────────────────────────────────────────────
// Theme of the week
// ────────────────────────────────────────────────────────────────────

/**
 * The Overview surface anchors the entire page around a single weekly
 * narrative ("theme of the week"). The hero is the first thing
 * marketers see when they open Profound on Monday morning — its single
 * job is to answer **"how healthy is my AI visibility this week?"** in
 * one scan.
 *
 * The copy is structured for that scan:
 *
 *   - **Headline = positional + directional health.** Open with the
 *     marketer's category standing (their fundamental position) and
 *     the dominant trend signal across all KPIs. This is the
 *     "everything is roughly okay / not okay" line — no hedge words
 *     ("still", "despite", "however") because those read as
 *     defensive.
 *   - **Body = where to look first.** One concrete weakness, anchored
 *     to a real KPI delta and a real prompt with its monthly volume.
 *     Volume tells the marketer how much *traffic* is at stake, which
 *     is the right unit for prioritization.
 *
 * Numbers reconcile with `kpis` above:
 *   - Visibility Rank #2 ← `kpis[1].value`
 *   - AI Citations +412 ≈ +7% ← `kpis[2].value` / `kpis[2].delta`
 *   - Visibility Score 78.5% (-1.3%) ← `kpis[0].value` / `kpis[0].delta`
 *
 * The body's prompt — "top business credit cards" at 164k monthly
 * prompts, #2 → #3 — matches the first row in `categoryPrompts` and
 * the first opportunity in `overviewOpportunities`, so the hero,
 * table, and rail all tell one coherent story.
 *
 * Loading state: shimmering skeleton rectangles for ~1.2s then
 * crossfade to the real content. No timestamp in the eyebrow — the
 * page itself already implies "now".
 */
export const themeOfWeek = {
  eyebrow: "What's new",
  headline:
    "Brex ranks #2 in corporate card visibility — AI citations up 7% week-over-week",
  body: "Visibility Score sits at 78.5% (-1.3%). The biggest gap this week is on 'top business credit cards' (164k monthly prompts), where Brex slipped from #2 to #3.",
} as const;

// ────────────────────────────────────────────────────────────────────
// Top Opportunities (rail)
// ────────────────────────────────────────────────────────────────────

/**
 * Five opportunities, all themed to the weekly narrative above. The
 * rail shows the first two.
 *
 * Structure mirrors `PrototypeOpportunity`:
 *   - title     → action-first opportunity framing
 *   - context   → topic · volume · competitive signal, pre-joined
 *   - currentPerformance → the specific gap signal
 *   - href      → canonical `/opportunities` listing. These IDs are
 *     themed to the weekly narrative and don't have full detail
 *     records in `lib/data/opportunities.ts`, so we route to the
 *     listing rather than producing 404s under static export. A
 *     follow-up could seed real `Opportunity` records and link to
 *     `/opportunities/<id>` directly.
 */
export const overviewOpportunities: PrototypeOpportunity[] = [
  {
    id: "op-content-brief-top-business-credit-cards",
    type: "Create Content Brief",
    title:
      "Create a content brief for a high-volume topic where Brex lost ranking this week",
    context:
      "top business credit cards · 164k monthly prompts · dropped from #2 to #3",
    currentPerformance: {
      label: "Citation share",
      value: "8.8% · down from 11.2%",
    },
    href: "/opportunities",
  },
  {
    id: "op-optimize-high-limit-business-credit-card",
    type: "Optimize Page",
    title:
      "Strengthen an existing page before competitors pull further ahead on a high-intent topic",
    context: "high limit business credit cards · Ramp gained 6% this week",
    currentPerformance: {
      label: "Citation share",
      value: "0.1% · brex.com/high-limit-business-credit-card",
    },
    href: "/opportunities",
  },
  {
    id: "op-content-best-corporate-card-startups",
    type: "Content Creation",
    title:
      "Create net-new content for an untapped prompt where Ramp and Divvy are already appearing",
    context: "best corporate card for startups · 52k monthly prompts · Brex not cited",
    currentPerformance: {
      label: "Citation share",
      value: "Not mentioned",
    },
    href: "/opportunities",
  },
  {
    id: "op-outreach-jerod-morales",
    type: "Outreach",
    title:
      "Connect with a journalist whose coverage consistently drives AI citations in your category",
    context: "Jerod Morales · Forbes · cited Ramp 12x this month · Brex 0x",
    currentPerformance: {
      label: "Mentions",
      value: "Not mentioned",
    },
    href: "/opportunities",
  },
  {
    id: "op-agent-reddit-startups",
    type: "Set Up Agent",
    title:
      "Monitor Reddit conversations where competitors are being recommended over Brex",
    context:
      "Profound detected r/startups citing Ramp on corporate card threads · Brex not present",
    currentPerformance: {
      label: "Current coverage",
      value: "Not monitored",
    },
    href: "/opportunities",
  },
];

// ────────────────────────────────────────────────────────────────────
// Visibility Rank leaderboard
// ────────────────────────────────────────────────────────────────────

/**
 * Leaderboard surfaced as the body of the Visibility Rank KPI tab.
 * Shows the brand's current rank prominently, then a top-5 competitor
 * list. Numbers must reconcile with the Visibility Rank KPI — Brex
 * sits at #2 with a +1 delta.
 */
export type RankLeaderRow = {
  rank: number;
  brand: string;
  domain: string;
  visibilityScore: number;
  delta: number;
  isOwn?: boolean;
  /** Explicit logo asset path (lives under `public/`). When present we use
   *  this instead of fetching the published favicon. Use for brands whose
   *  real favicon is unreadable against our dark page bg (e.g. Mercury's
   *  intertwined-circle glyph) and where we ship a curated SVG/PNG asset. */
  logoSrc?: string;
};

export const rankLeaderboard: RankLeaderRow[] = [
  { rank: 1, brand: "Ramp", domain: "ramp.com", visibilityScore: 86.4, delta: 1.5 },
  {
    rank: 2,
    brand: "Brex",
    domain: "brex.com",
    visibilityScore: 80.3,
    delta: 1.3,
    isOwn: true,
  },
  {
    rank: 3,
    brand: "Mercury",
    domain: "mercury.com",
    visibilityScore: 78.9,
    delta: -2.2,
    logoSrc: withBasePath("/mercury-logo.png"),
  },
  { rank: 4, brand: "Rho", domain: "rho.co", visibilityScore: 74.3, delta: -1.7 },
  { rank: 5, brand: "Bill", domain: "bill.com", visibilityScore: 68.5, delta: 1.1 },
];

// ────────────────────────────────────────────────────────────────────
// Top prompts in your category
// ────────────────────────────────────────────────────────────────────

export type CategoryPromptRow = {
  id: string;
  topic: string;
  /** URL-safe slug used to deep-link into /prompt-volumes or /opportunities. */
  topicSlug: string;
  promptVolume: number;
  tracked: boolean;
  /** Optional rank (only meaningful for tracked rows). */
  visibilityRank?: number;
  /** Optional ID into `overviewOpportunities` so untracked rows can deep-link
   *  to a specific opportunity detail page. */
  opportunityId?: string;
};

/**
 * Volumes + tracking states are aligned with `themeOfWeek` so the
 * prompts table reads as evidence FOR the weekly narrative:
 *   - "Top business credit cards" is the highest-volume topic AND the
 *     one Brex just dropped a rank on (#2 → #3).
 *   - "High limit business credit card" is where Ramp is gaining 6%
 *     citation share — untracked here, which is itself part of the
 *     gap.
 *   - "Best corporate card for startups" matches the Content
 *     Creation opportunity — high volume, Brex not cited, untracked.
 *
 * Each row's `opportunityId` deep-links to the matching opportunity
 * when the user clicks an untracked row.
 */
export const categoryPrompts: CategoryPromptRow[] = [
  {
    id: "p-1",
    topic: "Top business credit cards",
    topicSlug: "top-business-credit-cards",
    promptVolume: 164_000,
    tracked: true,
    visibilityRank: 3,
  },
  {
    id: "p-2",
    topic: "Best corporate card for startups",
    topicSlug: "best-corporate-card-for-startups",
    promptVolume: 52_000,
    tracked: false,
    opportunityId: "op-content-best-corporate-card-startups",
  },
  {
    id: "p-3",
    topic: "Corporate credit card no personal guarantee",
    topicSlug: "corporate-credit-card-no-personal-guarantee",
    promptVolume: 14_300,
    tracked: true,
    visibilityRank: 1,
  },
  {
    id: "p-4",
    topic: "High limit business credit card",
    topicSlug: "high-limit-business-credit-card",
    promptVolume: 12_200,
    tracked: false,
    opportunityId: "op-optimize-high-limit-business-credit-card",
  },
  {
    id: "p-5",
    topic: "Expense management software comparison",
    topicSlug: "expense-management-software-comparison",
    promptVolume: 10_900,
    tracked: true,
    visibilityRank: 4,
  },
  {
    id: "p-6",
    topic: "How to build business credit",
    topicSlug: "how-to-build-business-credit",
    promptVolume: 7_400,
    tracked: false,
  },
  {
    id: "p-7",
    topic: "Brex Cash account interest rate",
    topicSlug: "brex-cash-account-interest-rate",
    promptVolume: 4_200,
    tracked: true,
    visibilityRank: 1,
  },
];
