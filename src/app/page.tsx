import Link from 'next/link';
import Image from 'next/image';
import { WORKS } from '@/constants/works';
import { getTagColor } from '@/constants/tags';

const TransformMatrixes = [
  [1, 0.1, 0.2, 1, 0, 0],
  [1, -0.4, -0.6, 1, 0, 0],
  [1, -0.8, 0.2, 1, 0, 0],
  [1, -1.2, 0.8, 1, 0, 0],
  [1, -0.6, -0.4, 1, 0, 0],
];

export default function Home() {
  return (
    <div className="mx-auto mb-24 mt-16 grid w-full max-w-screen-xl grid-cols-1 gap-12 px-12 sm:gap-8 sm:gap-y-16 sm:px-24 md:grid-cols-2 xl:grid-cols-3 3xl:max-w-[1680px] 3xl:grid-cols-4">
      {WORKS.map((work, index) => {
        const transformMatrix = TransformMatrixes[index % 5];
        const transformStyle = `matrix(${transformMatrix.join(',')})`;

        const lines = work.tags.flatMap(tag => {
          const tagColor = getTagColor(tag);

          return Array(3).fill(0).map(() => {
            const angle = Math.random() * Math.PI * 2;
            const endX = Math.cos(angle) * 10000;
            const endY = Math.sin(angle) * 10000;

            return {
              endX,
              endY,
              strokeColor: tagColor,
              tag,
            };
          });
        });

        return (
          <Link
            key={work.id}
            href={`/works/${work.id}`}
            className="group relative z-0 flex flex-col gap-1"
          >
            <svg
              className="pointer-events-none absolute size-full overflow-visible"
            >
              {lines.map((line, lineIndex) => (
                <line
                  key={lineIndex}
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${line.endX}px)`}
                  y2={`calc(50% + ${line.endY}px)`}
                  stroke={line.strokeColor}
                  strokeWidth={1}
                />
              ))}
            </svg>
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className="absolute left-48 top-8 -z-40 aspect-[9/20] object-cover"
              style={{ transform: transformStyle }}
            />
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className="absolute left-32 top-6 -z-30 aspect-[9/20] object-cover"
              style={{ transform: transformStyle }}
            />
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className="absolute left-20 top-4 -z-30 aspect-[9/20] object-cover"
              style={{ transform: transformStyle }}
            />
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className="absolute left-8 top-2 -z-30 aspect-[9/20] object-cover"
              style={{ transform: transformStyle }}
            />
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className="-z-30 aspect-[9/20] object-cover"
              style={{ transform: transformStyle }}
            />
            <div className="absolute inset-y-0 z-20 m-auto flex h-fit w-full">
              <div className="flex min-w-2 flex-col">
                {work.tags.map((tag, index) => (
                  <div key={index} className="grow" style={
                    { backgroundColor: getTagColor(tag) }
                  } />
                ))}
              </div>
              <div className="grow overflow-hidden text-nowrap bg-neutral-50 pt-[0.2em] leading-4">
                {work.title.en}
              </div>
            </div>
          </Link>
        );
      })}

      {/* <time className="sticky bottom-24 right-16 tabular-nums">
        2024
      </time> */}
    </div>
  );
}
