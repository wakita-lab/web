'use client';

import ParticleBackground from '@/components/ParticleBackground';
import { useCallback, useEffect, useRef, useState } from 'react';

import { WORKS } from '@/constants/works';
import WorkSelector from '@/components/WorkSelector';

const HEIGHT_PER_WORK = 600;
const AUTO_SCROLL_SPEED = 1;

export default function Home() {
  const [scrollAmount, setScrollAmount] = useState(0);
  const [scrollAmountDelta, setScrollAmountDelta] = useState(1);

  const scrollFieldRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);

  const scrollFieldHeight = scrollFieldRef.current?.clientHeight || 0;

  const handleWorkSelectorClick = useCallback((index: number) => {
    if (!scrollFieldRef.current) return;

    const newScrollAmount = (index + 0.5) * HEIGHT_PER_WORK;

    scrollFieldRef.current.scrollTop = newScrollAmount;
    setScrollAmount(newScrollAmount);
  }, []);

  const handleScroll = useCallback(() => {
    setScrollAmount((prev) => {
      const newScrollAmount = scrollFieldRef.current?.scrollTop || 0;
      const scrollAmountDelta = newScrollAmount - prev;
      setScrollAmountDelta(scrollAmountDelta);

      return newScrollAmount;
    });
  }, []);

  useEffect(() => {
    const loop = () => {
      setScrollAmountDelta((prev) => {
        const scrollAmountDeltaTarget = AUTO_SCROLL_SPEED * (prev < 0 ? -1 : 1);

        const newScrollAmountDelta = (scrollAmountDeltaTarget - prev) * 0.1 + prev;
        if (Math.abs(newScrollAmountDelta) < AUTO_SCROLL_SPEED * 1.1) {
          setScrollAmount((prev) =>
            prev + newScrollAmountDelta,
          );
        }

        return newScrollAmountDelta;
      });
      animationFrameRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const currentIndex = Math.max(
    0,
    Math.min(WORKS.length - 1, Math.trunc(scrollAmount / HEIGHT_PER_WORK)),
  );
  const currentWork = WORKS[currentIndex] ?? WORKS[0];

  return (
    <>
      <ParticleBackground
        imagePath={currentWork.images[0]}
        particleSpeed={scrollAmountDelta * 0.012}
      />

      <main className="fixed flex h-svh w-full flex-col items-center justify-between font-light leading-loose tracking-tighter">
        <div className="flex w-full items-center justify-center bg-white py-12 text-lg">
          Akira Wakita Lab.
        </div>
        <div
          ref={scrollFieldRef}
          className="scrollbar-hidden w-full grow overflow-y-scroll"
          onScroll={handleScroll}
        >
          <div style={{height: WORKS.length * HEIGHT_PER_WORK + scrollFieldHeight}}></div>
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
