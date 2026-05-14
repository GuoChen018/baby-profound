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
 * Voice — analyst-note style modeled on Profound's actual weekly
 * summaries. Reference samples (American Express, Ramp) shared by
 * the user demonstrate the format:
 *
 *   - **Headline** is one long Title-Case sentence with a positive
 *     anchor + a tempering "Amid/Despite" clause + a third nuance.
 *     ("Brand Maintains/Holds/Sees [Adjective] AI Visibility Amid
 *     [Tempering Detail] and [Additional Nuance]")
 *   - **Body** is two compressed sentences that progress
 *     overall-position → topic-level movement:
 *       1. *Position + period direction* — names the rank and
 *          category, gives the score delta in absolute terms.
 *       2. *Topic-level mix* — names specific prompts in single
 *          quotes with parenthesized deltas, mixing gains and
 *          declines so the reader sees the shape.
 *     The earlier 3-sentence version added a citation-share +
 *     top-cited-pages sentence; the user pushed back as too long
 *     for a dashboard hero, so we collapsed to 2 sentences. The
 *     citation-share synthesis can move into a future "more details"
 *     expandable if needed.
 *
 * Hero ↔ opportunities cohesion: the topics named in sentence 2
 * ('top business credit cards', 'best corporate card for startups',
 * 'high-limit cards') match the targets of the first three cards in
 * `overviewOpportunities`. Marketer reads hero, looks down, sees the
 * rail addressing exactly the topics that just got named.
 *
 * Numbers reconcile with `kpis` and `rankLeaderboard` below:
 *   - 78.5% visibility score ← `kpis[0].value`
 *   - -1.3% delta            ← `kpis[0].delta`
 *   - #2 rank                ← `kpis[1].value` (Ramp at #1 in
 *                              `rankLeaderboard`)
 *
 * Prompt-level deltas (+4.4%, -6.9%, -3.1%) are illustrative — the
 * real product would compute these from per-prompt time series.
 *
 * Loading state: shimmering skeleton rectangles for ~1.2s then
 * blur-fade-and-crossfade to the real content. The skeleton bar
 * counts in `HeroSkeleton` (page.tsx) are tuned to roughly match the
 * wrap of the real headline (~3 lines) and body (~4 lines).
 */
export const themeOfWeek = {
  eyebrow: "What's new",
  headline:
    "Brex Holds #2 in Corporate Card AI Visibility Amid Slight Decline and Mixed Topic Performance",
  body: "Brex held its #2 position in corporate card AI visibility (78.5%, down 1.3% this period). Declines on 'top business credit cards' (-6.9%) and 'best corporate card for startups' (-3.1%) offset gains on 'high-limit cards' (+4.4%).",
} as const;

// ────────────────────────────────────────────────────────────────────
// Top Opportunities (rail)
// ────────────────────────────────────────────────────────────────────

/**
 * Five opportunities, themed to the weekly narrative above. The rail
 * shows the first three; the first two intentionally pick up the
 * topics named in `themeOfWeek.body` ('top business credit cards'
 * and 'high-limit cards') so the page tells one coherent story, and
 * the third opens the offensive angle ('best corporate card for
 * startups' — where Brex isn't cited yet).
 *
 * Schema (see `OpportunityTile.tsx`):
 *
 *   - **action**   — verb-first sentence in the form
 *       `<verb> <object> to <purpose>`
 *     The "to <purpose>" clause states the goal of the action so a
 *     marketer can read just the title and know WHY they'd do this.
 *     Examples:
 *       - "Create content brief to defend ranking on '<topic>'"
 *       - "Strengthen page to recover share on '<topic>'"
 *       - "Create new content to win '<topic>'"
 *       - "Reach out to <person> to grow <outlet> citations"
 *       - "Set up agent to monitor <channel>"
 *     This replaces the earlier "<verb> <object> for <target>" wording
 *     ("Create content brief for 'top business credit cards'"), which
 *     stated the target but not the *intent*. The new pattern reads
 *     more like a to-do list with purpose.
 *   - **reason**   — three slots joined by middots in the renderer:
 *       - `anchor`      magnitude ("164k/mo", "0.1% share")
 *       - `scope`       optional channel/time when not already
 *                       baked into the action (mostly empty)
 *       - `comparison`  trend / competitor / gap signal
 *
 * Per-card intent (purpose clause → what's the goal):
 *   1. **Defend ranking** — was higher, slipped. Goal: stop the bleed.
 *   2. **Recover share** — existing page underperforming on a topic
 *      a competitor is currently winning. Goal: take share back.
 *   3. **Win an untapped prompt** — zero share but the prompt is
 *      addressable (competitors ARE cited). Goal: enter the field.
 *   4. **Grow citations through a journalist** — relationship gap.
 *      Goal: convert a productive journalist into a Brex citer.
 *   5. **Monitor a blind spot** — competitor activity we don't see.
 *      Goal: get visibility before we make decisions.
 *
 * Hrefs all point at `/opportunities` (the listing) — these IDs
 * don't yet have full `Opportunity` records in `lib/data/opportunities.ts`,
 * so we route to the listing rather than 404 under static export.
 */
/**
 * Order matters — the rail slices the first TWO, so positions 1-2
 * are the visible "headline opportunities" and 3-5 spill into the
 * "View all" page.
 *
 * Visible rail (1-2): one defensive content fire + one agent
 * setup. The defensive fire (164k-volume rank drop) is this week's
 * single biggest gap; pairing it with the agent setup says "and
 * here's how you stop having to fight this fire manually next
 * time." That two-card story compresses both halves of the
 * Profound pitch — react to the present + automate the future —
 * into the rail without burying either in scroll.
 *
 * Spillover (3-5): the optimize-the-high-limit-page card stays in
 * the catalog so it shows up on the Opportunities listing, but it
 * loses its rail slot because the agent card is the more
 * strategic neighbor for the defense card. Offense + outreach
 * round out the Medium-impact tail.
 *
 * Agent card framing — modeled on Profound's "competitor catches a
 * price change, drafts an email, posts to Slack, builds a landing
 * page" pitch. The opportunity isn't "monitor a Subreddit" (a
 * passive task that an existing Reddit Sentiment Tracker already
 * covers); it's "set up an agent that PRODUCES artifacts when Ramp
 * publishes on contested topics." The verb→outcome on the card is
 * "monitor Ramp launches and draft Brex responses" — both halves
 * are essential because the "draft responses" half is what makes
 * the agent feel like a teammate rather than an alarm.
 */
export const overviewOpportunities: PrototypeOpportunity[] = [
  {
    id: "op-content-brief-top-business-credit-cards",
    // High impact: 164k/month is the largest volume on the list AND
    // the rank just dropped #2→#3, so this is the "biggest fire"
    // tile. "Create new content" replaces the earlier "Create
    // content brief" — the artifact distinction wasn't carrying
    // useful info. Reason uses labelled fields ("rank #X → #Y",
    // "citation share X% → Y%") rather than bare-arrow shorthand,
    // so each value is self-describing at a glance.
    impact: "High",
    action:
      "Create new content to defend ranking on \u2018top business credit cards\u2019",
    reason: {
      anchor: "164k/month",
      comparison: "rank #2 \u2192 #3 \u00b7 citation share 11.2% \u2192 8.8%",
    },
    // Deep-links to its own detail page (defined in
    // `lib/data/opportunities.ts`). The detail page's action card
    // then routes to the freshly-drafted brief in the Content
    // editor, completing the loop opp tile → detail → editor.
    href: "/opportunities/op-content-brief-top-business-credit-cards",
  },
  {
    id: "op-agent-competitor-response",
    // High impact: one-time setup that compounds across topics. The
    // alternative is for the marketer to keep playing whack-a-mole
    // every time Ramp publishes — an agent collapses that into a
    // single automation. Promoted from position 3 → 2 so it shares
    // the visible rail with the defense card above; the pairing
    // reads as "fix this week's fire AND prevent next week's." The
    // verb→outcome is two-clause — "monitor Ramp launches AND draft
    // Brex responses" — to signal the agent doesn't just watch, it
    // produces artifacts. Deep-links to the full detail page (Slack
    // ping → brief draft → battle-card update) because this is the
    // one rail card with a real workflow story.
    impact: "High",
    action:
      "Create new agent to monitor Ramp launches and draft Brex responses",
    reason: {
      anchor: "4 Ramp pages added in May",
      comparison: "No automated response in place",
    },
    href: "/opportunities/op-agent-competitor-response",
  },
  {
    id: "op-optimize-high-limit-business-credit-card",
    // High impact still — Ramp gained +6% this week so the gap is
    // actively widening — but demoted to position 3 (off-rail). The
    // marketer can scroll the Opportunities listing for this one;
    // it doesn't earn a rail slot because the agent card is the
    // more strategic neighbor for the headline defense card.
    impact: "High",
    action:
      "Optimize page to recover share on \u2018high-limit business credit cards\u2019",
    reason: {
      anchor: "12k/month",
      // No `scope` — topic is named in the action. Showing the full
      // URL here added ~50 chars of noise on the rail tile.
      comparison: "citation share 0.1% \u00b7 Ramp gained 6% this week",
    },
    href: "/opportunities",
  },
  {
    id: "op-content-best-corporate-card-startups",
    // Medium impact: 52k/mo is solid volume but this is an
    // exploration play (Brex isn't cited at all yet), not a
    // defensive fire. Worth doing, but the rank-drop cards above
    // are more time-sensitive.
    impact: "Medium",
    action:
      "Create new content to win \u2018best corporate card for startups\u2019",
    reason: {
      anchor: "52k/month",
      comparison: "Brex not cited \u00b7 Ramp citation share 14%",
    },
    href: "/opportunities",
  },
  {
    id: "op-outreach-jerod-morales",
    // Medium impact: relationship-building has a slow payoff curve
    // and the citation differential (12 vs 0) is meaningful but
    // doesn't carry the immediacy of a rank-drop on a 164k-volume
    // topic.
    impact: "Medium",
    action: "Reach out to Jerod Morales to grow Forbes citations",
    reason: {
      // Counts (not "share") are the right unit for relationship
      // gaps. The May timeframe in `anchor` contextualizes the
      // count so "12" doesn't read as ambiguous.
      anchor: "12 Ramp citations in May",
      comparison: "0 Brex citations",
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
