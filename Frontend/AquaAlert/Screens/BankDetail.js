import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios';

const BankDetail = ()=>{
    return(
        <View style={styles.main}>
            {/* Heading View */}
           <View style={styles.upperdesign}>
            <Text style={styles.txt}>Please Enter your Banking Detail</Text>
           </View>

            {/* View for the bank details */}
           <View style={styles.bankdetail}>


            {/* View for the Bank Name */}
            <View style={styles.bankname}>

                <TextInput
                placeholder='Enter the Bank Name'
                style={{fontSize:20}}></TextInput>
            </View>

            {/* View for the Account Number */}
            <View style={styles.bankname}>

                <TextInput
                placeholder='Enter the Account Number'
                style={{fontSize:20}}></TextInput>
            </View>

            {/* View for the Account Holder email */}
            <View style={styles.bankname}>

                <TextInput
                placeholder='Enter the Account Holder Email'
                style={{fontSize:20}}></TextInput>
            </View>

            {/* Button for submtting the bank detail*/}
            <View style={styles.submitbtn}>

                <TouchableOpacity>
                    <Text style={styles.submittxt}>Submit</Text>
                </TouchableOpacity>
            </View>

           </View>
        </View>
    )
}
export default BankDetail;
const styles = StyleSheet.create({
    main:{
        flex:1,

        backgroundColor:'#0085e4'
    },
    upperdesign: {
        marginTop: 76,
        marginLeft: 10
    },
    txt:{
        color: 'white',
        fontSize: 26
    },
    bankdetail:{
        flexDirection:'column'
    },
    bankname:{
        margin:20,
        borderWidth:2,
        borderColor:'white',
        padding:10,
        borderRadius:20
    },
    submitbtn:{
        backgroundColor:'white',
        margin:20,
        padding:10,
        borderRadius:20,
    },
    submittxt:{
        color:'black',
        fontWeight:"bold",
        fontSize:20,
        textAlign:"center"
    }
})