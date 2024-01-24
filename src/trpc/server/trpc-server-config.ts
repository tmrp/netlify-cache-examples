import { initTRPC } from '@trpc/server';
import { type NextRequest } from 'next/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { netlifyBlobs } from '../../lib/clients/netlify-blobs';

const trpc = initTRPC.create();

export const router = trpc.router;

interface CreateContextOptions {
  headers: Headers;
}

export const createInnerTRPCContext = async (opts: CreateContextOptions) => {
  return {
    headers: opts.headers,
    netlifyBlobs: (storeName: string) => netlifyBlobs(storeName),
  };
};

export const createTRPCContext = async (opts: { req: NextRequest }) => {
  return await createInnerTRPCContext({
    headers: opts.req.headers,
  });
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  errorFormatter({ error, shape }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
  transformer: superjson,
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;
