import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { NextRequest } from 'next/server';

import { trpcRouter } from '../../../../trpc/router/_root';
import { createTRPCContext } from '../../../../trpc/server/trpc-server-config';

const handler = (request: NextRequest) =>
  fetchRequestHandler({
    createContext: () => createTRPCContext({ req: request }),
    endpoint: '/api/trpc',
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ error, path }) => {
            console.error(
              `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
            );
          }
        : undefined,
    req: request,
    router: trpcRouter,
  });

export { handler as GET, handler as POST };
