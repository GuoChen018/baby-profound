/**
 * CitationsTable — sources surfaced by AI engines, ranked by mention count.
 *
 * Columns: source URL · platform · mentions · % share · last seen.
 * Sortable on every numeric column. Source link opens in a new tab.
 */

"use client";

import { useState } from "react";
import { ArrowTopRightOnSquareIcon } from "@/components/ui/icons";
import { Badge, Favicon, Meter, PlatformIcon, Table } from "@/components/ui";
import type { CitationRow } from "@/lib/types/answer-engine-insights";
import { platformLabels } from "@/lib/data/answer-engine-insights";
import { formatCompact } from "@/lib/mockData";

export interface CitationsTableProps {
  rows: CitationRow[];
}

type SortKey = "source" | "mentions" | "share" | "lastSeenAt";
type SortDir = "asc" | "desc";

const PLATFORM_COLOR: Record<string, "blue" | "green" | "purple" | "orange" | "amber" | "cyan" | "red" | "grey"> = {
  chatgpt: "green",
  perplexity: "blue",
  anthropic: "amber",
  google: "orange",
  gemini: "cyan",
  copilot: "purple",
  grok: "grey",
  meta: "blue",
};

export function CitationsTable({ rows }: CitationsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("mentions");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sorted = [...rows].sort((a, b) => {
    const mul = sortDir === "asc" ? 1 : -1;
    if (sortKey === "source") return a.source.localeCompare(b.source) * mul;
    if (sortKey === "lastSeenAt")
      return a.lastSeenAt.localeCompare(b.lastSeenAt) * mul;
    if (sortKey === "share") return (a.share - b.share) * mul;
    return (a.mentions - b.mentions) * mul;
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "source" ? "asc" : "desc");
    }
  };

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell
            sortable
            sortDirection={sortKey === "source" ? sortDir : undefined}
            onClick={() => toggleSort("source")}
          >
            Source
          </Table.HeaderCell>
          <Table.HeaderCell width="20%">Platform</Table.HeaderCell>
          <Table.HeaderCell
            sortable
            align="right"
            width="14%"
            sortDirection={sortKey === "mentions" ? sortDir : undefined}
            onClick={() => toggleSort("mentions")}
          >
            Mentions
          </Table.HeaderCell>
          <Table.HeaderCell
            sortable
            align="left"
            width="20%"
            sortDirection={sortKey === "share" ? sortDir : undefined}
            onClick={() => toggleSort("share")}
          >
            % Share
          </Table.HeaderCell>
          <Table.HeaderCell
            sortable
            align="right"
            width="16%"
            sortDirection={sortKey === "lastSeenAt" ? sortDir : undefined}
            onClick={() => toggleSort("lastSeenAt")}
          >
            Last seen
          </Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {sorted.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell>
              <a
                href={row.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-8 text-text-primary hover:text-text-secondary transition-colors"
              >
                <Favicon domain={row.source} size={16} fallbackLabel={row.source} />
                <span>{row.source}</span>
                <ArrowTopRightOnSquareIcon className="size-12 text-text-tertiary" />
              </a>
            </Table.Cell>
            <Table.Cell>
              <Badge color={PLATFORM_COLOR[row.platform] ?? "grey"} size="sm">
                <span className="inline-flex items-center gap-6">
                  <PlatformIcon platform={row.platform} size={12} />
                  {platformLabels[row.platform] ?? row.platform}
                </span>
              </Badge>
            </Table.Cell>
            <Table.Cell align="right" numeric>
              {formatCompact(row.mentions)}
            </Table.Cell>
            <Table.Cell>
              <span className="inline-flex items-center gap-12 w-full">
                <span className="flex-1 max-w-120">
                  <Meter value={row.share * 100} intent="neutral" size="sm" />
                </span>
                <span className="text-small tabular-nums font-medium text-text-primary w-44 text-right">
                  {(row.share * 100).toFixed(1)}%
                </span>
              </span>
            </Table.Cell>
            <Table.Cell align="right" muted>
              {row.lastSeenAt}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
