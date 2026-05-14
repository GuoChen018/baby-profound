/**
 * Agents tab — types.
 *
 * Source: `_reference/profound/agents/notes.md`. Genericized and trimmed
 * down to the surfaces we model in baby-profound (Overview + Run page).
 * The full workflow (nodes, edges, node config) is captured in notes but
 * deliberately not modelled here — see the deferred editor.
 */

export type AgentStatus = "Published" | "Unpublished" | "Draft";

export type AgentInputType = "string" | "number" | "json" | "array";

export type AgentInput = {
  /** Human-facing input name shown as the field label. */
  name: string;
  type: AgentInputType;
  required: boolean;
  /** Inline helper text under the label. */
  hint?: string;
  /** Placeholder rendered inside the field. */
  placeholder?: string;
};

/** Output block surfaced in the run pane skeleton + result columns. */
export type AgentOutputBlock = {
  /** Friendly name (e.g. "Citation Domains"). */
  name: string;
  /** Underlying data type — drives the small glyph rendered in the skeleton. */
  type: AgentInputType;
};

export type AgentUser = {
  name: string;
  /** Optional avatar URL. Falls back to initials. */
  avatar?: string;
};

/** Brand mark shown in template / agent icons. Drives the colored swatch. */
export type AgentBrand =
  | "profound"
  | "google"
  | "youtube"
  | "reddit"
  | "perplexity"
  | "blog";

export type Agent = {
  id: string;
  name: string;
  description: string;
  status: AgentStatus;
  createdBy: AgentUser;
  /** ISO timestamp of last modification — formatted at render time. */
  lastModifiedAt: string;
  /** Optional last-run timestamp. */
  lastRunAt?: string;
  /** Per-run credit estimate. */
  estimatedUsage: number;
  /** Inputs collected before kicking off a run. */
  inputs: AgentInput[];
  /** Output shape used to render the run-pane skeleton. */
  outputs: AgentOutputBlock[];
  /** Brand mark for the agent's avatar. */
  brand: AgentBrand;
};

export type AgentTemplate = {
  id: string;
  name: string;
  description: string;
  brand: AgentBrand;
};
