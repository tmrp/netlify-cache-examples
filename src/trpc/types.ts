import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import type { trpcRouter } from './router/_root';

export type trpcRouter = typeof trpcRouter;

export type RouterInputs = inferRouterInputs<trpcRouter>;

export type RouterOutputs = inferRouterOutputs<trpcRouter>;
