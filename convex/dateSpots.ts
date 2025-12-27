import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all date spots
export const getAllDateSpots = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("dateSpots").collect();
  },
});

// Get date spots by category
export const getDateSpotsByCategory = query({
  args: {
    category: v.union(
      v.literal("coffee"),
      v.literal("restaurant"),
      v.literal("outdoor"),
      v.literal("activity"),
      v.literal("bar"),
      v.literal("other")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("dateSpots")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});

// Get single date spot
export const getDateSpot = query({
  args: { dateSpotId: v.id("dateSpots") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.dateSpotId);
  },
});

// Seed date spots (run once to populate database)
export const seedDateSpots = mutation({
  args: {},
  handler: async (ctx) => {
    const dateSpots = [
      {
        name: "Liberty Park",
        category: "outdoor" as const,
        address: "600 E 900 S, Salt Lake City, UT 84105",
        description: "Classic SLC park perfect for casual walks and picnics",
        latitude: 40.7406,
        longitude: -111.872,
      },
      {
        name: "The Leonardo",
        category: "activity" as const,
        address: "209 E 500 S, Salt Lake City, UT 84111",
        description: "Interactive science and art museum downtown",
        latitude: 40.7614,
        longitude: -111.8866,
      },
      {
        name: "Park Cafe",
        category: "restaurant" as const,
        address: "604 E 1300 S, Salt Lake City, UT 84105",
        description: "Cozy brunch spot with local favorites",
        latitude: 40.7349,
        longitude: -111.8719,
      },
      {
        name: "Ruth's Diner",
        category: "restaurant" as const,
        address: "4160 Emigration Canyon Rd, Salt Lake City, UT 84108",
        description: "Historic diner in Emigration Canyon",
        latitude: 40.7619,
        longitude: -111.8001,
      },
      {
        name: "Fisher Brewing",
        category: "bar" as const,
        address: "320 W 800 S, Salt Lake City, UT 84101",
        description: "Local brewery with great atmosphere",
        latitude: 40.7549,
        longitude: -111.9011,
      },
      {
        name: "Caffe Molise",
        category: "restaurant" as const,
        address: "404 S West Temple, Salt Lake City, UT 84101",
        description: "Intimate Italian restaurant downtown",
        latitude: 40.7627,
        longitude: -111.8987,
      },
      {
        name: "Red Butte Garden",
        category: "outdoor" as const,
        address: "300 Wakara Way, Salt Lake City, UT 84108",
        description: "Beautiful botanical garden with mountain views",
        latitude: 40.7711,
        longitude: -111.8155,
      },
      {
        name: "Tracy Aviary",
        category: "activity" as const,
        address: "589 E 1300 S, Salt Lake City, UT 84105",
        description: "Bird sanctuary in Liberty Park",
        latitude: 40.7403,
        longitude: -111.8729,
      },
      {
        name: "Eva's Bakery",
        category: "coffee" as const,
        address: "155 S Main St, Salt Lake City, UT 84111",
        description: "European-style bakery and cafe",
        latitude: 40.7678,
        longitude: -111.8903,
      },
      {
        name: "The Rose Establishment",
        category: "coffee" as const,
        address: "235 S 400 W, Salt Lake City, UT 84101",
        description: "Hip coffee shop with great vibe",
        latitude: 40.7659,
        longitude: -111.9019,
      },
      {
        name: "Wasatch Brew Pub",
        category: "bar" as const,
        address: "2110 S Highland Dr, Salt Lake City, UT 84106",
        description: "Original Utah brewpub",
        latitude: 40.7195,
        longitude: -111.8529,
      },
      {
        name: "Natural History Museum",
        category: "activity" as const,
        address: "301 Wakara Way, Salt Lake City, UT 84108",
        description: "World-class natural history museum",
        latitude: 40.7665,
        longitude: -111.8123,
      },
      {
        name: "Big Cottonwood Canyon",
        category: "outdoor" as const,
        address: "Big Cottonwood Canyon Rd, Salt Lake City, UT",
        description: "Scenic canyon for hiking and outdoor activities",
        latitude: 40.6236,
        longitude: -111.7863,
      },
      {
        name: "Memory Grove Park",
        category: "outdoor" as const,
        address: "375 N Canyon Rd, Salt Lake City, UT 84103",
        description: "Peaceful park at the mouth of City Creek Canyon",
        latitude: 40.7781,
        longitude: -111.8862,
      },
      {
        name: "The Copper Onion",
        category: "restaurant" as const,
        address: "111 E Broadway, Salt Lake City, UT 84111",
        description: "Farm-to-table American cuisine",
        latitude: 40.7679,
        longitude: -111.8887,
      },
      {
        name: "Purgatory Bar",
        category: "bar" as const,
        address: "21 E 100 S, Salt Lake City, UT 84111",
        description: "Craft cocktail bar downtown",
        latitude: 40.7688,
        longitude: -111.8878,
      },
      {
        name: "Coffee Garden",
        category: "coffee" as const,
        address: "898 S 900 E, Salt Lake City, UT 84102",
        description: "Outdoor coffee spot near the university",
        latitude: 40.7464,
        longitude: -111.871,
      },
      {
        name: "This is the Place Heritage Park",
        category: "activity" as const,
        address: "2601 E Sunnyside Ave, Salt Lake City, UT 84108",
        description: "Historical park with pioneer village",
        latitude: 40.7569,
        longitude: -111.8097,
      },
      {
        name: "Ensign Peak Trail",
        category: "outdoor" as const,
        address: "Ensign Vista Dr, Salt Lake City, UT 84103",
        description: "Short hike with amazing city views",
        latitude: 40.7929,
        longitude: -111.8995,
      },
      {
        name: "Sugarhouse Park",
        category: "outdoor" as const,
        address: "1300 E 2100 S, Salt Lake City, UT 84106",
        description: "Popular park for walking, running, and relaxing",
        latitude: 40.7234,
        longitude: -111.863,
      },
    ];

    const ids = [];
    for (const spot of dateSpots) {
      const id = await ctx.db.insert("dateSpots", spot);
      ids.push(id);
    }

    return { count: ids.length, ids };
  },
});
