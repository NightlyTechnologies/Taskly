import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import { SignUpProvider } from '../hooks/signup';

import Error from '../pages/Error';
import Login from '../pages/Login';
import SignUpStep1 from '../pages/SignUp/Step1';
import SignUpStep2 from '../pages/SignUp/Step2';
import SignUpStep3 from '../pages/SignUp/Step3';
import Finish from '../pages/SignUp/Finish';

const App = createStackNavigator();

const LoginContainer = () => (
  <App.Navigator screenOptions={{ headerShown: false }}>
    <App.Screen name="Login" component={Login} />
  </App.Navigator>
);

const SignUpContainer = () => (
  <SignUpProvider>
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName="Step1"
    >
      <App.Screen name="Step1" component={SignUpStep1} />
      <App.Screen name="Step2" component={SignUpStep2} />
      <App.Screen name="Step3" component={SignUpStep3} />
      <App.Screen
        name="Finish"
        component={Finish}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forRevealFromBottomAndroid,
        }}
      />
    </App.Navigator>
  </SignUpProvider>
);

const AuthRoutes = () => (
  <App.Navigator screenOptions={{ headerShown: false }}>
    <App.Screen name="Login" component={LoginContainer} />
    <App.Screen name="SignUp" component={SignUpContainer} />
    <App.Screen
      name="Error"
      component={Error}
      options={{
        cardStyleInterpolator:
          CardStyleInterpolators.forRevealFromBottomAndroid,
      }}
    />
  </App.Navigator>
);

export default AuthRoutes;
