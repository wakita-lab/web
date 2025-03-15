import { WORKS } from '@/constants/works';
import { WorkItem } from './WorkItem';
import seedrandom from 'seedrandom';


export function StaggeredWorkList() {
  return (
    <div className="z-0 grid w-full max-w-5xl flex-1 grid-cols-12 gap-x-4 gap-y-8 scroll-smooth px-4 sm:px-8">
      {WORKS.map((work) => {
        const rand = seedrandom(work.id);
        const colstart = `col-start-${Math.trunc(rand() * 3) + 1}`;

        return (
          <WorkItem key={work.id} work={work} className={`col-span-10 ${colstart}`} />
        );
      })}
    </div>
  );
}