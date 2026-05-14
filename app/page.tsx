"use client";

/**
 * Root entry — redirects to `/overview`.
 *
 * Originally used `redirect()` from `next/navigation`, but server-side
 * redirects don't work under static export (`output: "export"` in
 * `next.config.ts`) because there's no server to issue the HTTP 30x.
 * Instead we render an empty page that fires a client-side redirect on
 * mount. Brief blank frame on first paint is acceptable for a demo
 * sandbox; `router.replace` (not `push`) so the redirect doesn't pile
 * up in browser history.
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/overview");
  }, [router]);
  return null;
}
