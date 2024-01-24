import { Card } from "components/card";
import { TypographyH2 } from "components/typography/typography-h2";
import { TypographyP } from "components/typography/typography-p";
import { api } from "trpc/server/trpc-api";

export default async function HomePage() {
  const cardData = await api.netlify.onDemand.query();

  return (
    <div className="container relative">
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
          <ul className="flex flex-row flex-wrap gap-4">
            {cardData.data.map((card) => (
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
