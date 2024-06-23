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
  // Storing all the address of wallet
  const [walletaddress,setwalletaddress] = useState([]);
  // Storing the Home Page email
  const [homepageemail,sethomepageemail] = useState('');
  // Index of the reciever
  const [recieverindex,setrecieverindex] = useState(-1);
  // Index of the sender
  const[senderindex,setsenderindex] = useState(-1);

  // Storing the amount of the Home Page user wallet of particular index
  const [walletamountindexhomepage,setwalletamountindexhomepage] = useState(0);
  // Storing all the emails of the wallet
  const [walletemail,setwalletemail] = useState([]);

  // Updating the wallet amount of the sender
  const [senderamount,setsenderamount] = useState(0);

  // Updating the wallet amount of the reciever
  const [recieveramount,setrecieveramount] = useState(0);

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

  const walletdatasender=async()=>{
    // Use the seperate API do not use the above API
    // Fetch all the email address of the wallet
    try{
      const response = await axios.get('http://10.0.2.2:5000/wallet/walletemailget');
      setwalletaddress(response.data);
      for (let i=0;i<walletaddress.length;i++){
        if (walletaddress[i].email.toString()===senderemailinput){
           setrecieverindex(i);
        }
      }
    }
    catch(err){
      console.log(err);
    }
    console.log("The reciever index is",recieverindex);



    // Fetching all the cardnumbers
    try {
      const response = await axios.get('http://10.0.2.2:5000/bank/bankdetailcardnumberget');
      setcardnumber(response.data);
      for (let i = 0; i < cardnumber.length; i++) {
        if (cardnumber[i].cardnumber.toString() === route.params.cardnumber.cardnumber.toString()) {
          setsenderindex(i);
          break;
        }
      }
      console.log("Sender index is",senderindex);

    }
    catch (err) {
      console.log(err);
    }

     // Fetch all the wallet amount
     try {
      const response = await axios.get('http://10.0.2.2:5000/wallet/walletamountget');
      console.log(response.data);
      setwalletamountstore(response.data);
      console.log("The amount of the HomePage user is",walletamountstore[senderindex]);
      console.log("The amount of the Reciever user is",walletamountstore[recieverindex]);
    }
    catch (err) {
      console.log(err);
    }
    // Fetching all the email address from the wallet
    try{
      const walletemailresponse = await axios.get('http://10.0.2.2:5000/wallet/walletemailget');
      console.log(walletemailresponse.data);
      setwalletemail(walletemailresponse.data);

      for (let i=0;i<walletemail.length;i++){
        console.log(walletemail[i].email);
      }
    }
    catch(err){
      console.log(err)
    }
    // Updating the amount in the wallet of the sender
    const newsenderamount = walletamountstore[senderindex].amountadded-transferamount;
    setsenderamount(newsenderamount);
    const newrecieveramount = walletamountstore[recieverindex].amountadded+parseInt(transferamount);
    setrecieveramount(newrecieveramount);
    console.log("Recieveramount is",newrecieveramount);
    console.log("The new amount of the sender is",newsenderamount);
    console.log("The transfer amount is",transferamount);
    console.log("The email adrress of sender is",walletemail[senderindex].email);
    console.log("The email adrress of reciever is",walletemail[recieverindex].email);
    if (newsenderamount>=0){
      try{
        await axios.put('http://10.0.2.2:5000/wallet/walletupdatesender',{
          email:walletemail[senderindex].email,
          amountadded:senderamount
        })
      }
      catch(err){
        console.log(err);
      }


      try{
        await axios.put('http://10.0.2.2:5000/wallet/walletupdatereciever',{
          email:walletemail[recieverindex].email,
          amountadded:newrecieveramount
        })
      }
      catch(err){
        console.log(err);
      }

    }




  }
  useEffect(()=>{
    walletdatasender();
  },[recieverindex,senderindex,senderamount]); // senderamount,recieveramount
  const closemodalTransfer = async () => {
    await walletdatasender();
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
              <TextInput placeholder='Enter reciever email' style={{textAlign:'center',fontSize:20}}
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