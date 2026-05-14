"use client";

/**
 * NodeCard — single rectangle on the canvas.
 *
 * Two visual shapes:
 *   - "chip" — small rounded pill for Start / End (no output)
 *   - "block" — full card with header + colored output pill (everything else)
 *
 * All cards have the same outer bounding box (360 × 92) so the SVG edge
 * math is uniform; the chip variant just renders a centered pill inside it.
 */

import { cn } from "@/lib/cn";
import {
  Cog8ToothIcon,
  CommandLineIcon,
  GlobeAltIcon,
  PuzzlePieceIcon,
  SparklesIcon,
} from "@/components/ui/icons";
import type { NodeCategory, WorkflowNode } from "@/lib/types/agent-workflow";

export const NODE_W = 360;
export const NODE_H = 92;

const categoryStyle: Record<
  NodeCategory,
  { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; surface: string }
> = {
  control: {
    icon: SparklesIcon,
    surface: "bg-bg-tertiary text-text-secondary",
  },
  logic: {
    icon: Cog8ToothIcon,
    surface: "bg-workflow-green/15 text-workflow-green",
  },
  ai: {
    icon: SparklesIcon,
    surface: "bg-workflow-purple/15 text-workflow-purple",
  },
  research: {
    icon: GlobeAltIcon,
    surface: "bg-workflow-blue/15 text-workflow-blue",
  },
  code: {
    icon: CommandLineIcon,
    surface: "bg-workflow-orange/15 text-workflow-orange",
  },
  integration: {
    icon: PuzzlePieceIcon,
    surface: "bg-workflow-purple/15 text-workflow-purple",
  },
};

const outputColor: Record<string, string> = {
  string: "bg-bg-tertiary text-text-secondary",
  json: "bg-workflow-purple/12 text-workflow-purple",
  array: "bg-workflow-blue/12 text-workflow-blue",
  number: "bg-workflow-orange/12 text-workflow-orange",
  any: "bg-bg-tertiary text-text-secondary",
};

export interface NodeCardProps {
  node: WorkflowNode;
  selected?: boolean;
  onClick?: () => void;
}

export function NodeCard({ node, selected, onClick }: NodeCardProps) {
  const isChip = node.kind === "start" || node.kind === "end";

  if (isChip) {
    return (
      <button
        type="button"
        onClick={onClick}
        style={{
          position: "absolute",
          left: node.x,
          top: node.y,
          width: NODE_W,
          height: NODE_H,
        }}
        className="inline-flex items-center justify-center focus:outline-none"
      >
        <span
          className={cn(
            "inline-flex items-center gap-6 h-32 px-14 rounded-full",
            "text-small font-medium",
            "border bg-bg-secondary text-text-primary",
            "transition-all duration-100",
            selected
              ? "border-fill-primary shadow-[0_0_0_3px_rgba(255,255,255,0.06)]"
              : "border-fill-quaternary hover:border-fill-tertiary",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "size-6 rounded-full",
              node.kind === "start" ? "bg-workflow-green" : "bg-fill-red",
            )}
          />
          {node.title}
        </span>
      </button>
    );
  }

  const cat = categoryStyle[node.category];
  const CatIcon = cat.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: "absolute",
        left: node.x,
        top: node.y,
        width: NODE_W,
        height: NODE_H,
      }}
      className={cn(
        "text-left bg-bg-secondary rounded-10 transition-all duration-100",
        "border focus-visible:outline-none",
        selected
          ? "border-fill-primary shadow-[0_0_0_3px_rgba(255,255,255,0.06)]"
          : "border-fill-quaternary hover:border-fill-tertiary",
      )}
    >
      <div className="flex items-center gap-8 px-12 h-44 border-b border-fill-quaternary">
        <span
          className={cn(
            "size-22 inline-flex items-center justify-center rounded-6 shrink-0",
            cat.surface,
          )}
        >
          <CatIcon className="size-12" />
        </span>
        <span className="text-small font-medium text-text-primary truncate flex-1">
          {node.title}
        </span>
      </div>
      {node.output ? (
        <div className="flex items-center gap-6 px-12 h-44">
          <span className="text-mini text-text-tertiary shrink-0">Output:</span>
          <span
            className={cn(
              "inline-flex items-center h-20 px-6 rounded-4",
              "text-mini font-medium tabular-nums truncate",
              outputColor[node.output.type] ?? outputColor.any,
            )}
          >
            <TypeGlyph type={node.output.type} />
            <span className="ml-4 truncate">{node.output.name}</span>
          </span>
        </div>
      ) : null}
    </button>
  );
}

function TypeGlyph({ type }: { type: string }) {
  const letter = type === "string" ? "T" : type === "json" ? "{ }" : type === "array" ? "[ ]" : type === "number" ? "#" : "*";
  return (
    <span className="inline-flex items-center justify-center min-w-[14px] text-[10px] font-mono opacity-80">
      {letter}
    </span>
  );
}
