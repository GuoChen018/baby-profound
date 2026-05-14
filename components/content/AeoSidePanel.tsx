"use client";

/**
 * AeoSidePanel — right-pane "AEO / History / Workflow / Inputs" tabs.
 *
 * Source: `_reference/profound/content/screenshot-content-detail.png`.
 *
 * The AEO tab shows three stacked cards: Word Count, Metadata, Headings.
 * The other three tabs are intentionally stub-only — see `Build notes`
 * in `_reference/profound/content/notes.md` for what they're meant to do
 * (revision log, agent flow, brief inputs).
 */

import { useState } from "react";
import { Card } from "@/components/ui";
import { PencilIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type {
  ArticleHeading,
  ContentDetail,
  ContentDetailTab,
  ContentMetadata,
} from "@/lib/types/content";

interface TabDef {
  id: ContentDetailTab;
  label: string;
}

const tabs: TabDef[] = [
  { id: "aeo", label: "AEO" },
  { id: "history", label: "History" },
  { id: "workflow", label: "Workflow" },
  { id: "inputs", label: "Inputs" },
];

export interface AeoSidePanelProps {
  detail: ContentDetail;
}

export function AeoSidePanel({ detail }: AeoSidePanelProps) {
  const [active, setActive] = useState<ContentDetailTab>("aeo");

  return (
    <aside className="space-y-16">
      <nav
        role="tablist"
        aria-label="Document context"
        className="flex items-center gap-24 border-b border-fill-quaternary"
      >
        {tabs.map((t) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t.id)}
              className={cn(
                "relative h-32 text-small font-medium transition-colors",
                "focus-visible:outline-none",
                isActive
                  ? "text-text-primary"
                  : "text-text-tertiary hover:text-text-primary",
              )}
            >
              {t.label}
              {isActive ? (
                <span
                  aria-hidden
                  className="absolute -bottom-px left-0 right-0 h-2 bg-text-primary rounded-full"
                />
              ) : null}
            </button>
          );
        })}
      </nav>

      {active === "aeo" ? <AeoTab detail={detail} /> : <DeferredTab tab={active} />}
    </aside>
  );
}

function AeoTab({ detail }: { detail: ContentDetail }) {
  return (
    <div className="space-y-16">
      <WordCountCard count={detail.wordCount} />
      <MetadataCard metadata={detail.metadata} />
      <HeadingsCard headings={detail.headings} />
    </div>
  );
}

function WordCountCard({ count }: { count: number }) {
  return (
    <Card title="Word Count">
      <div className="space-y-4">
        <p className="text-title-regular font-semibold text-text-primary tabular-nums">
          {count.toLocaleString()}
        </p>
        <p className="text-mini text-text-tertiary">Total words in content</p>
      </div>
    </Card>
  );
}

function MetadataRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-6 text-mini text-text-tertiary">
        <span>{label}</span>
        <button
          type="button"
          aria-label={`Edit ${label}`}
          className="inline-flex size-12 items-center justify-center text-text-tertiary hover:text-text-primary"
        >
          <PencilIcon className="size-12" />
        </button>
      </div>
      <p className="text-small text-text-primary leading-snug">{value}</p>
    </div>
  );
}

function MetadataCard({ metadata }: { metadata: ContentMetadata }) {
  return (
    <Card title="Metadata">
      <div className="space-y-16">
        <MetadataRow label="Meta title" value={metadata.metaTitle} />
        <MetadataRow label="Meta description" value={metadata.metaDescription} />
        <MetadataRow label="Slug" value={metadata.slug} />
      </div>
    </Card>
  );
}

function HeadingsCard({ headings }: { headings: ArticleHeading[] }) {
  return (
    <Card
      title="Headings"
      action={
        <span className="text-mini text-text-tertiary tabular-nums">
          {headings.length} total
        </span>
      }
      flush
    >
      <ul className="max-h-280 overflow-y-auto">
        {headings.map((h, i) => (
          <li
            key={`${h.level}-${i}`}
            className={cn(
              "flex items-start gap-10 px-24 py-10",
              "border-t border-fill-quaternary",
              "text-small text-text-primary",
            )}
          >
            <span
              className={cn(
                "shrink-0 inline-flex size-20 items-center justify-center rounded-4",
                "bg-bg-tertiary text-mini font-medium text-text-tertiary uppercase",
              )}
              aria-hidden
            >
              h{h.level}
            </span>
            <span className="min-w-0 leading-snug">{h.text}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function DeferredTab({ tab }: { tab: Exclude<ContentDetailTab, "aeo"> }) {
  const messages: Record<typeof tab, string> = {
    history: "Revision history is captured but not yet implemented.",
    workflow: "Workflow trace links back to the generating Agent (deferred).",
    inputs: "Brief inputs (prompts, target topic, sources) — coming soon.",
  };
  return (
    <div
      className={cn(
        "rounded-8 border border-dashed border-fill-quaternary",
        "px-16 py-24 text-small text-text-tertiary",
      )}
    >
      {messages[tab]}
    </div>
  );
}
