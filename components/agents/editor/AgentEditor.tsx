"use client";

/**
 * AgentEditor — the full-screen agent editor.
 *
 * Three-pane layout:
 *   - Left: NodePalette (defaults to "Nodes" tab, but flips to
 *     "Assistant" when `draftedByAI` is set so the user lands on the
 *     drafting conversation they came in via)
 *   - Center: NodeCanvas (state owner for selected node)
 *   - Right: NodeConfigPanel (mirrors selection)
 *
 * Owns the `selectedNodeId` state because both the canvas and the right
 * pane need it. Defaults to the Start node so the right pane is never
 * empty on first paint.
 *
 * The `draftedByAI` + `assistantConversation` props plumb through to
 * NodePalette so the Assistant tab can render a finished AI drafting
 * thread (vs. the default "Coming soon" placeholder). When the agent
 * was AI-drafted, the conversation is the most useful thing the user
 * can see — they're reviewing the AI's work, not adding nodes manually.
 */

import { useMemo, useState } from "react";
import { EditorTopBar } from "./EditorTopBar";
import { NodePalette } from "./NodePalette";
import type { AssistantConversation } from "./NodePalette";
import { NodeCanvas } from "./NodeCanvas";
import { NodeConfigPanel } from "./NodeConfigPanel";
import type { Workflow } from "@/lib/types/agent-workflow";

export interface AgentEditorProps {
  agentId: string;
  agentName: string;
  workflow: Workflow;
  /** True when the agent was just drafted by AI. Flips palette default tab. */
  draftedByAI?: boolean;
  /** Conversation to render in the Assistant tab. Required if draftedByAI. */
  assistantConversation?: AssistantConversation;
}

export function AgentEditor({
  agentId,
  agentName,
  workflow,
  draftedByAI = false,
  assistantConversation,
}: AgentEditorProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(
    workflow.nodes[0]?.id ?? null,
  );

  const selectedNode = useMemo(
    () => workflow.nodes.find((n) => n.id === selectedNodeId) ?? null,
    [workflow.nodes, selectedNodeId],
  );

  return (
    <div className="h-screen w-screen flex flex-col bg-bg-primary text-text-primary overflow-hidden">
      <EditorTopBar agentId={agentId} agentName={agentName} />
      <div className="flex-1 flex min-h-0">
        <NodePalette
          defaultTab={draftedByAI ? "assistant" : "nodes"}
          assistantConversation={assistantConversation}
        />
        <NodeCanvas
          workflow={workflow}
          selectedNodeId={selectedNodeId}
          onSelectNode={setSelectedNodeId}
        />
        <NodeConfigPanel workflow={workflow} node={selectedNode} />
      </div>
    </div>
  );
}
