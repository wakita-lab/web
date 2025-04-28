'use client';

import { useEffect, useState, useRef } from 'react';

export const ScrollPercentageOverlay: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const calculateScrollPercentage = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = Math.floor(document.documentElement.scrollHeight) - window.innerHeight;
      const percentage = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0;

      setScrollPercentage(percentage);

      if (overlayRef.current) {
        overlayRef.current.style.transition = 'opacity 100ms';
        overlayRef.current.style.opacity = '1';
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (overlayRef.current) {
          overlayRef.current.style.transition = 'opacity 2000ms';
          overlayRef.current.style.opacity = '0';
        }
      }, 500);
    };

    calculateScrollPercentage();

    window.addEventListener('scroll', calculateScrollPercentage);
    window.addEventListener('resize', calculateScrollPercentage);

    return () => {
      window.removeEventListener('scroll', calculateScrollPercentage);
      window.removeEventListener('resize', calculateScrollPercentage);
      if (timeoutRef.current)
        clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      <div
        ref={overlayRef}
        className={`rounded-lg border border-foreground px-3 py-1.5 ${
          scrollPercentage === 100
            ? 'border-white bg-foreground text-white'
            : ' bg-white text-foreground'
        }`}
      >
        {scrollPercentage}%
      </div>
    </div>
  );
};

export default ScrollPercentageOverlay;