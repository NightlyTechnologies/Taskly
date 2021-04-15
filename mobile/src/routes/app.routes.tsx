import React from 'react';
import { Dimensions, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  // MaterialIcons,
} from '@expo/vector-icons';

import ActivityRoutes from './activity.routes';
import CityRoutes from './city.routes';
import ProfileRoutes from './profile.routes';

// import Notifications from '../pages/Notifications';

const App = createMaterialTopTabNavigator();
const { width } = Dimensions.get('screen');

const AppRoutes = () => (
  <View style={{ flex: 1, backgroundColor: '#fafaf9' }}>
    <App.Navigator
      tabBarPosition="bottom"
      swipeEnabled={false}
      tabBarOptions={{
        activeTintColor: '#ED3F47',
        inactiveTintColor: '#777777',
        showIcon: true,
        showLabel: false,
        indicatorStyle: { backgroundColor: 'transparent' },
        pressColor: 'transparent',
        style: {
          height: width <= 390 ? 62 : 70,
          backgroundColor: '#fafaf9',
          borderTopWidth: 2,
          borderTopColor: '#ED4F47',
          width: width - 30,
          alignSelf: 'center',
          elevation: 0,
          shadowOpacity: 0,
          justifyContent: 'center',
        },
      }}
    >
      <App.Screen
        name="Activities"
        component={ActivityRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="list-alt" size={24} color={color} />
          ),
        }}
      />
      <App.Screen
        name="Cities"
        component={CityRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="city-variant-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      {/* <App.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="notifications-none" size={26} color={color} />
          ),
        }}
      /> */}
      <App.Screen
        name="Profile"
        component={ProfileRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
    </App.Navigator>
  </View>
);

export default AppRoutes;
