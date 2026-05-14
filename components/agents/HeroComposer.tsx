/**
 * HeroComposer — the centered "What do you want to build?" composer.
 *
 * Source: Agents Overview hero in `_reference/profound/agents/screenshot.png`.
 * The same shape powers the Ask tab; promote candidate once we model Ask.
 *
 * Anatomy:
 *   - Centered title with sparkle prefix: "What do you want to build?"
 *   - Dark composer pill, ~600px wide, with placeholder text + bottom-right
 *     mic icon + send button (disabled while empty).
 */

"use client";

import { useState, type FormEvent } from "react";
import { SparklesIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export interface HeroComposerProps {
  title?: string;
  placeholder?: string;
  /** Width hint — falls back to a centered max-w-600 column. */
  className?: string;
  onSubmit?: (value: string) => void;
}

export function HeroComposer({
  title = "What do you want to build?",
  placeholder = "Describe the agent you want to build…",
  className,
  onSubmit,
}: HeroComposerProps) {
  const [value, setValue] = useState("");
  const canSubmit = value.trim().length > 0;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit?.(value.trim());
  }

  return (
    <section className={cn("mx-auto max-w-600 space-y-16", className)}>
      <h2 className="flex items-center justify-center gap-8 text-base font-medium text-text-primary">
        <SparklesIcon className="size-16 text-text-tertiary" />
        {title}
      </h2>

      <form
        onSubmit={handleSubmit}
        className={cn(
          "rounded-8 bg-bg-secondary",
          "border border-fill-quaternary",
          "p-12 pb-8 transition-shadow duration-100",
          "focus-within:border-fill-tertiary",
        )}
      >
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={3}
          placeholder={placeholder}
          className={cn(
            "block w-full resize-none bg-transparent outline-none",
            "text-small text-text-primary placeholder:text-text-tertiary",
            "leading-relaxed",
          )}
        />
        <div className="flex items-center justify-end gap-8 pt-4">
          <button
            type="button"
            aria-label="Voice input"
            className={cn(
              "inline-flex items-center justify-center size-24 rounded-full",
              "text-text-tertiary hover:text-text-primary",
            )}
          >
            <MicIcon className="size-14" />
          </button>
          <button
            type="submit"
            aria-label="Send"
            disabled={!canSubmit}
            className={cn(
              "inline-flex items-center justify-center size-24 rounded-full",
              "transition-colors",
              canSubmit
                ? "bg-fill-inverse text-control-primary hover:opacity-90"
                : "bg-fill-quaternary text-text-quaternary cursor-not-allowed",
            )}
          >
            <ArrowUpIcon className="size-14" />
          </button>
        </div>
      </form>
    </section>
  );
}

// Small inline glyphs we don't already export from @/components/ui/icons.
// Inlined to avoid touching the icons barrel for tab-local affordances.

function MicIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden {...props}>
      <path d="M8 1.5a2.5 2.5 0 0 0-2.5 2.5v3a2.5 2.5 0 0 0 5 0V4A2.5 2.5 0 0 0 8 1.5Z" />
      <path d="M3.75 7.5a.75.75 0 0 1 .75.75 3.5 3.5 0 0 0 7 0 .75.75 0 0 1 1.5 0 5 5 0 0 1-4.25 4.95V14h2a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1 0-1.5h2v-.8A5 5 0 0 1 3 8.25a.75.75 0 0 1 .75-.75Z" />
    </svg>
  );
}

function ArrowUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M8 13V3" />
      <path d="m3.5 7.5 4.5-4.5 4.5 4.5" />
    </svg>
  );
}
