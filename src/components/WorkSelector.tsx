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
          <label
            key={index}
            className="flex cursor-pointer items-center gap-2 text-nowrap px-2 tracking-tighter"
          >
            <input
              type="radio"
              name="work-selector"
              value={index}
              checked={index === currentIndex}
              onChange={() => onIndexChange(index)}
              className="hidden"
            />
            <XCheckbox selected={index === currentIndex} />
            {work.name.en}
          </label>
        ))}
      </div>
      <button onClick={() => currentIndex < length - 1 && onIndexChange(currentIndex + 1)} name="next">
        <XCheckbox selected={currentIndex === length - 1} />
      </button>
    </div>
  );
}