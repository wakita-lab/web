'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

export function ScrollPercentageOverlay() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const overlayRef = useRef<HTMLAnchorElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const calculateScrollPercentage = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = Math.floor(document.documentElement.scrollHeight) - window.innerHeight;
      const percentage = Math.max(0, Math.min(Math.round((scrollTop / scrollHeight) * 100), 100)) || 0;

      setScrollPercentage(percentage);

      if (overlayRef.current) {
        overlayRef.current.style.transition = 'opacity 100ms';
        overlayRef.current.style.opacity = '1';
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const debounceDuration = percentage === 100 ? 1000 : 500;

      timeoutRef.current = setTimeout(() => {
        if (overlayRef.current) {
          overlayRef.current.style.transition = 'opacity 2000ms';
          overlayRef.current.style.opacity = '0';
        }
      }, debounceDuration);
    };

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
    <Link
      ref={overlayRef}
      className={`fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-foreground px-3 py-1.5 opacity-0 hover:no-underline ${
        scrollPercentage === 100
          ? 'border-white bg-foreground text-white'
          : 'pointer-events-none bg-white text-foreground'
      }`}
      href="#top"
    >
      Scroll: {scrollPercentage}%
    </Link>
  );
};