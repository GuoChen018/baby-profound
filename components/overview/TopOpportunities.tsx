/**
 * TopOpportunities — Overview's recommended-actions section.
 *
 * Source: `_reference/profound/overview/notes.md`.
 *
 * Layout: section title sits OUTSIDE any card chrome. Each opportunity is
 * its own card via `OpportunityCard`.
 */

import { ArrowTopRightOnSquareIcon } from "@/components/ui/icons";
import type { Opportunity } from "@/lib/types";
import { Button } from "@/components/ui";
import { SectionHeader } from "@/components/shell";
import { OpportunityCard } from "@/components/opportunities/OpportunityCard";

export interface TopOpportunitiesProps {
  data: Opportunity[];
}

export function TopOpportunities({ data }: TopOpportunitiesProps) {
  return (
    <section className="space-y-20">
      <SectionHeader
        title="Top Opportunities"
        subtitle="High impact opportunities with the biggest AI visibility needs"
        action={
          <Button size="sm" iconRight={<ArrowTopRightOnSquareIcon />}>
            Opportunities
          </Button>
        }
      />

      <ul className="border-t border-fill-quaternary">
        {data.map((opp) => (
          <li
            key={opp.id}
            className="border-b border-fill-quaternary"
          >
            <OpportunityCard
              opportunity={opp}
              href={`/opportunities/${opp.id}`}
              compact
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
