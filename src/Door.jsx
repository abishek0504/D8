// src/Door.jsx
import React, { useRef } from 'react'
import { RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Door(props) {
  const doorRef = useRef()

  useFrame(() => {
    if (doorRef.current) {
      // If the button is pressed, target angle is -90°; otherwise 0.
      const targetAngle = window.doorOpen ? -Math.PI / 2 : 0
      doorRef.current.rotation.y = THREE.MathUtils.lerp(
        doorRef.current.rotation.y,
        targetAngle,
        0.05
      )
    }
  })

  return (
    <RigidBody type="fixed" colliders="cuboid" {...props}>
      <group ref={doorRef}>
        <mesh>
          <boxGeometry args={[1, 2, 0.1]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      </group>
    </RigidBody>
  )
}
