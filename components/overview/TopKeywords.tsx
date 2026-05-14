/**
 * TopKeywords — sortable table of high-volume queries.
 *
 * Source: `_reference/profound/overview/notes.md` ("Top Keywords" section).
 *
 * Layout: title sits OUTSIDE the table on its own row. The table is a flat
 * surface with hairline row separators — no card chrome. Per user feedback
 * 2026-05-13: section titles should not be wrapped in a parent container.
 */
"use client";

import { useState } from "react";
import { ArrowTopRightOnSquareIcon } from "@/components/ui/icons";
import type { Keyword } from "@/lib/types";
import { Button, Delta, Table } from "@/components/ui";
import { SectionHeader } from "@/components/shell";
import { formatCompact, formatSignedCompact } from "@/lib/mockData";

export interface TopKeywordsProps {
  data: Keyword[];
}

type SortKey = "keyword" | "promptVolume";
type SortDir = "asc" | "desc";

export function TopKeywords({ data }: TopKeywordsProps) {
  const [sortKey, setSortKey] = useState<SortKey>("promptVolume");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sorted = [...data].sort((a, b) => {
    const mul = sortDir === "asc" ? 1 : -1;
    if (sortKey === "keyword") return a.keyword.localeCompare(b.keyword) * mul;
    return (a.promptVolume - b.promptVolume) * mul;
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
        title="Top Keywords"
        subtitle="High volume queries lowering AI mentions in your space"
        action={
          <Button size="sm" iconRight={<ArrowTopRightOnSquareIcon />}>
            Prompt Volumes
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
              sortDirection={sortKey === "promptVolume" ? sortDir : undefined}
              onClick={() => toggleSort("promptVolume")}
            >
              Prompt Volume
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {sorted.map((row) => (
            <Table.Row key={row.keyword}>
              <Table.Cell>{row.keyword}</Table.Cell>
              <Table.Cell align="right">
                <span className="inline-flex items-center justify-end gap-16">
                  <span className="text-small font-medium text-text-primary tabular-nums">
                    {formatCompact(row.promptVolume)}
                  </span>
                  <span className="min-w-48 text-right">
                    <Delta value={row.delta} format={formatSignedCompact} />
                  </span>
                </span>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </section>
  );
}
