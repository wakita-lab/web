import XCheckbox from '@/components/XCheckbox';
import { Work } from '@/constants/works';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

interface WorkSelectorProps {
  currentIndex: number;
  onClick: (index: number) => void;
  works: Work[];
  isInverted?: boolean;
}

export default function WorkSelector({
  currentIndex,
  onClick,
  works,
  isInverted,
}: WorkSelectorProps) {
  const worksLength = works.length;
  const buttonRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    buttonRefs.current[currentIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });

    const timer = setTimeout(() => {
      onClick((currentIndex + (isInverted ? -1 : 1) + worksLength) % worksLength);
    }, 8000);

    return () => clearTimeout(timer);
  }, [currentIndex, worksLength, onClick, isInverted]);

  return (
    <div className="flex w-full items-center justify-center md:gap-4">
      <button onClick={() => onClick((currentIndex - 1 + worksLength) % worksLength)} name="prev" className="p-4 max-md:pr-2">
        <XCheckbox selected={currentIndex === 0} />
      </button>
      <div className="scrollbar-hidden flex max-w-full gap-0 overflow-x-scroll md:gap-4">
        {works.map((work, index) => (
          <Link
            key={index}
            ref={el => {
              buttonRefs.current[index] = el;
            }}
            onClick={() => onClick(index)}
            className="flex items-center gap-2 text-nowrap px-2 tracking-tighter"
            href={index === currentIndex ? `/works/about/${work.id}` : `#${work.id}`}
          >
            <XCheckbox selected={index === currentIndex} />
            {work.title.en}
          </Link>
        ))}
      </div>
      <button onClick={() => onClick((currentIndex + 1) % worksLength)} name="next" className="p-4 max-md:pl-2">
        <XCheckbox selected={currentIndex === worksLength - 1} />
      </button>
    </div>
  );
}
