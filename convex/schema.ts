import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  proposals: defineTable({
    slug: v.string(),
    senderName: v.string(),
    recipientName: v.string(),
    question: v.string(),
    message: v.string(),
    celebrations: v.array(v.string()),
    createdAt: v.number(),
    status: v.optional(v.string()),
  }).index("by_slug", ["slug"]),
});
