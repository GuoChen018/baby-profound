# Section Title — variants

No structural variants. Three optional content slots:

| Slot | Content |
|---|---|
| `title` | required — 18/24 SemiBold |
| `subtitle` | optional — 14/1.4 Regular text-secondary |
| `trailing` | optional ReactNode — usually a Select or pill button |

## Examples

```tsx
<SectionTitle title="Visibility" subtitle="Past 7 days" />
<SectionTitle title="Citations" trailing={<Select label="By platform" />} />
<SectionTitle
  title="Performance"
  subtitle="Compared to previous period"
  trailing={<DateSelector />}
/>
```
