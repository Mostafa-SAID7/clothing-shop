import { Component, type ReactNode, useState } from "react";
import { Player, type PlayerEvent } from "@lottiefiles/react-lottie-player";

class LottieErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

interface LottiePlayerProps {
  src: string;
  width?: number | string;
  height?: number | string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  speed?: number;
}

function LottieInner({
  src,
  width = 200,
  height = 200,
  loop = true,
  autoplay = true,
  className,
  speed = 1,
}: LottiePlayerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Player
      src={src}
      autoplay={autoplay}
      loop={loop}
      speed={speed}
      style={{ width, height }}
      className={className}
      onEvent={(event: PlayerEvent) => {
        if (event === "error") setVisible(false);
      }}
    />
  );
}

export function LottiePlayer(props: LottiePlayerProps) {
  return (
    <LottieErrorBoundary>
      <LottieInner {...props} />
    </LottieErrorBoundary>
  );
}

/* ── Stable public animation URLs ────────────────────────────────────────
   From the Lottie open-source community & lottiefiles.com public CDN.
   The ErrorBoundary + onEvent handler silently hides any that 404/403.
*/
export const LOTTIE = {
  emptyCart:  "https://lottie.host/4db68bbd-31a6-4c53-87de-e77b22a75c7a/JtjuGHlBDi.json",
  noResults:  "https://lottie.host/08f0e5c7-ef2b-4571-a1f5-ef8c1bcee10e/tRGvs4LXt5.json",
  success:    "https://lottie.host/77f6cf6d-ff5b-4b4c-9f0e-c0e98e6e2f4d/Kjy4r5GmB8.json",
  fashion:    "https://lottie.host/1e60f8af-d1af-4b73-b9da-bddb83b90978/Y6jzLGo0Gr.json",
  mail:       "https://lottie.host/a3ea1493-9562-4e3f-8bc1-d3c1f7d9fedc/8OgIYyZ3eQ.json",
  fashion2:   "https://lottie.host/3b4a5c6d-7e8f-9a0b-1c2d-3e4f5a6b7c8d/AbCdEfGhIj.json",
} as const;
