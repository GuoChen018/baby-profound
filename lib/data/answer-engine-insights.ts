/**
 * Answer Engine Insights mock data — Brex-themed.
 *
 * Modelled on `_reference/profound/answer-engine-insights/screenshot.png` and
 * `notes.md`. Numbers, sources, and competitor brands are illustrative —
 * never real customer data. Citations are pulled from real publishers known
 * to cover the fintech/business-credit space (forbes.com, wsj.com, etc.).
 */

import type { AnswerEngineInsightsData } from "@/lib/types/answer-engine-insights";

const dates = [
  "May 6",
  "May 7",
  "May 8",
  "May 9",
  "May 10",
  "May 11",
  "May 12",
];

export const answerEngineInsightsData: AnswerEngineInsightsData = {
  workspace: { name: "Brex", site: "brex.com" },

  filters: {
    dateRange: { id: "date-range", label: "Date Range", value: "Last 7 Days" },
    comparison: { id: "comparison", label: "Comparison", value: "Prev. Period" },
    granularity: { id: "granularity", label: "Granularity", value: "Daily" },
    topics: { id: "topics", label: "Topics", value: "Topics" },
    platforms: { id: "platforms", label: "Platform", value: "Platform" },
    region: { id: "region", label: "Region", value: "United States" },
    persona: { id: "persona", label: "Persona", value: "All personas" },
  },

  // ────────────────────────────────────────────────────────────────────
  // KPI strip — 4 tiles. Headline values mirror the Profound capture but
  // generalised so we don't ship real figures.
  // ────────────────────────────────────────────────────────────────────
  kpis: [
    {
      id: "visibility-score",
      label: "Visibility Score",
      value: "78.5%",
      delta: -1.3,
      hint: "How often Brex appears in AI answers",
      spark: dates.map((date, i) => ({
        date,
        value: [79.4, 78.1, 79.8, 76.2, 79.6, 78.0, 78.5][i],
      })),
    },
    {
      id: "share-of-voice",
      label: "Share of Voice",
      value: "11.1%",
      delta: -0.2,
      hint: "Mentions vs. competitors",
      spark: dates.map((date, i) => ({
        date,
        value: [11.6, 11.2, 11.4, 10.9, 11.3, 11.0, 11.1][i],
      })),
    },
    {
      id: "average-position",
      label: "Average Position",
      value: "#2.8",
      delta: 0.1,
      hint: "Rank when cited",
      spark: dates.map((date, i) => ({
        date,
        value: [2.7, 2.9, 2.8, 2.6, 2.8, 2.7, 2.8][i],
      })),
    },
    {
      id: "citation-share",
      label: "Citation Share",
      value: "18.2%",
      delta: 0.8,
      hint: "Share of cited sources",
      spark: dates.map((date, i) => ({
        date,
        value: [17.1, 17.4, 17.6, 18.0, 17.9, 18.1, 18.2][i],
      })),
    },
  ],

  // ────────────────────────────────────────────────────────────────────
  // Visibility chart — current period vs comparison + a couple of
  // competitors so the multi-line variant is exercised.
  // ────────────────────────────────────────────────────────────────────
  visibility: {
    headline: { value: "78.5%", delta: -1.3 },
    chart: {
      yUnit: "%",
      yTickFormat: "percent",
      series: [
        {
          id: "brex-current",
          label: "Brex (Current)",
          colorVar: "--workflow-blue",
          domain: "brex.com",
          data: dates.map((date, i) => ({
            date,
            value: [79.4, 78.1, 79.8, 76.2, 79.6, 78.0, 78.5][i],
          })),
        },
        {
          id: "brex-previous",
          label: "Brex (Previous)",
          colorVar: "--text-tertiary",
          dashed: true,
          domain: "brex.com",
          data: dates.map((date, i) => ({
            date,
            value: [80.6, 79.1, 79.4, 78.0, 80.1, 79.5, 79.8][i],
          })),
        },
        {
          id: "ramp",
          label: "Ramp",
          colorVar: "--workflow-purple",
          domain: "ramp.com",
          data: dates.map((date, i) => ({
            date,
            value: [16.8, 17.2, 17.0, 17.6, 17.1, 17.0, 17.1][i],
          })),
        },
        {
          id: "capital-one",
          label: "Capital One",
          colorVar: "--workflow-orange",
          domain: "capitalone.com",
          data: dates.map((date, i) => ({
            date,
            value: [33.5, 32.8, 33.2, 31.6, 32.4, 32.0, 32.4][i],
          })),
        },
      ],
    },
  },

  // ────────────────────────────────────────────────────────────────────
  // Platform breakdown — one series per AI engine. We render this as a
  // multi-line chart in the sandbox; in prod this would be a stacked bar.
  // ────────────────────────────────────────────────────────────────────
  platformBreakdown: {
    headline: { value: "78.5%", delta: -1.3 },
    chart: {
      yUnit: "%",
      yTickFormat: "percent",
      series: [
        {
          id: "chatgpt",
          label: "ChatGPT",
          colorVar: "--workflow-green",
          platform: "chatgpt",
          data: dates.map((date, i) => ({
            date,
            value: [82.1, 81.4, 83.0, 80.6, 82.8, 81.9, 82.4][i],
          })),
        },
        {
          id: "perplexity",
          label: "Perplexity",
          colorVar: "--workflow-blue",
          platform: "perplexity",
          data: dates.map((date, i) => ({
            date,
            value: [76.4, 75.9, 77.1, 73.8, 76.0, 75.6, 76.2][i],
          })),
        },
        {
          id: "google",
          label: "Google AI Overviews",
          colorVar: "--workflow-orange",
          platform: "google",
          data: dates.map((date, i) => ({
            date,
            value: [71.2, 70.9, 72.0, 69.4, 71.8, 70.6, 71.4][i],
          })),
        },
        {
          id: "copilot",
          label: "Microsoft Copilot",
          colorVar: "--workflow-purple",
          platform: "copilot",
          data: dates.map((date, i) => ({
            date,
            value: [68.5, 67.8, 69.2, 66.4, 68.0, 67.6, 68.1][i],
          })),
        },
      ],
    },
  },

  // ────────────────────────────────────────────────────────────────────
  // Share of Voice — donut + leaderboard.
  // ────────────────────────────────────────────────────────────────────
  shareOfVoice: {
    headline: { value: "11.1%", delta: -0.2 },
    segments: [
      { id: "brex", label: "Brex", share: 0.111, colorVar: "--workflow-purple", domain: "brex.com" },
      { id: "ramp", label: "Ramp", share: 0.108, colorVar: "--badge-red-emphasis", domain: "ramp.com" },
      { id: "capital-one", label: "Capital One", share: 0.072, colorVar: "--workflow-blue", domain: "capitalone.com" },
      { id: "amex", label: "American Express", share: 0.068, colorVar: "--fill-red", domain: "americanexpress.com" },
      { id: "chase", label: "Chase", share: 0.053, colorVar: "--workflow-orange", domain: "chase.com" },
      { id: "other", label: "Other", share: 0.588, colorVar: "--fill-tertiary" },
    ],
    leaderboard: [
      { id: "brex", asset: "Brex", isOwned: true, value: "11.1%", delta: -0.2, domain: "brex.com" },
      { id: "ramp", asset: "Ramp", value: "10.8%", delta: 0, domain: "ramp.com" },
      { id: "capital-one", asset: "Capital One", value: "7.2%", delta: 0.1, domain: "capitalone.com" },
      { id: "amex", asset: "American Express", value: "6.8%", delta: -0.3, domain: "americanexpress.com" },
      { id: "chase", asset: "Chase", value: "5.3%", delta: -0.1, domain: "chase.com" },
    ],
  },

  // ────────────────────────────────────────────────────────────────────
  // Citations table — fintech publishers that consistently surface in
  // AI-generated answers about corporate cards / spend management.
  // ────────────────────────────────────────────────────────────────────
  citations: [
    {
      id: "c-forbes",
      source: "forbes.com",
      href: "https://forbes.com/sites/advisor/business/credit-cards/best-business-credit-cards/",
      platform: "chatgpt",
      mentions: 412,
      share: 0.184,
      lastSeenAt: "May 12, 2026",
    },
    {
      id: "c-wsj",
      source: "wsj.com",
      href: "https://wsj.com/articles/corporate-card-startups-disrupt-amex",
      platform: "perplexity",
      mentions: 318,
      share: 0.142,
      lastSeenAt: "May 12, 2026",
    },
    {
      id: "c-nerdwallet",
      source: "nerdwallet.com",
      href: "https://nerdwallet.com/best/credit-cards/business/corporate",
      platform: "chatgpt",
      mentions: 287,
      share: 0.128,
      lastSeenAt: "May 11, 2026",
    },
    {
      id: "c-reddit-startups",
      source: "reddit.com/r/startups",
      href: "https://reddit.com/r/startups/comments/abcd/best_corporate_card",
      platform: "google",
      mentions: 234,
      share: 0.105,
      lastSeenAt: "May 11, 2026",
    },
    {
      id: "c-fintechfutures",
      source: "fintechfutures.com",
      href: "https://fintechfutures.com/2026/05/brex-cash-treasury-update",
      platform: "perplexity",
      mentions: 198,
      share: 0.089,
      lastSeenAt: "May 10, 2026",
    },
    {
      id: "c-techcrunch",
      source: "techcrunch.com",
      href: "https://techcrunch.com/2026/04/brex-pricing-changes",
      platform: "copilot",
      mentions: 176,
      share: 0.079,
      lastSeenAt: "May 10, 2026",
    },
    {
      id: "c-bloomberg",
      source: "bloomberg.com",
      href: "https://bloomberg.com/news/articles/corporate-card-market",
      platform: "anthropic",
      mentions: 144,
      share: 0.064,
      lastSeenAt: "May 9, 2026",
    },
    {
      id: "c-cnbc",
      source: "cnbc.com",
      href: "https://cnbc.com/2026/04/30/business-credit-cards-startups",
      platform: "google",
      mentions: 121,
      share: 0.054,
      lastSeenAt: "May 9, 2026",
    },
    {
      id: "c-thepointsguy",
      source: "thepointsguy.com",
      href: "https://thepointsguy.com/guide/best-business-credit-cards",
      platform: "chatgpt",
      mentions: 102,
      share: 0.046,
      lastSeenAt: "May 8, 2026",
    },
    {
      id: "c-bankrate",
      source: "bankrate.com",
      href: "https://bankrate.com/credit-cards/business/corporate-cards-comparison",
      platform: "perplexity",
      mentions: 88,
      share: 0.039,
      lastSeenAt: "May 8, 2026",
    },
  ],
};

/** Display label per platform — matches the Platform union from `lib/types`. */
export const platformLabels: Record<string, string> = {
  chatgpt: "ChatGPT",
  perplexity: "Perplexity",
  anthropic: "Claude",
  google: "Google",
  gemini: "Gemini",
  copilot: "Copilot",
  grok: "Grok",
  meta: "Meta AI",
};
