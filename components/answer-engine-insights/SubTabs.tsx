/**
 * SubTabs — underline tab strip for the AEI sub-tab row.
 *
 * Source: `_reference/profound/answer-engine-insights/notes.md` (sub-tab bar
 * with 8 tabs: Visibility/Prompts/Query Formats/Platforms/Regions/Personas/
 * Sentiment/Citations).
 *
 * Mirrors the Prompt Volumes underline pattern. Only "Overview" is active in
 * the sandbox; the rest are visible-but-disabled.
 */

"use client";

import { cn } from "@/lib/cn";
import type { AeiSubTab } from "@/lib/types/answer-engine-insights";
import { SUB_TABS } from "@/lib/types/answer-engine-insights";

export interface SubTabsProps {
  active: AeiSubTab;
  onChange?: (id: AeiSubTab) => void;
}

export function SubTabs({ active, onChange }: SubTabsProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "flex items-center gap-20 overflow-x-auto",
        "border-b border-fill-quaternary",
      )}
    >
      {SUB_TABS.map((tab) => {
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
