"use client";

/**
 * ContentDetailToolbar — top bar of the content detail view.
 *
 * Source: `_reference/profound/content/screenshot-content-detail.png`.
 *
 * Layout: `‹ Back` link · title input · "Document saved" pill · status
 * dropdown · Copy ▾ · Export ▾.
 *
 * Notes:
 *   - The title is rendered as an `<input>` (no label) — matches the
 *     in-place editable title in the capture.
 *   - Copy and Export are split-buttons in the real product. We don't
 *     have a SplitButton primitive yet (called out in
 *     `_reference/profound/content/notes.md`), so this approximates with
 *     a tight "label + chevron" Button. Promote later.
 */

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDownTrayIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
} from "@/components/ui/icons";
import { Badge, Button } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { ContentStatus } from "@/lib/types/content";
import { StatusPill } from "./StatusPill";

export interface ContentDetailToolbarProps {
  initialTitle: string;
  status: ContentStatus;
}

export function ContentDetailToolbar({
  initialTitle,
  status,
}: ContentDetailToolbarProps) {
  const [title, setTitle] = useState(initialTitle);

  return (
    <header
      className={cn(
        "flex items-center gap-12 px-24 py-12",
        "border-b border-fill-quaternary bg-bg-primary",
      )}
    >
      <Link
        href="/content"
        className={cn(
          "inline-flex items-center gap-4 text-small text-text-secondary",
          "hover:text-text-primary transition-colors",
          "focus-visible:outline-none focus-visible:text-text-primary",
        )}
      >
        <ChevronLeftIcon className="size-14" />
        Back
      </Link>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Document title"
        className={cn(
          "min-w-0 flex-1 truncate bg-transparent",
          "text-small font-medium text-text-primary",
          "placeholder:text-text-tertiary",
          "focus:outline-none focus:bg-bg-tertiary rounded-4 px-8 py-4",
        )}
      />

      <Badge color="green" size="sm" icon={<CheckCircleIcon />}>
        Document saved
      </Badge>

      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-6 px-10 h-28 rounded-6",
          "bg-control-bg shadow-flat",
          "text-small text-text-primary",
          "hover:bg-control-hover transition-colors",
        )}
      >
        <StatusPill status={status} variant="dot" />
        <ChevronDownIcon className="size-12 text-text-tertiary" />
      </button>

      <Button
        size="md"
        iconRight={<ChevronDownIcon className="size-12" />}
      >
        Copy
      </Button>

      <Button
        size="md"
        iconLeft={<ArrowDownTrayIcon />}
        iconRight={<ChevronDownIcon className="size-12" />}
      >
        Export
      </Button>
    </header>
  );
}
