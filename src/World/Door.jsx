// ========================================
// Intended Filename: src/Door.jsx // <-- Assuming this file is actually in src/World/Door.jsx now
// Fixed: Uses doorOpen prop and rotates inner group correctly.
// (No changes needed from previous version)
// ========================================
import React, { useRef } from 'react';
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Accept doorOpen prop
export default function Door({ doorOpen, ...props }) {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      const targetAngle = doorOpen ? -Math.PI / 1.9 : 0;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetAngle,
        0.05
      );
    }
  });

  return (
    <RigidBody type="fixed" colliders="cuboid" {...props}>
      <group ref={groupRef} position={[0.5, 0, 0]}>
        <mesh position={[-0.5, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1, 2, 0.1]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      </group>
    </RigidBody>
  );
}
