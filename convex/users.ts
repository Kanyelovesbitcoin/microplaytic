import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new user
export const createUser = mutation({
  args: {
    phone: v.string(),
    name: v.string(),
    age: v.number(),
    photos: v.array(v.string()),
    bio: v.optional(v.string()),
    latitude: v.optional(v.number()),
    longitude: v.optional(v.number()),
    city: v.string(),
    isTransplant: v.optional(v.boolean()),
    localVerificationAnswers: v.array(
      v.object({
        questionId: v.string(),
        question: v.string(),
        answer: v.string(),
      })
    ),
    activityPreferences: v.object({
      skiing: v.object({
        interest: v.boolean(),
        level: v.optional(v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced"), v.literal("expert"))),
      }),
      hiking: v.object({
        interest: v.boolean(),
        frequency: v.optional(v.union(v.literal("rarely"), v.literal("monthly"), v.literal("weekly"), v.literal("daily"))),
      }),
      climbing: v.object({
        interest: v.boolean(),
        level: v.optional(v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced"))),
      }),
      biking: v.object({
        interest: v.boolean(),
        type: v.optional(v.union(v.literal("road"), v.literal("mountain"), v.literal("both"))),
      }),
    }),
    soberPreference: v.union(v.literal("drinks"), v.literal("doesnt-drink"), v.literal("no-preference")),
    proximityWeight: v.number(), // Miles
    activityLevelWeight: v.number(), // 1-5
    sharedInterestsWeight: v.number(), // 0-100%
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", {
      ...args,
      isVerified: true,
      isApproved: false, // Requires admin approval
    });
    return userId;
  },
});

// Get user by phone
export const getUserByPhone = query({
  args: { phone: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .first();
  },
});

// Get user by ID
export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

// Get approved users for matching
export const getApprovedUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("users")
      .withIndex("by_approved", (q) => q.eq("isApproved", true))
      .collect();
  },
});

// Update user profile
export const updateUser = mutation({
  args: {
    userId: v.id("users"),
    name: v.optional(v.string()),
    age: v.optional(v.number()),
    photos: v.optional(v.array(v.string())),
    bio: v.optional(v.string()),
    activityPreferences: v.optional(v.object({
      skiing: v.object({
        interest: v.boolean(),
        level: v.optional(v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced"), v.literal("expert"))),
      }),
      hiking: v.object({
        interest: v.boolean(),
        frequency: v.optional(v.union(v.literal("rarely"), v.literal("monthly"), v.literal("weekly"), v.literal("daily"))),
      }),
      climbing: v.object({
        interest: v.boolean(),
        level: v.optional(v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced"))),
      }),
      biking: v.object({
        interest: v.boolean(),
        type: v.optional(v.union(v.literal("road"), v.literal("mountain"), v.literal("both"))),
      }),
    })),
    soberPreference: v.optional(v.union(v.literal("drinks"), v.literal("doesnt-drink"), v.literal("no-preference"))),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;
    await ctx.db.patch(userId, updates);
    return userId;
  },
});

// Update algorithm priorities
export const updateAlgorithmPriorities = mutation({
  args: {
    userId: v.id("users"),
    proximityWeight: v.number(), // Miles
    activityLevelWeight: v.number(), // 1-5
    sharedInterestsWeight: v.number(), // 0-100%
  },
  handler: async (ctx, args) => {
    const { userId, ...priorities } = args;
    await ctx.db.patch(userId, priorities);
    return userId;
  },
});

// Approve user (admin function)
export const approveUser = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, { isApproved: true });
    return args.userId;
  },
});
