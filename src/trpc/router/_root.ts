import { pokemonRouter } from './pokemon';
import { createTRPCRouter } from '../server/trpc-server-config';

export const trpcRouter = createTRPCRouter({
  pokemon: pokemonRouter,
});
