import { StyleSheet, Text, View } from 'react-native';
import Signup from './Screens/Signup';
import Signin from './Screens/Signin';
import Test from './Screens/Test';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    // <Signup>

    // </Signup>

    // <Signin></Signin>
    <Test></Test>
  );

}

const styles = StyleSheet.create({
  container: {

    flex: 1,
  },

});
