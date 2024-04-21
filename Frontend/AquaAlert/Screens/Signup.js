import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { TextInput, Icon } from 'react-native-material-ui';
const Signup = ({navigation}) => {
    // State for the setting the placeholder in name in textbox
    const [placeholdertext, Setplaceholdertext] = useState('Enter your name');
    // State for the setting the placeholder in email in textbox
    const [emailholder, Setemailholder] = useState('Enter your email');

    // State for the setting the placeholder in name in textbox
    const [placeholderpassword, Setplaceholderpassword] = useState('Enter your password');

    // State for checking if user has enterd any password or not
    const [passwordwarning, setpasswordwarning] = useState(false);

    // State for checking if the password contains the alphanumeric character
    const [validpassword, setvalidpassword] = useState(false);

    // Storing the name of the user
    const [username, setusername] = useState('');

    // State for displaying the warning if user did not enterd any name
    const [namewarning, setnamewarning] = useState(false);

    // State for displaying the warning if user has entered the invalid name
    const [validname, setvalidname] = useState(false);


    // State for storing the email value
    const [email, setemail] = useState('');
    // Regex expression for validating the email address
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // State for displaying the warning if user did not enterd any email
    const [emailwaning, setemailwarning] = useState(false);
    // State for displaying the warning if user has entered the invalid email
    const [validemail, setvalidemail] = useState(false);
    // Storing the value of the password
    const [password, setpassword] = useState('');

    // State for diaplaying the password and hiding the password on the button click
    const [displaypassword, hidepassword] = useState(true);

    // State is created for keeping the record of the number of clicks done on the eye image icon by the user
    const [clickcount, setclickcount] = useState(0);

    const handleInputFocus = () => {

        if (placeholdertext === 'Enter your name') {
            Setplaceholdertext('');
        }
    }
    const emailinputfocus = () => {
        if (emailholder === 'Enter your email') {
            Setemailholder('');
        }

    }
    const handlePasswordFocus = () => {
        if (placeholderpassword === 'Enter your password') {
            Setplaceholderpassword('');
        }
    }

    // const [showpassword, setshowpassword] = useState(false);
    const showpassword = () => {
        // Updating the number of clicks done on the eye image icon
        setclickcount(clickcount + 1);
        // If the number of clicks are odd then show the password
        if (clickcount % 2 != 0) {
            if (clickcount==1){
                hidepassword(true);
            }
            hidepassword(false);
        }
        // If the number of clicks are even then hide the password
        else {
            hidepassword(true);
        }
    }
    const checkdetails = () => {
        if (username.length == 0) {
            console.log('Please enter the name');
            setnamewarning(true);
        }
        else {
            setnamewarning(false);
        }

        // Checking if the user has entered the valid name or not
        let flag = 0;
        for (let i = 0; i < username.length; i++) {
            if (username.charAt(i) >= '0' && username.charAt(i) <= '9') {
                flag = 1;
            }
        }
        if (flag == 1) {
            setvalidname(true);
        }
        else {
            setvalidname(false);
        }

        // Chcking for the email address field
        if (email.length == 0) {
            setemailwarning(true);
        }
        else {
            setemailwarning(false);
        }
        if (validRegex.test(email)) {
            setvalidemail(true);
        }
        else {
            console.log('Invalid Email');
            setvalidemail(false);
        }


        // Password
        // Checking if the user has enterd the password or not
        if (password.length == 0) {
            setpasswordwarning(true);
        }
        else {
            setpasswordwarning(false);
        }

        // Checking if the user has entered the alphanumeric password or not
        let check1 = 0;
        let check2 = 0;
        let check3 = 0;
        for (let i = 0; i < password.length; i++) {
            if (password.charAt(i) >= 'a' && password.charAt(i) <= 'z') {
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
        }
    }

    // Creating the component of Login if user already has the account
    const Login = () => {
        navigation.navigate()
    }

    // Giving the colour to the button in the range from #ce4845 to #813e85
    const colors = ['#ce4845', '#813e85'];



    return (
        <View style={styles.main}>
            {/* These View is for the upper design */}
            <View style={styles.upperdesign}>
                <Text style={styles.txt}>Create an account</Text>
                <Text style={styles.txt1}>Welcome! Please enter your details.</Text>

            </View>
            {/* Upper design View ends here */}
            {/* Name heading view starts */}
            <View style={styles.detailsview}>
                <Text style={{ color: 'white' }}>Name</Text>
            </View>
            {/* Name heading view ends */}

            <View style={styles.nameinput}>

                <ImageBackground
                    source={require('../Image_Used/user_logo.png')} style={styles.userimg} />
                <TextInput style={styles.txtinput}
                    placeholder={placeholdertext}
                    placeholderTextColor={'#444446'}
                    onFocus={handleInputFocus}
                    value={username}
                    onChangeText={(username) => setusername(username)}>
                </TextInput>
            </View>

            {/* Name warning */}
            {
                namewarning && !validname && (
                    <View>
                        <Text style={styles.warningname}>*Please enter the name</Text>
                    </View>
                )
            }
            {
                validname && (
                    <View>
                        <Text style={styles.warningname}>*Please enter a valid name</Text>
                    </View>
                )
            }



            {/* EmailView */}
            <View style={styles.detailsview}>
                <Text style={{ color: 'white' }}>Email</Text>

                <View style={styles.emailinput}>

                    <ImageBackground
                        source={require('../Image_Used/email_logo.png')} style={styles.userimg} />
                    <TextInput style={styles.txtinput}
                        placeholder={emailholder}
                        placeholderTextColor={'#444446'}
                        onFocus={emailinputfocus}
                        value={email}
                        onChangeText={(email) => setemail(email)}>


                    </TextInput>
                </View>
                {/* Chcking the email is in the correct format or not*/}
                {
                    emailwaning && validemail && (
                        <View><Text style={styles.warningname}>*Please enter the email address</Text></View>
                    )
                }
                {
                    !validemail && !emailwaning &&  (
                        <View><Text style={styles.warningname}>*Please enter the valid email address</Text></View>
                    )
                }
            </View>


            {/* Password View */}

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
                        <Text style={styles.txtsubmit}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            {/* These is the view for the bottom design */}
            <View style={styles.bottomview}>
                <View style={{ marginLeft: "25%" }}>
                    <Text style={styles.txtbottom}>Already have an account?</Text>
                </View>
                <View style={{ marginStart: 10 }}><TouchableOpacity onPress={Login}><Text style={{ color: 'white', fontSize: 15 }}>Log in</Text></TouchableOpacity></View>
            </View>
        </View>
    )
}
export default Signup;


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
        height: 50
    },
    eyeIconContainer: {
        position: 'absolute',
        right: 10,

    },
    eyeimg: {
        width: 25,
        height: 45,
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
    }

})