/**
 * Content tab — types.
 *
 * Source: `_reference/profound/content/notes.md` and the two captures
 * (`screenshot.png`, `screenshot-content-detail.png`).
 */

import type { Platform } from "@/lib/types";

// ────────────────────────────────────────────────────────────────────
// Project list (Content overview)
// ────────────────────────────────────────────────────────────────────

export type ContentStatus = "Draft" | "Completed" | "Published" | "Archived";

export type ContentTemplate =
  | "Blog Post"
  | "FAQ"
  | "Comparison"
  | "Listicle"
  | "Guide"
  // Short-form artefact produced by reply-drafting agents (e.g. the
  // Reddit Sentiment Tracker). Same editor surface, different
  // workflow shape — no AEO scoring, no "Top-cited pages" gather.
  | "Social Reply"
  // The "research + outline" stage that precedes a Blog Post —
  // surfaced when an opportunity's action card kicks off content
  // creation. The editor renders it identically to a Blog Post but
  // the project list reads "Content Brief" so reviewers can scan
  // the difference between briefs (pre-writing) and drafts.
  | "Content Brief";

/** "generation" = greenfield content; "optimization" = improve existing URL. */
export type ContentWorkflow = "generation" | "optimization";

export interface ContentOwner {
  name: string;
  initials: string;
}

export interface ContentProject {
  id: string;
  title: string;
  status: ContentStatus;
  template: ContentTemplate;
  workflow: ContentWorkflow;
  /** Platforms the article has been cited on — rendered as avatar stack. */
  citedPlatforms: Platform[];
  /** Human-readable relative time. The Profound capture shows e.g. "1 month ago". */
  updatedLabel: string;
  /** ISO date for sorting. */
  updatedAt: string;
  owner: ContentOwner;
}

// ────────────────────────────────────────────────────────────────────
// Article body — semantic-tagged blocks for the gutter-annotated editor.
// The notes call out that the gutter labels (h1/h2/p/ul/li) are a
// distinctive "AEO-as-checklist" UX touch, so we bake the tag into the
// data model rather than parsing HTML at render time.
// ────────────────────────────────────────────────────────────────────

export type ArticleBlock =
  | { tag: "h1"; text: string }
  | { tag: "h2"; text: string }
  | { tag: "h3"; text: string }
  | { tag: "p"; text: string; bold?: string }
  | { tag: "ul"; items: Array<{ text: string; href?: string }> }
  | { tag: "hr" };

export interface ArticleBody {
  blocks: ArticleBlock[];
}

// ────────────────────────────────────────────────────────────────────
// Content detail (article editor)
// ────────────────────────────────────────────────────────────────────

export type ContentDetailTab = "aeo" | "history" | "workflow" | "inputs";

export interface ContentMetadata {
  metaTitle: string;
  metaDescription: string;
  slug: string;
}

export interface ArticleHeading {
  level: 1 | 2 | 3;
  text: string;
}

export interface ContentDetail extends ContentProject {
  body: ArticleBody;
  finalDraft?: ArticleBody;
  metadata: ContentMetadata;
  headings: ArticleHeading[];
  wordCount: number;
}
