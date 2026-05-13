"use client";

/**
 * Toggle — pill switch.
 *
 * Spec: _reference/figma/01-components/toggle/design-context.md (Figma 1:8663)
 *
 * Track 32x20, knob 14x14. Off: fill-quaternary track. On: fill-green track.
 */

import { useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Toggle({
  label,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  className,
  id,
  ...rest
}: ToggleProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "inline-flex items-center gap-8 p-8 rounded-6 cursor-pointer select-none",
        "hover:bg-control-hover",
        "has-[input:focus-visible]:shadow-focus",
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
    >
      <span className="relative inline-block size-[32px] h-20 w-32 shrink-0">
        <input
          id={inputId}
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          className="peer sr-only"
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          {...rest}
        />
        {/* Track */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 rounded-full transition-colors duration-150",
            "bg-fill-quaternary",
            "peer-checked:bg-fill-green",
            "peer-hover:peer-checked:bg-fill-green-hover",
            disabled && "opacity-30",
          )}
        />
        {/* Knob */}
        <span
          aria-hidden
          className={cn(
            "absolute top-[3px] left-[3px] size-14 rounded-full bg-fill-inverse",
            "transition-transform duration-150",
            "peer-checked:translate-x-12",
            "shadow-[0_1px_2px_rgba(0,0,0,0.15)]",
          )}
        />
      </span>
      {label ? (
        <span
          className={cn(
            "text-small font-medium",
            disabled ? "text-text-quaternary" : "text-text-primary",
          )}
        >
          {label}
        </span>
      ) : null}
    </label>
  );
}
