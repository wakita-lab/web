import Link from 'next/link';
import Image from 'next/image';
import { WORKS } from '@/constants/works';

export default function WorksPage() {
  return (
    <div className="m-auto flex max-w-7xl items-end gap-4 p-4 pb-24">
      <div className="grid w-full grid-cols-1 gap-px sm:grid-cols-2 md:grid-cols-3">
        {WORKS.map((work) => (
          <Link
            key={work.id}
            href={`/works/${work.id}`}
            className="relative block aspect-square overflow-hidden transition-opacity hover:opacity-80"
          >
            <Image
              src={work.images[0]}
              alt={work.title.ja}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-white py-2 pr-16">
              <h2 className="text-sm uppercase">{work.title.en}</h2>
            </div>
          </Link>
        ))}
      </div>
      <time className="sticky bottom-24 tabular-nums leading-none">
        2024
      </time>
    </div>
  );
}