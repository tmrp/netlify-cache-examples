import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "../server/trpc-server-config";

import { getCookie, setCookie } from "lib/server-actions/cookie-actions";

export const nextRouter = createTRPCRouter({
  getCookie: publicProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ input }) => {
      const cookie = await getCookie(input.key);

      return cookie?.value;
    }),

  setCookie: publicProcedure
    .input(
      z.object({
        key: z.string(),
        value: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await setCookie(input.key, input.value);

      return input.value;
    }),
  setCookieQuery: publicProcedure
    .input(
      z.object({
        key: z.string(),
        value: z.string(),
      }),
    )
    .query(async ({ input }) => {
      await setCookie(input.key, input.value);

      return input.value;
    }),
});
