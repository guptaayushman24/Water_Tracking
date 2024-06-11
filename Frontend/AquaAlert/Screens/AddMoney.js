import { useDeferredValue, useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

const AddMoney = () => {
  const [accountnumber, setaccountnumber] = useState('');
  const [accountnumberlength, setaccountnumberlength] = useState(false);
  const [validaccountnumber, setvalidaccountnumber] = useState(false);
  const [amountlength, setamountlength] = useState('');
  const [amount, setamount] = useState(false);
  const [validamount, setvalidamount] = useState(false);
  const [fetchbankdetail, setfetchbankdetail] = useState([]);
  const [fetchamount, setfetchamount] = useState([]);
  const [match, setmatch] = useState(false);
  const [curramount, setcurramount] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get('http://10.0.2.2:5000/bank/bankdetailget');
        setfetchbankdetail(response1.data);
      } catch (err) {
        console.log(err);
      }

      try {
        const response2 = await axios.get('http://10.0.2.2:5000/bank/bankdetailgetamount');
        setfetchamount(response2.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  let new_index = -1;
  let new_amount = 0;
  useEffect(()=>{
    for (let i = 0; i < fetchbankdetail.length; i++) {
      if (accountnumber.toString() === fetchbankdetail[i].accountnumber.toString()) {
        new_index = i;
        setmatch(true);
        break;
      }
      else{
        setmatch(false);
      }
    }


    if (new_index !== -1) {
      new_amount = fetchamount[new_index].amountlength + parseInt(amountlength);
      setcurramount(new_amount);
    }
  })


  const checkdetails = async () => {
    if (amountlength.length === 0) {
      setamount(true);
    } else {
      setamount(false);
    }

    if (parseInt(amountlength) >= 100 && parseInt(amountlength) <= 50000) {
      setvalidamount(false);
    } else {
      setvalidamount(true);
    }

    if (accountnumber.length === 0) {
      setaccountnumberlength(true);
    } else {
      setaccountnumberlength(false);
    }

    let flag = 0;
    for (let i = 0; i < accountnumber.length; i++) {
      if (accountnumber.charAt(i) >= '0' && accountnumber.charAt(i) <= '9' && accountnumber.length >= 9 && accountnumber.length <= 18) {
        continue;
      } else {
        flag = 1;
        break;
      }
    }

    if (flag === 1) {
      setvalidaccountnumber(true);
    } else {
      setvalidaccountnumber(false);
    }

    try {
      if (match && new_index !== -1) {
        await axios.put('http://10.0.2.2:5000/bank/bankdetailupdate', {
          accountnumber,
          amountlength: new_amount
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(curramount);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.upperdesign}>
        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontSize: 20, color: 'white' }}>Deposit Money into Bank</Text>
        </View>
        <View style={styles.bankname}>
          <TextInput
            placeholder='Enter the Account Number'
            style={{ fontSize: 20 }}
            onChangeText={(accountnumber) => setaccountnumber(accountnumber)}
          />
        </View>
        <View style={styles.warningview}>
          {accountnumberlength && <Text style={styles.warningtxt}>*Please enter the account number</Text>}
          {!accountnumberlength && validaccountnumber && <Text style={styles.warningtxt}>*Please enter a valid account number</Text>}
        </View>

        <View style={styles.bankname}>
          <TextInput
            placeholder='Enter the Amount'
            style={{ fontSize: 20 }}
            onChangeText={(amountlength) => setamountlength(amountlength)}
          />
        </View>
        <View style={styles.warningview}>
          {amount && <Text style={styles.warningtxt}>*Please enter the amount</Text>}
          {!amount && validamount && <Text style={{ color: 'red', fontSize: 15 }}>*Please enter the amount between Rs100 and Rs50000</Text>}
        </View>
      </View>

      <View style={styles.submitbtn}>
        <TouchableOpacity onPress={checkdetails}>
          <Text style={styles.submittxt}>Add Money</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.warningview}>
        {/* {
          match && !accountnumberlength && !amountlength && (
            <Text style={styles.warningtxt}>*Account does not exist</Text>
          )
        } */}
      </View>
    </SafeAreaView>
  );
};

export default AddMoney;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#0085e4',
  },
  upperdesign: {
    marginTop: 76,
    marginLeft: 10,
  },
  txt: {
    color: 'white',
    fontSize: 24,
  },
  header: {
    flexDirection: 'column',
  },
  bankname: {
    margin: 20,
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
  warningview: {
    marginLeft: 20,
  },
  warningtxt: {
    color: 'red',
    fontSize: 20,
  },
  submittxt: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  submitbtn: {
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    borderRadius: 20,
  },
});