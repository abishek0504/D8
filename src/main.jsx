// ========================================
// Intended Filename: src/main.jsx
// **** EDITED to add KeyboardControls wrapper ****
// ========================================
import React from 'react';
import ReactDOM from 'react-dom/client';
import { KeyboardControls } from '@react-three/drei'; // Import KeyboardControls
import App from './App';
import './index.css';
import { CollisionProvider } from './PhysicsContext'; // Ensure path is correct

// Define keyboard mapping for Ecctrl (standard names)
const controlsMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
    // Optional: add action key if needed for interactions
    // { name: "action", keys: ["KeyE"] },
];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap everything in KeyboardControls */}
    <KeyboardControls map={controlsMap}>
      {/* Provide collision context */}
      <CollisionProvider>
        <App />
      </CollisionProvider>
    </KeyboardControls>
  </React.StrictMode>
);
