import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Modal, Pressable, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useDeferredValue, useEffect, useState } from 'react';

const Walletsign = () => {
    const route = useRoute();
    const email = route.params.signupemail;
    console.log("Theses is the signup email in wallet",email);
    const [amountlength, setamountlength] = useState('');
    const [amount, setamount] = useState(false);
    const checkdetails = () => {
        if (amountlength.length == 0) {
            setamount(true);
        }

        else {
            setamount(false);
        }

    }

    return (

        <View style={styles.main}>
            {/* Heading View */}
            <View style={styles.upperdesign}>
                <Text style={styles.txt}>Please Enter your Wallet Amount</Text>
            </View>

            <View style={styles.bankdetail}>


                {/* View for the Bank Name */}
                <View style={styles.bankname}>

                    <TextInput
                        placeholder='Enter the email'
                        style={{ fontSize: 20 }}
                        value={email}
                    ></TextInput>
                </View>

                <View style={styles.bankname}>

                    <TextInput
                        placeholder='Enter the Amount'
                        style={{ fontSize: 20 }}
                        onChangeText={(amountlength) => setamountlength(amountlength)}></TextInput>
                </View>

                <View style={styles.warningview}>
                    {
                        amount && (
                            <Text style={styles.warningtxt}>*Minmum amount 0 can be added</Text>
                        )
                    }
                </View>
                <View style={styles.submitbtn}>

                    <TouchableOpacity onPress={checkdetails}>
                        <Text style={styles.submittxt}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Walletsign;
const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#0085e4'
    },
    upperdesign: {
        marginTop: 76,
        marginLeft: 10
    },
    txt: {
        color: 'white',
        fontSize: 26
    },
    bankdetail: {
        flexDirection: 'column'
    },
    bankname: {
        margin: 20,
        borderWidth: 2,
        borderColor: 'white',
        padding: 10,
        borderRadius: 20
    },
    submitbtn: {
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        borderRadius: 20,
    },
    submittxt: {
        color: 'black',
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center"
    },
    warningview: {
        marginLeft: 20
    },
    warningtxt: {
        color: 'red',
        fontSize: 20
    }
})