/**
 * WebsiteActivity — Overview's onboarding empty state for site analytics.
 *
 * Source: `_reference/profound/overview/notes.md` (unconfigured state).
 *
 * Layout: section title sits OUTSIDE the empty-state card (per Profound's
 * Overview anatomy). Only the illustration + CTA live inside the card.
 */

import { ArrowTopRightOnSquareIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui";
import { SectionHeader } from "@/components/shell";
import { BrowserMockIllustration } from "./BrowserMockIllustration";

export interface WebsiteActivityProps {
  site?: string;
  onConfigure?: () => void;
}

export function WebsiteActivity({ site = "ramp.com" }: WebsiteActivityProps) {
  return (
    <section className="space-y-20">
      <SectionHeader
        title="Website Activity"
        subtitle="How AI bots index, score, and surface your site"
        action={
          <Button size="sm" iconRight={<ArrowTopRightOnSquareIcon />}>
            Website
          </Button>
        }
      />

      <div className="bg-bg-secondary rounded-8 px-24 py-48 flex flex-col items-center justify-center gap-16">
        <BrowserMockIllustration site={site} />
        <p className="text-base font-medium text-text-primary text-center max-w-prose">
          See how AI bots crawl and evaluate your site
        </p>
        <Button variant="inverse" size="md">
          Configure Website
        </Button>
      </div>
    </section>
  );
}
