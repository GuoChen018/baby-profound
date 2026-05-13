# Sidebar — variants

| Axis | Values |
|---|---|
| `state` | `Default` · `Collapsed` (sic: "Collasped") · `Asset selector` · `Settings` · `Settings Org` · `Asset selection` |

## Sidebar Tab (sub-component, node `2:9139`)

| Axis | Values |
|---|---|
| `state` | `Default` · `Selected` |
| `number` | bool — right-aligned suffix like "39%" |

## State summaries

| State | Width | Behavior |
|---|---|---|
| `Default` | 232 | Full sidebar with sections + promo + user |
| `Collapsed` | 60 | Icons-only rail |
| `Asset selector` | 232 | Workspace switcher dropdown open over Default |
| `Settings` | 232 | Settings sub-nav (different tab list) |
| `Settings Org` | 232 | Org-level settings sub-nav |
| `Asset selection` | 232 | Multi-select / picker state |

## Phase 3 mapping

```tsx
<Sidebar
  workspace={{ name: 'Acme', avatar: '/acme.png' }}
  user={{ name: 'Guo Chen', avatar: '/guo.png' }}
  sections={[
    { label: 'Analytics', tabs: [{ id: 'overview', icon: <Home />, label: 'Overview' }, ...] },
    { label: 'Action', tabs: [...] },
  ]}
  promo={<UpgradePromo />}
/>
```

The Collapsed state should be a single boolean prop on the Sidebar, not a separate component.
