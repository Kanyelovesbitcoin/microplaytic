import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a swipe
export const swipe = mutation({
  args: {
    userId: v.id("users"),
    swipedUserId: v.id("users"),
    isLike: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Record the swipe
    const swipeId = await ctx.db.insert("swipes", args);

    // If it's a like, check if there's a mutual match
    if (args.isLike) {
      // Check if the other user has already liked this user
      const reciprocalSwipe = await ctx.db
        .query("swipes")
        .withIndex("by_user_swiped", (q) =>
          q.eq("userId", args.swipedUserId).eq("swipedUserId", args.userId)
        )
        .filter((q) => q.eq(q.field("isLike"), true))
        .first();

      if (reciprocalSwipe) {
        // Create a match!
        const matchId = await ctx.db.insert("matches", {
          userId1: args.userId,
          userId2: args.swipedUserId,
          matchedAt: Date.now(),
          user1Liked: true,
          user2Liked: true,
        });
        return { swipeId, matchId, isMatch: true };
      }
    }

    return { swipeId, isMatch: false };
  },
});

// Get user's matches
export const getMatches = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const matches = await ctx.db
      .query("matches")
      .withIndex("by_user1", (q) => q.eq("userId1", args.userId))
      .collect();

    const matches2 = await ctx.db
      .query("matches")
      .withIndex("by_user2", (q) => q.eq("userId2", args.userId))
      .collect();

    return [...matches, ...matches2];
  },
});

// Get match with messages
export const getMatchWithMessages = query({
  args: { matchId: v.id("matches") },
  handler: async (ctx, args) => {
    const match = await ctx.db.get(args.matchId);
    if (!match) return null;

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_match", (q) => q.eq("matchId", args.matchId))
      .collect();

    return { match, messages };
  },
});

// Send a message
export const sendMessage = mutation({
  args: {
    matchId: v.id("matches"),
    senderId: v.id("users"),
    content: v.string(),
    type: v.union(
      v.literal("text"),
      v.literal("date-spot-suggestion"),
      v.literal("date-spot-confirmation")
    ),
    metadata: v.optional(
      v.object({
        dateSpotId: v.id("dateSpots"),
        suggestedTime: v.optional(v.string()),
        status: v.union(v.literal("pending"), v.literal("accepted"), v.literal("declined")),
      })
    ),
  },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", args);

    // Update match's last message timestamp
    await ctx.db.patch(args.matchId, {
      lastMessageAt: Date.now(),
    });

    return messageId;
  },
});

// Mark message as read
export const markMessageAsRead = mutation({
  args: { messageId: v.id("messages") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.messageId, {
      readAt: Date.now(),
    });
  },
});

// Get messages for a match
export const getMessages = query({
  args: { matchId: v.id("matches") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_match", (q) => q.eq("matchId", args.matchId))
      .collect();
  },
});
