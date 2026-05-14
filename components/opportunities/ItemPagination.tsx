/**
 * ItemPagination — "1 / 4" with prev/next chevron buttons.
 *
 * Used on the Opportunities detail page (top-right). Lets the user move
 * through the list without going back to the index. The Profound capture
 * uses a chevron-DOWN for "next" and chevron-UP for "previous"; we mirror
 * that here. ChevronUpIcon isn't yet exported from `@/components/ui/icons`
 * so we rotate the down-chevron 180° for the prev button.
 *
 * Renders as plain `<a>` links rather than client-state `<button>`s so the
 * detail page can stay a server component and we get free middle-click /
 * cmd-click navigation between opportunities. Disables itself at the ends.
 *
 * Local primitive — promote to `components/ui/ItemPagination.tsx` if a
 * second tab (Sheets row detail? Knowledge-bases doc detail?) needs the
 * same control.
 */

import Link from "next/link";
import { ChevronDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export interface ItemPaginationProps {
  /** 1-based current position. */
  current: number;
  total: number;
  /** Hrefs for prev / next; undefined when at the end. */
  prevHref?: string;
  nextHref?: string;
  className?: string;
}

export function ItemPagination({
  current,
  total,
  prevHref,
  nextHref,
  className,
}: ItemPaginationProps) {
  return (
    <nav
      aria-label="Opportunity pagination"
      className={cn(
        "inline-flex items-center gap-12 text-small text-text-secondary",
        className,
      )}
    >
      <span className="tabular-nums">
        <span className="text-text-primary font-medium">{current}</span>
        <span className="px-4 text-text-tertiary">/</span>
        <span>{total}</span>
      </span>
      <div className="inline-flex items-center gap-4">
        <ArrowButton
          href={prevHref}
          direction="prev"
          label="Previous opportunity"
        />
        <ArrowButton href={nextHref} direction="next" label="Next opportunity" />
      </div>
    </nav>
  );
}

function ArrowButton({
  href,
  direction,
  label,
}: {
  href?: string;
  direction: "prev" | "next";
  label: string;
}) {
  const className = cn(
    "inline-flex items-center justify-center size-24 rounded-4",
    "shadow-flat bg-control-bg text-text-secondary",
    "transition-colors duration-100",
    "hover:bg-control-hover hover:text-text-primary",
    "focus-visible:outline-none focus-visible:shadow-focus",
    !href && "opacity-40 pointer-events-none",
  );
  const icon = (
    <ChevronDownIcon
      aria-hidden
      className={cn("size-14", direction === "prev" && "rotate-180")}
    />
  );

  if (!href) {
    return (
      <span aria-disabled="true" className={className} aria-label={label}>
        {icon}
      </span>
    );
  }
  return (
    <Link href={href} aria-label={label} className={className}>
      {icon}
    </Link>
  );
}
