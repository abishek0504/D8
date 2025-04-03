// ========================================
// Intended Filename: src/Button.jsx // <-- Assuming this file is actually in src/World/Button.jsx now
// Fixed: Uses setDoorOpen prop instead of window global.
// (No changes needed from previous version)
// ========================================
import React, { useState, useRef } from 'react';
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Accept setDoorOpen as a prop
export default function Button({ setDoorOpen, ...props }) {
  const [pressed, setPressed] = useState(false);
  const groupRef = useRef();
  const squish = useRef(1);

  const handleCollisionEnter = (event) => {
    // Check if the colliding object is the duck
    // Ecctrl might have a different way to access userData, check console log if needed
    if (event.other?.rigidBodyObject?.userData?.tag === 'character-capsule-rigid-body') { // Ecctrl uses specific tags
      console.log("Button pressed by character");
      setPressed(true);
      if (typeof setDoorOpen === 'function') {
        setDoorOpen(true);
      } else {
        console.warn("Button: setDoorOpen prop is not a function!");
      }
    }
  };

  const handleCollisionExit = (event) => {
    if (event.other?.rigidBodyObject?.userData?.tag === 'character-capsule-rigid-body') {
      console.log("Button released by character");
      setPressed(false);
      if (typeof setDoorOpen === 'function') {
        setDoorOpen(false);
      } else {
          console.warn("Button: setDoorOpen prop is not a function!");
      }
    }
  };

  useFrame(() => {
    // Animate squish effect
    const target = pressed ? 0.5 : 1;
    squish.current = THREE.MathUtils.lerp(squish.current, target, 0.05);
    if (groupRef.current) {
      groupRef.current.scale.y = squish.current;
      groupRef.current.position.y = (squish.current - 1) * (0.2 / 2);
    }
  });

  return (
    <RigidBody
      type="fixed"
      colliders="hull"
      onCollisionEnter={handleCollisionEnter}
      onCollisionExit={handleCollisionExit}
      {...props}
    >
      <group ref={groupRef}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.5, 0.2, 4]} />
          <meshStandardMaterial color="#cc9911" />
        </mesh>
      </group>
    </RigidBody>
  );
}
