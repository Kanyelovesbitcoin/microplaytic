import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// SafeScan - Microplastic Container Safety App Database Schema

export default defineSchema({
  // Users table (optional for MVP, used for history tracking and subscriptions)
  users: defineTable({
    deviceId: v.string(), // Anonymous device identifier
    createdAt: v.number(), // Timestamp

    // Subscription
    subscriptionStatus: v.union(
      v.literal("free"),
      v.literal("premium")
    ),
    subscriptionExpiresAt: v.optional(v.number()),

    // Usage tracking
    scanCount: v.number(),
    lastScanAt: v.optional(v.number()),
  })
    .index("by_device", ["deviceId"]),

  // Container scans - main table for scan history
  scans: defineTable({
    userId: v.optional(v.id("users")), // Optional - can scan without account

    // Container identification
    plasticType: v.union(
      v.literal("PET-1"),
      v.literal("HDPE-2"),
      v.literal("PVC-3"),
      v.literal("LDPE-4"),
      v.literal("PP-5"),
      v.literal("PS-6"),
      v.literal("OTHER-7"),
      v.literal("UNKNOWN")
    ),
    containerCategory: v.union(
      v.literal("water-bottle"),
      v.literal("food-container"),
      v.literal("disposable-cup"),
      v.literal("plate"),
      v.literal("utensil"),
      v.literal("baby-product"),
      v.literal("other")
    ),
    brandName: v.optional(v.string()),
    productName: v.optional(v.string()),

    // Usage context (from user questions)
    usagePattern: v.union(
      v.literal("single-use"),
      v.literal("reuse-sometimes"),
      v.literal("reuse-regularly")
    ),
    heatExposure: v.union(
      v.literal("never"),
      v.literal("sometimes"),
      v.literal("frequently")
    ),
    condition: v.union(
      v.literal("new"),
      v.literal("lightly-used"),
      v.literal("scratched-worn")
    ),

    // Safety rating
    safetyScore: v.number(), // 0-100
    riskLevel: v.union(
      v.literal("lower-risk"),
      v.literal("moderate-risk"),
      v.literal("higher-risk")
    ),

    // Risk factors breakdown
    riskFactors: v.array(v.string()), // ["Plastic type: PET (#1)", "Usage: Reused multiple times", "Heat exposure: Hot liquids"]
    explanation: v.string(), // One-line summary

    // Metadata
    scannedAt: v.number(), // Timestamp
    imageUrl: v.optional(v.string()), // Optional: stored image (for premium users)
  })
    .index("by_user", ["userId"])
    .index("by_scanned_at", ["scannedAt"]),

  // Container reference database (for known products)
  containerDatabase: defineTable({
    brandName: v.string(),
    productName: v.string(),
    plasticType: v.string(),
    containerCategory: v.string(),
    imageUrl: v.optional(v.string()),

    // Common attributes
    typicalUsage: v.string(), // "single-use", "reusable", etc.
    notes: v.optional(v.string()),
  })
    .index("by_brand", ["brandName"])
    .index("by_category", ["containerCategory"]),
});
