'use client';

import ParticleBackground from '@/components/ParticleBackground';
import { useState } from 'react';

const WORK_IMAGES = [
  { path: '/works/dismantling-awe.jpg', name: 'Dismantling Awe' },
  { path: '/works/scalar-field-of-cosmetics.jpg', name: 'Scalar Field of Cosmetics' },
  { path: '/works/scenery.jpg', name: 'Scenery' },
  { path: '/works/vis-vessel-routes.png', name: 'Vessel Routes Visualization' },
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(WORK_IMAGES[0].path);
  return (
    <>
      {/* 背景にパーティクルアニメーション */}
      <ParticleBackground imagePath={currentImage} />

      {/* メインコンテンツ */}

      <main className="flex min-h-screen w-full flex-col items-center justify-between p-8 leading-loose sm:items-start">
        {/* 画像切り替えUI */}
        <div className="flex gap-4">
          {WORK_IMAGES.map((image) => (
            <button
              key={image.path}
              onClick={() => setCurrentImage(image.path)}
              className={`rounded px-4 py-2 text-sm transition-colors ${
                currentImage === image.path
                  ? 'bg-white text-black'
                  : 'bg-black/20 text-white hover:bg-black/40'
              }`}
            >
              {image.name}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          {WORK_IMAGES.map((image) => (
            <button
              key={image.path}
              onClick={() => setCurrentImage(image.path)}
              className={`rounded px-4 py-2 text-sm transition-colors ${
                currentImage === image.path
                  ? 'bg-white text-black'
                  : 'bg-black/20 text-white hover:bg-black/40'
              }`}
            >
              {image.name}
            </button>
          ))}
        </div>
      </main>

    </>
  );
}
