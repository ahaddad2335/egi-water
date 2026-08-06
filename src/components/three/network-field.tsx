"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 90;

function WavePlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => new THREE.PlaneGeometry(26, 16, 46, 28), []);
  const basePositions = useMemo(
    () => geometry.attributes.position.array.slice(),
    [geometry],
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = basePositions[i * 3] as number;
      const y = basePositions[i * 3 + 1] as number;
      const z =
        Math.sin(x * 0.35 + t * 0.6) * 0.35 +
        Math.cos(y * 0.4 + t * 0.45) * 0.35;
      positions.setZ(i, z);
    }
    positions.needsUpdate = true;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2.55, 0, 0]}
      position={[0, -2.6, 0]}
    >
      <meshBasicMaterial
        color="#2dd4bf"
        wireframe
        transparent
        opacity={0.16}
      />
    </mesh>
  );
}

function NodeField() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10 + 1;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#5eead4"
        size={0.055}
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

export function NetworkField({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.2, 9], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <WavePlane />
        <NodeField />
      </Canvas>
    </div>
  );
}
