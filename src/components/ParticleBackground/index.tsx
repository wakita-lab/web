'use client';

import Scene from './Scene';

export default function ParticleBackground() {
  return (
    <div className="fixed w-lvw h-lvh -z-10">
      <Scene />      
    </div>
  );
}