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
  const duckGroup = useRef() // Group for controlling visual rotation and waddle

  // Set up basic WASD keyboard controls
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

    // Apply a lower impulse for slower movement.
    const impulseSpeed = 0.15
    let impulse = { x: 0, y: 0, z: 0 }
    if (keys.current.w) impulse.z -= impulseSpeed
    if (keys.current.s) impulse.z += impulseSpeed
    if (keys.current.a) impulse.x -= impulseSpeed
    if (keys.current.d) impulse.x += impulseSpeed
    if (impulse.x || impulse.z) {
      body.applyImpulse(impulse, true)
    }

    // Get the body's horizontal velocity.
    const velocity = body.linvel()
    const horizontalSpeed = Math.sqrt(velocity.x ** 2 + velocity.z ** 2)
    if (duckGroup.current) {
      // Desired rotation: based on velocity, but subtract π/2 so that when moving forward (velocity ~ [0, 0, -speed])
      // the duck faces forward.
      if (horizontalSpeed > 0.05) {
        const desiredAngle = Math.atan2(velocity.x, velocity.z) - Math.PI / 2
        duckGroup.current.rotation.y = THREE.MathUtils.lerp(
          duckGroup.current.rotation.y,
          desiredAngle,
          0.1
        )
      }
      // Apply a waddle effect with increased amplitude.
      const t = state.clock.getElapsedTime()
      const targetWobble = horizontalSpeed > 0.05 ? 0.1 * Math.sin(t * 10) : 0
      duckGroup.current.rotation.z = THREE.MathUtils.lerp(
        duckGroup.current.rotation.z,
        targetWobble,
        0.1
      )
    }
  })

  return (
    <RigidBody ref={bodyRef} colliders="hull" mass={1} lockRotations {...props}>
      <group ref={duckGroup}>
        <primitive
          object={duck.scene}
          scale={[0.5, 0.5, 0.5]}
          castShadow
        />
      </group>
    </RigidBody>
  )
}
