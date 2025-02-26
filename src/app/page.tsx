'use client';

import ParticleBackground from '@/components/ParticleBackground';
import { useState } from 'react';
import { WORK_IMAGES } from '@/constants/works';

export default function Home() {
  const [currentImage, setCurrentImage] = useState(WORK_IMAGES[0].path);
  return (
    <>
      <ParticleBackground imagePath={currentImage} />

      <main className="flex min-h-screen w-full flex-col items-center justify-between leading-loose tracking-tighter">
        <div className="flex w-full items-center justify-center gap-2 bg-white py-16 text-xl font-light">
          Akira Wakita Lab.
        </div>
        <div className="flex w-full justify-center gap-8 bg-white py-16">
          {WORK_IMAGES.map((image) => (
            <button
              key={image.path}
              onClick={() => setCurrentImage(image.path)}
              className="flex items-center gap-2 p-0 font-light tracking-tighter"
            >
              <div className={`size-2 ${currentImage === image.path ? 'bg-current' : 'bg-transparent'}`} />
              {image.name}
            </button>
          ))}
        </div>
      </main>

    </>
  );
}
