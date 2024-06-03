import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Signup from './Screens/Signup';
import Signin from './Screens/Signin';
import Test from './Screens/Test';
import {DrawerRouter, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './Screens/HomePage';
import Account from './Screens/Account';
import Wallet from './Screens/Account';
import Report from './Screens/Account';
import BankDetail from './Screens/BankDetail'
import AddMoney from './Screens/AddMoney';
import Drawer from './component/DrawerNavigation';
export default function App() {
  const Stack = createNativeStackNavigator();


  const Tab = createBottomTabNavigator();
  // function HomeTabs() {

  //   return (

  //    <Tab.Navigator>
  //       <Tab.Screen name="Home" component={Drawer} options={{headerShown:false}}></Tab.Screen>
  //       <Tab.Screen name="Profile" component={Wallet} options={{headerShown:false}} />
  //       <Tab.Screen name="Report" component={Report} options={{headerShown:false}}/>
  //       <Tab.Screen name="Account" component={Account} options={{headerShown:false}} />
  //     </Tab.Navigator>
  //   );
  // }
  return (



  //   <NavigationContainer>

  //     <Stack.Navigator initialRouteName='SignInScreen'>


  //      <Stack.Screen name='SignInScreen' component={Signin} options={{headerShown:false}}/>
  //     <Stack.Screen name='SignUpScreen' component={Signup} options={{headerShown:false}}/>
  //       <Stack.Screen name='HomePage' component={HomeTabs} options={{headerShown:false}}/>
  //       <Stack.Screen name='BankDetail' component={BankDetail} options={{headerShown:false}}/>
  //     </Stack.Navigator>


  //   </NavigationContainer>
    // <HomePage></HomePage>
    // <Signup></Signup>
    // <Signin></Signin>
    // <BankDetail></BankDetail>
    <AddMoney></AddMoney>


)};

const styles = StyleSheet.create({
  container: {

    flex: 1,
  },
});