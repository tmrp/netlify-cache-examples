import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "../server/trpc-server-config";

import { cookies } from "next/headers";
import { getOrigin } from "server/actions/origin";

export const nextRouter = createTRPCRouter({
  getCookie: publicProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ input }) => {
      const cookie = cookies().get(input.key);

      if (!cookie) {
        return null;
      }

      return cookie?.value;
    }),

  getOrigin: publicProcedure.query(async () => {
    return await getOrigin();
  }),

  setCookie: publicProcedure
    .input(
      z.object({
        key: z.string(),
        value: z.string(),
      }),
    )
    .mutation(({ input }) => {
      cookies().set(input.key, input.value);

      return Response.json({}, { status: 200 });
    }),
});
