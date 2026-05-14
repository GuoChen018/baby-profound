/**
 * PlatformAvatarStack — overlapping circle row showing which AI engines
 * cited a prompt. Used in the citing-pages accordion's "Cited Websites"
 * column. Pattern recurs across Profound (Top Opportunities, AEI mention
 * rows, etc.) — likely worth promoting to `components/ui/` once a second
 * tab needs it.
 *
 * Source: `_reference/profound/prompt-volumes/screenshot.png` — small
 * brand-colored discs with a 1-letter glyph, overlapping by ~6px, capped
 * at `max` visible with `+N` overflow chip on the right.
 *
 * Brand colors are intentionally simplified — we don't ship real engine
 * logos in the sandbox.
 */

import type { Platform } from "@/lib/types";
import { cn } from "@/lib/cn";

export interface PlatformAvatarStackProps {
  platforms: Platform[];
  /** Max avatars to render before collapsing the rest into a "+N" chip. */
  max?: number;
  className?: string;
}

type PlatformMeta = {
  /** Single-letter glyph rendered inside the circle. */
  glyph: string;
  /** Background color class for the avatar. Pulled from the badge palette
   *  so values stay theme-aware. */
  bg: string;
  /** Foreground (text) color class for the glyph. */
  fg: string;
  /** Long-form name for the title attr / future tooltip. */
  name: string;
};

const PLATFORM_META: Record<Platform, PlatformMeta> = {
  chatgpt: {
    glyph: "C",
    bg: "bg-badge-green-emphasis",
    fg: "text-badge-green-muted",
    name: "ChatGPT",
  },
  perplexity: {
    glyph: "P",
    bg: "bg-badge-cyan-emphasis",
    fg: "text-badge-cyan-muted",
    name: "Perplexity",
  },
  anthropic: {
    glyph: "A",
    bg: "bg-badge-orange-emphasis",
    fg: "text-badge-orange-muted",
    name: "Claude (Anthropic)",
  },
  google: {
    glyph: "G",
    bg: "bg-badge-blue-emphasis",
    fg: "text-badge-blue-muted",
    name: "Google AI Overviews",
  },
  gemini: {
    glyph: "✦",
    bg: "bg-badge-purple-emphasis",
    fg: "text-badge-purple-muted",
    name: "Gemini",
  },
  copilot: {
    glyph: "M",
    bg: "bg-badge-amber-emphasis",
    fg: "text-badge-amber-muted",
    name: "Microsoft Copilot",
  },
  grok: {
    glyph: "X",
    bg: "bg-fill-primary",
    fg: "text-fill-inverse",
    name: "Grok",
  },
  meta: {
    glyph: "M",
    bg: "bg-badge-blue-emphasis",
    fg: "text-badge-blue-muted",
    name: "Meta AI",
  },
};

export function PlatformAvatarStack({
  platforms,
  max = 5,
  className,
}: PlatformAvatarStackProps) {
  const visible = platforms.slice(0, max);
  const overflow = Math.max(0, platforms.length - max);

  return (
    <div
      className={cn(
        // Negative spacing on children produces the overlap; the wrapper
        // just provides the row + overflow gap.
        "inline-flex items-center",
        className,
      )}
    >
      <div className="flex items-center -space-x-6">
        {visible.map((p, i) => {
          const meta = PLATFORM_META[p];
          return (
            <span
              key={`${p}-${i}`}
              title={meta.name}
              aria-label={meta.name}
              className={cn(
                "relative inline-flex items-center justify-center",
                "size-18 rounded-full",
                "ring-2 ring-bg-primary",
                "text-[9px] font-semibold leading-none",
                meta.bg,
                meta.fg,
              )}
              style={{ zIndex: visible.length - i }}
            >
              {meta.glyph}
            </span>
          );
        })}
      </div>
      {overflow > 0 ? (
        <span
          className={cn(
            "ml-6 inline-flex items-center justify-center",
            "h-18 px-6 rounded-full",
            "bg-bg-tertiary text-text-secondary",
            "text-mini font-medium tabular-nums",
          )}
        >
          +{overflow}
        </span>
      ) : null}
    </div>
  );
}
