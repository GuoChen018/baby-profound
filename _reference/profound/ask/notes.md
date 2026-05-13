# Ask tab

**Route**: `/<workspace-id>/Brex/ask`
**Theme observed**: Dark
**Captures**:
- `screenshot.png` — empty state, "Ask" mode selected
- `screenshot-build-mode.png` — empty state, "Build" mode selected (different suggestions)
- `screenshot-active-conversation.png` — active conversation with one message exchanged

## Purpose

A conversational AI agent for diagnosing visibility issues. "Ask mode" answers questions about the workspace's current state, scores, and competitive gaps. "Build mode" creates automated agents (engine prioritization, score regression watcher, etc.) — i.e. the user can either chat for insight OR spawn an autonomous monitoring agent.

The Ask tab is also a chat-history container — the top shows the current chat title (e.g. "Untitled chat ▾" or "Score Improvement Strategy ▾") with a dropdown to switch between past conversations. Has "Beta" badge.

## Layout (empty state)

1. **Top bar**: chat title with chevron dropdown (e.g. "Untitled chat ▾") + `Beta` pill badge (blue/purple). Right side empty.
2. **Center vertical stack** (the chat surface):
   - Empty above
   - Composer / input pill — large rounded `Ask a question...` field with:
     - `+` button (left) — attach? add context?
     - **Ask / Build segmented control** (toggles agent mode)
     - Microphone icon (right) — voice input
     - Up-arrow send button (white circle, right)
   - Below composer: list of 4 suggested questions (clickable, no card chrome — just text with subtle dividers)
3. **Footer**: "AI can make mistakes. Please double-check responses." (centered, low-emphasis)

### Suggestions in **Ask mode**
- Good visibility benchmark
- Negative sentiment drivers
- Which AI engine to focus on
- Citation opportunities

### Suggestions in **Build mode**
- Engine prioritization agent
- Score regression agent
- Competitor watch agent
- Weekly visibility report agent

The Ask/Build toggle swaps the suggestion list — same layout, different content. The selected mode shows the pill in `control-primary` (filled black), the unselected pill is `control-bg` or transparent with text.

## Layout (active conversation)

After sending a message:
1. **Top bar** updates: chat title becomes the generated name (e.g. "Score Improvement Strategy ▾"). Right side now has "New chat ↗" button + a `...` overflow menu button.
2. **Conversation area** (above the composer):
   - User message: right-aligned pill in `control-bg` with subtle outline. Text inside.
   - Assistant message: left-aligned, no chrome — just rendered markdown. Begins with "Thought for 8s" (muted/grey) indicating thinking time elapsed, then the actual response.
   - Response uses formatted markdown: bold terms, bulleted lists with bold first words ("**Current state snapshot** — ..."), inline emphasis.
3. **Composer** stays at bottom (sticky) but now placeholder is "Ask a follow up..." instead of "Ask a question..."
4. The send button (top-right corner of composer area) becomes a **stop / square button** during generation.

## Data shapes observed

```ts
type AskChat = {
  id: string;
  title: string;             // auto-generated from first exchange
  mode: 'ask' | 'build';     // the input mode at the time of sending
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;         // markdown
    thinkingDurationMs?: number;  // shown as "Thought for 8s"
    streaming?: boolean;
  }>;
  createdAt: ISODate;
};

type AskSuggestion = {
  label: string;
  mode: 'ask' | 'build';
};
```

## Primitives used

- `SegmentedControl` (Ask / Build toggle — 2 options instead of the usual 6, but same primitive)
- `Button` (icon-only — `+`, mic, send, stop)
- `Tag` or `Badge` for "Beta" pill
- Custom composer pill — basically an Input variant but multi-line / chat-shaped
- Sidebar (same as Overview)
- Suggestion list items — just text + divider, no card chrome

## Interactions inferred / to confirm

- Click any suggestion → fills composer and sends, OR sends directly
- Title dropdown `▾` → switch between past chats (chat history menu)
- `+` button → attachment menu? context picker?
- Mic → voice input
- `New chat ↗` (active state) → opens fresh chat
- `...` overflow (active state) → rename / delete / share chat?
- Build mode suggestions → click creates an autonomous agent (not asks question)

## Deferred sub-pages

- Chat history list (when clicking title dropdown)
- The post-Build-suggestion flow (agent creation form? wizard?)
- The "New chat" reset state
- The `...` overflow menu contents

## Notes for the build

- Ask is fundamentally different from the analytics tabs — it's a chat product, not a dashboard. The composer pill + suggestion list pattern is unique to this tab.
- The Ask/Build mode toggle is **interesting** — same UI shell, two completely different use cases (diagnose vs. automate). Worth modeling cleanly.
- The "Thought for 8s" affordance is a useful primitive — `<ThinkingIndicator duration={...} />`.
- The assistant message rendering needs a Markdown renderer with custom styles for bullet points, bold, etc.
- The send button morphing into a stop button during streaming is a key affordance — model state explicitly.

This page is a strong candidate for an EARLY exploration since chat UX has so much variant surface (typing experience, suggestion ranking, follow-up affordances, history management).
