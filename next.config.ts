import type { NextConfig } from "next";

/**
 * Production deploys to GitHub Pages at
 * `https://<owner>.github.io/baby-profound/`, so every URL needs to live
 * under the `/baby-profound` subfolder. In dev (`next dev`) we keep the
 * basePath empty so localhost URLs stay clean.
 *
 * `NEXT_PUBLIC_BASE_PATH` is forwarded to the bundle via the `env` key
 * below so the few raw `<img src>` tags (Mercury, Profound mark) can
 * prefix it manually. Anything routed through Next.js itself (Link,
 * router.push, the framework's own asset URLs) picks up `basePath`
 * automatically.
 */
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/baby-profound" : "";

const nextConfig: NextConfig = {
  // Emit a fully static site into `out/` on `next build`. Required for
  // GH Pages, which can only serve plain files (no Node runtime).
  output: "export",

  // Subfolder deployment. Empty in dev so localhost works without the
  // prefix; `/baby-profound` in prod so the assets resolve under the
  // GH Pages namespace.
  basePath,

  // Each route becomes its own folder + `index.html`, which is the
  // shape GH Pages serves out of the box (`/overview/` → `index.html`).
  trailingSlash: true,

  // GH Pages has no image optimization backend — fall back to raw
  // `<img>` rendering so `next/image` works without server help.
  images: {
    unoptimized: true,
  },

  // Forward the basePath to client code that needs to construct raw
  // asset URLs (read via `process.env.NEXT_PUBLIC_BASE_PATH` in the
  // helper at `lib/basePath.ts`).
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
