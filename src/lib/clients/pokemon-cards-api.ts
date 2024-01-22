import { z } from 'zod';

interface PokemonCardsApi {
  input: {
    name?: string;
  };
}

export const pokemonCardsApi = async ({ input }: PokemonCardsApi) => {
  const transformedInput = Object.entries(input);
  const inputString = transformedInput
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  const response = await fetch(
    `https://api.pokemontcg.io/v2/cards?${inputString}`,
    {
      method: 'GET',
      headers: {
        'X-Api-Key': process.env.POKEMON_TCG_API_KEY ?? '',
      },
    }
  );

  return response.json();
};
