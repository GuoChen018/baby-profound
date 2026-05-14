import Link from "next/link";
import { Button } from "@/components/ui";
import {
  TopKeywords,
  TopOpportunities,
  VisibilityScore,
  WebsiteActivity,
  WhatsNew,
} from "@/components/overview";
import { ChevronDownIcon } from "@/components/ui/icons";
import { overviewData } from "@/lib/mockData";

export const metadata = {
  title: "Compact Overview · Exploration · baby-profound",
};

/**
 * Exploration: Compact Overview
 * -----------------------------
 * Hypothesis: the canonical Overview is wide and grid-shaped because it
 * surfaces parallel data streams. But in real use, an analyst usually reads
 * top-to-bottom in a single pass — KPI → narrative → opportunities → tactics.
 *
 * This variant strips the 2-column hero, narrows the page to 720px, and
 * stacks every section in reading order. Trade-off: fewer dashboards-at-a-
 * glance, more focused storytelling.
 */
export default function CompactOverviewExploration() {
  const data = overviewData;

  return (
    <div className="mx-auto max-w-720 px-24 py-32 space-y-32">
      {/* exploration marker */}
      <div className="flex items-center justify-between gap-12 pb-12 border-b border-fill-quaternary">
        <div className="space-y-2">
          <p className="text-mini font-medium text-text-tertiary uppercase tracking-wide">
            Exploration · Layout study
          </p>
          <h1 className="text-title-large font-semibold tracking-tight text-text-primary">
            Compact Overview
          </h1>
        </div>
        <Link
          href="/overview"
          className="text-mini text-text-tertiary hover:text-text-primary transition-colors"
        >
          Compare to canonical →
        </Link>
      </div>

      {/* date range */}
      <div className="flex justify-end">
        <Button size="sm" iconRight={<ChevronDownIcon />}>
          {data.dateRange.label}
        </Button>
      </div>

      {/* stacked sections, no grid */}
      <VisibilityScore data={data.visibilityScore} />
      <WhatsNew data={data.whatsNew} />
      <TopOpportunities data={data.topOpportunities} />
      <TopKeywords data={data.topKeywords} />
      <WebsiteActivity site={data.workspace.site} />
    </div>
  );
}
