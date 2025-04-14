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
    <div className="m-auto grid w-full max-w-screen-xl grid-cols-1 gap-12 px-12 pb-24 sm:grid-cols-2 sm:gap-8 sm:px-24 lg:grid-cols-3">
      {WORKS.map((work, index) => {
        const transformMatrix = TransformMatrixes[index % 5];
        const transformStyle = `matrix(${transformMatrix.join(',')})`;

        // タグごとに3本の線を生成
        const lines = work.tags.flatMap(tag => {
          // タグの色を取得
          const tagColor = getTagColor(tag);

          // 各タグにつき3本の線を生成
          return Array(1).fill(0).map(() => {
            // 直線の角度をランダムに生成（0〜360度）
            const randomAngle = Math.floor(Math.random() * 360);
            // 角度からラジアンに変換
            const angleInRadians = (randomAngle * Math.PI) / 180;
            // 直線の終点座標を計算（長さ10000px）
            const endX = Math.cos(angleInRadians) * 10000;
            const endY = Math.sin(angleInRadians) * 10000;

            return {
              endX,
              endY,
              strokeColor: tagColor,
              tag, // タグ情報も保持
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
              className="aspect-[9/20] object-cover"
              style={{ transform: transformStyle }}
            />
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className="absolute left-8 top-2 -z-10 aspect-[9/20] object-cover"
              style={{ transform: transformStyle }}
            />
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className="absolute left-20 top-4 -z-20 aspect-[9/20] object-cover"
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
              className="absolute left-48 top-8 -z-40 aspect-[9/20] object-cover"
              style={{ transform: transformStyle }}
            />
            <div className="absolute z-20 w-full translate-y-96 overflow-hidden text-nowrap bg-white">
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
