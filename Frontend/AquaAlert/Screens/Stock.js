import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
const Stock=()=>{

    return(
        <View style={styles.main}>

        <TouchableOpacity style={styles.btn}><Text>Click on the Button</Text></TouchableOpacity>
        </View>
    )

}
export default Stock;
const styles = StyleSheet.create({

    main:{

        flex:1

    },
    btn:{
        justifyContent:"center",
        alignItems:"center",
        marginTop:"50%"
    }

})