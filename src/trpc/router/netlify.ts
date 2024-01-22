import { z } from 'zod';

import {
  createTRPCRouter,
  publicProcedure,
} from '../server/trpc-server-config';
import { getStore } from '@netlify/blobs';

export const netlifyRouter = createTRPCRouter({
  getCachedBlobs: publicProcedure.query(async ({ ctx }) => {
    const blobStore = getStore({
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_ACCESS_TOKEN,
    }).list();

    return blobStore;
  }),
});
