import XCheckbox from '@/components/XCheckbox';
import { WORKS } from '@/constants/works';

interface WorkSelectorProps {
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export default function WorkSelector({ currentIndex, onIndexChange }: WorkSelectorProps) {
  return (
    <div className="flex w-full items-center justify-center gap-4 bg-white px-6 py-12 md:gap-8 md:px-12">
      <XCheckbox selected />
      <div className="scrollbar-hidden flex max-w-full gap-0 overflow-x-scroll">
        {WORKS.map((work, index) => (
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
      <XCheckbox selected />
    </div>
  );
}