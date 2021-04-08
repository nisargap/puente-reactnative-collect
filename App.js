import React from 'react';
import { Platform } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { enableScreens } from 'react-native-screens';

// import { Provider as StoreProvider } from 'react-redux';
import MainNavigation from './components/MainNavigation';
import useCachedResources from './modules/cached-resources/useCachedResources';
// import configureStore from './modules/state-management/configure-store';
import { theme } from './modules/theme';

// const store = configureStore();

if (Platform.OS === 'android') {
  enableScreens(true);
}

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    // <StoreProvider store={store}>
    <PaperProvider theme={theme}>
      <MainNavigation />
    </PaperProvider>
    // </StoreProvider>
  );
}
