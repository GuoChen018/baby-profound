/**
 * PromptExplorer — the hero composer surface from
 * `_reference/profound/prompt-volumes/screenshot.png`.
 *
 * Anatomy (top → bottom):
 *   1. Hero band — flat dark panel, centered title.
 *   2. Composer card — multi-row pill containing:
 *        - text input (`Enter a keyword...`)
 *        - bottom toolbar: left = config glyphs · right = Bulk-analysis
 *          toggle + Analyze button (disabled until input filled).
 *   3. Seed-prompt chips — chip group with X-to-remove + "+ Add prompt"
 *      ghost button. (This composes the user-requested "added prompts"
 *      affordance with the screenshot's composer surface.)
 *
 * The composer is fully controlled here for the sandbox: typing enables
 * Analyze, X removes a chip, "+ Add prompt" pushes the current input as
 * a new chip. No network — purely visual fidelity.
 */

"use client";

import { useState, type FormEvent } from "react";
import {
  Cog6ToothIcon,
  PlusIcon,
  SparklesIcon,
  XMarkIcon,
} from "@/components/ui/icons";
import { Button, Tag, Toggle } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { SeedPrompt } from "@/lib/types/prompt-volumes";

export interface PromptExplorerProps {
  seedPrompts: SeedPrompt[];
}

export function PromptExplorer({ seedPrompts }: PromptExplorerProps) {
  const [input, setInput] = useState("");
  const [bulk, setBulk] = useState(false);
  const [chips, setChips] = useState<SeedPrompt[]>(seedPrompts);

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setChips((prev) => [
      ...prev,
      { id: `seed-${Date.now()}`, text },
    ]);
    setInput("");
  };

  const handleRemove = (id: string) => {
    setChips((prev) => prev.filter((c) => c.id !== id));
  };

  const canAnalyze = input.trim().length > 0 || chips.length > 0;

  return (
    <section
      className={cn(
        // Flat dark hero panel — sits on bg-bg-secondary so it lifts
        // slightly off the page.
        "rounded-8 bg-bg-secondary",
        "border border-fill-quaternary",
        "px-32 py-40",
      )}
    >
      <div className="mx-auto max-w-640 space-y-24">
        <h2 className="text-center text-title-mini font-semibold text-text-primary">
          Explore what people are prompting in AI
        </h2>

        {/* Composer card */}
        <form
          onSubmit={handleAdd}
          className={cn(
            "rounded-8 bg-control-bg shadow-flat",
            "px-16 pt-14 pb-8",
            "focus-within:shadow-focus transition-shadow",
            "space-y-8",
          )}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={bulk ? "Paste prompts, one per line…" : "Enter a keyword…"}
            className={cn(
              "block w-full bg-transparent outline-none",
              "text-base text-text-primary placeholder:text-text-tertiary",
            )}
          />

          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <ComposerIconButton label="Detect intent">
                <SparklesIcon className="size-14" />
              </ComposerIconButton>
              <ComposerIconButton label="Composer settings">
                <Cog6ToothIcon className="size-14" />
              </ComposerIconButton>
            </div>

            <div className="flex items-center gap-4">
              <Toggle
                label="Bulk analysis"
                checked={bulk}
                onCheckedChange={setBulk}
              />
              {/* `inverse` variant collapses to white-on-white in dark mode
                  (both `--fill-primary` and `--text-inverse` resolve to #fff),
                  so we stick with `default` and lean on the disabled state
                  to communicate availability — same affordance as the live
                  product when the composer is empty. */}
              <Button
                type="submit"
                size="md"
                variant="default"
                disabled={!canAnalyze}
              >
                Analyze
              </Button>
            </div>
          </div>
        </form>

        {/* Seed prompt chips */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {chips.map((chip) => (
            <Tag
              key={chip.id}
              size="sm"
              asSpan
              className={cn(
                // Make the chip look like a removable tag.
                "pr-2 group",
              )}
            >
              <span className="px-2">{chip.text}</span>
              <button
                type="button"
                onClick={() => handleRemove(chip.id)}
                aria-label={`Remove ${chip.text}`}
                className={cn(
                  "inline-flex items-center justify-center",
                  "size-16 rounded-full",
                  "text-text-tertiary hover:text-text-primary hover:bg-fill-quaternary",
                  "transition-colors",
                )}
              >
                <XMarkIcon className="size-12" />
              </button>
            </Tag>
          ))}

          <Button
            size="sm"
            variant="ghost"
            iconLeft={<PlusIcon />}
            onClick={() => {
              const text = input.trim();
              if (!text) return;
              setChips((prev) => [
                ...prev,
                { id: `seed-${Date.now()}`, text },
              ]);
              setInput("");
            }}
          >
            Add prompt
          </Button>
        </div>
      </div>
    </section>
  );
}

function ComposerIconButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center",
        "size-24 rounded-6",
        "text-text-tertiary hover:text-text-primary hover:bg-control-hover",
        "transition-colors",
        "focus-visible:outline-none focus-visible:shadow-focus",
      )}
    >
      {children}
    </button>
  );
}
