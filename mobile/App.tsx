import React from 'react';
import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import {
  Ubuntu_500Medium,
  Ubuntu_700Bold,
  useFonts,
} from '@expo-google-fonts/ubuntu';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './src/hooks/auth';
import AppRoutes from './src/routes';

const App = () => {
  const [loadedFonts] = useFonts({
    Ubuntu_500Medium,
    Ubuntu_700Bold,
  });

  return !loadedFonts ? (
    <AppLoading />
  ) : (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <StatusBar style="dark" backgroundColor="transparent" translucent />
          <AppRoutes />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
