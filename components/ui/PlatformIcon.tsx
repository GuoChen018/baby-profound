"use client";

/**
 * PlatformIcon — favicon for one of the supported AI answer engines.
 *
 * Resolves a `Platform` enum to its canonical domain and renders a
 * `<Favicon>`. Useful in citation tables, chart legends, and
 * platform-breakdown rows where we want consistent brand recognition
 * without shipping our own SVG asset for every engine.
 */

import type { Platform } from "@/lib/types";
import { Favicon, type FaviconProps } from "./Favicon";

/**
 * Domain we use as the source for each engine's favicon. Picked for the
 * most recognizable brand mark — e.g. Microsoft Copilot uses
 * `copilot.microsoft.com` (the dedicated icon) rather than the generic
 * Microsoft globe at `microsoft.com`.
 */
const PLATFORM_DOMAIN: Record<Platform, string> = {
  chatgpt: "openai.com",
  perplexity: "perplexity.ai",
  anthropic: "anthropic.com",
  google: "google.com",
  gemini: "gemini.google.com",
  copilot: "copilot.microsoft.com",
  grok: "x.ai",
  meta: "meta.ai",
};

const PLATFORM_LABEL: Record<Platform, string> = {
  chatgpt: "ChatGPT",
  perplexity: "Perplexity",
  anthropic: "Claude",
  google: "Google AI Overviews",
  gemini: "Gemini",
  copilot: "Microsoft Copilot",
  grok: "Grok",
  meta: "Meta AI",
};

export interface PlatformIconProps extends Omit<FaviconProps, "domain" | "fallbackLabel"> {
  platform: Platform;
}

export function PlatformIcon({ platform, ...rest }: PlatformIconProps) {
  return (
    <Favicon
      domain={PLATFORM_DOMAIN[platform]}
      fallbackLabel={PLATFORM_LABEL[platform]}
      {...rest}
    />
  );
}

export { PLATFORM_DOMAIN, PLATFORM_LABEL };
