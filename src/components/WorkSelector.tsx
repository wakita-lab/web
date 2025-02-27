import XCheckbox from '@/components/XCheckbox';
import { Work } from '@/constants/works';

interface WorkSelectorProps {
  currentIndex: number;
  onIndexChange: (index: number) => void;
  works: Work[];
}

export default function WorkSelector({ currentIndex, onIndexChange, works }: WorkSelectorProps) {
  const length = works.length;

  return (
    <div className="flex w-full items-center justify-center gap-4 bg-white px-6 py-12 md:gap-8 md:px-12">
      <button onClick={() => currentIndex > 0 && onIndexChange(currentIndex - 1)} name="prev">
        <XCheckbox selected={currentIndex === 0} />
      </button>
      <div className="scrollbar-hidden flex max-w-full gap-0 overflow-x-scroll md:gap-4">
        {works.map((work, index) => (
          <button
            key={index}
            onClick={() => onIndexChange(index)}
            className="flex items-center gap-2 text-nowrap px-2 tracking-tighter"
          >
            <XCheckbox selected={index === currentIndex} />
            {work.name.en}
          </button>
        ))}
      </div>
      <button onClick={() => currentIndex < length - 1 && onIndexChange(currentIndex + 1)} name="next">
        <XCheckbox selected={currentIndex === length - 1} />
      </button>
    </div>
  );
}