import Link from 'next/link';
import Image from 'next/image';
import { WORKS } from '@/constants/works';

const TransformMatrixes = [
  [1, 0.1, 0.2, 1, 0, 0],
  [1, -0.4, -0.6, 1, 0, 0],
  [1, -0.8, 0.2, 1, 0, 0],
  [1, -1.2, 0.8, 1, 0, 0],
  [1, -0.6, -0.4, 1, 0, 0],
];

export default function WorksPage() {
  return (
    <div className="m-auto grid w-full max-w-screen-xl grid-cols-1 gap-12 px-12 pb-24 sm:grid-cols-2 sm:gap-8 sm:px-24 lg:grid-cols-3">
      {WORKS.map((work, index) => {
        const transformMatrix = TransformMatrixes[index % 5];
        const transformStyle = `matrix(${transformMatrix.join(',')})`;

        return (
          <Link
            key={work.id}
            href={`/works/${work.id}`}
            className="group relative -z-50 flex flex-col gap-1"
          >
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className="aspect-[9/20] object-cover transition-transform hover:transform-none"
              style={{ transform: transformStyle }}
            />
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className="absolute left-8 top-2 -z-10 aspect-[9/20] object-cover transition-transform hover:transform-none"
              style={{ transform: transformStyle }}
            />
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className="absolute left-20 top-4 -z-20 aspect-[9/20] object-cover transition-transform hover:transform-none"
              style={{ transform: transformStyle }}
            />
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className="absolute left-32 top-6 -z-30 aspect-[9/20] object-cover transition-transform hover:transform-none"
              style={{ transform: transformStyle }}
            />
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className="absolute left-48 top-8 -z-40 aspect-[9/20] object-cover transition-transform hover:transform-none"
              style={{ transform: transformStyle }}
            />
            <div className="absolute z-20 w-full translate-y-96 overflow-hidden text-nowrap bg-white group-hover:z-50 group-hover:w-auto group-hover:min-w-full group-hover:overflow-visible group-hover:pr-4">
              {work.title.en}
            </div>
          </Link>
        );
      })}

      {/* <time className="sticky bottom-24 right-16 w-16 tabular-nums">
        2024
      </time> */}
    </div>
  );
}