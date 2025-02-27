'use client';

import ParticleBackground from '@/components/ParticleBackground';
import { useCallback, useRef, useState } from 'react';
import { WORKS } from '@/constants/works';
import WorkSelector from '@/components/WorkSelector';

const heightPerWork = 1000;

export default function Home() {
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollAmount, setScrollAmount] = useState(0);

  const scrollFieldRef = useRef<HTMLDivElement>(null);
  const scrollFieldHeight = scrollFieldRef.current?.clientHeight || 0;

  const handleIndexChange = useCallback((index: number) => {
    scrollFieldRef.current?.scrollTo({ top: index * heightPerWork, behavior: 'instant' });
    setScrollAmount((index - 0.5) * heightPerWork);
  }, []);

  const currentIndex = Math.min(Math.trunc(scrollAmount / heightPerWork), WORKS.length - 1);

  return (
    <>
      <ParticleBackground imagePath={WORKS[currentIndex].images[0]} />

      <main className="fixed flex h-svh w-full flex-col items-center justify-between font-light leading-loose tracking-tighter">
        <div className="flex w-full items-center justify-center bg-white py-12 text-xl">
          Akira Wakita Lab.
        </div>
        <div className="scrollbar-hidden w-full grow overflow-y-scroll" ref={scrollFieldRef} onScroll={e => setScrollAmount(e.currentTarget.scrollTop)}>
          <div style={{height: WORKS.length * heightPerWork + scrollFieldHeight}} />
        </div>
        <div className="flex w-full items-center justify-center bg-white px-0 py-12 md:px-8">
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
