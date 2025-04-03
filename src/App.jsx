// ========================================
// Intended Filename: src/App.jsx
// **** EDITED to remove OrbitControls ****
// ========================================
import React, { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
// Removed OrbitControls import
import { Text as DreiText } from '@react-three/drei';

// Adjust import paths based on assumed structure (e.g., components in ./ or ./World/)
import Duck from './World/Duck';
import Button from './World/Button'; // Assumes Button is in World subdir now
import Door from './World/Door';     // Assumes Door is in World subdir now
import Crate from './World/Crate';
import ResetZone from './World/ResetZone';
import Message from './World/Message'; // Assumes Message is in World subdir now

// Note: CollisionContext and KeyboardControls are provided in main.jsx

export default function App() {
  const [doorOpen, setDoorOpen] = useState(false);
  const [cratesInfo, setCratesInfo] = useState([]);

  const registerCrate = useCallback((bodyRef, initialPosition) => {
    setCratesInfo((prev) => {
      if (!prev.some(crate => crate.bodyRef === bodyRef)) {
        console.log("App: Registering crate at", initialPosition);
        return [...prev, { bodyRef, initialPosition }];
      }
      return prev;
    });
  }, []);

  const resetCrates = () => {
    console.log(`App: Executing reset for ${cratesInfo.length} crates`);
    cratesInfo.forEach(({ bodyRef, initialPosition }) => {
      if (bodyRef.current) {
        bodyRef.current.setTranslation(
          { x: initialPosition[0], y: initialPosition[1], z: initialPosition[2] }, true
        );
        bodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        bodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
      } else {
        console.warn("App: Attempted to reset a crate with a stale ref.");
      }
    });
  };

  const cratePositions = [
    [-0.5, 0.5, 2], [0.5, 0.5, 2], [0, 1.5, 2], [-1.5, 0.5, 3]
  ];

  return (
    // Removed camera prop, Ecctrl might manage it
    <Canvas shadows onCreated={({ gl }) => gl.setClearColor('#e0f0ff')}>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[8, 15, 5]} intensity={1.5} castShadow
        shadow-mapSize-width={2048} shadow-mapSize-height={2048}
        shadow-camera-near={0.5} shadow-camera-far={50}
        shadow-camera-left={-15} shadow-camera-right={15}
        shadow-camera-top={15} shadow-camera-bottom={-15}
        shadow-bias={-0.0005}
      />
      <Suspense fallback={<DreiText position={[0,0,0]} color="black">Loading...</DreiText>}>
        <Physics gravity={[0, -9.81, 0]}>
          {/* Ground */}
          <RigidBody type="fixed" colliders="cuboid" friction={1.0}>
            <mesh rotation-x={-Math.PI / 2} receiveShadow>
              <planeGeometry args={[50, 50]} />
              <meshStandardMaterial color="#88cc88" />
            </mesh>
          </RigidBody>

          {/* World Components */}
          {/* Start Ecctrl Duck slightly higher */}
          <Duck position={[0, 1, 5]} />
          <Button position={[-2, 0.1, -5]} setDoorOpen={setDoorOpen} />
          <Door position={[2, 1, -5]} doorOpen={doorOpen} />

          {/* Create Crates */}
          {cratePositions.map((pos, index) => (
            <Crate key={index} initialPosition={pos} registerCrate={registerCrate} />
          ))}

          {/* Reset Zone */}
          <ResetZone position={[-8, 0, -10]} resetCratesCallback={resetCrates} />

        </Physics> {/* End Physics */}
        <Message position={[0, 4, -10]} />
      </Suspense> {/* End Suspense */}
      {/* Removed OrbitControls - Ecctrl handles camera */}
    </Canvas> // End Canvas
  );
} // End App