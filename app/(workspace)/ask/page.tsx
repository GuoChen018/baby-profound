"use client";

/**
 * Ask — Profound's flagship conversational surface.
 *
 * State machine (per task spec — `useState`, not Zustand, since the
 * machine is local to this page):
 *
 *   empty ──submit──▶ conversation
 *     │                 ▲   │
 *     │                 │   └─ "New chat" ─▶ empty
 *     │
 *     └─ build mode submit / build suggestion picked ─▶ building
 *                                                        │
 *                                              cancel/complete ─▶ empty
 *
 * Per `_reference/profound/ask/notes.md` the live product captures only
 * the empty + active conversation states; the Build wizard is a sandbox
 * extension (see `components/ask/BuildModeFlow.tsx`).
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AskTopBar,
  BuildModeFlow,
  ConversationMessage,
  HeroComposer,
  PlatformChips,
  SuggestedPromptChips,
  SuggestedPromptList,
} from "@/components/ask";
import {
  askSuggestions,
  buildSuggestions,
  demoAssistantResponse,
  heroPromptChips,
} from "@/lib/data/ask";
import type {
  AskMode,
  AskPlatform,
  AskState,
  AssistantMessage,
  Conversation,
  Message,
  SuggestedPrompt,
  UserMessage,
} from "@/lib/types/ask";
import { cn } from "@/lib/cn";

export default function AskPage() {
  const [state, setState] = useState<AskState>("empty");
  const [mode, setMode] = useState<AskMode>("ask");
  const [composerValue, setComposerValue] = useState("");
  const [platforms, setPlatforms] = useState<AskPlatform[]>([
    "chatgpt",
    "perplexity",
    "gemini",
    "anthropic",
  ]);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [buildPresetId, setBuildPresetId] = useState<string | undefined>();
  const [buildPrompt, setBuildPrompt] = useState<string | undefined>();

  // ── Transitions ───────────────────────────────────────────────────

  /** Submit a prompt from the empty state composer. */
  const submit = useCallback(
    (rawPrompt?: string) => {
      const prompt = (rawPrompt ?? composerValue).trim();
      if (!prompt) return;

      if (mode === "build") {
        setBuildPresetId(undefined);
        setBuildPrompt(prompt);
        setState("building");
        setComposerValue("");
        return;
      }

      const userMsg: UserMessage = {
        id: `m-${Date.now()}`,
        role: "user",
        content: prompt,
      };
      const assistant: AssistantMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        thinkingDurationMs: demoAssistantResponse.thinkingDurationMs,
        blocks: demoAssistantResponse.blocks,
        citations: demoAssistantResponse.citations,
        streaming: true,
      };
      setConversation({
        id: "active",
        title: deriveTitle(prompt),
        mode: "ask",
        messages: [userMsg, assistant],
      });
      setState("conversation");
      setStreaming(true);
      setComposerValue("");
    },
    [composerValue, mode],
  );

  /** Submit a follow-up while in the active conversation. */
  const submitFollowUp = useCallback(
    (rawPrompt?: string) => {
      const prompt = (rawPrompt ?? composerValue).trim();
      if (!prompt || !conversation) return;
      const userMsg: UserMessage = {
        id: `m-${Date.now()}`,
        role: "user",
        content: prompt,
      };
      const assistant: AssistantMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        thinkingDurationMs: demoAssistantResponse.thinkingDurationMs,
        blocks: demoAssistantResponse.blocks,
        citations: demoAssistantResponse.citations,
        streaming: true,
      };
      setConversation({
        ...conversation,
        messages: [...conversation.messages, userMsg, assistant],
      });
      setStreaming(true);
      setComposerValue("");
    },
    [composerValue, conversation],
  );

  /** Reset to fresh empty state. */
  const newChat = useCallback(() => {
    setState("empty");
    setStreaming(false);
    setComposerValue("");
    setConversation(null);
    setBuildPresetId(undefined);
    setBuildPrompt(undefined);
    setMode("ask");
  }, []);

  /** Click a suggested prompt — fills + submits in one step. */
  const pickSuggestion = useCallback(
    (s: SuggestedPrompt) => {
      if (s.mode === "build") {
        setBuildPresetId(s.id);
        setBuildPrompt(undefined);
        setState("building");
        return;
      }
      submit(s.prompt ?? s.label);
    },
    [submit],
  );

  // Streaming auto-completes after a brief delay. Mark the trailing
  // assistant message as no-longer-streaming so its cursor stops pulsing.
  useEffect(() => {
    if (!streaming) return;
    const t = setTimeout(() => {
      setStreaming(false);
      setConversation((c) => {
        if (!c) return c;
        const msgs = [...c.messages];
        const last = msgs[msgs.length - 1];
        if (last && last.role === "assistant") {
          msgs[msgs.length - 1] = { ...last, streaming: false };
        }
        return { ...c, messages: msgs };
      });
    }, 4200);
    return () => clearTimeout(t);
  }, [streaming, conversation?.messages.length]);

  const stopStreaming = useCallback(() => {
    setStreaming(false);
    setConversation((c) => {
      if (!c) return c;
      const msgs = [...c.messages];
      const last = msgs[msgs.length - 1];
      if (last && last.role === "assistant") {
        msgs[msgs.length - 1] = { ...last, streaming: false };
      }
      return { ...c, messages: msgs };
    });
  }, []);

  // ── Render ────────────────────────────────────────────────────────

  const suggestionList = useMemo(
    () => (mode === "ask" ? askSuggestions : buildSuggestions),
    [mode],
  );

  return (
    <div className="flex h-full flex-col bg-bg-primary">
      <AskTopBar
        title={
          state === "conversation" && conversation
            ? conversation.title
            : "Untitled chat"
        }
        showActions={state === "conversation"}
        onNewChat={newChat}
      />

      {state === "empty" ? (
        <EmptyView
          mode={mode}
          onModeChange={setMode}
          value={composerValue}
          onValueChange={setComposerValue}
          onSubmit={() => submit()}
          platforms={platforms}
          onPlatformsChange={setPlatforms}
          suggestions={suggestionList}
          onPick={pickSuggestion}
        />
      ) : null}

      {state === "building" ? (
        <BuildModeFlow
          presetId={buildPresetId}
          initialPrompt={buildPrompt}
          onCancel={newChat}
          onComplete={newChat}
        />
      ) : null}

      {state === "conversation" && conversation ? (
        <ConversationView
          messages={conversation.messages}
          mode={mode}
          onModeChange={setMode}
          composerValue={composerValue}
          onComposerChange={setComposerValue}
          onSubmit={() => submitFollowUp()}
          streaming={streaming}
          onStop={stopStreaming}
        />
      ) : null}

      <AskFooter />
    </div>
  );
}

// ─── Empty state ────────────────────────────────────────────────────

function EmptyView({
  mode,
  onModeChange,
  value,
  onValueChange,
  onSubmit,
  platforms,
  onPlatformsChange,
  suggestions,
  onPick,
}: {
  mode: AskMode;
  onModeChange: (m: AskMode) => void;
  value: string;
  onValueChange: (v: string) => void;
  onSubmit: () => void;
  platforms: AskPlatform[];
  onPlatformsChange: (p: AskPlatform[]) => void;
  suggestions: SuggestedPrompt[];
  onPick: (s: SuggestedPrompt) => void;
}) {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto">
      <div
        className={cn(
          "min-h-full flex flex-col items-center justify-center",
          "px-32 py-48",
        )}
      >
        <div className="w-full max-w-680 space-y-20">
          <SuggestedPromptChips prompts={heroPromptChips} onPick={onPick} />

          <HeroComposer
            value={value}
            onChange={onValueChange}
            onSubmit={onSubmit}
            mode={mode}
            onModeChange={onModeChange}
            autoFocus
          />

          <PlatformChips selected={platforms} onChange={onPlatformsChange} />

          <SuggestedPromptList prompts={suggestions} onPick={onPick} />
        </div>
      </div>
    </div>
  );
}

// ─── Conversation state ─────────────────────────────────────────────

function ConversationView({
  messages,
  mode,
  onModeChange,
  composerValue,
  onComposerChange,
  onSubmit,
  streaming,
  onStop,
}: {
  messages: Message[];
  mode: AskMode;
  onModeChange: (m: AskMode) => void;
  composerValue: string;
  onComposerChange: (v: string) => void;
  onSubmit: () => void;
  streaming: boolean;
  onStop: () => void;
}) {
  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-820 px-32 py-24 space-y-28">
          {messages.map((m) => (
            <ConversationMessage key={m.id} message={m} />
          ))}
        </div>
      </div>

      <div className="shrink-0 px-32 pb-20 pt-8">
        <div className="mx-auto max-w-680">
          <HeroComposer
            value={composerValue}
            onChange={onComposerChange}
            onSubmit={onSubmit}
            mode={mode}
            onModeChange={onModeChange}
            placeholder="Ask a follow up..."
            streaming={streaming}
            onStop={onStop}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────

function AskFooter() {
  return (
    <footer className="shrink-0 h-32 flex items-center justify-center">
      <p className="text-mini text-text-tertiary">
        AI can make mistakes. Please double-check responses.
      </p>
    </footer>
  );
}

// ─── Helpers ────────────────────────────────────────────────────────

/** Tiny stand-in for the real model-generated chat title. */
function deriveTitle(prompt: string): string {
  const trimmed = prompt.trim().replace(/[?.!]+$/, "");
  // Keep first ~6 words; capitalize.
  const words = trimmed.split(/\s+/).slice(0, 6);
  if (words.length === 0) return "Untitled chat";
  const title = words.join(" ");
  return title.charAt(0).toUpperCase() + title.slice(1);
}
