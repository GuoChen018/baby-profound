# Providers & Platforms — `1:6683`

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Providers & Platforms"

## Interpretation summary

A 16×16 **rounded-square avatar component** with a `platform` enum prop covering every AI provider/platform Profound tracks. Each variant pairs a brand-color background with the provider's monochrome or colored logomark inside.

This is the canonical "AI engine" / "platform" chip used in:
- Filter pills ("Show me ChatGPT only")
- Result rows (which model answered this query)
- Provider columns in data tables

## Component API (from the variant prop)

```tsx
type Platform =
  | "Anthropic"        // beige bg #f1f0e8, monochrome icon
  | "Anthropic Claude" // bg #d97757 (orange), claude icon
  | "Perplexity"       // bg #00808c (teal)
  | "Meta"             // bg #f5f5f5 (light grey)
  | "Google"           // bg #f5f5f5
  | "Google Gemini"    // bg #f5f5f5, gemini star
  | "Microsoft"        // bg #f5f5f5
  | "Microsoft Copilot"// bg --bg-tertiary
  | "xAI"              // bg black
  | "xAI Grok"         // bg black
  | "Bytedance"        // bg #f5f5f5
  | "Amazon"           // bg black
  | "Amazon AWS"       // bg #222f3e (AWS dark navy)
  | "Apple"            // bg black
  | "DeepSeek"         // bg #4d6bfe (deep blue)
  | "You.com"          // bg black
  | "DuckDuckGo"       // bg --bg-tertiary
  | "OpenAI"           // bg #19c37d (OpenAI green)
  | "Platform19";      // placeholder — bg #f5f5f5, gemini icon
```

19 named variants. `Platform19` is unnamed — likely a placeholder slot, ignore for translation.

## Brand background colors (extracted from the React variant logic)

| Platform | Background |
|---|---|
| OpenAI | `#19c37d` (OpenAI green) |
| DeepSeek | `#4d6bfe` (DeepSeek blue) |
| Amazon AWS | `#222f3e` (AWS navy) |
| Anthropic Claude | `#d97757` (Claude orange) |
| Perplexity | `#00808c` (Perplexity teal) |
| Anthropic | `#f1f0e8` (beige) |
| Amazon, Apple, xAI, xAI Grok, You.com | `#000` (black) |
| Microsoft Copilot, DuckDuckGo | `var(--bg-tertiary, #f5f5f5)` |
| Meta, Google, Google Gemini, Microsoft, Bytedance, Platform19 | `#f5f5f5` (hard-coded `bg-tertiary` value) |

## Component shape

- Size: **16×16px**
- Border radius: `var(--radius-4, 4px)` — confirms a `--radius-4` token of 4px exists
- Padding: `3px 2px` for most; `4px 3px` for Anthropic Claude; `0` for OpenAI (icon fills the chip)
- Inner icon: **10×10px** for all variants except OpenAI (16×16, fills) and Apple (8.14×10, taller and skinnier).

## Implementation notes (Phase 3)

1. Build a single `PlatformAvatar` primitive in `components/ui/PlatformAvatar.tsx`. Accept `platform` prop with the 18 real values (drop `Platform19`).
2. Each variant gets `bgClass` and an `<Icon />` child. Vendor the brand SVGs into `components/ui/icons/platforms/` (download via the asset URLs in this file before they expire).
3. Background for `bg-tertiary` variants should use the design token, not the hard-coded hex — so they auto-flip for dark theme.
4. The pure `Anthropic` (no "Claude") variant is suspicious — looks like a legacy model. Confirm during component build whether to keep both.

## Reference React + Tailwind code

See full `AvatarPlatform` component output above (~250 lines). The structure is one giant conditional render with one `<img />` per platform pointing to a brand asset. For a clean implementation, replace the conditional rendering with a `Map<Platform, { bg: string; Icon: ReactComponent }>`.

## Asset URLs (7-day expiry, capture immediately if needed)

| Platform | Asset |
|---|---|
| Anthropic | `https://www.figma.com/api/mcp/asset/9cfa197b-8324-4463-b162-5d0415997097` |
| Anthropic Claude | `https://www.figma.com/api/mcp/asset/2a6069de-15ff-46ad-af41-801ef660d286` |
| Perplexity | `https://www.figma.com/api/mcp/asset/15ff55ef-b1e0-4c41-8e24-87b35147c67d` |
| Meta | `https://www.figma.com/api/mcp/asset/2a55de8f-658a-4ce1-9a97-5679a1c23de9` |
| Google | `https://www.figma.com/api/mcp/asset/f82ffd5b-7e02-4ce8-9678-7d47a13f9850` |
| Google Gemini | `https://www.figma.com/api/mcp/asset/f1321bd1-c53c-4d65-bbc3-80790fc4b23c` |
| Microsoft | `https://www.figma.com/api/mcp/asset/f377aa2e-99ee-44e5-acc9-c5c4e341e734` |
| Microsoft Copilot | `https://www.figma.com/api/mcp/asset/065b66d2-5d17-4b6b-b3d4-ae279924477f` |
| Amazon | `https://www.figma.com/api/mcp/asset/88c8fe7f-9c8a-4215-9a7b-78b0fcd8676f` |
| Amazon AWS | `https://www.figma.com/api/mcp/asset/ee799801-6a34-4370-9562-5992c7478a40` |
| Apple | `https://www.figma.com/api/mcp/asset/f12abe80-4c1d-4284-84a2-f1f08a855e10` |
| xAI | `https://www.figma.com/api/mcp/asset/c3cca6e2-e1d7-4ac7-8503-f7cf2e47c932` |
| xAI Grok | `https://www.figma.com/api/mcp/asset/92fb2850-8124-4159-9766-4bc69f3940ed` |
| DeepSeek | `https://www.figma.com/api/mcp/asset/de5a9777-2cc2-4c0a-b5f2-dd5ca98e095d` |
| Bytedance | `https://www.figma.com/api/mcp/asset/7180311b-5863-4de5-906d-63685b085981` |
| You.com | `https://www.figma.com/api/mcp/asset/8f9a7e23-d6e1-477e-84dd-922b7f20185f` |
| DuckDuckGo | `https://www.figma.com/api/mcp/asset/6785f42e-32c4-4fc7-94ea-5b23ed410eb8` |
| OpenAI (composite mask) | `https://www.figma.com/api/mcp/asset/1b3ed8ed-339f-4b4c-b470-ee0bf90266d7` (+ mask deps) |

Screenshot: `https://www.figma.com/api/mcp/asset/077ade0e-53b9-47f3-9cb2-af13cb73d8e7` (1280×296 PNG)
