// src/App.jsx
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { OrbitControls } from '@react-three/drei'
import Duck from './Duck'
import Button from './Button'
import Door from './Door'
import Crate from './Crate'
import Message from './Message'

export default function App() {
  return (
    <Canvas shadows camera={{ fov: 50, position: [0, 5, 10] }}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

      {/* Physics context */}
      <Physics gravity={[0, -9.81, 0]}>
        {/* Ground */}
        <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#88cc88" />
        </mesh>

        {/* Interactive Components */}
        <Duck />
        <Button position={[0, 0, -5]} />
        <Door position={[0, 0, -10]} />
        <Crate position={[2, 0.5, -2]} />
      </Physics>

      {/* Hidden Message (appears when triggered) */}
      <Message position={[0, 2, -10]} />

      {/* OrbitControls for debugging; remove for fixed camera if desired */}
      <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  )
}
