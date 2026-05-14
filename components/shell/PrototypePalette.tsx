"use client";

/**
 * PrototypePalette — centered cmd+K-style modal for switching between
 * registered prototype surfaces.
 *
 * Behaviour:
 *   - Open/close state lives in `PrototypePaletteProvider`.
 *   - Filter as you type. Matches `title` + `description` + `slug`.
 *   - Arrow up/down moves selection; Enter navigates; Escape closes.
 *   - Clicking a row or clicking the backdrop also works.
 *
 * Layout: a flat list of prototypes under a single "Prototypes"
 * section header. The canonical workspace and per-row icons + tag
 * pills used to live here but were removed — the palette is a quick
 * switcher, not a directory page, and the noise was distracting from
 * the title + one-liner description.
 *
 * Implementation note: the internal state (query, active row) lives
 * inside `<PalettePanel>` which is only mounted while the palette is
 * open. That way state resets via mount/unmount on each open — no
 * synchronous setState inside effects.
 */

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from "@/components/ui/icons";
import { explorations } from "@/lib/explorations";
import { cn } from "@/lib/cn";
import { usePalette } from "./PrototypePaletteProvider";

type PaletteItem = {
  id: string;
  label: string;
  description: string;
  href: string;
};

function buildItems(): PaletteItem[] {
  return explorations.map((exp) => ({
    id: `exp-${exp.slug}`,
    label: exp.title,
    description: exp.description,
    href: `/explorations/${exp.slug}`,
  }));
}

function matches(item: PaletteItem, query: string): boolean {
  if (!query) return true;
  const haystack = `${item.label} ${item.description} ${item.href}`.toLowerCase();
  return haystack.includes(query.toLowerCase());
}

export function PrototypePalette() {
  const { open, setOpen } = usePalette();
  // The inner panel owns transient UI state and is unmounted on close so
  // the next open starts fresh (no need for reset-on-open effects).
  if (!open) return null;
  return <PalettePanel onClose={() => setOpen(false)} />;
}

/* ─────────────────────────── inner panel ─────────────────────────── */

function PalettePanel({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const items = useMemo(() => buildItems(), []);
  const [query, setQuery] = useState("");
  // Default to the first prototype on open. `items[0]` is safe at
  // module scope because `explorations` always has at least one entry
  // in this prototype repo; if that ever changes, swap to a nullable
  // fallback.
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  const filtered = useMemo(
    () => items.filter((i) => matches(i, query)),
    [items, query],
  );

  // Resolved active id — derived from state, falling back to first filtered
  // row when `activeId` becomes stale (e.g. user typed and the previously
  // selected item is now filtered out). Computed during render so we don't
  // need a sync-setState effect to keep things consistent.
  const resolvedActiveId = filtered.some((i) => i.id === activeId)
    ? activeId
    : (filtered[0]?.id ?? null);

  // Focus the search input on mount.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Keep the active row scrolled into view on arrow nav.
  useEffect(() => {
    if (!resolvedActiveId) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-palette-item="${resolvedActiveId}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [resolvedActiveId]);

  const handleSelect = (item: PaletteItem) => {
    onClose();
    router.push(item.href);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (filtered.length === 0) return;
    const currentIdx = Math.max(
      0,
      filtered.findIndex((i) => i.id === resolvedActiveId),
    );

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = filtered[(currentIdx + 1) % filtered.length]!;
      setActiveId(next.id);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const prev =
        filtered[(currentIdx - 1 + filtered.length) % filtered.length]!;
      setActiveId(prev.id);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const item = filtered[currentIdx] ?? filtered[0]!;
      handleSelect(item);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Switch prototype"
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop — clicking closes the palette. */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal surface. */}
      <div
        className={cn(
          "relative w-[min(560px,calc(100vw-32px))]",
          "rounded-10 overflow-hidden",
          "bg-bg-secondary border border-fill-quaternary",
          "shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)]",
          "flex flex-col max-h-[70vh]",
        )}
      >
        {/* Search row. */}
        <div className="flex items-center gap-10 px-16 h-44 border-b border-fill-quaternary">
          <MagnifyingGlassIcon className="size-16 text-text-tertiary shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              // Snap selection to the new first match so the highlight
              // doesn't lag a frame behind the user's typing.
              const next = items.filter((i) => matches(i, e.target.value));
              if (next.length && !next.some((i) => i.id === activeId)) {
                setActiveId(next[0]!.id);
              }
            }}
            placeholder="Search prototypes…"
            className={cn(
              "flex-1 min-w-0 bg-transparent",
              "text-base text-text-primary placeholder:text-text-tertiary",
              "outline-none border-none",
            )}
            aria-label="Search prototypes"
            spellCheck={false}
          />
          <kbd className="text-micro font-medium text-text-tertiary bg-bg-tertiary rounded-4 px-4 py-2">
            ESC
          </kbd>
        </div>

        {/* Item list. */}
        <div
          ref={listRef}
          className="flex-1 min-h-0 overflow-y-auto py-4"
          role="listbox"
          aria-label="Prototype options"
        >
          {filtered.length === 0 ? (
            <div className="px-16 py-24 text-small text-text-tertiary text-center">
              No matches for &quot;{query}&quot;.
            </div>
          ) : (
            <div className="py-6">
              <div className="px-16 pb-4 text-mini font-medium text-text-tertiary uppercase tracking-wide">
                Prototypes
              </div>
              {filtered.map((item) => {
                const active = item.id === resolvedActiveId;
                return (
                  <button
                    type="button"
                    key={item.id}
                    data-palette-item={item.id}
                    role="option"
                    aria-selected={active}
                    onMouseEnter={() => setActiveId(item.id)}
                    onClick={() => handleSelect(item)}
                    className={cn(
                      "w-full text-left flex items-center gap-12 px-16 py-10",
                      "cursor-pointer",
                      "transition-colors",
                      active ? "bg-bg-tertiary" : "hover:bg-bg-tertiary/60",
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <span
                        className={cn(
                          "block text-small font-medium truncate",
                          active ? "text-text-primary" : "text-text-secondary",
                        )}
                      >
                        {item.label}
                      </span>
                      <p className="text-mini text-text-tertiary truncate">
                        {item.description}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 text-mini text-text-tertiary",
                        "inline-flex items-center gap-4",
                        active ? "opacity-100" : "opacity-0",
                        "transition-opacity",
                      )}
                    >
                      <span>↵</span>
                      <ArrowRightIcon className="size-12" />
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer hint. */}
        <div className="px-16 h-32 flex items-center justify-between border-t border-fill-quaternary text-mini text-text-tertiary">
          <span className="inline-flex items-center gap-8">
            <kbd className="font-medium bg-bg-tertiary rounded-4 px-4 py-1">↑↓</kbd>
            navigate
            <kbd className="font-medium bg-bg-tertiary rounded-4 px-4 py-1 ml-6">↵</kbd>
            open
          </span>
          <span>{filtered.length} of {items.length}</span>
        </div>
      </div>
    </div>
  );
}
