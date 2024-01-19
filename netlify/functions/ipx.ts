import { createIPXHandler } from '@netlify/ipx';

export const handler = createIPXHandler({
  maxAge: 31536000,
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.pokemontcg.io',
    },
  ],
});
