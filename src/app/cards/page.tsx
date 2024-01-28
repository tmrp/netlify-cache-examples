import { cn } from "lib/utils";
import { Card } from "../../components/card";
import { api } from "../../server/trpc/server/trpc-api";
import { PokeMonCardSearch } from "components/pokemon-card-search";
import { CardGrid } from "components/card-grid";
import { TypographyP } from "components/typography/typography-p";

interface PokemonCard {
  id: string;
  name: string;
  images: {
    large: string;
    small: string;
  };
}

export const dynamicParams = true;

const isBlobData = (blobData: boolean) => {
  if (!blobData) {
    return <span className="rounded-sm bg-blue-300 p-2">Fresh Response</span>;
  }

  return <span className="rounded-sm bg-red-300 p-2">Cached Response</span>;
};

async function GetPokemon(searchQuery: string) {
  if (!searchQuery) {
    return null;
  }

  const stringToArray = searchQuery?.split(" ");

  const getPokemons = stringToArray?.map(
    async (query) =>
      await api.pokemon.getPokemonCardsByName.query({
        pokemonName: query,
      }),
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
  searchParams,
}: {
  searchParams: {
    search?: string;
  };
}) {
  const search = searchParams?.search ?? "";

  const data = await GetPokemon(search);

  return (
    <div className="container relative">
      <div className="flex flex-col gap-4">
        <section className="flex flex-col gap-5">
          <PokeMonCardSearch />
        </section>

        {data?.map((pokemon, index) => {
          if (!pokemon?.data?.length) {
            return (
              <div key={index}>
                <TypographyP>
                  Use the search from to find pokemon cards.
                </TypographyP>
              </div>
            );
          }
          return (
            <div
              key={index}
              className={cn(
                "flex flex-col gap-4 rounded-md p-2",
                pokemon?.blobData ? "bg-green-300" : "bg-red-200",
              )}
            >
              <div className="flex w-max">{isBlobData(pokemon?.blobData)}</div>

              {pokemon?.blobData && pokemon?.metaData?.pokemonName && (
                <div>
                  BlobData for search input {pokemon?.metaData?.pokemonName} was
                  generated on {pokemon?.metaData?.timeStamp}
                </div>
              )}
              <CardGrid cards={pokemon?.data} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
