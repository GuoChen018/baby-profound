/**
 * StatusPill — colored dot + label, the workhorse status indicator used
 * in the Recent Agents table (Published / Unpublished / Draft).
 *
 * Source: `_reference/profound/agents/screenshot.png` — `● Published` (green)
 * and `● Unpublished` (yellow/orange) appear in the Status column.
 *
 * Promote candidate: `components/ui/StatusPill.tsx`. Same shape will appear
 * in the Content tab (Draft / Live / Scheduled).
 *
 * Distinct from Badge (chromatic pill) — StatusPill is just a 6px dot +
 * inline label rendered at body color; the dot carries the chrome.
 */

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type StatusTone = "green" | "amber" | "red" | "grey" | "blue";

export interface StatusPillProps {
  tone: StatusTone;
  children: ReactNode;
  className?: string;
}

const dotStyles: Record<StatusTone, string> = {
  green: "bg-fill-green",
  amber: "bg-badge-amber-emphasis",
  red: "bg-fill-red",
  grey: "bg-text-tertiary",
  blue: "bg-accent-beta",
};

export function StatusPill({ tone, children, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-8 text-small text-text-primary",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("inline-block size-6 rounded-full shrink-0", dotStyles[tone])}
      />
      <span className="whitespace-nowrap">{children}</span>
    </span>
  );
}
