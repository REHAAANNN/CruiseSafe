import React, { createContext, useContext, useState } from 'react';

const SafetyContext = createContext();

export const useSafety = () => {
  const context = useContext(SafetyContext);
  if (context === undefined) {
    throw new Error('useSafety must be used within a SafetyProvider');
  }
  return context;
};

export const SafetyProvider = ({ children }) => {
  const [isEmergencyMode, setEmergencyMode] = useState(false);
  const [lastKnownPosition, setLastKnownPosition] = useState('Unknown');
  const [emergencyContacts, setEmergencyContacts] = useState([
    'Ship Emergency: 911',
    'Bridge: Ext. 100',
    'Medical: Ext. 911'
  ]);

  const addEmergencyContact = (contact) => {
    setEmergencyContacts(prev => [...prev, contact]);
  };

  const value = {
    isEmergencyMode,
    setEmergencyMode,
    lastKnownPosition,
    setLastKnownPosition,
    emergencyContacts,
    addEmergencyContact
  };

  return (
    <SafetyContext.Provider value={value}>
      {children}
    </SafetyContext.Provider>
  );
};