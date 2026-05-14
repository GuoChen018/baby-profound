"use client";

/**
 * HeroComposer — the chat input pill.
 *
 * Anatomy (captured in `_reference/profound/ask/screenshot.png`):
 *   - Soft-bordered rounded rectangle on `bg-secondary`
 *   - Two-row internal layout:
 *       top:    textarea + placeholder
 *       bottom: + button · Ask/Build segmented control      ·    mic · send
 *
 * Used in BOTH the centered empty state and the bottom-pinned conversation
 * state. The same surface morphs:
 *   - `placeholder` swaps from "Ask a question…" → "Ask a follow up…"
 *   - The send button (white circle, up-arrow) swaps to a stop button
 *     (white circle, square) while the assistant is streaming.
 */

import {
  useEffect,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { PlusIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { MicrophoneIcon, SendArrowIcon, StopIcon } from "./icons";
import type { AskMode } from "@/lib/types/ask";

export interface HeroComposerProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  mode: AskMode;
  onModeChange: (m: AskMode) => void;
  placeholder?: string;
  /** When true, the send button becomes a stop button. */
  streaming?: boolean;
  onStop?: () => void;
  /** Auto-focus the textarea on mount (e.g. when transitioning into a state). */
  autoFocus?: boolean;
  /** Optional content rendered ABOVE the composer (e.g. inline filters). */
  topSlot?: ReactNode;
  className?: string;
}

export function HeroComposer({
  value,
  onChange,
  onSubmit,
  mode,
  onModeChange,
  placeholder = "Ask a question...",
  streaming,
  onStop,
  autoFocus,
  topSlot,
  className,
}: HeroComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus) textareaRef.current?.focus();
  }, [autoFocus]);

  // Auto-grow textarea up to ~140px.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }, [value]);

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim().length === 0) return;
      onSubmit();
    }
  }

  const canSend = value.trim().length > 0;

  return (
    <div className={cn("w-full", className)}>
      {topSlot}
      <div
        className={cn(
          "rounded-12 bg-bg-secondary shadow-flat",
          "transition-shadow duration-150",
          "focus-within:shadow-focus",
        )}
      >
        <div className="px-16 pt-14">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className={cn(
              "w-full resize-none bg-transparent outline-none",
              "text-base text-text-primary placeholder:text-text-tertiary",
              "min-h-24 max-h-140",
              "leading-relaxed",
            )}
          />
        </div>

        <div className="flex items-center justify-between gap-8 px-10 pb-10">
          <div className="flex items-center gap-8">
            <ComposerIconButton ariaLabel="Add context">
              <PlusIcon className="size-16" />
            </ComposerIconButton>

            <AskBuildPill value={mode} onChange={onModeChange} />
          </div>

          <div className="flex items-center gap-6">
            <ComposerIconButton ariaLabel="Voice input">
              <MicrophoneIcon className="size-16" />
            </ComposerIconButton>

            {streaming ? (
              <SendButton ariaLabel="Stop generating" onClick={onStop} variant="stop">
                <StopIcon className="size-14" />
              </SendButton>
            ) : (
              <SendButton
                ariaLabel="Send message"
                onClick={canSend ? onSubmit : undefined}
                disabled={!canSend}
                variant="send"
              >
                <SendArrowIcon className="size-16" />
              </SendButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Internal pieces ────────────────────────────────────────────────

function ComposerIconButton({
  children,
  ariaLabel,
  onClick,
}: {
  children: ReactNode;
  ariaLabel: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        "inline-flex size-28 items-center justify-center rounded-6",
        "text-text-tertiary hover:text-text-primary hover:bg-bg-tertiary",
        "transition-colors",
        "focus-visible:outline-none focus-visible:shadow-focus",
      )}
    >
      {children}
    </button>
  );
}

function SendButton({
  children,
  ariaLabel,
  onClick,
  disabled,
  variant,
}: {
  children: ReactNode;
  ariaLabel: string;
  onClick?: () => void;
  disabled?: boolean;
  variant: "send" | "stop";
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex size-28 items-center justify-center rounded-full",
        "bg-fill-inverse text-fill-primary",
        "transition-opacity",
        disabled
          ? "opacity-40 cursor-not-allowed"
          : "hover:opacity-90 active:opacity-80",
        "focus-visible:outline-none focus-visible:shadow-focus",
        variant === "stop" && "ring-0",
      )}
    >
      {children}
    </button>
  );
}

/**
 * AskBuildPill — the two-segment toggle that lives INSIDE the composer.
 *
 * We don't reuse `<SegmentedControl>` here because the Ask composer's
 * toggle is on `bg-secondary` (the composer surface) rather than the
 * design-system's elevated `bg-primary`, and the pill geometry is rounded
 * fully rather than radius-4. Captured directly from the screenshot.
 */
function AskBuildPill({
  value,
  onChange,
}: {
  value: AskMode;
  onChange: (v: AskMode) => void;
}) {
  const options: { value: AskMode; label: string }[] = [
    { value: "ask", label: "Ask" },
    { value: "build", label: "Build" },
  ];
  return (
    <div role="radiogroup" className="inline-flex items-center gap-2 rounded-full">
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt.value)}
            className={cn(
              "h-24 px-10 rounded-full text-mini font-medium",
              "transition-colors",
              selected
                ? "bg-control-selected text-text-primary"
                : "text-text-tertiary hover:text-text-secondary",
              "focus-visible:outline-none focus-visible:shadow-focus",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
