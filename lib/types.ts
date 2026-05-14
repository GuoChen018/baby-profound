/**
 * Shared types. Data shapes mirror what was observed in
 * `_reference/profound/<slug>/notes.md`.
 *
 * Genericized — never tied to real customer values.
 */

// ────────────────────────────────────────────────────────────────────
// Common
// ────────────────────────────────────────────────────────────────────

export type DateRangePreset =
  | "last-7-days"
  | "last-28-days"
  | "last-90-days"
  | "last-year"
  | "custom";

/** Signed percentage delta — positive = up, negative = down. */
export type SignedPercent = number;

/** Signed absolute count delta — same sign semantics as SignedPercent. */
export type SignedCount = number;

export type SeriesPoint = { date: string; value: number };

export type Platform =
  | "chatgpt"
  | "perplexity"
  | "anthropic"
  | "google"
  | "gemini"
  | "copilot"
  | "grok"
  | "meta";

// ────────────────────────────────────────────────────────────────────
// Overview
// ────────────────────────────────────────────────────────────────────

export type WhatsNew = {
  title: string;
  body: string;
  summarizedAt: string;
};

export type VisibilityScore = {
  current: number;
  delta: SignedPercent;
  series: SeriesPoint[];
};

export type WebsiteActivity = {
  configured: boolean;
  site?: string;
  series?: SeriesPoint[];
};

export type Keyword = {
  keyword: string;
  promptVolume: number;
  /** Count delta vs prior period (e.g. +583, -3700). */
  delta: SignedCount;
};

export type OverviewData = {
  workspace: { name: string; site: string };
  dateRange: { label: string; preset: DateRangePreset };
  whatsNew: WhatsNew;
  visibilityScore: VisibilityScore;
  websiteActivity: WebsiteActivity;
  topKeywords: Keyword[];
  topOpportunities: Opportunity[];
};

// ────────────────────────────────────────────────────────────────────
// Opportunities (also referenced by Overview "Top Opportunities")
// ────────────────────────────────────────────────────────────────────

export type OpportunityType =
  | "Outreach"
  | "Content Optimization"
  | "Content Creation"
  | "Reddit"
  | "LinkedIn"
  // Agent opportunities surface "create this automation" calls to
  // action — e.g. "set up a competitor-launch monitor that drafts a
  // response brief, posts a Slack alert, and updates the battle
  // card". The detail page (`op-agent-competitor-response`) walks
  // through what the agent would output.
  | "Agent";

export type OpportunityTarget =
  | { kind: "person"; label: string; avatar?: string }
  | { kind: "url"; label: string; href: string }
  | { kind: "topic"; label: string }
  | { kind: "subreddit"; label: string; href: string };

export type CurrentPerformance =
  | { status: "Not Mentioned" }
  | { status: "Citation Share"; value: number }
  | { status: "Visibility Score"; value: number };

export type Opportunity = {
  id: string;
  type: OpportunityType;
  target: OpportunityTarget;
  headline: string;
  description: string;
  currentPerformance: CurrentPerformance;
  /** Detail-only fields. Optional on list view. */
  actionCard?: {
    type: string;
    description: string;
    /**
     * Where the action card deep-links. In production this would
     * route to the relevant tool (Content → editor, Agent → editor,
     * Outreach → CRM, etc.). Here we wire it to a real in-app page
     * so the prototype reads as a closed-loop flow rather than a
     * dead-end card.
     */
    href?: string;
  };
  implementation?: string[];
  rationale?: string;
};
