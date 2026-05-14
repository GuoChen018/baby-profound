import { Badge, Button, Input, Tag } from "@/components/ui";
import {
  SegmentedControlPreview,
  SelectPreview,
  TogglesPreview,
  TooltipPreview,
} from "@/components/ui/_preview/FormPreview";
import {
  ArrowRight,
  CheckCircle,
  Hash,
  Mail,
  Plus,
  Search,
  Settings,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

/**
 * Design-system preview / smoke test.
 * Will be replaced by the real Overview page once the Profound product crawl
 * (Phase 2) and shell primitives (Phase 3) are in.
 */
export default function Home() {
  return (
    <main className="min-h-full bg-bg-primary text-text-primary">
      <div className="mx-auto max-w-5xl px-32 py-48 space-y-48">
        <header className="space-y-8">
          <p className="text-mini text-text-secondary uppercase tracking-wider">
            baby-profound · scaffold preview
          </p>
          <h1 className="text-title-regular font-semibold">Design system tokens</h1>
          <p className="text-base text-text-secondary max-w-prose">
            Tokens are translated from the Profound Figma. The Overview page
            and shell get built once the live-product crawl finishes.
          </p>
        </header>

        {/* Surface tokens */}
        <Section title="Surfaces">
          <div className="grid grid-cols-3 gap-12">
            <Swatch className="bg-bg-primary" label="bg-primary" />
            <Swatch className="bg-bg-secondary" label="bg-secondary" />
            <Swatch className="bg-bg-tertiary" label="bg-tertiary" />
          </div>
        </Section>

        {/* Buttons */}
        <Section title="Buttons" caption="Default · Inverse · Destructive · Ghost">
          <div className="space-y-16">
            <ButtonRow label="Large">
              <Button size="lg">Label</Button>
              <Button size="lg" iconLeft={<Plus />}>Label</Button>
              <Button size="lg" iconLeft={<Plus />} iconRight={<ArrowRight />}>
                Label
              </Button>
              <Button size="lg" iconLeft={<Search />} aria-label="Search" />
            </ButtonRow>
            <ButtonRow label="Default">
              <Button>Label</Button>
              <Button iconLeft={<Plus />}>Label</Button>
              <Button variant="inverse">Inverse</Button>
              <Button variant="destructive" iconLeft={<Trash2 />}>Delete</Button>
              <Button variant="ghost" iconLeft={<Settings />}>Ghost</Button>
            </ButtonRow>
            <ButtonRow label="Small">
              <Button size="sm">Label</Button>
              <Button size="sm" iconLeft={<Plus />}>Label</Button>
              <Button size="sm" disabled>Disabled</Button>
              <Button size="sm" iconLeft={<Settings />} aria-label="Settings" />
            </ButtonRow>
          </div>
        </Section>

        {/* Type scale */}
        <Section title="Typography" caption="Inter Variable + tabular numerals">
          <div className="space-y-12">
            <TypeRow size="text-title-regular" weight="font-semibold" label="Title / Regular Semibold (28)">
              123,456 visibility score
            </TypeRow>
            <TypeRow size="text-title-small" weight="font-semibold" label="Title / Small Semibold (24)">
              Overview
            </TypeRow>
            <TypeRow size="text-title-mini" weight="font-semibold" label="Title / Mini Semibold (18)">
              Visibility Score
            </TypeRow>
            <TypeRow size="text-base" weight="font-normal" label="Body / Regular (14)">
              The quick brown fox jumps over 1,234,567 lazy dogs.
            </TypeRow>
            <TypeRow size="text-small" weight="font-medium" label="Body / Small Medium (13)">
              Button labels, tabs, selects use this style.
            </TypeRow>
            <TypeRow size="text-mini" weight="font-medium" label="Body / Mini Medium (12)">
              Pills, badges, sidebar headers
            </TypeRow>
            <TypeRow size="text-micro" weight="font-medium" label="Body / Micro Medium (10)">
              CMD · ⏎ · /
            </TypeRow>
          </div>
        </Section>

        {/* Status colors */}
        <Section title="Status colors">
          <div className="grid grid-cols-2 gap-12">
            <Swatch className="bg-fill-green" label="fill-green · text-green" textInverse />
            <Swatch className="bg-fill-red" label="fill-red · text-red" textInverse />
          </div>
        </Section>

        {/* Tags */}
        <Section title="Tags" caption="Monochromatic pills · 3 sizes">
          <div className="space-y-12">
            <div className="flex flex-wrap items-center gap-8">
              <Tag size="sm">Small</Tag>
              <Tag size="md">Default</Tag>
              <Tag size="lg">Large</Tag>
            </div>
            <div className="flex flex-wrap items-center gap-8">
              <Tag iconLeft={<Hash />}>Citation</Tag>
              <Tag iconRight={<X />}>Dismissable</Tag>
              <Tag asSpan>Static</Tag>
            </div>
          </div>
        </Section>

        {/* Badges */}
        <Section title="Badges" caption="Chromatic · 8 colors x 2 sizes">
          <div className="space-y-12">
            <div className="flex flex-wrap items-center gap-8">
              <Badge color="grey">Grey</Badge>
              <Badge color="green">Live</Badge>
              <Badge color="red">Error</Badge>
              <Badge color="blue">Beta</Badge>
              <Badge color="orange">Warning</Badge>
              <Badge color="amber">Pending</Badge>
              <Badge color="cyan">Info</Badge>
              <Badge color="purple">New</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-8">
              <Badge color="green" icon={<CheckCircle />}>Verified</Badge>
              <Badge color="blue" icon={<Sparkles />}>AI</Badge>
              <Badge size="sm" color="amber">Pending</Badge>
              <Badge size="sm" color="purple">Pro</Badge>
            </div>
          </div>
        </Section>

        {/* Form controls */}
        <Section title="Form controls">
          <div className="space-y-24">
            <div className="space-y-4">
              <p className="text-mini text-text-tertiary">Input · text field</p>
              <div className="grid grid-cols-2 gap-12 max-w-[640px]">
                <Input placeholder="Search prompts..." iconLeft={<Search />} />
                <Input placeholder="you@brex.com" iconLeft={<Mail />} label="Email" hint="We never share this" />
                <Input placeholder="Disabled" disabled iconLeft={<Search />} />
                <Input placeholder="Error state" error iconLeft={<Mail />} hint="Email is required" />
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-mini text-text-tertiary">SegmentedControl · time range</p>
              <SegmentedControlPreview />
            </div>
            <div className="space-y-4">
              <p className="text-mini text-text-tertiary">Toggle</p>
              <TogglesPreview />
            </div>
            <div className="space-y-4">
              <p className="text-mini text-text-tertiary">Select · filter pill</p>
              <SelectPreview />
            </div>
            <div className="space-y-4">
              <p className="text-mini text-text-tertiary">Tooltip</p>
              <TooltipPreview />
            </div>
          </div>
        </Section>

        <footer className="pt-32 border-t border-fill-quaternary text-mini text-text-tertiary">
          Tokens sourced from{" "}
          <code className="px-4 py-2 rounded-4 bg-bg-secondary">
            _reference/figma/00-foundations/SUMMARY.md
          </code>
        </footer>
      </div>
    </main>
  );
}

function Section({
  title,
  caption,
  children,
}: {
  title: string;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-16">
      <div className="space-y-4">
        <h2 className="text-title-mini font-semibold">{title}</h2>
        {caption ? <p className="text-mini text-text-tertiary">{caption}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Swatch({
  className,
  label,
  textInverse,
}: {
  className: string;
  label: string;
  textInverse?: boolean;
}) {
  return (
    <div
      className={`h-80 rounded-8 shadow-flat flex items-end p-12 ${className} ${textInverse ? "text-text-inverse" : "text-text-tertiary"}`}
    >
      <span className="text-mini font-medium">{label}</span>
    </div>
  );
}

function ButtonRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-12">
      <span className="text-mini text-text-tertiary w-64">{label}</span>
      <div className="flex flex-wrap items-center gap-8">{children}</div>
    </div>
  );
}

function TypeRow({
  size,
  weight,
  label,
  children,
}: {
  size: string;
  weight: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="text-mini text-text-tertiary">{label}</p>
      <p className={`${size} ${weight}`}>{children}</p>
    </div>
  );
}
