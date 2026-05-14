/**
 * Opportunities tab — extra Brex-themed mock data.
 *
 * The original 4 opportunities live in `@/lib/mockData` (so Overview's
 * "Top Opportunities" can keep importing them). This file extends that set
 * with 7 more Brex-themed entries and re-exports a single `allOpportunities`
 * list ordered as it appears on the Opportunities tab.
 *
 * Themes covered (all genericized — no real customer data):
 *   - Corporate cards & business credit
 *   - Expense management & spend controls
 *   - High-authority editorial outreach (Forbes, TechCrunch)
 *   - Community presence (Reddit, LinkedIn)
 */

import type { Opportunity } from "@/lib/types";
import { opportunities as baseOpportunities } from "@/lib/mockData";

/**
 * Detail-only fields for the original 4 opportunities. The first one
 * (`op-outreach-jared-morales`) already has these fields in `mockData.ts`,
 * but the other three were seeded list-only. We fill them in here without
 * touching the shared mock so Overview keeps using the same source.
 */
const baseDetailOverrides: Record<
  string,
  Pick<Opportunity, "actionCard" | "implementation" | "rationale">
> = {
  "op-co-how-to-build-business-credit": {
    actionCard: {
      type: "Content Optimization",
      description:
        "Reshape an existing high-traffic page into a structure that AI assistants prefer to cite — comparison tables, FAQ schema, and clear answer headings.",
    },
    implementation: [
      "Convert the long-form prose into a 7-step ordered list with descriptive H3s, then add a step-by-step JSON-LD HowTo schema block in the page head.",
      "Append a 10-question FAQ block with FAQPage schema, drawn from the most-cited prompts surfaced in Answer Engine Insights for this URL.",
      "Pin the page in the Brex sitemap and ping Bing/Google so the new structured data is re-crawled within 48 hours.",
    ],
    rationale:
      "Pages that match the HowTo + FAQPage schema patterns are disproportionately favored by AI assistants when answering procedural prompts, and 'how to build business credit' is one of the highest-volume procedural prompts in the corporate-card category. The page already has authority — restructuring it captures that authority into a schema shape models actively prefer to cite.",
  },
  "op-cc-business-credit-card-matchmaker": {
    actionCard: {
      type: "Content Creation",
      description:
        "Build an interactive matchmaker page that AI assistants quote verbatim when prospects ask comparative card-selection questions.",
    },
    implementation: [
      "Define a 5-question intake (revenue band, employee count, primary spend category, controls priority, integrations) and map each branch to a recommended card profile.",
      "Render the recommendation as both an interactive widget AND a static URL per outcome so crawlers and AI assistants can index the leaf nodes.",
      "Publish a methodology subpage explaining the recommendation logic so the tool is defensible, citable, and resistant to 'this is just marketing' pushback.",
    ],
    rationale:
      "Static 'best business credit card' lists are saturated, and AI assistants tend to cite whichever source has the most recent, structured comparison logic. A matchmaker tool with stable per-outcome URLs gives Brex a uniquely citable artifact for hundreds of long-tail comparison prompts where the current citation share is lost to generic listicle blogs.",
  },
  "op-reddit-startups": {
    actionCard: {
      type: "Reddit",
      description:
        "Convert a high-engagement Reddit thread into a long-tail citation source by hosting a verified Brex expert with substantive, source-backed answers.",
    },
    implementation: [
      "Reach out to /r/startups moderators for a 'Verified' flair and a stickied thread; aim for a Tuesday or Wednesday at 12 PM ET when subreddit traffic peaks.",
      "Open the thread with a 200-word context post including current rates, fee schedules, and a transparency section disclosing the Brex affiliation.",
      "Have the host answer at least 12 questions with linked sources within the first 4 hours so the thread accumulates the karma it needs to surface in Reddit's training-data extracts.",
      "Publish a recap on brex.com/journal that mirrors the highest-engagement Q&A so Brex owns a parallel canonical URL for the same content.",
    ],
    rationale:
      "Reddit threads with verified flair, substantive answers, and disclosed affiliations consistently get pulled into AI grounding because the moderation provides a trust signal LLMs are tuned to weight heavily. Pairing the AMA with a Brex-owned recap doubles citation surface area without doubling the effort.",
  },
};

function enrich(o: Opportunity): Opportunity {
  const overrides = baseDetailOverrides[o.id];
  if (!overrides) return o;
  return {
    ...o,
    actionCard: o.actionCard ?? overrides.actionCard,
    implementation: o.implementation ?? overrides.implementation,
    rationale: o.rationale ?? overrides.rationale,
  };
}

const extras: Opportunity[] = [
  {
    // ────────────────────────────────────────────────────────────
    // Content opportunity — Overview rail position 1.
    //
    // The "Create new content to defend ranking on 'top business
    // credit cards'" tile deep-links to this detail page (see
    // `app/(workspace)/overview/data.ts`). The detail page in turn
    // routes the action card to the content editor at
    // `/content/top-business-credit-cards-defense-brief` where the
    // marketer reviews + extends the AI-drafted brief.
    // ────────────────────────────────────────────────────────────
    id: "op-content-brief-top-business-credit-cards",
    type: "Content Creation",
    target: {
      kind: "topic",
      label: "\u2018top business credit cards\u2019",
    },
    headline:
      "Create a defensive ranking piece for 'top business credit cards' before Ramp's two new pages keep stealing rank.",
    description:
      "Brex slipped #2 \u2192 #3 this period and citation share dropped from 11.2% to 8.8% on this topic. The topic carries 164k monthly prompts \u2014 the highest-volume query in the corporate card category \u2014 so every rank position is worth measurable visibility share. Ramp published two new pages this month that are now picking up citations Brex used to own; a fresh 2026-anchored ranking piece is the cheapest, most direct way to take rank back.",
    currentPerformance: { status: "Citation Share", value: 8.8 },
    actionCard: {
      type: "Content",
      description:
        "Open the AI-drafted defense brief in the Content editor \u2014 the outline is ready (lead with cash-on-hand underwriting, 6-column comparison table, FAQPage schema). A writer takes it from outline to a publishable 2026-anchored ranking piece.",
      // Routes straight to the brief in the Content editor so the
      // marketer doesn't have to hunt for the project that was
      // just created.
      href: "/content/top-business-credit-cards-defense-brief",
    },
    implementation: [
      "Review the AI-generated brief in the Content editor and lock the headline + target prompts (the outline already pulls the four highest-volume definitional queries from Answer Engine Insights).",
      "Lead with a one-paragraph answer to 'what is a business credit card' so AI assistants have an extractable lead. Then ship the 6-column comparison table covering Brex, Ramp, Mercury, AmEx Plum, Chase Ink, and Capital One Spark.",
      "Anchor every claim to 2026 numbers (limits, rewards, sign-up bonuses). Ramp's two new May pages are dated; the freshness signal is what makes them currently outrank Brex's older content.",
      "Insert a FAQPage schema block with the 10 highest-volume definitional prompts from Answer Engine Insights so the page is structured for direct AI extraction.",
      "Publish and ping Bing + Google via `lastmod` so the new structured data is re-crawled within 48 hours. Compare citation share weekly; this defensive piece should claw back ~2-3 percentage points within 4 weeks.",
    ],
    rationale:
      "164k monthly prompts means each percentage point of citation share is roughly 1,600 monthly impressions on AI-generated answers \u2014 substantial AEO leverage on a single page. Ramp's gain is recency-driven (their two new May pages are dated, Brex's existing coverage is 2024-anchored), so the cheapest fix is a 2026-dated ranking piece that mirrors Ramp's structure while pushing Brex's cash-on-hand underwriting story \u2014 the differentiator Ramp can't argue against.",
  },
  {
    // ────────────────────────────────────────────────────────────
    // Agent opportunity — surfaced on the Overview rail at position
    // 2 (see `app/(workspace)/overview/data.ts`).
    //
    // Detail-page narrative spells out the multi-output workflow
    // Profound's customer-pitch describes: a single agent monitors
    // Ramp's content surface and produces three concrete artifacts
    // for the marketer to review (Slack ping → brief draft →
    // battle-card update). The structure mirrors Profound's
    // existing template-gallery entries (each template has a clear
    // trigger + output set), so this card reads as "build the
    // template that's missing." The action card deep-links to a
    // freshly-AI-drafted agent in the editor (the agent has
    // `draftedByAI: true`, which makes the editor open with the
    // Assistant panel showing the drafting conversation).
    // ────────────────────────────────────────────────────────────
    id: "op-agent-competitor-response",
    type: "Agent",
    target: { kind: "topic", label: "Ramp content launches" },
    headline:
      "Set up a Ramp Launch Watch agent that alerts, drafts a brief, and updates the Brex battle card overnight.",
    description:
      "Ramp published 4 new pages on contested topics in May (top business credit cards, high-limit, startup card, EIN-only). Each one shifts citation share within days. Today the response is manual — a marketer notices the page in a weekly review, by which point Ramp has already started ranking. An agent collapses that loop: it detects the new page within hours, drafts the Brex response brief, files a battle-card update, and pings the team on Slack — all before the marketer's standup.",
    currentPerformance: { status: "Not Mentioned" },
    actionCard: {
      type: "Agent",
      description:
        "Open the AI-drafted Ramp Launch Watch agent in the editor \u2014 the workflow is already wired (sitemap diff trigger \u2192 brief drafting \u2192 Slack alert \u2192 battle-card update). Review the steps, tweak the trigger cadence, and publish.",
      // Routes straight to the freshly-drafted agent. The agent's
      // `draftedByAI: true` flag flips the editor's left panel to
      // the Assistant tab with the drafting conversation visible.
      href: "/agents/ag-ramp-launch-watch/edit",
    },
    implementation: [
      "Configure the trigger: scrape Ramp's marketing sitemap + blog feed every 6 hours; diff against the last snapshot. Flag any page published in the last 24 hours whose title or H1 contains a topic from the Brex contested-topics list (top business credit cards, high-limit, startup card, EIN-only, expense management).",
      "Output 1 — Slack ping: post to #marketing-aeo within 10 minutes of detection. Include the page URL, the matched topic, Brex's current citation share for that topic, and a thumbnail of the Ramp hero image so the alert is scannable.",
      "Output 2 — Response brief: kick off a Brex Content Brief draft for the matched topic. Pre-fill the brief with the Ramp page's H1/H2 structure, the prompts Ramp is likely targeting (pulled from Answer Engine Insights), and 3 angle suggestions the Brex content team can pick from.",
      "Output 3 — Battle card update: append the new Ramp page to the Brex/Ramp battle card under the matched topic. Include the page URL, publish date, primary CTA, and one-line summary so the GTM team can quote-reply on calls without rereading the whole page.",
      "Review queue: surface every triggered run on the Agents tab with a status (alert sent, brief drafted, battle card updated) so the marketer can audit accuracy before the workflow is fully autonomous.",
    ],
    rationale:
      "Competitor content launches are the single highest-frequency cause of week-over-week citation share drops on contested topics. Today Brex responds reactively (weekly review → brief → publish, a 7-10 day loop). An agent that catches the launch within hours and produces all three artifacts — alert, brief, battle card — compresses that loop to 1-2 days and removes the 'whoever happens to notice on Monday' bottleneck. The same pattern Profound recommends for competitor price changes (a single trigger producing email drafts, Slack updates, and a comparison landing page) maps directly onto Brex's content-defense workflow, with Ramp's publishing cadence as the trigger.",
  },
  {
    id: "op-outreach-techcrunch-finola-quinn",
    type: "Outreach",
    target: { kind: "person", label: "Finola Quinn" },
    headline:
      "Pitch Finola Quinn at TechCrunch a benchmark report on AI-driven expense management adoption.",
    description:
      "Finola covers fintech infrastructure and has cited two competitor benchmarks in the last quarter. A Brex-led data drop would slot directly into her existing beat and surface in citation graphs.",
    currentPerformance: { status: "Not Mentioned" },
    actionCard: {
      type: "Outreach",
      description:
        "Hand a beat reporter a Brex-owned benchmark to cite, and lock in a citation pathway from a high-authority publication.",
    },
    implementation: [
      "Compile a 6-page benchmark on AI-driven expense management adoption across 500+ Brex customers; redact identifying details and stand up a public landing page so Finola has a stable URL to link.",
      "Send a Tuesday morning pitch with the headline stat, three quote-ready angles, and an offer of an embargoed walkthrough with a Brex VP of Product.",
      "If she bites, follow up within 24 hours with a 1-pager FAQ for her editor and pre-rendered chart assets so the embed work is zero.",
    ],
    rationale:
      "TechCrunch citations carry strong AI-citability weight and Finola has an established cadence of publishing benchmark-style pieces. Owning the dataset frames Brex as the authoritative source on AI-era expense management, which is exactly the topic AI assistants summarize most often when prospects ask about category leaders.",
  },
  {
    id: "op-co-corporate-cards-page",
    type: "Content Optimization",
    target: {
      kind: "url",
      label: "brex.com/corporate-cards",
      href: "https://brex.com/corporate-cards",
    },
    headline:
      "Restructure the Corporate Cards landing page with comparison tables and answer-style headings.",
    description:
      "The page currently relies on marketing prose. Adding a side-by-side comparison table, structured FAQ schema, and answer-style H2s would map directly onto the citation patterns we see on competitor pages already pulled into AI summaries.",
    currentPerformance: { status: "Citation Share", value: 12.4 },
    actionCard: {
      type: "Content Optimization",
      description:
        "Reshape an existing high-traffic page into a structure that AI assistants prefer to cite — comparison tables, FAQ schema, and clear answer headings.",
    },
    implementation: [
      "Replace the hero subhead with a one-sentence answer to 'What is a corporate card and how is it different from a business credit card?' so the lead paragraph is directly extractable.",
      "Add a 6-row comparison table covering Brex, Ramp, Capital One Spark, Chase Ink, and Amex Business — limit, billing cycle, rewards, integrations, underwriting, and pricing.",
      "Insert an FAQ schema block with the 8 most frequent prompts surfaced in Answer Engine Insights for this URL.",
      "Re-publish with a `lastmod` ping to Bing and Google so the new structure gets re-crawled within 48 hours.",
    ],
    rationale:
      "AI assistants reliably extract from pages with explicit Q&A scaffolding and structured comparison tables. The page already ranks for category prompts, so the marginal cost of restructuring it is small and the upside is durable: every prompt a model answers from this page becomes a Brex citation.",
  },
  {
    id: "op-cc-expense-roi-calculator",
    type: "Content Creation",
    target: { kind: "topic", label: "'Expense Management ROI'" },
    headline:
      "Ship an interactive ROI calculator that quantifies expense management savings for finance teams.",
    description:
      "Calculator-style tools are heavily cited by AI assistants when users ask 'how much could we save by switching expense providers?'. Owning that artifact short-circuits competitor lists.",
    currentPerformance: { status: "Visibility Score", value: 42.1 },
    actionCard: {
      type: "Content Creation",
      description:
        "Build a calculator-style content asset that AI assistants quote verbatim when users ask quantitative comparison questions.",
    },
    implementation: [
      "Define the calculator inputs (team size, average monthly spend, current tool, percent of out-of-policy spend) and the outputs (annualized savings, hours saved, payback period).",
      "Validate the savings model with three Brex finance leaders and document the methodology on the same page so it's defensible and citable.",
      "Pair the calculator with a static 'methodology' subpage so search engines and AI crawlers index the underlying assumptions, not just the widget.",
    ],
    rationale:
      "Calculator pages are unusually well-suited to AI summarization because the methodology block reads like a structured explainer and the embedded numbers create natural pull-quotes. This is the same pattern that won us early citations in the Travel category and we should replicate it for spend management.",
  },
  {
    id: "op-cc-procurement-glossary",
    type: "Content Creation",
    target: { kind: "topic", label: "'Procurement Terms Glossary'" },
    headline:
      "Publish a Brex-owned procurement glossary covering 80+ terms with linked deep-dive guides.",
    description:
      "Glossary pages get re-cited across AI answers any time a prompt contains a definitional question. Brex doesn't own one yet — every glossary citation today goes to a competitor or a generic finance blog.",
    currentPerformance: { status: "Visibility Score", value: 28.7 },
    actionCard: {
      type: "Content Creation",
      description:
        "Plant a foundational definitional asset that AI assistants will return to whenever a prompt requires a precise term explanation.",
    },
    implementation: [
      "Audit the 80 highest-volume procurement and finance terms from Prompt Volumes; cluster them into 6 hubs (cards, AP, AR, treasury, controls, reporting).",
      "Write 80–120 word definitions with one example each; link each definition to a deeper guide where one already exists.",
      "Embed structured DefinedTerm schema and add a sticky alphabetic nav to maximize crawl-friendliness.",
    ],
    rationale:
      "Glossary entries are the cheapest content unit to produce relative to citation upside — every definition becomes a candidate pull-quote, and the schema lets the page rank for hundreds of long-tail definitional queries simultaneously. Brex is the only major spend management vendor without one, which is the whole opportunity.",
  },
  {
    id: "op-reddit-personal-finance",
    type: "Reddit",
    target: {
      kind: "subreddit",
      label: "reddit.com/r/smallbusiness/",
      href: "https://reddit.com/r/smallbusiness/",
    },
    headline:
      "Run a verified-employee AMA in /r/smallbusiness on building business credit without a personal guarantee.",
    description:
      "/r/smallbusiness has 2.1M members and Reddit is now a top-3 grounding source for several large LLMs. A scheduled AMA with a Brex underwriting lead earns durable, AI-citable threads.",
    currentPerformance: { status: "Citation Share", value: 56.3 },
    actionCard: {
      type: "Reddit",
      description:
        "Convert a high-traffic Reddit thread into a long-tail citation source by hosting an AMA with a verified Brex expert.",
    },
    implementation: [
      "Pre-coordinate with the subreddit moderators to get a 'Verified' flair and a stickied AMA slot — pick a Tuesday or Wednesday at 12 PM ET.",
      "Seed 8 anchor questions across builds (no PG, founder credit, FX, controls) so the thread has substantive answers even if traffic is moderate.",
      "Have the host link to one Brex page max (the corporate cards landing) — over-promotion gets removed and tanks the AMA's citability.",
      "After the AMA closes, post a recap on brex.com/journal to lock in a Brex-owned URL that mirrors the Reddit thread's content.",
    ],
    rationale:
      "Reddit threads with a verified expert and substantive answers consistently outperform brand pages in AI grounding because LLMs treat them as high-trust user-generated context. Pairing the AMA with an on-brex.com recap doubles the surface area: assistants pull from whichever the prompt format prefers, but the citation flows back to Brex either way.",
  },
  {
    id: "op-linkedin-cfo-engagement",
    type: "LinkedIn",
    target: { kind: "person", label: "Daniel Okwu" },
    headline:
      "Build a structured LinkedIn engagement loop with Daniel Okwu, CFO at a 400-person SaaS scale-up.",
    description:
      "Daniel posts weekly on finance ops and his last three posts hit 40k+ impressions each. A consistent commenting and co-publishing cadence puts Brex in the LinkedIn citation graph for CFO-led prompts.",
    currentPerformance: { status: "Visibility Score", value: 35.2 },
    actionCard: {
      type: "LinkedIn",
      description:
        "Establish a recurring presence in a high-signal LinkedIn thought leader's posts to earn co-publication and durable citation.",
    },
    implementation: [
      "Have a Brex finance leader engage on Daniel's first post each week — a substantive 2–3 sentence comment with one specific insight, not a generic 'great post'.",
      "After 4 weeks of engagement, propose a co-published 'state of finance ops' note: he writes the post, Brex provides the data, both share.",
      "Re-share the co-published post in the Brex newsletter so it accrues authority on both sides of the network.",
    ],
    rationale:
      "LinkedIn engagement only converts to citation share when it's consistent enough to register as an authentic relationship rather than a campaign. Picking one CFO with a clear publishing cadence and committing to a 4-week loop is a much higher-yield strategy than spraying generic engagement across 20 accounts.",
  },
  {
    id: "op-co-spend-management-guide",
    type: "Content Optimization",
    target: {
      kind: "url",
      label: "brex.com/journal/spend-management-best-practices",
      href: "https://brex.com/journal/spend-management-best-practices",
    },
    headline:
      "Refresh the spend management guide with a 2026-anchored framework and updated benchmark data.",
    description:
      "The page ranks but is being out-cited by newer competitor articles with more recent benchmark data. A surgical refresh closes the gap without sacrificing existing inbound links.",
    currentPerformance: { status: "Citation Share", value: 71.6 },
    actionCard: {
      type: "Content Optimization",
      description:
        "Refresh a high-performing evergreen page with up-to-date benchmarks so AI assistants prefer it over newer competitor pages.",
    },
    implementation: [
      "Update the lead stat block with 2026 benchmark numbers from the Brex platform and re-date the page so crawlers register a recency signal.",
      "Add a short 'What's new in 2026' module above the fold that explicitly contrasts with last year's framework.",
      "Insert anchor links to 5 sub-topics so the table of contents becomes individually citable.",
    ],
    rationale:
      "Evergreen guides decay quickly in AI citation share once newer competitor pages publish. The page already has authority, so a small refresh — recency signal, updated stats, anchor-able sections — is dramatically cheaper than writing a new pillar piece, and it protects 70%+ citation share that's currently at risk.",
  },
];

/** All opportunities, list-page order. Originals (enriched with detail
 * fields where missing) first, then Brex-extras. */
export const allOpportunities: Opportunity[] = [
  ...baseOpportunities.map(enrich),
  ...extras,
];

/** Find an opportunity by id. Returns null when missing. */
export function findOpportunity(id: string): Opportunity | null {
  return allOpportunities.find((o) => o.id === id) ?? null;
}

/** Index of an opportunity in the list — for prev/next pagination. */
export function indexOfOpportunity(id: string): number {
  return allOpportunities.findIndex((o) => o.id === id);
}
