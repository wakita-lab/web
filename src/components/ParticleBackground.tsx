'use client';

import { Suspense } from 'react';
import Scene from './Scene';

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </div>
  );
}