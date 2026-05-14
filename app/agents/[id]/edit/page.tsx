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
 */

import { AgentEditor } from "@/components/agents/editor/AgentEditor";
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

  return (
    <AgentEditor
      agentId={agent.id}
      agentName={agent.name}
      workflow={workflow}
    />
  );
}
