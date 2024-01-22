import { Card } from '../../components/card';
import { PageWrapper } from '../../components/page-wrapper';
import { api } from '../../trpc/server/trpc-api';

interface PokemonCard {
  id: string;
  name: string;
  images: {
    large: string;
  };
}

async function GetPokemon(slug: string[]) {
  const getPokemons = slug?.map(
    async (slug) =>
      await api.pokemon.getPokemonCardsByName.query({ pokemonName: slug })
  );

  const results = getPokemons && (await Promise.allSettled(getPokemons));

  const fulFilledResults = results?.map((fulFilledResult) => {
    if (fulFilledResult?.status === 'fulfilled') {
      return fulFilledResult?.value;
    }
  });

  return fulFilledResults;
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
