import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Modal, Pressable, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useDeferredValue, useEffect, useState } from 'react';
import axios from 'axios';
const Walletsign = () => {
    const [storeemail, setstoreemail] = useState([]);
    const [storeamount, setstoreamount] = useState([]);
    const [index, setindex] = useState(-1);
    const [updateamount,setupdateamount] = useState('');
    const route = useRoute();
    const email = route.params.signupemail;
    console.log("Theses is the signup email in wallet", email);
    const [amountlength, setamountlength] = useState(0);
    const [amount, setamount] = useState(false);


        const fetchdata = async () => {
            try {
                const responeseemail = await axios.get('http://10.0.2.2:5000/bank/bankdetailemailget');
                setstoreemail(responeseemail.data);
                console.log(responeseemail.data); // logging fetched data instead of state
            } catch (err) {
                console.log(err);
            }

            try {
                const responseamount = await axios.get('http://10.0.2.2:5000/bank/bankdetailgetamount');
                setstoreamount(responseamount.data);
                console.log(responseamount.data); // logging fetched data instead of state
            } catch (err) {
                console.log(err);
            }

            for (var i = 0; i < storeemail.length; i++) {
                console.log("Inside for loop");
                if (email === storeemail[i].signupemail.toString()) {
                    console.log("Inside if inside for loop")
                    setindex(i);
                    console.log(email);
                    break;
                }
            }
            if (index!=-1){
                console.log("The amount associated with the email is",storeamount[index].amountlength);
            }
            // Adding the amount in the wallet if the amount is valid
            // var newamount = -1;
            if (storeamount[index].amountlength>=amountlength){
                const newamount = storeamount[index].amountlength-amountlength;
                setupdateamount(newamount);
                console.log("New amount just above try",updateamount);
                try{
                    const response = await axios.post('http://10.0.2.2:5000/wallet/walletpost',{
                        email,
                        amountadded:amountlength
                    })
                    console.log("Data",response.data);
                }
                catch(err){
                    console.log(err);
                }
            }
            console.log(amountlength);

        };
        useEffect(()=>{
            fetchdata();
        },[]);
    const checkdetails = async () => {
        if (amountlength.length == 0) {
            setamount(true);
        }
        else {
            setamount(false);
            await fetchdata();
        }

    }
    console.log("Index", index);



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