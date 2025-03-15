import { WORKS } from '@/constants/works';
import { WorkItem } from './WorkItem';
import seedrandom from 'seedrandom';


export function StaggeredWorkList() {
  return (
    <div className="z-0 grid w-full max-w-6xl flex-1 grid-cols-20 gap-x-2 gap-y-8 scroll-smooth px-4 sm:px-8">
      {WORKS.map((work) => {
        const rand = seedrandom(work.id);
        const colstart = Math.trunc(rand() * 5) + 1;

        return (
          <div key={work.id} style={{ gridColumnStart: colstart, gridColumnEnd: 'span 16' }}>
            <WorkItem work={work} />
          </div>
        );
      })}
    </div>
  );
}