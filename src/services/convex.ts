import { ConvexReactClient } from "convex/react";
import Constants from "expo-constants";

// Get Convex URL from environment variables
const CONVEX_URL = Constants.expoConfig?.extra?.convexUrl || process.env.EXPO_PUBLIC_CONVEX_URL;

if (!CONVEX_URL) {
  throw new Error(
    "Missing EXPO_PUBLIC_CONVEX_URL environment variable. " +
    "Please set it in your .env file or run 'npx convex dev' to get a deployment URL."
  );
}

export const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});
