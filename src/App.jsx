// src/App.jsx
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import { OrbitControls } from '@react-three/drei'
import Duck from './Duck'

export default function App() {
  return (
    <Canvas camera={{ fov: 50, position: [0, 5, 10] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

      <Suspense fallback={null}>
        <Physics gravity={[0, -9.81, 0]}>
          {/* Ground wrapped in a static RigidBody */}
          <RigidBody type="fixed" colliders="hull">
            <mesh rotation-x={-Math.PI / 2} receiveShadow>
              <planeGeometry args={[50, 50]} />
              <meshStandardMaterial color="#88cc88" />
            </mesh>
          </RigidBody>

          {/* Position the duck a bit higher so it starts on the ground */}
          <Duck position={[0, 2, 0]} />
        </Physics>
      </Suspense>

      <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  )
}
