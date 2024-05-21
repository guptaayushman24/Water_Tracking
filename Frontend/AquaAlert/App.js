import { StyleSheet, Text, View } from 'react-native';
import Signup from './Screens/Signup';
import Signin from './Screens/Signin';
import HomePage from './Screens/HomePage';
import Test from './Screens/Test';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (



    <NavigationContainer>
      <Stack.Navigator initialRouteName='SignInScreen'>


        <Stack.Screen name='SignInScreen' component={Signin} options={{headerShown:false}}/>
      <Stack.Screen name='SignUpScreen' component={Signup} options={{headerShown:false}}/>
        <Stack.Screen name='HomePage' component={HomePage} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );


}

const styles = StyleSheet.create({
  container: {

    flex: 1,
  },

});
