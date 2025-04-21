'use client';

import Link from 'next/link';
import Image from 'next/image';
import { WORKS, Tag } from '@/constants/works';
import { getTagColor } from '@/constants/tags';
import React, { useRef, useEffect, useState, createRef } from 'react';

const TransformMatrixes = [
  [1, 0.1, 0.2, 1, 0, 0],
  [1, -0.4, -0.6, 1, 0, 0],
  [1, -0.8, 0.2, 1, 0, 0],
  [1, -1.2, 0.8, 1, 0, 0],
  [1, -0.6, -0.4, 1, 0, 0],
];

// 線を描画するためのコンポーネント
type CategoryLinesProps = {
  workRefs: React.RefObject<HTMLDivElement | null>[];
  works: typeof WORKS;
};

function CategoryLines({ workRefs, works }: CategoryLinesProps) {
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number; tag: Tag }[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // 画面サイズが変わったときに線を再計算
    const handleResize = () => {
      calculateLines();
    };

    window.addEventListener('resize', handleResize);

    // 初回レンダリング時と要素の位置が変わったときに線を計算
    calculateLines();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workRefs, works]);

  const calculateLines = () => {
    if (!svgRef.current) return;

    // SVGの位置を取得
    const svgRect = svgRef.current.getBoundingClientRect();
    const svgOffsetX = svgRect.left;
    const svgOffsetY = svgRect.top;

    // 全てのタグを取得
    const allTags = Array.from(new Set(works.flatMap(work => work.tags)));

    const newLines: { x1: number; y1: number; x2: number; y2: number; tag: Tag }[] = [];

    // 有効なタグとそのタグを持つ作品のインデックスを収集
    const validTags: { tag: Tag; workIndices: number[] }[] = [];

    allTags.forEach(tag => {
      // そのタグを持つ作品のインデックスを取得
      const workIndicesWithTag = works
        .map((work, index) => ({ work, index }))
        .filter(({ work }) => work.tags.includes(tag))
        .map(({ index }) => index);

      // 2つ以上の作品がそのタグを持っている場合のみ有効
      if (workIndicesWithTag.length >= 2) {
        validTags.push({ tag, workIndices: workIndicesWithTag });
      }
    });

    // 有効なタグがない場合は終了
    if (validTags.length === 0) {
      setLines([]);
      return;
    }

    // 合計で100本の線を引く
    const totalLinesToDraw = 100;

    // 各タグに均等に線を割り当てる
    const linesPerTag = Math.floor(totalLinesToDraw / validTags.length);
    let remainingLines = totalLinesToDraw - (linesPerTag * validTags.length);

    // 各タグに線を割り当てる
    for (let i = 0; i < validTags.length && newLines.length < totalLinesToDraw; i++) {
      const { tag, workIndices } = validTags[i];

      // このタグに割り当てる線の数
      let linesToDrawForTag = linesPerTag;

      // 残りの線を割り当てる
      if (remainingLines > 0) {
        linesToDrawForTag++;
        remainingLines--;
      }

      // このタグの線を描画
      for (let j = 0; j < linesToDrawForTag && newLines.length < totalLinesToDraw; j++) {
        // ランダムに2つの異なるインデックスを選択
        const idx1 = Math.floor(Math.random() * workIndices.length);
        let idx2 = Math.floor(Math.random() * workIndices.length);

        // 同じインデックスを選ばないようにする
        while (idx2 === idx1) {
          idx2 = Math.floor(Math.random() * workIndices.length);
        }

        const index1 = workIndices[idx1];
        const index2 = workIndices[idx2];

        const ref1 = workRefs[index1];
        const ref2 = workRefs[index2];

        if (ref1.current && ref2.current) {
          const rect1 = ref1.current.getBoundingClientRect();
          const rect2 = ref2.current.getBoundingClientRect();

          // 作品の中心座標を計算
          const x1 = rect1.left + rect1.width / 2 - svgOffsetX;
          const y1 = rect1.top + rect1.height / 2 - svgOffsetY;
          const x2 = rect2.left + rect2.width / 2 - svgOffsetX;
          const y2 = rect2.top + rect2.height / 2 - svgOffsetY;

          newLines.push({ x1, y1, x2, y2, tag });
        }
      }
    }

    setLines(newLines);
  };

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute left-0 top-0 z-10 size-full"
      style={{ minHeight: '100vh' }}
    >
      {lines.map((line, index) => (
        <line
          key={index}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke={getTagColor(line.tag)}
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

export default function Home() {
  // 各作品のDOM要素への参照を保持する配列
  const workRefs = WORKS.map(() => createRef<HTMLDivElement>());

  return (
    <div className="relative m-auto mt-16 grid w-full max-w-screen-xl grid-cols-1 gap-12 px-12 pb-24 sm:gap-8 sm:gap-y-16 sm:px-24 md:grid-cols-2 xl:grid-cols-3 3xl:max-w-[1680px] 3xl:grid-cols-4">
      {/* 線を描画するコンポーネント */}
      <CategoryLines workRefs={workRefs} works={WORKS} />
      {WORKS.map((work, index) => {
        const transformMatrix = TransformMatrixes[index % 5];
        const transformStyle = `matrix(${transformMatrix.join(',')})`;

        return (
          <Link
            key={work.id}
            href={`/works/${work.id}`}
            className="group relative z-0 flex flex-col gap-1"
          >
            <div ref={workRefs[index]} className="absolute inset-0 z-0">
              {/* 位置参照用の要素 */}
            </div>
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
