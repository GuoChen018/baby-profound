/**
 * OpportunityActionCard — the inset "Outreach →" card on the detail page.
 *
 * Layout (from `_reference/profound/opportunities/screenshot-opportunity-detail.png`):
 *   [icon-tile]  Type → (link affordance)
 *                Description sentence
 *
 * The icon-tile is a 32x32 rounded square containing the type icon. The
 * card is a single click-target that, in the live product, would deep-link
 * to the relevant tool (Outreach → Agents tab, Content Optimization →
 * Content tab, etc.). Here the link is a no-op stub so the affordance
 * reads but nothing breaks.
 *
 * Local primitive — if a second tab grows the same "deep-link tile" pattern
 * (Knowledge Bases → source connectors comes to mind), it should be promoted
 * to `components/ui/ActionTile.tsx`.
 */

import {
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  PencilIcon,
  SparklesIcon,
} from "@/components/ui/icons";
import type { OpportunityType } from "@/lib/types";
import { cn } from "@/lib/cn";

const TYPE_GLYPH: Record<
  OpportunityType,
  { Icon: React.ElementType; tone: string }
> = {
  Outreach: {
    Icon: EnvelopeIcon,
    tone: "text-text-green",
  },
  "Content Optimization": {
    Icon: SparklesIcon,
    tone: "text-badge-amber-emphasis",
  },
  "Content Creation": {
    Icon: PencilIcon,
    tone: "text-text-green",
  },
  Reddit: {
    Icon: ChatBubbleLeftRightIcon,
    tone: "text-badge-orange-emphasis",
  },
  LinkedIn: {
    Icon: ChatBubbleLeftRightIcon,
    tone: "text-badge-blue-emphasis",
  },
};

export interface OpportunityActionCardProps {
  type: OpportunityType;
  /** Type label override — the action card sometimes states a tool name
   * different from the literal type (e.g. an Outreach opp links to Agents). */
  typeLabel?: string;
  description: string;
  /** Where the action would deep-link in production. Falls back to "#". */
  href?: string;
  className?: string;
}

export function OpportunityActionCard({
  type,
  typeLabel,
  description,
  href = "#",
  className,
}: OpportunityActionCardProps) {
  const { Icon, tone } = TYPE_GLYPH[type];
  const label = typeLabel ?? type;

  return (
    <a
      href={href}
      className={cn(
        "group flex items-start gap-16",
        "rounded-8 bg-bg-secondary shadow-flat",
        "px-16 py-14",
        "transition-colors duration-100",
        "hover:bg-bg-tertiary",
        "focus-visible:outline-none focus-visible:shadow-focus",
        className,
      )}
    >
      <div className="size-32 shrink-0 inline-flex items-center justify-center rounded-6 bg-bg-primary shadow-flat">
        <Icon className={cn("size-16", tone)} />
      </div>
      <div className="min-w-0 flex-1 space-y-4">
        <div className="inline-flex items-center gap-4 text-small font-semibold text-text-primary">
          <span>{label}</span>
          <ChevronRightIcon
            aria-hidden
            className="size-12 text-text-tertiary group-hover:text-text-primary transition-colors"
          />
        </div>
        <p className="text-small text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </a>
  );
}
