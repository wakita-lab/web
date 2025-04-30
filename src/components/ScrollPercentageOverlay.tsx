'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function ScrollPercentageOverlay() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const pathname = usePathname();

  const isMixDiffStyle = pathname === '/';

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
      className={`fixed bottom-0 right-3.5 flex origin-top-right rotate-90 items-center gap-1.5 px-1.5 pt-px text-base md:right-1 lg:right-4 ${
        isMixDiffStyle ? 'bg-transparent text-white mix-blend-difference' : 'bg-background'
      }`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      {scrollPercentage}%
      {
        scrollPercentage < 100
          && <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 12"
            strokeWidth={1}
            stroke="currentColor"
            className="-scale-x-100"
            width={16}
            height={12}
            overflow="visible"
          >
            <path d="M5,2 0,6 5,10 M1,6 16,6"/>
          </svg>
      }
    </button>
  );
};