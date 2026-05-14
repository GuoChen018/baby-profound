"use client";

/**
 * ConversationMessage — renders a single user or assistant turn.
 *
 * User turn: right-aligned pill on `control-bg` with subtle outline. Text
 * inside, no chrome.
 *
 * Assistant turn: left-aligned, no chrome. Begins with a `ThinkingIndicator`
 * row, then structured AssistantBlocks (paragraph or list), then citation
 * row (horizontally scrollable).
 *
 * Streaming behavior: when `message.streaming` is true, blocks animate in
 * sequentially via framer-motion stagger; a soft pulsing cursor appears at
 * the very end of the last block until streaming completes. Captured from
 * `_reference/profound/ask/screenshot-active-conversation.png`.
 */

import { motion } from "framer-motion";
import { Fragment, useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type {
  AssistantBlock,
  AssistantMessage,
  Message,
  UserMessage,
} from "@/lib/types/ask";
import { CitationCard } from "./CitationCard";
import { PlatformAvatar } from "./PlatformAvatar";
import { ThinkingIndicator } from "./ThinkingIndicator";

export interface ConversationMessageProps {
  message: Message;
}

export function ConversationMessage({ message }: ConversationMessageProps) {
  if (message.role === "user") return <UserBubble message={message} />;
  return <AssistantTurn message={message} />;
}

// ─── User ──────────────────────────────────────────────────────────

function UserBubble({ message }: { message: UserMessage }) {
  return (
    <div className="flex justify-end">
      <div
        className={cn(
          "max-w-[70%] rounded-12",
          "bg-control-bg shadow-flat",
          "px-14 py-10 text-base text-text-primary",
        )}
      >
        {message.content}
      </div>
    </div>
  );
}

// ─── Assistant ─────────────────────────────────────────────────────

function AssistantTurn({ message }: { message: AssistantMessage }) {
  return (
    <div className="space-y-12">
      <ThinkingIndicator
        durationMs={message.thinkingDurationMs}
        pending={message.streaming}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
        }}
        className="space-y-12 text-paragraph text-text-primary max-w-[760px]"
      >
        {message.blocks.map((block, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 6 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
            }}
          >
            <AssistantBlockView
              block={block}
              shimmer={
                Boolean(message.streaming) && i === message.blocks.length - 1
              }
            />
          </motion.div>
        ))}
      </motion.div>

      {message.citations && message.citations.length > 0 ? (
        <div className="space-y-8 pt-8">
          <div className="flex items-center gap-8">
            <p className="text-mini font-medium text-text-tertiary uppercase tracking-wide">
              Sources
            </p>
            <div className="flex items-center -space-x-4">
              {message.citations.slice(0, 4).map((c) => (
                <PlatformAvatar
                  key={c.id}
                  platform={c.platform}
                  size={16}
                  className="ring-2 ring-bg-primary"
                />
              ))}
            </div>
          </div>
          <div className="flex gap-12 overflow-x-auto pb-4 -mx-4 px-4 [scrollbar-width:thin]">
            {message.citations.map((c, i) => (
              <CitationCard key={c.id} citation={c} index={i + 1} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function AssistantBlockView({
  block,
  shimmer,
}: {
  block: AssistantBlock;
  shimmer: boolean;
}) {
  if (block.type === "paragraph") {
    return (
      <p className="text-paragraph text-text-primary">
        <InlineMarkdown text={block.text} />
        {shimmer ? <StreamCursor /> : null}
      </p>
    );
  }
  return (
    <ul className="space-y-8 pl-4">
      {block.items.map((item, i) => (
        <li key={i} className="flex gap-10 text-paragraph text-text-primary">
          <span className="mt-9 inline-block size-3 shrink-0 rounded-full bg-text-tertiary" />
          <span>
            <strong className="font-semibold text-text-primary">
              {item.lead}
            </strong>
            <span className="text-text-secondary"> — </span>
            <InlineMarkdown text={item.body} />
            {shimmer && i === block.items.length - 1 ? <StreamCursor /> : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * InlineMarkdown — tiny renderer for `**bold**` and `*italic*` inline marks.
 * No external dependency; assistant mock data is structured enough that we
 * only need the two emphasis primitives.
 */
function InlineMarkdown({ text }: { text: string }): ReactNode {
  const id = useId();
  const segments = parseInline(text);
  return (
    <>
      {segments.map((seg, i) => {
        const key = `${id}-${i}`;
        if (seg.type === "bold") {
          return (
            <strong key={key} className="font-semibold text-text-primary">
              {seg.value}
            </strong>
          );
        }
        if (seg.type === "italic") {
          return (
            <em key={key} className="italic">
              {seg.value}
            </em>
          );
        }
        return <Fragment key={key}>{seg.value}</Fragment>;
      })}
    </>
  );
}

type InlineSegment =
  | { type: "text"; value: string }
  | { type: "bold"; value: string }
  | { type: "italic"; value: string };

/** Greedy left-to-right scan: handles `**...**` then `*...*` then plain. */
function parseInline(text: string): InlineSegment[] {
  const out: InlineSegment[] = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      out.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    if (match[1] !== undefined) {
      out.push({ type: "bold", value: match[1] });
    } else if (match[2] !== undefined) {
      out.push({ type: "italic", value: match[2] });
    }
    lastIndex = re.lastIndex;
  }
  if (lastIndex < text.length) {
    out.push({ type: "text", value: text.slice(lastIndex) });
  }
  return out;
}

function StreamCursor() {
  return (
    <motion.span
      aria-hidden
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      className="inline-block ml-2 align-middle h-13 w-7 rounded-2 bg-text-primary"
    />
  );
}
