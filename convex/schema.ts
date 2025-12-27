import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    phone: v.string(),
    name: v.string(),
    age: v.number(),
    photos: v.array(v.string()),
    bio: v.optional(v.string()),
    isVerified: v.boolean(),
    isApproved: v.boolean(),

    // Location
    latitude: v.optional(v.number()),
    longitude: v.optional(v.number()),
    city: v.string(),

    // Local Verification
    isTransplant: v.optional(v.boolean()),
    localVerificationAnswers: v.array(
      v.object({
        questionId: v.string(),
        question: v.string(),
        answer: v.string(),
      })
    ),

    // Activity Preferences
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

    // Algorithm Priorities
    proximityWeight: v.number(),
    activityLevelWeight: v.number(),
    sharedInterestsWeight: v.number(),
    localResidentBoost: v.number(),
  })
    .index("by_phone", ["phone"])
    .index("by_approved", ["isApproved"]),

  dateSpots: defineTable({
    name: v.string(),
    category: v.union(
      v.literal("coffee"),
      v.literal("restaurant"),
      v.literal("outdoor"),
      v.literal("activity"),
      v.literal("bar"),
      v.literal("other")
    ),
    address: v.string(),
    description: v.string(),
    imageUrl: v.optional(v.string()),
    latitude: v.number(),
    longitude: v.number(),
  }).index("by_category", ["category"]),

  matches: defineTable({
    userId1: v.id("users"),
    userId2: v.id("users"),
    matchedAt: v.number(),
    lastMessageAt: v.optional(v.number()),
    user1Liked: v.boolean(),
    user2Liked: v.boolean(),
  })
    .index("by_user1", ["userId1"])
    .index("by_user2", ["userId2"])
    .index("by_users", ["userId1", "userId2"]),

  messages: defineTable({
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
    readAt: v.optional(v.number()),
  }).index("by_match", ["matchId"]),

  dailyBatches: defineTable({
    userId: v.id("users"),
    date: v.string(),
    profileIds: v.array(v.id("users")),
  })
    .index("by_user", ["userId"])
    .index("by_user_date", ["userId", "date"]),

  reports: defineTable({
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
    status: v.union(v.literal("pending"), v.literal("reviewed"), v.literal("resolved")),
  })
    .index("by_reporter", ["reporterId"])
    .index("by_reported", ["reportedUserId"])
    .index("by_status", ["status"]),

  blocks: defineTable({
    blockerId: v.id("users"),
    blockedUserId: v.id("users"),
  })
    .index("by_blocker", ["blockerId"])
    .index("by_blocked", ["blockedUserId"]),

  swipes: defineTable({
    userId: v.id("users"),
    swipedUserId: v.id("users"),
    isLike: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_swiped", ["swipedUserId"])
    .index("by_user_swiped", ["userId", "swipedUserId"]),
});
