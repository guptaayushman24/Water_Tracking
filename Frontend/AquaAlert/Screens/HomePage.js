import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Wallet from './Wallet';
import Report from './Report';
import Account from './Account';
const Tab = createBottomTabNavigator();
const HomePage = () => {
    return (
        <View style={styles.main}>

        </View>
    )

}
export default HomePage;

const styles = StyleSheet.create({
    main: {

        flex: 1
    }

})