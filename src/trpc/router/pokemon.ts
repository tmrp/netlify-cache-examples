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
      const response = await fetch(
        `https://api.pokemontcg.io/v2/cards?q=name:${input.pokemonName}`,
        {
          method: 'GET',
          headers: {
            'X-Api-Key': process.env.POKEMON_TCG_API_KEY ?? '',
          },
        }
      );

      return response.json();
    }),
});
