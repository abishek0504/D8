// src/Crate.jsx
import React from 'react'
import { RigidBody } from '@react-three/rapier'

export default function Crate(props) {
  return (
    <RigidBody
      colliders="cuboid"
      mass={0.5}         // Lower mass for easier pushing
      friction={0.3}     // Lower friction
      linearDamping={0.9} // High damping to prevent momentum build-up
      {...props}
    >
      <mesh castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#885533" />
      </mesh>
    </RigidBody>
  )
}
