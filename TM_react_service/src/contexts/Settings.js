import React, { useState, createContext, useContext } from 'react';

const Settings = createContext({});

export const Provider = ({ children }) => {
  const [settings, setSettings] = useState({});

  const createSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getSetting = key => settings[key] || false;

  return (
    <Settings.Provider
      value={{
        createSetting,
        getSetting,
        settings
      }}
    >
      {children}
    </Settings.Provider>
  );
};

export default () => useContext(Settings);
