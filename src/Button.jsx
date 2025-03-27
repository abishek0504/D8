// src/Button.jsx
import React, { useState, useRef } from 'react'
import { RigidBody, useRapier } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Button(props) {
  const [pressed, setPressed] = useState(false)
  const groupRef = useRef()
  // We'll use a ref for the current squish value
  const squish = useRef(1)

  const handleCollisionEnter = (event) => {
    console.log("Button collision detected:", event)
    setPressed(true)
    window.doorOpen = true
  }

  const handleCollisionExit = (event) => {
    console.log("Button collision ended:", event)
    setPressed(false)
  }

  // Use a frame loop to smoothly interpolate squish
  useFrame(() => {
    const target = pressed ? 0.5 : 1 // target scale for Y
    squish.current = THREE.MathUtils.lerp(squish.current, target, 0.05) // adjust interpolation factor for slower transition
    if (groupRef.current) {
      groupRef.current.scale.y = squish.current
      // Offset downward relative to squish (if scale is 0.5, move down by 0.1; if 1, no offset)
      groupRef.current.position.y = (squish.current - 1) * 0.2
    }
  })

  return (
    <RigidBody
      type="fixed"
      colliders="cuboid"
      onCollisionEnter={handleCollisionEnter}
      onCollisionExit={handleCollisionExit}
      {...props}
    >
      <group ref={groupRef}>
        <mesh>
          <boxGeometry args={[1, 0.2, 1]} />
          <meshStandardMaterial color="#cc9911" />
        </mesh>
      </group>
    </RigidBody>
  )
}
