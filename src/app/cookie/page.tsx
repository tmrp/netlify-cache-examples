import { CardGrid } from "components/card-grid";
import { ToggleCacheCookie } from "components/toggle-cache-cookie";

import { TypographyH2 } from "components/typography/typography-h2";
import { TypographyP } from "components/typography/typography-p";
import { api } from "server/trpc/server/trpc-api";

const POKEMON_CACHE_KEY = "PokeCache";
const DEFAULT_CACHE_VALUE = "foo";

export default async function VariedPage() {
  const cards = await api.pokemon.getRandomPokemonCardsByType.query();
  const cacheCookie = await api.next.getCookie.query({ key: "PokeCache" });
  const setCookie = await api.next.setCookie.mutate({
    key: POKEMON_CACHE_KEY,
    value: DEFAULT_CACHE_VALUE,
  });

  if (!cacheCookie) {
    setCookie;
  }

  return (
    <div className="container relative">
      <div className="flex flex-col gap-4">
        <ToggleCacheCookie data={cacheCookie ?? DEFAULT_CACHE_VALUE} />
        {cards && (
          <div className="rounded-md bg-cyan-200 p-2">
            <div>
              <TypographyH2>
                This response has been made with a Netlify Edge Function
              </TypographyH2>
              <TypographyP>
                This data was generated on {cards.timeStamp}
              </TypographyP>
            </div>
            <CardGrid cards={cards.data} />
          </div>
        )}
      </div>
    </div>
  );
}
