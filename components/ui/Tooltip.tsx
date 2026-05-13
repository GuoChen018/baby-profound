"use client";

/**
 * Tooltip — hover/focus tooltip primitive.
 *
 * Spec: _reference/figma/01-components/tooltip/design-context.md (Figma 2:10194)
 *
 * MVP exposes the shared surface treatment + hover/focus trigger. The 6
 * content-shape variants from Figma (Citation, Explainer, Chart, Region,
 * etc.) compose on top of this surface in feature-specific components.
 *
 * Uses @floating-ui/react for positioning.
 */

import {
  arrow,
  flip,
  FloatingArrow,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
} from "@floating-ui/react";
import {
  cloneElement,
  isValidElement,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { cn } from "@/lib/cn";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  children: ReactElement<{ ref?: Ref<unknown> }>;
  content: ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
  /** Tooltip surface uses radius-8 (Explainer) instead of default radius-6. */
  large?: boolean;
  className?: string;
}

export function Tooltip({
  children,
  content,
  placement = "top",
  delay = 200,
  large,
  className,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const arrowRef = useRef<SVGSVGElement>(null);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [offset(8), flip(), shift({ padding: 8 }), arrow({ element: arrowRef })],
  });

  const hover = useHover(context, { delay: { open: delay, close: 0 } });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  if (!isValidElement(children)) {
    return null;
  }

  const childRef = (children as ReactElement<{ ref?: Ref<unknown> }>).props.ref;
  const mergedRef = useMergeRefs([refs.setReference, childRef ?? null]);

  return (
    <>
      {cloneElement(children, {
        ref: mergedRef,
        ...getReferenceProps(),
      } as Partial<typeof children.props>)}
      {open ? (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={cn(
              "z-50 max-w-[400px] p-16 pointer-events-none",
              "bg-bg-primary text-text-primary",
              "border border-fill-quaternary",
              large ? "rounded-8" : "rounded-6",
              // Use drop-shadow filter per Figma — follows silhouette including arrow
              "[filter:drop-shadow(0_16px_32px_var(--shadow-2))_drop-shadow(0_0_2.5px_var(--shadow-1))]",
              className,
            )}
            {...getFloatingProps()}
          >
            <FloatingArrow
              ref={arrowRef}
              context={context}
              className="fill-bg-primary [&>path:first-of-type]:stroke-fill-quaternary"
              tipRadius={1}
            />
            {content}
          </div>
        </FloatingPortal>
      ) : null}
    </>
  );
}
