"use client";

/**
 * AskTopBar — the title row at the top of the Ask surface.
 *
 * Empty / Building states:  "Untitled chat ▾"        +  Beta pill
 * Conversation state:        "<chat title> ▾"        +  Beta pill   |   "New chat ↗" + "…"
 *
 * Captured from both Ask screenshots in `_reference/profound/ask/`.
 */

import { ChevronDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { NewChatIcon, OverflowIcon } from "./icons";

export interface AskTopBarProps {
  title: string;
  /** Show "New chat ↗" + overflow on the right. Used in conversation state. */
  showActions?: boolean;
  onNewChat?: () => void;
  className?: string;
}

export function AskTopBar({
  title,
  showActions,
  onNewChat,
  className,
}: AskTopBarProps) {
  return (
    <header
      className={cn(
        "shrink-0 h-52 px-20 flex items-center justify-between gap-16",
        "border-b-[0.5px] border-fill-quaternary",
        className,
      )}
    >
      <div className="flex items-center gap-10 min-w-0">
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-4 max-w-360 min-w-0",
            "h-28 px-6 rounded-6",
            "text-small text-text-primary",
            "hover:bg-bg-tertiary transition-colors",
            "focus-visible:outline-none focus-visible:shadow-focus",
          )}
        >
          <span className="truncate">{title}</span>
          <ChevronDownIcon className="size-12 shrink-0 text-text-tertiary" />
        </button>
        <span className="text-mini font-medium px-6 py-2 rounded-4 text-accent-beta bg-accent-beta/10">
          Beta
        </span>
      </div>

      {showActions ? (
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onNewChat}
            className={cn(
              "inline-flex items-center gap-6 h-28 px-10 rounded-6",
              "bg-control-bg text-text-primary shadow-flat",
              "text-small font-medium",
              "hover:bg-control-hover transition-colors",
              "focus-visible:outline-none focus-visible:shadow-focus",
            )}
          >
            New chat
            <NewChatIcon className="size-14 text-text-secondary" />
          </button>
          <button
            type="button"
            aria-label="More"
            className={cn(
              "inline-flex items-center justify-center size-28 rounded-6",
              "text-text-tertiary hover:text-text-primary hover:bg-bg-tertiary",
              "transition-colors",
              "focus-visible:outline-none focus-visible:shadow-focus",
            )}
          >
            <OverflowIcon className="size-16" />
          </button>
        </div>
      ) : null}
    </header>
  );
}
