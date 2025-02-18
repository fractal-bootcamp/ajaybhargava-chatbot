
import z from "node_modules/zod/lib";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sessions } from "~/server/db/schema";

export const sessionsRouter = createTRPCRouter({
  createSession: publicProcedure.mutation(async ({ ctx }) => {
    const session = await ctx.db.insert(sessions).values({
      id: crypto.randomUUID(),
    }).returning();
    return session[0]?.id;
  }),

  newSession: publicProcedure.input(z.object({
    sessionId: z.string(),
  })).mutation(async ({ ctx, input }) => {
    await ctx.db.insert(sessions).values({
      id: input.sessionId,
    }).returning();
  }),
});

