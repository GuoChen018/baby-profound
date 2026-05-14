/**
 * Single source of truth for the GH Pages deployment base path.
 *
 * Next.js itself handles `basePath` for everything that goes through
 * the framework — `<Link>`, `router.push()`, `<Image>`, fetches from
 * `_next/`, etc. all get the prefix applied automatically based on
 * `next.config.ts`.
 *
 * Use this helper ONLY for raw asset URLs that bypass the framework:
 *   - Plain `<img src="/foo.png" />` tags
 *   - `window.location.replace()` to internal paths
 *   - String-templated URLs in CSS / inline styles
 *
 * The value is inlined into the client bundle via the `env` key in
 * `next.config.ts`, so it's safe to read from `process.env` directly
 * in client components.
 */

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  if (!BASE_PATH) return path;
  // Pass external URLs through untouched.
  if (/^https?:\/\//.test(path)) return path;
  // Already prefixed (defensive — should never happen via this helper).
  if (path.startsWith(BASE_PATH)) return path;
  // Normalize: BASE_PATH is "/baby-profound" (no trailing slash), path
  // is "/foo.png" (leading slash). Concatenating gives "/baby-profound/foo.png".
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
