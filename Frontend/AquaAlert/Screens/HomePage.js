import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View ,Modal,Pressable,TextInput} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useDeferredValue, useEffect, useState } from 'react';

import Wallet from './Wallet';
import Report from './Report';
import Account from './Account';
import AddMoney from './AddMoney';
import Signin from './Signin';
const HomePage = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const name = route.params;
    console.log("Name in the HomePage",name.user_name);

    const [modalVisible, setModalVisible] = useState(false);


    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <View style={styles.userdetail}>


                <View><Text style={{color:'black',fontWeight:'bold',fontSize:20}}>Hii!</Text></View>
                <View><Text style={{fontWeight:'bold',fontSize:20}}>{name.user_name}</Text></View>

                </View>
            </View>

            <View style={styles.carddesign}>
                <View style={styles.amount}>
                    <Text style={{color:'white',fontSize:18}}>Balance</Text>
                    <Text style={{color:'white',fontSize:22}}>Rs 2000</Text>
                </View>

                <View>
                <View style={styles.cardnumber}>
                    <Text style={{color:'white'}}>1234567892</Text>
                    <Text style={{marginLeft:200,color:'white',fontSize:18}}>Maestro</Text>
                </View>
                </View>
            </View>
            <View style={styles.functionality}>
            <View style={styles.upperbtn}>
                <View style={styles.centeredView}>
                    {/* <TouchableOpacity><Text style={{textAlign:"center",marginTop:10,fontSize:18,color:'white'}}>Add Money</Text></TouchableOpacity> */}
                    {/* <View style={styles.centeredView}> */}
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
            {/* <Text style={styles.modalText}>Hello World!</Text> */}
            <TextInput placeholder='Enter the amount' style={{textAlign:'center'}}></TextInput>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStylesubmit}>PROCEED TO TOPUP</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Add Money</Text>
      </Pressable>

                </View>
                <View style={styles.transfermoney}>
                    <TouchableOpacity><Text style={{textAlign:"center",marginTop:10,fontSize:18,color:'white'}}>Transfer Money</Text></TouchableOpacity>
                </View>
            </View>
            <View style={styles.lowerbtn}>
            <View style={styles.deposit}>
                    <TouchableOpacity onPress={()=>navigation.navigate('AddMoney')}><Text style={{textAlign:"center",marginTop:10,fontSize:18}}>Deposit</Text></TouchableOpacity>
                </View>
                <View style={styles.withdraw}>
                    <TouchableOpacity><Text style={{textAlign:"center",marginTop:10,fontSize:18}}>Withdraw</Text></TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.transactionhistory}></View>
        </View>
    )
}


export default HomePage;

const styles = StyleSheet.create({
    main: {

        flex: 1
    },
    header:{
        flex:0.5,
    },
    carddesign:{
        flex:0.65,
        backgroundColor:'#7b8afe',
        height:200,
        width:400,
        borderRadius:20,
       alignSelf:"center",
       margin:10
    },
    functionality:{
        flex:1,
        // backgroundColor:'blue',
    },
    transactionhistory:{
        flex:1,
        backgroundColor:'orange'
    },
    userdetail:{
        margin:50
    },
    amount:{
        margin:10
    },
    cardnumber:{
        margin:10,
       paddingTop:40,
       flexDirection:'row'
    },
    upperbtn:{
        flex:1,
        // backgroundColor:'red',
        flexDirection:'row',
    },
    lowerbtn:{
        flex:1,
        // backgroundColor:'green',
        flexDirection:'row'
    },
    addmoney:{
        marginVertical:20,
        marginLeft:20,
        backgroundColor:'#7b8afe',
        width:120,
        height:48,
        borderRadius:20,
    },
    transfermoney:{
        marginVertical:20,
        marginLeft:100,
        backgroundColor:'#7b8afe',
        width:150,
        height:48,
        borderRadius:20,
        borderColor:'white',
    },
    deposit:{
        marginVertical:20,
        marginLeft:20,
        backgroundColor:'orange',
        width:120,
        height:48,
        borderRadius:20,
    },
    withdraw:{
        marginVertical:20,
        marginLeft:100,
        backgroundColor:'orange',
        width:150,
        height:48,
        borderRadius:20,
    },
    centeredView: {
        flex: 1,
        alignItems:"center",
        marginTop: 25,
      },
      modalView: {
        marginTop:115,
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
        width:150,
        height:48
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
        fontSize:18,
      },
      textStylesubmit:{
        textAlign:"center",
          marginTop:2,
          color:'white',
          fontWeight:'bold',
          fontSize:13.5
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      }

})