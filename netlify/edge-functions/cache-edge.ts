import { getStore } from '@netlify/blobs';
import type { Config, Context } from '@netlify/edge-functions';

export const config: Config = {
  path: '/*',
  excludedPath: ['/.netlify/functions/*', '/_next/*'],
};

export default async function CacheEdge(req: Request, context: Context) {
  console.log('CacheEdge function called', req, context);
  const store = getStore('pokemon');

  console.log('Store', store);
  return context.next();
}
