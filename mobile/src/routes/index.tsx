import React from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';

import StatusBar from '../components/StatusBar';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/auth';
import { TeamProvider } from '../hooks/team';
import { CityProvider } from '../hooks/city';

const Routes = () => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fafaf9',
        }}
      >
        <ActivityIndicator size="large" color="#777" />
      </View>
    );
  }

  return user ? (
    <>
      <StatusBar />
      <TeamProvider>
        <CityProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <AppRoutes />
          </SafeAreaView>
        </CityProvider>
      </TeamProvider>
    </>
  ) : (
    <>
      <StatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        <AuthRoutes />
      </SafeAreaView>
    </>
  );
};

export default Routes;
