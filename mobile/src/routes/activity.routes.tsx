import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { ActivityProvider } from '../hooks/activity';

import MyActivities from '../pages/Activities/MyActivities';
import AllActivities from '../pages/Activities/AllActivities';
import ActivityDetails from '../pages/Activities/ActivityDetails';
import CityDetails from '../pages/Cities/CityDetails';
import Teammate from '../pages/Profile/Teammate';

const Activity = createMaterialTopTabNavigator();
const Detail = createStackNavigator();

const MyActivityDetailsRoutes = () => (
  <Detail.Navigator screenOptions={{ headerShown: false }}>
    <Detail.Screen name="List" component={MyActivities} />
    <Detail.Screen name="Details" component={ActivityDetails} />
    <Detail.Screen name="ActivityCities" component={CityDetails} />
    <Detail.Screen name="ActivityUser" component={Teammate} />
  </Detail.Navigator>
);

const AllActivityDetailsRoutes = () => (
  <Detail.Navigator screenOptions={{ headerShown: false }}>
    <Detail.Screen name="List" component={AllActivities} />
    <Detail.Screen name="Details" component={ActivityDetails} />
  </Detail.Navigator>
);

const ActivityRoutes = () => (
  <ActivityProvider>
    <Activity.Navigator tabBarOptions={{ style: { display: 'none' } }}>
      <Detail.Screen name="MyActivities" component={MyActivityDetailsRoutes} />
      <Detail.Screen
        name="AllActivities"
        component={AllActivityDetailsRoutes}
      />
    </Activity.Navigator>
  </ActivityProvider>
);

export default ActivityRoutes;
