/**
 * FilterRow — header-row chip group used in PageHeader actions.
 *
 * Each pill is a `Select` (the Profound chip-trigger primitive). The filters
 * themselves are non-functional in the sandbox — they render their current
 * value and would open a popover on click in the real product.
 */

"use client";

import { Select } from "@/components/ui";
import type { FilterPill } from "@/lib/types/prompt-volumes";

export interface FilterRowProps {
  filters: FilterPill[];
}

export function FilterRow({ filters }: FilterRowProps) {
  return (
    <div className="flex items-center gap-6 flex-wrap">
      {filters.map((f) => (
        <Select
          key={f.id}
          size="sm"
          multiple
          aria-label={f.label}
        >
          {f.value}
        </Select>
      ))}
    </div>
  );
}
