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
};

const fallbackMetadata = (project: ContentProject): ContentMetadata => ({
  metaTitle: project.title,
  metaDescription:
    "Draft metadata. Run the AEO suggestions step to generate a full meta description.",
  slug: project.id,
});

export function getContentDetail(id: string): ContentDetail | null {
  const project = contentProjects.find((p) => p.id === id);
  if (!project) return null;

  const body =
    project.id === "highest-rated-business-credit-cards"
      ? highestRatedBody
      : briefPlaceholderBody;

  return {
    ...project,
    body,
    metadata: detailMetadata[project.id] ?? fallbackMetadata(project),
    headings: deriveHeadings(body),
    wordCount:
      project.id === "highest-rated-business-credit-cards"
        ? 2_175
        : wordCount(body),
  };
}

export function getAllContentDetails(): ContentDetail[] {
  return contentProjects.map((p) => getContentDetail(p.id)!);
}
