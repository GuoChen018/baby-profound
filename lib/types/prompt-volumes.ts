/**
 * Prompt Volumes types.
 *
 * Source: `_reference/profound/prompt-volumes/notes.md` + screenshot.
 *
 * The live tab is named "Prompt Volumes" but the focal UI is a research /
 * explorer surface ("Explore what people are prompting in AI"). We model
 * three concerns:
 *   1. Filter & seed prompt state (`Filters`, `seedPrompts`)
 *   2. Aggregate keyword view (`KeywordRow`) — the table beneath the composer
 *   3. Citing-pages drill (`CitingPage` + nested prompts) — the accordion
 */

import type { Platform } from "@/lib/types";

export type PromptVolumesSubTab = "prompt-explorer" | "keyword-lists";

/** A single user-typed seed prompt rendered as a chip below the composer. */
export type SeedPrompt = {
  id: string;
  text: string;
};

/** Filter chip on the page header — generic shape so we can render N pickers. */
export type FilterPill = {
  id: string;
  label: string;
  /** Display value rendered inside the chip. */
  value: string;
  iconLabel?: string;
};

/** Aggregate keyword row in the table beneath the composer. */
export type KeywordRow = {
  id: string;
  keyword: string;
  /** Estimated monthly prompt volume across tracked AI engines. */
  monthlyVolume: number;
  /** 0..1 — share of prompts in this keyword that cite the tracked domain. */
  citationRate: number;
  /** 0..100 — composite "do something about this" score. */
  opportunityScore: number;
  /** ISO date — last time we observed a prompt for this keyword. */
  lastSeenAt: string;
};

/** A single prompt that appeared in the citing-pages drill. */
export type CitingPagePrompt = {
  id: string;
  text: string;
  /** Up to ~5 platforms render as avatars. Anything past `visiblePlatformLimit` is shown as +N. */
  citedPlatforms: Platform[];
  askedAt: string; // ISO date
};

/** A web page (path on the tracked domain) with the prompts that drove citations to it. */
export type CitingPage = {
  id: string;
  path: string;
  /** Total prompts associated with this page (may be > prompts.length when paginated). */
  promptCount: number;
  prompts: CitingPagePrompt[];
};

export type PromptVolumesData = {
  domain: string;
  filters: FilterPill[];
  seedPrompts: SeedPrompt[];
  keywords: KeywordRow[];
  citingPages: CitingPage[];
  pagination: { page: number; pageSize: number; total: number };
};
