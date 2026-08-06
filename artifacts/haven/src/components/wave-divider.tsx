import React from "react";

interface WaveDividerProps {
  fill?: string;
  flip?: boolean;
  className?: string;
}

export function WaveDivider({ fill = "currentColor", flip = false, className = "" }: WaveDividerProps) {
  return (
    <div className={`w-full overflow-hidden leading-none block -mb-[1px] relative z-10 ${className}`}>
      <svg
        className={`block w-full h-[32px] md:h-[60px] lg:h-[80px] min-h-[32px] ${flip ? "-scale-x-100" : ""}`}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,50 C240,10 480,90 720,50 C960,10 1200,90 1440,50 L1440,100 L0,100 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
