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

      <main className="flex min-h-svh w-full flex-col items-center justify-between font-light leading-loose tracking-tighter">
        <div className="flex w-full items-center justify-center bg-white px-6 py-12 text-lg md:gap-4 md:px-12">
          Akira Wakita Lab.
        </div>
        <div className="flex w-full items-center justify-center gap-2 bg-white px-6 py-12 md:gap-4 md:px-12">
          <XCheckbox selected />
          <div className="scrollbar-hidden flex max-w-full gap-4 overflow-x-scroll md:gap-8">
            {WORKS.map((work, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="flex items-center gap-2 text-nowrap px-2 tracking-tighter"
              >
                <XCheckbox selected={index === currentIndex} />
                {work.name.en}
              </button>
            ))}
          </div>
          <XCheckbox selected />
        </div>
      </main>
    </>
  );
}
