"use client";

import { useState } from "react";
import { SegmentedControl, Toggle } from "@/components/ui";

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
