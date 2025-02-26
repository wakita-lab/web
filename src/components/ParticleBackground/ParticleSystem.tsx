'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import fragmentShader from './shaders/particle.frag';
import vertexShader from './shaders/particle.vert';
import { createNoise2D } from 'simplex-noise';
import { getImageData, getColorAtPosition } from '@/utils/imageUtils';

interface ParticleSystemProps {
  count: number;
  speed: number;
  noiseDensity: number;
}

// Image data type definition
interface ImageDataType {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

export default function ParticleSystem({
  count,
  speed,
  noiseDensity,
}: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const positionsRef = useRef<THREE.BufferAttribute | null>(null);
  const colorsRef = useRef<THREE.BufferAttribute | null>(null);
  const timeToLiveRef = useRef<Int16Array | null>(null);
  const [imageData, setImageData] = useState<ImageDataType | null>(null);

  const noise2D = useMemo(() => createNoise2D(() => Math.random()), []);
  // State to hold image data

  // Load image data
  useEffect(() => {
    const loadImageData = async () => {
      try {
        const data = await getImageData('/scenery.jpg');
        setImageData(data);
        console.log('Image data loaded', data.width, data.height);
      } catch (error) {
        console.error('Failed to load image data', error);
      }
    };

    loadImageData();
  }, []);

  // Generate initial particle positions with direction angles and colors
  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const timeToLive = new Int16Array(count);

    for (let i = 0; i < count; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 2 * 8,
        (Math.random() - 0.5) * 2 * 4,
        0,
      );

      // Generate random color (RGB values in range 0-1)
      const color = new THREE.Color(0, 0, 0);

      positions.set(pos.toArray(), i * 3);
      colors.set(color.toArray(), i * 3);
      timeToLive[i] = 60 + Math.trunc(Math.random() * 300);
    }

    timeToLiveRef.current = timeToLive;
    return { positions, colors };
  }, [count]);

  // Execute on each animation frame
  useFrame(() => {
    if (!pointsRef.current || !positionsRef.current || !colorsRef.current) return;

    const positions = positionsRef.current.array as Float32Array;
    const colors = colorsRef.current.array as Float32Array;
    const timeToLive = timeToLiveRef.current as Int16Array;

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

      // decrement time to live
      timeToLive[i] -= 1;

      if (Math.abs(pos.x) > 8 || Math.abs(pos.y) > 4 || timeToLive[i] <= 0) {
        pos.set(
          (Math.random() - 0.5) * 2 * 8,
          (Math.random() - 0.5) * 2 * 4,
          0,
        );
        timeToLive[i] = 120 + Math.trunc(Math.random() * 300);
      }

      // Update particle color based on image data if available
      if (imageData) {
        // Calculate aspect ratios and normalized base coordinates
        const imageAspectRatio = imageData.width / imageData.height;
        const particleAreaAspectRatio = 16 / 8; // Width (16) / Height (8)
        const baseX = (pos.x + 8) / 16;
        const baseY = (pos.y + 4) / 8;

        // Apply object-fit: cover behavior with conditional expressions
        // For wider images: adjust X coordinate, for taller images: adjust Y coordinate
        const isWiderImage = imageAspectRatio > particleAreaAspectRatio;
        const widerScaleFactor = particleAreaAspectRatio / imageAspectRatio;
        const tallerScaleFactor = imageAspectRatio / particleAreaAspectRatio;

        // Calculate normalized coordinates with centered scaling
        const normalizedX = Math.max(0, Math.min(1,
          isWiderImage
            ? (baseX - 0.5) * widerScaleFactor + 0.5
            : baseX,
        ));

        const normalizedY = Math.max(0, Math.min(1,
          isWiderImage
            ? baseY
            : (baseY - 0.5) * tallerScaleFactor + 0.5,
        ));

        // Get color from the image
        const [r, g, b] = getColorAtPosition(imageData, normalizedX, normalizedY);
        // Update particle color
        colors.set([r, g, b], i * 3);
      }

      positions.set(pos.toArray(), i * 3);
    }

    // Notify GPU of position and color updates
    positionsRef.current.needsUpdate = true;
    colorsRef.current.needsUpdate = true;
  });

  // Only render when image data is loaded
  return imageData ? (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          ref={positionsRef}
          attach="attributes-position"
          args={[particleData.positions, 3]}
        />
        <bufferAttribute
          ref={colorsRef}
          attach="attributes-color"
          args={[particleData.colors, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
        vertexColors
      />
    </points>
  ) : null;
}