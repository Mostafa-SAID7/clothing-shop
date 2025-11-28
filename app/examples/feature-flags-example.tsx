/**
 * Example: Server-side feature flag usage
 * This component demonstrates how to use feature flags in server components
 */

import { createFeatureFlag, createDynamicConfig } from "@/lib/flags";

// Example dynamic config type
interface BannerConfig {
  message: string;
  color: string;
  enabled: boolean;
}

export default async function FeatureFlagsExample() {
  // Simple feature flag
  const showNewFeature = await createFeatureFlag("my_first_gate")();

  // Dynamic config with typed response
  const bannerConfig = await createDynamicConfig<BannerConfig>("banner_config")();

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Feature Flags Example</h1>

      {/* Simple feature flag */}
      <div className="p-4 border rounded">
        <h2 className="font-semibold">Simple Feature Flag</h2>
        <p>
          New Feature is: <strong>{showNewFeature ? "ON" : "OFF"}</strong>
        </p>
        {showNewFeature && (
          <div className="mt-2 p-2 bg-green-100 rounded">
            🎉 New feature is enabled!
          </div>
        )}
      </div>

      {/* Dynamic config */}
      <div className="p-4 border rounded">
        <h2 className="font-semibold">Dynamic Config</h2>
        {bannerConfig?.enabled && (
          <div
            className="mt-2 p-4 rounded"
            style={{ backgroundColor: bannerConfig.color }}
          >
            {bannerConfig.message}
          </div>
        )}
      </div>

      {/* Usage instructions */}
      <div className="p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">How to use:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Go to Statsig Console: console.statsig.com</li>
          <li>Create a new Feature Gate called "my_first_gate"</li>
          <li>Enable it for your users</li>
          <li>Refresh this page to see the changes</li>
        </ol>
      </div>
    </div>
  );
}
