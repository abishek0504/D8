// ========================================
// Intended Filename: src/World/Duck.jsx
// **** EDITED Ecctrl import path ****
// ========================================
import React, { useRef, useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
// Corrected import path for Ecctrl
import { Ecctrl } from '@pmndrs/ecctrl'; // Use @pmndrs scope
import * as THREE from 'three'; // Keep THREE for potential use

export default function Duck(props) {
  // Load the duck model
  const { scene } = useGLTF('https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/Duck/glTF-Binary/Duck.glb');
  const duckRef = useRef();

  // Clone the scene to prevent modifying the original cache
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Find the mesh if needed for shadows (optional)
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        // child.receiveShadow = true; // Optional, if duck should receive shadows
      }
    });
  }, [clonedScene]);

  // Define Ecctrl configuration props
  const ecctrlProps = {
    debug: false,
    animated: false,
    camCollision: true,
    camMinDis: 2,
    camMaxDis: 10,
    autoBalance: true,
    capsuleHalfHeight: 0.2,
    capsuleRadius: 0.3,
    // Use default movement settings or customize here:
    // maxVelLimit: 5,
    // jumpVel: 4,
    // sprintMult: 1.5,
  };

  return (
    // Use Ecctrl component, passing the starting position and other config
    // Added userData tag which Ecctrl applies internally
    <Ecctrl {...ecctrlProps} {...props} userData={{ tag: 'character-capsule-rigid-body' }}>
      {/* Place the scaled model inside Ecctrl */}
      <group ref={duckRef} position={[0, -0.3, 0]}> {/* Adjust Y offset based on model origin */}
        <primitive object={clonedScene} scale={[0.5, 0.5, 0.5]} />
      </group>
    </Ecctrl>
  );
}