import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Modal, Pressable, TextInput, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useDeferredValue, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import Wallet from './Wallet';
import Report from './Report';
import Account from './Account';
import AddMoney from './AddMoney';
import Signin from './Signin';

const HomePage = () => {

  const navigation = useNavigation();

  const route = useRoute();
  const isFocused = useIsFocused();



  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleTransfer, setmodalVisibleTransfer] = useState(false);
  const [storeemail, setstoreemail] = useState();
  // Storing the card number in the list
  const [cardnumber, setcardnumber] = useState([]);
  // Storing the index of the card number
  const [index, setindex] = useState(-1);
  // Storing the email address
  const [email, setemail] = useState([]);
  // Storing the amount
  const [amount, setamount] = useState([]);
  const [amountwallet, setamountwallet] = useState('');
  // Storing the wallet amount
  const [walletamountstore, setwalletamountstore] = useState([]);
  // State for updating the amount in wallet
  const [newamount, setnewamount] = useState(0);
  // State for updating the amount in the bank
  const[newbankamout,setnewbankamount] = useState('');

  // Email address of the reciever
  const [senderemailinput,setsenderemailinput] = useState('');
  // Storing the amount which we want to transfer from wallet
  const [transferamount,settransferamount] = useState(0);

  // Storing the sender address
  const [senderaddress,setsenderaddress] = useState('');
  // Storing the Home Page email
  const [homepageemail,sethomepageemail] = useState('');
  // Creating the component for the API
  const fetchdetail = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5000/bank/bankdetailemailget');
      setstoreemail(response.data);
      console.log("Email fetched in the homepage", response.data);
    }
    catch (err) {
      console.log(err);
    }

    // Fetching the cardnumber
    try {
      const response = await axios.get('http://10.0.2.2:5000/bank/bankdetailcardnumberget');
      setcardnumber(response.data);
      for (let i = 0; i < cardnumber.length; i++) {
        if (cardnumber[i].cardnumber.toString() === route.params.cardnumber.cardnumber.toString()) {
          setindex(i);
          break;
        }
      }

    }
    catch (err) {
      console.log(err);
    }
    // Fetching the email
    try {
      const response = await axios.get('http://10.0.2.2:5000/bank/bankdetailemailget');
      setemail(response.data);
      // console.log(response.data);
      console.log("Email on the particular index is", email[index].signupemail);
    }
    catch (err) {
      console.log(err);
    }

    // Fetching the amount
    try {
      const response = await axios.get('http://10.0.2.2:5000/bank/bankdetailgetamount');
      setamount(response.data);
      console.log(response.data);
      console.log("Amount on the particular index is", amount[index].amountlength)
      // console.log("Amount on the particular index is",typeof amount[index].amountlength)
    }
    catch (err) {
      console.log(err);
    }

    // Fetching the wallet amount
    try {
      const response = await axios.get('http://10.0.2.2:5000/wallet/walletamountget');
      console.log(response.data);
      setwalletamountstore(response.data);
    }
    catch (err) {
      console.log(err);
    }

    console.log("The amount in the wallet on the index is", walletamountstore[index].amountadded);
    console.log("The amount which we want to submit", parseInt(amountwallet));

    let temp = 0;
    if (amount[index].amountlength >= parseInt(amountwallet)) {
      setnewamount(walletamountstore[index].amountadded + parseInt(amountwallet));
      console.log("The new amount is ",newamount);
      console.log("The new email is",email[index].signupemail);
      try {
        await axios.put('http://10.0.2.2:5000/wallet/walletupdate', {
          email: email[index].signupemail,
          amountadded: newamount
        })
      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      console.log("Insufficent Amount");
      temp = 1
    }
    // We can update the amount in the bank
    if (temp != 1) {
      try {
         setnewbankamount(amount[index].amountlength-parseInt(amountwallet));
         console.log("Updated amount in bank",amount[index].amountlength-parseInt(amountwallet));
        await axios.put('http://10.0.2.2:5000/bank/bankdetailupdatemail',{
          signupemail:email[index].signupemail,
          amountlength:newbankamout
        });

      }
      catch (err) {
        consol.log(err);
      }
    }
  }
  useEffect(() => {
    if (isFocused){
      console.log(isFocused);
      fetchdetail();
    }
  }, [index, newamount,newbankamout,isFocused]);

  // Creatig the function for the Transfer Money


  const closemodal = async () => {
    // Alert.alert('Top-up with', amountwallet);
     await fetchdetail();
    setModalVisible(!modalVisible);
  };

  const walletdata=async()=>{
    console.log("Transfer Button is Pressed");
    // First Fetch the email address of the Homepage
    console.log("Email address on the HomePage is",email[index].signupemail);
    try{
      const  amountadded = walletamountstore[index].amountadded; // Number
      // console.log("Amount", amountadded+101);

      await axios.get('http://10.0.2.2:5000/wallet/walletemailget');
      // if ()
    }
    catch(err){
      console.log(err);
    }
  }
  const closemodalTransfer = async () => {
    await walletdata();
    console.log('Transfer button is pressed')


    setmodalVisibleTransfer(!modalVisibleTransfer);
  };

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <View style={styles.userdetail}>
          <View><Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Hii!</Text></View>
          <View><Text style={{ fontWeight: 'bold', fontSize: 20 }}>{route.params.user_name}</Text></View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.carddesign}>
          <View style={styles.amount}>
            <Text style={{ color: 'white', fontSize: 18 }}>Balance</Text>
            <Text style={{ color: 'white', fontSize: 22 }}>Rs {newbankamout}</Text>
          </View>
          <View style={styles.amount}>
            <Text style={{ color: 'white', fontSize: 18 }}>Wallet Amount</Text>
            <Text style={{ color: 'white', fontSize: 18 }}>Rs {newamount}</Text>
          </View>
        </View>
        <View>
          <View style={styles.cardnumber}>
            <Text style={{ color: 'white' }}>{route.params.cardnumber.cardnumber}</Text>
            <Text style={{ marginLeft: 200, color: 'white', fontSize: 15 }}>Maestro</Text>
          </View>
        </View>
      </View>
      <View style={styles.functionality}>
        <View style={styles.container1}>
          <View style={styles.upperbtn}>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.textStyle}>Add Money</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setmodalVisibleTransfer(true)}>
              <Text style={styles.textStyle}>Transfer Money</Text>
            </Pressable>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TextInput
                  placeholder='Enter the amount'
                  style={{ textAlign: 'center' }}
                  onChangeText={(amountwallet) => setamountwallet(amountwallet)}
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={closemodal}>
                  <Text style={styles.textStylesubmit}>PROCEED TO TOPUP</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleTransfer}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setmodalVisibleTransfer(!modalVisibleTransfer);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <TextInput placeholder='Enter sender email' style={{textAlign:'center',fontSize:20}}
              onChangeText={(senderemailinput)=>setsenderemailinput(senderemailinput)}></TextInput>
                <TextInput
                  placeholder='Enter transfer amount'
                  style={{ textAlign: 'center',fontSize:20 }}
                  onChangeText={(transferamount) => settransferamount(transferamount)}
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={closemodalTransfer}>
                  <Text style={styles.textStylesubmit}>PROCEED TO TRANSFER</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.lowerbtn}>
          <View style={styles.deposit}>
            <TouchableOpacity onPress={() => navigation.navigate('AddMoney')}>
              <Text style={{ textAlign: "center", marginTop: 10, fontSize: 18 }}>Deposit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.withdraw}>
            <TouchableOpacity>
              <Text style={{ textAlign: "center", marginTop: 10, fontSize: 18 }}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.transactionhistory}></View>
    </View>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    flex: 0.5,
  },
  functionality: {
    flex: 1,
  },
  transactionhistory: {
    flex: 1,
    backgroundColor: 'orange'
  },
  userdetail: {
    margin: 50
  },
  upperbtn: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distributes space between buttons
    width: '100%',
    padding: 20,
  },
  lowerbtn: {
    flex: 1,
    flexDirection: 'row'
  },
  addmoney: {
    marginVertical: 20,
    marginLeft: 20,
    backgroundColor: '#7b8afe',
    width: 120,
    height: 48,
    borderRadius: 20,
  },
  transfermoney: {
    marginVertical: 20,
    marginLeft: 100,
    backgroundColor: '#7b8afe',
    width: 150,
    height: 48,
    borderRadius: 20,
    borderColor: 'white',
  },
  deposit: {
    marginVertical: 20,
    marginLeft: 20,
    backgroundColor: 'orange',
    width: 120,
    height: 48,
    borderRadius: 20,
  },
  withdraw: {
    marginVertical: 20,
    marginLeft: 100,
    backgroundColor: 'orange',
    width: 150,
    height: 48,
    borderRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#7b8afe',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  textStylesubmit: {
    textAlign: "center",
    marginTop: 2,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13.5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7b8afe',
    borderRadius: 20,
    margin: 5,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#7b8afe',
    borderRadius: 20,
    margin: 5,
  },
  carddesign: {
    flex: 0.65,
    backgroundColor: '#7b8afe',
    height: 200,
    width: 400,
    borderRadius: 20,
    alignSelf: "center",
    margin: 10,
    flexDirection: 'row', // Makes the content inside horizontal
    justifyContent: 'space-around', // Spacing out the items evenly
    alignItems: 'center' // Center the items vertically
  },
  amount: {
    margin: 10,
    // backgroundColor: 'red',
    padding: 10, // Optional: add padding for better spacing
    borderRadius: 10, // Optional: add border radius for rounded corners
  },
  cardnumber: {
    margin: 10,
    paddingTop: 40,
    flexDirection: 'row'
  }
});