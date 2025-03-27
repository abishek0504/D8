// src/Button.jsx
import React from 'react'
import { RigidBody } from '@react-three/rapier'

export default function Button(props) {
  return (
    <RigidBody type="fixed" colliders="cuboid" sensor>
      <mesh position={props.position}>
        <boxGeometry args={[1, 0.2, 1]} />
        <meshStandardMaterial color="#cc9911" />
      </mesh>
    </RigidBody>
  )
}
