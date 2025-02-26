'use client';

import Scene from './Scene';

export default function ParticleBackground() {
  return (
    <div className="fixed w-[1152px] h-[640px] -z-10 m-auto inset-0">
      <Scene />      
    </div>
  );
}