import Link from 'next/link';
import Image from 'next/image';
import { WORKS } from '@/constants/works';

export default function WorksPage() {
  return (
    <div className="m-auto grid w-full max-w-screen-xl grid-cols-1 gap-12 px-12 pb-24 sm:grid-cols-2 sm:gap-8 sm:px-24 lg:grid-cols-3">
      {WORKS.map((work) => (
        <Link
          key={work.id}
          href={`/works/${work.id}`}
          className="relative flex flex-col gap-1 transition-opacity hover:opacity-80"
        >
          <Image
            src={work.images[0]}
            alt={work.title.en}
            width={512}
            height={512}
            className="aspect-[9/20] object-cover"
          />
          <div className="w-full overflow-hidden text-nowrap bg-white">
            <h2 className="text-base">
              {work.title.en}
            </h2>
          </div>
        </Link>
      ))}

      {/* <time className="sticky bottom-24 right-16 w-16 tabular-nums">
        2024
      </time> */}
    </div>
  );
}