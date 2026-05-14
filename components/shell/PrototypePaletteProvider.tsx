"use client";

/**
 * PrototypePaletteProvider — global state + keyboard shortcut for the
 * prototype-switcher palette.
 *
 * Single source of truth for whether the palette is open. Mounted once in
 * `app/layout.tsx` so the cmd+K shortcut works on every route, and so the
 * Sidebar's "Search ⌘K" button can also trigger it.
 *
 * Keyboard handling:
 *   - `⌘K` (macOS) / `Ctrl+K` (Win/Linux) anywhere in the app toggles the
 *     palette open/closed.
 *   - We swallow the event with `preventDefault()` so the browser's address-
 *     bar search shortcut doesn't intercept it on Firefox.
 *   - The shortcut is suppressed while focus is inside a contenteditable —
 *     these are rare in the app (only the Ask composer) but we'd rather not
 *     hijack their own shortcuts.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type PaletteContextValue = {
  open: boolean;
  setOpen: (next: boolean) => void;
  toggle: () => void;
};

const PaletteContext = createContext<PaletteContextValue | null>(null);

export function PrototypePaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const isModK =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (!isModK) return;

      // Don't hijack typing inside contenteditable surfaces.
      const target = event.target as HTMLElement | null;
      if (target?.isContentEditable) return;

      event.preventDefault();
      setOpen((v) => !v);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const value = useMemo<PaletteContextValue>(
    () => ({ open, setOpen, toggle }),
    [open, toggle],
  );

  return (
    <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>
  );
}

export function usePalette(): PaletteContextValue {
  const ctx = useContext(PaletteContext);
  if (!ctx) {
    // Soft fallback: when the provider isn't mounted (e.g. in tests or
    // isolated stories) return inert handlers instead of throwing.
    return {
      open: false,
      setOpen: () => {},
      toggle: () => {},
    };
  }
  return ctx;
}
