import Link from 'next/link';
import Image from 'next/image';
import { WORKS } from '@/constants/works';

export default function WorksPage() {
  return (
    <div className="m-auto flex max-w-7xl items-end gap-4 p-4 pb-24">
      <div className="grid w-full grid-cols-1 gap-x-px gap-y-8 sm:grid-cols-2 md:grid-cols-3">
        {WORKS.map((work) => (
          <Link
            key={work.id}
            href={`/works/${work.id}`}
            className="relative flex flex-col transition-opacity hover:opacity-80"
          >
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={400}
              height={400}
              className="aspect-square object-cover"
            />
            <div className="bg-white py-2 pr-16">
              <h2 className="text-sm uppercase">{work.title.en}</h2>
            </div>
          </Link>
        ))}
      </div>
      <time className="sticky bottom-24 py-2 tabular-nums">
        2024
      </time>
    </div>
  );
}