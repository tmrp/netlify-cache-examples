import { createTRPCClient, httpBatchLink, loggerLink } from '@trpc/client';

import { headers } from 'next/headers';
import { trpcRouter } from '../types';
import { getUrl } from '../utils/get-url';
import { transformer } from '../utils/transformer';

export const api = createTRPCClient<trpcRouter>({
  links: [
    loggerLink({
      enabled: (op) =>
        process.env.NODE_ENV === 'development' ||
        (op.direction === 'down' && op.result instanceof Error),
    }),
    httpBatchLink({
      headers() {
        const heads = new Map(headers());
        heads.set('x-trpc-source', 'react');
        return Object.fromEntries(heads);
      },
      url: getUrl(),
    }),
  ],
  transformer,
});
