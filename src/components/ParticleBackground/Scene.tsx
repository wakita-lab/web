'use client';

import { Canvas, useThree } from '@react-three/fiber';
import ParticleSystem from './ParticleSystem';
import { useEffect } from 'react';

// Component to leave particle trails
function PreventAutoClear() {
  const { gl } = useThree();

  useEffect(() => {
    // Configure to retain drawing buffer
    gl.autoClearColor = false;
  }, [gl]);

  return null;
}

export default function Scene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 75,
        near: 0.1,
        far: 1000,
      }}
      style={{ background: 'black' }}
      gl={{
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true, // Retain drawing buffer
      }}
    >
      <PreventAutoClear />
      <ParticleSystem
        count={250}
        speed={0.01}
        noiseDensity={0.1}
      />
    </Canvas>
  );
}