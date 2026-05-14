/**
 * TemplateCard — single tile in the "Start from a template" grid.
 *
 * Source: `_reference/profound/agents/screenshot.png` — 4-up × 2 rows grid.
 * Each tile is a flat dark surface (`control-bg`) with a small brand icon
 * top-left, the template name beneath it, and the whole card is a button.
 *
 * Per Profound: clicking the card opens a draft agent seeded from the
 * template. We model that as a `<Link>` that drops the user on the run page
 * for the template's id — good enough for the sandbox.
 */

"use client";

import Link from "next/link";
import type { AgentTemplate } from "@/lib/types/agents";
import { cn } from "@/lib/cn";
import { BrandMark } from "./BrandMark";

export interface TemplateCardProps {
  template: AgentTemplate;
  href?: string;
  className?: string;
}

export function TemplateCard({ template, href, className }: TemplateCardProps) {
  const inner = (
    <article
      className={cn(
        "group relative h-full",
        "rounded-8 bg-control-bg shadow-flat",
        "transition-colors duration-100",
        "hover:bg-control-hover",
        "focus-visible:outline-none focus-visible:shadow-focus",
        "px-16 pt-16 pb-14 flex flex-col gap-32 min-h-92",
        className,
      )}
    >
      <BrandMark brand={template.brand} />
      <p className="text-small font-medium text-text-primary leading-snug line-clamp-2">
        {template.name}
      </p>
    </article>
  );

  if (href) {
    return (
      <Link href={href} aria-label={template.name} className="block h-full">
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" aria-label={template.name} className="block w-full text-left">
      {inner}
    </button>
  );
}
