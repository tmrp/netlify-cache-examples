import { z } from 'zod';

import {
  createTRPCRouter,
  publicProcedure,
} from '../server/trpc-server-config';

export const pokemonRouter = createTRPCRouter({
  getPokemonCardsByName: publicProcedure
    .input(
      z.object({
        pokemonName: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const blobStore = ctx.netlifyBlobs(input.pokemonName);
      const blob = await blobStore.get(input.pokemonName);
      const parsedBlob = await JSON.parse(blob);

      if (!parsedBlob || !parsedBlob?.data.length) {
        const freshResponse = await fetch(
          `https://api.pokemontcg.io/v2/cards?q=name:${input.pokemonName}`,
          {
            method: 'GET',
            headers: {
              'X-Api-Key': process.env.POKEMON_TCG_API_KEY ?? '',
            },
          }
        );

        const data = await freshResponse.json();

        await blobStore.setJSON(input.pokemonName, data, {
          metadata: {
            timeStamp: new Date().toISOString(),
          },
        });

        return data;
      }

      return await JSON.parse(blob);
    }),
});
