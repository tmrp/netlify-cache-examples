import { Card } from "components/card";

export default async function HomePage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/.netlify/builders/on-demand-builder`,
  );
  const { card } = await response.json();

  return (
    <div className="container relative">
      <h1>home</h1>
      <div>
        <ul className="flex flex-row flex-wrap gap-4">
          {card.data.map((card) => (
            <li key={card.id}>
              <Card
                imageSrc={card.images.small}
                imageAlt={`${card.name} illustrated playing card`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
