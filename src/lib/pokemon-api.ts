interface PokemonApi {
  name: string;
}

export const pokemonApi = async ({ name }: PokemonApi) => {
  const response = await fetch(
    `https://api.pokemontcg.io/v2/cards?q=name:${name}`,
    {
      method: 'GET',
      headers: {
        'X-Api-Key': process.env.POKEMON_TCG_API_KEY ?? '',
      },
    }
  );

  return response.json();
};
