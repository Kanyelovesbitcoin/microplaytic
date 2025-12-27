import { ConvexReactClient } from "convex/react";

const CONVEX_URL = process.env.EXPO_PUBLIC_CONVEX_URL || "";

if (!CONVEX_URL) {
  console.warn("EXPO_PUBLIC_CONVEX_URL is not set. Please add it to your .env file");
}

export const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});
