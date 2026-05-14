"use client";

/**
 * SuggestedPromptChips — pill-shaped clickable suggestions surfaced ABOVE
 * the hero composer in the empty state. Diverges from the live Profound
 * product (which only shows the text-list-with-dividers) — this is a
 * sandbox extension to make the surface feel more inviting for first-time
 * users with no chat history.
 */

import { SparklesIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { Tag } from "@/components/ui";
import type { SuggestedPrompt } from "@/lib/types/ask";

export interface SuggestedPromptChipsProps {
  prompts: SuggestedPrompt[];
  onPick: (prompt: SuggestedPrompt) => void;
  className?: string;
}

export function SuggestedPromptChips({
  prompts,
  onPick,
  className,
}: SuggestedPromptChipsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-8",
        className,
      )}
    >
      {prompts.map((p) => (
        <Tag
          key={p.id}
          size="sm"
          iconLeft={<SparklesIcon className="size-12 text-text-tertiary" />}
          onClick={() => onPick(p)}
          className="bg-bg-secondary hover:bg-bg-tertiary"
        >
          {p.label}
        </Tag>
      ))}
    </div>
  );
}
