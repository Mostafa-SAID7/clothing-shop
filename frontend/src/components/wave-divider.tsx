import React from "react";

interface WaveDividerProps {
  /** Mirror the wave horizontally for variety */
  flip?: boolean;
  /** Height scale */
  size?: "sm" | "md" | "lg";
  /** Wave shape */
  variant?: "gentle" | "organic" | "cinematic";
  className?: string;
}

/** Section mask wave paths (fill=currentColor fills to bottom edge 100) */
const PATHS: Record<NonNullable<WaveDividerProps["variant"]>, string> = {
  gentle:
    "M0,55 C240,35 480,75 720,55 C960,35 1200,70 1440,52 L1440,100 L0,100 Z",
  organic:
    "M0,45 C160,15 340,73 540,43 C740,13 920,67 1100,37 C1260,13 1380,53 1440,43 L1440,100 L0,100 Z",
  cinematic:
    "M0,35 C200,85 440,5 720,45 C1000,85 1220,5 1440,45 L1440,100 L0,100 Z",
};

const SIZE_CLASSES: Record<NonNullable<WaveDividerProps["size"]>, string> = {
  sm: "h-[20px] md:h-[32px] lg:h-[44px]",
  md: "h-[32px] md:h-[52px] lg:h-[72px]",
  lg: "h-[48px] md:h-[76px] lg:h-[104px]",
};

export function WaveDivider({
  flip = false,
  size = "md",
  variant = "organic",
  className = "",
}: WaveDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none block -mb-[1px] relative z-10 pointer-events-none text-background dark:text-[hsl(0_0%_6%)] ${className}`}
    >
      <svg
        className={`block w-full ${SIZE_CLASSES[size]}`}
        style={{ transform: flip ? "scaleX(-1)" : undefined }}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d={PATHS[variant]} fill="currentColor" />
      </svg>
    </div>
  );
}
