/**
 * FilterRow — the dense filter pill row above the AEI dashboard.
 *
 * Renders three groups separated by hairline dividers, mirroring the live
 * product layout from `_reference/profound/answer-engine-insights/notes.md`:
 *
 *   [ Date Range ]  vs.  [ Comparison ]  [ Granularity ]   |
 *   [ Region ] [ Persona ]                                  |
 *   [ Topics ] [ Platform ]
 *
 * All pills are non-functional `Select` triggers in the sandbox.
 */

"use client";

import { Select } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { AeiFilters } from "@/lib/types/answer-engine-insights";

export interface FilterRowProps {
  filters: AeiFilters;
  className?: string;
}

export function FilterRow({ filters, className }: FilterRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-6 flex-wrap",
        className,
      )}
    >
      <Select size="sm" multiple aria-label="Date range">
        {filters.dateRange.value}
      </Select>
      <span className="px-4 text-mini text-text-tertiary">vs.</span>
      <Select size="sm" multiple aria-label="Comparison">
        {filters.comparison.value}
      </Select>
      <Select size="sm" multiple aria-label="Granularity">
        {filters.granularity.value}
      </Select>

      <Divider />

      <Select size="sm" multiple aria-label="Region">
        {filters.region.value}
      </Select>
      <Select size="sm" multiple aria-label="Persona">
        {filters.persona.value}
      </Select>

      <Divider />

      <Select size="sm" multiple aria-label="Topics">
        {filters.topics.value}
      </Select>
      <Select size="sm" multiple aria-label="Platform">
        {filters.platforms.value}
      </Select>
    </div>
  );
}

function Divider() {
  return (
    <span
      aria-hidden
      className="inline-block h-16 w-px bg-fill-quaternary mx-4"
    />
  );
}
