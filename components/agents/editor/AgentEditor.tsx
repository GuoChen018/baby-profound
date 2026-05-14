"use client";

/**
 * AgentEditor — the full-screen agent editor.
 *
 * Three-pane layout:
 *   - Left: NodePalette
 *   - Center: NodeCanvas (state owner for selected node)
 *   - Right: NodeConfigPanel (mirrors selection)
 *
 * Owns the `selectedNodeId` state because both the canvas and the right
 * pane need it. Defaults to the Start node so the right pane is never
 * empty on first paint.
 */

import { useMemo, useState } from "react";
import { EditorTopBar } from "./EditorTopBar";
import { NodePalette } from "./NodePalette";
import { NodeCanvas } from "./NodeCanvas";
import { NodeConfigPanel } from "./NodeConfigPanel";
import type { Workflow } from "@/lib/types/agent-workflow";

export interface AgentEditorProps {
  agentId: string;
  agentName: string;
  workflow: Workflow;
}

export function AgentEditor({ agentId, agentName, workflow }: AgentEditorProps) {
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
        <NodePalette />
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
