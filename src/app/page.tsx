'use client';

import ParticleBackground from '@/components/ParticleBackground';
import { useCallback, useRef, useState } from 'react';

import { WORKS } from '@/constants/works';
import WorkSelector from '@/components/WorkSelector';

const workHeight = 1000;

export default function Home() {
  const [scrollAmount, setScrollAmount] = useState(0);
  const [particleSpeed] = useState(0.015);

  const scrollFieldRef = useRef<HTMLDivElement>(null);
  const scrollFieldHeight = scrollFieldRef.current?.clientHeight || 0;

  const handleWorkSelectorClick = useCallback((index: number) => {
    if (!scrollFieldRef.current) return;

    const newScrollAmount = (index + 0.5) * workHeight;

    scrollFieldRef.current.scrollTop = newScrollAmount;
    setScrollAmount(newScrollAmount);
  }, []);

  const currentIndex = Math.min(Math.trunc(scrollAmount / workHeight), WORKS.length - 1);

  return (
    <>
      <ParticleBackground imagePath={WORKS[currentIndex].images[0]} particleSpeed={particleSpeed} />

      <main className="fixed flex h-svh w-full flex-col items-center justify-between font-light leading-loose tracking-tighter">
        <div className="flex w-full items-center justify-center bg-white py-12 text-lg">
          Akira Wakita Lab.
        </div>
        <div
          ref={scrollFieldRef}
          className="scrollbar-hidden w-full grow overflow-y-scroll"
          onScroll={(event) => setScrollAmount(event.currentTarget.scrollTop)}
        >
          <div style={{height: WORKS.length * workHeight + scrollFieldHeight}}></div>
        </div>
        <div className="flex w-full items-center justify-center bg-white px-0 py-12 md:px-8">
          <WorkSelector
            currentIndex={currentIndex}
            onClick={handleWorkSelectorClick}
            works={WORKS}
          />
        </div>
      </main>
    </>
  );
}
