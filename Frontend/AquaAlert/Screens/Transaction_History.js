import React,{useContext,useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AppContext } from '../Global/APIContext';
import axios from 'axios'
const TransactionHistory = () => {
    const [recieveremail,setrecieveremail] = useState([]);
    const [amountrecieved,setamountrecieved] = useState([]);
    const { email } = useContext(AppContext);

    const [transactions, setTransactions] = useState([]);
    const fetchTransactions = async () => {
    console.log("Email is",email);
    try {
      const response = await axios.get('http://10.0.2.2:5000/transaction/transaction/email', {
        params: {email}
      });



      setTransactions(response.data);
      console.log(transactions);
      for (let i=0;i<transactions.length;i++){
        setrecieveremail(transactions[i].RecieverEmail);
        setamountrecieved(transactions[i].AmountRecieved);
      }

      console.log("Reciever Email",recieveremail);
      console.log("Transaction Amount",amountrecieved);




    } catch (error) {

        console.log(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      console.log('Transaction History is focused');
      fetchTransactions();

      return () => {
        console.log('Transaction History is unfocused');
      };
    }, [email])
  );

    return (
        // <SafeAreaView style={styles.container}>
        //     <ScrollView contentContainerStyle={styles.scrollViewContent}>
        //         <View style={styles.header}>
        //             <Text style={styles.headerText}>Amount Sent By The User</Text>

        //         </View>
        //         <View style={styles.row}>
        //             <Text style={styles.columnHeader}>Reciever Email</Text>
        //             <Text style={styles.columnHeader}>Amount Send</Text>
        //         </View>
        //         {/* Add more rows as needed */}
        //         <View style={styles.row}>

        //             <Text style={styles.column}>example@example.com</Text>
        //             <Text style={styles.column}>Rs 100.00</Text>
        //         </View>
        //         {/* Add more rows as needed */}
        //     </ScrollView>
        // </SafeAreaView>
        <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Amount Sent By The User</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.columnHeader}>Receiver Email</Text>
          <Text style={styles.columnHeader}>Amount Send</Text>
        </View>
        {transactions.map((transaction, index) => (
          <View style={styles.row} key={index}>
            <Text style={styles.column}>{transaction.RecieverEmail}</Text>
            <Text style={styles.column}>Rs {transaction.AmountRecieved}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
    );
};

export default TransactionHistory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        padding: 16,
    },
    header: {
        alignItems: 'center',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop:21
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    columnHeader: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    column: {
        fontSize: 16,
    },
});
