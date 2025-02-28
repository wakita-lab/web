import XCheckbox from '@/components/XCheckbox';
import { Work } from '@/constants/works';
import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';

interface WorkLinkListProps {
  currentIndex: number;
  works: Work[];
  isInverted?: boolean;
}

export default function WorkLinkList({
  currentIndex,
  works,
  isInverted,
}: WorkLinkListProps) {
  const worksLength = works.length;
  const buttonRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const selectNext = useCallback((currentIndex: number) => {
    const nextIndex = (currentIndex + 1) % works.length;
    location.href = `#${works[nextIndex].id}`;
  }, [works]);

  const selectPrev = useCallback((currentIndex: number) => {
    const prevIndex = (currentIndex - 1 + works.length) % works.length;
    location.href = `#${works[prevIndex].id}`;
  }, [works]);

  useEffect(() => {
    buttonRefs.current[currentIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });

    const timer = setTimeout(() => {
      if (isInverted)
        selectPrev(currentIndex);
      else
        selectNext(currentIndex);
    }, 10000);

    return () => clearTimeout(timer);
  }, [currentIndex, selectNext, selectPrev, isInverted]);

  return (
    <div className="flex w-full items-center justify-center md:gap-4">
      <button onClick={() => selectPrev(currentIndex)} name="prev" className="p-4 max-md:pr-2">
        <XCheckbox selected={currentIndex === 0} />
      </button>
      <div className="scrollbar-hidden flex max-w-full gap-0 overflow-x-scroll md:gap-4">
        {works.map((work, index) => (
          <Link
            key={index}
            ref={el => {
              buttonRefs.current[index] = el;
            }}
            className="flex items-center gap-2 text-nowrap px-2 tracking-tighter"
            href={index === currentIndex ? `/works/about/${work.id}` : `#${work.id}`}
          >
            <XCheckbox selected={index === currentIndex} />
            {work.title.en}
          </Link>
        ))}
      </div>
      <button onClick={() => selectNext(currentIndex)} name="next" className="p-4 max-md:pl-2">
        <XCheckbox selected={currentIndex === worksLength - 1} />
      </button>
    </div>
  );
}