import React,{useContext,useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AppContext } from '../Global/APIContext';
import axios from 'axios'
const TransactionHistory = () => {

const { email } = useContext(AppContext);
    const [transactions, setTransactions] = useState([]);
    console.log(email);
  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5000/transaction/email', {
        params: { email }
      });
      setTransactions(response.data);

      console.log("Here email",email);

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
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Amount Sent By The User</Text>

                </View>
                <View style={styles.row}>
                    <Text style={styles.columnHeader}>Reciever Email</Text>
                    <Text style={styles.columnHeader}>Amount Send</Text>
                </View>
                {/* Add more rows as needed */}
                <View style={styles.row}>

                    <Text style={styles.column}>example@example.com</Text>
                    <Text style={styles.column}>Rs 100.00</Text>
                </View>
                {/* Add more rows as needed */}
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
