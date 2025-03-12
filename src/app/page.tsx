'use client';

import { WORKS } from '@/constants/works';
import { WorkItem } from '@/components/WorkItem';

export default function Home() {
  return (
    <main className="flex h-svh w-full flex-col items-center font-light leading-loose tracking-tighter">
      <div className="flex w-full items-center justify-center bg-transparent py-12 text-xl font-extrabold">
        Akira Wakita Lab.
      </div>

      <div className="w-full max-w-5xl flex-1 overflow-y-auto px-6 py-12">
        {WORKS.map((work) => (
          <WorkItem key={work.id} work={work} />
        ))}
      </div>
    </main>
  );
}
