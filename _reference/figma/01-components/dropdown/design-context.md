# Dropdown — `1:8858`

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Dropdown"

> Note: `get_design_context` returned sparse metadata (the frame is too big for code). The metadata enumerates a remarkable **18 dropdown types** plus a calendar block — together this is the most fragmented component in the system. Treat the metadata as a catalog of use-cases that all share a common item pattern.

## Interpretation summary

The Dropdown frame is actually a **catalog of 18 distinct context-specific dropdowns**, plus a per-row item-state matrix (Type × State for the rows themselves) and an embedded **Date Picker Calendar** (covered separately in `date-selector` / referenced here as a sibling).

Profound treats dropdowns as use-case-driven: each "type" is a fully-laid-out menu for a specific feature (Global nav, Filters, Platforms, etc.) rather than a single primitive. For Phase 3 this means we should build:

1. **One `Menu` primitive** (popover surface + item rows) using `@floating-ui/react`
2. **Multiple feature-specific dropdown wrappers** in `components/<feature>/` that compose `Menu` + the relevant content

## Catalog of 18 dropdown `Type` variants (from frame metadata)

| Type | Approx. width × height | Likely use |
|---|---|---|
| Global nav | 208 × 260 | Top bar primary nav menu |
| Filters | 208 × 257 | Filter selection (engine, region, etc.) |
| Platforms | 208 × 238 | Choose AI platform(s) — uses `PlatformAvatar` |
| List Select | 208 × 310 | Generic checkable list |
| Double | 208 × 214 / 78 | Two-column or compound menu |
| Data Export | 208 × 206 | Export options (CSV, XLSX, JSON) |
| Recommendation Options | 208 × 80 | Action-only menu |
| Prompt Editor | 208 × 125 | Inserter or token picker |
| Type17 | 208 × 44 | (unnamed — placeholder?) |
| Profile | 208 × 268 | Avatar dropdown |
| Theme Switcher | 208 × 112 | Light/Dark/System toggle |
| Sort | 208 × 161 | Sort-by selector |
| Website selector | 208 × 192 | Pick property/domain |
| New Asset | 208 × 133 | "Create new" CTA menu |
| Compare Periods | 248 × 241 | Date range comparison |
| Chart Config | 248 × 173 | Chart options |
| Tags | 264 × 278 | Tag picker with chips |

## Item-row variants (in the second sub-frame)

A single row can be: `Basic`, `Input`, `Action`, `Header`, `Divider` — each with `Default`, `Hover`, `Selected` states.

| Item type | Height | State |
|---|---|---|
| `Basic` | 36 | Default · Hover (40h) · Selected |
| `Input` | 32 | Default · Hover · Selected |
| `Action` | 36 | Default · Hover · Selected |
| `Header` | 26 | Default · Hover · Selected |
| `Divider` | 0 (1px line) | Default · Hover · Selected |

→ Common widths: 216–264 px (matches the trigger pill width).

## Embedded calendar (also lives in `date-selector` frame `1:6923`)

The dropdown frame contains a sibling `calendar` block with:
- Single-month picker (`State=Default` 376×387 / `Range Selected` 376×449)
- `Complex Calendar` 840×424 (likely the multi-month selector for date-range comparison)
- Day-cell variants (`Deactive`, `Select`, `Today` flags)

These are duplicated in the canonical Date Selector frame — we'll capture and document there.

## Implementation notes (Phase 3)

```tsx
// components/ui/Menu.tsx
<Menu open onOpenChange>
  <Menu.Header>Workspaces</Menu.Header>
  <Menu.Input placeholder="Search…" />
  <Menu.Item icon={<IconFoo />} selected>Item</Menu.Item>
  <Menu.Divider />
  <Menu.Action onClick={...}>+ Add new</Menu.Action>
</Menu>
```

Then build the 18 specific dropdowns as compositions inside `components/<feature>/`. Don't try to model the 18 types as a single dropdown enum — they're too divergent.

## Asset URLs (7-day expiry)

- Screenshot: `https://www.figma.com/api/mcp/asset/47dc732c-b06e-43a4-a293-3554de804725` (2016×2147, downscaled to 1924×2048)

## Re-fetch sublayers if needed

If you need exact item-row spec, call `get_design_context` against e.g. `1:9037` (Basic/Default item), `1:9046` (Basic/Hover), `1:9092` (Header), `1:9080` (Action). Each is small enough to return full code.
