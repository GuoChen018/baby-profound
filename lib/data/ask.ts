/**
 * Ask tab mock data — Brex-themed.
 *
 * Pulled from `_reference/profound/ask/notes.md` (Ask + Build mode suggestion
 * lists) and synthesized to feel like a real Profound conversation about Brex
 * vs. competitors. Never real customer data.
 */

import type {
  AskPlatform,
  BuildAgentPreset,
  Citation,
  Conversation,
  PlatformChip,
  SuggestedPrompt,
} from "@/lib/types/ask";

// ────────────────────────────────────────────────────────────────────
// Platforms — brand color per answer engine. Used for citation avatars
// and the empty-state platform multi-select chip row.
// ────────────────────────────────────────────────────────────────────

export const platformChips: PlatformChip[] = [
  { id: "chatgpt", label: "ChatGPT" },
  { id: "perplexity", label: "Perplexity" },
  { id: "gemini", label: "Gemini" },
  { id: "anthropic", label: "Claude" },
  { id: "google-ai", label: "Google AI" },
  { id: "copilot", label: "Copilot" },
];

export const platformMeta: Record<
  AskPlatform,
  { label: string; short: string; bg: string; fg: string }
> = {
  chatgpt: { label: "ChatGPT", short: "G", bg: "#10A37F", fg: "#ffffff" },
  perplexity: { label: "Perplexity", short: "P", bg: "#1FB8CD", fg: "#0e2a33" },
  gemini: { label: "Gemini", short: "✦", bg: "#4285F4", fg: "#ffffff" },
  anthropic: { label: "Claude", short: "C", bg: "#CC785C", fg: "#ffffff" },
  "google-ai": { label: "Google AI", short: "AI", bg: "#1A73E8", fg: "#ffffff" },
  copilot: { label: "Copilot", short: "Co", bg: "#0078D4", fg: "#ffffff" },
};

// ────────────────────────────────────────────────────────────────────
// Suggested prompts — split by Ask vs. Build mode per Profound's spec.
// ────────────────────────────────────────────────────────────────────

export const askSuggestions: SuggestedPrompt[] = [
  {
    id: "ask-1",
    mode: "ask",
    label: "Good visibility benchmark",
    prompt: "What's a good visibility benchmark for Brex in the corporate cards category?",
  },
  {
    id: "ask-2",
    mode: "ask",
    label: "Negative sentiment drivers",
    prompt: "Which topics are driving negative sentiment toward Brex on AI answer engines?",
  },
  {
    id: "ask-3",
    mode: "ask",
    label: "Which AI engine to focus on",
    prompt: "Which AI engine should Brex prioritize next quarter — and why?",
  },
  {
    id: "ask-4",
    mode: "ask",
    label: "Citation opportunities",
    prompt: "Where are the biggest citation opportunities for Brex this month?",
  },
];

export const buildSuggestions: SuggestedPrompt[] = [
  { id: "build-1", mode: "build", label: "Engine prioritization agent" },
  { id: "build-2", mode: "build", label: "Score regression agent" },
  { id: "build-3", mode: "build", label: "Competitor watch agent" },
  { id: "build-4", mode: "build", label: "Weekly visibility report agent" },
];

/** Pill-shaped Brex-themed prompts surfaced above the composer. */
export const heroPromptChips: SuggestedPrompt[] = [
  {
    id: "hero-1",
    mode: "ask",
    label: "How is Brex performing on ChatGPT?",
  },
  {
    id: "hero-2",
    mode: "ask",
    label: "Which competitors gained mentions this week?",
  },
  {
    id: "hero-3",
    mode: "ask",
    label: "Compare Brex vs. Ramp on corporate cards",
  },
  {
    id: "hero-4",
    mode: "ask",
    label: "What topics are dragging our score down?",
  },
];

// ────────────────────────────────────────────────────────────────────
// Build mode wizard presets — pre-seeded from the suggestion list.
// ────────────────────────────────────────────────────────────────────

export const buildAgentPresets: Record<string, BuildAgentPreset> = {
  "build-1": {
    id: "build-1",
    name: "Engine prioritization agent",
    objective:
      "Rank the answer engines where Brex has the biggest visibility upside this month.",
    watches: ["ChatGPT", "Perplexity", "Google AI", "Gemini", "Claude"],
    cadence: "Weekly",
    accent: "purple",
  },
  "build-2": {
    id: "build-2",
    name: "Score regression agent",
    objective:
      "Watch for week-over-week drops greater than 5 points on the Brex visibility score.",
    watches: ["Aggregate score", "Per-engine score", "Per-topic score"],
    cadence: "Daily",
    accent: "red",
  },
  "build-3": {
    id: "build-3",
    name: "Competitor watch agent",
    objective:
      "Alert when Ramp, Amex, Mercury or Capital One overtake Brex on a tracked topic.",
    watches: ["Ramp", "Amex", "Mercury", "Capital One"],
    cadence: "Daily",
    accent: "amber",
  },
  "build-4": {
    id: "build-4",
    name: "Weekly visibility report agent",
    objective:
      "Compile a Monday digest summarizing Brex's visibility, citations and top movers.",
    watches: ["Visibility score", "Citation share", "Top movers", "Sentiment"],
    cadence: "Weekly",
    accent: "blue",
  },
};

// ────────────────────────────────────────────────────────────────────
// Active conversation — canned response for the demo.
// ────────────────────────────────────────────────────────────────────

const demoCitations: Citation[] = [
  {
    id: "cite-1",
    platform: "chatgpt",
    title: "Best corporate cards for startups in 2026",
    domain: "techcrunch.com",
    href: "https://techcrunch.com/best-corporate-cards-startups-2026",
    snippet:
      "Brex remains a leader for venture-backed teams thanks to higher limits and integrated AP.",
  },
  {
    id: "cite-2",
    platform: "perplexity",
    title: "Brex vs. Ramp: which corporate card wins?",
    domain: "nerdwallet.com",
    href: "https://nerdwallet.com/article/brex-vs-ramp",
    snippet:
      "Ramp wins on automated expense controls; Brex wins on rewards and global card issuance.",
  },
  {
    id: "cite-3",
    platform: "gemini",
    title: "Corporate card landscape 2026",
    domain: "forbes.com",
    href: "https://forbes.com/advisor/corporate-card-landscape",
    snippet:
      "ChatGPT now cites Ramp 23% more often than Brex on expense-management prompts.",
  },
  {
    id: "cite-4",
    platform: "anthropic",
    title: "Startup credit cards explained",
    domain: "ycombinator.com",
    href: "https://ycombinator.com/library/startup-credit-cards",
  },
];

/**
 * Pre-baked conversation used when the user submits in Ask mode.
 * The user message + thinking duration are filled in at send time.
 */
export const demoAssistantResponse = {
  thinkingDurationMs: 8000,
  blocks: [
    {
      type: "paragraph" as const,
      text:
        "Looking at the last 28 days across Brex's tracked topics on ChatGPT, Perplexity, Gemini, Google AI, and Claude — your aggregate score sits in the **mid-60s** while Ramp clears 70 on the same prompt set. The gap is concentrated on three topics: **Expense Management, Spend Controls, and Mid-Market Onboarding**.",
    },
    {
      type: "paragraph" as const,
      text:
        "Here's what I'd dig into next if you want to close that delta:",
    },
    {
      type: "list" as const,
      items: [
        {
          lead: "Current state snapshot",
          body:
            "Brex's citation share is 18% on ChatGPT vs. Ramp at 24%. Visibility is roughly even on Perplexity. The biggest delta is on Google AI where Ramp leads by 11 points.",
        },
        {
          lead: "Gap analysis by topic",
          body:
            "Corporate Card and Startup Banking are healthy. Expense Management and Spend Controls are losing share-of-voice — both topics where Ramp publishes weekly technical content.",
        },
        {
          lead: "Platform breakdown",
          body:
            "ChatGPT and Google AI are the weakest engines for Brex this period. Perplexity and Claude are strong. Gemini is improving week-over-week — keep watching.",
        },
        {
          lead: "Citation analysis",
          body:
            "TechCrunch, NerdWallet, and YC's library account for 41% of Brex's pickups. Forbes Advisor is over-indexing Ramp 2.4× on expense-management prompts — likely the highest-ROI placement to chase.",
        },
      ],
    },
  ],
  citations: demoCitations,
};

export const emptyConversation: Conversation = {
  id: "untitled",
  title: "Untitled chat",
  mode: "ask",
  messages: [],
};
