import { statsigAdapter, type StatsigUser } from "@flags-sdk/statsig";
import { flag, dedupe } from "flags/next";
import type { Identify } from "flags";

/**
 * Identify function for Statsig user properties
 * Customize this to add user-specific properties for feature flag targeting
 */
export const identify = dedupe((async () => ({
  // Add any additional user properties you'd like
  // See docs.statsig.com/concepts/user for more details
  userID: "anonymous", // Default to anonymous, override in your components
  // email: user?.email,
  // custom: {
  //   plan: "free",
  //   signupDate: "2024-01-01"
  // }
})) satisfies Identify<StatsigUser>);

/**
 * Create a feature flag with Statsig adapter
 * @param key - The feature gate key from Statsig console
 * @returns Feature flag function that returns boolean
 */
export const createFeatureFlag = (key: string) =>
  flag<boolean, StatsigUser>({
    key,
    adapter: statsigAdapter.featureGate((gate) => gate.value, {
      exposureLogging: true, // Log when users are exposed to this flag
    }),
    identify,
  });

/**
 * Create a dynamic config flag with Statsig
 * @param key - The dynamic config key from Statsig console
 * @returns Dynamic config function that returns the config object
 */
export const createDynamicConfig = <T = Record<string, any>>(key: string) =>
  flag<T, StatsigUser>({
    key,
    adapter: statsigAdapter.dynamicConfig((config) => config.value as T, {
      exposureLogging: true,
    }),
    identify,
  });

/**
 * Create an experiment flag with Statsig
 * @param key - The experiment key from Statsig console
 * @returns Experiment function that returns the variant
 */
export const createExperiment = <T = string>(key: string) =>
  flag<T, StatsigUser>({
    key,
    adapter: statsigAdapter.experiment((experiment) => experiment.value as T, {
      exposureLogging: true,
    }),
    identify,
  });

// Example feature flags - customize these based on your needs
export const showNewCheckoutFlow = createFeatureFlag("new_checkout_flow");
export const enableProductRecommendations = createFeatureFlag("product_recommendations");
export const showDiscountBanner = createFeatureFlag("discount_banner");
export const enableAdvancedFilters = createFeatureFlag("advanced_filters");
