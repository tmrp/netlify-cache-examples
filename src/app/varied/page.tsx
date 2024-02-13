import { CardGrid } from "components/card-grid";

import { ToggleVariedValue } from "components/toggle-varied-value";

import { TypographyH2 } from "components/typography/typography-h2";
import { TypographyP } from "components/typography/typography-p";
import { api } from "server/trpc/server/trpc-api";

export default async function VariedPage() {
  const cards = await api.pokemon.getRandomPokemonCardsByType.query();

  return (
    <div className="container relative">
      <div className="flex flex-col gap-4">
        <ToggleVariedValue />
        {cards && (
          <div className="rounded-md bg-pink-200 p-2">
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
