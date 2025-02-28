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
      <Link className="p-4 max-md:pr-2" href={currentIndex === 0 ? `#${works[works.length - 1].id}` : `#${works[currentIndex - 1].id}`}>
        <XCheckbox selected={currentIndex === 0} />
      </Link>
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
      <Link className="p-4 max-md:pl-2" href={currentIndex === works.length - 1 ? `#${works[0].id}` : `#${works[currentIndex + 1].id}`}>
        <XCheckbox selected={currentIndex === works.length - 1} />
      </Link>
    </div>
  );
}