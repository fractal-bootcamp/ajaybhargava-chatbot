import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { chatbotMessages } from "~/server/db/schema";

export const messagesRouter = createTRPCRouter({
  // For the Chat Persistance Endpoint
  getMessages: publicProcedure.input(z.object({
    sessionId: z.string(),
    limit: z.number().optional(),
  })).query(async ({ ctx, input }) => {
    const messages = await ctx.db.query.chatbotMessages.findMany({
      where: eq(chatbotMessages.sessionId, input.sessionId),
      orderBy: (chatbotMessages, { asc }) => [asc(chatbotMessages.createdAt)],
      limit: input.limit,
    });
    return messages;
  }),

  // For a regular chat message. 
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
