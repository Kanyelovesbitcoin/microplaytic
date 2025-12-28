import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Create or get user by device ID
 */
export const getOrCreateUser = mutation({
  args: {
    deviceId: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_device", (q) => q.eq("deviceId", args.deviceId))
      .first();

    if (existingUser) {
      return existingUser._id;
    }

    // Create new user
    const userId = await ctx.db.insert("users", {
      deviceId: args.deviceId,
      createdAt: Date.now(),
      subscriptionStatus: "free",
      scanCount: 0,
    });

    return userId;
  },
});

/**
 * Get user by device ID
 */
export const getUserByDevice = query({
  args: { deviceId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_device", (q) => q.eq("deviceId", args.deviceId))
      .first();
  },
});

/**
 * Get user by ID
 */
export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

/**
 * Update user subscription status
 */
export const updateSubscription = mutation({
  args: {
    userId: v.id("users"),
    subscriptionStatus: v.union(v.literal("free"), v.literal("premium")),
    subscriptionExpiresAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      subscriptionStatus: args.subscriptionStatus,
      subscriptionExpiresAt: args.subscriptionExpiresAt,
    });
  },
});

/**
 * Check if user can scan (respects free tier limits)
 */
export const canUserScan = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);

    if (!user) {
      return { canScan: false, reason: "User not found" };
    }

    // Premium users can always scan
    if (user.subscriptionStatus === "premium") {
      // Check if subscription is still valid
      if (user.subscriptionExpiresAt && user.subscriptionExpiresAt < Date.now()) {
        return { canScan: false, reason: "Subscription expired" };
      }
      return { canScan: true, scansRemaining: -1 }; // -1 means unlimited
    }

    // Free tier: 5 scans per week
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    const recentScans = await ctx.db
      .query("scans")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.gte(q.field("scannedAt"), oneWeekAgo))
      .collect();

    const scansThisWeek = recentScans.length;
    const scansRemaining = Math.max(0, 5 - scansThisWeek);

    if (scansThisWeek >= 5) {
      return {
        canScan: false,
        reason: "Weekly scan limit reached (5 scans per week for free tier)",
        scansRemaining: 0
      };
    }

    return { canScan: true, scansRemaining };
  },
});
