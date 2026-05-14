/**
 * OpportunityList — filterable, full-width list of `OpportunityCard` rows.
 *
 * Wraps the chip-row + list in a single client component so filter state
 * stays local. The list itself uses the same flat-list pattern as
 * Overview's `TopOpportunities` (`<ul>` with hairline rules between items),
 * just with the FULL `OpportunityCard` (not `compact`) since this is the
 * tab where the description is the load-bearing element.
 */

"use client";

import { useMemo, useState } from "react";
import type { Opportunity } from "@/lib/types";
import {
  OPPORTUNITY_FILTERS,
  type OpportunityFilter,
} from "@/lib/types/opportunities";
import { OpportunityCard } from "./OpportunityCard";
import { OpportunityFilters } from "./OpportunityFilters";

export interface OpportunityListProps {
  opportunities: Opportunity[];
}

export function OpportunityList({ opportunities }: OpportunityListProps) {
  const [filter, setFilter] = useState<OpportunityFilter>("All");

  const counts = useMemo(() => {
    const out: Partial<Record<OpportunityFilter, number>> = {
      All: opportunities.length,
    };
    for (const f of OPPORTUNITY_FILTERS) {
      if (f === "All") continue;
      out[f] = opportunities.filter((o) => o.type === f).length;
    }
    return out;
  }, [opportunities]);

  const visible = useMemo(() => {
    if (filter === "All") return opportunities;
    return opportunities.filter((o) => o.type === filter);
  }, [opportunities, filter]);

  return (
    <div className="space-y-20">
      <OpportunityFilters value={filter} onChange={setFilter} counts={counts} />

      {visible.length === 0 ? (
        <div className="border-t border-fill-quaternary py-48 text-center text-small text-text-secondary">
          No opportunities match this filter yet.
        </div>
      ) : (
        <ul className="border-t border-fill-quaternary">
          {visible.map((opp) => (
            <li key={opp.id} className="border-b border-fill-quaternary">
              <OpportunityCard
                opportunity={opp}
                href={`/opportunities/${opp.id}`}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
