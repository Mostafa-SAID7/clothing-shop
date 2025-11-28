"use client";

/**
 * Example: Client-side feature flag usage
 * This component demonstrates how to use feature flags in client components
 */

import { useFeatureGate, useExperiment, useDynamicConfig } from "statsig-react";

export default function ClientFeatureFlagsExample() {
  // Use feature gate
  const { value: isNewUIEnabled } = useFeatureGate("new_ui_design");

  // Use experiment
  const experiment = useExperiment("button_color_test");
  const buttonColor = experiment.get("color", "blue");

  // Use dynamic config
  const config = useDynamicConfig("homepage_config");
  const heroTitle = config.get("hero_title", "Welcome to Style Haven");

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Client-Side Feature Flags Example</h1>

      {/* Feature Gate */}
      <div className="p-4 border rounded">
        <h2 className="font-semibold">Feature Gate</h2>
        <p>
          New UI Design: <strong>{isNewUIEnabled ? "ON" : "OFF"}</strong>
        </p>
      </div>

      {/* Experiment */}
      <div className="p-4 border rounded">
        <h2 className="font-semibold">A/B Test Experiment</h2>
        <button
          className="px-4 py-2 rounded text-white"
          style={{ backgroundColor: buttonColor }}
        >
          Button Color: {buttonColor}
        </button>
      </div>

      {/* Dynamic Config */}
      <div className="p-4 border rounded">
        <h2 className="font-semibold">Dynamic Config</h2>
        <p className="text-lg">{heroTitle}</p>
      </div>

      {/* Usage note */}
      <div className="p-4 bg-blue-50 rounded text-sm">
        <p className="font-semibold mb-2">Note:</p>
        <p>
          This component must be wrapped with StatsigClientProvider to work.
          See lib/statsig-client.ts for the provider setup.
        </p>
      </div>
    </div>
  );
}
