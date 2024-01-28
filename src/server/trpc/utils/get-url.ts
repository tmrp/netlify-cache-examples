import superjson from 'superjson';

import { getBaseUrl } from './get-base-url';

export const transformer = superjson;

export function getUrl() {
  return getBaseUrl() + '/api/trpc';
}
