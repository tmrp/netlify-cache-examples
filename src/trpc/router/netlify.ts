import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "../server/trpc-server-config";
import { headers } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export const netlifyRouter = createTRPCRouter({
  onDemand: publicProcedure.query(async ({ ctx }) => {
    const response = await fetch(
      `${BASE_URL}/.netlify/builders/on-demand-builder`,
    );

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
