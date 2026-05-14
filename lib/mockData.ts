/**
 * Mock data — Brex-themed, modelled on captured screenshots in
 * `_reference/profound/`. Numbers/people are illustrative; nothing here
 * is real customer data.
 */

import type { Opportunity, OverviewData } from "./types";

// ────────────────────────────────────────────────────────────────────
// Top Opportunities — shared between Overview and Opportunities tab.
// Overview only renders the first 2-3; Opportunities tab renders all.
// ────────────────────────────────────────────────────────────────────

export const opportunities: Opportunity[] = [
  {
    id: "op-outreach-jared-morales",
    type: "Outreach",
    target: { kind: "person", label: "Jared Morales" },
    headline:
      "Contact Jared Morales at www.forbes.com to offer exclusive Brex data and expert access.",
    description:
      "Jared's recent Forbes coverage (more than 30 citations over the past 2 months) shows strong focus and influence in financial technology and spend management topics. Offering exclusive, data-driven angles and a ready expert aligns with his reported preference for actionable, source-backed reporting.",
    currentPerformance: { status: "Not Mentioned" },
    actionCard: {
      type: "Outreach",
      description:
        "Craft strategic outreach emails to secure high-authority backlinks from target publications.",
    },
    implementation: [
      "Send a concise, personalized email Tuesday–Thursday between 8–11 AM referencing Jared's recent Forbes piece and offering an exclusive dataset plus interview; keep it under 100 words and follow up with new angle after 4 business days.",
      "Build rapport on LinkedIn by engaging his recent articles, then maintain quarterly check-ins with useful industry data or source referrals to become a trusted go-to for future stories.",
    ],
    rationale:
      "Jared's recent Forbes coverage (more than 30 citations over the past 2 months) shows strong focus and influence in financial technology and spend management topics. Offering exclusive, data-driven angles and a ready expert aligns with his reported preference for actionable, source-backed reporting. The concise, timely outreach and promise of unique assets follow proven outreach principles that increase response rates and editorial pickup. Third-party editorial coverage in Forbes carries more credibility than self-promotion, so providing exclusive data and expert access makes it easy for him to publish a high-value story quickly.",
  },
  {
    id: "op-co-how-to-build-business-credit",
    type: "Content Optimization",
    target: {
      kind: "url",
      label: "brex.com/journal/how-to-build-business-credit",
      href: "https://brex.com/journal/how-to-build-business-credit",
    },
    headline: "Enhance guide with structured how-to steps and rich FAQs",
    description:
      "Richly structured how-to content and FAQ schema align with what major referrers use, bridging content gaps and making the page machine-readable for citation.",
    currentPerformance: { status: "Citation Share", value: 0 },
  },
  {
    id: "op-cc-business-credit-card-matchmaker",
    type: "Content Creation",
    target: { kind: "topic", label: "'Business Credit Card'" },
    headline:
      "Unveil a dynamic card matchmaker guiding businesses to tailored credit card choices",
    description:
      "Personalized interactive content bridges gaps left by static lists, aligns with evolving user focus on tailored solutions, and increases chances for featured placements in AI-driven search results.",
    currentPerformance: { status: "Visibility Score", value: 61.4 },
  },
  {
    id: "op-reddit-startups",
    type: "Reddit",
    target: {
      kind: "subreddit",
      label: "reddit.com/r/startups/",
      href: "https://reddit.com/r/startups/",
    },
    headline:
      "Provide expert, transparent startup credit-card guidance in /r/startups thread to build authority and AI-citable expertise",
    description:
      "Offer actionable, data-driven answers that surpass generic blog lists; cite real interest rates, signup bonuses, and expense-management features to earn trust. Disclose any affiliations and include firsthand...",
    currentPerformance: { status: "Citation Share", value: 83.0 },
  },
];

// ────────────────────────────────────────────────────────────────────
// Overview — matches `_reference/profound/overview/screenshot.png`
// ────────────────────────────────────────────────────────────────────

export const overviewData: OverviewData = {
  workspace: { name: "Brex", site: "brex.com" },
  dateRange: { label: "Last 7 Days", preset: "last-7-days" },

  whatsNew: {
    title:
      "Brex Maintains Top AI Visibility Despite Slight Decline and Decreasing Citation Share",
    body: "Brex remains the leading brand in the corporate credit card category, with a visibility score of 78.5%, though it experienced a modest decrease of 1.3% from the previous period. While Brex now more than doubles a key benchmark for 'business credit card expensive generation' it is still business credit cards with no credit, its average daily citation share has also fallen slightly by 0.7%, continuing a downward trend. Brex is the most cited brand across business credit cards and content, reflecting ongoing strong topical relevance.",
    summarizedAt: "May 13, 12:46 AM",
  },

  visibilityScore: {
    current: 78.5,
    delta: -1.3,
    series: [
      { date: "May 6", value: 79.4 },
      { date: "May 7", value: 78.1 },
      { date: "May 8", value: 79.8 },
      { date: "May 9", value: 76.2 },
      { date: "May 10", value: 79.6 },
      { date: "May 11", value: 78.0 },
      { date: "May 12", value: 78.5 },
    ],
  },

  websiteActivity: {
    configured: false,
  },

  /* Deltas mirror the Profound capture (`_reference/profound/overview/screenshot.png`):
   * absolute count change vs prior period — not a percentage. */
  topKeywords: [
    { keyword: "acquisition news", promptVolume: 1_400, delta: 583 },
    { keyword: "business credit card", promptVolume: 19_600, delta: 4_200 },
    { keyword: "business credit cards", promptVolume: 5_800, delta: 682 },
    { keyword: "compliance risk", promptVolume: 58_100, delta: 6_200 },
    { keyword: "corporate card", promptVolume: 9_500, delta: 1_300 },
    { keyword: "corporate cards", promptVolume: 3_600, delta: -3_700 },
    { keyword: "employee cards", promptVolume: 2_900, delta: 2_000 },
    { keyword: "expense management", promptVolume: 10_900, delta: -1_300 },
  ],

  topOpportunities: opportunities.slice(0, 2),
};

// ────────────────────────────────────────────────────────────────────
// Number formatters used across the app — colocated so mocks and views
// stay consistent.
// ────────────────────────────────────────────────────────────────────

/** 19,600 → "19.6k"; 1,400 → "1.4k"; 58,100 → "58.1k"; 940 → "940". */
export function formatCompact(n: number): string {
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}m`;
  if (Math.abs(n) >= 1_000) {
    const v = n / 1_000;
    // Trim trailing .0
    return `${v.toFixed(1).replace(/\.0$/, "")}k`;
  }
  return n.toLocaleString();
}

/** Signed percentage with 1 decimal max, no trailing .0. */
export function formatPercentDelta(n: number): string {
  const sign = n > 0 ? "+" : "";
  const rounded = Math.round(n * 10) / 10;
  return `${sign}${rounded}%`;
}

/** Signed compact integer — e.g. 583 → "+583", -3_700 → "-3.7k", 4_200 → "+4.2k". */
export function formatSignedCompact(n: number): string {
  const sign = n > 0 ? "+" : n < 0 ? "-" : "";
  return `${sign}${formatCompact(Math.abs(n))}`;
}
