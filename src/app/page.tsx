'use client';

import Link from 'next/link';
import Image from 'next/image';
import { WORKS } from '@/constants/works';
import { getTagColor } from '@/constants/tags';
import { createRef } from 'react';
import CategoryLines from '@/components/CategoryLines';


export default function Home() {
  // Array to hold references to DOM elements for each work
  const workRefs = WORKS.map(() => createRef<HTMLDivElement>());

  return (
    <div className="relative m-auto mt-16 grid w-full max-w-screen-xl grid-cols-1 gap-12 px-12 pb-24 sm:gap-8 sm:gap-y-16 sm:px-24 md:grid-cols-2 xl:grid-cols-3 3xl:max-w-[1680px] 3xl:grid-cols-4">
      {/* Component for drawing lines */}
      <CategoryLines workRefs={workRefs} works={WORKS} />
      {WORKS.map((work, index) => {
        const matrixIndex = index % 5 + 1;
        const animationClass =
          matrixIndex === 1
            ? 'animate-matrix-1'
            : matrixIndex === 2
              ? 'animate-matrix-2'
              : matrixIndex === 3
                ? 'animate-matrix-3'
                : matrixIndex === 4
                  ? 'animate-matrix-4'
                  : 'animate-matrix-5';

        return (
          <Link
            key={work.id}
            href={`/works/${work.id}`}
            className="group relative z-0 flex flex-col gap-1"
          >
            <div ref={workRefs[index]} className="absolute inset-0 z-0">
              {/* Element for position reference */}
            </div>
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className={`absolute left-48 top-8 -z-40 aspect-[9/20] object-cover opacity-15 ${animationClass}`}
            />
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className={`absolute left-32 top-6 -z-30 aspect-[9/20] object-cover opacity-30 ${animationClass}`}
            />
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className={`absolute left-20 top-4 -z-30 aspect-[9/20] object-cover opacity-45 ${animationClass}`}
            />
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className={`absolute left-8 top-2 -z-30 aspect-[9/20] object-cover opacity-70 ${animationClass}`}
            />
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className={`-z-30 aspect-[9/20] object-cover ${animationClass}`}
            /> {/* $0 */ }
            <div className="absolute inset-y-0 z-20 m-auto flex h-fit w-full">
              <div className="flex min-w-2 flex-col">
                {work.tags.map((tag, index) => (
                  <div key={index} className="grow" style={
                    { backgroundColor: getTagColor(tag) }
                  } />
                ))}
              </div>
              <div className="grow overflow-hidden text-nowrap bg-neutral-50 leading-4"> {/* $1 */ }
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
