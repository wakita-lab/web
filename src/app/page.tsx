import Link from 'next/link';
import Image from 'next/image';
import { WORKS } from '@/constants/works';
import { getTagColor, getTagName } from '@/constants/tags';

const TransformMatrixes = [
  [1, 0.1, 0.2, 1, 0, 0],
  [1, -0.4, -0.6, 1, 0, 0],
  [1, -0.8, 0.2, 1, 0, 0],
  [1, -1.2, 0.8, 1, 0, 0],
  [1, -0.6, -0.4, 1, 0, 0],
];

export default function Home() {
  return (
    <div className="m-auto grid w-full max-w-screen-xl grid-cols-1 gap-12 px-12 pb-24 sm:grid-cols-2 sm:gap-8 sm:px-24 lg:grid-cols-3">
      {WORKS.map((work, index) => {
        const transformMatrix = TransformMatrixes[index % 5];
        const transformStyle = `matrix(${transformMatrix.join(',')})`;

        // タグごとに3本の線を生成
        const lines = work.tags.flatMap(tag => {
          const tagColor = getTagColor(tag);

          return Array(1).fill(0).map(() => {
            const randomAngle = Math.floor(Math.random() * 360);
            const angleInRadians = (randomAngle * Math.PI) / 180;
            const endX = Math.cos(angleInRadians) * 10000;
            const endY = Math.sin(angleInRadians) * 10000;

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
            {/* タグごとに3本ずつランダムな方向に伸びる直線 */}
            <svg
              className="pointer-events-none absolute left-0 top-0 size-full overflow-visible"
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
              className="aspect-[9/20] w-12 object-cover"
              style={{ transform: transformStyle }}
            />
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className="absolute left-14 top-2 -z-10 aspect-[9/20] w-12 object-cover"
              style={{ transform: transformStyle }}
            />
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className="absolute left-32 top-4 -z-20 aspect-[9/20] w-12 object-cover"
              style={{ transform: transformStyle }}
            />
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className="absolute left-52 top-6 -z-30 aspect-[9/20] w-12 object-cover"
              style={{ transform: transformStyle }}
            />
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className="absolute left-72 top-8 -z-40 aspect-[9/20] w-12 object-cover"
              style={{ transform: transformStyle }}
            />
            <div className="absolute top-1/2 z-20 flex w-full flex-col">
              <div className="overflow-hidden text-nowrap bg-neutral-50 leading-5">
                {work.title.en}
              </div>
              <div className="flex h-1 bg-current" />
              <div className="flex h-4 ">
                {work.tags.map((tag, index) => (
                  <div key={index} className="grow overflow-hidden pl-0.5 text-xs leading-4 text-transparent group-hover:text-white" style={
                    { backgroundColor: getTagColor(tag) }
                  } >
                    {getTagName(tag, 'en')}
                  </div>
                ))}
              </div>
            </div>
          </Link>
        );
      })}

      {/* <time className="sticky bottom-24 right-16 w-12 tabular-nums">
        2024
      </time> */}
    </div>
  );
}
