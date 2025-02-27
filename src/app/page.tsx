'use client';

import ParticleBackground from '@/components/ParticleBackground';
import { useCallback, useRef, useState } from 'react';
import { WORKS } from '@/constants/works';
import WorkSelector from '@/components/WorkSelector';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollFieldRef = useRef<HTMLDivElement>(null);
  const scrollFieldHeight = scrollFieldRef.current?.clientHeight || 0;

  const handleScroll = useCallback(() => {
    const scrollAmount = scrollFieldRef.current?.scrollTop || 0;
    const index = Math.min(Math.trunc(scrollAmount / 2000), WORKS.length - 1);
    setCurrentIndex(index);
  }, []);

  const handleIndexChange = useCallback((index: number) => {
    scrollFieldRef.current?.scrollTo({ top: index * 2000 });
    setCurrentIndex(index);
  }, []);

  return (
    <>
      <ParticleBackground imagePath={WORKS[currentIndex].images[0]} />

      <main className="fixed flex h-svh w-full flex-col items-center justify-between font-light leading-loose tracking-tighter">
        <div className="flex w-full items-center justify-center bg-white py-12 text-lg">
          Akira Wakita Lab.
        </div>
        <div className="scrollbar-hidden w-full grow overflow-y-scroll" onScroll={handleScroll} ref={scrollFieldRef}>
          <div style={{height: WORKS.length * 2000 + scrollFieldHeight}}></div>
        </div>
        <div className="flex w-full items-center justify-center bg-white py-12 md:px-8">
          <WorkSelector
            currentIndex={currentIndex}
            onIndexChange={handleIndexChange}
            works={WORKS}
          />
        </div>
      </main>
    </>
  );
}
