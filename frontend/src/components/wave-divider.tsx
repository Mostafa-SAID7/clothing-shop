import React from "react";

interface WaveDividerProps {
  /** Line stroke color or Tailwind color class (defaults to subtle border color) */
  strokeColor?: string;
  /** Mirror the wave horizontally for variety */
  flip?: boolean;
  /** Height scale */
  size?: "sm" | "md" | "lg";
  /** Wave shape */
  variant?: "gentle" | "organic" | "cinematic";
  className?: string;
}

/** Pure curve line paths (stroke only, fill=none) */
const LINE_PATHS: Record<NonNullable<WaveDividerProps["variant"]>, string> = {
  gentle:
    "M0,50 C240,30 480,70 720,50 C960,30 1200,65 1440,48",
  organic:
    "M0,50 C160,20 340,78 540,48 C740,18 920,72 1100,42 C1260,18 1380,58 1440,48",
  cinematic:
    "M0,50 C200,90 440,10 720,50 C1000,90 1220,10 1440,50",
};

const SIZE_CLASSES: Record<NonNullable<WaveDividerProps["size"]>, string> = {
  sm: "h-[16px] md:h-[24px] lg:h-[32px]",
  md: "h-[24px] md:h-[36px] lg:h-[48px]",
  lg: "h-[32px] md:h-[48px] lg:h-[64px]",
};

export function WaveDivider({
  strokeColor = "hsl(var(--border))",
  flip = false,
  size = "md",
  variant = "organic",
  className = "",
}: WaveDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none block relative z-10 pointer-events-none opacity-40 my-2 ${className}`}
    >
      <svg
        className={`block w-full ${SIZE_CLASSES[size]}`}
        style={{ transform: flip ? "scaleX(-1)" : undefined }}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d={LINE_PATHS[variant]}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
