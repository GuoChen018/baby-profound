"use client";

/**
 * Node palette — left rail of the Agent Editor.
 *
 * Tabs: **Nodes** (active) · ✨ Assistant (build-with-AI mode)
 * Then a search input + categorized accordion of every node type.
 *
 * Notes (`_reference/profound/agents/notes.md` View 3):
 *   - Logic: Conditional · Iteration
 *   - AI: Prompt LLM
 *   - Web Research: Get Sitemap · Web Page Scrape · Parallel Deep Research ·
 *     Parallel Web Search · Perplexity · Google · Exa
 *   - Code: Call API · Code
 *   - Integrations: Slack / Linear / Notion (each with sub-arrow)
 *
 * Rows are non-functional for now — they don't drag onto the canvas,
 * they're presentation-only. Search filters by node title client-side.
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

export function NodePalette() {
  const [activeTab, setActiveTab] = useState<PaletteTab>("nodes");
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
