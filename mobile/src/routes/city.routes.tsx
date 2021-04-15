import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import CityList from '../pages/Cities/CityList';
import CityDetails from '../pages/Cities/CityDetails';

const City = createStackNavigator();
const Detail = createMaterialTopTabNavigator();

const CityDetailsRoutes = () => (
  <Detail.Navigator tabBarOptions={{ style: { display: 'none' } }}>
    <Detail.Screen name="CityDetails" component={CityDetails} />
  </Detail.Navigator>
);

const CityRoutes = () => (
  <City.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Cities"
  >
    <City.Screen name="Cities" component={CityList} />
    <City.Screen name="CityDetailsRoutes" component={CityDetailsRoutes} />
  </City.Navigator>
);

export default CityRoutes;
