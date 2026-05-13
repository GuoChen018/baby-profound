# Tab Bar — variants

## HorizontalTab

| Axis | Values |
|---|---|
| `selected` | bool — adds `border-b-2 fill-primary`, swaps text to `--text-primary` |
| `number` | bool — appends red count like `(45)` |
| `badge` | bool — appends `Beta` pill (blue-badge tokens) |

Combinations ≈ 8 leaf variants per tab.

## HorizontalTabBar

| Axis | Values |
|---|---|
| `settingsExport` | bool — show right-side trailing actions (Settings link + "5.6k answers" export button) |

## Tokens used

- Tab text: `--text-secondary` (inactive), `--text-primary` (active)
- Underline: `--fill-primary`
- Bottom divider: `--fill-quaternary`
- Number callout: `--text-red`
- Beta pill: `--blue-badge/muted-fill`, `--blue-badge/border`, `--blue-badge/emphasis`
- Trailing button: `--control-bg`, "Flat" shadow, `--radius-6`

## Phase 3 mapping

```tsx
<TabBar tabs={[
  { id: 'visibility', label: 'Visibility' },
  { id: 'prompts', label: 'Prompts' },
  { id: 'personas', label: 'Personas', badge: 'Beta' },
  { id: 'citations', label: 'Citations', count: 45 },
]} active="visibility" />
```
