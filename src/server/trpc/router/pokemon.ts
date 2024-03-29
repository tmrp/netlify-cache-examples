import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "../server/trpc-server-config";

const BLOB_KEY = "pokemonCardsData";

export const pokemonRouter = createTRPCRouter({
  getPokemonCardsByName: publicProcedure
    .input(
      z.object({
        pokemonName: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const blobStore = ctx.netlifyBlobs(BLOB_KEY);

      const blob = await blobStore.getWithMetadata(input.pokemonName);

      console.log("Netlify Data Blob Store:", blobStore);
      console.log("Netlify Data Blob:", blob);

      const parsedBlob = blob && (await JSON.parse(blob?.data));

      if (!parsedBlob || blob?.metadata.pokemonName !== input.pokemonName) {
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
            pokemonName: input.pokemonName,
            timeStamp: new Date().toUTCString(),
          },
        });

        return { ...data, blobData: false };
      }

      return { ...parsedBlob, blobData: true, metaData: blob?.metadata };
    }),

  getRandomPokemonCardsByType: publicProcedure
    .input(
      z.optional(
        z.object({
          headers: z.record(z.string(), z.string()),
        }),
      ),
    )
    .query(async ({ ctx, input }) => {
      const getTypes = await fetch("https://api.pokemontcg.io/v2/types", {
        headers: input?.headers,
      });

      if (input?.headers) {
        Object.entries(input.headers).forEach(([key, value]) => {
          getTypes.headers.set(key, value);
        });
      }

      const typesResponse = await getTypes.json();

      const randomType =
        typesResponse.data[
          Math.floor(Math.random() * typesResponse.data.length)
        ];

      const getCardsByType = await fetch(
        `https://api.pokemontcg.io/v2/cards?q=types:${randomType}&page=1&pageSize=10`,
        {
          headers: input?.headers,
        },
      );

      if (input?.headers) {
        Object.entries(input.headers).forEach(async ([key, value]) => {
          getCardsByType.headers.set(key, value);
        });
      }

      const data = await getCardsByType.json();

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

      const cards = cardDataScheme.parse(await data);

      const timeStamp = new Date().toUTCString();

      return { ...cards, randomType, timeStamp };
    }),
});
