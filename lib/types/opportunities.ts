/**
 * Opportunities tab — per-tab type extensions.
 *
 * Base shapes (`Opportunity`, `OpportunityType`, `OpportunityTarget`,
 * `CurrentPerformance`) live in `@/lib/types` because they're shared with
 * Overview's "Top Opportunities" section. Anything tab-specific goes here.
 */

import type { OpportunityType } from "@/lib/types";

/** Filter chip values shown above the list. "All" is the default. */
export type OpportunityFilter = "All" | OpportunityType;

/** Stable display order for the filter chip row. */
export const OPPORTUNITY_FILTERS: OpportunityFilter[] = [
  "All",
  "Outreach",
  "Content Optimization",
  "Content Creation",
  "Reddit",
  "LinkedIn",
  // "Agent" sits at the end of the filter row because it's the
  // newest opportunity surface and there's currently only one entry
  // in the catalog. If/when this grows, consider reordering by
  // typical user priority rather than insertion order.
  "Agent",
];
