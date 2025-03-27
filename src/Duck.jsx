// src/Duck.jsx
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export default function Duck(props) {
  // Load the duck model from an external URL
  const duck = useGLTF('https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/Duck/glTF-Binary/Duck.glb')
  const bodyRef = useRef()

  return (
    <RigidBody ref={bodyRef} colliders="hull" mass={1} {...props}>
      <primitive
        object={duck.scene}
        // Increase scale so it's more visible
        scale={[5, 5, 5]}
        castShadow
      />
    </RigidBody>
  )
}
