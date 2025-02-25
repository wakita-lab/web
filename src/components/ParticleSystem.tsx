'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import fragmentShader from '../shaders/particle.frag';
import vertexShader from '../shaders/particle.vert';
import { createNoise2D } from 'simplex-noise';

interface ParticleSystemProps {
  count?: number;
  speed?: number;
  noiseDensity?: number;
  noiseStrength?: number;
}

export default function ParticleSystem({
  count = 1000,
  speed = 1.0,
  noiseDensity = 0.1,
  noiseStrength = 0.5,
}: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const positionsRef = useRef<THREE.BufferAttribute | null>(null);
  const initialPositionsRef = useRef<Float32Array | null>(null);
  
  // Create noise function
  const noise2DRef = useRef(createNoise2D(() => Math.random()));
  
  // Generate initial particle positions (2D plane only)
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      
      positions[i * 3] = x;     // x coordinate
      positions[i * 3 + 1] = y; // y coordinate
      positions[i * 3 + 2] = 0; // z coordinate always 0 (2D plane)
    }
    
    // Save initial positions
    initialPositionsRef.current = positions.slice();
    return positions;
  }, [count]);

  // Execute on each animation frame
  useFrame((state) => {
    if (!pointsRef.current || !positionsRef.current || !initialPositionsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const positions = positionsRef.current.array as Float32Array;
    const initialPositions = initialPositionsRef.current;
    const noise2D = noise2DRef.current;
    
    // Update each particle position based on simplex noise
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;
      
      // Get initial position
      const x = initialPositions[ix];
      const y = initialPositions[iy];
      
      // Calculate noise value (range -1 to 1)
      const noiseX = noise2D(x * noiseDensity, time * 0.1) * noiseStrength;
      const noiseY = noise2D(y * noiseDensity, time * 0.1 + 100) * noiseStrength;
      
      // Update position
      positions[ix] = x + noiseX * speed;
      positions[iy] = y + noiseY * speed;
      positions[iz] = 0; // z coordinate always 0
    }
    
    // Notify GPU of position updates
    positionsRef.current.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          ref={positionsRef}
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}