import { getStore } from '@netlify/blobs';
import type { Config, Context } from '@netlify/edge-functions';

export const config: Config = {
  path: '/*',
  excludedPath: ['/.netlify/functions/*', '/_next/*', '/favicon.ico'],
};

export default async function CacheEdge(req: Request, context: Context) {
  const response = await context.next();
  const html = await response.text();

  const path = new URL(req.url).pathname;

  const pathToKey = path
    .split('/')
    .filter((x) => x)
    .join(' ');

  const store = getStore(pathToKey);

  const check = await store.get(pathToKey);

  if (!check) {
    // Store the HTML in the blob store
    await store.set(pathToKey, html);

    return context.next();
  }

  const htmlBlob = await store.get(pathToKey);

  return new Response(htmlBlob, {
    headers: { 'content-type': 'text/html', 'x-data-source': 'Netlify-Blob' },
  });
}
