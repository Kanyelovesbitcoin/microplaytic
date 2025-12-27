import { ConvexReactClient } from "convex/react";

const CONVEX_URL = "https://earnest-avocet-326.convex.cloud";

export const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});
