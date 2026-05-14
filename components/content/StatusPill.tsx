/**
 * StatusPill — local helper for ContentStatus.
 *
 * Source: `_reference/profound/content/screenshot.png` Status column.
 * The Profound capture shows a green muted pill for "Completed" — same
 * recipe as `Badge color="green"`. We derive the color per status here
 * so callers stay declarative.
 *
 * Variants:
 *   - "pill"    (default) — solid muted pill, used in the Status column.
 *   - "dot"     — colored dot + label, used inside dropdown buttons
 *                 ("● Draft ▾" in the action column).
 *
 * NOTE: this lives in `components/content/` for now. If a second tab
 * needs the same "ContentStatus → BadgeColor" mapping, promote it to
 * `components/ui/StatusPill.tsx`.
 */

import { Badge, type BadgeColor } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { ContentStatus } from "@/lib/types/content";

const statusColor: Record<ContentStatus, BadgeColor> = {
  Draft: "orange",
  Completed: "green",
  Published: "blue",
  Archived: "grey",
};

/** Solid CSS color for the bare dot variant (matches each badge's emphasis). */
const statusDot: Record<ContentStatus, string> = {
  Draft: "bg-badge-orange-emphasis",
  Completed: "bg-badge-green-emphasis",
  Published: "bg-badge-blue-emphasis",
  Archived: "bg-text-tertiary",
};

export interface StatusPillProps {
  status: ContentStatus;
  variant?: "pill" | "dot";
  className?: string;
}

export function StatusPill({
  status,
  variant = "pill",
  className,
}: StatusPillProps) {
  if (variant === "dot") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-6 text-small text-text-primary",
          className,
        )}
      >
        <span
          className={cn("inline-block size-6 rounded-full", statusDot[status])}
          aria-hidden
        />
        {status}
      </span>
    );
  }

  return (
    <Badge color={statusColor[status]} className={className}>
      {status}
    </Badge>
  );
}
