"use client";

/**
 * Button — Profound design system primitive.
 *
 * Spec: _reference/figma/01-components/buttons/design-context.md (Figma 1:7734)
 *
 * Variant matrix:
 *   - size: lg (38h) · md (28h, "Default") · sm (24h)
 *   - variant: default · inverse · destructive · ghost
 *   - disabled, iconLeft, iconRight, label-only, icon-only
 *
 * The Default variant is THE central visual idiom — the "Flat" surface:
 * 1px inset border ring + two soft drops on `control-bg` with `radius-6`.
 * Defined as `--shadow-flat` in globals.css.
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonVariant = "default" | "inverse" | "destructive" | "ghost";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const sizeStyles: Record<ButtonSize, string> = {
  // Vertical padding derived so a 16px icon (or 16px line-height label) fills the rest.
  sm: "h-24 px-8 text-small gap-4",
  md: "h-28 px-10 text-small gap-6",
  lg: "h-38 px-11 text-small gap-6",
};

const iconOnlySizeStyles: Record<ButtonSize, string> = {
  sm: "size-24 p-4",
  md: "size-28 p-6",
  lg: "size-38 p-11",
};

const variantStyles: Record<ButtonVariant, string> = {
  default: [
    "bg-control-bg text-text-primary",
    "shadow-flat",
    "hover:bg-control-hover",
    "active:bg-control-selected",
    "disabled:bg-control-bg disabled:text-text-quaternary disabled:cursor-not-allowed",
  ].join(" "),
  inverse: [
    "bg-fill-primary text-text-inverse",
    "hover:opacity-90",
    "active:opacity-80",
    "disabled:opacity-40 disabled:cursor-not-allowed",
  ].join(" "),
  destructive: [
    "bg-control-bg text-text-red shadow-flat",
    "hover:bg-control-hover",
    "active:bg-control-selected",
    "disabled:text-text-quaternary disabled:cursor-not-allowed",
  ].join(" "),
  ghost: [
    "bg-transparent text-text-primary",
    "hover:bg-control-hover",
    "active:bg-control-selected",
    "disabled:text-text-quaternary disabled:cursor-not-allowed",
  ].join(" "),
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    size = "md",
    variant = "default",
    iconLeft,
    iconRight,
    children,
    className,
    type = "button",
    ...rest
  },
  ref,
) {
  const isIconOnly = !children && (iconLeft || iconRight);

  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center font-medium",
        "rounded-6 select-none",
        "transition-colors duration-100",
        "focus-visible:outline-none focus-visible:shadow-focus",
        isIconOnly ? iconOnlySizeStyles[size] : sizeStyles[size],
        variantStyles[variant],
        className,
      )}
      {...rest}
    >
      {iconLeft ? <span className="inline-flex shrink-0 size-16">{iconLeft}</span> : null}
      {children ? <span className="whitespace-nowrap">{children}</span> : null}
      {iconRight ? <span className="inline-flex shrink-0 size-16">{iconRight}</span> : null}
    </button>
  );
});
