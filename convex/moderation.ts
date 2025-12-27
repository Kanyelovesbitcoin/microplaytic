import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Report a user
export const reportUser = mutation({
  args: {
    reporterId: v.id("users"),
    reportedUserId: v.id("users"),
    reason: v.union(
      v.literal("inappropriate-photos"),
      v.literal("harassment"),
      v.literal("spam"),
      v.literal("no-show"),
      v.literal("fake-profile"),
      v.literal("other")
    ),
    details: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const reportId = await ctx.db.insert("reports", {
      ...args,
      status: "pending",
    });
    return reportId;
  },
});

// Get all pending reports (admin)
export const getPendingReports = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("reports")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .collect();
  },
});

// Update report status (admin)
export const updateReportStatus = mutation({
  args: {
    reportId: v.id("reports"),
    status: v.union(v.literal("pending"), v.literal("reviewed"), v.literal("resolved")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.reportId, { status: args.status });
    return args.reportId;
  },
});

// Block a user
export const blockUser = mutation({
  args: {
    blockerId: v.id("users"),
    blockedUserId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const blockId = await ctx.db.insert("blocks", args);
    return blockId;
  },
});

// Check if user is blocked
export const isUserBlocked = query({
  args: {
    blockerId: v.id("users"),
    blockedUserId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const block = await ctx.db
      .query("blocks")
      .withIndex("by_blocker", (q) => q.eq("blockerId", args.blockerId))
      .filter((q) => q.eq(q.field("blockedUserId"), args.blockedUserId))
      .first();

    return block !== null;
  },
});

// Get user's blocked list
export const getBlockedUsers = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("blocks")
      .withIndex("by_blocker", (q) => q.eq("blockerId", args.userId))
      .collect();
  },
});

// Unblock a user
export const unblockUser = mutation({
  args: {
    blockerId: v.id("users"),
    blockedUserId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const block = await ctx.db
      .query("blocks")
      .withIndex("by_blocker", (q) => q.eq("blockerId", args.blockerId))
      .filter((q) => q.eq(q.field("blockedUserId"), args.blockedUserId))
      .first();

    if (block) {
      await ctx.db.delete(block._id);
      return true;
    }
    return false;
  },
});
