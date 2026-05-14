/**
 * BrowserMockIllustration — the little macOS-style browser frame used in the
 * Website Activity empty state. Inline SVG so it themes with CSS vars.
 */

import { cn } from "@/lib/cn";

export interface BrowserMockIllustrationProps {
  site?: string;
  className?: string;
}

export function BrowserMockIllustration({
  site = "ramp.com",
  className,
}: BrowserMockIllustrationProps) {
  return (
    <div
      className={cn(
        "w-full max-w-560 aspect-[5/2] rounded-8 overflow-hidden",
        "bg-bg-tertiary shadow-flat relative",
        className,
      )}
    >
      {/* Browser chrome */}
      <div className="absolute top-0 left-0 right-0 h-24 px-12 flex items-center gap-6 border-b border-fill-quaternary">
        <span className="size-8 rounded-full bg-fill-red/70" />
        <span className="size-8 rounded-full bg-badge-amber-emphasis/70" />
        <span className="size-8 rounded-full bg-fill-green/70" />
        <span className="ml-16 inline-flex items-center gap-4 px-8 h-16 rounded-4 bg-bg-primary text-mini text-text-tertiary font-medium">
          {site}
        </span>
      </div>

      {/* Centered sparkline */}
      <svg
        viewBox="0 0 500 160"
        className="absolute inset-0 top-24"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="bm-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--workflow-blue)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--workflow-blue)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,110 L60,90 L120,100 L180,70 L240,80 L300,55 L360,65 L420,40 L500,50 L500,160 L0,160 Z"
          fill="url(#bm-grad)"
        />
        <path
          d="M0,110 L60,90 L120,100 L180,70 L240,80 L300,55 L360,65 L420,40 L500,50"
          fill="none"
          stroke="var(--workflow-blue)"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
