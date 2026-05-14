/**
 * Ask-local icon set.
 *
 * The shared `@/components/ui/icons` barrel doesn't yet export microphone,
 * paper-plane-up (send), or stop-square glyphs — but the live Profound
 * composer needs all three. Keep them co-located with the Ask feature
 * until they're promoted to the design-system icon set.
 *
 * Each icon renders at 16×16 by default and inherits `currentColor`.
 */

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Microphone — Heroicons-style mic glyph, filled. */
export function MicrophoneIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path d="M8 1.5C6.61929 1.5 5.5 2.61929 5.5 4V7.5C5.5 8.88071 6.61929 10 8 10C9.38071 10 10.5 8.88071 10.5 7.5V4C10.5 2.61929 9.38071 1.5 8 1.5Z" />
      <path d="M4 7.5C4 7.22386 3.77614 7 3.5 7C3.22386 7 3 7.22386 3 7.5C3 9.85843 4.81607 11.7926 7.125 11.9818V13H5.5C5.22386 13 5 13.2239 5 13.5C5 13.7761 5.22386 14 5.5 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H8.875V11.9818C11.1839 11.7926 13 9.85843 13 7.5C13 7.22386 12.7761 7 12.5 7C12.2239 7 12 7.22386 12 7.5C12 9.70914 10.2091 11.5 8 11.5C5.79086 11.5 4 9.70914 4 7.5Z" />
    </svg>
  );
}

/** Paper-plane-up — round-send arrow. Renders just the arrow glyph;
 *  the circular surface comes from the surrounding button. */
export function SendArrowIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 2C8.27614 2 8.5 2.22386 8.5 2.5V12.5C8.5 12.7761 8.27614 13 8 13C7.72386 13 7.5 12.7761 7.5 12.5V2.5C7.5 2.22386 7.72386 2 8 2Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.64645 6.85355C3.45118 6.65829 3.45118 6.34171 3.64645 6.14645L7.64645 2.14645C7.84171 1.95118 8.15829 1.95118 8.35355 2.14645L12.3536 6.14645C12.5488 6.34171 12.5488 6.65829 12.3536 6.85355C12.1583 7.04882 11.8417 7.04882 11.6464 6.85355L8 3.20711L4.35355 6.85355C4.15829 7.04882 3.84171 7.04882 3.64645 6.85355Z"
      />
    </svg>
  );
}

/** Stop — solid rounded square. Used during streaming to abort generation. */
export function StopIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <rect x="4" y="4" width="8" height="8" rx="1.5" />
    </svg>
  );
}

/** Edit-with-pencil — Heroicons-style "compose new chat" glyph. */
export function NewChatIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path d="M11 2.5L13.5 5L6.5 12L3 13L4 9.5L11 2.5Z" />
      <path d="M10 3.5L12.5 6" />
    </svg>
  );
}

/** Three-dot overflow — used in the conversation top-bar. */
export function OverflowIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <circle cx="3.5" cy="8" r="1.25" />
      <circle cx="8" cy="8" r="1.25" />
      <circle cx="12.5" cy="8" r="1.25" />
    </svg>
  );
}
