import { pokemonRouter } from "./pokemon";
import { createTRPCRouter } from "../server/trpc-server-config";
import { netlifyRouter } from "./netlify";
import { nextRouter } from "./next";

export const trpcRouter = createTRPCRouter({
  netlify: netlifyRouter,
  next: nextRouter,
  pokemon: pokemonRouter,
});
