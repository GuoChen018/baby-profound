"use client";

/**
 * Favicon — small site icon sourced from public icon services.
 *
 * Strategy: try a chain of icon services and fall back to a tinted monogram
 * when all of them fail. We prefer DuckDuckGo's icon service (returns crisp
 * full-color brand glyphs for most domains, no generic-globe placeholder),
 * with Google's `s2/favicons` as a backstop for the long tail.
 *
 * Why a chain rather than just Google: Google's service silently returns a
 * generic globe PNG (no HTTP error) when it can't find a favicon. That
 * means our `onError` fallback never fires — we just render a globe.
 * DuckDuckGo returns a real 404 for missing icons, so we can detect the
 * failure and either retry on Google or render the monogram.
 *
 * Usage:
 *   <Favicon domain="brex.com" />
 *   <Favicon domain="forbes.com" size={20} />
 */

import { useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";

export type FaviconSize = 12 | 14 | 16 | 18 | 20 | 24 | 28 | 32;

export interface FaviconProps {
  /** Domain or full URL — we strip down to the hostname. */
  domain: string;
  size?: FaviconSize;
  className?: string;
  /** Fallback letter to render if the request fails. Defaults to the first letter of the domain. */
  fallbackLabel?: string;
  /** Decorative icon — sets alt="" and aria-hidden. Default true. */
  decorative?: boolean;
  /** Skip the favicon services entirely and render the monogram fallback.
   *  Use for brands whose published favicon is dark-glyph-on-transparent
   *  (e.g. mercury.com) and therefore unreadable against our dark page bg. */
  forceMonogram?: boolean;
}

function normalizeHost(domain: string) {
  return domain.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
}

/**
 * Ordered list of icon URLs to try for a given domain. We render the first
 * one and fall back to the next on error.
 */
function iconCandidates(domain: string, size: number): string[] {
  const host = normalizeHost(domain);
  const sz = Math.min(96, size * 2);
  return [
    `https://icons.duckduckgo.com/ip3/${encodeURIComponent(host)}.ico`,
    `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=${sz}`,
  ];
}

export function Favicon({
  domain,
  size = 16,
  className,
  fallbackLabel,
  decorative = true,
  forceMonogram = false,
}: FaviconProps) {
  const candidates = iconCandidates(domain, size);
  const [attempt, setAttempt] = useState(0);

  const sizeStyle: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
  };

  const exhausted = forceMonogram || attempt >= candidates.length;
  if (exhausted) {
    const initial = (fallbackLabel ?? domain).trim().slice(0, 1).toUpperCase();
    return (
      <span
        aria-hidden={decorative || undefined}
        style={sizeStyle}
        className={cn(
          "inline-flex items-center justify-center rounded-3",
          // White letter on the same tinted surface used for muted chrome —
          // contrast is much stronger than `text-text-secondary` on dark
          // theme, so the initial actually reads.
          "bg-bg-tertiary text-text-primary font-semibold",
          "shrink-0 select-none",
          size <= 14 ? "text-[9px]" : size <= 20 ? "text-[10px]" : "text-[11px]",
          className,
        )}
      >
        {initial}
      </span>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={candidates[attempt]}
      alt={decorative ? "" : `${domain} favicon`}
      aria-hidden={decorative || undefined}
      width={size}
      height={size}
      onError={() => setAttempt((n) => n + 1)}
      className={cn("inline-block rounded-3 shrink-0 bg-bg-tertiary", className)}
      style={sizeStyle}
    />
  );
}
