import Image from 'next/image';

export default function Header({ name, image }: { name: string; image: string }) {
  return (
    <div className="flex gap-8 items-center justify-center">
      <Image
        src={image}
        alt={`${name}'s profile picture`}
        width={64}
        height={64}
        className="rounded-full"
      />
      <span className="font-bold text-2xl text-nowrap overflow-hidden text-ellipsis">{name}</span>
    </div>
  );
}
