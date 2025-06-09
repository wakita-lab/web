'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

// Rotating icosahedron component
function RotatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Rotate the icosahedron on each frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.02;
      meshRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 3]} />
      <meshNormalMaterial
        wireframe={true}
        transparent={true}
        opacity={0.5}
      />
    </mesh>
  );
}

// Main component that positions the icosahedron at the top-left corner
export function Icosahedron() {
  return (
    <div className="pointer-events-none fixed -left-36 -top-36 z-40 size-96">
      <Canvas
        camera={{
          position: [0, 0, 3],
          fov: 40,
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[2, 2, 5]}
          intensity={0.8}
          color="#ffffff"
        />
        <pointLight
          position={[-2, 2, 2]}
          intensity={0.5}
          color="#ffffff"
        />
        <RotatingIcosahedron />
      </Canvas>
    </div>
  );
}