"use client";

/**
 * BuildModeFlow — agent-generation wizard reached when the user picks a
 * Build suggestion or submits a prompt while in Build mode.
 *
 * The live Profound product only surfaces the Build entry-point (the
 * suggestion list); the post-pick flow is unbuilt. This wizard is a
 * sandbox extension that turns the picked suggestion into a 3-step
 * "AI generating an agent" experience:
 *
 *   1. Objective   — confirm name + objective (auto-filled from preset)
 *   2. Criteria    — pick what the agent watches (multi-select)
 *   3. Delivery    — cadence + notification channel
 *
 * The header is a progress strip with three numbered pills + an animated
 * fill bar. After step 3 the wizard hands back control to the parent via
 * `onComplete` (which resets to the empty state).
 */

import { motion } from "framer-motion";
import { useMemo, useState, type ReactNode } from "react";
import {
  BoltIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SparklesIcon,
  XMarkIcon,
} from "@/components/ui/icons";
import { Button, Input } from "@/components/ui";
import { cn } from "@/lib/cn";
import { buildAgentPresets } from "@/lib/data/ask";
import type {
  BuildAgentPreset,
  BuildWizardStep,
} from "@/lib/types/ask";

export interface BuildModeFlowProps {
  /** When non-null, the wizard is pre-seeded from a Build suggestion. */
  presetId?: string;
  /** Free-form prompt the user typed while in Build mode. */
  initialPrompt?: string;
  onCancel: () => void;
  onComplete: () => void;
  className?: string;
}

const steps: { id: BuildWizardStep; label: string }[] = [
  { id: "objective", label: "Objective" },
  { id: "criteria", label: "Criteria" },
  { id: "delivery", label: "Delivery" },
];

const accentToToken: Record<BuildAgentPreset["accent"], string> = {
  purple: "bg-badge-purple-muted text-badge-purple-emphasis",
  blue: "bg-badge-blue-muted text-badge-blue-emphasis",
  green: "bg-badge-green-muted text-badge-green-emphasis",
  amber: "bg-badge-amber-muted text-badge-amber-emphasis",
  red: "bg-badge-red-muted text-badge-red-emphasis",
};

export function BuildModeFlow({
  presetId,
  initialPrompt,
  onCancel,
  onComplete,
  className,
}: BuildModeFlowProps) {
  const preset = presetId ? buildAgentPresets[presetId] : undefined;

  // Local form state.
  const [name, setName] = useState(preset?.name ?? "Custom agent");
  const [objective, setObjective] = useState(
    preset?.objective ?? initialPrompt ?? "",
  );
  const allWatches = useMemo(
    () =>
      preset?.watches ?? [
        "Visibility score",
        "Citation share",
        "Sentiment",
        "Top movers",
      ],
    [preset],
  );
  const [watches, setWatches] = useState<string[]>(allWatches);
  const [cadence, setCadence] = useState<BuildAgentPreset["cadence"]>(
    preset?.cadence ?? "Daily",
  );
  const [channel, setChannel] = useState<"Email" | "Slack" | "In-app">("Slack");
  const [step, setStep] = useState<BuildWizardStep>("objective");

  const stepIndex = steps.findIndex((s) => s.id === step);
  const canBack = stepIndex > 0;
  const isLast = stepIndex === steps.length - 1;

  return (
    <div
      className={cn(
        "h-full flex flex-col bg-bg-primary",
        className,
      )}
    >
      {/* Wizard header — preset badge + close */}
      <div className="px-32 pt-24 pb-16">
        <div className="flex items-center justify-between gap-16">
          <div className="flex items-center gap-10">
            <span
              className={cn(
                "inline-flex size-32 items-center justify-center rounded-8",
                preset ? accentToToken[preset.accent] : "bg-bg-tertiary text-text-secondary",
              )}
            >
              <SparklesIcon className="size-16" />
            </span>
            <div>
              <p className="text-mini font-medium text-text-tertiary uppercase tracking-wide">
                Build mode
              </p>
              <p className="text-base font-semibold text-text-primary">
                {preset ? preset.name : "Custom agent"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Cancel"
            className={cn(
              "inline-flex items-center justify-center size-28 rounded-6",
              "text-text-tertiary hover:text-text-primary hover:bg-bg-tertiary",
              "transition-colors",
              "focus-visible:outline-none focus-visible:shadow-focus",
            )}
          >
            <XMarkIcon className="size-16" />
          </button>
        </div>
      </div>

      {/* Progress strip */}
      <StepStrip currentStep={step} />

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-32 pb-24">
        <div className="mx-auto max-w-680 pt-24">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {step === "objective" ? (
              <ObjectiveStep
                name={name}
                onNameChange={setName}
                objective={objective}
                onObjectiveChange={setObjective}
              />
            ) : null}
            {step === "criteria" ? (
              <CriteriaStep
                available={allWatches}
                selected={watches}
                onChange={setWatches}
              />
            ) : null}
            {step === "delivery" ? (
              <DeliveryStep
                cadence={cadence}
                onCadenceChange={setCadence}
                channel={channel}
                onChannelChange={setChannel}
                summary={{ name, objective, watches }}
              />
            ) : null}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="shrink-0 px-32 py-16 border-t-[0.5px] border-fill-quaternary flex items-center justify-between">
        <Button
          variant="ghost"
          size="md"
          iconLeft={<ChevronLeftIcon />}
          disabled={!canBack}
          onClick={() =>
            setStep(steps[Math.max(0, stepIndex - 1)].id)
          }
        >
          Back
        </Button>
        <div className="flex items-center gap-8">
          <Button variant="ghost" size="md" onClick={onCancel}>
            Cancel
          </Button>
          {isLast ? (
            <Button
              variant="inverse"
              size="md"
              iconLeft={<BoltIcon />}
              onClick={onComplete}
            >
              Generate agent
            </Button>
          ) : (
            <Button
              variant="inverse"
              size="md"
              iconRight={<ChevronRightIcon />}
              onClick={() => setStep(steps[stepIndex + 1].id)}
            >
              Continue
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}

// ─── Step strip ────────────────────────────────────────────────────

function StepStrip({ currentStep }: { currentStep: BuildWizardStep }) {
  const idx = steps.findIndex((s) => s.id === currentStep);
  const pct = ((idx + 0.5) / steps.length) * 100;
  return (
    <div className="px-32">
      <div className="relative flex items-center justify-between">
        <div className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-fill-quaternary" />
        <motion.div
          className="absolute left-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-fill-primary"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3 }}
        />
        {steps.map((s, i) => {
          const active = i === idx;
          const done = i < idx;
          return (
            <div
              key={s.id}
              className="relative z-10 inline-flex items-center gap-8 bg-bg-primary pr-8 pl-0"
            >
              <span
                className={cn(
                  "inline-flex items-center justify-center size-24 rounded-full text-mini font-semibold",
                  "transition-colors",
                  active
                    ? "bg-fill-primary text-fill-inverse"
                    : done
                      ? "bg-fill-primary text-fill-inverse"
                      : "bg-bg-tertiary text-text-tertiary",
                )}
              >
                {done ? <CheckCircleIcon className="size-14" /> : i + 1}
              </span>
              <span
                className={cn(
                  "text-mini font-medium",
                  active || done ? "text-text-primary" : "text-text-tertiary",
                )}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step views ────────────────────────────────────────────────────

function StepHeader({ title, body }: { title: ReactNode; body?: ReactNode }) {
  return (
    <div className="space-y-4 pb-16">
      <h2 className="text-title-mini font-semibold text-text-primary">
        {title}
      </h2>
      {body ? <p className="text-small text-text-secondary">{body}</p> : null}
    </div>
  );
}

function ObjectiveStep({
  name,
  onNameChange,
  objective,
  onObjectiveChange,
}: {
  name: string;
  onNameChange: (v: string) => void;
  objective: string;
  onObjectiveChange: (v: string) => void;
}) {
  return (
    <div className="space-y-20">
      <StepHeader
        title="Name your agent"
        body="Give the agent a short identifier and describe what it should monitor."
      />
      <Input
        label="Agent name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="e.g. Score regression watcher"
      />
      <div className="space-y-8">
        <label className="text-small font-medium text-text-primary">
          Objective
        </label>
        <textarea
          value={objective}
          onChange={(e) => onObjectiveChange(e.target.value)}
          rows={4}
          placeholder="What should this agent do? When should it alert?"
          className={cn(
            "w-full rounded-6 bg-control-bg shadow-flat",
            "px-12 py-10 text-base text-text-primary placeholder:text-text-tertiary",
            "outline-none focus:shadow-focus transition-shadow",
            "resize-none",
          )}
        />
      </div>
    </div>
  );
}

function CriteriaStep({
  available,
  selected,
  onChange,
}: {
  available: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  function toggle(item: string) {
    if (selected.includes(item)) onChange(selected.filter((s) => s !== item));
    else onChange([...selected, item]);
  }
  return (
    <div className="space-y-20">
      <StepHeader
        title="What should it watch?"
        body="Pick the dimensions the agent should track. You can change these later."
      />
      <div className="space-y-8">
        {available.map((item) => {
          const checked = selected.includes(item);
          return (
            <button
              key={item}
              type="button"
              onClick={() => toggle(item)}
              className={cn(
                "w-full flex items-center justify-between gap-12",
                "rounded-8 px-14 py-12 text-left",
                "transition-colors",
                "focus-visible:outline-none focus-visible:shadow-focus",
                checked
                  ? "bg-control-selected text-text-primary"
                  : "bg-bg-secondary text-text-primary hover:bg-bg-tertiary",
              )}
            >
              <span className="text-small font-medium">{item}</span>
              <span
                className={cn(
                  "inline-flex items-center justify-center size-18 rounded-full border",
                  checked
                    ? "bg-fill-primary border-fill-primary text-fill-inverse"
                    : "border-fill-tertiary",
                )}
              >
                {checked ? <CheckCircleIcon className="size-12" /> : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DeliveryStep({
  cadence,
  onCadenceChange,
  channel,
  onChannelChange,
  summary,
}: {
  cadence: BuildAgentPreset["cadence"];
  onCadenceChange: (c: BuildAgentPreset["cadence"]) => void;
  channel: "Email" | "Slack" | "In-app";
  onChannelChange: (c: "Email" | "Slack" | "In-app") => void;
  summary: { name: string; objective: string; watches: string[] };
}) {
  const cadences: BuildAgentPreset["cadence"][] = [
    "Hourly",
    "Daily",
    "Weekly",
    "On change",
  ];
  const channels: ("Email" | "Slack" | "In-app")[] = ["Email", "Slack", "In-app"];
  return (
    <div className="space-y-20">
      <StepHeader
        title="How should it deliver?"
        body="Choose a cadence and where the agent should drop its findings."
      />

      <div className="space-y-8">
        <p className="text-small font-medium text-text-primary">Cadence</p>
        <div className="grid grid-cols-4 gap-8">
          {cadences.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onCadenceChange(c)}
              className={cn(
                "h-36 rounded-6 text-small font-medium transition-colors",
                "focus-visible:outline-none focus-visible:shadow-focus",
                cadence === c
                  ? "bg-fill-primary text-fill-inverse"
                  : "bg-bg-secondary text-text-secondary hover:text-text-primary hover:bg-bg-tertiary",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <p className="text-small font-medium text-text-primary">Notify via</p>
        <div className="grid grid-cols-3 gap-8">
          {channels.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onChannelChange(c)}
              className={cn(
                "h-36 rounded-6 text-small font-medium transition-colors",
                "focus-visible:outline-none focus-visible:shadow-focus",
                channel === c
                  ? "bg-fill-primary text-fill-inverse"
                  : "bg-bg-secondary text-text-secondary hover:text-text-primary hover:bg-bg-tertiary",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-8 bg-bg-secondary p-16 space-y-8">
        <p className="text-mini font-medium text-text-tertiary uppercase tracking-wide">
          Review
        </p>
        <dl className="grid grid-cols-[120px_1fr] gap-x-12 gap-y-6 text-small">
          <dt className="text-text-tertiary">Name</dt>
          <dd className="text-text-primary font-medium">{summary.name}</dd>
          <dt className="text-text-tertiary">Objective</dt>
          <dd className="text-text-primary line-clamp-2">{summary.objective}</dd>
          <dt className="text-text-tertiary">Watches</dt>
          <dd className="text-text-primary">{summary.watches.join(", ")}</dd>
          <dt className="text-text-tertiary">Cadence</dt>
          <dd className="text-text-primary">{cadence}</dd>
          <dt className="text-text-tertiary">Notify</dt>
          <dd className="text-text-primary">{channel}</dd>
        </dl>
      </div>
    </div>
  );
}
