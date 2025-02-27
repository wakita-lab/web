'use client';

import ParticleBackground from '@/components/ParticleBackground';
import { useState } from 'react';
import { WORKS } from '@/constants/works';
import WorkSelector from '@/components/WorkSelector';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <ParticleBackground imagePath={WORKS[currentIndex].images[0]} />

      <main className="flex min-h-svh w-full flex-col items-center justify-between font-light leading-loose tracking-tighter">
        <div className="flex w-full items-center justify-center bg-white px-6 py-12 text-lg md:gap-4 md:px-12">
          Akira Wakita Lab.
        </div>
        <WorkSelector currentIndex={currentIndex} onIndexChange={setCurrentIndex} />
      </main>
    </>
  );
}
