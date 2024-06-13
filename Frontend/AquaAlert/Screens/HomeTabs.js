import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './HomePage'; // Ensure this is the correct path
import Wallet from './Wallet';
import Report from './Report';
import Account from './Account';
// import DrawerNavigator from './Drawer_navigator';
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name="Home" component={HomePage} options={{headerShown: false}} />
      <Tab.Screen name="Profile" component={Wallet} options={{headerShown: false}} />
      <Tab.Screen name="Report" component={Report} options={{headerShown: false}} />
      <Tab.Screen name="Account" component={Account} options={{headerShown: false}} />

    </Tab.Navigator>
  );
};
export default HomeTabs;