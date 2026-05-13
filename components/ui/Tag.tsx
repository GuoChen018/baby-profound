"use client";

/**
 * Tag — monochromatic pill for labels and chips.
 *
 * Spec: _reference/figma/01-components/tag/design-context.md (Figma 1:8583)
 *
 * Differs from Badge (which is chromatic) and Button (which is the primary
 * action surface). Tag is the workhorse for hover-and-tap labels like
 * citation chips, attribute tags, "+3 more" overflow.
 */

import { forwardRef, type MouseEventHandler, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type TagSize = "sm" | "md" | "lg";

export interface TagProps {
  size?: TagSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children?: ReactNode;
  className?: string;
  /** Render as a static span instead of an interactive button. Default false. */
  asSpan?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  "aria-label"?: string;
}

const sizeStyles: Record<TagSize, string> = {
  sm: "px-10 py-7 text-mini gap-8",
  md: "px-12 py-6 text-small gap-8",
  lg: "px-16 py-10 text-small gap-8",
};

const iconSize: Record<TagSize, string> = {
  sm: "size-14",
  md: "size-16",
  lg: "size-16",
};

export const Tag = forwardRef<HTMLElement, TagProps>(function Tag(
  { size = "md", iconLeft, iconRight, children, className, asSpan, onClick, ...rest },
  ref,
) {
  const cls = cn(
    "inline-flex items-center font-medium select-none",
    "rounded-full",
    "bg-bg-tertiary text-text-primary",
    !asSpan &&
      "transition-colors duration-100 cursor-pointer hover:bg-fill-quaternary focus-visible:outline-none focus-visible:shadow-focus",
    sizeStyles[size],
    className,
  );

  const content = (
    <>
      {iconLeft ? (
        <span className={cn("inline-flex shrink-0", iconSize[size])}>{iconLeft}</span>
      ) : null}
      {children ? <span className="whitespace-nowrap">{children}</span> : null}
      {iconRight ? (
        <span className={cn("inline-flex shrink-0", iconSize[size])}>{iconRight}</span>
      ) : null}
    </>
  );

  if (asSpan) {
    return (
      <span ref={ref as React.Ref<HTMLSpanElement>} className={cls} {...rest}>
        {content}
      </span>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      className={cls}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
});
