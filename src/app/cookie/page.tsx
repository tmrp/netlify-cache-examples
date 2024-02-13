import { CardGrid } from "components/card-grid";
import { ToggleCacheCookie } from "components/toggle-cache-cookie";

import { TypographyH2 } from "components/typography/typography-h2";
import { TypographyP } from "components/typography/typography-p";
import { getCookie } from "server/actions/cookie";
import { api } from "server/trpc/server/trpc-api";

const POKEMON_CACHE_KEY = "PokeCache";
const DEFAULT_CACHE_VALUE = "foo";

export default async function VariedPage() {
  const cards = await api.pokemon.getRandomPokemonCardsByType.query({
    headers: {
      "Cache-Control": "public, max-age=300",
      "Netlify-CDN-Cache-Control": "public, max-age=300",
      "Netlify-Vary": "cookie=PokeCache",
    },
  });

  const cacheCookie = await api.next.getCookie.query({
    key: POKEMON_CACHE_KEY,
  });

  if (!cacheCookie) {
    await api.next.setCookie.mutate({
      key: POKEMON_CACHE_KEY,
      value: DEFAULT_CACHE_VALUE,
    });
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
