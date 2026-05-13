export default function OverviewPage() {
  return (
    <main className="flex h-full flex-col items-center justify-center p-8">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold tracking-tight">baby-profound</h1>
        <p className="mt-3 text-sm text-[var(--color-fg-secondary)]">
          Scaffold ready. Awaiting design system extraction (Phase 1) and
          product crawl (Phase 2) before the Overview page gets built.
        </p>
        <p className="mt-6 text-xs text-[var(--color-fg-tertiary)]">
          See <code className="rounded bg-[var(--color-bg-secondary)] px-1.5 py-0.5">AGENTS.md</code>
        </p>
      </div>
    </main>
  );
}
