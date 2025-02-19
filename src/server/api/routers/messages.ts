import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { chatbotMessages } from "~/server/db/schema";

export const messagesRouter = createTRPCRouter({
  /**
   * Retrieves a list of messages associated with a specific session.
   * 
   * @param {Object} input - The input parameters for the query.
   * @param {string} input.sessionId - The unique identifier for the chat session.
   * @param {number} [input.limit] - Optional. The maximum number of messages to retrieve.
   * 
   * @returns {Promise<Array>} A promise that resolves to an array of messages sorted by creation date.
   * 
   * This endpoint is used to fetch persisted chat messages from a specific session. It allows
   * for an optional limit on the number of messages returned to manage data load.
   */
  getMessages: publicProcedure.input(z.object({
    sessionId: z.string(),
    limit: z.number().optional(),
    orderBy: z.enum(["asc", "desc"]).optional(),
  })).query(async ({ ctx, input }) => {
    const messages = await ctx.db.query.chatbotMessages.findMany({
      where: eq(chatbotMessages.sessionId, input.sessionId),
      orderBy: (chatbotMessages, { asc, desc }) => [input.orderBy === "asc" ? asc(chatbotMessages.createdAt) : desc(chatbotMessages.createdAt)],
      limit: input.limit,
    });
    return messages;
  }),

  /**
   * Stores a new chat message in the database.
   * 
   * @param {Object} input - The input parameters for storing the message.
   * @param {string} input.sessionId - The unique identifier for the chat session.
   * @param {("user"|"assistant")} input.role - The role of the message sender, either 'user' or 'assistant'.
   * @param {string} input.content - The text content of the message.
   * 
   * @returns {Promise<Object>} A promise that resolves to the newly created message object.
   * 
   * This mutation endpoint is used to persist a new chat message associated with a specific session.
   * It captures essential details like the sender's role and the message content.
   */
  storeMessage: publicProcedure.input(z.object({
    sessionId: z.string(),
    role: z.enum(["user", "assistant"]),
    content: z.string(),
  })).mutation(async ({ ctx, input }) => {
    const message = await ctx.db.insert(chatbotMessages).values({
      id: crypto.randomUUID(),
      sessionId: input.sessionId,
      role: input.role,
      content: input.content,
    }).returning();
    return message;
  }),
});
