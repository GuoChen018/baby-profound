/**
 * Ask tab types.
 *
 * Models: chat-style conversations + Build-mode agent generation wizard.
 * See `_reference/profound/ask/notes.md` for the captured shape.
 */

import type { Platform } from "@/lib/types";

/** The top-level page state machine. */
export type AskState = "empty" | "building" | "conversation";

/** Composer mode toggle — diagnose (ask) vs. automate (build). */
export type AskMode = "ask" | "build";

// ────────────────────────────────────────────────────────────────────
// Messages + citations
// ────────────────────────────────────────────────────────────────────

export type AssistantBlock =
  | { type: "paragraph"; text: string }
  /** Bulleted list. Each item starts with a bold lead phrase. */
  | { type: "list"; items: { lead: string; body: string }[] };

export type UserMessage = {
  id: string;
  role: "user";
  content: string;
};

export type AssistantMessage = {
  id: string;
  role: "assistant";
  blocks: AssistantBlock[];
  citations?: Citation[];
  /** Display value for the "Thought for Xs" affordance. */
  thinkingDurationMs?: number;
  /** When true, the message animates in word-by-word. */
  streaming?: boolean;
};

export type Message = UserMessage | AssistantMessage;

export type Citation = {
  id: string;
  /** Brand-aligned answer engine — drives the avatar color. */
  platform: AskPlatform;
  title: string;
  domain: string;
  href: string;
  snippet?: string;
};

/** Platforms shown in the platform-filter chip row + citations. */
export type AskPlatform = Extract<
  Platform,
  "chatgpt" | "perplexity" | "gemini" | "anthropic" | "copilot"
> | "google-ai";

export type Conversation = {
  id: string;
  title: string;
  mode: AskMode;
  messages: Message[];
};

// ────────────────────────────────────────────────────────────────────
// Composer surface
// ────────────────────────────────────────────────────────────────────

export type SuggestedPrompt = {
  id: string;
  /** Short text label rendered in the suggestion list. */
  label: string;
  /** Which mode the suggestion belongs to. */
  mode: AskMode;
  /** Full prompt sent to the model when picked. */
  prompt?: string;
};

export type PlatformChip = {
  id: AskPlatform;
  label: string;
};

// ────────────────────────────────────────────────────────────────────
// Build mode wizard
// ────────────────────────────────────────────────────────────────────

export type BuildAgentPreset = {
  id: string;
  /** Human label shown in the suggestion list. */
  name: string;
  /** One-line objective summary. */
  objective: string;
  /** What the agent watches — appears in step 2. */
  watches: string[];
  /** Cadence default for step 3. */
  cadence: "Hourly" | "Daily" | "Weekly" | "On change";
  /** Tiny chromatic accent for the preset row. */
  accent: "purple" | "blue" | "green" | "amber" | "red";
};

export type BuildWizardStep = "objective" | "criteria" | "delivery";
