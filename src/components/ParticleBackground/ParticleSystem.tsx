'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import fragmentShader from './shaders/particle.frag';
import vertexShader from './shaders/particle.vert';
import { createNoise2D } from 'simplex-noise';

interface ParticleSystemProps {
  count: number;
  speed: number;
  noiseDensity: number;
}

export default function ParticleSystem({
  count,
  speed,
  noiseDensity,
}: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const positionsRef = useRef<THREE.BufferAttribute | null>(null);
  const noise2D = useMemo(() => createNoise2D(() => Math.random()), []);

  // Generate initial particle positions with direction angles
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 2 * 8,
        (Math.random() - 0.5) * 2 * 4,
        0,
      );

      positions.set(pos.toArray(), i * 3);
    }

    return positions;
  }, [count]);

  // Execute on each animation frame
  useFrame(() => {
    if (!pointsRef.current || !positionsRef.current) return;

    const positions = positionsRef.current.array as Float32Array;

    // Update each particle position based on its direction angle
    for (let i = 0; i < count; i++) {
      const pos = new THREE.Vector3(...positions.slice(i * 3, i * 3 + 3));

      // curl noise
      const eps = 0.001;
      const diff = new THREE.Vector3(
        (noise2D(pos.x * noiseDensity, (pos.y + eps) * noiseDensity) -
        noise2D(pos.x * noiseDensity, (pos.y - eps) * noiseDensity)) / (2 * eps),
        -(noise2D((pos.x + eps) * noiseDensity, pos.y * noiseDensity) -
        noise2D((pos.x - eps) * noiseDensity, pos.y * noiseDensity)) / (2 * eps),
        0,
      ).normalize().multiplyScalar(speed);

      pos.add(diff);

      if (Math.abs(pos.x) > 8 || Math.abs(pos.y) > 8) {
        pos.set(
          (Math.random() - 0.5) * 2 * 8,
          (Math.random() - 0.5) * 2 * 8,
          0,
        );
      }

      positions.set(pos.toArray(), i * 3);
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
        blending={THREE.NormalBlending}
      />
    </points>
  );
}