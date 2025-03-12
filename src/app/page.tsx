'use client';

import { WORKS } from '@/constants/works';
import { WorkItem } from '@/components/WorkItem';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-svh w-full flex-col items-center font-light leading-loose tracking-tighter">
      <Link className="sticky top-0 z-50 flex w-full items-center justify-center bg-white py-12 text-xl font-extrabold" href="/#top">
        Akira Wakita Lab.
      </Link>

      <div className="w-full max-w-5xl">
        {WORKS.map((work) => (
          <WorkItem key={work.id} work={work} />
        ))}
      </div>

    </main>
  );
}
