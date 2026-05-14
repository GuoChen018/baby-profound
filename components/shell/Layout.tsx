/**
 * Layout — workspace shell.
 *
 * Renders the persistent Sidebar + a scrollable main content area.
 * Page header (title + right-aligned actions) is left to each page, since
 * every Profound tab uses a slightly different header shape.
 */

import { type ReactNode } from "react";
import { Sidebar } from "./Sidebar";

export interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-full w-full bg-bg-primary text-text-primary">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-y-auto">{children}</main>
    </div>
  );
}
