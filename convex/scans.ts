import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Create a new container scan
 */
export const createScan = mutation({
  args: {
    userId: v.optional(v.id("users")),
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
    safetyScore: v.number(),
    riskLevel: v.union(
      v.literal("lower-risk"),
      v.literal("moderate-risk"),
      v.literal("higher-risk")
    ),
    riskFactors: v.array(v.string()),
    explanation: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const scanId = await ctx.db.insert("scans", {
      ...args,
      scannedAt: Date.now(),
    });

    // Update user's last scan time and count if user exists
    if (args.userId) {
      const user = await ctx.db.get(args.userId);
      if (user) {
        await ctx.db.patch(args.userId, {
          scanCount: user.scanCount + 1,
          lastScanAt: Date.now(),
        });
      }
    }

    return scanId;
  },
});

/**
 * Get all scans for a user
 */
export const getUserScans = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const scans = await ctx.db
      .query("scans")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();

    return scans;
  },
});

/**
 * Get recent scans (for anonymous users or general feed)
 */
export const getRecentScans = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;

    const scans = await ctx.db
      .query("scans")
      .withIndex("by_scanned_at")
      .order("desc")
      .take(limit);

    return scans;
  },
});

/**
 * Get a single scan by ID
 */
export const getScan = query({
  args: { scanId: v.id("scans") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.scanId);
  },
});

/**
 * Delete a scan
 */
export const deleteScan = mutation({
  args: { scanId: v.id("scans") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.scanId);
  },
});

/**
 * Get user's scan statistics
 */
export const getUserStats = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const scans = await ctx.db
      .query("scans")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    if (scans.length === 0) {
      return {
        totalScans: 0,
        averageScore: 0,
        riskDistribution: {
          "lower-risk": 0,
          "moderate-risk": 0,
          "higher-risk": 0,
        },
      };
    }

    const totalScore = scans.reduce((sum, scan) => sum + scan.safetyScore, 0);
    const averageScore = Math.round(totalScore / scans.length);

    const riskDistribution = scans.reduce(
      (dist, scan) => {
        dist[scan.riskLevel]++;
        return dist;
      },
      { "lower-risk": 0, "moderate-risk": 0, "higher-risk": 0 }
    );

    return {
      totalScans: scans.length,
      averageScore,
      riskDistribution,
    };
  },
});
