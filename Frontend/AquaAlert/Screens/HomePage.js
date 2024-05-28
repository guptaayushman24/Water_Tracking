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
            <View style={styles.header}>
                <View style={styles.userdetail}>
                <View><Text>Good Morning!</Text></View>
                <View><Text style={{fontWeight:'bold',fontSize:18}}>abcde efgh</Text></View>
                </View>
            </View>

            <View style={styles.carddesign}>
                <View style={styles.amount}>
                    <Text style={{color:'white',fontSize:18}}>Balance</Text>
                    <Text style={{color:'white',fontSize:22}}>Rs 2000</Text>
                </View>



                <View style={styles.cardnumber}>
                    <Text style={{color:'white'}}>1234567892</Text>
                </View>
            </View>
            <View style={styles.functionality}></View>
            <View style={styles.transactionhistory}></View>
        </View>
    )

}
export default HomePage;

const styles = StyleSheet.create({
    main: {

        flex: 1
    },
    header:{
        flex:0.5,
    },
    carddesign:{
        flex:0.65,
        backgroundColor:'#7b8afe',
        height:200,
        width:400,
        borderRadius:20,
       alignSelf:"center",
       margin:10
    },
    functionality:{
        flex:1,
        backgroundColor:'blue',
    },
    transactionhistory:{
        flex:1,
        backgroundColor:'orange'
    },
    userdetail:{
        margin:50
    },
    amount:{
        margin:10
    },
    cardnumber:{
        margin:10,
       paddingTop:40


    }

})