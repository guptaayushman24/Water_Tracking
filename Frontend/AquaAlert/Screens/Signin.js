import { useEffect, useState ,useContext} from 'react';
import { StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, Animated, Ic } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../Global/APIContext';
import HomePage from './HomePage';
import axios from 'axios'
const Signin = () => {
    const { email, setemail } = useContext(AppContext);
    const navigation = useNavigation();
    // State for the setting the placeholder in name in textbox
    const [placeholdertext, Setplaceholdertext] = useState('Enter your email');

    // State for handling the username
    // const [email, setemail] = useState('');
    // State for displaying the warning if user did not enterd any email

    const [emailwarning, setemailwarning] = useState(false);


    // State for displaying the warning if user has entered the invalid email

    const [validemail, setvalidemail] = useState(false);


    // State for handling the user password
    const [password, setpassword] = useState('');

    // State for checking if user has enterd any password or not
    const [passwordwarning, setpasswordwarning] = useState(false);

    // State for checking if the password contains the alphanumeric character
    const [validpassword, setvalidpassword] = useState(false);

    // State for the setting the placeholder in name in textbox
    const [placeholderpassword, Setplaceholderpassword] = useState('Enter your password');

    // State for diaplaying the password and hiding the password on the button click
    const [displaypassword, hidepassword] = useState(true);

    // State is created for keeping the record of the number of clicks done on the eye image icon by the user
    const [clickcount, setclickcount] = useState(0);

    // Giving the colour to the button in the range from #ce4845 to #813e85
    const colors = ['#ce4845', '#813e85'];

    // Stroing the data which is fetched from the mongodb
    const [storedata, setstoredata] = useState([]);

    // Stroing the emails which is fetched from the mongodb
    const [storeemail, setstoreemail] = useState([]);

    // Stroing the emails which is fetched from the mongodb
    const [storepassword, setstorepassword] = useState([]);

    const [name, setname] = useState([]);

    // Index for storing detecting the name
    const [index, setindex] = useState(-1);

    const [user_name, setuser_name] = useState('');

    const [cardnumber,setcardnumber] = useState([]);
    // State for storing the bank amount
    const [bankamount,setbankamount] = useState([]);
    // If user exist then maintaing that state we are using these state
    const [matchfound, setmatchfound] = useState(true);
    useEffect(() => {
        const Detail = async () => {
            try {
                const response = await axios.get('http://10.0.2.2:5000/signup/usersignupdetail');
                setstoredata(response.data);
                // To log passwords of each user
                // Store all the password in one list same do for the email and then try to authenticate

                const emails = response.data.map(user => user.email);
                const passwords = response.data.map(user => user.password);
                const name = response.data.map(user => user.username);

                setstoreemail(emails);
                setstorepassword(passwords);
                setname(name);

                console.log(emails); // List of all emails
                console.log(passwords); // List of all passwords
                console.log(name);


                // var user_name = "";
                for (let i = 0; i < emails.length; i++) {
                    console.log(email);
                    if (emails[i].toString() === email.toString()) {
                        console.log("Hello if");
                        setindex(i);
                        break;
                    }
                }
                console.log("Index", index);
                console.log("Name on the particular index is", name[index]);
                setuser_name(name[index]);


            }

            catch (err) {
                console.log(err);
            }

            // Fetch the bankdetails (cardnumber only)
            try{
                const response = await axios.get('http://10.0.2.2:5000/bank/bankdetailcardnumberget');
                setcardnumber(response.data);
            }
            catch(err){
                console.log(err);
            }

            // Calling the bank amount and wallet amount API

           try{
            const responseamount = await axios.get('http://10.0.2.2:5000/bank/bankdetailgetamount');
             setbankamount(responseamount.data);
            //  console.log("Bank Balance on the index is",bankamount[0].amountlength);
            // console.log(bankamount[1].amountlength);
           }
           catch(err){
            console.log(err);
           }


        }
        Detail();
    }, [index, email]);





    const handleInputFocus = () => {
        if (placeholdertext === 'Enter your email') {
            Setplaceholdertext('');
        }
    }
    const handlePasswordFocus = () => {
        if (placeholderpassword === 'Enter your password') {
            Setplaceholderpassword('');
        }
    }

    // Updating the security text of the password view and showing the password if user want to see
    const showpassword = () => {
        // Updating the number of clicks done on the eye image icon
        setclickcount(clickcount + 1);
        // If the number of clicks are odd then show the password
        if (clickcount % 2 != 0) {
            hidepassword(false);
        }
        // If the number of clicks are even then hide the password
        else {
            hidepassword(true);
        }
    }

    // Checking the details that are filled by the user are valid or not
    var temp1 = 0;
    var temp2 = 0;
    var temp3 = 0;
    var temp4 = 0;
    const checkdetails = () => {
        if (email.length == 0) {
            console.log('Please enter the email');
            setemailwarning(true);
            temp1 = 1
        }
        else {
            setemailwarning(false);
        }
        var validRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

        if (validRegex.test(email)) {
            setvalidemail(true);
            temp2 = 1;
        }
        else {
            console.log('Invalid Email');
            setvalidemail(false);
        }



        // Checking if the user has enterd the password or not
        if (password.length == 0) {
            setpasswordwarning(true);
            temp3 = 1;
        }
        else {
            setpasswordwarning(false);
        }

        // Checking if the user has entered the alphanumeric password or not
        let check1 = 0;
        let check2 = 0;
        let check3 = 0;
        for (let i = 0; i < password.length; i++) {
            if (password.charAt(i) >= 'a' && password.charAt(i) <= 'z' || password.charAt(i) >= 'A' && password.charAt(i) <= 'Z') {
                check1 = 1;
            }
            else if (password.charAt(i) >= '0' && password.charAt(i) <= '9') {
                check2 = 1;
            }
            else if (password.charAt(i) == '!' || password.charAt(i) == '@' || password.charAt(i) == '#' || password.charAt(i) == '$' || password.charAt(i) == '%' || password.charAt(i) == '&') {
                check3 = 1;
            }
        }

        if (check1 == 1 && check2 == 1 && check3 == 1) {
            setvalidpassword(false);
        }
        else {
            setvalidpassword(true);
            temp4 = 1;
        }
        console.log(temp1)
        console.log(temp2)
        console.log(temp3)
        console.log(temp4)


        if (temp1 == 0 && temp2 == 1 && temp3 == 0 && temp4 == 0) {
            const isMatch = storedata.some(detail => detail.email === email && detail.password === password);
            setmatchfound(isMatch);
            console.log(user_name);
            // for (let i=0;i<cardnumber.length;i++){
            //     console.log("The cardnumber",cardnumber[i])
            // }
            console.log("The card number is",cardnumber[index]);
            if (isMatch && index != -1) {
                console.log("Navigation",user_name);
                if (isMatch && index != -1){
                    // navigation.navigate('HomePage', {'user_name':user_name });
                    navigation.navigate('HomePage', {
                        screen: 'Home', // Ensure this matches the Tab.Screen name
                        params:{ user_name:user_name,
                            cardnumber:cardnumber[index], // From here we can send the bank amount and wallet amount
                            bankbalance:bankamount[index]
                        }
                      });

                    //   navigation.navigate('HomePage',{
                    //     screen:'Home',
                    //     params:{cardnumber:cardnumber[index]}
                    //   });
                } else {
                    console.log('No match found');
                }
            } else {
                console.log('No match found');
            }
        }

    }



    // Signup button



    return (
        <View style={styles.main}>
            <View style={styles.upperdesign}>
                <Text style={styles.txt}>Log in to your account</Text>

                <Text style={styles.txt1}>Welcome! Please enter your details.</Text>
            </View>

            {/* Name*/}
            <View style={styles.detailsview}>
                <Text style={{ color: 'white' }}>Email</Text>
            </View>
            {/* Name heading view ends */}

            <View style={styles.nameinput}>

                <ImageBackground
                    source={require('../Image_Used/user_logo.png')} style={styles.userimg} />
                <TextInput style={styles.txtinput}
                    placeholder={placeholdertext}
                    placeholderTextColor={'#444446'}
                    onFocus={handleInputFocus}
                    value={email}
                    onChangeText={(email) => setemail(email)}>
                </TextInput>
            </View>

            {/*Email Warning*/}
            {
                emailwarning && (
                    <View><Text style={styles.warningname}>*Please enter the email address</Text></View>
                )
            }
            {
                !validemail && !emailwarning && (
                    <View><Text style={styles.warningname}>*Please enter the valid email address</Text></View>
                )
            }

            {/* Password View*/}
            <View style={styles.detailsview}>
                <Text style={{ color: 'white' }}>Password</Text>
            </View>
            {/*Password View ends here*/}
            <View style={styles.nameinput}>

                <ImageBackground
                    source={require('../Image_Used/password.png')} style={styles.userimg} />
                <TextInput style={styles.txtinput}
                    placeholder={placeholderpassword}
                    placeholderTextColor={'#444446'}
                    onFocus={handlePasswordFocus}
                    value={password}
                    onChangeText={(password) => setpassword(password)} secureTextEntry={displaypassword}>
                </TextInput>

                <TouchableOpacity style={styles.eyeIconContainer} onPress={showpassword}>
                    <Image
                        source={require('../Image_Used/eye_image.png')}
                        style={styles.eyeimg} />

                </TouchableOpacity>
            </View>

            {
                <View>
                    {
                        passwordwarning && (
                            <Text style={styles.warningname}>*Please enter the password</Text>
                        )
                    }
                    {
                        !validpassword || passwordwarning || (
                            <Text style={styles.warningname}>*Password should contain characters and numbers</Text>
                        )
                    }
                </View>
            }

            <LinearGradient colors={colors} style={styles.submitbtn}>
                <View style={styles.signupview}>
                    <TouchableOpacity sytle={styles.signupbtn} onPress={checkdetails}>
                        <Text style={styles.txtsubmit}>Log in</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <View>
                {/* If length of email is zero then do not show the below line try once */}
                {
                    !matchfound && (
                        <Text style={styles.warning}>*Account does not exist please sign up</Text>
                    )
                }
            </View>


            {/* These is the view for the bootom design */}
            <View style={styles.bottomview}>
                <View style={{ marginLeft: "25%" }}>
                    <Text style={styles.txtbottom}>Don't have an account?</Text>
                </View>
                <View style={{ marginStart: 10 }}><TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}><Text style={{ color: 'white', fontSize: 15 }}>Sign Up</Text></TouchableOpacity></View>
            </View>

        </View>
    )
}
export default Signin;

const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: '#151515'
    },
    upperdesign: {
        marginTop: 76,
        marginLeft: 10
    },
    txt: {
        color: 'white',
        fontSize: 32
    },
    txt1: {
        color: '#575757',
        margin: 6,
        fontSize: 16
    },
    detailsview: {
        color: 'white',
        margin: 15,
    },
    passwordview: {
        color: 'white',
        margin: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameinput: {
        marginLeft: 18,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#262628',
        borderRadius: 10,
        borderWidth: 2,
        height: 40,
    },
    userimg: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
        width: 18,
        height: 18,
        marginTop: 10,
        marginLeft: 8,
        resizeMode: 'contain'
    },
    eyeIconContainer: {
        position: 'absolute',
        right: 10,

    },
    eyeimg: {
        width: 25,
        height: 45,
    },
    emailinput: {
        marginLeft: 2,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#262628',
        borderRadius: 10,
        borderWidth: 2,
        height: 40,
        width: 398,
    },
    txtinput: {
        fontSize: 20,
        color: 'white'
    },
    verification: {
        color: 'red',
        fontSize: 15
    },
    verificationview: {
        marginLeft: 10,
    },
    txtsubmit: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 15,
    },
    submitbtn: {
        margin: 10,
        borderRadius: 10,
        height: 50,
        marginTop: 20,
        marginLeft: 25
    },

    warningname: {
        color: 'red',
        marginLeft: 20
    },
    bottomview: {
        position: 'absolute',
        bottom: 0,
        width: "100%",
        height: 25,
        flexDirection: 'row'
    },
    txtbottom: {
        textAlign: "center",
        margin: 2,
        color: '#535353'
    },
    warning: {
        color: 'red',
        fontSize: 20,
        marginLeft: 20
    }

})