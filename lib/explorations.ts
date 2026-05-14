/**
 * Explorations registry.
 *
 * Each entry is a self-contained experimental variant living under
 * `app/explorations/<slug>/page.tsx`. Explorations sit OUTSIDE the canonical
 * `(workspace)` layout — they have no sidebar by default and can reshape the
 * page however they want.
 *
 * To add a new exploration:
 *   1. Create `app/explorations/<slug>/page.tsx`
 *   2. Add an entry below with title + description + tag
 *
 * No file-system scanning — explicit registration so the listing page can
 * render server-side without any client-side magic.
 */

export type ExplorationTag = "Overview" | "Opportunities" | "Ask" | "Design system" | "Layout" | "Compositional";

export type Exploration = {
  slug: string;
  title: string;
  description: string;
  tags: ExplorationTag[];
  /** ISO date — used for sort order on the listing page. */
  createdAt: string;
};

export const explorations: Exploration[] = [
  {
    slug: "compact-overview",
    title: "Compact Overview",
    description:
      "Single-column, density-first Overview. Strips card chrome, stacks every section in one column, and shrinks padding by 30%. Trade-off: less elevation, more data per scroll.",
    tags: ["Overview", "Layout"],
    createdAt: "2026-05-13",
  },
  {
    slug: "design-system",
    title: "Design system preview",
    description:
      "Smoke-test page for the underlying primitives — Buttons, Tags, Badges, Toggles, Selects, Tooltips. Useful for catching regressions when the token layer changes.",
    tags: ["Design system"],
    createdAt: "2026-05-12",
  },
];

export function getExploration(slug: string): Exploration | undefined {
  return explorations.find((e) => e.slug === slug);
}
