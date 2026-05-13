"use client";

import { Globe, Sparkles } from "lucide-react";
import { useState } from "react";
import { SegmentedControl, Select, Toggle, Tooltip } from "@/components/ui";

export function SegmentedControlPreview() {
  const [range, setRange] = useState("7d");
  return (
    <SegmentedControl
      options={[
        { label: "1d", value: "1d" },
        { label: "7d", value: "7d" },
        { label: "28d", value: "28d" },
        { label: "90d", value: "90d" },
        { label: "1y", value: "1y" },
        { label: "All", value: "all" },
      ]}
      value={range}
      onChange={setRange}
    />
  );
}

export function TogglesPreview() {
  return (
    <div className="space-y-4">
      <Toggle label="Email notifications" defaultChecked />
      <Toggle label="Slack alerts" />
      <Toggle label="Locked feature" disabled />
    </div>
  );
}

export function SelectPreview() {
  const [active, setActive] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-8">
      <Select iconLeft={<Globe />}>All regions</Select>
      <Select iconLeft={<Sparkles />} counter={3}>Engines</Select>
      <Select multiple={false}>Sort by</Select>
      <Select active={active} onClick={() => setActive((s) => !s)} counter={2}>
        Active (click)
      </Select>
    </div>
  );
}

export function TooltipPreview() {
  return (
    <div className="flex flex-wrap items-center gap-16 py-32">
      <Tooltip content="A simple tooltip">
        <button className="rounded-6 bg-control-bg shadow-flat px-12 py-6 text-small font-medium">
          Hover me (top)
        </button>
      </Tooltip>
      <Tooltip
        placement="bottom"
        large
        content={
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-12">
              <span className="text-small font-medium">Visibility Score</span>
              <span className="text-mini text-text-tertiary">May 12</span>
            </div>
            <p className="text-paragraph text-text-secondary">
              Brex maintained #1 visibility this period despite a slight dip in
              business credit card topics.
            </p>
          </div>
        }
      >
        <button className="rounded-6 bg-control-bg shadow-flat px-12 py-6 text-small font-medium">
          Rich tooltip (bottom, large)
        </button>
      </Tooltip>
    </div>
  );
}
