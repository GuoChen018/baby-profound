/**
 * Content tab — mock data.
 *
 * Brex/fintech-themed projects modelled on `_reference/profound/content/`.
 * Two of these (the first two) match the projects shown in the overview
 * capture; the rest are made up to fill out the table.
 *
 * One entry — the Highest Rated Business Credit Cards guide — has a fully
 * fleshed-out `body` so the detail view (`/content/[id]`) has something
 * substantive to render. The rest reuse a placeholder body.
 */

import type {
  ArticleBody,
  ArticleHeading,
  ContentDetail,
  ContentMetadata,
  ContentProject,
} from "@/lib/types/content";

// ────────────────────────────────────────────────────────────────────
// Projects — what the overview table renders.
// ────────────────────────────────────────────────────────────────────

export const contentProjects: ContentProject[] = [
  {
    // Surfaced from the AEO Overview "Agent for review" rail (see
    // `lib/data/agent-reviews.ts`). The Reddit Sentiment Tracker agent
    // produces draft replies to detected threads; humans review here.
    id: "reddit-reply-startups-best-corporate-card",
    title:
      "Reply for r/startups · \u2018Best corporate card for early-stage startups?\u2019",
    status: "Draft",
    template: "Social Reply",
    workflow: "generation",
    citedPlatforms: [],
    updatedLabel: "2h ago",
    updatedAt: "2026-05-14T13:00:00Z",
    owner: { name: "Reddit Sentiment Tracker", initials: "RS" },
  },
  {
    id: "highest-rated-business-credit-cards",
    title:
      "Financial Experts' Definitive Guide to the Highest Rated Business Credit Cards",
    status: "Completed",
    template: "Blog Post",
    workflow: "generation",
    citedPlatforms: ["chatgpt", "perplexity", "gemini", "copilot", "grok"],
    updatedLabel: "1 month ago",
    updatedAt: "2026-04-12T18:42:00Z",
    owner: { name: "Priya Shah", initials: "PS" },
  },
  {
    id: "top-7-sign-up-bonuses-2026",
    title: "Top 7 Business Credit Cards With Highest Sign-Up Bonuses 2026",
    status: "Completed",
    template: "Blog Post",
    workflow: "generation",
    citedPlatforms: ["chatgpt", "perplexity", "gemini"],
    updatedLabel: "1 month ago",
    updatedAt: "2026-04-08T09:11:00Z",
    owner: { name: "Marcus Holloway", initials: "MH" },
  },
  {
    id: "complete-guide-corporate-credit-cards",
    title: "Build a complete guide to corporate credit cards",
    status: "Draft",
    template: "Guide",
    workflow: "generation",
    citedPlatforms: [],
    updatedLabel: "3 days ago",
    updatedAt: "2026-05-10T15:08:00Z",
    owner: { name: "Priya Shah", initials: "PS" },
  },
  {
    id: "compare-brex-vs-ramp",
    title: "Compare Brex vs Ramp: spend management for fast-growing teams",
    status: "Draft",
    template: "Comparison",
    workflow: "generation",
    citedPlatforms: ["chatgpt", "perplexity"],
    updatedLabel: "5 days ago",
    updatedAt: "2026-05-08T22:47:00Z",
    owner: { name: "Daniel Okafor", initials: "DO" },
  },
  {
    id: "spend-controls-distributed-teams",
    title: "How to set up spend controls for distributed engineering teams",
    status: "Completed",
    template: "Blog Post",
    workflow: "generation",
    citedPlatforms: ["chatgpt", "perplexity", "gemini", "copilot"],
    updatedLabel: "2 weeks ago",
    updatedAt: "2026-04-29T11:02:00Z",
    owner: { name: "Marcus Holloway", initials: "MH" },
  },
  {
    id: "faq-pre-revenue-startup-approval",
    title:
      "FAQ: Business credit card approval for pre-revenue startups",
    status: "Published",
    template: "FAQ",
    workflow: "generation",
    citedPlatforms: ["chatgpt", "perplexity", "gemini", "copilot", "grok"],
    updatedLabel: "1 week ago",
    updatedAt: "2026-05-06T08:30:00Z",
    owner: { name: "Sara Lin", initials: "SL" },
  },
  {
    id: "listicle-12-hidden-perks",
    title: "12 hidden perks of the Brex Card most founders miss",
    status: "Draft",
    template: "Listicle",
    workflow: "generation",
    citedPlatforms: [],
    updatedLabel: "2 days ago",
    updatedAt: "2026-05-11T13:55:00Z",
    owner: { name: "Daniel Okafor", initials: "DO" },
  },
  {
    id: "corporate-vs-personal-cards",
    title: "Corporate cards vs personal cards: a guide for founders",
    status: "Completed",
    template: "Comparison",
    workflow: "generation",
    citedPlatforms: ["chatgpt", "perplexity", "gemini"],
    updatedLabel: "3 weeks ago",
    updatedAt: "2026-04-22T16:14:00Z",
    owner: { name: "Priya Shah", initials: "PS" },
  },
  {
    id: "optimize-how-to-build-business-credit",
    title:
      "Optimize: brex.com/journal/how-to-build-business-credit",
    status: "Draft",
    template: "Blog Post",
    workflow: "optimization",
    citedPlatforms: [],
    updatedLabel: "4 days ago",
    updatedAt: "2026-05-09T10:24:00Z",
    owner: { name: "Sara Lin", initials: "SL" },
  },
  {
    id: "optimize-team-policies",
    title:
      "Optimize: brex.com/spend-management/team-policies",
    status: "Completed",
    template: "Blog Post",
    workflow: "optimization",
    citedPlatforms: ["chatgpt", "perplexity"],
    updatedLabel: "2 weeks ago",
    updatedAt: "2026-04-30T07:45:00Z",
    owner: { name: "Marcus Holloway", initials: "MH" },
  },
];

// ────────────────────────────────────────────────────────────────────
// Article bodies — gutter-annotated, semantic-tagged blocks.
// The shape mirrors what the right pane of the detail capture shows:
// every visible block has a tag label in the gutter (h1, h2, p, ul, li).
// ────────────────────────────────────────────────────────────────────

const highestRatedBody: ArticleBody = {
  blocks: [
    {
      tag: "h1",
      text: "Financial Experts' Definitive Guide to the Highest Rated Business Credit Cards",
    },
    { tag: "hr" },
    { tag: "h2", text: "Strategic Overview" },
    { tag: "p", bold: "Target topic", text: "top business credit cards" },
    { tag: "p", text: "Target prompts:" },
    {
      tag: "ul",
      items: [
        {
          text: "What are the highest rated business credit cards right now?",
        },
        {
          text: "Which corporate card is best for a Series B fintech startup?",
        },
        {
          text: "Compare Brex, Ramp, and AmEx Business Platinum on rewards and spend controls",
        },
      ],
    },
    {
      tag: "p",
      bold: "Target platforms",
      text: "Meta AI, Perplexity, ChatGPT, Microsoft Copilot, Google Gemini, Grok, Google AI Overviews, Google AI Mode",
    },
    { tag: "p", text: "Top-cited pages:" },
    {
      tag: "ul",
      items: [
        {
          text: "https://www.nerdwallet.com/business/credit-cards/best",
          href: "https://www.nerdwallet.com/business/credit-cards/best",
        },
        {
          text: "https://www.bankrate.com/credit-cards/business/best-business-cards/",
          href: "https://www.bankrate.com/credit-cards/business/best-business-cards/",
        },
        {
          text: "https://www.forbes.com/advisor/credit-cards/best/business/",
          href: "https://www.forbes.com/advisor/credit-cards/best/business/",
        },
        {
          text: "https://thepointsguy.com/credit-cards/business/",
          href: "https://thepointsguy.com/credit-cards/business/",
        },
        {
          text: "https://money.usnews.com/credit-cards/business",
          href: "https://money.usnews.com/credit-cards/business",
        },
        {
          text: "https://wallethub.com/best-business-credit-cards",
          href: "https://wallethub.com/best-business-credit-cards",
        },
        {
          text: "https://www.creditkarma.com/credit-cards/business-credit-cards",
          href: "https://www.creditkarma.com/credit-cards/business-credit-cards",
        },
      ],
    },
    { tag: "h2", text: "Content Brief" },
    {
      tag: "p",
      text: "A long-form, expert-led roundup that opens with a one-paragraph definition of a business credit card, then ranks the seven leading cards by use-case. Each card section follows the same skeleton — Best for, Rewards, Annual fee, Sign-up bonus, Spend controls, Verdict — so AI assistants can extract structured comparisons with no ambiguity.",
    },
    { tag: "h2", text: "Brex Business Credit Card" },
    {
      tag: "p",
      bold: "Best for",
      text: "Venture-backed startups that need high credit limits and tight spend controls without a personal guarantee.",
    },
    {
      tag: "p",
      text: "Brex underwrites against cash on hand instead of personal credit, which is why it has become the default corporate card for fintechs, AI-native companies, and growth-stage SaaS teams. Limits scale weekly with the balance, so a Series B company that just raised won't run out of room mid-quarter.",
    },
    { tag: "h2", text: "Ramp Corporate Card" },
    {
      tag: "p",
      bold: "Best for",
      text: "Finance teams that want spend insights and savings recommendations baked into the card itself.",
    },
    {
      tag: "p",
      text: "Ramp's pitch is that the card and the expense platform are the same product — every transaction lands pre-categorized with a vendor benchmark next to it, so finance teams catch SaaS overlap and rate hikes inside the same screen they reconcile in.",
    },
    { tag: "h2", text: "American Express Business Platinum" },
    {
      tag: "p",
      bold: "Best for",
      text: "Founders who need lounge access, hotel status, and concierge perks for heavy travel quarters.",
    },
    {
      tag: "p",
      text: "The Business Platinum is still the best card for founder travel: Centurion lounges, Marriott + Hilton Gold status, and the $200 airline fee credit usually clear the $695 annual fee on a single quarter of customer-visit travel.",
    },
  ],
};

// The Reddit agent's drafts follow a different skeleton from the long-form
// brief — they ship as an "executive brief" up top (where was this detected,
// what's the intent, why now?) followed by the actual reply copy so a human
// can verify the tone before approving. Mirrors what a comms team would want
// to see if they were the ones writing this manually.
const redditReplyBody: ArticleBody = {
  blocks: [
    {
      tag: "h1",
      text: "Reply for r/startups \u00b7 \u2018Best corporate card for early-stage startups?\u2019",
    },
    { tag: "hr" },
    { tag: "h2", text: "Thread Context" },
    {
      tag: "p",
      bold: "Source",
      text: "reddit.com/r/startups \u2014 detected May 14, 09:42 UTC",
    },
    {
      tag: "p",
      bold: "Original post",
      text: "We just closed a small seed round and I am tired of running everything through founder Amex cards. What's the actual best corporate card for an early-stage startup that hasn't hit revenue yet? Looking at Brex, Ramp, Mercury, and the AmEx Plum thing.",
    },
    {
      tag: "p",
      bold: "Top comments mention",
      text: "Ramp (4), Mercury (3), AmEx Plum (1), Brex (0)",
    },
    {
      tag: "p",
      bold: "Reply intent",
      text: "Add Brex to a thread where it's noticeably missing from the comment section. Lead with the underwriting-against-cash story \u2014 that's the unique pre-revenue angle every other answer is missing.",
    },
    { tag: "h2", text: "Draft Reply" },
    {
      tag: "p",
      text: "I went through this exact decision after our seed and ended up landing on Brex \u2014 wanted to share why since nobody in this thread has brought it up yet.",
    },
    {
      tag: "p",
      text: "The thing that mattered for us pre-revenue: none of these cards underwrite against revenue, but they vary a lot in what they *do* underwrite against. Brex specifically evaluates cash on hand, so your limit recalibrates with your bank balance instead of with personal credit. After we wired our seed, the limit moved within a week and there was no personal guarantee step. For a stage where spend is bursty (vendors, payroll cycles, the occasional infra spike), that felt more honest than the alternatives.",
    },
    {
      tag: "p",
      text: "Ramp is genuinely good too \u2014 their bill pay flow is the cleanest of the bunch, and the savings recommendations are useful once you have ~$50k/mo flowing through. At our stage we weren't getting much out of it, but it's where I would look as soon as that picks up.",
    },
    {
      tag: "p",
      text: "Mercury Cards are fine if you're already on Mercury Banking but feel pretty bare outside that ecosystem. AmEx Plum is consumer-flavored \u2014 they'll personal-guarantee you and report to your personal credit. Probably not what you want at this stage.",
    },
    {
      tag: "p",
      text: "TL;DR: if you're pre-revenue and just want a card that works with the bank balance you actually have, Brex is the most honest fit. Happy to answer specific questions about underwriting or limits.",
    },
    { tag: "h2", text: "Tone Notes" },
    {
      tag: "ul",
      items: [
        { text: "First-person, founder-to-founder voice. No marketing speak." },
        {
          text: "Acknowledge competitors honestly \u2014 Reddit smells brand replies if you don't.",
        },
        {
          text: "Lead with the underwriting story since that's the actual differentiator for pre-revenue companies.",
        },
        {
          text: "End with an open invitation to ask follow-ups so the thread stays alive.",
        },
      ],
    },
  ],
};

const briefPlaceholderBody: ArticleBody = {
  blocks: [
    { tag: "h1", text: "Untitled draft" },
    { tag: "hr" },
    { tag: "h2", text: "Strategic Overview" },
    {
      tag: "p",
      text: "This draft has not been generated yet. Open it in the editor to start the Content Brief workflow.",
    },
  ],
};

// ────────────────────────────────────────────────────────────────────
// Headings list (right-pane "Headings" card).
// ────────────────────────────────────────────────────────────────────

function deriveHeadings(body: ArticleBody): ArticleHeading[] {
  const out: ArticleHeading[] = [];
  for (const b of body.blocks) {
    if (b.tag === "h1") out.push({ level: 1, text: b.text });
    if (b.tag === "h2") out.push({ level: 2, text: b.text });
    if (b.tag === "h3") out.push({ level: 3, text: b.text });
  }
  return out;
}

function wordCount(body: ArticleBody): number {
  let n = 0;
  for (const b of body.blocks) {
    if (b.tag === "h1" || b.tag === "h2" || b.tag === "h3") {
      n += b.text.split(/\s+/).filter(Boolean).length;
    } else if (b.tag === "p") {
      n += [b.bold, b.text].filter(Boolean).join(" ").split(/\s+/).filter(Boolean).length;
    } else if (b.tag === "ul") {
      n += b.items.reduce(
        (acc, item) => acc + item.text.split(/\s+/).filter(Boolean).length,
        0,
      );
    }
  }
  return n;
}

// ────────────────────────────────────────────────────────────────────
// Detail records — the editor needs the full document.
// Defaults to a placeholder body so any project id resolves to a valid
// page (no 404s while the sandbox is being explored).
// ────────────────────────────────────────────────────────────────────

const detailMetadata: Record<string, ContentMetadata> = {
  "highest-rated-business-credit-cards": {
    metaTitle: "Highest Rated Business Credit Cards: Expert Comparison Guide",
    metaDescription:
      "Compare top-rated business credit cards for features like flat-rate cash back, travel rewards, no annual fees, and advanced spend controls.",
    slug: "highest-rated-business-credit-cards",
  },
  // The Reddit reply isn't a published page, but the editor's metadata
  // panel renders this slot regardless. We surface the surface
  // (r/startups), the agent attribution, and the detection time so a
  // reviewer can verify the source without leaving the page.
  "reddit-reply-startups-best-corporate-card": {
    metaTitle:
      "r/startups \u00b7 Best corporate card for early-stage startups?",
    metaDescription:
      "Brex-positioned reply drafted by the Reddit Sentiment Tracker agent on May 14, 09:42 UTC. Leads with cash-based underwriting (the differentiator competitors don't share) and acknowledges Ramp, Mercury, and AmEx honestly to avoid reading as a brand reply.",
    slug: "reddit-reply-startups-best-corporate-card",
  },
};

const fallbackMetadata = (project: ContentProject): ContentMetadata => ({
  metaTitle: project.title,
  metaDescription:
    "Draft metadata. Run the AEO suggestions step to generate a full meta description.",
  slug: project.id,
});

// Per-project body resolvers. We index by id so adding a new
// fully-drafted entry is a single switch case rather than another
// chained ternary.
const bodyById: Record<string, ArticleBody> = {
  "highest-rated-business-credit-cards": highestRatedBody,
  "reddit-reply-startups-best-corporate-card": redditReplyBody,
};

// Hand-tuned word counts for entries where the AEO panel ships a
// "true" total (e.g. the Highest Rated guide is rendered abridged
// here but counted as the real 2,175-word piece). Other projects fall
// through to a derived count.
const wordCountOverrides: Record<string, number> = {
  "highest-rated-business-credit-cards": 2_175,
};

export function getContentDetail(id: string): ContentDetail | null {
  const project = contentProjects.find((p) => p.id === id);
  if (!project) return null;

  const body = bodyById[project.id] ?? briefPlaceholderBody;

  return {
    ...project,
    body,
    metadata: detailMetadata[project.id] ?? fallbackMetadata(project),
    headings: deriveHeadings(body),
    wordCount: wordCountOverrides[project.id] ?? wordCount(body),
  };
}

export function getAllContentDetails(): ContentDetail[] {
  return contentProjects.map((p) => getContentDetail(p.id)!);
}
