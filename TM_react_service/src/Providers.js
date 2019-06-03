import React from 'react';
import { UserProvider } from './contexts/User';
import { AlertProvider } from './contexts/Alert';
import { SettingProvider } from './contexts/Setting';

const Providers = ({ children }) => (
  <UserProvider>
    <AlertProvider>
      <SettingProvider>{children}</SettingProvider>
    </AlertProvider>
  </UserProvider>
);

export default Providers;
