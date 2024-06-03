import { useEffect, useState } from 'react';
import axios from 'axios'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
const AddMoney = () => {

    const [accountnumber, setaccountnumber] = useState('');

    const [accountnumberlength, setaccountnumberlength] = useState(false);



    const [validaccountnumber, setvalidaccountnumber] = useState(false);

    const [amountlength, setamountlength] = useState('');

    const [amount, setamount] = useState(false);

    const [validamount, setvalidamount] = useState(false);

    const [fetchbankdetail,setfetchbankdetail] = useState([]);

    const [bankname, setBankname] = useState('');
    const checkdetails = async () => {
        if (amountlength.length == 0) {
            setamount(true);
            console.log(amount.length);
        }
        else {
            console.log('Hello')
            setamount(false);

        }

        if (parseInt(amountlength) >= 100 && parseInt(amountlength) <= 50000) {
            console.log(parseInt(amountlength));
            setvalidamount(false);
        }
        else {
            setvalidamount(true);
        }

        if (accountnumber.length == 0) {
            setaccountnumberlength(true);

        }
        else {
            setaccountnumberlength(false);
            temp2 = 1;
        }

        var flag = 0;
        for (var i = 0; i < accountnumber.length; i++) {
            if (accountnumber.charAt(i) >= '0' && accountnumber.charAt(i) <= '9' && accountnumber.length >= 9 && accountnumber.length <= 18) {
                continue;
            }
            else {
                flag = 1;
                break;
            }
        }
        if (flag == 1) {
            setvalidaccountnumber(true);
        }
        else {
            setvalidaccountnumber(false);
        }

        if (amountlength.length == 0) {
            setamount(true);
            console.log(amount.length);
        }
        else {
            console.log('Hello')
            setamount(false);

        }

        if (parseInt(amountlength) >= 100 && parseInt(amountlength) <= 50000) {
            console.log(parseInt(amountlength));
            setvalidamount(false);
            temp4 = 1;
        }
        else {
            setvalidamount(true);
        }

        // Adding the money on the basis of the account number
        let sum = 0;
        // async function data(){
            try{
                const response =  await axios.get('http://10.0.2.2:5000/bank/bankdetailget');
                setfetchbankdetail(response.data);
                console.log(fetchbankdetail);
            }
            catch(err){
                console.log(err);
            }
        // }


        // Iterating on the fetchbankdetail list
        fetchbankdetail.forEach();

        }
    return (
        <View style={styles.main}>
            {/* Heading View */}

            <View style={styles.upperdesign}>
                <View style={{marginLeft:20}}>
                <Text style ={{fontSize:20,color:'white'}}>Deposit Money into Bank</Text>
                </View>
                <View style={styles.bankname}>

                    <TextInput
                        placeholder='Enter the Account Number'
                        style={{ fontSize: 20 }}
                        onChangeText={(accountnumber) => setaccountnumber(accountnumber)}
                    ></TextInput>
                </View>
                <View style={styles.warningview}>
                    {
                        accountnumberlength && (
                            <Text style={styles.warningtxt}>*Please enter the account number</Text>
                        )
                    }
                    {
                        !accountnumberlength && validaccountnumber && (
                            <Text style={styles.warningtxt}>*Please the valid account number</Text>
                        )
                    }
                </View>

                <View style={styles.bankname}>

                    <TextInput
                        placeholder='Enter the Amount'
                        style={{ fontSize: 20 }}
                        onChangeText={(amountlength) => setamountlength(amountlength)}
                    ></TextInput>
                </View>



                <View style={styles.warningview}>
                    {
                        amount && (
                            <Text style={styles.warningtxt}>*Please enter the amount</Text>
                        )
                    }
                    {
                        !amount && validamount && (
                            <Text style={{ color: 'red', fontSize: 15 }}>*Please enter the amount between Rs100 and Rs50000</Text>
                        )
                    }
                </View>
            </View>


            <View style={styles.submitbtn}>

                <TouchableOpacity onPress={checkdetails}>
                    <Text style={styles.submittxt}>Add Money</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default AddMoney;
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
        fontSize: 24
    },
    header: {
        flexDirection: 'column'
    },
    bankname: {
        margin: 20,
        borderWidth: 2,
        borderColor: 'white',
        padding: 10,
        borderRadius: 20
    },
    warningview: {
        marginLeft: 20
    },
    warningtxt: {
        color: 'red',
        fontSize: 20
    },
    submittxt: {
        color: 'black',
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center"
    },
    submitbtn: {
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        borderRadius: 20,
    },
})