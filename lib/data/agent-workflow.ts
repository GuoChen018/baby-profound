/**
 * Agent editor — mock workflows + node palette catalog.
 *
 * One full workflow is modelled — the Brex-themed "Business Credit Card
 * AEO Asset Builder" — and every other agent falls back to a 2-node
 * Start → End placeholder so the editor route still resolves.
 *
 * Coordinates are tuned for a 920px-wide canvas with ~360px node cards
 * centered horizontally (cardLeft = 280) and 160px row spacing.
 */

import type {
  PaletteCategory,
  Workflow,
} from "@/lib/types/agent-workflow";

const COL_X = 60;
const ROW_GAP = 160;

/* ---------------------------- Featured workflow ---------------------------- */

export const businessCreditCardWorkflow: Workflow = {
  inputs: [
    {
      id: "in-primary-prompt",
      name: "Primary Prompt",
      type: "string",
      required: true,
    },
  ],
  nodes: [
    {
      id: "n-start",
      kind: "start",
      category: "control",
      title: "Start",
      x: COL_X,
      y: 40,
    },
    {
      id: "n-forecast",
      kind: "forecast-related-queries",
      category: "ai",
      title: "Forecast Related Queries for Business Credit Card",
      output: { name: "Query Fanout Estimator Output", type: "json" },
      x: COL_X,
      y: 40 + ROW_GAP * 1,
    },
    {
      id: "n-pull-responses",
      kind: "pull-prompt-responses",
      category: "research",
      title: "Pull Prompt Responses for Business Credit Card",
      output: { name: "Prompt Responses", type: "json" },
      x: COL_X,
      y: 40 + ROW_GAP * 2,
    },
    {
      id: "n-cited-domains",
      kind: "top-cited-domains",
      category: "research",
      title: "Top Cited Domains on Business Credit Card",
      output: { name: "Citation Domains", type: "array" },
      x: COL_X,
      y: 40 + ROW_GAP * 3,
    },
    {
      id: "n-synth",
      kind: "synthesize-insights",
      category: "ai",
      title: "Synthesize Insights for Business Credit Card",
      output: { name: "Synthesized Insights", type: "string" },
      x: COL_X,
      y: 40 + ROW_GAP * 4,
    },
    {
      id: "n-brief",
      kind: "create-content-brief",
      category: "ai",
      title: "Create AEO Content Brief",
      output: { name: "Create Content Brief Output", type: "json" },
      x: COL_X,
      y: 40 + ROW_GAP * 5,
    },
    {
      id: "n-faq",
      kind: "generate-faq-drafts",
      category: "ai",
      title: "Generate FAQ Drafts and AEO Checklist",
      output: { name: "LLM Response", type: "string" },
      x: COL_X,
      y: 40 + ROW_GAP * 6,
    },
    {
      id: "n-end",
      kind: "end",
      category: "control",
      title: "End",
      x: COL_X,
      y: 40 + ROW_GAP * 7,
    },
  ],
  edges: [
    { id: "e-start-forecast", from: "n-start", to: "n-forecast" },
    { id: "e-forecast-pull", from: "n-forecast", to: "n-pull-responses" },
    { id: "e-pull-cited", from: "n-pull-responses", to: "n-cited-domains" },
    { id: "e-cited-synth", from: "n-cited-domains", to: "n-synth" },
    { id: "e-synth-brief", from: "n-synth", to: "n-brief" },
    { id: "e-brief-faq", from: "n-brief", to: "n-faq" },
    { id: "e-faq-end", from: "n-faq", to: "n-end" },
  ],
};

/* ---------------------- Ramp Launch Watch workflow ------------------------- */

/**
 * The AI-drafted workflow that backs `ag-ramp-launch-watch`. Five
 * stages (plus Start/End) — one per implementation step on the
 * opportunity detail page, so a marketer reading the brief in
 * `/opportunities/op-agent-competitor-response` and then opening the
 * agent in the editor sees the SAME shape they just read about.
 *
 * Inputs match the agent record: contested topics array, Slack
 * channel, optional battle card URL. The workflow itself is purely
 * presentational here — these node kinds reuse existing palette
 * categories (research / ai / integration) so no new node types are
 * needed.
 */
export const rampLaunchWatchWorkflow: Workflow = {
  inputs: [
    {
      id: "in-contested-topics",
      name: "Contested topics",
      type: "array",
      required: true,
    },
    {
      id: "in-slack-channel",
      name: "Slack channel",
      type: "string",
      required: true,
    },
    {
      id: "in-battle-card-url",
      name: "Battle card URL",
      type: "string",
      required: false,
    },
  ],
  nodes: [
    {
      id: "n-start",
      kind: "start",
      category: "control",
      title: "Start",
      x: COL_X,
      y: 40,
    },
    {
      id: "n-sitemap",
      kind: "get-sitemap",
      category: "research",
      title: "Diff Ramp Marketing Sitemap (6h cadence)",
      output: { name: "New Pages", type: "json" },
      x: COL_X,
      y: 40 + ROW_GAP * 1,
    },
    {
      id: "n-match-topic",
      kind: "prompt-llm",
      category: "ai",
      title: "Match Page to Contested Topic List",
      output: { name: "Matched Topic", type: "string" },
      x: COL_X,
      y: 40 + ROW_GAP * 2,
    },
    {
      id: "n-draft-brief",
      kind: "create-content-brief",
      category: "ai",
      title: "Draft Brex Response Brief",
      output: { name: "Brex Response Brief", type: "string" },
      x: COL_X,
      y: 40 + ROW_GAP * 3,
    },
    {
      id: "n-slack",
      kind: "code",
      category: "integration",
      title: "Post Slack Alert with URL + Topic + Citation Share",
      output: { name: "Slack Message ID", type: "string" },
      x: COL_X,
      y: 40 + ROW_GAP * 4,
    },
    {
      id: "n-battle-card",
      kind: "code",
      category: "integration",
      title: "Append Row to Brex/Ramp Battle Card",
      output: { name: "Battle Card Update", type: "string" },
      x: COL_X,
      y: 40 + ROW_GAP * 5,
    },
    {
      id: "n-end",
      kind: "end",
      category: "control",
      title: "End",
      x: COL_X,
      y: 40 + ROW_GAP * 6,
    },
  ],
  edges: [
    { id: "e-start-sitemap", from: "n-start", to: "n-sitemap" },
    { id: "e-sitemap-match", from: "n-sitemap", to: "n-match-topic" },
    { id: "e-match-draft", from: "n-match-topic", to: "n-draft-brief" },
    { id: "e-draft-slack", from: "n-draft-brief", to: "n-slack" },
    { id: "e-slack-battle", from: "n-slack", to: "n-battle-card" },
    { id: "e-battle-end", from: "n-battle-card", to: "n-end" },
  ],
};

const blankWorkflow: Workflow = {
  inputs: [
    {
      id: "in-topic",
      name: "Topic",
      type: "string",
      required: true,
    },
  ],
  nodes: [
    {
      id: "n-start",
      kind: "start",
      category: "control",
      title: "Start",
      x: COL_X,
      y: 40,
    },
    {
      id: "n-prompt",
      kind: "prompt-llm",
      category: "ai",
      title: "Prompt LLM",
      output: { name: "LLM Response", type: "string" },
      x: COL_X,
      y: 40 + ROW_GAP,
    },
    {
      id: "n-end",
      kind: "end",
      category: "control",
      title: "End",
      x: COL_X,
      y: 40 + ROW_GAP * 2,
    },
  ],
  edges: [
    { id: "e-start-prompt", from: "n-start", to: "n-prompt" },
    { id: "e-prompt-end", from: "n-prompt", to: "n-end" },
  ],
};

export function getWorkflowForAgent(agentId: string): Workflow {
  if (agentId === "ag-business-credit-card-aeo-asset-builder") {
    return businessCreditCardWorkflow;
  }
  if (agentId === "ag-ramp-launch-watch") {
    return rampLaunchWatchWorkflow;
  }
  return blankWorkflow;
}

/* ----------------------------- Palette catalog ----------------------------- */

export const paletteCategories: PaletteCategory[] = [
  {
    id: "logic",
    title: "Logic",
    nodes: [
      { kind: "conditional", title: "Conditional" },
      { kind: "iteration", title: "Iteration" },
    ],
  },
  {
    id: "ai",
    title: "AI",
    nodes: [{ kind: "prompt-llm", title: "Prompt LLM" }],
  },
  {
    id: "research",
    title: "Web Research",
    nodes: [
      { kind: "get-sitemap", title: "Get Sitemap" },
      { kind: "web-page-scrape", title: "Web Page Scrape" },
      { kind: "parallel-deep-research", title: "Parallel Deep Research" },
      { kind: "parallel-web-search", title: "Parallel Web Search" },
      { kind: "perplexity-search", title: "Perplexity Search", brand: "perplexity" },
      { kind: "google-search", title: "Google Search", brand: "google" },
      { kind: "exa", title: "Exa", brand: "exa" },
    ],
  },
  {
    id: "code",
    title: "Code",
    nodes: [
      { kind: "call-api", title: "Call API" },
      { kind: "code", title: "Code" },
    ],
  },
  {
    id: "integration",
    title: "Integrations",
    nodes: [
      { kind: "code", title: "Slack", hasSubmenu: true },
      { kind: "code", title: "Linear", hasSubmenu: true },
      { kind: "code", title: "Notion", hasSubmenu: true },
    ],
  },
];
