import Link from "next/link";
import { explorations } from "@/lib/explorations";
import { Tag } from "@/components/ui";
import { ArrowTopRightOnSquareIcon } from "@/components/ui/icons";

/**
 * Explorations index — the sandbox catalogue.
 *
 * Lists every registered exploration as a flat hairline-separated row.
 * Sort: newest first. Title + description + tags + → arrow on hover.
 */
export default function ExplorationsIndex() {
  const sorted = [...explorations].sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1,
  );

  return (
    <div className="mx-auto max-w-5xl px-32 py-48 space-y-32">
      <header className="space-y-8">
        <h1 className="text-title-mega font-semibold tracking-tight text-text-primary">
          Explorations
        </h1>
        <p className="text-regular text-text-secondary max-w-[60ch]">
          Throwaway variants of canonical pages — pattern studies, layout
          experiments, alternate framings. Nothing here is shipped.
        </p>
      </header>

      <ul className="border-t border-fill-quaternary">
        {sorted.map((exp) => (
          <li key={exp.slug} className="border-b border-fill-quaternary">
            <Link
              href={`/explorations/${exp.slug}`}
              className="group flex items-start justify-between gap-24 py-20 transition-colors hover:bg-bg-secondary/40"
            >
              <div className="space-y-8 min-w-0 flex-1">
                <div className="flex items-baseline gap-12">
                  <h2 className="text-title-mini font-semibold text-text-primary group-hover:text-text-primary">
                    {exp.title}
                  </h2>
                  <time
                    className="text-mini text-text-tertiary tabular-nums shrink-0"
                    dateTime={exp.createdAt}
                  >
                    {exp.createdAt}
                  </time>
                </div>
                <p className="text-small text-text-secondary max-w-[68ch]">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-6 pt-4">
                  {exp.tags.map((tag) => (
                    <Tag key={tag} size="sm">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
              <ArrowTopRightOnSquareIcon className="size-16 text-text-tertiary group-hover:text-text-primary transition-colors shrink-0 mt-6" />
            </Link>
          </li>
        ))}
      </ul>

      <footer className="pt-32 text-mini text-text-tertiary space-y-6">
        <p>
          Press{" "}
          <kbd className="font-mono text-text-secondary bg-bg-tertiary rounded-4 px-4 py-2">
            ⌘K
          </kbd>{" "}
          anywhere to switch between the workspace and these prototypes.
        </p>
        <p>
          To add a new exploration: create{" "}
          <code className="font-mono text-text-secondary">
            app/explorations/&lt;slug&gt;/page.tsx
          </code>{" "}
          and register it in{" "}
          <code className="font-mono text-text-secondary">lib/explorations.ts</code>.
        </p>
      </footer>
    </div>
  );
}
