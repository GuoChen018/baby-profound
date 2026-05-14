/**
 * Banner — full-bleed status band rendered above page content.
 *
 * Source: Agent Run page warning banner ("Plan limit reached • Using overage
 * credits  View usage"). Rendered as a top-of-page band that spans the full
 * width of the workspace (no horizontal padding).
 *
 * Promote candidate: `components/ui/Banner.tsx`. Other tabs (Knowledge Bases
 * crawl errors, Content unpublished drafts) will want the same shape.
 *
 * Variants:
 *   - info     — neutral grey
 *   - warning  — amber tint
 *   - error    — red tint (matches the Profound capture)
 */

import { type ReactNode } from "react";
import {
  CheckCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export type BannerVariant = "info" | "warning" | "error" | "success";

export interface BannerProps {
  variant?: BannerVariant;
  icon?: ReactNode;
  /** Primary message — the bold lead. */
  children: ReactNode;
  /** Right-aligned slot, typically a Link or Button. */
  action?: ReactNode;
  /** Show the dismiss × on the right. */
  onDismiss?: () => void;
  className?: string;
}

const variantStyles: Record<BannerVariant, { surface: string; icon: string }> = {
  // Sampled from the Profound "Plan limit reached" capture — a deep red
  // band tuned to read against the OLED-black workspace bg.
  error: {
    surface:
      "bg-[color-mix(in_oklab,var(--fill-red)_22%,var(--bg-primary))] text-text-primary border-b border-[color-mix(in_oklab,var(--fill-red)_45%,transparent)]",
    icon: "text-text-red",
  },
  warning: {
    surface:
      "bg-badge-amber-muted/15 text-text-primary border-b border-badge-amber-border/30",
    icon: "text-badge-amber-emphasis",
  },
  info: {
    surface: "bg-bg-tertiary text-text-primary border-b border-fill-quaternary",
    icon: "text-text-tertiary",
  },
  success: {
    surface:
      "bg-badge-green-muted/15 text-text-primary border-b border-badge-green-border/30",
    icon: "text-text-green",
  },
};

const defaultIconFor: Record<BannerVariant, ReactNode> = {
  info: <InformationCircleIcon />,
  warning: <InformationCircleIcon />,
  error: <InformationCircleIcon />,
  success: <CheckCircleIcon />,
};

export function Banner({
  variant = "info",
  icon,
  children,
  action,
  onDismiss,
  className,
}: BannerProps) {
  const v = variantStyles[variant];
  return (
    <div
      role={variant === "error" || variant === "warning" ? "alert" : "status"}
      className={cn(
        "w-full px-16 py-8",
        "flex items-center justify-center gap-12",
        "text-small",
        v.surface,
        className,
      )}
    >
      <span
        className={cn("inline-flex shrink-0 size-16", v.icon)}
        aria-hidden
      >
        {icon ?? defaultIconFor[variant]}
      </span>
      <div className="flex items-center gap-8 min-w-0">
        <span className="truncate">{children}</span>
        {action ? <span className="shrink-0">{action}</span> : null}
      </div>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className={cn(
            "ml-auto inline-flex items-center justify-center size-20 rounded-4",
            "text-text-tertiary hover:text-text-primary hover:bg-fill-quaternary/40",
          )}
        >
          <XMarkIcon className="size-14" />
        </button>
      ) : null}
    </div>
  );
}
