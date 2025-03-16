import Link from 'next/link';
import Image from 'next/image';
import { WORKS } from '@/constants/works';

export default function WorksPage() {
  return (
    <main className="grid grid-cols-2 gap-px p-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
      {WORKS.map((work) => (
        <Link
          key={work.id}
          href={`/works/${work.id}`}
          className="relative col-span-2 block aspect-square overflow-hidden transition-opacity hover:opacity-80"
        >
          <Image
            src={work.images[0]}
            alt={work.title.ja}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>
      ))}
    </main>
  );
}