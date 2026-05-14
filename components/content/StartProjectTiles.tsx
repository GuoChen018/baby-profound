/**
 * StartProjectTiles — the "Start a New Project" launchpad.
 *
 * Source: `_reference/profound/content/screenshot.png`. Two side-by-side
 * cards (Create / Optimize), each with:
 *   - small mock thumbnail of an article preview
 *   - title (with optional Beta badge)
 *   - description
 *   - CTA button
 *
 * The Profound capture renders the thumbnail as a stylized stand-in for
 * what the generated doc will look like. We rebuild it here as flat
 * tokenized rectangles — no images involved — so it scales cleanly in
 * dark mode.
 */

import { Badge, Button } from "@/components/ui";
import { PencilIcon, SparklesIcon } from "@/components/ui/icons";
import { SectionHeader } from "@/components/shell";
import { cn } from "@/lib/cn";

function MockArticleThumbnail({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-6",
        "bg-bg-secondary border border-fill-quaternary",
        "w-92 h-88",
        className,
      )}
      aria-hidden
    >
      <div className="absolute inset-x-12 top-12 space-y-6">
        <div className="h-4 w-40 rounded-full bg-fill-tertiary" />
        <div className="h-3 w-full rounded-full bg-fill-quaternary" />
        <div className="h-3 w-full rounded-full bg-fill-quaternary" />
        <div className="h-3 w-3/4 rounded-full bg-fill-quaternary" />
        <div className="pt-4 space-y-3">
          <div className="h-2 w-full rounded-full bg-fill-quaternary" />
          <div className="h-2 w-5/6 rounded-full bg-fill-quaternary" />
          <div className="h-2 w-2/3 rounded-full bg-fill-quaternary" />
        </div>
      </div>
    </div>
  );
}

interface ProjectTileProps {
  icon: React.ReactNode;
  title: string;
  beta?: boolean;
  description: string;
  cta: React.ReactNode;
}

function ProjectTile({ icon, title, beta, description, cta }: ProjectTileProps) {
  return (
    <article
      className={cn(
        "rounded-8 border border-fill-quaternary bg-bg-primary",
        "p-24 flex items-center gap-24",
      )}
    >
      <MockArticleThumbnail />
      <div className="min-w-0 flex-1 space-y-12">
        <div className="space-y-6">
          <div className="flex items-center gap-8">
            <span className="inline-flex size-16 items-center justify-center text-text-tertiary">
              {icon}
            </span>
            <h3 className="text-title-mini font-semibold text-text-primary">
              {title}
            </h3>
            {beta ? (
              <Badge color="blue" size="sm">
                Beta
              </Badge>
            ) : null}
          </div>
          <p className="text-small text-text-secondary leading-relaxed">
            {description}
          </p>
        </div>
        <div>{cta}</div>
      </div>
    </article>
  );
}

export function StartProjectTiles() {
  return (
    <section className="space-y-16">
      <SectionHeader title="Start a New Project" />
      <div className="grid grid-cols-2 gap-16">
        <ProjectTile
          icon={<PencilIcon />}
          title="Create"
          description="Generate high-performing AEO content in minutes."
          cta={
            <Button size="md" iconLeft={<PencilIcon />} disabled>
              Create New Content
            </Button>
          }
        />
        <ProjectTile
          icon={<SparklesIcon />}
          title="Optimize"
          beta
          description="Use Profound AI to enhance your content to boost visibility."
          cta={
            <Button size="md" iconLeft={<SparklesIcon />}>
              Optimize Existing Content
            </Button>
          }
        />
      </div>
    </section>
  );
}
