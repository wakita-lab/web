'use client';

import { WORKS } from '@/constants/works';
import { WorkItem } from '@/components/WorkItem';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex h-svh w-full flex-col items-center font-light">
      <Link className="top-0 flex w-full items-center justify-start bg-white p-4 px-6 text-xl font-extrabold" href="#1">
        <h1>Akira Wakita Lab.</h1>
      </Link>

      <div className="scrollbar-hidden z-0 w-full max-w-7xl flex-1 overflow-y-auto scroll-smooth px-8 sm:px-8">
        <div id="1" />
        {WORKS.map((work) => (
          <WorkItem key={work.id} work={work} />
        ))}
      </div>

    </main>
  );
}
