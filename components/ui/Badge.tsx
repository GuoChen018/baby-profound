"use client";

/**
 * Badge — chromatic pill for status, categories, and emphasis labels.
 *
 * Spec: _reference/figma/01-components/badges/design-context.md (Figma 1:8313)
 *
 * 8 colors × 2 sizes. Each color uses a three-token recipe:
 *   bg = <color>-muted, border = <color>-border, text/icon = <color>-emphasis
 */

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeColor =
  | "grey"
  | "green"
  | "red"
  | "blue"
  | "orange"
  | "amber"
  | "cyan"
  | "purple";

export type BadgeSize = "sm" | "md";

export interface BadgeProps {
  color?: BadgeColor;
  size?: BadgeSize;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const colorStyles: Record<BadgeColor, string> = {
  grey: "bg-badge-grey-muted border-badge-grey-border text-badge-grey-emphasis",
  green: "bg-badge-green-muted border-badge-green-border text-badge-green-emphasis",
  red: "bg-badge-red-muted border-badge-red-border text-badge-red-emphasis",
  blue: "bg-badge-blue-muted border-badge-blue-border text-badge-blue-emphasis",
  orange: "bg-badge-orange-muted border-badge-orange-border text-badge-orange-emphasis",
  amber: "bg-badge-amber-muted border-badge-amber-border text-badge-amber-emphasis",
  cyan: "bg-badge-cyan-muted border-badge-cyan-border text-badge-cyan-emphasis",
  purple: "bg-badge-purple-muted border-badge-purple-border text-badge-purple-emphasis",
};

const sizeStyles: Record<BadgeSize, string> = {
  // sm: h=18 px=6 gap=3 (only when icon)
  // md: h=22 px=7 gap=3
  sm: "h-18 px-6 gap-3 text-mini",
  md: "h-22 px-7 gap-3 text-mini",
};

export function Badge({
  color = "grey",
  size = "md",
  icon,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-medium",
        "rounded-full border-[1px]",
        "whitespace-nowrap",
        colorStyles[color],
        sizeStyles[size],
        className,
      )}
    >
      {icon ? <span className="inline-flex shrink-0 size-12">{icon}</span> : null}
      {children}
    </span>
  );
}
