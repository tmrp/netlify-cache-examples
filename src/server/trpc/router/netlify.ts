import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "../server/trpc-server-config";

import { headers } from "next/headers";

export const netlifyRouter = createTRPCRouter({
  onDemand: publicProcedure.query(async ({ ctx }) => {
    const headersList = headers();
    const host = headersList.get("host");
    const protocol = headersList.get("x-forwarded-proto");

    const base = `${protocol}://${host}`;

    const response = await fetch(`${base}/.netlify/builders/on-demand-builder`);

    const cardDataScheme = z.object({
      data: z.array(
        z.object({
          id: z.string(),
          images: z.object({
            small: z.string(),
          }),
          name: z.string(),
        }),
      ),
      timeStamp: z.string(),
      type: z.string(),
    });

    const cardData = cardDataScheme.parse(await response.json());

    return cardData;
  }),
});
