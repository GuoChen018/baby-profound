# Providers & Platforms — variants

Single component family `PlatformAvatar` (Figma name: `Avatar Platform`) with one variant prop:

- **`platform`** (enum, 19 values) — `Anthropic` · `Anthropic Claude` · `Perplexity` · `Meta` · `Google` · `Google Gemini` · `Microsoft` · `Microsoft Copilot` · `xAI` · `xAI Grok` · `Bytedance` · `Amazon` · `Amazon AWS` · `Apple` · `DeepSeek` · `You.com` · `DuckDuckGo` · `OpenAI` · `Platform19` (placeholder — drop)

## No state variants

No hover/disabled/selected states on the avatar itself. Selection state is communicated by the surrounding chip / row UI, not the avatar.

## No size variants

Always 16×16px. If larger sizes appear in the live product, derive them by scaling SVG (or vendor 24/32 sets when needed).

## Visual logic

- **Brand-color background** for engines with strong brand identity (OpenAI green, DeepSeek blue, Claude orange, Perplexity teal, AWS navy).
- **Black background** for engines with monochrome black logos (Apple, Amazon, xAI, You.com).
- **Light grey (`#f5f5f5`) background** for engines whose logos are colored on light (Google, Meta, Microsoft, Bytedance).
- Inner glyph is always 10×10 (Apple is 8.14×10, OpenAI fills 16×16).
- Border radius `var(--radius-4, 4px)` — implies the system has at least one border-radius token: `--radius-4 = 4px`.
