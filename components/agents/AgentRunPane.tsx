/**
 * AgentRunPane — the two-pane "fill inputs, then run" surface.
 *
 * Source: `_reference/profound/agents/screenshot-agent-run.png`.
 *
 * Layout:
 *   - Left pane (form): agent name, description, divider, one input row per
 *     `agent.inputs[]`, a wide Run button + history-clock affordance, and a
 *     small "Estimated usage ⚡ ~N" footer aligned to the left.
 *   - Right pane (output): a skeleton showing the future output shape — one
 *     placeholder block per `agent.outputs[]`, with a glyph hinting at the
 *     return type. Centered "Begin by completing the inputs" empty message.
 *
 * No streaming yet — when the user hits Run we just flip a local
 * "submitted" flag and toast a placeholder. Plumbing real runs is out of
 * scope for the sandbox.
 */

"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui";
import { BoltIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type { Agent, AgentInputType } from "@/lib/types/agents";

export interface AgentRunPaneProps {
  agent: Agent;
}

export function AgentRunPane({ agent }: AgentRunPaneProps) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(agent.inputs.map((i) => [i.name, ""])),
  );

  const allRequiredFilled = useMemo(
    () =>
      agent.inputs
        .filter((i) => i.required)
        .every((i) => values[i.name]?.trim().length > 0),
    [agent.inputs, values],
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px] divide-x divide-fill-quaternary">
      {/* LEFT — input form */}
      <section className="flex flex-col px-32 py-32">
        <header className="space-y-12 pb-24 border-b border-fill-quaternary">
          <h1 className="text-title-mini font-semibold text-text-primary">
            {agent.name}
          </h1>
          <p className="text-small text-text-secondary leading-relaxed max-w-prose">
            {agent.description}
          </p>
        </header>

        <div className="pt-24 space-y-20 flex-1">
          {agent.inputs.map((input) => (
            <Input
              key={input.name}
              size="md"
              label={
                <span>
                  {input.name}
                  {input.required ? (
                    <span aria-hidden className="text-text-red ml-2">
                      *
                    </span>
                  ) : null}
                </span>
              }
              hint={input.hint}
              placeholder={input.placeholder ?? "Enter the value"}
              value={values[input.name] ?? ""}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, [input.name]: e.target.value }))
              }
            />
          ))}

          <RunButton disabled={!allRequiredFilled} />
        </div>

        <footer className="pt-24 mt-auto">
          <span className="inline-flex items-center gap-8 text-mini text-text-tertiary">
            Estimated usage
            <span className="inline-flex items-center gap-4 text-text-secondary px-6 py-2 rounded-full bg-bg-tertiary">
              <BoltIcon className="size-10" />~{agent.estimatedUsage}
            </span>
          </span>
        </footer>
      </section>

      {/* RIGHT — output preview */}
      <section className="relative flex items-center justify-center bg-bg-secondary/40 px-32 py-32 min-h-full">
        <OutputSkeleton blocks={agent.outputs.map((o) => o.type)} />
        <div className="relative text-center space-y-6 z-10">
          <p className="text-small font-medium text-text-primary">
            Begin by completing the inputs
          </p>
          <p className="text-small text-text-tertiary">
            Results will show up here after running the agent
          </p>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Run button — full-width with a trailing history-clock affordance.
// Matches the run page Run + clock pair from the capture.
// ─────────────────────────────────────────────────────────────────

function RunButton({ disabled }: { disabled: boolean }) {
  return (
    <div className="flex items-stretch gap-8">
      <button
        type="button"
        disabled={disabled}
        className={cn(
          "flex-1 inline-flex items-center justify-center gap-6",
          "h-36 rounded-6 text-small font-medium",
          "transition-colors duration-100",
          disabled
            ? "bg-bg-tertiary text-text-quaternary cursor-not-allowed"
            : "bg-fill-inverse text-control-primary hover:opacity-95",
        )}
      >
        <PlayIcon className="size-12" />
        Run
      </button>
      <button
        type="button"
        aria-label="Past runs"
        className={cn(
          "inline-flex items-center justify-center",
          "size-36 rounded-6",
          "bg-bg-tertiary text-text-tertiary",
          "hover:text-text-primary hover:bg-control-hover",
        )}
      >
        <ClockIcon className="size-14" />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Output skeleton — staggered grid of dim placeholder pills, each
// with a tiny type-glyph at the start. Reads as "preview of what's
// coming" without ever pretending to be real data.
// ─────────────────────────────────────────────────────────────────

function OutputSkeleton({ blocks }: { blocks: AgentInputType[] }) {
  const padded = [...blocks];
  while (padded.length < 9) padded.push("string");
  const cells = padded.slice(0, 9);

  return (
    <div
      aria-hidden
      className="absolute inset-32 grid grid-cols-3 gap-16 opacity-60 pointer-events-none"
    >
      {cells.map((type, idx) => (
        <SkeletonBlock key={idx} type={type} idx={idx} />
      ))}
    </div>
  );
}

function SkeletonBlock({ type, idx }: { type: AgentInputType; idx: number }) {
  // A handful of width / height shifts so the grid doesn't read as a
  // perfect lattice — closer to the staggered Profound capture.
  const heights = ["h-32", "h-40", "h-28", "h-44", "h-32", "h-36", "h-40", "h-30", "h-36"];
  return (
    <div
      className={cn(
        "rounded-6 bg-bg-tertiary/70",
        "flex items-center px-12 gap-8",
        heights[idx % heights.length],
      )}
    >
      <TypeGlyph type={type} />
      <span className="h-4 flex-1 rounded-full bg-fill-quaternary/70" />
    </div>
  );
}

function TypeGlyph({ type }: { type: AgentInputType }) {
  const baseCls = "inline-flex items-center justify-center size-14 text-text-tertiary text-[10px] font-mono";
  switch (type) {
    case "string":
      return <span className={baseCls}>T</span>;
    case "number":
      return <span className={baseCls}>#</span>;
    case "json":
      return <span className={baseCls}>{`{}`}</span>;
    case "array":
      return <span className={baseCls}>{`[]`}</span>;
  }
}

// ─────────────────────────────────────────────────────────────────
// Local glyphs (kept inline to avoid touching the icon barrel).
// ─────────────────────────────────────────────────────────────────

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden {...props}>
      <path d="M5 3.5v9l8-4.5-8-4.5Z" />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M8 4.5V8l2.5 1.5" />
    </svg>
  );
}

