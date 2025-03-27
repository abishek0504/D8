// src/Crate.jsx
import React from 'react'
import { RigidBody } from '@react-three/rapier'

export default function Crate(props) {
  return (
    <RigidBody colliders="cuboid" mass={1} friction={0.6} {...props}>
      <mesh castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#885533" />
      </mesh>
    </RigidBody>
  )
}
