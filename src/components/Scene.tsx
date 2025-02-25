'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ParticleSystem from './ParticleSystem';
import { useEffect } from 'react';

// Component to leave particle trails
function TrailEffect() {
  const { gl } = useThree();
  
  useEffect(() => {
    // Configure to retain drawing buffer
    gl.autoClearColor = false;
  }, [gl]);
  
  useFrame(() => {
    // Slightly darken the screen each frame (instead of completely clearing)
    // Lower opacity to make trails last longer
    gl.setClearColor(0x000000, 0.0001);
    gl.clear();
  });
  
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
      <TrailEffect />
      <ParticleSystem
        count={500}
        speed={1.0}
        noiseDensity={0.4}
        noiseStrength={0.3}
      />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
