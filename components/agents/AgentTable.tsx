/**
 * AgentTable — Recent Agents list.
 *
 * Source: `_reference/profound/agents/screenshot.png` Recent Agents section.
 * Columns: Agent · Status · Created by · Last modified · row-icon actions
 * (history clock + `...` overflow).
 *
 * Wraps the shared `Table` primitive. Rows link into the run page.
 */

"use client";

import Link from "next/link";
import { Table } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { Agent, AgentStatus } from "@/lib/types/agents";
import { formatRelativeTime } from "@/lib/data/agents";
import { StatusPill, type StatusTone } from "./StatusPill";

export interface AgentTableProps {
  agents: Agent[];
  className?: string;
}

const STATUS_TONE: Record<AgentStatus, StatusTone> = {
  Published: "green",
  Unpublished: "amber",
  Draft: "grey",
};

export function AgentTable({ agents, className }: AgentTableProps) {
  return (
    <div className={cn(className)}>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Agent</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Created by</Table.HeaderCell>
            <Table.HeaderCell>Last modified</Table.HeaderCell>
            <Table.HeaderCell width="92px" align="right">
              <span className="sr-only">Actions</span>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {agents.map((agent) => (
            <Table.Row key={agent.id} interactive>
              <Table.Cell>
                <Link
                  href={`/agents/${agent.id}`}
                  className="block focus-visible:outline-none focus-visible:text-text-primary text-text-primary font-medium"
                >
                  {agent.name}
                </Link>
              </Table.Cell>
              <Table.Cell>
                <StatusPill tone={STATUS_TONE[agent.status]}>
                  {agent.status}
                </StatusPill>
              </Table.Cell>
              <Table.Cell muted>
                <UserChip name={agent.createdBy.name} />
              </Table.Cell>
              <Table.Cell muted>
                {formatRelativeTime(agent.lastModifiedAt)}
              </Table.Cell>
              <Table.Cell align="right">
                <RowActions />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

function UserChip({ name }: { name: string }) {
  const initial = name.slice(0, 1);
  return (
    <span className="inline-flex items-center gap-8">
      <span
        aria-hidden
        className={cn(
          "inline-flex items-center justify-center size-18 rounded-full",
          "bg-bg-tertiary text-text-secondary text-mini font-semibold",
        )}
      >
        {initial}
      </span>
      <span className="text-small text-text-secondary">{name}</span>
    </span>
  );
}

function RowActions() {
  return (
    <span className="inline-flex items-center gap-4 text-text-tertiary">
      <button
        type="button"
        aria-label="View past runs"
        className="inline-flex items-center justify-center size-24 rounded-4 hover:bg-fill-quaternary/40 hover:text-text-secondary"
      >
        <ClockIcon className="size-14" />
      </button>
      <button
        type="button"
        aria-label="More actions"
        className="inline-flex items-center justify-center size-24 rounded-4 hover:bg-fill-quaternary/40 hover:text-text-secondary"
      >
        <DotsHorizontalIcon className="size-14" />
      </button>
    </span>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M8 4.5V8l2.5 1.5" />
    </svg>
  );
}

function DotsHorizontalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden {...props}>
      <circle cx="3.5" cy="8" r="1.25" />
      <circle cx="8" cy="8" r="1.25" />
      <circle cx="12.5" cy="8" r="1.25" />
    </svg>
  );
}
