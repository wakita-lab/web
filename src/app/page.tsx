'use client';

import ParticleBackground from '@/components/ParticleBackground';
import { useCallback, useRef, useState } from 'react';
import { WORKS } from '@/constants/works';
import WorkSelector from '@/components/WorkSelector';

const workHeight = 1000;

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollFieldRef = useRef<HTMLDivElement>(null);
  const scrollFieldHeight = scrollFieldRef.current?.clientHeight || 0;

  const handleScrollFieldScroll = useCallback(() => {
    const scrollAmount = scrollFieldRef.current?.scrollTop || 0;
    const index = Math.min(Math.trunc(scrollAmount / workHeight), WORKS.length - 1);
    setCurrentIndex(index);
  }, []);

  const handleWorkSelectorClick = useCallback((index: number) => {
    setCurrentIndex(index);

    if (!scrollFieldRef.current) return;
    scrollFieldRef.current.scrollTop = (index + 0.5) * workHeight;
  }, []);

  return (
    <>
      <ParticleBackground imagePath={WORKS[currentIndex].images[0]} />

      <main className="fixed flex h-svh w-full flex-col items-center justify-between font-light leading-loose tracking-tighter">
        <div className="flex w-full items-center justify-center bg-white py-12 text-lg">
          Akira Wakita Lab.
        </div>
        <div className="scrollbar-hidden w-full grow overflow-y-scroll" onScroll={handleScrollFieldScroll} ref={scrollFieldRef}>
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
