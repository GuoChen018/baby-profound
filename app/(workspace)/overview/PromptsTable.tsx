"use client";

/**
 * PromptsTable — "Top prompts in your category" section of the Overview.
 *
 * Layout rules (per user feedback 2026-05-14):
 *   - Topic (text)              → left aligned
 *   - Prompt Volume (numeric)   → right aligned, **default sort = desc**
 *   - Tracking (status)         → left aligned; the badge stays put on hover.
 *   - Visibility Rank (numeric) → right aligned. Untracked rows host a
 *     floating "Add prompt" CTA in this cell that fades in + slides from
 *     the right on row hover. The CTA is absolutely positioned so the
 *     cell width stays stable regardless of state, and it `stopPropagation`
 *     so clicking it doesn't also fire the row-level navigation.
 *   - No trailing actions column. The whole row remains clickable: tracked
 *     rows go to Prompt Volumes filtered to the topic, untracked rows go to
 *     the matching opportunity (or `/opportunities?topic=`).
 */

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircleIcon,
  PlusIcon,
  XCircleIcon,
} from "@/components/ui/icons";
import { Table } from "@/components/ui";
import { cn } from "@/lib/cn";
import { formatCompact } from "@/lib/mockData";
import type { CategoryPromptRow } from "./data";

export interface PromptsTableProps {
  rows: CategoryPromptRow[];
}

export function PromptsTable({ rows }: PromptsTableProps) {
  const router = useRouter();

  // Sorted highest-volume-first so the densest prompts always sit above the
  // fold. We memoize because the sort isn't free on every re-render — the
  // KPI tab swap above this section forces a re-render of the page tree.
  const sortedRows = useMemo(
    () => [...rows].sort((a, b) => b.promptVolume - a.promptVolume),
    [rows],
  );

  // Themed opportunity IDs (`opportunityId`) don't have detail
  // records in `lib/data/opportunities.ts`, so static export would
  // 404 them. Route untracked rows to the listing instead; the
  // topic slug is carried as a query param so we can light it up
  // there later.
  const rowHref = (row: CategoryPromptRow) => {
    if (row.tracked) return `/prompt-volumes?topic=${row.topicSlug}`;
    return `/opportunities?topic=${row.topicSlug}`;
  };

  return (
    <Table>
      {/* `width="1%"` on the non-Topic columns is the classic shrink-to-fit
          trick: it tells the table to use the column's natural content width
          and lets Topic expand to absorb everything else. Without this the
          numeric headers ("Prompt Volume", "Visibility Rank") would force
          equal-quarter columns and crush Topic into 3-line wrapping. */}
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell className="whitespace-nowrap">Topic</Table.HeaderCell>
          <Table.HeaderCell
            align="right"
            width="1%"
            sortable
            sortDirection="desc"
            className="whitespace-nowrap"
          >
            Prompt Volume
          </Table.HeaderCell>
          <Table.HeaderCell
            align="left"
            width="1%"
            className="whitespace-nowrap"
          >
            Tracking
          </Table.HeaderCell>
          <Table.HeaderCell
            align="right"
            width="1%"
            className="whitespace-nowrap"
          >
            Visibility Rank
          </Table.HeaderCell>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {sortedRows.map((row) => (
          <Table.Row
            key={row.id}
            // `group` is what wires the hover-state CTA on untracked rows —
            // the "Add prompt" pill below uses `group-hover:`. `interactive`
            // gives us cursor-pointer + the body-scoped row hover bg.
            className="group"
            interactive
            onClick={() => router.push(rowHref(row))}
          >
            <Table.Cell className="font-medium text-text-primary">
              {row.topic}
            </Table.Cell>

            <Table.Cell align="right" numeric>
              {formatCompact(row.promptVolume)}
            </Table.Cell>

            <Table.Cell align="left">
              {row.tracked ? (
                <span className="inline-flex items-center gap-6 text-mini text-text-green whitespace-nowrap">
                  <CheckCircleIcon className="size-14" />
                  Tracked
                </span>
              ) : (
                <span className="inline-flex items-center gap-6 text-mini text-text-tertiary whitespace-nowrap">
                  <XCircleIcon className="size-14" />
                  Not tracked
                </span>
              )}
            </Table.Cell>

            <Table.Cell align="right" numeric className="relative">
              {/* The rank value stays put — untracked rows still get a
                  "—" placeholder so the column doesn't collapse on
                  hover. The CTA fades in over the right edge of the row
                  and never affects layout. */}
              <span className={row.tracked ? "" : "group-hover:opacity-0 transition-opacity"}>
                {row.tracked && row.visibilityRank ? `#${row.visibilityRank}` : "—"}
              </span>

              {!row.tracked ? <AddPromptCta topicSlug={row.topicSlug} /> : null}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

/**
 * AddPromptCta — floating action that sits over the right edge of an
 * untracked prompt row. Hidden by default, fades in + slides from the
 * right (`translate-x` → 0) when the parent row is hovered or focus
 * lands on the row's interactive surface.
 *
 * Animation tokens:
 *   - opacity 0 → 100, 150ms
 *   - translate-x 4px → 0, 150ms
 *   - `pointer-events-none` until hover so the button never intercepts
 *     pointer events when invisible (matters for keyboard users tabbing
 *     through the row).
 *
 * Positioning is relative to the LAST `<td>` (`Table.Cell ... className="relative"`).
 * That cell is right-aligned with shrink-to-fit width, so `right-12`
 * anchors the CTA at the row's true right edge.
 */
function AddPromptCta({ topicSlug }: { topicSlug: string }) {
  return (
    <Link
      href={`/prompt-volumes?add=${topicSlug}`}
      onClick={(event) => event.stopPropagation()}
      className={cn(
        "absolute top-1/2 right-12 -translate-y-1/2",
        "inline-flex items-center gap-6 whitespace-nowrap",
        "rounded-6 bg-control-bg shadow-flat",
        "px-8 h-24",
        "text-mini font-medium text-text-primary",
        "cursor-pointer",
        "opacity-0 translate-x-4 pointer-events-none",
        "transition-[opacity,transform,background-color] duration-150 ease-out",
        "group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto",
        "group-focus-within:opacity-100 group-focus-within:translate-x-0 group-focus-within:pointer-events-auto",
        "hover:bg-control-hover",
        "focus-visible:outline-none focus-visible:shadow-focus",
      )}
    >
      <PlusIcon className="size-12" />
      Add prompt
    </Link>
  );
}
