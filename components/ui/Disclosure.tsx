/**
 * Disclosure — collapsible section with chevron summary row.
 *
 * Source: `_reference/profound/opportunities/notes.md` (Implementation /
 * Rationale sections).
 */

"use client";

import { type ReactNode, useState } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export interface DisclosureProps {
  summary: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string;
}

export function Disclosure({
  summary,
  defaultOpen = true,
  children,
  className,
}: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <details
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
      className={cn("group", className)}
    >
      <summary
        className={cn(
          "list-none cursor-pointer select-none",
          "inline-flex items-center gap-6",
          "text-small font-medium text-text-primary",
          "focus-visible:outline-none focus-visible:shadow-focus rounded-4",
        )}
      >
        <ChevronDownIcon
          aria-hidden
          className={cn(
            "size-14 text-text-secondary transition-transform",
            !open && "-rotate-90",
          )}
        />
        {summary}
      </summary>
      <div className="pt-12">{children}</div>
    </details>
  );
}
