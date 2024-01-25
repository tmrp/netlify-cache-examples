import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "../server/trpc-server-config";

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
});

export const pokemonRouter = createTRPCRouter({
  getPokemonCardsByName: publicProcedure
    .input(
      z.object({
        pokemonName: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const blobStore = ctx.netlifyBlobs(input.pokemonName);
      const blob = await blobStore.get(input.pokemonName);
      const parsedBlob = await JSON.parse(blob);

      if (!parsedBlob || !parsedBlob?.data.length) {
        const freshResponse = await fetch(
          `https://api.pokemontcg.io/v2/cards?q=name:${input.pokemonName}`,
          {
            headers: {
              "X-Api-Key": process.env.POKEMON_TCG_API_KEY ?? "",
            },
            method: "GET",
          },
        );

        const data = await freshResponse.json();

        await blobStore.setJSON(input.pokemonName, data, {
          metadata: {
            timeStamp: new Date().toISOString(),
          },
        });

        return { ...data, blobData: false };
      }

      const validate = cardDataScheme.parse(parsedBlob);

      return { ...parsedBlob, blobData: true };
    }),

  getRandomPokemonCardsByType: publicProcedure.query(async ({ ctx }) => {
    const getTypes = await fetch("https://api.pokemontcg.io/v2/types");

    const typesResponse = await getTypes.json();

    const randomType =
      typesResponse.data[Math.floor(Math.random() * typesResponse.data.length)];

    const getCardsByType = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=types:${randomType}&page=1&pageSize=10`,
    );

    const data = await getCardsByType.json();

    const cards = cardDataScheme.parse(await data);

    const timeStamp = new Date().toUTCString();

    return { ...cards, randomType, timeStamp };
  }),
});
