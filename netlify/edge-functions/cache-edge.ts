import { getStore } from '@netlify/blobs';
import type { Config, Context } from '@netlify/edge-functions';

export const config: Config = {
  path: '/*',
  excludedPath: [
    '/.netlify/functions/*',
    '/_ipx/*',
    '/_next/*',
    '/favicon.ico',
  ],
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

  const hasBlob = await store.get(pathToKey);

  if (!hasBlob) {
    const dateTime = new Date().toUTCString();

    await store.set(pathToKey, html, { metadata: { timeStamp: dateTime } });

    return context.next();
  }

  const htmlBlob = await store.get(pathToKey);

  const meta = await store.getMetadata(pathToKey);

  if (!meta?.metadata?.timeStamp) {
    store.delete(pathToKey);

    return context.next();
  }

  const { timeStamp } = meta.metadata;

  const date = new Date(JSON.stringify(timeStamp));

  const now = new Date();

  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 1000 / 60);

  if (minutes > 15) {
    store.delete(pathToKey);

    return context.next();
  }

  return new Response(htmlBlob, {
    headers: { 'content-type': 'text/html', 'x-data-source': 'Netlify-Blob' },
  });
}
