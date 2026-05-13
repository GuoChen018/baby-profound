"use client";

/**
 * Input — text field.
 *
 * Spec: _reference/figma/01-components/input/design-context-1.md (Figma 1:9387)
 *
 * MVP: Default + Typing + Error + Disabled states; sm (28h) + md (38h) sizes;
 * left icon + right icon support; label + hint slots.
 *
 * Deferred: trailing-button slot (used in the input/text-field frame with the
 * dark "Search" button). Add when first needed.
 */

import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

export type InputSize = "sm" | "md";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  label?: ReactNode;
  hint?: ReactNode;
  error?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  containerClassName?: string;
}

const sizeStyles: Record<InputSize, string> = {
  sm: "h-28 px-12 text-small",
  md: "h-38 px-12 text-base",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = "md",
    label,
    hint,
    error,
    iconLeft,
    iconRight,
    disabled,
    className,
    containerClassName,
    id,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = hint ? `${inputId}-hint` : undefined;

  return (
    <div className={cn("flex flex-col gap-8", containerClassName)}>
      {label ? (
        <label
          htmlFor={inputId}
          className="text-small font-medium text-text-primary"
        >
          {label}
        </label>
      ) : null}

      <div
        className={cn(
          "relative flex items-center gap-5",
          "rounded-6",
          "transition-shadow duration-100",
          disabled
            ? "bg-bg-tertiary text-text-quaternary cursor-not-allowed"
            : "bg-control-bg shadow-flat focus-within:shadow-focus",
          error && !disabled && "shadow-[0_0_0_1.5px_var(--fill-red)] focus-within:shadow-[0_0_0_1.5px_var(--fill-red),0_0_0_4px_var(--shadow-focus-ring)]",
          sizeStyles[size],
        )}
      >
        {iconLeft ? (
          <span className="inline-flex shrink-0 size-16 text-fill-secondary">
            {iconLeft}
          </span>
        ) : null}
        <input
          id={inputId}
          ref={ref}
          disabled={disabled}
          aria-describedby={hintId}
          aria-invalid={error || undefined}
          className={cn(
            "flex-1 bg-transparent outline-none placeholder:text-text-tertiary",
            "disabled:cursor-not-allowed",
            className,
          )}
          {...rest}
        />
        {iconRight ? (
          <span className="inline-flex shrink-0 size-16 text-fill-secondary">
            {iconRight}
          </span>
        ) : null}
      </div>

      {hint ? (
        <p
          id={hintId}
          className={cn(
            "text-mini",
            disabled ? "text-text-quaternary" : error ? "text-text-red" : "text-text-tertiary",
          )}
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
});
