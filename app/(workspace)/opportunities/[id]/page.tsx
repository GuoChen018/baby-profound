import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowTopRightOnSquareIcon,
  ChatBubbleLeftRightIcon,
  ChevronLeftIcon,
  EnvelopeIcon,
  InformationCircleIcon,
  PencilIcon,
  SparklesIcon,
  XMarkIcon,
} from "@/components/ui/icons";
import { Disclosure, Meter, Tag } from "@/components/ui";
import {
  ItemPagination,
  OpportunityActionCard,
} from "@/components/opportunities";
import {
  allOpportunities,
  findOpportunity,
  indexOfOpportunity,
} from "@/lib/data/opportunities";

/**
 * Static export needs an exhaustive list of `[id]` values to
 * pre-render. The Overview prototype links to themed opportunity
 * IDs (`op-content-brief-top-business-credit-cards`, etc.) that
 * don't exist in `allOpportunities` — those route through the
 * listing page via the Overview's tile hrefs, so we only need to
 * pre-render the real catalog here.
 */
export async function generateStaticParams() {
  return allOpportunities.map((opp) => ({ id: opp.id }));
}
import type {
  CurrentPerformance,
  Opportunity,
  OpportunityTarget,
  OpportunityType,
} from "@/lib/types";
import { cn } from "@/lib/cn";

const TYPE_ICON: Record<
  OpportunityType,
  { Icon: React.ElementType; tone: string }
> = {
  Outreach: { Icon: EnvelopeIcon, tone: "text-text-green" },
  "Content Optimization": {
    Icon: SparklesIcon,
    tone: "text-badge-amber-emphasis",
  },
  "Content Creation": { Icon: PencilIcon, tone: "text-text-green" },
  Reddit: { Icon: ChatBubbleLeftRightIcon, tone: "text-badge-orange-emphasis" },
  LinkedIn: {
    Icon: ChatBubbleLeftRightIcon,
    tone: "text-badge-blue-emphasis",
  },
};

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: DetailPageProps) {
  const { id } = await params;
  const opp = findOpportunity(id);
  if (!opp) return { title: "Opportunity · Brex · baby-profound" };
  return {
    title: `${opp.type} · Opportunities · Brex · baby-profound`,
  };
}

export default async function OpportunityDetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  const opp = findOpportunity(id);
  if (!opp) notFound();

  const idx = indexOfOpportunity(id);
  const total = allOpportunities.length;
  const prev = idx > 0 ? allOpportunities[idx - 1] : null;
  const next = idx < total - 1 ? allOpportunities[idx + 1] : null;

  return (
    <div className="mx-auto max-w-1280 px-32 py-24 space-y-32">
      <header className="flex items-center justify-between gap-16">
        <Link
          href="/opportunities"
          className={cn(
            "inline-flex items-center gap-4 text-small text-text-secondary",
            "rounded-4 transition-colors duration-100",
            "hover:text-text-primary",
            "focus-visible:outline-none focus-visible:shadow-focus",
          )}
        >
          <ChevronLeftIcon aria-hidden className="size-14" />
          <span>All opportunities</span>
        </Link>
        <ItemPagination
          current={idx + 1}
          total={total}
          prevHref={prev ? `/opportunities/${prev.id}` : undefined}
          nextHref={next ? `/opportunities/${next.id}` : undefined}
        />
      </header>

      <article className="mx-auto w-full max-w-720 space-y-24">
        <DetailHeadline opportunity={opp} />

        <CurrentPerformanceRow performance={opp.currentPerformance} />

        {opp.actionCard ? (
          <OpportunityActionCard
            type={opp.type}
            typeLabel={opp.actionCard.type}
            description={opp.actionCard.description}
          />
        ) : null}

        <hr className="border-fill-quaternary" />

        {opp.implementation && opp.implementation.length > 0 ? (
          <section>
            <Disclosure
              summary={<span className="text-base">Implementation</span>}
              defaultOpen
            >
              <ol className="space-y-20">
                {opp.implementation.map((step, i) => (
                  <li
                    key={i}
                    className={cn(
                      "flex items-start gap-16 pb-20",
                      i < opp.implementation!.length - 1 &&
                        "border-b border-fill-quaternary",
                    )}
                  >
                    <span
                      aria-hidden
                      className="mt-2 size-16 shrink-0 inline-flex items-center justify-center text-text-tertiary"
                    >
                      <BulletGlyph />
                    </span>
                    <p className="text-small text-text-secondary leading-relaxed">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </Disclosure>
          </section>
        ) : null}

        {opp.rationale ? (
          <section>
            <Disclosure
              summary={<span className="text-base">Rationale</span>}
              defaultOpen
            >
              <p className="text-small text-text-secondary leading-relaxed whitespace-pre-line">
                {opp.rationale}
              </p>
            </Disclosure>
          </section>
        ) : (
          <section>
            <Disclosure
              summary={<span className="text-base">Rationale</span>}
              defaultOpen
            >
              <p className="text-small text-text-secondary leading-relaxed">
                {opp.description}
              </p>
            </Disclosure>
          </section>
        )}
      </article>
    </div>
  );
}

// ─────────────────── helpers ───────────────────

function DetailHeadline({ opportunity }: { opportunity: Opportunity }) {
  const { type, target, headline } = opportunity;
  const { Icon: TypeIcon, tone } = TYPE_ICON[type];

  return (
    <div className="space-y-16">
      <div className="flex items-center gap-12 flex-wrap">
        <Tag
          asSpan
          size="sm"
          iconLeft={<TypeIcon className={cn("size-12", tone)} />}
          className="bg-bg-tertiary"
        >
          {type}
        </Tag>
        <TargetLabel target={target} type={type} />
      </div>
      <h1 className="text-title-mini font-semibold text-text-primary leading-snug">
        {headline}
      </h1>
    </div>
  );
}

function TargetLabel({
  target,
  type,
}: {
  target: OpportunityTarget;
  type: OpportunityType;
}) {
  if (target.kind === "person") {
    return (
      <span className="inline-flex items-center gap-6 text-small text-text-secondary">
        <span className="text-text-primary font-medium">{target.label}</span>
        {type === "Outreach" ? (
          <EnvelopeIcon className="size-12 text-text-tertiary" />
        ) : null}
      </span>
    );
  }
  if (target.kind === "url" || target.kind === "subreddit") {
    return (
      <a
        href={target.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-4 text-small text-text-secondary font-medium truncate hover:text-text-primary"
      >
        <span className="text-text-primary truncate">{target.label}</span>
        <ArrowTopRightOnSquareIcon className="size-12 text-text-tertiary shrink-0" />
      </a>
    );
  }
  return (
    <span className="text-small text-text-secondary font-medium italic">
      {target.label}
    </span>
  );
}

function CurrentPerformanceRow({
  performance,
}: {
  performance: CurrentPerformance;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-12 whitespace-nowrap",
        "rounded-6 bg-bg-secondary px-12 py-8",
        "shadow-flat",
      )}
    >
      <span className="text-mini text-text-tertiary">Current Performance:</span>
      {performance.status === "Not Mentioned" ? (
        <span className="inline-flex items-center gap-4 text-small font-medium text-text-red">
          <XMarkIcon className="size-12" />
          Not Mentioned
        </span>
      ) : (
        <span className="inline-flex items-center gap-8">
          <Meter value={performance.value} className="w-80 shrink-0" />
          <span className="text-small text-text-primary tabular-nums">
            {performance.value.toFixed(1)}%
          </span>
          <span className="text-small text-text-secondary">
            {performance.status}
          </span>
          <InformationCircleIcon className="size-12 text-text-tertiary shrink-0" />
        </span>
      )}
    </div>
  );
}

function BulletGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden
    >
      <circle cx="8" cy="8" r="6" />
    </svg>
  );
}
