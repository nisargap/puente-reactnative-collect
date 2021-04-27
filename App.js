import React from 'react';
import { Platform } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import MainNavigation from './components/MainNavigation';
import useCachedResources from './modules/cached-resources/useCachedResources';
import { theme } from './modules/theme';


if (Platform.OS === 'android') {
  enableScreens(true);
}

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <PaperProvider theme={theme}>
      <MainNavigation />
    </PaperProvider>
  );
}
