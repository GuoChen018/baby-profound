/**
 * Agents — Agent Run page.
 *
 * Source: `_reference/profound/agents/notes.md` View 2 +
 * `screenshot-agent-run.png`.
 *
 * Layout (top → bottom, full bleed within the workspace main column):
 *   1. Sub-header bar — `‹ Back` on the left, `Past runs` + `Edit agent` right
 *   2. Two-pane AgentRunPane — left form, right output skeleton
 *
 * Previously the page led with a "Plan limit reached" warning banner
 * (`components/agents/Banner.tsx`) sampled from the Profound capture.
 * Removed per user request — the banner read as production-billing
 * chrome that doesn't belong in this sandbox. The Banner primitive
 * is kept around for future warning surfaces.
 *
 * If the id doesn't resolve to a known agent (e.g. a template id from the
 * Overview grid), we fall back to the canonical "Business Credit Card" agent
 * so the page still demonstrates the run shape end-to-end without 404ing.
 */

import Link from "next/link";
import { Button } from "@/components/ui";
import { ChevronLeftIcon } from "@/components/ui/icons";
import { AgentRunPane } from "@/components/agents";
import { agentTemplates, agents, getAgentById } from "@/lib/data/agents";
import { cn } from "@/lib/cn";

/**
 * Static export needs an exhaustive list of `[id]` values to pre-render.
 * We include both real agents AND template IDs because the Overview /
 * Agents grids both link `<Link href="/agents/<templateId>">`; the
 * runtime fallback (`agents[0]`) renders something sensible even when
 * the id is a template stub.
 */
export async function generateStaticParams() {
  const ids = new Set<string>();
  for (const a of agents) ids.add(a.id);
  for (const t of agentTemplates) ids.add(t.id);
  return [...ids].map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agent = getAgentById(id) ?? agents[0];
  return { title: `${agent.name} · Agents · baby-profound` };
}

export default async function AgentRunPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Templates from the Overview grid land here too — fall back to the
  // canonical agent so the screen always demos a meaningful flow.
  const agent = getAgentById(id) ?? agents[0];

  return (
    <div className="flex flex-col min-h-full">
      <header className="flex items-center justify-between gap-16 px-32 py-12 border-b border-fill-quaternary">
        <Link
          href="/agents"
          className="inline-flex items-center gap-4 text-small text-text-secondary hover:text-text-primary"
        >
          <ChevronLeftIcon className="size-14" />
          Back
        </Link>
        <div className="flex items-center gap-8">
          <Button size="sm" variant="ghost" iconLeft={<ClockIcon />}>
            Past runs
          </Button>
          <Link
            href={`/agents/${agent.id}/edit`}
            className={cn(
              "inline-flex items-center justify-center font-medium",
              "h-24 px-8 text-small rounded-6",
              "bg-control-bg text-text-primary shadow-flat",
              "hover:bg-control-hover transition-colors duration-100",
              "focus-visible:outline-none focus-visible:shadow-focus",
            )}
          >
            Edit agent
          </Link>
        </div>
      </header>

      <div className="flex-1 min-w-0">
        <AgentRunPane agent={agent} />
      </div>
    </div>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M8 4.5V8l2.5 1.5" />
    </svg>
  );
}
