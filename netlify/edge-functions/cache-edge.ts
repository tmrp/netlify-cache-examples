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

  if (!path || path === '/') {
    return context.next();
  }

  const pathToKey = path
    .split('/')
    .filter((x) => x)
    .join(' ');

  const store = getStore(pathToKey);

  const dataBlob = await store.get(pathToKey);

  if (!dataBlob) {
    const dateTime = new Date().toUTCString();

    await store.set(pathToKey, html, { metadata: { timeStamp: dateTime } });

    return context.next();
  }

  const meta = await store.getMetadata(pathToKey);

  if (!meta?.metadata?.timeStamp) {
    await store.delete(pathToKey);

    return context.next();
  }

  const { timeStamp } = meta.metadata;

  const date = new Date(JSON.stringify(timeStamp));

  const now = new Date();

  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 1000 / 60);

  if (minutes > 15) {
    await store.delete(pathToKey);

    return context.next();
  }

  return new Response(dataBlob, {
    headers: {
      'content-type': 'text/html',
      'x-data-source': 'Netlify-Blob',
      'x-blob-age': `${minutes} minutes`,
    },
  });
}
