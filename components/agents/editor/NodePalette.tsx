"use client";

/**
 * Node palette — left rail of the Agent Editor.
 *
 * Tabs: **Nodes** · ✨ Assistant (build-with-AI mode)
 *
 * "Nodes" is a search input + categorized accordion of every node
 * type. Rows are non-functional for now — they don't drag onto the
 * canvas, they're presentation-only. Search filters by node title
 * client-side.
 *
 * "Assistant" used to be a "Coming soon" placeholder. It now renders
 * a finished AI drafting conversation when one is passed in
 * (`assistantConversation`) — falls back to the placeholder
 * otherwise. The conversation surface lets a user who arrived via an
 * opportunity's "Create new agent" action card review WHY the AI
 * built the workflow shape it did, alongside the canvas it produced.
 *
 * `defaultTab` is exposed so the parent editor can open straight to
 * the Assistant when the agent was AI-drafted (`draftedByAI: true`).
 *
 * Notes (`_reference/profound/agents/notes.md` View 3):
 *   - Logic: Conditional · Iteration
 *   - AI: Prompt LLM
 *   - Web Research: Get Sitemap · Web Page Scrape · Parallel Deep Research ·
 *     Parallel Web Search · Perplexity · Google · Exa
 *   - Code: Call API · Code
 *   - Integrations: Slack / Linear / Notion (each with sub-arrow)
 */

import { useMemo, useState } from "react";
import { Input } from "@/components/ui";
import {
  Cog8ToothIcon,
  CommandLineIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  PuzzlePieceIcon,
  SparklesIcon,
} from "@/components/ui/icons";
import { paletteCategories } from "@/lib/data/agent-workflow";
import type {
  NodeCategory,
  PaletteCategory,
  PaletteNode,
} from "@/lib/types/agent-workflow";
import { BrandMark } from "@/components/agents/BrandMark";
import { cn } from "@/lib/cn";

type PaletteTab = "nodes" | "assistant";

/**
 * Shape of an AI-drafted conversation for the Assistant tab. Each
 * message is either text from the user/assistant or a tool-call
 * summary card. The "summary" message is the final wrap-up shown
 * pinned to the bottom of the thread (a recap of the workflow the
 * Assistant built, with a "ready to publish" affordance).
 */
export type AssistantMessage =
  | { role: "user"; text: string }
  | { role: "assistant"; text: string }
  | { role: "tool"; label: string; description: string };

export interface AssistantConversation {
  /** Linear thread, oldest first. Final entry should be the summary. */
  messages: AssistantMessage[];
  /** Pinned summary card — the "what I built" recap. */
  summary: {
    title: string;
    bullets: string[];
  };
}

export interface NodePaletteProps {
  defaultTab?: PaletteTab;
  assistantConversation?: AssistantConversation;
}

export function NodePalette({
  defaultTab = "nodes",
  assistantConversation,
}: NodePaletteProps = {}) {
  const [activeTab, setActiveTab] = useState<PaletteTab>(defaultTab);
  const [query, setQuery] = useState("");

  const filtered = useMemo<PaletteCategory[]>(() => {
    if (!query.trim()) return paletteCategories;
    const q = query.toLowerCase();
    return paletteCategories
      .map((cat) => ({
        ...cat,
        nodes: cat.nodes.filter((n) => n.title.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.nodes.length > 0);
  }, [query]);

  return (
    <aside className="w-260 shrink-0 h-full flex flex-col border-r border-fill-quaternary bg-bg-secondary">
      {/* Tabs */}
      <div className="flex items-center px-12 pt-12 gap-2">
        <PaletteTabButton
          active={activeTab === "nodes"}
          onClick={() => setActiveTab("nodes")}
        >
          Nodes
        </PaletteTabButton>
        <PaletteTabButton
          active={activeTab === "assistant"}
          onClick={() => setActiveTab("assistant")}
          icon={<SparklesIcon className="size-12 text-text-secondary" />}
        >
          Assistant
        </PaletteTabButton>
      </div>

      {activeTab === "nodes" ? (
        <>
          {/* Search */}
          <div className="px-12 pt-12 pb-8">
            <Input
              size="sm"
              placeholder="Search"
              iconLeft={<MagnifyingGlassIcon className="size-12" />}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Categories */}
          <nav className="flex-1 overflow-y-auto px-12 py-8 space-y-16">
            {filtered.map((cat) => (
              <PaletteCategorySection key={cat.id} category={cat} />
            ))}
            {filtered.length === 0 ? (
              <p className="text-mini text-text-tertiary px-4 py-12 text-center">
                No nodes match "{query}"
              </p>
            ) : null}
          </nav>
        </>
      ) : assistantConversation ? (
        <AssistantThread conversation={assistantConversation} />
      ) : (
        <div className="flex-1 flex items-center justify-center px-24 py-32">
          <div className="text-center space-y-8">
            <span className="size-32 mx-auto inline-flex items-center justify-center rounded-full bg-bg-tertiary text-text-secondary">
              <SparklesIcon className="size-16" />
            </span>
            <p className="text-mini text-text-secondary">
              Describe a workflow and Assistant will draft it for you.
            </p>
            <p className="text-mini text-text-tertiary">Coming soon</p>
          </div>
        </div>
      )}
    </aside>
  );
}

/**
 * Renders an AI-drafted conversation: scrollable message thread on
 * top, a pinned "summary" card at the bottom, and a non-functional
 * follow-up input below that. Reads as "here's what the Assistant
 * just built for you — review it, then ask follow-ups."
 *
 * Sizing notes — the parent `<aside>` is `w-260`, so message bubbles
 * cap at `max-w-full` and rely on word-wrap to handle long text.
 * Tool-call cards (the gray rows that mimic agent traces) use a
 * tighter monospace-ish padding so they read as artifacts rather
 * than chat.
 */
function AssistantThread({
  conversation,
}: {
  conversation: AssistantConversation;
}) {
  const { messages, summary } = conversation;
  return (
    <>
      <div className="flex-1 overflow-y-auto px-12 py-12 space-y-12">
        {messages.map((msg, i) => (
          <AssistantMessageRow key={i} message={msg} />
        ))}
      </div>
      {/* Summary card — pinned to the bottom of the scroll. Reads
          as the final "here's what I built" panel; this is what the
          user is most likely to skim to before clicking through the
          canvas. */}
      <div className="px-12 pt-8 pb-8 border-t border-fill-quaternary">
        <div className="rounded-6 bg-bg-tertiary px-10 py-10 space-y-6">
          <div className="flex items-center gap-6">
            <SparklesIcon className="size-12 text-text-secondary" />
            <p className="text-mini font-medium text-text-primary">
              {summary.title}
            </p>
          </div>
          <ul className="space-y-3 text-mini text-text-secondary">
            {summary.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-6">
                <span
                  aria-hidden
                  className="mt-5 size-4 shrink-0 rounded-full bg-text-tertiary"
                />
                <span className="leading-[16px]">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Follow-up input — non-functional, but signals "you can ask
          for changes here" which matches how Profound's AI chat
          surfaces work elsewhere in the product. */}
      <div className="px-12 pb-12">
        <Input
          size="sm"
          placeholder="Ask Assistant to refine the agent\u2026"
          iconLeft={<SparklesIcon className="size-12" />}
        />
      </div>
    </>
  );
}

function AssistantMessageRow({ message }: { message: AssistantMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <p
          className={cn(
            "max-w-[90%] rounded-6 px-10 py-7",
            "bg-control-selected text-text-primary",
            "text-mini leading-[18px]",
          )}
        >
          {message.text}
        </p>
      </div>
    );
  }
  if (message.role === "tool") {
    return (
      <div
        className={cn(
          "rounded-6 px-10 py-7 bg-bg-tertiary/60",
          "border border-fill-quaternary",
        )}
      >
        <div className="flex items-center gap-6 mb-2">
          <span
            aria-hidden
            className="size-12 rounded-4 inline-flex items-center justify-center bg-bg-tertiary"
          >
            <Cog8ToothIcon className="size-10 text-text-tertiary" />
          </span>
          <p className="text-micro font-semibold uppercase tracking-wide text-text-tertiary">
            {message.label}
          </p>
        </div>
        <p className="text-mini text-text-secondary leading-[16px]">
          {message.description}
        </p>
      </div>
    );
  }
  return (
    <p className="text-mini text-text-secondary leading-[18px] whitespace-pre-line">
      {message.text}
    </p>
  );
}

function PaletteTabButton({
  active,
  onClick,
  children,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-26 px-10 inline-flex items-center gap-4 rounded-6",
        "text-mini font-medium transition-colors",
        active
          ? "bg-bg-tertiary text-text-primary"
          : "text-text-secondary hover:bg-bg-tertiary/60 hover:text-text-primary",
      )}
    >
      {icon}
      {children}
    </button>
  );
}

const categoryIcon: Record<NodeCategory, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  control: SparklesIcon,
  logic: Cog8ToothIcon,
  ai: SparklesIcon,
  research: GlobeAltIcon,
  code: CommandLineIcon,
  integration: PuzzlePieceIcon,
};

function PaletteCategorySection({ category }: { category: PaletteCategory }) {
  const Icon = categoryIcon[category.id];
  return (
    <div className="space-y-4">
      <p className="text-mini font-semibold uppercase tracking-wide text-text-tertiary px-4">
        {category.title}
      </p>
      <ul className="space-y-2">
        {category.nodes.map((n) => (
          <PaletteRow key={`${category.id}-${n.kind}-${n.title}`} node={n} fallbackIcon={<Icon className="size-12" />} />
        ))}
      </ul>
    </div>
  );
}

function PaletteRow({
  node,
  fallbackIcon,
}: {
  node: PaletteNode;
  fallbackIcon: React.ReactNode;
}) {
  return (
    <li>
      <button
        type="button"
        draggable
        className={cn(
          "w-full flex items-center gap-8 px-6 h-28 rounded-6",
          "text-mini font-medium text-text-secondary text-left",
          "hover:bg-bg-tertiary hover:text-text-primary",
          "cursor-grab active:cursor-grabbing transition-colors",
        )}
      >
        {node.brand ? (
          <BrandMark brand={brandForPalette(node.brand)} size="sm" className="shrink-0 size-16 rounded-4" />
        ) : (
          <span className="size-16 inline-flex items-center justify-center rounded-4 bg-bg-tertiary text-text-tertiary shrink-0">
            {fallbackIcon}
          </span>
        )}
        <span className="flex-1 truncate">{node.title}</span>
        {node.hasSubmenu ? (
          <span className="text-text-tertiary text-mini" aria-hidden>
            ›
          </span>
        ) : null}
      </button>
    </li>
  );
}

/**
 * Palette node brand strings are looser than `Agent.brand` (e.g. "exa",
 * "anthropic"). For now we map the supported ones to BrandMark brands and
 * fall back to `profound`.
 */
function brandForPalette(brand: NonNullable<PaletteNode["brand"]>) {
  if (brand === "google" || brand === "perplexity" || brand === "reddit") {
    return brand;
  }
  return "profound" as const;
}
