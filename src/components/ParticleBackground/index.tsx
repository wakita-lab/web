'use client';

import Scene from './Scene';

export default function ParticleBackground() {
  return (
    <div className="fixed left-1/2 top-1/2 -z-10 h-[640px] w-[1152px] -translate-x-1/2 -translate-y-1/2">
      <Scene />
    </div>
  );
}