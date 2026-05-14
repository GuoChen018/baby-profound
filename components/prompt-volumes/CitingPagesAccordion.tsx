/**
 * CitingPagesAccordion — collapsible list of pages on the tracked domain
 * with the prompts that drove citations to each.
 *
 * Why a custom accordion instead of `<Disclosure>`:
 *   - Each row needs a full-width summary with both a chevron-toggle on
 *     the left AND an external-link icon on the right. The right icon is
 *     a sibling action (not a toggle), so we control state ourselves
 *     rather than relying on `<details>`.
 *   - The expanded panel renders an inline `<Table>` with three columns
 *     (User Prompt · Cited Websites · Date Asked). The first row is
 *     expanded by default to mirror the screenshot.
 *
 * Source: `_reference/profound/prompt-volumes/screenshot.png`.
 */

"use client";

import { useState } from "react";
import {
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
  InformationCircleIcon,
} from "@/components/ui/icons";
import { Button, Table } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { CitingPage } from "@/lib/types/prompt-volumes";
import { formatDateAsked } from "@/lib/data/prompt-volumes";
import { PlatformAvatarStack } from "./PlatformAvatarStack";

export interface CitingPagesAccordionProps {
  pages: CitingPage[];
  domain: string;
}

export function CitingPagesAccordion({
  pages,
  domain,
}: CitingPagesAccordionProps) {
  // First row open by default per the live screenshot.
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(pages.length ? [pages[0].id] : []),
  );

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => setOpenIds(new Set(pages.map((p) => p.id)));
  const collapseAll = () => setOpenIds(new Set());
  const allOpen = openIds.size === pages.length && pages.length > 0;

  return (
    <div className="rounded-8 border border-fill-quaternary overflow-hidden">
      {/* Column header strip */}
      <div
        className={cn(
          "px-16 py-10",
          "bg-bg-tertiary border-b border-fill-quaternary",
          "text-mini font-medium text-text-tertiary",
        )}
      >
        Web Page
      </div>

      <ul className="divide-y divide-fill-quaternary">
        {pages.map((page) => {
          const open = openIds.has(page.id);
          return (
            <li key={page.id}>
              <PageRow
                page={page}
                domain={domain}
                open={open}
                onToggle={() => toggle(page.id)}
              />
              {open ? <ExpandedPanel page={page} /> : null}
            </li>
          );
        })}
      </ul>

      {/* Footer: expand/collapse + pagination */}
      <div
        className={cn(
          "flex items-center justify-between gap-16",
          "px-16 py-10",
          "bg-bg-tertiary border-t border-fill-quaternary",
        )}
      >
        <Button
          size="sm"
          variant="default"
          onClick={allOpen ? collapseAll : expandAll}
        >
          {allOpen ? "Collapse" : "Expand"}
        </Button>
        <span className="text-mini text-text-tertiary tabular-nums">
          Showing <span className="text-text-primary font-medium">1–{pages.length}</span>{" "}
          of <span className="text-text-primary font-medium">348</span> items
        </span>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Row + expanded panel
// ────────────────────────────────────────────────────────────────────

function PageRow({
  page,
  domain,
  open,
  onToggle,
}: {
  page: CitingPage;
  domain: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-12",
        "px-16 py-12",
        "transition-colors hover:bg-bg-tertiary/40",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={open ? "Collapse page" : "Expand page"}
        className={cn(
          "inline-flex items-center justify-center",
          "size-20 rounded-4 shrink-0",
          "text-text-tertiary hover:text-text-primary hover:bg-control-hover",
          "transition-colors",
          "focus-visible:outline-none focus-visible:shadow-focus",
        )}
      >
        <ChevronRightIcon
          className={cn("size-14 transition-transform", open && "rotate-90")}
        />
      </button>

      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "flex-1 min-w-0 text-left",
          "focus-visible:outline-none focus-visible:shadow-focus rounded-4",
        )}
      >
        <div className="text-small font-medium text-text-primary truncate">
          {page.path === "/" ? "/ (Home)" : page.path}
        </div>
        <div className="text-mini text-text-tertiary tabular-nums">
          {page.promptCount} prompts
        </div>
      </button>

      <a
        href={`https://${domain}${page.path}`}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Open ${domain}${page.path} in a new tab`}
        className={cn(
          "inline-flex items-center justify-center",
          "size-28 rounded-6 shrink-0",
          "text-text-tertiary hover:text-text-primary hover:bg-control-hover",
          "transition-colors",
          "focus-visible:outline-none focus-visible:shadow-focus",
        )}
        // Don't bubble up — clicking the external link shouldn't toggle.
        onClick={(e) => e.stopPropagation()}
      >
        <ArrowTopRightOnSquareIcon className="size-14" />
      </a>
    </div>
  );
}

function ExpandedPanel({ page }: { page: CitingPage }) {
  return (
    <div className="px-16 pb-16">
      <Table bare className="border-t border-fill-quaternary">
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>
              <span className="inline-flex items-center gap-4">
                User Prompt
                <InformationCircleIcon className="size-12 text-text-tertiary" />
              </span>
            </Table.HeaderCell>
            <Table.HeaderCell width={180}>Cited Websites</Table.HeaderCell>
            <Table.HeaderCell align="right" width={140}>
              Date Asked
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {page.prompts.map((prompt) => (
            <Table.Row key={prompt.id}>
              <Table.Cell>{prompt.text}</Table.Cell>
              <Table.Cell>
                <PlatformAvatarStack platforms={prompt.citedPlatforms} max={5} />
              </Table.Cell>
              <Table.Cell align="right" muted>
                {formatDateAsked(prompt.askedAt)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <div className="pt-12">
        <Button
          size="sm"
          variant="default"
          iconRight={<ArrowTopRightOnSquareIcon />}
        >
          View more
        </Button>
      </div>
    </div>
  );
}
