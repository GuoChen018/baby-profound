/**
 * Explorations layout — full-bleed, no chrome.
 *
 * Originally this layout rendered a sticky "Workspace / Explorations"
 * breadcrumb across every prototype. That made every exploration feel like
 * a sub-page rather than a self-contained variant of the workspace.
 *
 * Since we now have the global cmd+K palette mounted in `app/layout.tsx`,
 * navigation between prototypes (and back to the canonical workspace)
 * happens via the palette — so the breadcrumb is redundant. Each
 * exploration owns its own viewport entirely.
 *
 * If a prototype wants to surface a "back to workspace" affordance it can
 * render its own header.
 */

import { type ReactNode } from "react";

export default function ExplorationsLayout({ children }: { children: ReactNode }) {
  // `min-h-full` so content-style prototypes (e.g. the explorations index)
  // can grow past the viewport and scroll naturally on `<body>`. Prototypes
  // that want a viewport-height shell — sidebar + internally-scrolling
  // main — should set `h-screen` on their own outer flex container so they
  // don't rely on this wrapper's height.
  return (
    <div className="min-h-full bg-bg-primary text-text-primary">{children}</div>
  );
}
