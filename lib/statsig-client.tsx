"use client";

import { StatsigProvider } from "@statsig/react-bindings";
import type { ReactNode } from "react";

interface StatsigUser {
  userID: string;
  email?: string;
  custom?: Record<string, unknown>;
}

interface StatsigClientProviderProps {
  children: ReactNode;
  user?: StatsigUser;
}

/**
 * Client-side Statsig provider for React components
 * Wrap your client components with this provider to use Statsig hooks
 */
export function StatsigClientProvider(props: StatsigClientProviderProps) {
  const { children, user = { userID: "anonymous" } } = props;
  const sdkKey = process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY;

  if (!sdkKey) {
    console.warn("NEXT_PUBLIC_STATSIG_CLIENT_KEY is not set");
    return children;
  }

  return (
    <StatsigProvider
      sdkKey={sdkKey}
      user={user}
      options={{
        environment: { tier: process.env.NODE_ENV || "development" },
      }}
    >
      {children}
    </StatsigProvider>
  );
}
