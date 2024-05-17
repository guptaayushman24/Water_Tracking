import { Text,View ,StyleSheet, TouchableOpacity} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { TextInput } from "react-native-paper";
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
    }
})