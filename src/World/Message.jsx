// ========================================
// Intended Filename: src/Message.jsx // <-- Assuming this file is actually in src/World/Message.jsx now
// No changes needed.
// ========================================
import React, { useState, useEffect } from 'react';
import { Text } from '@react-three/drei';

export default function Message(props) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Text
      position={props.position}
      fontSize={1}
      color="hotpink"
      visible={visible}
      anchorX="center"
      anchorY="middle"
    >
      Hello :3
    </Text>
  );
}