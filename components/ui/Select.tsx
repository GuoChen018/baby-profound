"use client";

/**
 * Select — filter-pill trigger.
 *
 * Spec: _reference/figma/01-components/select/design-context.md (Figma 1:8431)
 *
 * NOT a native HTML <select>. This is the chip you click to open a dropdown.
 * Built as a styled button. The menu/popover integration is added later when
 * the Menu primitive lands; for now `onClick` is just a handler.
 *
 * Variants:
 *   - size: sm | md
 *   - state: default | active (active inverts to a black pill)
 *   - type: mono (chevron-up-down for single select) | multi (chevron-down)
 *   - leftIcon, counter (numeric pill for active-filter count)
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { ChevronDownIcon, ChevronUpDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export type SelectSize = "sm" | "md";

export interface SelectProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: SelectSize;
  /** When true, renders chevron-down (multi-select); when false, chevron-up-down (single). */
  multiple?: boolean;
  active?: boolean;
  iconLeft?: ReactNode;
  counter?: number;
}

const sizeStyles: Record<SelectSize, string> = {
  sm: "px-6 py-5 text-mini gap-5",
  md: "p-6 text-small gap-5",
};

const iconSize: Record<SelectSize, string> = {
  sm: "size-14",
  md: "size-16",
};

const counterSize: Record<SelectSize, string> = {
  sm: "size-14 text-[10px]",
  md: "size-16 text-[10px]",
};

export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    size = "md",
    multiple = true,
    active,
    iconLeft,
    counter,
    children,
    className,
    ...rest
  },
  ref,
) {
  const Chevron = multiple ? ChevronDownIcon : ChevronUpDownIcon;

  return (
    <button
      ref={ref}
      type="button"
      aria-haspopup="listbox"
      className={cn(
        "inline-flex items-center font-medium select-none whitespace-nowrap",
        "rounded-6 transition-colors duration-100",
        // Tailwind v4 preflight strips the default `cursor: pointer` from
        // <button> — opt back in so the select pill reads as clickable.
        "cursor-pointer",
        "focus-visible:outline-none focus-visible:shadow-focus",
        active
          ? "bg-control-primary text-text-inverse shadow-flat"
          : "bg-control-bg text-text-primary shadow-flat hover:bg-control-hover",
        sizeStyles[size],
        className,
      )}
      {...rest}
    >
      {iconLeft ? (
        <span className={cn("inline-flex shrink-0", iconSize[size])}>{iconLeft}</span>
      ) : null}
      {children ? <span className="pl-[2px] pr-2">{children}</span> : null}
      {typeof counter === "number" ? (
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-full font-medium",
            active
              ? "bg-fill-inverse text-text-primary"
              : "bg-fill-quaternary text-text-secondary",
            counterSize[size],
          )}
        >
          {counter}
        </span>
      ) : null}
      <span className={cn("inline-flex shrink-0 ml-2", iconSize[size])}>
        <Chevron />
      </span>
    </button>
  );
});
