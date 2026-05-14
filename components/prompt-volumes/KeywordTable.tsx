/**
 * KeywordTable — aggregate keyword view that lives between the composer
 * and the citing-pages accordion.
 *
 * Columns: Keyword · Monthly Volume · Citation Rate · Opportunity Score · Last Seen.
 *
 * The live screenshot doesn't expose this aggregate view directly — the
 * tab leads with the composer + citing-pages drill — but the user query
 * asks for it as the bridge between "what people are typing" (volume) and
 * "where it lands" (citing pages). Sort state is managed locally.
 */

"use client";

import { useState } from "react";
import { ArrowTopRightOnSquareIcon } from "@/components/ui/icons";
import { Button, Meter, Table } from "@/components/ui";
import { SectionHeader } from "@/components/shell";
import { cn } from "@/lib/cn";
import type { KeywordRow } from "@/lib/types/prompt-volumes";
import { formatCompact } from "@/lib/mockData";
import {
  formatDateAsked,
  formatPercent,
} from "@/lib/data/prompt-volumes";

export interface KeywordTableProps {
  data: KeywordRow[];
}

type SortKey =
  | "keyword"
  | "monthlyVolume"
  | "citationRate"
  | "opportunityScore"
  | "lastSeenAt";
type SortDir = "asc" | "desc";

export function KeywordTable({ data }: KeywordTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("monthlyVolume");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sorted = [...data].sort((a, b) => {
    const mul = sortDir === "asc" ? 1 : -1;
    if (sortKey === "keyword") return a.keyword.localeCompare(b.keyword) * mul;
    if (sortKey === "lastSeenAt") {
      return (
        (new Date(a.lastSeenAt).getTime() - new Date(b.lastSeenAt).getTime()) *
        mul
      );
    }
    return ((a[sortKey] as number) - (b[sortKey] as number)) * mul;
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "keyword" ? "asc" : "desc");
    }
  };

  return (
    <section className="space-y-20">
      <SectionHeader
        title="Top Prompt Keywords"
        subtitle="Keywords aggregated from prompts that drove citations to your domain"
        action={
          <Button size="sm" iconRight={<ArrowTopRightOnSquareIcon />}>
            Export
          </Button>
        }
      />

      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell
              sortable
              sortDirection={sortKey === "keyword" ? sortDir : undefined}
              onClick={() => toggleSort("keyword")}
            >
              Keyword
            </Table.HeaderCell>
            <Table.HeaderCell
              sortable
              align="right"
              width={140}
              sortDirection={
                sortKey === "monthlyVolume" ? sortDir : undefined
              }
              onClick={() => toggleSort("monthlyVolume")}
            >
              Monthly Volume
            </Table.HeaderCell>
            <Table.HeaderCell
              sortable
              align="right"
              width={140}
              sortDirection={sortKey === "citationRate" ? sortDir : undefined}
              onClick={() => toggleSort("citationRate")}
            >
              Citation Rate
            </Table.HeaderCell>
            <Table.HeaderCell
              sortable
              align="right"
              width={200}
              sortDirection={
                sortKey === "opportunityScore" ? sortDir : undefined
              }
              onClick={() => toggleSort("opportunityScore")}
            >
              Opportunity Score
            </Table.HeaderCell>
            <Table.HeaderCell
              sortable
              align="right"
              width={140}
              sortDirection={sortKey === "lastSeenAt" ? sortDir : undefined}
              onClick={() => toggleSort("lastSeenAt")}
            >
              Last Seen
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {sorted.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>
                <span className="font-medium text-text-primary">
                  {row.keyword}
                </span>
              </Table.Cell>
              <Table.Cell align="right" numeric>
                {formatCompact(row.monthlyVolume)}
              </Table.Cell>
              <Table.Cell align="right">
                <span
                  className={cn(
                    "tabular-nums font-medium",
                    row.citationRate >= 0.5
                      ? "text-text-green"
                      : "text-text-primary",
                  )}
                >
                  {formatPercent(row.citationRate)}
                </span>
              </Table.Cell>
              <Table.Cell align="right">
                <span className="inline-flex items-center justify-end gap-10">
                  <Meter value={row.opportunityScore} className="w-96 shrink-0" />
                  <span className="tabular-nums font-medium text-text-primary min-w-24 text-right">
                    {row.opportunityScore}
                  </span>
                </span>
              </Table.Cell>
              <Table.Cell align="right" muted>
                {formatDateAsked(row.lastSeenAt)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </section>
  );
}
