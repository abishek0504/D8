// src/Button.jsx
import React, { useState } from 'react'
import { RigidBody } from '@react-three/rapier'

export default function Button(props) {
  const [pressed, setPressed] = useState(false)

  const handleCollisionEnter = (event) => {
    console.log("Button collision detected:", event)
    setPressed(true)
    window.doorOpen = true
  }

  const handleCollisionExit = (event) => {
    console.log("Button collision ended:", event)
    setPressed(false)
  }

  return (
    <RigidBody
      type="fixed"
      colliders="cuboid"
      // Remove sensor so the button becomes a physical collider
      onCollisionEnter={handleCollisionEnter}
      onCollisionExit={handleCollisionExit}
      {...props}
    >
      {/* Wrap mesh in a group to shift it down when pressed */}
      <group position={[0, pressed ? -0.1 : 0, 0]}>
        <mesh scale={[1, pressed ? 0.5 : 1, 1]}>
          <boxGeometry args={[1, 0.2, 1]} />
          <meshStandardMaterial color="#cc9911" />
        </mesh>
      </group>
    </RigidBody>
  )
}
