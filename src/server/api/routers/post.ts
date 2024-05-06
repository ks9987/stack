import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ text: z.string().min(1), channelId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          text: input.text,
          channel: { connect: { id: input.channelId } },
          createdBy: { connect: { id: ctx.session.user.id } },
        }
      });
    }),
});
