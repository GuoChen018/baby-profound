"use client";

/**
 * ProjectsTable — the projects list under the launchpad on Content overview.
 *
 * Source: `_reference/profound/content/screenshot.png`.
 *
 * Layout:
 *   - SegmentedControl on the left ("Content Generation" / "Content Optimization")
 *     filters by `workflow`. The capture shows Generation as the default tile.
 *   - Right side has a "Refresh table" button + result counter + pagination
 *     arrows. Pagination is non-functional in the sandbox.
 *   - Table columns mirror the capture (Title, Status, Template, Updated)
 *     and add an Owner column per the build brief.
 *   - Each row is interactive — clicks route to /content/{id}.
 *
 * Title cell stacks the project title above a `PlatformAvatarStack`.
 *
 * The trailing action cell renders a `StatusPill variant="dot"` — matches
 * the dropdown affordance in the capture. The dropdown menu itself is
 * deferred (no menu primitive yet).
 */

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowsUpDownIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/ui/icons";
import { Button, SegmentedControl, Table } from "@/components/ui";
import { cn } from "@/lib/cn";
import type {
  ContentProject,
  ContentWorkflow,
} from "@/lib/types/content";
import { PlatformAvatarStack } from "./PlatformAvatarStack";
import { StatusPill } from "./StatusPill";

export interface ProjectsTableProps {
  projects: ContentProject[];
}

const segmentOptions: { label: string; value: ContentWorkflow }[] = [
  { label: "Content Generation", value: "generation" },
  { label: "Content Optimization", value: "optimization" },
];

export function ProjectsTable({ projects }: ProjectsTableProps) {
  const [workflow, setWorkflow] = useState<ContentWorkflow>("generation");

  const filtered = useMemo(
    () => projects.filter((p) => p.workflow === workflow),
    [projects, workflow],
  );

  return (
    <section className="space-y-16">
      <div className="flex flex-wrap items-center justify-between gap-12">
        <SegmentedControl
          options={segmentOptions}
          value={workflow}
          onChange={setWorkflow}
        />
        <div className="flex items-center gap-12">
          <Button
            size="sm"
            iconLeft={<ArrowsUpDownIcon />}
            aria-label="Refresh table"
          >
            Refresh table
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-end gap-8 text-mini text-text-tertiary">
        <span className="tabular-nums">
          Showing <span className="text-text-primary font-medium">1</span>–
          <span className="text-text-primary font-medium">{filtered.length}</span>{" "}
          of {filtered.length} items
        </span>
        <div className="inline-flex items-center gap-4">
          <button
            type="button"
            disabled
            aria-label="Previous page"
            className={cn(
              "inline-flex size-24 items-center justify-center rounded-4",
              "border border-fill-quaternary text-text-tertiary",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            <ChevronLeftIcon className="size-12" />
          </button>
          <button
            type="button"
            disabled
            aria-label="Next page"
            className={cn(
              "inline-flex size-24 items-center justify-center rounded-4",
              "border border-fill-quaternary text-text-tertiary",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            <ChevronRightIcon className="size-12" />
          </button>
        </div>
      </div>

      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell sortable>Title</Table.HeaderCell>
            <Table.HeaderCell width={110}>Status</Table.HeaderCell>
            <Table.HeaderCell width={110}>Template</Table.HeaderCell>
            <Table.HeaderCell width={110}>Updated</Table.HeaderCell>
            <Table.HeaderCell width={150}>Owner</Table.HeaderCell>
            <Table.HeaderCell width={120} align="right">
              <span className="sr-only">Actions</span>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {filtered.map((p) => (
            <Table.Row key={p.id} interactive>
              <Table.Cell>
                <Link
                  href={`/content/${p.id}`}
                  className="block space-y-6 outline-none focus-visible:underline"
                >
                  <span className="block text-small font-medium text-text-primary leading-snug">
                    {p.title}
                  </span>
                  {p.citedPlatforms.length > 0 ? (
                    <PlatformAvatarStack platforms={p.citedPlatforms} />
                  ) : null}
                </Link>
              </Table.Cell>
              <Table.Cell>
                <StatusPill status={p.status} />
              </Table.Cell>
              <Table.Cell muted>{p.template}</Table.Cell>
              <Table.Cell muted>{p.updatedLabel}</Table.Cell>
              <Table.Cell>
                <span className="inline-flex items-center gap-8">
                  <span
                    className={cn(
                      "inline-flex size-20 items-center justify-center rounded-full",
                      "text-micro font-semibold text-text-inverse bg-fill-secondary",
                    )}
                    aria-hidden
                  >
                    {p.owner.initials}
                  </span>
                  <span className="text-small text-text-primary">
                    {p.owner.name}
                  </span>
                </span>
              </Table.Cell>
              <Table.Cell align="right">
                <button
                  type="button"
                  className={cn(
                    "inline-flex items-center gap-6 px-10 h-24 rounded-6",
                    "bg-control-bg shadow-flat",
                    "text-small text-text-primary",
                    "hover:bg-control-hover transition-colors",
                  )}
                >
                  <StatusPill status={p.status} variant="dot" />
                  <ChevronDownIcon className="size-12 text-text-tertiary" />
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {filtered.length === 0 ? (
        <div
          className={cn(
            "rounded-8 border border-dashed border-fill-quaternary",
            "px-24 py-32 text-center text-small text-text-tertiary",
          )}
        >
          No {workflow === "generation" ? "generation" : "optimization"} projects yet.
        </div>
      ) : null}
    </section>
  );
}
