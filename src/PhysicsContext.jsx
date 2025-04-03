// ========================================
// Intended Filename: src/PhysicsContext.js
// Defines and provides the context for collision state.
// (No changes needed from previous version)
// ========================================
import React, { createContext, useState } from 'react';

// Create the context
export const CollisionContext = createContext();

// Create the provider component
export const CollisionProvider = ({ children }) => {
  // State to track if the duck is in the reset zone
  const [duckInResetZone, setDuckInResetZone] = useState(false);

  // The value provided by the context
  const value = { duckInResetZone, setDuckInResetZone };

  return (
    // Provide the value to children components
    <CollisionContext.Provider value={value}>
      {children}
      {/* Note: The <Physics> component is rendered in App.jsx, not here */}
    </CollisionContext.Provider>
  );
};
