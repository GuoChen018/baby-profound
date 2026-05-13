# Badges — variants

| Axis | Values |
|---|---|
| `color` | `Grey` · `Green` · `Red` · `Blue` · `Orange` · `Amber` · `Cyan` · `Purple` |
| `size` | `Small` (18h) · `Regular` (22h) |
| `icon` | bool |

→ 8 × 2 × 2 = **32 visual variants**.

## Sizing

- Small: `h-[18px] px-[6px] gap-[3px]` (gap only when icon)
- Regular: `h-[22px] px-[7px] gap-[3px]` (gap only when icon)
- Both: `border-1px rounded-100px py-px`
- Icon: 12×12 always

## Color recipe (3 tokens per color)

`<color>-badge/muted-fill` (background) + `<color>-badge/border` (1px border) + `<color>-badge/emphasis` (text/icon)

## Common semantic mappings

- **Green** — success / positive trend
- **Red** — error / negative trend / alert
- **Amber** / **Orange** — warning / caution
- **Blue** — informational
- **Cyan** — secondary info / "new"
- **Purple** — feature flag / tag (think "AI" labels)
- **Grey** — neutral / default

## Phase 3 mapping

```tsx
<Badge color="green" icon={<CheckCircle />}>Indexed</Badge>
<Badge color="purple" size="sm">Beta</Badge>
```

Add 21 new tokens to `@theme` for the 7 chromatic colors. Suggest namespace: `--color-badge-{color}-{role}` where role ∈ {bg, border, text}.
