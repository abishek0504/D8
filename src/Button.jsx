// src/Button.jsx
import React, { useState, useRef } from 'react'
import { RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Button(props) {
  const [pressed, setPressed] = useState(false)
  const groupRef = useRef()
  const squish = useRef(1)

  const handleCollisionEnter = (event) => {
    console.log("Button collision detected:", event)
    setPressed(true)
    window.doorOpen = true
  }

  const handleCollisionExit = (event) => {
    console.log("Button collision ended:", event)
    setPressed(false)
    window.doorOpen = false
  }

  useFrame(() => {
    const target = pressed ? 0.5 : 1
    squish.current = THREE.MathUtils.lerp(squish.current, target, 0.05)
    if (groupRef.current) {
      groupRef.current.scale.y = squish.current
      // Adjust vertical offset so the bottom edge stays anchored
      groupRef.current.position.y = (squish.current - 1) * 0.2
    }
  })

  return (
    <RigidBody
      type="fixed"
      colliders="hull"  // Use hull so the collider better matches the tapered shape
      onCollisionEnter={handleCollisionEnter}
      onCollisionExit={handleCollisionExit}
      {...props}
    >
      <group ref={groupRef} rotation={[0, Math.PI / 4, 0]}>
        <mesh>
          {/* A cylinder with 4 segments yields a tapered, square-like shape */}
          <cylinderGeometry args={[0.4, 0.5, 0.2, 4]} />
          <meshStandardMaterial color="#cc9911" />
        </mesh>
      </group>
    </RigidBody>
  )
}
