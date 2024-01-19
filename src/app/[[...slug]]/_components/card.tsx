import Image from 'next/image';

interface Props {
  imageSrc: string;
  imageAlt: string;
}

export const Card = ({ imageSrc, imageAlt }: Props) => {
  return (
    <div className="relative w-60 h-80">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="100vw"
        objectFit="contain"
        quality={100}
      />
    </div>
  );
};
