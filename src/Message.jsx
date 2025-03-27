// src/Message.jsx
import React, { useState, useEffect } from 'react'
import { Text } from '@react-three/drei'

export default function Message(props) {
  const [visible, setVisible] = useState(false)
  // For demonstration, show message after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 6000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Text position={props.position} fontSize={1} color="hotpink" visible={visible}>
      Hey, would you like to go on a date?
    </Text>
  )
}
