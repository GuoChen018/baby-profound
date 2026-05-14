"use client";

/**
 * SplitButton — primary action paired with a dropdown caret.
 *
 * Source: Agents `+ New Agent ▾`, editor `Run test ▾` / `Publish changes ▾`,
 * Content tab `Draft ▾` / `Export ▾`. Visually one pill with two clickable
 * regions joined by a hairline divider.
 *
 * Built locally inside `components/agents/` for now. Notes call this out
 * as a primitive worth promoting to `components/ui/SplitButton.tsx` once a
 * second tab needs it (Content tab is the next consumer).
 *
 * Variants:
 *   - inverse (default) — bright pill on dark surfaces (the bright "+ New Agent")
 *   - default            — `control-bg` flat pill (the editor's `Run test`)
 */

import { type ReactNode } from "react";
import { ChevronDownIcon, PlusIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export type SplitButtonVariant = "inverse" | "default";
export type SplitButtonSize = "sm" | "md";

export interface SplitButtonProps {
  variant?: SplitButtonVariant;
  size?: SplitButtonSize;
  /** Label rendered in the primary action half. */
  children: ReactNode;
  /** Optional icon rendered before the label. Defaults to a `+` for the inverse variant. */
  iconLeft?: ReactNode;
  onAction?: () => void;
  onCaret?: () => void;
  disabled?: boolean;
  className?: string;
  /** Accessible label for the caret half. */
  caretLabel?: string;
}

const sizeStyles: Record<SplitButtonSize, { wrapper: string; pad: string }> = {
  sm: { wrapper: "h-24 text-mini", pad: "px-8 gap-4" },
  md: { wrapper: "h-28 text-small", pad: "px-10 gap-6" },
};

const caretWidth: Record<SplitButtonSize, string> = {
  sm: "w-22",
  md: "w-26",
};

const variantStyles: Record<SplitButtonVariant, {
  shell: string;
  hover: string;
  divider: string;
  text: string;
}> = {
  inverse: {
    // Stable bright surface in both themes — `--fill-inverse` is white in
    // light AND dark (no override in globals.css), so this stays high-contrast.
    shell: "bg-fill-inverse",
    hover: "hover:bg-fill-inverse/90",
    divider: "bg-fill-quaternary/60",
    text: "text-control-primary",
  },
  default: {
    shell: "bg-control-bg shadow-flat",
    hover: "hover:bg-control-hover",
    divider: "bg-fill-quaternary",
    text: "text-text-primary",
  },
};

export function SplitButton({
  variant = "inverse",
  size = "md",
  children,
  iconLeft,
  onAction,
  onCaret,
  disabled,
  className,
  caretLabel = "Open menu",
}: SplitButtonProps) {
  const v = variantStyles[variant];
  const s = sizeStyles[size];
  // `iconLeft === undefined` → fall back to variant default (+ for inverse).
  // `iconLeft === null` → explicitly suppress, no icon rendered.
  const resolvedIcon =
    iconLeft === undefined
      ? variant === "inverse"
        ? <PlusIcon className="size-14" />
        : null
      : iconLeft;

  return (
    <div
      className={cn(
        "inline-flex items-stretch select-none rounded-6 overflow-hidden",
        "transition-colors duration-100",
        "focus-within:shadow-focus",
        v.shell,
        s.wrapper,
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={onAction}
        className={cn(
          "inline-flex items-center font-medium whitespace-nowrap",
          "focus-visible:outline-none",
          v.text,
          v.hover,
          s.pad,
        )}
      >
        {resolvedIcon ? (
          <span className="inline-flex shrink-0 size-14">{resolvedIcon}</span>
        ) : null}
        <span>{children}</span>
      </button>
      <span aria-hidden className={cn("w-[1px] my-4", v.divider)} />
      <button
        type="button"
        disabled={disabled}
        onClick={onCaret}
        aria-label={caretLabel}
        className={cn(
          "inline-flex items-center justify-center",
          "focus-visible:outline-none",
          v.text,
          v.hover,
          caretWidth[size],
        )}
      >
        <ChevronDownIcon className="size-14" />
      </button>
    </div>
  );
}
