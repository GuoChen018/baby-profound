"use client";

/**
 * SuggestedPromptList — the text-with-dividers list pattern from the
 * live Profound product (see `_reference/profound/ask/screenshot.png`).
 *
 * Each row is just a clickable label separated by a thin hairline. No card
 * chrome. Sits directly below the composer in the empty state. The list
 * content swaps based on Ask vs. Build mode.
 */

import { cn } from "@/lib/cn";
import type { SuggestedPrompt } from "@/lib/types/ask";

export interface SuggestedPromptListProps {
  prompts: SuggestedPrompt[];
  onPick: (prompt: SuggestedPrompt) => void;
  className?: string;
}

export function SuggestedPromptList({
  prompts,
  onPick,
  className,
}: SuggestedPromptListProps) {
  return (
    <ul className={cn("w-full", className)}>
      {prompts.map((p, idx) => (
        <li
          key={p.id}
          className={cn(idx > 0 && "border-t border-fill-quaternary")}
        >
          <button
            type="button"
            onClick={() => onPick(p)}
            className={cn(
              "w-full text-left h-36 px-4",
              "text-small text-text-secondary",
              "hover:text-text-primary transition-colors",
              "focus-visible:outline-none focus-visible:shadow-focus rounded-4",
            )}
          >
            {p.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
