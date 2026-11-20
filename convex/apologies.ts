import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

function generateSlug(length = 8): string {
  const chars = "23456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Create a new apology entry in the dedicated apologies table
 */
export const createApology = mutation({
  args: {
    senderName: v.string(),
    recipientName: v.string(),
    whatHappened: v.string(),
    message: v.string(),
    theme: v.optional(v.string()),
    sticker: v.optional(v.string()),
    celebrations: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const sender = args.senderName.trim().slice(0, 80);
    const recipient = args.recipientName.trim().slice(0, 80);
    const whatHappened = args.whatHappened.trim().slice(0, 2000);
    const message = args.message.trim().slice(0, 4000);
    const theme = (args.theme || "kittens").trim();
    const sticker = (args.sticker || "💖 100% Sincere").trim();

    if (!sender) throw new Error("Sender name is required.");
    if (!recipient) throw new Error("Recipient name is required.");
    if (!whatHappened) throw new Error("What happened explanation is required.");

    let slug = generateSlug(8);
    let existing = await ctx.db
      .query("apologies")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    while (existing) {
      slug = generateSlug(9);
      existing = await ctx.db
        .query("apologies")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .first();
    }

    const apologyId = await ctx.db.insert("apologies", {
      slug,
      senderName: sender,
      recipientName: recipient,
      whatHappened,
      message,
      theme,
      sticker,
      celebrations: args.celebrations || [theme, sticker],
      createdAt: Date.now(),
      status: "active",
    });

    return { slug, id: apologyId };
  },
});

/**
 * Retrieve apology by slug
 */
export const getApologyBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const apology = await ctx.db
      .query("apologies")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!apology) return null;

    return {
      slug: apology.slug,
      senderName: apology.senderName,
      recipientName: apology.recipientName,
      whatHappened: apology.whatHappened,
      message: apology.message,
      theme: apology.theme,
      sticker: apology.sticker,
      celebrations: apology.celebrations,
      createdAt: apology.createdAt,
      status: apology.status || "active",
    };
  },
});

/**
 * Mark apology as forgiven
 */
export const markForgiven = mutation({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const apology = await ctx.db
      .query("apologies")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (apology && apology.status !== "forgiven") {
      await ctx.db.patch(apology._id, {
        status: "forgiven",
      });
    }
  },
});
