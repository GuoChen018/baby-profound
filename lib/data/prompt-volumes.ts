/**
 * Prompt Volumes mock data — Brex-themed.
 *
 * Modelled on `_reference/profound/prompt-volumes/screenshot.png`. Numbers,
 * dates, and prompt strings are illustrative — never real customer data.
 */

import type { PromptVolumesData } from "@/lib/types/prompt-volumes";

export const promptVolumesData: PromptVolumesData = {
  domain: "brex.com",

  filters: [
    { id: "date-range", label: "Date range", value: "Last 28 Days" },
    { id: "comparison", label: "Comparison", value: "Previous period" },
    { id: "region", label: "Region", value: "United States" },
    { id: "persona", label: "Persona", value: "All personas" },
    { id: "platform", label: "Platform", value: "All platforms" },
  ],

  seedPrompts: [
    { id: "seed-1", text: "corporate credit card no personal guarantee" },
    { id: "seed-2", text: "best business credit card for startups" },
    { id: "seed-3", text: "how does Brex Cash work" },
  ],

  // Aggregate keyword view — the table beneath the composer.
  // Citation rate ~ share of prompts that cite the tracked domain.
  keywords: [
    {
      id: "kw-1",
      keyword: "corporate credit card no personal guarantee",
      monthlyVolume: 19_600,
      citationRate: 0.612,
      opportunityScore: 92,
      lastSeenAt: "2026-05-12",
    },
    {
      id: "kw-2",
      keyword: "best business credit card for startups",
      monthlyVolume: 14_300,
      citationRate: 0.541,
      opportunityScore: 88,
      lastSeenAt: "2026-05-12",
    },
    {
      id: "kw-3",
      keyword: "brex cash account interest rate",
      monthlyVolume: 9_500,
      citationRate: 0.731,
      opportunityScore: 81,
      lastSeenAt: "2026-05-11",
    },
    {
      id: "kw-4",
      keyword: "expense management software comparison",
      monthlyVolume: 10_900,
      citationRate: 0.295,
      opportunityScore: 76,
      lastSeenAt: "2026-05-10",
    },
    {
      id: "kw-5",
      keyword: "high limit business credit card",
      monthlyVolume: 7_400,
      citationRate: 0.482,
      opportunityScore: 68,
      lastSeenAt: "2026-05-09",
    },
    {
      id: "kw-6",
      keyword: "0 apr business credit card",
      monthlyVolume: 5_800,
      citationRate: 0.213,
      opportunityScore: 55,
      lastSeenAt: "2026-05-09",
    },
    {
      id: "kw-7",
      keyword: "business bank account no monthly fees",
      monthlyVolume: 4_200,
      citationRate: 0.408,
      opportunityScore: 49,
      lastSeenAt: "2026-05-08",
    },
    {
      id: "kw-8",
      keyword: "spend management saas pricing",
      monthlyVolume: 3_600,
      citationRate: 0.367,
      opportunityScore: 42,
      lastSeenAt: "2026-05-07",
    },
  ],

  citingPages: [
    {
      id: "page-easiest-bcc",
      path: "/spend-trends/corporate-credit-cards/easiest-business-credit-cards-to-get",
      promptCount: 29,
      prompts: [
        {
          id: "p1",
          text: "What is the best credit card for my farm LLC with $100k in annual gross revenue?",
          citedPlatforms: ["chatgpt", "perplexity", "google"],
          askedAt: "2026-04-15",
        },
        {
          id: "p2",
          text: "I need a small business credit card with a low limit for my dropshipping orders.",
          citedPlatforms: ["chatgpt", "perplexity", "anthropic"],
          askedAt: "2026-03-22",
        },
        {
          id: "p3",
          text: "What credit card can I get with a $650 credit limit and a high credit line?",
          citedPlatforms: ["chatgpt", "google", "gemini", "copilot"],
          askedAt: "2026-03-02",
        },
        {
          id: "p4",
          text: "What are the best business or personal credit cards with high limits and approval chances for a 650 credit score, and personal loans?",
          citedPlatforms: ["chatgpt", "perplexity", "google", "gemini", "anthropic", "copilot"],
          askedAt: "2026-02-26",
        },
        {
          id: "p5",
          text: "Can you research new or trending corporate cards?",
          citedPlatforms: ["chatgpt", "perplexity", "anthropic"],
          askedAt: "2026-02-21",
        },
      ],
    },
    {
      id: "page-business-account",
      path: "/product/business-account",
      promptCount: 27,
      prompts: [
        {
          id: "p6",
          text: "Does Brex offer a free business checking account with FDIC coverage?",
          citedPlatforms: ["chatgpt", "perplexity"],
          askedAt: "2026-04-09",
        },
        {
          id: "p7",
          text: "How long does it take to open a Brex business account?",
          citedPlatforms: ["chatgpt", "google", "gemini"],
          askedAt: "2026-04-02",
        },
      ],
    },
    {
      id: "page-account-requirements",
      path: "/support/brex-account-requirements",
      promptCount: 22,
      prompts: [
        {
          id: "p8",
          text: "What are the eligibility requirements to open a Brex account as a sole proprietor?",
          citedPlatforms: ["chatgpt", "perplexity", "anthropic"],
          askedAt: "2026-04-04",
        },
      ],
    },
    {
      id: "page-credit-card",
      path: "/product/credit-card",
      promptCount: 19,
      prompts: [
        {
          id: "p9",
          text: "Compare Brex vs Ramp corporate cards for a Series A startup.",
          citedPlatforms: ["chatgpt", "perplexity", "google"],
          askedAt: "2026-03-30",
        },
      ],
    },
    {
      id: "page-home",
      path: "/",
      promptCount: 18,
      prompts: [
        {
          id: "p10",
          text: "What products does Brex offer for early stage startups?",
          citedPlatforms: ["chatgpt", "perplexity", "anthropic", "google"],
          askedAt: "2026-03-28",
        },
      ],
    },
    {
      id: "page-high-limit",
      path: "/spend-trends/corporate-credit-cards/high-limit-business-credit-cards",
      promptCount: 17,
      prompts: [
        {
          id: "p11",
          text: "Which business credit card has the highest credit limit for tech startups?",
          citedPlatforms: ["chatgpt", "perplexity", "google"],
          askedAt: "2026-03-19",
        },
      ],
    },
    {
      id: "page-0-apr",
      path: "/spend-trends/corporate-credit-cards/0-apr-business-credit-cards",
      promptCount: 15,
      prompts: [
        {
          id: "p12",
          text: "Are there 0% APR business credit cards with no annual fee?",
          citedPlatforms: ["chatgpt", "google", "gemini"],
          askedAt: "2026-03-12",
        },
      ],
    },
    {
      id: "page-no-fees",
      path: "/spend-trends/business-banking/business-bank-accounts-with-no-fees",
      promptCount: 15,
      prompts: [
        {
          id: "p13",
          text: "Best business bank accounts with no monthly fees and free wire transfers.",
          citedPlatforms: ["chatgpt", "perplexity"],
          askedAt: "2026-03-08",
        },
      ],
    },
    {
      id: "page-best-ad-spend",
      path: "/spend-trends/corporate-credit-cards/best-business-credit-cards-for-ad-spend",
      promptCount: 14,
      prompts: [
        {
          id: "p14",
          text: "Which business credit card gives the best rewards on Google Ads spend?",
          citedPlatforms: ["chatgpt", "perplexity", "google"],
          askedAt: "2026-03-04",
        },
      ],
    },
    {
      id: "page-build-credit",
      path: "/spend-trends/corporate-credit-cards/how-to-build-business-credit-without-using-personal-credit",
      promptCount: 13,
      prompts: [
        {
          id: "p15",
          text: "How can I build business credit without using my personal credit?",
          citedPlatforms: ["chatgpt", "perplexity", "anthropic", "google"],
          askedAt: "2026-02-28",
        },
      ],
    },
  ],

  pagination: { page: 1, pageSize: 10, total: 348 },
};

// ────────────────────────────────────────────────────────────────────
// Local formatters — colocated so this tab's data and UI stay aligned.
// ────────────────────────────────────────────────────────────────────

/** "2026-04-15" → "15 Apr, 2026" (matches the live screenshot's Date Asked). */
export function formatDateAsked(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const day = d.getUTCDate().toString().padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  const year = d.getUTCFullYear();
  return `${day} ${month}, ${year}`;
}

/** 0.612 → "61.2%" (no trailing .0). */
export function formatPercent(n: number): string {
  const pct = n * 100;
  const rounded = Math.round(pct * 10) / 10;
  return `${rounded.toString().replace(/\.0$/, "")}%`;
}
