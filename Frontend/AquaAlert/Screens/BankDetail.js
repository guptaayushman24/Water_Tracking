import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const BankDetail = () => {
    const route = useRoute();
    const signupemail = route.params.email
    console.log(signupemail);
    // Storing the bank name in the variable
    const [bankname, setbankname] = useState('');

    // Storing the bank account number in the variable
    const [accountnumber, setaccountnumber] = useState('');


    // Storing the email  in the variable

    const [email, setemail] = useState('');
    // setemail(route.params.email);


    // State for showing the warning related to bank name
    const [validbankname, setvalidbankname] = useState(false);

    // State for checking the accountnumber is enterd or not
    const [accountnumberlength, setaccountnumberlength] = useState(false);

    // State for checking the accountnumber is valid or not
    const [validaccountnumber, setvalidaccountnumber] = useState(false);


    const [amountlength, setamountlength] = useState('');
    const [amount, setamount] = useState(false);

    const [validamount,setvalidamount] = useState(false);


    let temp1 = 0;
    let temp2 = 0;
    let temp3 = 0;
    let temp4 = 0;
    useEffect(() => {
        const Detail = async () => {
            try {
                const respones = await axios.get('http://10.0.2.2:5000/signup/usersignupdetail');
                setstoredata(respones.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        Detail();
    }, [])
    const checkdetails = () => {
        if (bankname.length == 0) {

            setvalidbankname(true);
        }
        else {
            setvalidbankname(false);
            temp1 = 1;
        }

        if (accountnumber.length == 0) {
            setaccountnumberlength(true);
            console.log('Enter the account number');
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

        // var validRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
        // if (validRegex.test(email)) {
        //     setvalidemail(false);
        // }
        // else {
        //     setvalidemail(true);
        // }

        if (amountlength.length == 0) {
            setamount(true);
            console.log(amount.length);
        }
        else {
            console.log('Hello')
            setamount(false);

        }

        if (parseInt(amountlength)>=100 && parseInt(amountlength)<=50000){
            console.log(parseInt(amountlength));
            setvalidamount(false);
            temp4=1;
        }
        else{
            setvalidamount(true);
        }

        // const isMatch = storedata.some(detail => detail.email === email);
        // setmatchfound(isMatch);
        // console.log(storedata);

        if (temp1 == 1 && temp2 == 1 && temp4==1) {
            try {
                const response = axios.post('http://10.0.2.2:5000/bank/bankdetail', {
                    bankname,
                    accountnumber,
                    signupemail,
                    amountlength
                });
                console.log(response.data);
                console.log(amount);
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <View style={styles.main}>
            {/* Heading View */}
            <View style={styles.upperdesign}>
                <Text style={styles.txt}>Please Enter your Bank Details</Text>
            </View>

            {/* View for the bank details */}
            <View style={styles.bankdetail}>


                {/* View for the Bank Name */}
                <View style={styles.bankname}>

                    <TextInput
                        placeholder='Enter the Bank Name'
                        style={{ fontSize: 20 }}
                        onChangeText={(bankname) => setbankname(bankname)}></TextInput>
                </View>

                {/* View for displaying the bank name warning */}
                <View style={styles.warningview}>
                    {
                        validbankname && (
                            <Text style={styles.warningtxt}>*Please enter the bank name</Text>
                        )
                    }
                </View>

                {/* View for the Account Number */}
                <View style={styles.bankname}>

                    <TextInput
                        placeholder='Enter the Account Number'
                        style={{ fontSize: 20 }}
                        onChangeText={(accountnumber) => setaccountnumber(accountnumber)}></TextInput>
                </View>

                {/* View for displaying the bank account number warning */}
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

                {/* View for the Account Holder email */}
                <View style={styles.bankname}>

                    <TextInput
                        placeholder='Enter the Account Holder Email'
                        style={{ fontSize: 20 }}
                        value={route.params.email}
                       ></TextInput>
                </View>

                {/* View for displaying the email warning */}
                {/* <View style={styles.warningview}>
                    {
                        emaillength && (
                            <Text style={styles.warningtxt}>*Please enter the email</Text>
                        )
                    }
                    {
                        !emaillength && validemail && (
                            <Text style={styles.warningtxt}>*Please enter the valid email</Text>
                        )
                    }
                </View> */}

                <View style={styles.bankname}>

                    <TextInput
                        placeholder='Enter the Amount'
                        style={{ fontSize: 20 }}
                        onChangeText={(amountlength) => setamountlength(amountlength)}></TextInput>
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

                {/* Button for submtting the bank detail*/}
                <View style={styles.submitbtn}>

                    <TouchableOpacity onPress={checkdetails}>
                        <Text style={styles.submittxt}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default BankDetail;
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