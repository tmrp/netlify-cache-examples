import { Card } from "./card";

interface Props {
  cards: {
    id: string;
    images: {
      small: string;
    };
    name: string;
  }[];
}

export function CardGrid({ cards }: Props) {
  return (
    <ul className="grid grid-cols-1 gap-4 xxs:grid-cols-2 xs:grid-cols-3 sm:grid-cols-4">
      {cards?.map((card) => (
        <li key={card.id}>
          <Card
            imageSrc={card.images.small}
            imageAlt={`${card.name} illustrated playing card`}
          />
        </li>
      ))}
    </ul>
  );
}
