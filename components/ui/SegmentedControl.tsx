"use client";

/**
 * SegmentedControl — time-range / interval selector.
 *
 * Spec: _reference/figma/01-components/segmented-control/design-context.md
 * (Figma 1:8293)
 *
 * Container: bg-bg-primary, radius-4, shadow-flat. Selected segment lifts
 * via its own shadow-flat creating a "raised tile" feel. Unselected
 * segments sit on bg-secondary with a 1px left divider.
 */

import { cn } from "@/lib/cn";

export interface SegmentedControlOption<V extends string = string> {
  label: string;
  value: V;
}

export interface SegmentedControlProps<V extends string = string> {
  options: SegmentedControlOption<V>[];
  value: V;
  onChange: (value: V) => void;
  className?: string;
}

export function SegmentedControl<V extends string = string>({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps<V>) {
  return (
    <div
      role="radiogroup"
      className={cn(
        "inline-flex items-stretch shadow-flat rounded-4 bg-bg-primary overflow-hidden",
        className,
      )}
    >
      {options.map((opt, i) => {
        const isSelected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative px-12 py-6 text-small whitespace-nowrap",
              "transition-colors duration-100",
              "focus-visible:outline-none focus-visible:z-10 focus-visible:shadow-focus",
              isSelected
                ? "bg-control-bg text-text-primary font-medium shadow-flat rounded-4"
                : "bg-bg-secondary text-text-tertiary hover:text-text-primary",
              !isSelected && i > 0 && "border-l border-fill-quaternary",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
