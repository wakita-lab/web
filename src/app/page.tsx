'use client';

import { WORKS } from '@/constants/works';
import { WorkItem } from '@/components/WorkItem';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex h-svh w-full flex-col items-center font-light leading-loose tracking-tighter">
      <Link className="top-0 flex w-full items-center justify-center bg-white py-12 text-xl font-extrabold" href="#1">
        <h1>Akira Wakita Lab.</h1>
      </Link>

      <div className="scrollbar-hidden w-full max-w-5xl flex-1 overflow-y-auto scroll-smooth px-6">
        <div id="1" />
        {WORKS.map((work) => (
          <WorkItem key={work.id} work={work} />
        ))}
      </div>

    </main>
  );
}
