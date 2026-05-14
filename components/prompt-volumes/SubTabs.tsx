/**
 * SubTabs — underline tab strip rendered inside `PageHeader.tabs`.
 *
 * Source: `_reference/profound/prompt-volumes/screenshot.png` — "Relevant
 * Prompts" sits underlined, "Keyword Lists" is muted. We mirror that
 * pattern for "Prompt Explorer / Keyword Lists".
 *
 * Local to this tab — Profound only uses underline tabs in a couple of
 * places, so we don't promote yet.
 */

"use client";

import { cn } from "@/lib/cn";
import type { PromptVolumesSubTab } from "@/lib/types/prompt-volumes";

interface Tab {
  id: PromptVolumesSubTab;
  label: string;
  disabled?: boolean;
}

const TABS: Tab[] = [
  { id: "prompt-explorer", label: "Prompt Explorer" },
  { id: "keyword-lists", label: "Keyword Lists", disabled: true },
];

export interface SubTabsProps {
  active: PromptVolumesSubTab;
  onChange?: (id: PromptVolumesSubTab) => void;
}

export function SubTabs({ active, onChange }: SubTabsProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "flex items-center gap-20",
        "border-b border-fill-quaternary",
      )}
    >
      {TABS.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            disabled={tab.disabled}
            onClick={() => onChange?.(tab.id)}
            className={cn(
              "relative -mb-1 pb-8 text-small font-medium whitespace-nowrap",
              "transition-colors",
              "focus-visible:outline-none focus-visible:text-text-primary",
              isActive
                ? "text-text-primary"
                : "text-text-tertiary hover:text-text-secondary",
              tab.disabled && "cursor-not-allowed opacity-60 hover:text-text-tertiary",
            )}
          >
            {tab.label}
            {isActive ? (
              <span
                aria-hidden
                className="absolute left-0 right-0 -bottom-[1px] h-[2px] rounded-full bg-text-primary"
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
