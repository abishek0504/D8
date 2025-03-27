// src/Door.jsx
import React, { useState, useEffect, useRef } from 'react'
import { RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'

export default function Door(props) {
  const [open, setOpen] = useState(false)
  const doorRef = useRef()

  // For demonstration, open door after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  useFrame(() => {
    if (doorRef.current && open && doorRef.current.rotation.y > -Math.PI/2) {
      doorRef.current.rotation.y -= 0.01
    }
  })

  return (
    <RigidBody type="fixed" colliders={false} position={props.position}>
      <group ref={doorRef}>
        <mesh>
          <boxGeometry args={[1, 2, 0.1]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      </group>
    </RigidBody>
  )
}
