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
      className="fixed z-50 px-4 py-3 text-white mix-blend-difference md:left-1/2 md:top-0 md:-translate-x-1/2"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      {scrollPercentage}%
    </button>
  );
};