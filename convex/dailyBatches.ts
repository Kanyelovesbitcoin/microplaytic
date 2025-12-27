import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get or create daily batch for user
export const getDailyBatch = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    const batch = await ctx.db
      .query("dailyBatches")
      .withIndex("by_user_date", (q) =>
        q.eq("userId", args.userId).eq("date", today)
      )
      .first();

    return batch;
  },
});

// Create daily batch for user
export const createDailyBatch = mutation({
  args: {
    userId: v.id("users"),
    profileIds: v.array(v.id("users")),
  },
  handler: async (ctx, args) => {
    const today = new Date().toISOString().split("T")[0];

    // Check if batch already exists for today
    const existingBatch = await ctx.db
      .query("dailyBatches")
      .withIndex("by_user_date", (q) =>
        q.eq("userId", args.userId).eq("date", today)
      )
      .first();

    if (existingBatch) {
      // Update existing batch
      await ctx.db.patch(existingBatch._id, {
        profileIds: args.profileIds,
      });
      return existingBatch._id;
    }

    // Create new batch
    const batchId = await ctx.db.insert("dailyBatches", {
      userId: args.userId,
      date: today,
      profileIds: args.profileIds,
    });

    return batchId;
  },
});

// Generate daily batch based on algorithm
export const generateDailyBatch = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) throw new Error("User not found");

    // Get all approved users except current user
    const allUsers = await ctx.db
      .query("users")
      .withIndex("by_approved", (q) => q.eq("isApproved", true))
      .collect();

    // Filter out current user
    let candidates = allUsers.filter((u) => u._id !== args.userId);

    // Get users already swiped on
    const swipes = await ctx.db
      .query("swipes")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    const swipedUserIds = new Set(swipes.map((s) => s.swipedUserId));

    // Filter out already swiped users
    candidates = candidates.filter((u) => !swipedUserIds.has(u._id));

    // Get blocked users
    const blocks = await ctx.db
      .query("blocks")
      .withIndex("by_blocker", (q) => q.eq("blockerId", args.userId))
      .collect();
    const blockedUserIds = new Set(blocks.map((b) => b.blockedUserId));

    // Filter out blocked users
    candidates = candidates.filter((u) => !blockedUserIds.has(u._id));

    // TODO: Implement actual algorithm based on user preferences
    // For now, just shuffle and take first 5-10
    const shuffled = candidates.sort(() => Math.random() - 0.5);
    const batchSize = Math.min(10, Math.max(5, shuffled.length));
    const selectedProfiles = shuffled.slice(0, batchSize);

    const today = new Date().toISOString().split("T")[0];
    const profileIds = selectedProfiles.map((p) => p._id);

    // Create the batch
    const batchId = await ctx.db.insert("dailyBatches", {
      userId: args.userId,
      date: today,
      profileIds,
    });

    return batchId;
  },
});
