# Search — `2:8330` (was `1:6894`)

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Search"

## Interpretation summary

A standalone **search input** — a smaller, lighter cousin of the `Input` text field. Used inline (e.g. inside the sidebar, a list header, or a filter panel). Single visual; only `icon` and `label` are configurable.

## Component API

```tsx
type SearchProps = {
  placeholder?: string;
  icon?: boolean;          // show heroicons-micro/magnifying-glass leading icon
  label?: string;          // optional label above
  value?: string;
  onChange?: (v: string) => void;
};
```

## Anatomy

```
SearchBar: flex flex-col gap-8 w-[259]
  [Label, optional]: 13/16 Medium text-primary
  Input row: bg-control-bg, h=28, px-l=8 px-r=24, py=8, gap=6, radius-6, "Flat" shadow
    [Icon, optional]: 16×16 heroicons-micro/magnifying-glass
    Placeholder: 12/14 Regular text-tertiary "Search for categories or topics..."
```

## Notes

- Smaller than the canonical `Input` (28h vs 32h) and uses the **smaller text size** (12/14 vs 14/1.4).
- Always uses the "Flat" surface (`control-bg` + Flat shadow + radius-6).
- The padding-right is asymmetrical (24 vs 8) to leave space for a clear-button or modifier.

## Asset URLs

- Screenshot: `https://www.figma.com/api/mcp/asset/225d9d96-10d9-42a0-80e2-efa059480d1c`
