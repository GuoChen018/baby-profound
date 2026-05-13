# Tab Bar — `2:8310` (was `1:6874`)

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Tab Bar"

## Interpretation summary

The horizontal tab navigation used at the top of every Profound page. Each tab can show a count, a badge ("Beta"), or both. Selected tab gets a 2px black underline. Tabs sit on top of a 1px bottom border that spans the full width.

## Component APIs

```tsx
type HorizontalTabProps = {
  text: string;
  selected?: boolean;
  number?: boolean;        // show count like "(45)"
  numberValue?: string;
  badge?: boolean;         // show "Beta" pill
};

type HorizontalTabBarProps = {
  tabs: TabSpec[];
  active: string;
  trailing?: React.ReactNode;        // settings + answers count + export button
};
```

## Anatomy

```
HorizontalTabBar: flex items-center justify-between · h=48 · border-b 1 fill-quaternary
  [Left] tabs: flex gap-16
    Tab: h=48, py=14, gap=4, items-center
      Label: 13/16 Medium, text-secondary (text-primary if selected)
      [Number, optional]: pl=6, text-red 13/16 Medium e.g. "(45)"   ← red callout for "open issues"
      [Badge, optional]: blue badge pill "Beta" (uses blue-badge tokens — same recipe as Badge component)
    Selected tab: + border-b-2 border-fill-primary
  [Right] trailing actions:
    "Settings" Tab + "5.6k answers" pill button (control-bg, Flat shadow, radius-6, arrow-up-right)
```

## Real-world tabs (observed)

`Visibility` (selected) · `Prompts` · `Platforms` · `Regions` · `Personas` (Beta) · `Sentiment` · `Citations` · `Query Fanout`

These are the canonical Profound tabs — match them when wiring up the app shell.

## Number callout

The "(45)" red number pattern is used for showing **open issues / unread items** count next to a tab — a strong visual call to action. Color = `--text-red`.

## Asset URLs

- Screenshot: `https://www.figma.com/api/mcp/asset/ad84ea20-3983-426b-ae10-aca2513c09b8`
