# Feature Flags with Statsig

This project uses Statsig for feature flags, A/B testing, and dynamic configuration.

## Setup

1. **Environment Variables**
   ```bash
   NEXT_PUBLIC_STATSIG_CLIENT_KEY=client-your_key_here
   STATSIG_SERVER_API_KEY=secret-your_key_here
   ```

2. **Statsig Console**
   - Go to [console.statsig.com](https://console.statsig.com)
   - Create feature gates, experiments, and dynamic configs

## Usage

### Server Components (Recommended)

```typescript
import { createFeatureFlag } from "@/lib/flags";

export default async function MyPage() {
  const isEnabled = await createFeatureFlag("my_feature")();
  
  return (
    <div>
      {isEnabled && <NewFeature />}
    </div>
  );
}
```

### Client Components

```typescript
"use client";
import { useGate } from "@statsig/react-bindings";

export default function MyClientComponent() {
  const { value: isEnabled } = useGate("my_feature");
  
  return (
    <div>
      {isEnabled && <NewFeature />}
    </div>
  );
}
```

### Dynamic Configuration

```typescript
import { createDynamicConfig } from "@/lib/flags";

interface MyConfig {
  title: string;
  color: string;
}

export default async function MyPage() {
  const config = await createDynamicConfig<MyConfig>("my_config")();
  
  return (
    <div style={{ color: config.color }}>
      {config.title}
    </div>
  );
}
```

### A/B Testing

```typescript
import { createExperiment } from "@/lib/flags";

export default async function MyPage() {
  const variant = await createExperiment<"control" | "variant_a" | "variant_b">(
    "button_test"
  )();
  
  return (
    <button className={variant === "variant_a" ? "blue" : "green"}>
      Click Me
    </button>
  );
}
```

## Pre-configured Feature Flags

The following feature flags are already set up in `lib/flags.ts`:

- `showNewCheckoutFlow` - Enable new checkout experience
- `enableProductRecommendations` - Show product recommendations
- `showDiscountBanner` - Display discount banner
- `enableAdvancedFilters` - Enable advanced product filters

## Best Practices

1. **Use Server Components** when possible for better performance
2. **Type your configs** using TypeScript interfaces
3. **Enable exposure logging** to track feature usage
4. **Test locally** before deploying to production
5. **Use meaningful flag names** that describe the feature
6. **Clean up old flags** after full rollout

## Examples

See the example components:
- `app/examples/feature-flags-example.tsx` - Server-side usage
- `app/examples/client-feature-flags-example.tsx` - Client-side usage

## Resources

- [Statsig Documentation](https://docs.statsig.com)
- [Flags SDK Documentation](https://github.com/vercel/flags)
- [Next.js Feature Flags Guide](https://nextjs.org/docs/app/building-your-application/optimizing/feature-flags)
