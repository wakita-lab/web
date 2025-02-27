'use client';

import ParticleBackground from '@/components/ParticleBackground';
import { useState } from 'react';
import { WORKS } from '@/constants/works';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <ParticleBackground imagePath={WORKS[currentIndex].images[0]} />

      <main className="flex min-h-svh w-full flex-col items-center justify-between leading-loose tracking-tighter">
        <div className="flex w-full items-center justify-center gap-2 bg-white p-8 text-xl font-light">
          Akira Wakita Lab.
        </div>
        <div className="flex w-full justify-center gap-8 bg-white p-8 font-light">
          <div className="scrollbar-hidden flex max-w-full gap-8 overflow-x-scroll">
            {WORKS.map((work, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="flex items-center gap-2 text-nowrap p-0 tracking-tighter"
              >
                <div>
                  <svg width="16" height="16" stroke="currentColor" fill="none" strokeWidth={1} viewBox="0 0 16 16">
                    <path d="M2 2 L14 2 L14 14L2 14Z" />
                    {index === currentIndex && (
                      <path d="M2 2 L14 14 M14 2L2 14Z" />
                    )}
                  </svg>
                </div>
                {work.name}
              </button>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
