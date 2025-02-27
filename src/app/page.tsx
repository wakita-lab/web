'use client';

import ParticleBackground from '@/components/ParticleBackground';
import { useState } from 'react';
import { WORKS } from '@/constants/works';

export default function Home() {
  const [currentImage, setCurrentImage] = useState(WORKS[0].images[0]);

  return (
    <>
      <ParticleBackground imagePath={currentImage} />

      <main className="flex min-h-svh w-full flex-col items-center justify-between leading-loose tracking-tighter">
        <div className="flex w-full items-center justify-center gap-2 bg-white py-16 text-xl font-light">
          Akira Wakita Lab.
        </div>
        <div className="flex w-full justify-center gap-8 bg-white py-16">
          {WORKS.map((work) => (
            <button
              key={work.id}
              onClick={() => setCurrentImage(work.images[0])}
              className="flex items-center gap-2 p-0 font-light tracking-tighter"
            >
              <div className={`size-2 ${currentImage === work.images[0] ? 'bg-current' : 'bg-transparent'}`} />
              {work.name}
            </button>
          ))}
        </div>
      </main>
    </>
  );
}
