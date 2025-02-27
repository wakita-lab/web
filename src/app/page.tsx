'use client';

import ParticleBackground from '@/components/ParticleBackground';
import { useState } from 'react';
import { WORKS } from '@/constants/works';
import XCheckbox from '@/components/XCheckbox';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <ParticleBackground imagePath={WORKS[currentIndex].images[0]} />

      <main className="flex min-h-svh w-full flex-col items-center justify-between leading-loose tracking-tighter">
        <div className="flex w-full items-center justify-center gap-2 bg-white px-8 py-12 text-xl font-light">
          Akira Wakita Lab.
        </div>
        <div className="flex w-full justify-center gap-8 bg-white px-8 py-12 font-light">
          <div className="scrollbar-hidden flex max-w-full gap-8 overflow-x-scroll">
            {WORKS.map((work, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="flex items-center gap-2 text-nowrap p-0 tracking-tighter"
              >
                <XCheckbox selected={index === currentIndex} />
                {work.name.en}
              </button>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
