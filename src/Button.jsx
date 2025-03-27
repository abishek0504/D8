// src/Button.jsx
import React from 'react'
import { RigidBody } from '@react-three/rapier'

export default function Button(props) {
  const handleCollisionEnter = (event) => {
    console.log("Button collision detected with:", event)
    // You can check event.otherObject or similar if needed.
    window.doorOpen = true
  }

  return (
    <RigidBody
      type="fixed"
      colliders="cuboid"
      sensor
      onCollisionEnter={handleCollisionEnter}
      {...props}
    >
      <mesh>
        <boxGeometry args={[1, 0.2, 1]} />
        <meshStandardMaterial color="#cc9911" />
      </mesh>
    </RigidBody>
  )
}
