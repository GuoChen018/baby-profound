# Search — variants

| Axis | Values |
|---|---|
| `icon` | bool — show 16px magnifying-glass leading icon |
| `label` | string | undefined |

No size/state variants in this component (use `Input` for full state machine).

## Sidebar variant

The Sidebar has its own embedded "Search" affordance (same visuals + a `/` keyboard hint pill on the right). Treat that as the same primitive with a `keyHint` prop:

```tsx
<Search placeholder="Search" icon keyHint="/" />
```
