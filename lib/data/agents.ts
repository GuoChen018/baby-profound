/**
 * Agents tab — mock data.
 *
 * Brex-themed templates and agents modelled on the Profound capture in
 * `_reference/profound/agents/screenshot.png`. Numbers/timestamps are
 * illustrative; nothing here is real customer data.
 */

import type { Agent, AgentTemplate } from "@/lib/types/agents";

const guo = { name: "Guo Chen" };
const ramya = { name: "Ramya Patel" };
const dmitri = { name: "Dmitri Volkov" };

export const agentTemplates: AgentTemplate[] = [
  {
    id: "tpl-starter",
    name: "Starter Template",
    description:
      "Blank canvas with a Start node and a Prompt LLM node — the fastest way to learn the editor.",
    brand: "profound",
  },
  {
    id: "tpl-aeo-faq",
    name: "AEO-Optimized FAQ Generator",
    description:
      "Pulls top queries from Answer Engine Insights and drafts a 12-15 question FAQ block ready for schema markup.",
    brand: "google",
  },
  {
    id: "tpl-content-optimization",
    name: "Content Optimization Audit",
    description:
      "Audits an existing brex.com page against AI-search best practices and recommends structural rewrites.",
    brand: "profound",
  },
  {
    id: "tpl-content-brief",
    name: "Content Brief Creation",
    description:
      "Synthesizes prompt responses + cited domains into a target page outline a writer can hand off.",
    brand: "profound",
  },
  {
    id: "tpl-aeo-seo-research",
    name: "AEO + SEO Research Report",
    description:
      "Runs parallel deep research across answer engines and SERPs to produce a head-to-head visibility report.",
    brand: "perplexity",
  },
  {
    id: "tpl-blog-from-topic",
    name: "Generate Blog Post From Topic",
    description:
      "Takes a topic and turns it into a publish-ready brex.com/journal draft with internal links and CTAs.",
    brand: "youtube",
  },
  {
    id: "tpl-reddit-insights",
    name: "Reddit Insights Generator",
    description:
      "Mines r/smallbusiness, r/startups and r/personalfinance for unmet questions about corporate cards.",
    brand: "reddit",
  },
  {
    id: "tpl-weekly-brand-health",
    name: "Weekly Brand Health Report",
    description:
      "Weekly digest comparing Brex's AI visibility, citation share, and competitor mentions across engines.",
    brand: "profound",
  },
];

export const agents: Agent[] = [
  {
    id: "ag-business-credit-card-aeo-asset-builder",
    name: "Business Credit Card AEO Asset Builder",
    description:
      "One-off workflow that produces AEO-optimized content assets for brex.com targeting broad 'business credit card' queries. Pulls query fanout, recent Profound prompt responses, and top cited domains for the Business Credit Card topic, generates a Profound content brief, then drafts a target page recommendation, AEO page outline, 10-15 FAQ entries, and an AEO checklist designed to lift Brex visibility in AI answer engines.",
    status: "Published",
    createdBy: guo,
    lastModifiedAt: "2026-05-12T20:32:00Z",
    lastRunAt: "2026-05-13T01:14:00Z",
    estimatedUsage: 17,
    brand: "profound",
    inputs: [
      {
        name: "Primary Prompt",
        type: "string",
        required: true,
        placeholder: "Enter the value",
        hint: "The seed query the workflow expands into a target page brief.",
      },
    ],
    outputs: [
      { name: "Query Fanout", type: "json" },
      { name: "Prompt Responses", type: "json" },
      { name: "Citation Domains", type: "array" },
      { name: "Content Brief", type: "json" },
      { name: "Page Outline", type: "string" },
      { name: "FAQ Entries", type: "array" },
      { name: "AEO Checklist", type: "array" },
      { name: "Target Page Recommendation", type: "string" },
      { name: "Run Summary", type: "string" },
    ],
  },
  {
    id: "ag-untitled-agent",
    name: "Untitled Agent",
    description:
      "Scratch agent in progress — no description yet. Drafted from a blank canvas.",
    status: "Unpublished",
    createdBy: guo,
    lastModifiedAt: "2026-05-12T20:30:00Z",
    estimatedUsage: 4,
    brand: "profound",
    inputs: [
      { name: "Topic", type: "string", required: true, placeholder: "Enter a topic" },
    ],
    outputs: [{ name: "LLM Response", type: "string" }],
  },
  {
    id: "ag-aeo-article-optimizer",
    name: "AEO Article Optimizer",
    description:
      "Rewrites an existing brex.com/journal article for AI-answer-engine retrieval — adds H2/H3 structure, FAQ schema, and entity-rich anchor text.",
    status: "Unpublished",
    createdBy: ramya,
    lastModifiedAt: "2026-05-12T03:30:00Z",
    estimatedUsage: 12,
    brand: "profound",
    inputs: [
      { name: "Article URL", type: "string", required: true, placeholder: "https://brex.com/journal/..." },
      { name: "Target keyword", type: "string", required: false, placeholder: "e.g. corporate card limits" },
    ],
    outputs: [
      { name: "Rewritten outline", type: "string" },
      { name: "FAQ block", type: "array" },
      { name: "Anchor link suggestions", type: "array" },
    ],
  },
  {
    id: "ag-competitor-mention-scan",
    name: "Daily Competitor Mention Scan",
    description:
      "Tracks how often Ramp, Mercury, and Rho appear alongside Brex in ChatGPT, Perplexity, and Gemini answers — flags net-new competitors weekly.",
    status: "Published",
    createdBy: dmitri,
    lastModifiedAt: "2026-05-11T15:12:00Z",
    lastRunAt: "2026-05-13T05:00:00Z",
    estimatedUsage: 24,
    brand: "perplexity",
    inputs: [
      { name: "Competitor list", type: "array", required: true, placeholder: "Comma-separated brands" },
    ],
    outputs: [
      { name: "Mention counts", type: "json" },
      { name: "Co-mention pairs", type: "array" },
      { name: "Net-new competitors", type: "array" },
    ],
  },
  {
    id: "ag-reddit-sentiment-tracker",
    name: "Reddit Sentiment Tracker",
    description:
      "Pulls weekly mentions of Brex from r/smallbusiness and r/startups, scores sentiment, and clusters complaints into themes.",
    status: "Published",
    createdBy: ramya,
    lastModifiedAt: "2026-05-10T18:48:00Z",
    lastRunAt: "2026-05-12T18:00:00Z",
    estimatedUsage: 18,
    brand: "reddit",
    inputs: [
      { name: "Subreddits", type: "array", required: true, placeholder: "r/smallbusiness, r/startups" },
      { name: "Lookback days", type: "number", required: false, placeholder: "7" },
    ],
    outputs: [
      { name: "Sentiment by post", type: "json" },
      { name: "Theme clusters", type: "array" },
      { name: "Top complaints", type: "array" },
    ],
  },
  {
    id: "ag-weekly-content-gap",
    name: "Weekly Content Gap Analysis",
    description:
      "Compares brex.com coverage against Ramp and Mercury for the top 50 'business banking' queries and lists pages we're missing.",
    status: "Draft",
    createdBy: guo,
    lastModifiedAt: "2026-05-09T11:05:00Z",
    estimatedUsage: 31,
    brand: "blog",
    inputs: [
      { name: "Topic cluster", type: "string", required: true, placeholder: "e.g. corporate card rewards" },
    ],
    outputs: [
      { name: "Coverage matrix", type: "json" },
      { name: "Missing pages", type: "array" },
    ],
  },
];

/** Lookup helper used by both the run page and the editor placeholder. */
export function getAgentById(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}

/**
 * Lightweight relative-time formatter — keeps everything theming-agnostic
 * and avoids pulling in a date lib for a sandbox.
 */
export function formatRelativeTime(iso: string, now: Date = new Date("2026-05-13T06:30:00Z")): string {
  const then = new Date(iso).getTime();
  const diffMs = now.getTime() - then;
  const seconds = Math.max(1, Math.round(diffMs / 1000));
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  if (days === 1) return `1 day ago`;
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  return `${months} month${months === 1 ? "" : "s"} ago`;
}
