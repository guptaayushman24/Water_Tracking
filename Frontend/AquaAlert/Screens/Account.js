import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { AppContext } from '../Global/APIContext';
const Wallet = () => {
  const [useremail, setuseremail] = useState([]);
  const [bankname, setbankname] = useState([]);
  const [accnumber, setaccnumber] = useState([]);
  const [bankamount, setbankamount] = useState([]);
  const [walletamount,setwalletamount] = useState([]);
  const [index, setindex] = useState(-1);
  const { email } = useContext(AppContext);

  const fetchDetails = async () => {
    try {

      const emailResponse = await axios.get('http://10.0.2.2:5000/bank/bankdetailemailget');
      const bankNameResponse = await axios.get('http://10.0.2.2:5000/bank/bankname');

      const accNumberResponse = await axios.get('http://10.0.2.2:5000/bank/bankdetailget');
      const bankAmountResponse = await axios.get('http://10.0.2.2:5000/bank/bankdetailgetamount');

      const walletAmountResponse = await axios.get('http://10.0.2.2:5000/wallet/walletamountget');

      setwalletamount(walletAmountResponse.data);
      setuseremail(emailResponse.data);
      setbankname(bankNameResponse.data);
      setaccnumber(accNumberResponse.data);
      setbankamount(bankAmountResponse.data);

      console.log("Outside for loop");

      for (let i = 0; i < emailResponse.data.length; i++) {
        if (emailResponse.data[i].signupemail === email) {
          console.log("If inside for loop");
          setindex(i);
          break;
        }
      }


    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  const  bankName = bankname[index] ? bankname[index].bankname : "Loading...";
  const accountNumber = accnumber[index] ? accnumber[index].accountnumber : "Loading...";
  const bankBalance = bankamount[index] ? bankamount[index].amountlength : "Loading...";
  const walletBalance = walletamount[index] ? walletamount[index].amountadded :"Loading...";

  useFocusEffect(
    React.useCallback(() => {
      console.log('HomeScreen is focused');
      fetchDetails();

      return () => {
        console.log('HomeScreen is unfocused');
      };
    }, [index, email])
  );

  return (
    <View style={styles.main}>
      {/* Account Details design on the page */}
      <View style={styles.accountDetails}>
        <Text style={styles.heading}>Account Detail</Text>

        <View style={styles.detailRow}>

          <Text style={styles.detailLabel}>Bank Name:</Text>
          <Text style={styles.detailValue}>{bankName}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Account Number:</Text>
          <Text style={styles.detailValue}>{accountNumber}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Account Holder Email:</Text>
          <Text style={styles.detailValue}>{email}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Balance:</Text>
          <Text style={styles.detailValue}>Rs {bankBalance}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Wallet Balance:</Text>
          <Text style={styles.detailValue}>Rs {walletBalance}</Text>
        </View>
      </View>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
  },
  accountDetails: {
    marginTop: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, // Increased marginBottom for more space between rows
    paddingHorizontal: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 16,
  },
});
