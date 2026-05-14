/**
 * PlatformAvatarStack — overlapping circles representing the AI platforms
 * a piece of content has been cited on.
 *
 * Source: `_reference/profound/content/screenshot.png` (5 platform avatars
 * tucked under the row title) and the same pattern in Prompt Volumes /
 * Answer Engine Insights.
 *
 * The platform brand glyphs aren't exported from `@/components/ui/icons`
 * yet, so this renders a colored circle with the platform's first letter.
 * Promote to `components/ui/PlatformAvatarStack.tsx` once we have the real
 * brand SVGs.
 */

import { cn } from "@/lib/cn";
import type { Platform } from "@/lib/types";

interface PlatformBrand {
  initial: string;
  /** Tailwind background color utility on the avatar. */
  bgClass: string;
  label: string;
}

const platformBrand: Record<Platform, PlatformBrand> = {
  chatgpt: { initial: "C", bgClass: "bg-badge-green-emphasis", label: "ChatGPT" },
  perplexity: { initial: "P", bgClass: "bg-badge-cyan-emphasis", label: "Perplexity" },
  anthropic: { initial: "A", bgClass: "bg-badge-orange-emphasis", label: "Anthropic" },
  google: { initial: "G", bgClass: "bg-badge-red-emphasis", label: "Google" },
  gemini: { initial: "G", bgClass: "bg-badge-blue-emphasis", label: "Gemini" },
  copilot: { initial: "C", bgClass: "bg-badge-purple-emphasis", label: "Copilot" },
  grok: { initial: "G", bgClass: "bg-text-secondary", label: "Grok" },
  meta: { initial: "M", bgClass: "bg-badge-blue-emphasis", label: "Meta AI" },
};

export interface PlatformAvatarStackProps {
  platforms: Platform[];
  /** Maximum visible avatars; remainder is rolled into a "+N" disc. */
  max?: number;
  /** Side length of each avatar in px (matches `--spacing: 1px`). Default 16. */
  size?: number;
  className?: string;
}

export function PlatformAvatarStack({
  platforms,
  max = 5,
  size = 16,
  className,
}: PlatformAvatarStackProps) {
  if (!platforms.length) return null;

  const visible = platforms.slice(0, max);
  const overflow = platforms.length - visible.length;

  return (
    <div
      className={cn("inline-flex items-center", className)}
      role="list"
      aria-label="Cited platforms"
    >
      {visible.map((p, i) => {
        const brand = platformBrand[p];
        return (
          <span
            key={`${p}-${i}`}
            role="listitem"
            title={brand.label}
            style={{
              width: size,
              height: size,
              marginLeft: i === 0 ? 0 : -size * 0.3,
              zIndex: visible.length - i,
            }}
            className={cn(
              "inline-flex items-center justify-center rounded-full",
              "text-micro font-semibold text-text-inverse",
              "ring-2 ring-bg-primary",
              brand.bgClass,
            )}
          >
            {brand.initial}
          </span>
        );
      })}
      {overflow > 0 ? (
        <span
          style={{
            width: size,
            height: size,
            marginLeft: -size * 0.3,
            zIndex: 0,
          }}
          className={cn(
            "inline-flex items-center justify-center rounded-full",
            "text-micro font-semibold text-text-secondary",
            "ring-2 ring-bg-primary bg-bg-tertiary",
          )}
        >
          +{overflow}
        </span>
      ) : null}
    </div>
  );
}
