'use client';

import { WORKS } from '@/constants/works';
import { WorkItem } from '@/components/WorkItem';

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center font-light">
      <div className="z-0 grid w-full max-w-6xl flex-1 grid-cols-8 scroll-smooth px-4 sm:px-8">
        {WORKS.map((work) => (
          <WorkItem key={work.id} work={work} />
        ))}
      </div>
    </main>
  );
}
