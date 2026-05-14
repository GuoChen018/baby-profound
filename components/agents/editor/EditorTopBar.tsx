"use client";

/**
 * Editor top bar — back link + agent name + actions.
 *
 * Anatomy (from `_reference/profound/agents/notes.md` View 3, line 1):
 *   `‹` back · agent name · `...` overflow ··· `▶ Run test ▾` · `Publish changes ▾`
 *
 * Sits at the top of the full-screen editor — fixed 44px height, hairline
 * bottom border to separate from the canvas.
 */

import Link from "next/link";
import {
  ArrowLeftIcon,
  EllipsisHorizontalIcon,
  PlayIcon,
} from "@/components/ui/icons";
import { SplitButton } from "@/components/agents/SplitButton";

export interface EditorTopBarProps {
  agentId: string;
  agentName: string;
}

export function EditorTopBar({ agentId, agentName }: EditorTopBarProps) {
  return (
    <header className="h-44 shrink-0 flex items-center justify-between gap-12 px-12 border-b border-fill-quaternary bg-bg-primary">
      <div className="flex items-center gap-8 min-w-0">
        <Link
          href={`/agents/${agentId}`}
          aria-label="Back"
          className="size-28 inline-flex items-center justify-center rounded-6 text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-colors"
        >
          <ArrowLeftIcon className="size-16" />
        </Link>
        <h1 className="text-small font-medium text-text-primary truncate">
          {agentName}
        </h1>
        <button
          type="button"
          aria-label="Agent options"
          className="size-28 inline-flex items-center justify-center rounded-6 text-text-tertiary hover:bg-bg-tertiary hover:text-text-primary transition-colors"
        >
          <EllipsisHorizontalIcon className="size-16" />
        </button>
      </div>

      <div className="flex items-center gap-8 shrink-0">
        <SplitButton
          variant="default"
          size="sm"
          iconLeft={<PlayIcon className="size-12" />}
          caretLabel="Run test options"
        >
          Run test
        </SplitButton>
        <SplitButton variant="inverse" size="sm" iconLeft={null} caretLabel="Publish options">
          Publish changes
        </SplitButton>
      </div>
    </header>
  );
}
