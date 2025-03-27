// src/Door.jsx
import React, { useState, useEffect, useRef } from 'react'
import { RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'

export default function Door(props) {
  const doorRef = useRef()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.doorOpen && !open) {
        setOpen(true)
      }
    }, 500)
    return () => clearInterval(interval)
  }, [open])

  useFrame(() => {
    if (doorRef.current && open) {
      if (doorRef.current.rotation.y > -Math.PI / 2) {
        doorRef.current.rotation.y -= 0.01
      }
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
