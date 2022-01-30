/* eslint-disable-file */
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import MainNavigation from './components/MainNavigation';
import { UserContextProvider } from './context/auth.context';
import { OfflineContextProvider } from './context/offline.context';
import useCachedResources from './modules/cached-resources/useCachedResources';
import { theme } from './modules/theme';
import { initialize } from './services/parse/auth';

// initialize();

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  useEffect(() => initialize());

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <UserContextProvider>
          <OfflineContextProvider>
            <MainNavigation />
          </OfflineContextProvider>
        </UserContextProvider>
      </PaperProvider>
    </NavigationContainer>

  );
}
