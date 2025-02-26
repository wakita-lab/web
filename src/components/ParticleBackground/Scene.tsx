'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
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
    // gl.setClearColor(0x000000, 0.0001);
    // gl.clear();
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
        speed={0.01}
        noiseDensity={0.2}
        noiseStrength={1}
        elapsedTimeFactor={0}
      />

      {/* 透明度0.1の黒い平面 */}
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial color="black" transparent opacity={0.1} />
      </mesh>
    </Canvas>
  );
}