// ========================================
// Intended Filename: src/World/Crate.jsx
// Fixed: Uses registerCrate prop instead of window global.
// (No changes needed from previous version)
// ========================================
import React, { useRef, useEffect } from 'react';
import { RigidBody } from '@react-three/rapier';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Accept registerCrate and initialPosition as props
export default function Crate({ registerCrate, initialPosition, ...props }) {
  const bodyRef = useRef();
  const textureUrl = 'https://blenderartists.org/uploads/default/original/3X/1/a/1a6e07f673bf5ef4ccb0b1b576179134419c5da8.png';
  const fallbackTexture = new THREE.TextureLoader().load("https://placehold.co/64x64/deb887/000000?text=Crate");

  const crateTexture = useTexture(textureUrl, (texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
  });

  // Register the crate with the App component on mount
  useEffect(() => {
    if (bodyRef.current && registerCrate && initialPosition) {
      console.log(`Registering crate with initial position: [${initialPosition.join(', ')}]`);
      registerCrate(bodyRef, initialPosition);
    } else if (!registerCrate) {
        console.warn("Crate: registerCrate prop is missing!");
    }
  }, [registerCrate, initialPosition]);

  return (
    <RigidBody
      ref={bodyRef}
      colliders="cuboid"
      mass={0.5}
      friction={0.8}
      restitution={0.1}
      linearDamping={0.5}
      angularDamping={0.5}
      {...props}
      position={initialPosition}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial map={crateTexture || fallbackTexture} color={crateTexture ? '#ffffff' : '#deb887'} />
      </mesh>
    </RigidBody>
  );
}
