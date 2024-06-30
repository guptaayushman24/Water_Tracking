import { SafeAreaView, StyleSheet, Text, View ,Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
const Report=()=>{
    return(
        <View style={styles.main}>
            <View styele={styles.send}>
                <Text>Amount Send By The User</Text>
            </View>
        </View>
    )

}
export default Report;
const styles = StyleSheet.create({
    main:{

        flex:1

    },
    send:{
        flex:1,
        alignItems:"center"
    }

})