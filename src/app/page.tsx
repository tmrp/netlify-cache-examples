import { CardGrid } from "components/card-grid";

import { PokeMonCardSearch } from "components/pokemon-card-search";
import { TypographyH2 } from "components/typography/typography-h2";
import { TypographyP } from "components/typography/typography-p";
import { api } from "server/trpc/server/trpc-api";

export default async function HomePage() {
  const cardData = await api.netlify.onDemand.query();

  return (
    <div className="container relative">
      <div className="flex flex-col gap-4">
        <section className="flex flex-col gap-5">
          <PokeMonCardSearch />
        </section>
        {cardData && (
          <div className="rounded-md bg-blue-200 p-2">
            <div>
              <TypographyH2>
                This response has been made with a Netlify On Demand builder
                function
              </TypographyH2>
              <TypographyP>
                This data was generated on {cardData.timeStamp}
              </TypographyP>
            </div>
            <CardGrid cards={cardData.data} />
          </div>
        )}
      </div>
    </div>
  );
}
