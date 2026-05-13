# Stepper — `2:8343` (was `1:6907`)

**File**: `ms5KIXErDeevPJ3a1zIOcr` · **Frame**: "Stepper"

## Interpretation summary

A compact **dot-based progress indicator** — five 4×4 dots (one per step) with the active step rendered as a 12×4 elongated pill. To the right is a label `1/5 steps`. Used in onboarding flows or multi-step wizards.

## Component API

```tsx
type StepperProps = {
  steps: number;
  current: number;
  label?: boolean;                       // show "X/N steps"
};

type IndicatorProps = {
  state: 'Active' | 'Inactive' | 'Completed';
};
```

## Anatomy

```
Stepper: flex gap-8 items-center
  Steps: flex items-center (no gap; each Indicator has p=2 around its dot)
    Indicator (Active):   12×4 pill, bg-fill-primary
    Indicator (Inactive): 4×4 circle, bg-fill-quaternary
    Indicator (Completed): 4×4 circle, bg-fill-primary
  Label (optional): "1/5 steps" — first number text-primary, "/5 steps" text-quaternary, 13/16 Regular
```

## Variant matrix

`label` (bool); per indicator `state` ∈ {Active, Inactive, Completed}.

The metadata response also showed a simpler boolean form `Indicator1` with just on/off — implying the team has both a 3-state and a 2-state indicator depending on context.

## Asset URLs

- Screenshot: `https://www.figma.com/api/mcp/asset/58ba88cf-ea5b-46e1-9bbc-b42784982045`
