# Sidebar — `2:8843` (was `1:7407`)

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Sidebar"

## Interpretation summary

The left navigation rail, fully composed. 232px wide, full-height, `--bg-secondary` background, 0.5px right border. Six top-level state variants observed in the metadata:

- `Default` — collapsed-row layout with all primary tabs visible
- `Collasped` (sic) — 60px-wide rail with icons only
- `Asset selector` — sidebar with the workspace switcher dropdown open
- `Settings` — settings sub-navigation
- `Settings Org` — org-level settings sub-navigation
- `Asset selection` — multi-asset picker state

I fetched the `Default` state for full design context (the others share most chrome).

## Anatomy (Default state)

```
Sidebar: 232w · h=900 · bg-bg-secondary · border-r-0.5 fill-quaternary · p-12 · flex flex-col justify-between
[Top]
  [Workspace dropdown row]: h=32, px=10, gap=7
    Avatar 16×16 (radius-4) + "Ramp" 13/16 Medium + chevron-up-down 16
  [Search]: full Search component embedded (control-bg surface + "/" key hint pill)
  [Section: "Analytics"]: 12/14 Medium text-tertiary section header
    Tabs (rows): h=32, px=10, py=8, radius-8, gap=8
      icon 16 + label 13/16 Medium text-secondary
      Default tabs: Overview · Answer Engine Insights · Prompt Volumes · Agent Analytics · Shopping
  [Section: "Action"]: same pattern
    Default tabs: Opportunities · Content · Workflows · Brand Hub
[Bottom]
  [Sidebar Upgrade Promo card]: bg-bg-tertiary, p (16/12), gap-12, radius-8, "Flat" shadow
    Title 12/14 Medium "Welcome to Profound 2.0" + x-mark close
    Body 11/1.5 Regular text-secondary
    "Share Feedback" button (control-bg, Flat shadow, radius-6)
    Annotation: "When 'x' is clicked, hide until next session"
  [Collapse tab]: h=32 · just chevron-double-left 16, no label
  [Support tab]: h=32 · icon + "Support" label
  [User row]: h=32 · 16px avatar (rounded-full) + "Dylan Babbs" 13/16 Medium text-primary
```

## Component API (proposed)

```tsx
type SidebarProps = {
  state?: 'Default' | 'Collapsed' | 'Asset selector' | 'Settings' | 'Settings Org' | 'Asset selection';
  workspace: { name: string; avatar: string };
  user: { name: string; avatar: string };
  sections: Section[];
  promo?: ReactNode;
};

type SidebarTabProps = {
  icon: ReactNode;
  text: string;
  selected?: boolean;
  number?: string;       // optional right-aligned suffix (e.g. "39%")
};
```

## Tabs (real)

`Analytics`: Overview · Answer Engine Insights · Prompt Volumes · Agent Analytics · Shopping
`Action`: Opportunities · Content · Workflows · Brand Hub

These are the canonical Profound left-nav items.

## Tokens

- Surface: `--bg-secondary`
- Border: `--fill-quaternary` 0.5px
- Section header: `--text-tertiary` 12/14 Medium
- Tab text: `--text-secondary` (default), `--text-primary` (selected)
- Tab radius: 8px
- Promo card surface: `--bg-tertiary` + Flat shadow + `--radius-8`
- Search & feedback button: standard "Flat" surface (`control-bg` + shadow-1/2/3 + `radius-6`)
- Search "/" key hint pill: `--bg-tertiary` 4×4 radius

## Asset URLs

- Screenshot (whole frame): `https://www.figma.com/api/mcp/asset/599952de-a974-40d7-9d64-fac5902d1cfb`
