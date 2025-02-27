import XCheckbox from '@/components/XCheckbox';
import { Work } from '@/constants/works';
import { useEffect, useRef } from 'react';

interface WorkSelectorProps {
  currentIndex: number;
  onClick: (index: number) => void;
  works: Work[];
}

export default function WorkSelector({ currentIndex, onClick, works }: WorkSelectorProps) {
  const length = works.length;
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    buttonRefs.current[currentIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  }, [currentIndex]);

  return (
    <div className="flex w-full items-center justify-center md:gap-4">
      <button onClick={() => currentIndex > 0 && onClick(currentIndex - 1)} name="prev" className="p-4 max-md:pr-2">
        <XCheckbox selected={currentIndex === 0} />
      </button>
      <div className="scrollbar-hidden flex max-w-full gap-0 overflow-x-scroll md:gap-4">
        {works.map((work, index) => (
          <button
            key={index}
            ref={el => {
              buttonRefs.current[index] = el;
            }}
            onClick={() => onClick(index)}
            className="flex items-center gap-2 text-nowrap px-2 tracking-tighter"
          >
            <XCheckbox selected={index === currentIndex} />
            {work.title.en}
          </button>
        ))}
      </div>
      <button onClick={() => currentIndex < length - 1 && onClick(currentIndex + 1)} name="next" className="p-4 max-md:pl-2">
        <XCheckbox selected={currentIndex === length - 1} />
      </button>
    </div>
  );
}