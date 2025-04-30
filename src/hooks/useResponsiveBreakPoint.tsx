// Custom hook to determine if a given number (width) is within the specified breakpoint range: boolean
'use client';

import { useState, useEffect } from 'react';

// Breakpoint definition
export type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

// Breakpoint values (in pixels)
const breakPointValues: Record<BreakPoint, number> = {
  xs: 420,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1800,
};

/**
 * Custom hook to determine if the current window width is within the specified breakpoint range
 * @param min Minimum breakpoint (width greater than or equal to this)
 * @param max Maximum breakpoint (width less than this)
 * @returns Whether the current window width is within the specified range
 */
export function useResponsiveBreakPoint({ min, max } : { min?: BreakPoint, max?: BreakPoint }): boolean {
  // Set initial value to work only on client-side
  const [isInRange, setIsInRange] = useState<boolean>(false);

  useEffect(() => {
    // Function to determine if the current window width is within the specified range
    const checkIfInRange = () => {
      const currentWidth = window.innerWidth;

      // Check minimum and maximum values
      const minWidth = min ? breakPointValues[min] : 0;
      const maxWidth = max ? breakPointValues[max] : Infinity;

      // Determine if within range
      const result = currentWidth >= minWidth && currentWidth < maxWidth;

      setIsInRange(result);
    };

    // Initial execution
    checkIfInRange();

    // Add resize event listener
    window.addEventListener('resize', checkIfInRange);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', checkIfInRange);
    };
  }, [min, max]); // Add min and max to dependency array

  return isInRange;
}

export default useResponsiveBreakPoint;