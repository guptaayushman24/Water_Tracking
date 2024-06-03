import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from '../Screens/HomePage';
import AddMoney from '../Screens/AddMoney';
const DrawerNavigator = createDrawerNavigator();
const Drawer = ()=>{
    return(
        <DrawerNavigator.Navigator initialRouteName='HomePage'>
            <DrawerNavigator.Screen name='HomePage' component={HomePage} options={{headerShown:false}}></DrawerNavigator.Screen>
            <DrawerNavigator.Screen name='AddMoney' component={AddMoney} options={{headerShown:false}}></DrawerNavigator.Screen>
        </DrawerNavigator.Navigator>

    )
}
export default Drawer;