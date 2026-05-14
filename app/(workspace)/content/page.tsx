/**
 * Content overview — `/content`.
 *
 * Source: `_reference/profound/content/screenshot.png`.
 *
 * Layout: PageHeader with two sub-tabs (Generate Content / Tools — only
 * the first is functional, per the build brief), the Start a New Project
 * launchpad, then the projects table.
 */

import { PageHeader } from "@/components/shell";
import { ProjectsTable, StartProjectTiles } from "@/components/content";
import { contentProjects } from "@/lib/data/content";
import { cn } from "@/lib/cn";

export const metadata = { title: "Content · Brex · baby-profound" };

const subTabs = [
  { id: "generate", label: "Generate Content", active: true },
  { id: "tools", label: "Tools", active: false },
] as const;

function PageSubTabs() {
  return (
    <nav
      role="tablist"
      aria-label="Content workspace"
      className="flex items-center gap-24 border-b border-fill-quaternary"
    >
      {subTabs.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={t.active}
          className={cn(
            "relative h-32 text-small font-medium transition-colors",
            "focus-visible:outline-none",
            t.active
              ? "text-text-primary"
              : "text-text-tertiary hover:text-text-primary",
          )}
        >
          {t.label}
          {t.active ? (
            <span
              aria-hidden
              className="absolute -bottom-px left-0 right-0 h-2 bg-text-primary rounded-full"
            />
          ) : null}
        </button>
      ))}
    </nav>
  );
}

export default function ContentPage() {
  return (
    <div className="mx-auto max-w-1280 px-32 py-24 space-y-32">
      <PageHeader title="Content" tabs={<PageSubTabs />} />
      <StartProjectTiles />
      <ProjectsTable projects={contentProjects} />
    </div>
  );
}
