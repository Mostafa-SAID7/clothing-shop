import React from "react";

interface WaveDividerProps {
  /** CSS color value — must match the background of the section AFTER the wave */
  fill?: string;
  /** Mirror the wave horizontally for variety */
  flip?: boolean;
  /** Height scale: sm = subtle, md = standard, lg = dramatic */
  size?: "sm" | "md" | "lg";
  /** Wave shape */
  variant?: "gentle" | "organic" | "cinematic";
  className?: string;
}

/**
 * Each path fills from the wave curve DOWN to the bottom edge of the viewBox (0 0 1440 100).
 * Place between a DARK section and a LIGHT section (or vice-versa) for best visual impact.
 * fill = the background colour of the section that immediately follows.
 */
const PATHS: Record<NonNullable<WaveDividerProps["variant"]>, string> = {
  /** Very gentle ripple — good for light-to-light tinted transitions */
  gentle:
    "M0,75 C240,55 480,95 720,75 C960,55 1200,90 1440,72 L1440,100 L0,100 Z",
  /** Natural organic flow — good for most transitions */
  organic:
    "M0,60 C160,30 340,88 540,58 C740,28 920,82 1100,52 C1260,28 1380,68 1440,58 L1440,100 L0,100 Z",
  /** Bold cinematic sweep — best for hero / banner dark↔light transitions */
  cinematic:
    "M0,45 C200,95 440,8 720,55 C1000,102 1220,12 1440,55 L1440,100 L0,100 Z",
};

const SIZE_CLASSES: Record<NonNullable<WaveDividerProps["size"]>, string> = {
  sm: "h-[28px] md:h-[44px] lg:h-[60px]",
  md: "h-[44px] md:h-[70px] lg:h-[96px]",
  lg: "h-[60px] md:h-[96px] lg:h-[128px]",
};

export function WaveDivider({
  fill = "currentColor",
  flip = false,
  size = "md",
  variant = "organic",
  className = "",
}: WaveDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none block -mb-[2px] relative z-10 pointer-events-none ${className}`}
    >
      <svg
        className={`block w-full ${SIZE_CLASSES[size]}`}
        style={{ transform: flip ? "scaleX(-1)" : undefined }}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d={PATHS[variant]} fill={fill} />
      </svg>
    </div>
  );
}
