import Link from 'next/link';
import Image from 'next/image';
import { WORKS } from '@/constants/works';

export default function WorksPage() {
  return (
    <div className="m-auto grid w-full max-w-screen-xl grid-cols-1 gap-12 px-12 pb-24 sm:grid-cols-2 sm:gap-8 sm:px-24 lg:grid-cols-3">
      {WORKS.map((work, index) => (
        <Link
          key={work.id}
          href={`/works/${work.id}`}
          className="group relative flex flex-col gap-1"
        >
          <Image
            src={work.images[0]}
            alt={work.title.en}
            width={512}
            height={512}
            className="aspect-[9/20] object-cover transition-transform group-hover:transform-none"
            style={{
              transform:
                index % 5 === 0 ? 'matrix(1, 0.1, 0.2, 1, 0, 0)' :
                  index % 5 === 1
                    ? 'matrix(1, -0.4, -0.6, 1, 0, 0)'
                    : index % 5 === 2
                      ? 'matrix(1, -0.8, 0.2, 1, 0, 0)'
                      : index % 5 === 3
                        ? 'matrix(1, -1.2, 0.8, 1, 0, 0)'
                        : 'matrix(1, -0.6, -0.4, 1, 0, 0)',
            }}
          />
          <div className="z-20 w-full -translate-y-96 overflow-hidden text-nowrap bg-white">
            {work.title.en}
          </div>
        </Link>
      ))}

      {/* <time className="sticky bottom-24 right-16 w-16 tabular-nums">
        2024
      </time> */}
    </div>
  );
}