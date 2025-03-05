import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_SCROLL_SPEED = 1;

export function useScrollAmount(defaultSpeed: number) {
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