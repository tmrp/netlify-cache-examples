import { pokemonApi } from '@/lib/pokemon-api';
import { Card } from './_components/card';

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

export default async function Home({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const data = await GetPokemon(slug);

  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-6">
      <div className="max-w-5xl w-full font-mono text-sm">
        hello
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
      </div>
    </main>
  );
}
