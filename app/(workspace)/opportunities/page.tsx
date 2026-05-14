import {
  ArrowsUpDownIcon,
  ChevronDownIcon,
} from "@/components/ui/icons";
import { Button } from "@/components/ui";
import { PageHeader } from "@/components/shell";
import { OpportunityList } from "@/components/opportunities";
import { allOpportunities } from "@/lib/data/opportunities";

export const metadata = {
  title: "Opportunities · Brex · baby-profound",
};

export default function OpportunitiesPage() {
  return (
    <div className="mx-auto max-w-1280 px-32 py-24 space-y-32">
      <PageHeader
        title="Opportunities"
        actions={
          <>
            <Button
              size="sm"
              iconLeft={<ArrowsUpDownIcon />}
              iconRight={<ChevronDownIcon />}
            >
              Sort
            </Button>
            <Button size="sm" iconRight={<ChevronDownIcon />}>
              Filter
            </Button>
          </>
        }
      />

      <OpportunityList opportunities={allOpportunities} />
    </div>
  );
}
