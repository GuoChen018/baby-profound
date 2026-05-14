/**
 * PromptVolumesView — client-side composition of the Prompt Volumes tab.
 *
 * Owns the sub-tab state and the search-pages query. The page route stays
 * a server component so it can keep its `metadata` export and route-level
 * caching defaults. All interactive primitives live below this boundary.
 */

"use client";

import { useState } from "react";
import {
  AnswerEngineIcon,
  MagnifyingGlassIcon,
} from "@/components/ui/icons";
import { PageHeader, SectionHeader } from "@/components/shell";
import { Input, Select } from "@/components/ui";
import { CitingPagesAccordion } from "./CitingPagesAccordion";
import { FilterRow } from "./FilterRow";
import { KeywordTable } from "./KeywordTable";
import { PromptExplorer } from "./PromptExplorer";
import { SubTabs } from "./SubTabs";
import type {
  PromptVolumesData,
  PromptVolumesSubTab,
} from "@/lib/types/prompt-volumes";

export interface PromptVolumesViewProps {
  data: PromptVolumesData;
}

export function PromptVolumesView({ data }: PromptVolumesViewProps) {
  const [subTab, setSubTab] = useState<PromptVolumesSubTab>("prompt-explorer");
  const [pageSearch, setPageSearch] = useState("");

  const filteredPages = pageSearch.trim()
    ? data.citingPages.filter((p) =>
        p.path.toLowerCase().includes(pageSearch.trim().toLowerCase()),
      )
    : data.citingPages;

  return (
    <div className="mx-auto max-w-1280 px-32 py-24 space-y-32">
      <PageHeader
        title="Prompt Volumes"
        actions={<FilterRow filters={data.filters} />}
        tabs={<SubTabs active={subTab} onChange={setSubTab} />}
      />

      <PromptExplorer seedPrompts={data.seedPrompts} />

      <KeywordTable data={data.keywords} />

      <section className="space-y-20">
        <SectionHeader
          title={
            <span className="inline-flex items-center gap-12">
              Prompts Citing
              <Select
                size="sm"
                multiple
                iconLeft={<AnswerEngineIcon className="size-12" />}
              >
                {data.domain}
              </Select>
            </span>
          }
          subtitle="A sample of user prompts that drove citations to pages on this domain"
          action={
            <div className="w-240">
              <Input
                size="sm"
                placeholder="Search web pages"
                iconLeft={<MagnifyingGlassIcon />}
                value={pageSearch}
                onChange={(e) => setPageSearch(e.target.value)}
              />
            </div>
          }
        />

        <CitingPagesAccordion pages={filteredPages} domain={data.domain} />
      </section>
    </div>
  );
}
