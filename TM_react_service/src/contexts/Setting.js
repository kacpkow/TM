import React, { useState, createContext, useContext } from 'react';

const Setting = createContext({});

export const SettingProvider = ({ children }) => {
  const [settings, setSettings] = useState({});

  const addSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getSetting = key => settings[key] || false;

  return (
    <Setting.Provider
      value={{
        addSetting,
        getSetting,
        settings
      }}
    >
      {children}
    </Setting.Provider>
  );
};

export const useSetting = () => useContext(Setting);
