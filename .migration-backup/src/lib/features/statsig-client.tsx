"use client";

import { StatsigProvider } from "@statsig/react-bindings";
import type { StatsigUser } from "@statsig/client-core";
import type { ReactNode } from "react";

interface StatsigClientProviderProps {
  children: ReactNode;
  user?: StatsigUser;
  sdkKey?: string;
}

/**
 * Client-side Statsig provider for React components
 * Wrap your client components with this provider to use Statsig hooks
 *
 * @example
 * ```tsx
 * import { StatsigClientProvider } from "@/lib/statsig-client";
 *
 * export default function RootLayout({ children }) {
 *   const sdkKey = process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY!;
 *   return (
 *     <StatsigClientProvider sdkKey={sdkKey} user={{ userID: "user-123" }}>
 *       {children}
 *     </StatsigClientProvider>
 *   );
 * }
 * ```
 */
export function StatsigClientProvider(props: StatsigClientProviderProps) {
  const { children, user = { userID: "anonymous" }, sdkKey } = props;

  if (!sdkKey) {
    if (typeof window !== "undefined") {
      console.warn("Statsig SDK key is not provided");
    }
    return <>{children}</>;
  }

  return (
    <StatsigProvider
      sdkKey={sdkKey}
      user={user}
      options={{
        environment: { tier: "development" },
      }}
    >
      {children}
    </StatsigProvider>
  );
}
