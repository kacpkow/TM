import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const User = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user');

  const startSession = (data) => {
    setUser(data);
  };

  const clearSession = () => {
    setUser(false);
  };

  return (
    <User.Provider
      value={{
        user,
        startSession,
        clearSession
      }}
    >
      {children}
    </User.Provider>
  );
};

export const useUser = () => useContext(User);
