/**
 * Agents — Overview tab.
 *
 * Source: `_reference/profound/agents/notes.md` View 1 + `screenshot.png`.
 *
 * Page composition (top → bottom):
 *   1. PageHeader title row + sub-tab row with the `+ New Agent` split-button
 *   2. Hero composer ("What do you want to build?")
 *   3. Template grid (4 × 2)
 *   4. Recent agents — filter chips + search + table
 *
 * Sub-tabs other than Overview are deferred (see `notes.md`); they render as
 * disabled-looking links until those screens are built.
 */

import Link from "next/link";
import { ChevronRightIcon, MagnifyingGlassIcon } from "@/components/ui/icons";
import { PageHeader, SectionHeader } from "@/components/shell";
import { Input, Select } from "@/components/ui";
import {
  AgentTable,
  HeroComposer,
  SplitButton,
  TabBar,
  TemplateCard,
} from "@/components/agents";
import { agentTemplates, agents } from "@/lib/data/agents";

const SUBTABS = [
  { id: "overview", label: "Overview" },
  { id: "all", label: "All Agents" },
  { id: "templates", label: "Templates" },
  { id: "scheduled", label: "Scheduled" },
];

export const metadata = { title: "Agents · Brex · baby-profound" };

export default function AgentsPage() {
  return (
    <div className="mx-auto max-w-1280 px-32 py-24 space-y-32">
      <PageHeader
        title="Agents"
        tabs={
          <div className="flex items-center justify-between gap-16">
            <TabBar items={SUBTABS} activeId="overview" />
            <SplitButton variant="inverse">New Agent</SplitButton>
          </div>
        }
      />

      <div className="pt-12">
        <HeroComposer />
      </div>

      <section className="space-y-16">
        <SectionHeader
          title={
            <span className="text-small font-medium text-text-secondary">
              Start from a template
            </span>
          }
          action={<SeeAllLink href="/agents?tab=templates" />}
        />
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-16">
          {agentTemplates.map((tpl) => (
            <li key={tpl.id} className="contents">
              <TemplateCard template={tpl} href={`/agents/${tpl.id}`} />
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-16">
        <div className="flex items-center justify-between gap-16">
          <div className="flex items-center gap-8">
            <Select size="sm">Created by</Select>
            <Select size="sm">Status</Select>
          </div>
          <div className="flex items-center gap-16">
            <div className="w-220">
              <Input
                size="sm"
                placeholder="Search agents"
                iconLeft={<MagnifyingGlassIcon />}
                aria-label="Search agents"
              />
            </div>
            <SeeAllLink href="/agents?tab=all" />
          </div>
        </div>
        <AgentTable agents={agents} />
      </section>
    </div>
  );
}

function SeeAllLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-small font-medium text-text-secondary hover:text-text-primary transition-colors"
    >
      See all
      <ChevronRightIcon className="size-14" />
    </Link>
  );
}
