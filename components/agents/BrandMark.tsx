/**
 * BrandMark — the small avatar shown next to an agent / template name.
 *
 * Visual rule (per user feedback 2026-05-14):
 *   - No bordered tile wrapper. The avatar IS the logo, sized to the slot
 *     and rounded slightly for shape. External favicons usually carry their
 *     own brand background (Reddit orange, YouTube red, etc.) so a wrapper
 *     just adds noise.
 *   - Brands without a real logo fall back to the Profound logomark —
 *     never a generic monogram or pencil tile. The Profound mark is the
 *     correct "first-party agent" affordance.
 *
 * Strategy:
 *   - Known external brands (Google / YouTube / Reddit / Perplexity) →
 *     real favicon via `Favicon` (DuckDuckGo + Google fallback chain).
 *   - Everyone else → Profound logomark at the slot size, neutral surface.
 */

import { Favicon } from "@/components/ui";
import type { AgentBrand } from "@/lib/types/agents";
import { cn } from "@/lib/cn";
import { withBasePath } from "@/lib/basePath";

export type BrandMarkSize = "sm" | "md";

export interface BrandMarkProps {
  brand: AgentBrand;
  size?: BrandMarkSize;
  className?: string;
}

const sizeStyles: Record<BrandMarkSize, { box: string; px: 16 | 20 }> = {
  // The slot is the favicon's natural size — no surrounding chrome.
  sm: { box: "size-16 rounded-3", px: 16 },
  md: { box: "size-20 rounded-4", px: 20 },
};

const FAVICON_BRANDS: Partial<Record<AgentBrand, { domain: string; label: string }>> = {
  google: { domain: "google.com", label: "Google" },
  youtube: { domain: "youtube.com", label: "YouTube" },
  reddit: { domain: "reddit.com", label: "Reddit" },
  perplexity: { domain: "perplexity.ai", label: "Perplexity" },
};

/**
 * Path to the Profound logomark asset (lives at `public/profound-mark.png`).
 * Used as the universal fallback for first-party agents and any brand that
 * doesn't have a dedicated favicon entry. We render the PNG directly via
 * `<img>` rather than reuse the smaller sidebar `BrandIcon` SVG because the
 * sidebar variant is a stylized 12x12 mark and reads differently from the
 * full Profound logomark Profound uses elsewhere in product.
 */
// `withBasePath` prefixes the GH Pages subfolder in production builds
// (`/baby-profound/profound-mark.png`) and is a no-op in dev.
const PROFOUND_MARK_SRC = withBasePath("/profound-mark.png");

export function BrandMark({ brand, size = "md", className }: BrandMarkProps) {
  const s = sizeStyles[size];

  // External brand → real favicon. The Favicon component already rounds its
  // own corners; no outer wrapper needed.
  const faviconBrand = FAVICON_BRANDS[brand];
  if (faviconBrand) {
    return (
      <Favicon
        domain={faviconBrand.domain}
        size={s.px}
        fallbackLabel={faviconBrand.label}
        className={cn("shrink-0", s.box, className)}
      />
    );
  }

  // Default: Profound logomark. Rendered bare (no tile, no border) so it
  // sits as a peer of the favicons.
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={PROFOUND_MARK_SRC}
      alt=""
      aria-hidden
      width={s.px}
      height={s.px}
      className={cn("shrink-0", s.box, className)}
    />
  );
}
