"use client";

/**
 * ThinkingIndicator — the "Thought for 8s" affordance shown directly above
 * an assistant response. The duration label has a subtle pulse while the
 * model is still streaming.
 *
 * Captured from `_reference/profound/ask/screenshot-active-conversation.png`.
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface ThinkingIndicatorProps {
  /** Duration in ms. Shown as "Xs" when known, "…" while still thinking. */
  durationMs?: number;
  /** When true, animate the dots pulse. */
  pending?: boolean;
  className?: string;
}

export function ThinkingIndicator({
  durationMs,
  pending,
  className,
}: ThinkingIndicatorProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-6 text-small text-text-tertiary",
        className,
      )}
    >
      <span>Thought for</span>
      {pending || durationMs === undefined ? (
        <motion.span
          aria-live="polite"
          className="inline-flex items-center gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="inline-block size-3 rounded-full bg-text-tertiary"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.span>
      ) : (
        <span className="text-text-secondary font-medium">
          {Math.round(durationMs / 1000)}s
        </span>
      )}
    </div>
  );
}
