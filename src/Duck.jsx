// src/Duck.jsx
import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Duck(props) {
  // Load the duck model from an external URL
  const duck = useGLTF('https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/Duck/glTF-Binary/Duck.glb')
  const bodyRef = useRef()
  const duckGroup = useRef() // Group for visual rotation

  // Set up keyboard controls
  const keys = useRef({ w: false, a: false, s: false, d: false })
  useEffect(() => {
    const handleKey = (e) => {
      const pressed = e.type === 'keydown'
      if (e.code === 'KeyW') keys.current.w = pressed
      if (e.code === 'KeyA') keys.current.a = pressed
      if (e.code === 'KeyS') keys.current.s = pressed
      if (e.code === 'KeyD') keys.current.d = pressed
    }
    window.addEventListener('keydown', handleKey)
    window.addEventListener('keyup', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('keyup', handleKey)
    }
  }, [])

  useFrame((state, delta) => {
    const body = bodyRef.current
    if (!body) return
    const impulseSpeed = 0.5
    let impulse = { x: 0, y: 0, z: 0 }
    if (keys.current.w) impulse.z -= impulseSpeed
    if (keys.current.s) impulse.z += impulseSpeed
    if (keys.current.a) impulse.x -= impulseSpeed
    if (keys.current.d) impulse.x += impulseSpeed
    if (impulse.x || impulse.z) {
      body.applyImpulse(impulse, true)
    }

    // Use the body's linear velocity for rotation.
    const velocity = body.linvel()
    const horizontalSpeed = Math.sqrt(velocity.x ** 2 + velocity.z ** 2)
    if (horizontalSpeed > 0.1 && duckGroup.current) {
      // Compute the desired angle from the velocity vector.
      // Add Math.PI/2 offset so that when W is pressed (velocity ~ [0, 0, -speed]),
      // desiredAngle becomes 0 (i.e. facing forward).
      const desiredAngle = Math.atan2(velocity.x, velocity.z) - ( Math.PI / 2 )
      duckGroup.current.rotation.y = THREE.MathUtils.lerp(
        duckGroup.current.rotation.y,
        desiredAngle,
        0.1
      )
    }
  })

  return (
    <RigidBody ref={bodyRef} colliders="hull" mass={1} lockRotations {...props}>
      <group ref={duckGroup}>
        <primitive
          object={duck.scene}
          scale={[0.5, 0.5, 0.5]} // Adjusted scale so duck is visible
          castShadow
        />
      </group>
    </RigidBody>
  )
}
