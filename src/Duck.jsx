// src/Duck.jsx
import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'

export default function Duck(props) {
  // Load the duck model from an external URL
  const duck = useGLTF('https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/Duck/glTF-Binary/Duck.glb')
  const bodyRef = useRef()

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
    const speed = 0.5
    let impulse = { x: 0, y: 0, z: 0 }
    if (keys.current.w) impulse.z -= speed
    if (keys.current.s) impulse.z += speed
    if (keys.current.a) impulse.x -= speed
    if (keys.current.d) impulse.x += speed
    if (impulse.x || impulse.z) {
      body.applyImpulse(impulse, true)
    }
  })

  return (
    <RigidBody ref={bodyRef} colliders="hull" mass={1} lockRotations {...props}>
      <primitive
        object={duck.scene}
        scale={[0.5, 0.5, 0.5]}  // adjust scale as needed
        castShadow
      />
    </RigidBody>
  )
}
