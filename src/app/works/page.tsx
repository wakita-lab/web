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

        // 直線の角度をランダムに生成（0〜360度）
        const randomAngle = Math.floor(Math.random() * 360);
        // 角度からラジアンに変換
        const angleInRadians = (randomAngle * Math.PI) / 180;
        // 直線の終点座標を計算（長さ1000px）
        const endX = Math.cos(angleInRadians) * 10000;
        const endY = Math.sin(angleInRadians) * 10000;

        const strokeColor = [
          '#bbbb00',
          '#bb00bb',
          '#00bbbb',
          '#444444',
        ][Math.floor(Math.random() * 4)];

        return (
          <Link
            key={work.id}
            href={`/works/${work.id}`}
            className="group relative -z-50 flex flex-col gap-1"
          >
            {/* ランダムな方向に伸びる直線 */}
            <svg
              className="pointer-events-none absolute left-0 top-0 size-full overflow-visible"
            >
              <line
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${endX}px)`}
                y2={`calc(50% + ${endY}px)`}
                stroke={strokeColor}
                strokeWidth="1.5"
              />
              <line
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${endY}px)`}
                y2={`calc(50% + ${endX}px)`}
                stroke={strokeColor}
                strokeWidth="1.5"
              />
              <line
                x1="20%"
                y1="20%"
                x2={`calc(50% + ${endX}px)`}
                y2={`calc(50% + ${endY}px)`}
                stroke={strokeColor}
                strokeWidth="1.5"
              />
            </svg>
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