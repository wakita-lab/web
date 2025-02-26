'use client';

import Scene from './Scene';

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 -z-10 m-auto h-[640px] w-[1152px]">
      <Scene />
    </div>
  );
}