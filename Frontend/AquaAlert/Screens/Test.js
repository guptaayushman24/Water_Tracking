import { Text,View ,StyleSheet, TouchableOpacity} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
// const Detail= async()=>{
//     try{
//        const detail =  await axios.get('http://10.0.2.2:5000/signup/usersignupdetail');
//        console.log(detail.data[1].email);
//        console.log(detail.data[0].email);
//     }
//     catch(err){
//         console.log(err);
//     }
// }
const Test=()=>{

const [text, setText] = useState("");

const [matchfound,setmatchfound] = useState(false);
const [storedata,setstoredata] = useState([]);
const colors = ['#db425b', '#2893f3'];
useEffect(()=>{
    const Detail= async()=>{
        try{
           const response =  await axios.get('http://10.0.2.2:5000/signup/usersignupdetail');
        //    console.log(detail.data[1].email);
        //    console.log(detail.data[0].email);
        setstoredata(response.data);

        }
        catch(err){
            console.log(err);
        }
    }
    Detail();
},[]);
const handleCheck = () => {
    const isMatch = storedata.some(detail => detail.email === text);

    setmatchfound(isMatch);
    console.log(storedata);
};

console.log(text);
return(

            <View>
            <Text style={styles.txtcolor}>This the text Screen</Text>

            <TouchableOpacity style={styles.btn} onPress={handleCheck}><Text>Give Detail</Text></TouchableOpacity>
            <TextInput
            value={text} onChangeText={text=>setText(text)}>
            </TextInput>


            {
                matchfound ?(
                   <Text>Match Found</Text>
                ):
                (
                    <Text>Match not Found</Text>
                )
            }


            <LinearGradient style={styles.box} colors={colors}>
                <View style={styles.alertbox}>
                    <Text style={styles.alerttxt}>User Alerady Registered !!!!</Text>

                    <View style={styles.okbtn}>
                    <TouchableOpacity><Text style={styles.oktxt}>OK</Text></TouchableOpacity>
                </View>
                </View>
            </LinearGradient>
             </View>
    )
}

export default Test;
const styles = StyleSheet.create({


    txtcolor:{
        color:'red'
    },
    btn:{
        alignItems:"center",

        marginTop:80,
    },
    box:{
        alignItems:"center"
    },
    alertbox:{
       width:350,
       height:125,
    //    backgroundColor:'red',
    },
    alerttxt:{
        marginLeft:60,
        marginTop:35,
        fontSize:20
    },
    okbtn:{
        // backgroundColor:"green",
        marginLeft:280,
        marginTop:38,
    },
    oktxt:{
        textAlign:"center"
    }
})