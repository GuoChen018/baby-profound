"use client";

/**
 * NodeCanvas — center pane of the Agent Editor.
 *
 * Renders the node graph + the bottom-center floating toolbar.
 *
 * Layout strategy:
 *   - One scroll container — the canvas can be larger than the viewport.
 *   - An SVG layer (absolute, behind everything) carries the edges.
 *   - Each node is a positioned button (the `NodeCard`).
 *   - The toolbar is a floating pill anchored bottom-center via sticky/
 *     fixed positioning.
 *
 * Interactivity: clicking a node selects it and calls back to the parent
 * editor so the right-rail config can mirror the selection. Pan / zoom
 * / drag aren't wired — the toolbar buttons are decorative.
 */

import { useMemo } from "react";
import { cn } from "@/lib/cn";
import type { Workflow } from "@/lib/types/agent-workflow";
import {
  ArrowsPointingOutIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  ChevronUpDownIcon,
  HandRaisedIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
} from "@/components/ui/icons";
import { NODE_H, NODE_W, NodeCard } from "./NodeCard";

export interface NodeCanvasProps {
  workflow: Workflow;
  selectedNodeId: string | null;
  onSelectNode: (id: string) => void;
}

const PADDING = 80;

export function NodeCanvas({
  workflow,
  selectedNodeId,
  onSelectNode,
}: NodeCanvasProps) {
  const { nodes, edges } = workflow;

  /** Compute the SVG canvas bounds from the node positions. */
  const { width, height } = useMemo(() => {
    let maxX = 0;
    let maxY = 0;
    for (const n of nodes) {
      maxX = Math.max(maxX, n.x + NODE_W);
      maxY = Math.max(maxY, n.y + NODE_H);
    }
    return { width: maxX + PADDING, height: maxY + PADDING };
  }, [nodes]);

  /** Map node id → node for fast edge lookup. */
  const byId = useMemo(() => {
    const m = new Map<string, (typeof nodes)[number]>();
    for (const n of nodes) m.set(n.id, n);
    return m;
  }, [nodes]);

  return (
    <div className="flex-1 min-w-0 relative bg-bg-primary overflow-auto">
      {/* Dotted-grid background pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--fill-quaternary) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          backgroundPosition: "10px 10px",
        }}
      />

      {/* Inner content is sized to its node bounds and centered horizontally
       * inside the viewport so the workflow column reads as the focal point. */}
      <div
        className="relative mx-auto"
        style={{ width, height }}
      >
        {/* Edges */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
        >
          <defs>
            <marker
              id="edge-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--fill-tertiary)" />
            </marker>
          </defs>
          {edges.map((edge) => {
            const a = byId.get(edge.from);
            const b = byId.get(edge.to);
            if (!a || !b) return null;
            const x1 = a.x + NODE_W / 2;
            const y1 = a.y + NODE_H;
            const x2 = b.x + NODE_W / 2;
            const y2 = b.y;
            const midY = (y1 + y2) / 2;
            const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
            return (
              <path
                key={edge.id}
                d={d}
                fill="none"
                stroke="var(--fill-tertiary)"
                strokeWidth={1.5}
                markerEnd="url(#edge-arrow)"
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <NodeCard
            key={node.id}
            node={node}
            selected={node.id === selectedNodeId}
            onClick={() => onSelectNode(node.id)}
          />
        ))}
      </div>

      {/* Floating toolbar — bottom-center */}
      <div className="sticky bottom-16 z-10 flex justify-center pointer-events-none">
        <div className="pointer-events-auto inline-flex items-center gap-2 px-6 py-4 rounded-8 bg-bg-secondary border border-fill-quaternary shadow-2">
          <ToolbarButton icon={<HandRaisedIcon className="size-14" />} label="Pan" />
          <ToolbarDivider />
          <ToolbarButton icon={<MinusIcon className="size-14" />} label="Zoom out" />
          <span className="px-6 text-mini text-text-tertiary tabular-nums select-none">
            100%
          </span>
          <ToolbarButton icon={<PlusIcon className="size-14" />} label="Zoom in" />
          <ToolbarButton icon={<MagnifyingGlassIcon className="size-14" />} label="Fit to screen" />
          <ToolbarButton icon={<ArrowsPointingOutIcon className="size-14" />} label="Fullscreen" />
          <ToolbarDivider />
          <ToolbarButton icon={<ArrowUturnLeftIcon className="size-14" />} label="Undo" />
          <ToolbarButton icon={<ArrowUturnRightIcon className="size-14" />} label="Redo" />
          <ToolbarDivider />
          <ToolbarButton icon={<ChevronUpDownIcon className="size-14" />} label="Layout options" />
          <ToolbarButton
            icon={<QuestionMarkCircleIcon className="size-14" />}
            label="Help"
          />
        </div>
      </div>
    </div>
  );
}

function ToolbarButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "size-24 inline-flex items-center justify-center rounded-4",
        "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary",
        "focus-visible:outline-none focus-visible:shadow-focus",
        "transition-colors",
      )}
    >
      {icon}
    </button>
  );
}

function ToolbarDivider() {
  return <span aria-hidden className="w-[1px] h-16 bg-fill-quaternary mx-2" />;
}
