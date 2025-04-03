// ========================================
// Intended Filename: src/World/ResetZone.jsx
// Fixed: Uses resetCratesCallback prop and CollisionContext correctly.
// Updated collision check tag for Ecctrl.
// ========================================
import React, { useContext, useEffect, useRef, useState } from 'react';
import { RigidBody } from '@react-three/rapier';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
// Import context from the correct relative path
import { CollisionContext } from '../PhysicsContext';

// Accept resetCratesCallback prop
export default function ResetZone({ resetCratesCallback, ...props }) {
  const contextValue = useContext(CollisionContext);
  const { duckInResetZone = false, setDuckInResetZone = () => {} } = contextValue || {};
  const [collisionCount, setCollisionCount] = useState(0);
  const promptRef = useRef();

  useEffect(() => {
    setDuckInResetZone(collisionCount > 0);
  }, [collisionCount, setDuckInResetZone]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (duckInResetZone && e.code === 'Enter') {
        if (typeof resetCratesCallback === 'function') {
          console.log("Reset key pressed - attempting reset via callback...");
          resetCratesCallback();
        } else {
          console.warn("Reset key pressed, but resetCratesCallback prop is missing or not a function!");
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [duckInResetZone, resetCratesCallback]);

  useFrame(() => {
    if (promptRef.current) {
      const targetScale = duckInResetZone ? 1.2 : 0;
      const currentScale = promptRef.current.scale.x;
      promptRef.current.scale.setScalar(THREE.MathUtils.lerp(currentScale, targetScale, 0.1));
    }
  });

  // Define the tag Ecctrl uses for its RigidBody
  const characterRigidBodyTag = "character-capsule-rigid-body";

  return (
    <group {...props}>
      <RigidBody
        type="fixed"
        colliders="cuboid"
        sensor
        onCollisionEnter={(event) => {
          // Check for the specific tag used by Ecctrl's internal RigidBody
          console.log("ResetZone collision ENTER detected with:", event.other?.rigidBodyObject?.userData);
          if (event.other?.rigidBodyObject?.userData?.tag === characterRigidBodyTag) {
            console.log("ResetZone: Character entered!");
            setCollisionCount((prev) => prev + 1);
          }
        }}
        onCollisionExit={(event) => {
          console.log("ResetZone collision EXIT detected with:", event.other?.rigidBodyObject?.userData);
           if (event.other?.rigidBodyObject?.userData?.tag === characterRigidBodyTag) {
             console.log("ResetZone: Character exited!");
            setCollisionCount((prev) => Math.max(0, prev - 1));
          }
        }}
      >
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[10, 0.2, 10]} />
          <meshStandardMaterial color="orange" opacity={0.3} transparent />
        </mesh>
      </RigidBody>
      <Text
        ref={promptRef}
        position={[0, 0.3, 0]}
        fontSize={0.75}
        color="black"
        anchorX="center"
        anchorY="middle"
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0}
      >
        Press Enter to Reset Crates
      </Text>
    </group>
  );
}