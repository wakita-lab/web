'use client';

import { useEffect, useState, useRef } from 'react';

export function ScrollPercentageOverlay() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const overlayRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const calculateScrollPercentage = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = Math.floor(document.documentElement.scrollHeight) - window.innerHeight;
      const percentage = Math.max(0, Math.min(Math.round((scrollTop / scrollHeight) * 100), 100)) || 0;

      setScrollPercentage(percentage);
    };

    window.addEventListener('scroll', calculateScrollPercentage);
    window.addEventListener('resize', calculateScrollPercentage);

    return () => {
      window.removeEventListener('scroll', calculateScrollPercentage);
      window.removeEventListener('resize', calculateScrollPercentage);
    };
  }, []);

  return (
    <button
      ref={overlayRef}
      className="fixed bottom-0 right-4 origin-top-right rotate-90 bg-background px-1.5 pt-px text-base md:right-1 lg:right-4"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      {scrollPercentage}%
      {scrollPercentage < 100 ? ' →' : ''}
    </button>
  );
};