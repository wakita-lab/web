'use client';

import Scene from './Scene';

interface ParticleBackgroundProps {
  imagePath: string;
}

export default function ParticleBackground({ imagePath }: ParticleBackgroundProps) {
  return (
    <div className="fixed left-1/2 top-1/2 -z-10 h-[640px] w-[1152px] -translate-x-1/2 -translate-y-1/2">
      <Scene imagePath={imagePath} />
    </div>
  );
}