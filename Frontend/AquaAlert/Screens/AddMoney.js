import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
const AddMoney = () => {
    const [amountlength, setamountlength] = useState('');
    const [amount, setamount] = useState(false);

    const [validamount,setvalidamount] = useState(false);

    const checkdetails = () => {
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
        }
        else{
            setvalidamount(true);
        }
        // console.log(parseInt(amountlength)+2);
    }
    return (
        <View style={styles.main}>
            {/* Heading View */}

            <View style={styles.upperdesign}>

                <Text style={styles.txt}>Amount to be deposited in the Bank</Text>
            </View>

            <View style={styles.header}>
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
                             <Text style={{color:'red',fontSize:15}}>*Please enter the amount between Rs100 and Rs50000</Text>
                        )
                    }
                </View>

                <View style={styles.submitbtn}>

                    <TouchableOpacity onPress={checkdetails}>
                        <Text style={styles.submittxt}>Add Money</Text>
                    </TouchableOpacity>
                </View>
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