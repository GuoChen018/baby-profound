"use client";

/**
 * PlatformChips — multi-select chip row for filtering which answer engines
 * the Ask agent should consider when generating its response.
 *
 * Sandbox extension on top of the live Profound product. We render the
 * available answer engines as small toggleable chips, each prefixed with
 * the brand-colored PlatformAvatar so it's instantly scannable.
 */

import { cn } from "@/lib/cn";
import { CheckCircleIcon } from "@/components/ui/icons";
import { platformChips } from "@/lib/data/ask";
import type { AskPlatform } from "@/lib/types/ask";
import { PlatformAvatar } from "./PlatformAvatar";

export interface PlatformChipsProps {
  selected: AskPlatform[];
  onChange: (next: AskPlatform[]) => void;
  className?: string;
}

export function PlatformChips({ selected, onChange, className }: PlatformChipsProps) {
  function toggle(id: AskPlatform) {
    if (selected.includes(id)) onChange(selected.filter((p) => p !== id));
    else onChange([...selected, id]);
  }
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-6", className)}>
      <span className="text-mini font-medium text-text-tertiary pr-4">
        Answer engines:
      </span>
      {platformChips.map((chip) => {
        const isOn = selected.includes(chip.id);
        return (
          <button
            key={chip.id}
            type="button"
            aria-pressed={isOn}
            onClick={() => toggle(chip.id)}
            className={cn(
              "inline-flex items-center gap-6 h-26 pl-4 pr-10 rounded-full",
              "text-mini font-medium",
              "transition-colors",
              "focus-visible:outline-none focus-visible:shadow-focus",
              isOn
                ? "bg-control-selected text-text-primary"
                : "bg-bg-secondary text-text-tertiary hover:text-text-primary",
            )}
          >
            <PlatformAvatar platform={chip.id} size={16} />
            {chip.label}
            {isOn ? <CheckCircleIcon className="size-12 text-text-primary" /> : null}
          </button>
        );
      })}
    </div>
  );
}
