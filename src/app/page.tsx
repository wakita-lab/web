'use client';

import { WORKS } from '@/constants/works';
import { WorkItem } from '@/components/WorkItem';

export default function Home() {
  return (
    <main className="flex h-svh w-full flex-col items-center font-light">
      <div className="z-0 w-full max-w-6xl flex-1 scroll-smooth p-16 sm:px-8">
        <div id="1" />
        {WORKS.map((work) => (
          <WorkItem key={work.id} work={work} />
        ))}
      </div>
    </main>
  );
}
