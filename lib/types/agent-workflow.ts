/**
 * Agent editor — node-canvas workflow types.
 *
 * Source: `_reference/profound/agents/notes.md` (View 3 · Agent Editor).
 *
 * Nodes are positioned with explicit `x`/`y` because the editor is a
 * hand-laid-out demo — we don't run a layout algorithm. Edges are
 * straight orthogonal arrows from one node's bottom edge to the next
 * node's top edge.
 */

/**
 * Category groups the node into the left-rail palette. The colored
 * accent in the node header is keyed off this category.
 */
export type NodeCategory =
  | "control" // Start / End
  | "logic" // Conditional / Iteration
  | "ai" // Prompt LLM
  | "research" // Web Page Scrape / Perplexity / Google / Exa / ...
  | "code" // Call API / Code
  | "integration"; // Slack / Linear / etc.

/**
 * Output type pill — drives the colored tag on the node card.
 */
export type WorkflowOutputType = "string" | "json" | "array" | "number" | "any";

/** Node types referenced from the reference screenshot, expandable. */
export type NodeKind =
  | "start"
  | "end"
  | "forecast-related-queries"
  | "pull-prompt-responses"
  | "top-cited-domains"
  | "synthesize-insights"
  | "create-content-brief"
  | "generate-faq-drafts"
  | "prompt-llm"
  | "conditional"
  | "iteration"
  | "web-page-scrape"
  | "get-sitemap"
  | "parallel-deep-research"
  | "parallel-web-search"
  | "perplexity-search"
  | "google-search"
  | "exa"
  | "call-api"
  | "code";

export type WorkflowNode = {
  id: string;
  kind: NodeKind;
  category: NodeCategory;
  /** Title shown in the node header. */
  title: string;
  /** Output pill shown at the bottom of the node card. */
  output?: {
    name: string;
    type: WorkflowOutputType;
  };
  /** Absolute layout coordinates within the canvas. */
  x: number;
  y: number;
};

export type WorkflowEdge = {
  id: string;
  from: string; // node id
  to: string; // node id
};

export type Workflow = {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  /** Inputs declared on the Start node — drives the right-rail config. */
  inputs: WorkflowInput[];
};

export type WorkflowInputType = "string" | "number" | "json" | "array";

export type WorkflowInput = {
  id: string;
  name: string;
  type: WorkflowInputType;
  required: boolean;
};

/* --------------------------- Palette catalog --------------------------- */

/** Single row in the left-rail palette accordion. */
export type PaletteNode = {
  kind: NodeKind;
  title: string;
  /** Brand-name lookup for icon swatches (`google`, `reddit`, etc.). */
  brand?: "google" | "perplexity" | "exa" | "reddit" | "anthropic" | "openai";
  /** Hides the up-arrow expand affordance. */
  hasSubmenu?: boolean;
};

export type PaletteCategory = {
  id: NodeCategory;
  title: string;
  nodes: PaletteNode[];
};
