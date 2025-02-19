
import z from "node_modules/zod/lib";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sessions } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const sessionsRouter = createTRPCRouter({
  existingSession: publicProcedure.input(z.object({
    sessionId: z.string(),
  })).query(async ({ ctx, input }) => {
    const session = await ctx.db.query.sessions.findFirst({
      where: eq(sessions.id, input.sessionId),
    });
    return session;
  }),

  newSession: publicProcedure.input(z.object({
    sessionId: z.string(),
  })).mutation(async ({ ctx, input }) => {
    const session = await ctx.db.insert(sessions).values({
      id: input.sessionId,
    }).returning().onConflictDoNothing();
    return session;
  }),

  allSessions: publicProcedure.query(async ({ ctx }) => {
    const session = await ctx.db.query.sessions.findMany({
      orderBy: (sessions, { desc }) => [desc(sessions.createdAt)],
    });
    return session;
  }),
  updateSessionSummary: publicProcedure.input(z.object({
    sessionId: z.string(),
    summary: z.string(),
    })).mutation(async ({ ctx, input }) => {
      const session = await ctx.db.update(sessions).set({ name: input.summary }).where(eq(sessions.id, input.sessionId));
      return session;
    }),
});

