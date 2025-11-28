"use client";

import { StatsigProvider, StatsigUser } from "statsig-react";
import { ReactNode } from "react";

interface StatsigClientProviderProps {
  children: ReactNode;
  user?: StatsigUser;
}

/**
 * Client-side Statsig provider for React components
 * Wrap your client components with this provider to use Statsig hooks
 */
export function StatsigClientProvider({
  children,
  user = { userID: "anonymous" },
}: StatsigClientProviderProps) {
  const sdkKey = process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY;

  if (!sdkKey) {
    console.warn("NEXT_PUBLIC_STATSIG_CLIENT_KEY is not set");
    return <>{children}</>;
  }

  return (
    <StatsigProvider
      sdkKey={sdkKey}
      user={user}
      waitForInitialization={false}
      options={{
        environment: { tier: process.env.NODE_ENV },
      }}
    >
      {children}
    </StatsigProvider>
  );
}
