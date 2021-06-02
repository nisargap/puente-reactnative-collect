/* eslint-disable-file */
import 'react-native-gesture-handler'; 

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import MainNavigation from './components/MainNavigation';
import useCachedResources from './modules/cached-resources/useCachedResources';
import { theme } from './modules/theme';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <NavigationContainer independent>

      <PaperProvider theme={theme}>
        <MainNavigation />
      </PaperProvider>
    </NavigationContainer>

  );
}
