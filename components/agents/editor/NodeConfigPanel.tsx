"use client";

/**
 * NodeConfigPanel — right rail of the Agent Editor.
 *
 * Mirrors the selected node from the canvas and lets the user edit its
 * inputs. The Start node shows an `Input` list (Primary Prompt + Add input).
 * Every other node shows a simple read-only summary plus the output shape.
 *
 * Reference: `_reference/profound/agents/notes.md` View 3, right pane.
 */

import { useId } from "react";
import {
  EllipsisHorizontalIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@/components/ui/icons";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { Workflow, WorkflowNode } from "@/lib/types/agent-workflow";

export interface NodeConfigPanelProps {
  workflow: Workflow;
  node: WorkflowNode | null;
}

export function NodeConfigPanel({ workflow, node }: NodeConfigPanelProps) {
  return (
    <aside className="w-360 shrink-0 h-full flex flex-col border-l border-fill-quaternary bg-bg-secondary">
      <header className="flex items-center justify-between gap-8 h-44 px-16 border-b border-fill-quaternary">
        <h2 className="text-small font-medium text-text-primary truncate">
          {node?.title ?? "No node selected"}
        </h2>
        <button
          type="button"
          aria-label="Node options"
          className="size-24 inline-flex items-center justify-center rounded-4 text-text-tertiary hover:bg-bg-tertiary hover:text-text-primary transition-colors"
        >
          <EllipsisHorizontalIcon className="size-16" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        {!node ? (
          <p className="text-mini text-text-tertiary text-center px-24 py-32">
            Click a node on the canvas to configure it.
          </p>
        ) : node.kind === "start" ? (
          <StartConfig workflow={workflow} />
        ) : node.kind === "end" ? (
          <EndConfig />
        ) : (
          <BodyNodeConfig node={node} />
        )}
      </div>
    </aside>
  );
}

/* ----------------------------- Start config ---------------------------- */

function StartConfig({ workflow }: { workflow: Workflow }) {
  return (
    <div className="px-16 py-16 space-y-16">
      <section className="space-y-8">
        <p className="text-mini font-medium text-text-tertiary uppercase tracking-wide">
          Input
        </p>
        <ul className="space-y-4">
          {workflow.inputs.map((input) => (
            <li key={input.id}>
              <InputChip name={input.name} type={input.type} />
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-4 text-mini font-medium text-text-secondary",
            "hover:text-text-primary transition-colors",
          )}
        >
          <PlusIcon className="size-12" />
          Add input
        </button>
      </section>

      <section className="space-y-6 pt-12 border-t border-fill-quaternary">
        <p className="text-mini font-medium text-text-tertiary uppercase tracking-wide">
          About
        </p>
        <p className="text-mini text-text-secondary leading-relaxed">
          The Start node defines the parameters a run is called with. Anything
          declared here becomes an input field on the run page.
        </p>
      </section>
    </div>
  );
}

function InputChip({ name, type }: { name: string; type: string }) {
  const id = useId();
  const typeGlyph = type === "string" ? "T" : type === "json" ? "{ }" : type === "array" ? "[ ]" : type === "number" ? "#" : "*";
  return (
    <div
      className={cn(
        "group flex items-center gap-8 h-32 px-8 rounded-6",
        "bg-bg-tertiary border border-fill-quaternary",
        "hover:border-fill-tertiary transition-colors",
      )}
    >
      <span
        aria-hidden
        className="size-16 inline-flex items-center justify-center rounded-4 bg-bg-secondary text-mini font-mono text-text-secondary shrink-0"
      >
        {typeGlyph}
      </span>
      <label htmlFor={id} className="text-mini font-medium text-text-primary truncate flex-1">
        {name}
      </label>
      <span className="hidden group-hover:inline-flex items-center gap-2">
        <button
          type="button"
          aria-label="Edit input"
          className="size-20 inline-flex items-center justify-center rounded-4 text-text-tertiary hover:bg-bg-secondary hover:text-text-primary"
        >
          <PencilIcon className="size-12" />
        </button>
        <button
          type="button"
          aria-label="Delete input"
          className="size-20 inline-flex items-center justify-center rounded-4 text-text-tertiary hover:bg-bg-secondary hover:text-text-red"
        >
          <TrashIcon className="size-12" />
        </button>
      </span>
    </div>
  );
}

/* ------------------------------ End config ----------------------------- */

function EndConfig() {
  return (
    <div className="px-16 py-16 space-y-12">
      <p className="text-mini text-text-secondary leading-relaxed">
        Marks the end of the run. Every upstream output is collected into the
        run result.
      </p>
    </div>
  );
}

/* ---------------------------- Body node config ------------------------- */

function BodyNodeConfig({ node }: { node: WorkflowNode }) {
  return (
    <div className="px-16 py-16 space-y-16">
      <section className="space-y-6">
        <p className="text-mini font-medium text-text-tertiary uppercase tracking-wide">
          Category
        </p>
        <p className="text-mini text-text-primary capitalize">{node.category}</p>
      </section>

      {node.output ? (
        <section className="space-y-6 pt-12 border-t border-fill-quaternary">
          <p className="text-mini font-medium text-text-tertiary uppercase tracking-wide">
            Output
          </p>
          <div className="flex items-center gap-8 h-32 px-8 rounded-6 bg-bg-tertiary border border-fill-quaternary">
            <span className="size-16 inline-flex items-center justify-center rounded-4 bg-bg-secondary text-mini font-mono text-text-secondary shrink-0">
              {node.output.type === "json" ? "{ }" : node.output.type === "array" ? "[ ]" : "T"}
            </span>
            <span className="text-mini font-medium text-text-primary truncate">
              {node.output.name}
            </span>
          </div>
        </section>
      ) : null}

      <section className="space-y-6 pt-12 border-t border-fill-quaternary">
        <p className="text-mini font-medium text-text-tertiary uppercase tracking-wide">
          Configuration
        </p>
        <p className="text-mini text-text-secondary leading-relaxed">
          Per-node configuration UI is deferred — the sandbox demonstrates
          structure, not the full {node.category} schema. Output above shows the
          shape downstream nodes can reference.
        </p>
        <Button size="sm" variant="default" className="mt-4">
          Open advanced
        </Button>
      </section>
    </div>
  );
}
