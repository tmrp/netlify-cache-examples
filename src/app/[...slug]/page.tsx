import { cn } from "lib/utils";
import { Card } from "../../components/card";

import { api } from "../../trpc/server/trpc-api";

interface PokemonCard {
  id: string;
  name: string;
  images: {
    large: string;
    small: string;
  };
}

const isBlobData = (blobData: boolean) => {
  if (!blobData) {
    return <span className="rounded-sm bg-blue-300 p-2">Fresh Response</span>;
  }

  return <span className="rounded-sm bg-red-300 p-2">Cached Response</span>;
};

async function GetPokemon(slug: string[]) {
  const getPokemons = slug?.map(
    async (slug) =>
      await api.pokemon.getPokemonCardsByName.query({ pokemonName: slug }),
  );

  const results = getPokemons && (await Promise.allSettled(getPokemons));

  const fulFilledResults = results?.map((fulFilledResult) => {
    if (fulFilledResult?.status === "fulfilled") {
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
    <div className="container relative">
      <div className="flex flex-col gap-5">
        {data?.map((pokemon, index) => (
          <div
            key={index}
            className={cn(
              "flex w-full flex-row flex-wrap gap-4 rounded-md p-2",
              pokemon.blobData ? "bg-green-300" : "bg-red-200",
            )}
          >
            {isBlobData(pokemon.blobData)}
            <ul className={cn("flex w-full flex-row flex-wrap gap-4")}>
              {pokemon?.data?.map((pokemon: PokemonCard) => (
                <li key={pokemon.id} className="">
                  <Card
                    imageSrc={pokemon.images.small}
                    imageAlt={`${pokemon.name} illustrated playing card`}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
