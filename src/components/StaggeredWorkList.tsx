import { WORKS } from '@/constants/works';
import { WorkItem } from './WorkItem';
import seedrandom from 'seedrandom';


export function StaggeredWorkList() {
  return (
    <div className="z-0 grid w-full max-w-6xl flex-1 grid-cols-20 gap-x-2 gap-y-8 scroll-smooth px-4 pb-16 pt-4 sm:px-8">
      {WORKS.map((work) => {
        const rand = seedrandom(work.id);
        const colstart = Math.trunc(rand() * 5) + 1;

        // Since className is not capable of dynamic class names, we need to use a bunch of ternary operators
        const colstartClassname =
          colstart === 1 ? 'md:col-start-1' :
            colstart === 2 ? 'md:col-start-2' :
              colstart === 3 ? 'md:col-start-3' :
                colstart === 4 ? 'md:col-start-4' : 'md:col-start-5';

        return (
          <div key={work.id} className={`col-span-full md:col-span-16 ${colstartClassname}`}>
            <WorkItem work={work} />
          </div>
        );
      })}
    </div>
  );
}