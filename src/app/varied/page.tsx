import { Card } from "components/card";

import { TypographyH2 } from "components/typography/typography-h2";
import { TypographyP } from "components/typography/typography-p";
import { api } from "trpc/server/trpc-api";

export default async function VariedPage() {
  const cards = await api.pokemon.getRandomPokemonCardsByType.query();

  return (
    <div className="container relative">
      {cards && (
        <div className="rounded-md bg-pink-200 p-2">
          <div>
            <TypographyH2>
              This response has been made with a Netlify On Demand builder
              function
            </TypographyH2>
            <TypographyP>
              This data was generated on {cards.timeStamp}
            </TypographyP>
          </div>
          <ul className="flex flex-row flex-wrap gap-4">
            {cards.data.map((card) => (
              <li key={card.id}>
                <Card
                  imageSrc={card.images.small}
                  imageAlt={`${card.name} illustrated playing card`}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
