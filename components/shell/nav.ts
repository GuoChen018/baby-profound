/**
 * Sidebar navigation config — canonical Brex workspace tabs.
 *
 * Source: Figma node `1:17682` (Profound sidebar mockup with Brex/Ramp data).
 * Every nav icon is the exact SVG from Figma, not a heroicon substitute.
 * Dashboards isn't in that frame, so it falls back to the closest heroicon.
 */

import type { ComponentType, SVGProps } from "react";
import {
  AgentAnalyticsIcon,
  AgentsIcon,
  AskIcon,
  BoltIcon,
  ChartBarSquareIcon,
  ContentIcon,
  KnowledgeBaseIcon,
  MagnifyingGlassIcon,
  OpportunitiesIcon,
  OverviewIcon,
  PromptVolumesIcon,
  SheetsIcon,
  ShoppingIcon,
} from "@/components/ui/icons";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: IconComponent;
  /** Optional pill on the right of the label, e.g. "Beta" or "Alpha". */
  flag?: "beta" | "alpha";
};

export type NavSection = {
  id: string;
  /** Omit for the top group (Overview / Ask). */
  title?: string;
  items: NavItem[];
};

export const navSections: NavSection[] = [
  {
    id: "top",
    items: [
      { id: "overview", label: "Overview", href: "/overview", icon: OverviewIcon },
      { id: "ask", label: "Ask", href: "/ask", icon: AskIcon },
    ],
  },
  {
    id: "analytics",
    title: "Analytics",
    items: [
      {
        id: "answer-engine-insights",
        label: "Answer Engine Insights",
        href: "/answer-engine-insights",
        icon: BoltIcon,
      },
      { id: "dashboards", label: "Dashboards", href: "/dashboards", icon: ChartBarSquareIcon },
      {
        id: "prompt-volumes",
        label: "Prompt Volumes",
        href: "/prompt-volumes",
        icon: PromptVolumesIcon,
      },
      {
        id: "agent-analytics",
        label: "Agent Analytics",
        href: "/agent-analytics",
        icon: AgentAnalyticsIcon,
      },
      { id: "shopping", label: "Shopping", href: "/shopping", icon: ShoppingIcon },
    ],
  },
  {
    id: "action",
    title: "Action",
    items: [
      { id: "agents", label: "Agents", href: "/agents", icon: AgentsIcon },
      { id: "sheets", label: "Sheets", href: "/sheets", icon: SheetsIcon },
      { id: "content", label: "Content", href: "/content", icon: ContentIcon },
      {
        id: "opportunities",
        label: "Opportunities",
        href: "/opportunities",
        icon: OpportunitiesIcon,
        flag: "beta",
      },
    ],
  },
  {
    id: "context",
    title: "Context",
    items: [
      {
        id: "knowledge-bases",
        label: "Knowledge Bases",
        href: "/knowledge-bases",
        icon: KnowledgeBaseIcon,
      },
    ],
  },
];

export const searchItem = {
  icon: MagnifyingGlassIcon,
  placeholder: "Search",
  hint: "⌘K",
};
