/**
 * React Native App
 * Everthing starts from the entrypoint
 */
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from 'react-native-screens';

import Navigator from 'app/navigation';
import configureStore from 'app/store';
enableScreens(false);
const { persistor, store } = configureStore();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function Entrypoint() {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <Navigator />
          </SafeAreaProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
