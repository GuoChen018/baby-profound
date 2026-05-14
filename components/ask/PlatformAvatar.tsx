/**
 * PlatformAvatar — small colored circle representing an answer engine.
 *
 * Used inline beside citations and as the avatar in CitationCard. The
 * platform → color/letter map lives in `lib/data/ask.ts` so it stays in
 * one place with the rest of the mock data.
 */

import { cn } from "@/lib/cn";
import { platformMeta } from "@/lib/data/ask";
import type { AskPlatform } from "@/lib/types/ask";

export interface PlatformAvatarProps {
  platform: AskPlatform;
  size?: 16 | 20 | 24;
  className?: string;
}

const sizeClass: Record<NonNullable<PlatformAvatarProps["size"]>, string> = {
  16: "size-16 text-[9px]",
  20: "size-20 text-[10px]",
  24: "size-24 text-mini",
};

export function PlatformAvatar({ platform, size = 20, className }: PlatformAvatarProps) {
  const meta = platformMeta[platform];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold",
        sizeClass[size],
        className,
      )}
      style={{ backgroundColor: meta.bg, color: meta.fg }}
      aria-label={meta.label}
      title={meta.label}
    >
      {meta.short}
    </span>
  );
}
