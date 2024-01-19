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
  const trimSlash = path.replace(/^\/|\/$/g, '');

  console.log('Some_Path', trimSlash);

  const store = getStore(trimSlash);

  const check = await store.get(trimSlash);

  if (!check) {
    // Store the HTML in the blob store
    await store.set(trimSlash, html);

    return context.next();
  }

  const htmlBlob = await store.get(trimSlash);

  return new Response(htmlBlob, {
    headers: { 'content-type': 'text/html', 'x-data-source': 'Netlify-Blob' },
  });
}
