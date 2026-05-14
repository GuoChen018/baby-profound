/**
 * TabBar — sub-tab row underneath a page title.
 *
 * Source: Agents Overview header — `Overview · All Agents · Templates ·
 * Scheduled` with the active tab underlined. Sheets / Content tabs reuse the
 * same shape.
 *
 * Renders as a flat row of buttons; the active tab gets a 1px white
 * underline. This is purely visual — clicks are wired by the parent so the
 * page can decide whether to swap content in-place or navigate.
 */

"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TabBarItem {
  id: string;
  label: ReactNode;
  /** When provided, the tab is rendered as a link / disabled state. */
  href?: string;
  disabled?: boolean;
}

export interface TabBarProps {
  items: TabBarItem[];
  activeId: string;
  onChange?: (id: string) => void;
  className?: string;
}

export function TabBar({ items, activeId, onChange, className }: TabBarProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "flex items-center gap-24 border-b border-fill-quaternary",
        className,
      )}
    >
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            role="tab"
            type="button"
            aria-selected={active}
            disabled={item.disabled}
            onClick={() => onChange?.(item.id)}
            className={cn(
              "relative -mb-px py-10 text-small font-medium",
              "transition-colors duration-100",
              "focus-visible:outline-none focus-visible:text-text-primary",
              active
                ? "text-text-primary"
                : "text-text-tertiary hover:text-text-secondary",
              item.disabled && "cursor-not-allowed opacity-50",
            )}
          >
            {item.label}
            {active ? (
              <span
                aria-hidden
                className="absolute left-0 right-0 -bottom-px h-[1.5px] bg-text-primary rounded-full"
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
