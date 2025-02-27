'use client';

import { Canvas, useThree } from '@react-three/fiber';
import ParticleSystem from './ParticleSystem';
import { useEffect, useState, useMemo } from 'react';
import { getImageData } from '@/utils/imageUtils';
import { createNoise2D } from 'simplex-noise';
import seedrandom from 'seedrandom';

// Component to leave particle trails
function PreventAutoClear() {
  const { gl } = useThree();

  useEffect(() => {
    // Configure to retain drawing buffer
    gl.autoClearColor = false;
  }, [gl]);

  return null;
}

interface SceneProps {
  imagePath: string;
}

export default function Scene({ imagePath }: SceneProps) {
  const [imageData, setImageData] = useState<{
    data: Uint8ClampedArray;
    width: number;
    height: number;
  } | null>(null);

  const random = useMemo(() => seedrandom(imagePath), [imagePath]);
  const noise2D = useMemo(() => createNoise2D(() => random()), [random]);
  const noiseDensity = useMemo(() => random() * 0.1 + 0.02, [random]);

  useEffect(() => {
    getImageData(imagePath).then(setImageData).catch(console.error);
  }, [imagePath]);

  return (
    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 75,
        near: 0.1,
        far: 1000,
      }}
      style={{ background: 'transparent' }}
      gl={{
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true, // Retain drawing buffer
      }}
    >
      <PreventAutoClear />
      {imageData && (
        <ParticleSystem
          noise2D={noise2D}
          count={250}
          speed={0.02}
          noiseDensity={noiseDensity}
          imageData={imageData}
        />
      )}
    </Canvas>
  );
}