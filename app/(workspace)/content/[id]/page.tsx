/**
 * Content detail — `/content/[id]`.
 *
 * Source: `_reference/profound/content/screenshot-content-detail.png`.
 *
 * Full-bleed: top toolbar runs flush across the main column, then a
 * two-pane body with the editor on the left and the AEO sidebar on the
 * right. Padding deliberately differs from the standard
 * `mx-auto max-w-1280 px-32 py-24` shell — the editor is meant to feel
 * like a focused workspace, not a dashboard card.
 */

import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRightIcon } from "@/components/ui/icons";
import {
  AeoSidePanel,
  ArticleEditor,
  ContentDetailToolbar,
} from "@/components/content";
import { cn } from "@/lib/cn";
import {
  contentProjects,
  getContentDetail,
} from "@/lib/data/content";

export async function generateStaticParams() {
  return contentProjects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = getContentDetail(id);
  return {
    title: detail
      ? `${detail.title} · Content · baby-profound`
      : "Content · baby-profound",
  };
}

const draftTabs = [
  { id: "brief", label: "Content Brief", active: true, disabled: false },
  { id: "final", label: "Final Draft", active: false, disabled: true },
] as const;

function DraftTabs() {
  return (
    <div className="flex items-center justify-between gap-16">
      <nav role="tablist" aria-label="Document stage" className="flex items-center gap-16">
        {draftTabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.active}
            disabled={t.disabled}
            className={cn(
              "px-12 h-28 rounded-6 text-small font-medium",
              "focus-visible:outline-none focus-visible:shadow-focus",
              t.active && "bg-bg-tertiary text-text-primary",
              !t.active && !t.disabled && "text-text-tertiary hover:text-text-primary",
              t.disabled && "text-text-quaternary cursor-not-allowed",
            )}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-4",
          "text-small text-text-tertiary hover:text-text-primary transition-colors",
        )}
      >
        Create Final Draft
        <ChevronRightIcon className="size-12" />
      </button>
    </div>
  );
}

export default async function ContentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = getContentDetail(id);
  if (!detail) notFound();

  return (
    <div className="flex h-full min-h-full flex-col">
      <ContentDetailToolbar
        initialTitle={detail.title}
        status={detail.status}
      />

      <div
        className={cn(
          "grid flex-1 min-h-0",
          "grid-cols-[minmax(0,1fr)_360px]",
          "gap-24 px-24 py-24",
        )}
      >
        <div className="min-w-0 space-y-16">
          <DraftTabs />
          <ArticleEditor body={detail.body} />
          <p className="text-mini text-text-tertiary">
            <Link
              href="/content"
              className="hover:text-text-primary transition-colors"
            >
              ‹ All Content
            </Link>
          </p>
        </div>

        <AeoSidePanel detail={detail} />
      </div>
    </div>
  );
}
