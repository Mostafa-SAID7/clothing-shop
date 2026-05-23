"use client";

/**
 * Example: Client-side feature flag usage
 * This component demonstrates how to use feature flags in client components
 *
 * Note: This requires @statsig/react-bindings to be installed
 * and the component to be wrapped with StatsigClientProvider
 */

export default function ClientFeatureFlagsExample() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Client-Side Feature Flags Example</h1>

      {/* Feature Gate Example */}
      <div className="p-4 border rounded">
        <h2 className="font-semibold mb-2">Feature Gate</h2>
        <pre className="bg-gray-100 p-2 rounded text-sm">
          {`import { useGateValue } from "@statsig/react-bindings";

const isEnabled = useGateValue("my_feature");
return isEnabled ? <NewFeature /> : <OldFeature />;`}
        </pre>
      </div>

      {/* Experiment Example */}
      <div className="p-4 border rounded">
        <h2 className="font-semibold mb-2">A/B Test Experiment</h2>
        <pre className="bg-gray-100 p-2 rounded text-sm">
          {`import { useExperimentValue } from "@statsig/react-bindings";

const variant = useExperimentValue("button_test", "color");
return <button style={{ backgroundColor: variant }}>Click</button>;`}
        </pre>
      </div>

      {/* Dynamic Config Example */}
      <div className="p-4 border rounded">
        <h2 className="font-semibold mb-2">Dynamic Config</h2>
        <pre className="bg-gray-100 p-2 rounded text-sm">
          {`import { useConfigValue } from "@statsig/react-bindings";

const title = useConfigValue("homepage", "title");
return <h1>{title}</h1>;`}
        </pre>
      </div>

      {/* Setup Instructions */}
      <div className="p-4 bg-blue-50 rounded">
        <h3 className="font-semibold mb-2">Setup Required:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Set NEXT_PUBLIC_STATSIG_CLIENT_KEY in .env.local</li>
          <li>Wrap your app with StatsigClientProvider in layout.tsx</li>
          <li>Create feature gates in Statsig console</li>
          <li>Use the hooks shown above in your components</li>
        </ol>
        <pre className="mt-3 bg-white p-2 rounded text-xs">
          {`// app/layout.tsx
import { StatsigClientProvider } from "@/lib/statsig-client";

export default function RootLayout({ children }) {
  const sdkKey = process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY!;
  return (
    <StatsigClientProvider sdkKey={sdkKey}>
      {children}
    </StatsigClientProvider>
  );
}`}
        </pre>
      </div>

      {/* Documentation Link */}
      <div className="p-4 bg-gray-100 rounded text-sm">
        <p>
          📚 <strong>Documentation:</strong>{" "}
          <a
            href="https://docs.statsig.com/client/javascript-sdk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Statsig React Bindings Docs
          </a>
        </p>
      </div>
    </div>
  );
}
