/**
 * ComingSoon — placeholder for tabs not yet implemented.
 */

import { SparklesIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/shell";
import { EmptyState } from "@/components/ui";

export interface ComingSoonProps {
  title: string;
  note?: string;
  /** Slug into `_reference/profound/<slug>/` for context. */
  referenceSlug?: string;
}

export function ComingSoon({ title, note, referenceSlug }: ComingSoonProps) {
  return (
    <div className="mx-auto max-w-1280 px-32 py-24 space-y-24">
      <PageHeader title={title} />
      <EmptyState
        inset
        illustration={
          <span className="inline-flex size-48 items-center justify-center rounded-full bg-bg-tertiary text-text-tertiary">
            <SparklesIcon className="size-20" />
          </span>
        }
        title={`${title} is on the way`}
        body={
          <>
            {note ??
              "This tab is captured but not yet implemented in the sandbox."}
            {referenceSlug ? (
              <>
                {" "}
                Notes and screenshots are in{" "}
                <code className="px-4 py-2 rounded-4 bg-bg-tertiary text-mini">
                  _reference/profound/{referenceSlug}/
                </code>
                .
              </>
            ) : null}
          </>
        }
      />
    </div>
  );
}
