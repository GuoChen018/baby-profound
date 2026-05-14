/**
 * WhatsNew — AI-summarized narrative card on Overview.
 *
 * Source: `_reference/profound/overview/notes.md` ("What's New" panel).
 *
 * Treatment: small label in regular case (matches Profound), big bold title,
 * paragraph body, footer with sparkle + summarized-at timestamp.
 */

import { SparklesIcon } from "@/components/ui/icons";
import type { WhatsNew as WhatsNewData } from "@/lib/types";

export interface WhatsNewProps {
  data: WhatsNewData;
}

export function WhatsNew({ data }: WhatsNewProps) {
  return (
    <article className="bg-bg-primary rounded-8 shadow-flat p-24 h-full flex flex-col gap-16">
      <p className="text-small font-medium text-text-secondary">What&apos;s New</p>

      <div className="space-y-12 flex-1">
        <h2 className="text-title-mini font-semibold text-text-primary leading-snug">
          {data.title}
        </h2>
        <p className="text-paragraph text-text-secondary leading-relaxed">
          {data.body}
        </p>
      </div>

      <footer className="inline-flex items-center gap-6 text-mini text-text-tertiary">
        <SparklesIcon className="size-12" />
        <span>Summarized by Profound at {data.summarizedAt}</span>
      </footer>
    </article>
  );
}
