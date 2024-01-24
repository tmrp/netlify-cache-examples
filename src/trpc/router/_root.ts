import { pokemonRouter } from "./pokemon";
import { createTRPCRouter } from "../server/trpc-server-config";
import { netlifyRouter } from "./netlify";

export const trpcRouter = createTRPCRouter({
  netlify: netlifyRouter,
  pokemon: pokemonRouter,
});
