import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, Animated, Ic } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
// import { TextInput } from 'react-native-paper'
const Signin = () => {
    // State for the setting the placeholder in name in textbox
    const [placeholdertext, Setplaceholdertext] = useState('Enter your name');

    // State for handling the username
    const [username, setusername] = useState('');
    // State for displaying the warning if user did not enterd any name
    const [namewarning, setnamewarning] = useState(false);

    // State for displaying the warning if user has entered the invalid name
    const [validname, setvalidname] = useState(false);


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


    const handleInputFocus = () => {
        if (placeholdertext === 'Enter your name') {
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

    // Signup button
    const Signup=()=>{
        console.log('Sign up button is pressed');
    }



    return (
        <View style={styles.main}>
            <View style={styles.upperdesign}>
                <Text style={styles.txt}>Log in to your account</Text>

                <Text style={styles.txt1}>Welcome! Please enter your details.</Text>
            </View>

            {/* Name*/}
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

            {/*Name Warning*/}
            {
                namewarning && !validname && (
                    <View>
                        <Text style={styles.warningname}>*Please enter the name</Text>
                    </View>
                )
            }
            {
                validname && (
                    <View><Text style={styles.warningname}>*Invalid Name</Text></View>
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


             {/* These is the view for the bootom design */}
             <View style={styles.bottomview}>
                    <View style={{marginLeft:"25%"}}>
                        <Text style={styles.txtbottom}>Don't have an account?</Text>
                        </View>
                        <View style={{marginStart:10}}><TouchableOpacity onPress={Signup}><Text style={{color:'white',fontSize:15}}>Sign Up</Text></TouchableOpacity></View>
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
    }

})