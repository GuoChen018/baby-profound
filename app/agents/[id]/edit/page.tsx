/**
 * Agents — Agent Editor (full-screen, sidebar-hidden).
 *
 * Lives OUTSIDE the `(workspace)` route group so the persistent sidebar
 * is bypassed entirely — matches Profound's UX signal that the editor is
 * a focused-task mode (see `_reference/profound/agents/notes.md` View 3).
 *
 * The page is intentionally a thin server-component shim — every piece
 * of UI lives in the client `<AgentEditor>` tree because canvas state
 * (selected node, future zoom/pan) needs to be interactive.
 *
 * When the agent has `draftedByAI: true` (e.g. `ag-ramp-launch-watch`),
 * we hand the editor an `assistantConversation` to render in the left
 * Assistant tab. The thread is per-agent because each AI-drafted agent
 * has its own drafting reasoning to show.
 */

import { AgentEditor } from "@/components/agents/editor/AgentEditor";
import type { AssistantConversation } from "@/components/agents/editor/NodePalette";
import { agentTemplates, agents, getAgentById } from "@/lib/data/agents";
import { getWorkflowForAgent } from "@/lib/data/agent-workflow";

/**
 * Static export needs an exhaustive list of `[id]` values to
 * pre-render. Mirrors `(workspace)/agents/[id]/page.tsx` — real
 * agents + template stubs — so every "Edit" link from the run page
 * resolves at build time.
 */
export async function generateStaticParams() {
  const ids = new Set<string>();
  for (const a of agents) ids.add(a.id);
  for (const t of agentTemplates) ids.add(t.id);
  return [...ids].map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agent = getAgentById(id) ?? agents[0];
  return { title: `Edit · ${agent.name} · baby-profound` };
}

export default async function AgentEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agent = getAgentById(id) ?? agents[0];
  const workflow = getWorkflowForAgent(agent.id);
  const assistantConversation = getAssistantConversation(agent.id);

  return (
    <AgentEditor
      agentId={agent.id}
      agentName={agent.name}
      workflow={workflow}
      draftedByAI={agent.draftedByAI}
      assistantConversation={assistantConversation}
    />
  );
}

/**
 * Per-agent drafting conversations. Currently only the Ramp Launch
 * Watch entry has one — it's the only `draftedByAI: true` agent in
 * `lib/data/agents.ts`. If/when a second AI-drafted agent shows up,
 * add its entry to this map. Keeping conversations colocated with
 * the page rather than in `lib/data/agents.ts` because they're
 * long-form text that's strictly a render concern (no other surface
 * reads them).
 */
function getAssistantConversation(
  agentId: string,
): AssistantConversation | undefined {
  if (agentId === "ag-ramp-launch-watch") return rampLaunchWatchConversation;
  return undefined;
}

const rampLaunchWatchConversation: AssistantConversation = {
  messages: [
    {
      role: "user",
      text: "Build me an agent that monitors Ramp content launches on contested topics and drafts a Brex response brief whenever they ship a new page. Should also ping the team on Slack and update our competitive battle card.",
    },
    {
      role: "assistant",
      text: "Got it. I'll build the workflow in 5 stages:\n\n1. Diff Ramp's marketing sitemap every 6 hours so we catch new pages within hours of publish.\n2. Match each new page against your contested-topics list so we only fire on topics where ranking actually shifts.\n3. Draft a Brex response brief modeled on the matched topic's prompt structure.\n4. Post a Slack alert with the URL + topic + Brex's current citation share so the team sees it without leaving #marketing-aeo.\n5. Append a row to the Brex/Ramp battle card so GTM has context for sales calls.\n\nKicking off the workflow build now.",
    },
    {
      role: "tool",
      label: "Created node",
      description:
        "Diff Ramp Marketing Sitemap — runs every 6h, outputs JSON of new pages keyed by URL + publish date.",
    },
    {
      role: "tool",
      label: "Created node",
      description:
        "Match Page to Contested Topic — prompts an LLM with the page H1/H2 + your contested-topics list, returns the matched topic or null.",
    },
    {
      role: "tool",
      label: "Created node",
      description:
        "Draft Brex Response Brief — pulls Answer Engine Insights prompts for the matched topic and drafts a content brief in the same format the Content Brief agent uses.",
    },
    {
      role: "tool",
      label: "Created integration",
      description:
        "Slack \u2192 #marketing-aeo: posts URL, topic, Brex citation share, Ramp citation share. Linked to your contested-topics input.",
    },
    {
      role: "tool",
      label: "Created integration",
      description:
        "Notion \u2192 Brex/Ramp battle card: appends a row per detected page (URL, publish date, topic, hero CTA, one-line summary).",
    },
    {
      role: "assistant",
      text: "Workflow's wired up. Take a look at the canvas \u2014 each node has the config I sketched out. The trigger cadence (every 6h) is the riskiest setting; if Ramp publishes more than once a day on contested topics you may want to drop that to 2h.",
    },
  ],
  summary: {
    title: "Ramp Launch Watch \u2014 ready to review",
    bullets: [
      "5-stage workflow: sitemap diff \u2192 topic match \u2192 brief draft \u2192 Slack \u2192 battle card",
      "Triggers every 6h. Drop to 2h if Ramp publishes daily.",
      "Outputs 3 artifacts per detected page: brief, Slack alert, battle-card row.",
      "Inputs to set before publishing: contested topics, Slack channel, optional battle card URL.",
    ],
  },
};
