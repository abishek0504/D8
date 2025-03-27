// src/App.jsx
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import { OrbitControls } from '@react-three/drei'
import Duck from './Duck'
import Button from './Button'
import Door from './Door'
import Crate from './Crate'
import Message from './Message'

export default function App() {
  return (
    <Canvas camera={{ fov: 50, position: [0, 5, 10] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

      <Suspense fallback={null}>
        <Physics gravity={[0, -9.81, 0]}>
          {/* Ground wrapped in a fixed RigidBody */}
          <RigidBody type="fixed" colliders="hull">
            <mesh rotation-x={-Math.PI / 2} receiveShadow>
              <planeGeometry args={[50, 50]} />
              <meshStandardMaterial color="#88cc88" />
            </mesh>
          </RigidBody>

          {/* The Duck */}
          <Duck position={[0, 2, 0]} />

          {/* Pressure Plate Button */}
          <Button position={[-2, 0.1, -5]} />

          {/* Door that opens only while the button is active */}
          <Door position={[2, 1, -5]} />

          {/* Crates arranged in a triangular stack */}
          <Crate position={[-0.5, 0.5, 2]} />
          <Crate position={[0.5, 0.5, 2]} />
          <Crate position={[0, 1.5, 2]} />
        </Physics>

        {/* Hidden message */}
        <Message position={[0, 3, -10]} />
      </Suspense>

      <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  )
}
