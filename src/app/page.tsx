'use client';

import ParticleBackground from '@/components/ParticleBackground';
import { useCallback, useEffect, useRef, useState } from 'react';

import { WORKS } from '@/constants/works';
import WorkLinkList from '@/components/WorkLinkList';

const HEIGHT_PER_WORK = 600;
const DEFAULT_SCROLL_SPEED = 1;

function useScrollAmount(defaultSpeed: number) {
  const [scrollAmountDelta, setScrollAmountDelta] = useState(defaultSpeed);

  const animationFrameRef = useRef<number>(0);
  const scrollAmountRef = useRef(0);

  const onScroll: React.UIEventHandler = useCallback((event) => {
    const newScrollAmount = event.currentTarget.scrollTop || 0;
    const scrollAmountDelta = newScrollAmount - scrollAmountRef.current;

    scrollAmountRef.current = newScrollAmount;
    setScrollAmountDelta(scrollAmountDelta);
  }, []);

  useEffect(() => {
    const loop = () => {
      setScrollAmountDelta((prev) => {
        const scrollAmountDeltaTarget = DEFAULT_SCROLL_SPEED * (prev < 0 ? -1 : 1);

        const newScrollAmountDelta = (scrollAmountDeltaTarget - prev) * 0.2 + prev;
        return newScrollAmountDelta;
      });

      animationFrameRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return { scrollAmountDelta, onScroll };
}

export default function Home() {
  const { scrollAmountDelta, onScroll } = useScrollAmount(DEFAULT_SCROLL_SPEED);

  const scrollFieldRef = useRef<HTMLDivElement>(null);

  const scrollFieldHeight = scrollFieldRef.current?.clientHeight || 0;
  const scrollAmount = scrollFieldRef.current?.scrollTop || 0;

  const currentIndex = Math.max(
    0,
    Math.min(WORKS.length - 1, Math.trunc(scrollAmount / HEIGHT_PER_WORK)),
  );
  const currentWork = WORKS[currentIndex] ?? WORKS[0];

  return (
    <>
      <ParticleBackground
        imagePath={currentWork.images[0]}
        particleSpeed={scrollAmountDelta * 0.015}
      />

      <main className="fixed flex h-svh w-full flex-col items-center justify-between font-light leading-loose tracking-tighter">
        <div className="flex w-full items-center justify-center bg-white py-12 text-xl font-extrabold">
          Akira Wakita Lab.
        </div>
        <div
          ref={scrollFieldRef}
          className="scrollbar-hidden w-full grow overflow-y-scroll"
          onScroll={onScroll}
        >
          {/* Add a little padding to the top, since Android chrome has a very weird scroll bug */}
          <div style={{height: 16}} />
          {WORKS.map((work) => (
            <div key={work.id} id={work.id} style={{height: HEIGHT_PER_WORK}} />
          ))}
          {/* negate the padding from the top */}
          <div style={{height: scrollFieldHeight - 16}} />
        </div>
        <div className="flex w-full items-center justify-center bg-white px-0 py-12 md:px-8">
          <WorkLinkList
            currentIndex={currentIndex}
            works={WORKS}
          />
        </div>
      </main>
    </>
  );
}
