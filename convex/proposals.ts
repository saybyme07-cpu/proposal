import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Generate an unguessable, URL-friendly random ID
function generateSlug(length = 8): string {
  const chars = "23456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Create a new proposal with validated inputs and return its unique shareable slug
 */
export const createProposal = mutation({
  args: {
    senderName: v.string(),
    recipientName: v.string(),
    question: v.string(),
    message: v.string(),
    celebrations: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const sender = args.senderName.trim().slice(0, 80);
    const recipient = args.recipientName.trim().slice(0, 80);
    const question = args.question.trim().slice(0, 160);
    const message = args.message.trim().slice(0, 4000);

    if (!sender) throw new Error("Sender name is required.");
    if (!recipient) throw new Error("Recipient name is required.");
    if (!question) throw new Error("Proposal question is required.");

    // Generate unique slug
    let slug = generateSlug(8);
    let existing = await ctx.db
      .query("proposals")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    while (existing) {
      slug = generateSlug(9);
      existing = await ctx.db
        .query("proposals")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .first();
    }

    const proposalId = await ctx.db.insert("proposals", {
      slug,
      senderName: sender,
      recipientName: recipient,
      question,
      message,
      celebrations: args.celebrations.length > 0 ? args.celebrations : ["memories", "fireworks"],
      createdAt: Date.now(),
      status: "active",
    });

    return { slug, id: proposalId };
  },
});

/**
 * Retrieve public proposal data by slug for the recipient view
 */
export const getProposalBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const proposal = await ctx.db
      .query("proposals")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!proposal) return null;

    // Return only public display fields (safe, no administrative or sensitive metadata)
    return {
      slug: proposal.slug,
      senderName: proposal.senderName,
      recipientName: proposal.recipientName,
      question: proposal.question,
      message: proposal.message,
      celebrations: proposal.celebrations,
      createdAt: proposal.createdAt,
      status: proposal.status || "active",
    };
  },
});

/**
 * Mark proposal as accepted when the recipient clicks YES
 */
export const markAccepted = mutation({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const proposal = await ctx.db
      .query("proposals")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (proposal && proposal.status !== "accepted") {
      await ctx.db.patch(proposal._id, {
        status: "accepted",
      });
    }
  },
});
