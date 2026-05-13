# Section Title — `2:8428` (was `1:6992`)

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Section Title"

> Note: this frame was rendered in **dark theme** in Figma (header bg `#1e1e1e`, control-bg `#292929`). The component itself is theme-aware.

## Interpretation summary

The section header pattern used above each chart/data-viz block on a Profound page. Title + sub-header on the left, optional control(s) on the right (here a "Chart Config" Select).

## Component API

```tsx
type SectionTitleProps = {
  title: string;
  subtitle?: string;
  trailing?: ReactNode;        // typically a Select or Button
};
```

## Anatomy

```
SectionTitle: flex gap-24 items-center w=1152
  [Copy block]: flex flex-col gap-4 flex-1
    Title: 18/24 SemiBold (Title/MiniSemibold) text-primary
    Sub-header: 14/1.4 Regular text-secondary
  [Trailing slot]: typically a Select pill (Chart Config / etc.)
    Same surface as standard Select: control-bg + Flat shadow + radius-6
```

## Tokens

- Title style: `Title/MiniSemibold` (18/24 SemiBold)
- Sub-header style: `Body/Regular` (14/1.4 Regular)
- Title color: `--text-primary`
- Sub-header color: `--text-secondary`
- Trailing control: standard Select treatment

## Asset URLs

- Screenshot: `https://www.figma.com/api/mcp/asset/c878a50a-cdeb-48ef-91f6-c9660ea03224`
