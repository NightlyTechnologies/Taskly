import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MyProfile from '../pages/Profile/MyProfile';
import Team from '../pages/Profile/Team';
import Teammate from '../pages/Profile/Teammate';

const Profile = createMaterialTopTabNavigator();
const Detail = createStackNavigator();

const ProfileDetailRoutes = () => (
  <Detail.Navigator screenOptions={{ headerShown: false }}>
    <Profile.Screen name="Team" component={Team} />
    <Detail.Screen name="Teammate" component={Teammate} />
  </Detail.Navigator>
);

const ProfileRoutes = () => (
  <Profile.Navigator tabBarOptions={{ style: { display: 'none' } }}>
    <Profile.Screen name="MyProfile" component={MyProfile} />
    <Detail.Screen name="Detail" component={ProfileDetailRoutes} />
  </Profile.Navigator>
);

export default ProfileRoutes;
