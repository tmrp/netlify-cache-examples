import { getStore } from '@netlify/blobs';

import { pokemonApi } from './clients/pokemon-api';

interface Props {
  pokemonName: string;
}

const store = getStore({
  name: 'pokemon-store',
  siteID: process.env.NETLIFY_SITE_ID,
  token: process.env.NETLIFY_ACCESS_TOKEN,
});

export const getPokemon = async ({ pokemonName }: Props) => {
  // first, check if we have a cached version of this pokemon with the name trhough a Netlify Builder function.
  if (!(await store.get(pokemonName))) {
    const freshResponse = await pokemonApi({ name: pokemonName });

    console.log('response is fresh for pokemon', pokemonName);

    await store.setJSON(pokemonName, freshResponse, {
      metadata: { timeStamp: new Date().toUTCString() },
    });

    return freshResponse;
  }

  const cachedResponse = await store.get(pokemonName, { type: 'json' });

  // if we do not have a cached version, then we will fetch the pokemon from the Pokemon TCG API.
  return cachedResponse;
  // we will then set the cache for this pokemon with the name through a Netlify Builder function.

  // if we do have a cached version, then we will return the cached version.
};
