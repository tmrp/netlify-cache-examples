import { PageWrapper } from '../_components/page-wrapper';
import { Card } from '../_components/card';
import { pokemonApi } from '../../../lib/pokemon-api';

interface PokemonCard {
  id: string;
  name: string;
  images: {
    large: string;
  };
}

async function GetPokemon(slug: string[]) {
  const getPokemons = slug?.map((slug) => pokemonApi({ name: slug }));

  const results = getPokemons && (await Promise.allSettled(getPokemons));

  const fulfilledResults = results?.map((result) => {
    if (result.status !== 'fulfilled') {
      return result.reason;
    }

    return result.value;
  });

  return fulfilledResults;
}

export default async function PokemonPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const { slug } = params;
  const data = await GetPokemon(slug);

  return (
    <PageWrapper>
      <ul className="flex flex-row gap-4 w-full flex-wrap">
        {data?.map((pokemon) =>
          pokemon?.data?.map((pokemon: PokemonCard) => {
            return (
              <li key={pokemon.id} className="">
                <Card
                  imageSrc={pokemon.images.large}
                  imageAlt={`${pokemon.name} illustrated playing card`}
                />
              </li>
            );
          })
        )}
      </ul>
    </PageWrapper>
  );
}
