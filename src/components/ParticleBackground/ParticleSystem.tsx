'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import fragmentShader from './shaders/particle.frag';
import vertexShader from './shaders/particle.vert';
import { createNoise3D } from 'simplex-noise';

interface ParticleSystemProps {
  count: number;
  speed: number;
  noiseDensity: number;
  noiseStrength: number;
  elapsedTimeFactor: number;
}

export default function ParticleSystem({
  count,
  speed,
  noiseDensity,
  noiseStrength,
  elapsedTimeFactor,
}: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const positionsRef = useRef<THREE.BufferAttribute | null>(null);
  const initialPositionsRef = useRef<Float32Array | null>(null);
  const noise = useMemo(() => createNoise3D(() => Math.random()), []);
  
  // Generate initial particle positions with direction angles
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 8;
      
      positions[i * 3] = x;     // x coordinate
      positions[i * 3 + 1] = y; // y coordinate
      positions[i * 3 + 2] = 0; // z stores the direction angle in radians
    }
    
    // Save initial positions
    initialPositionsRef.current = positions.slice();
    return positions;
  }, [count]);

  // Execute on each animation frame
  useFrame(({clock}) => {
    if (!pointsRef.current || !positionsRef.current || !initialPositionsRef.current) return;
    
    const positions = positionsRef.current.array as Float32Array;
    
    // Update each particle position based on its direction angle
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;
      
      // Get the direction angle (stored in z)
      const angle = noise(
        positions[ix] * noiseDensity,
        positions[iy] * noiseDensity,
        clock.elapsedTime * elapsedTimeFactor
      ) * noiseStrength * Math.PI * 2;
      
      // Calculate direction vector from angle
      const directionX = Math.cos(angle);
      const directionY = Math.sin(angle);
      
      // Move 1px in the angle direction (scaled by speed)
      positions[ix] += directionX * speed;
      positions[iy] += directionY * speed;
      positions[iz] = angle; // Store the new angle
      
      // if particle goes out of bounds, reset to random position
      if (positions[ix] < -4 || positions[ix] > 4 || positions[iy] < -4 || positions[iy] > 4) {
        positions[ix] = (Math.random() - 0.5) * 8;
        positions[iy] = (Math.random() - 0.5) * 8;
      }
      
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