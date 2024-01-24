import Image from "next/image";

interface Props {
  imageSrc: string;
  imageAlt: string;
}

export const Card = ({ imageAlt, imageSrc }: Props) => {
  return (
    <div className="relative">
      <Image
        src={imageSrc}
        alt={imageAlt}
        width="0"
        height="0"
        sizes="100vw"
        className="w-full"
      />
    </div>
  );
};
