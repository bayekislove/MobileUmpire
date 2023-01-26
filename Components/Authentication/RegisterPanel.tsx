import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

import IdentityManager from '../../Logic/IdentityManager';

type RegisterNavigation = {
    navigate: (value: string) => void;
}

const RegisterPanel = () => {
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorString, setErrorString] = React.useState("");
    const [passwordConfirmation, setPasswordConfirmation] = React.useState("");

    const navigation = useNavigation<RegisterNavigation>()

    const redirectToLogin = () => {
        navigation.navigate('Login');
    };

    const passwordHasNumber = () => {
        console.log(password)
        return /[0-9]/.test(password);
    };

    const onRegisterClick = async () => {
        setErrorString("");
        // if(password.length < 7) {
        //     setErrorString("Password has to be longer than 7 characters!");
        //     return;
        // }
        // else if(password.toLowerCase() == password) {
        //     setErrorString("Password has have at least one capital letter!");
        //     return;
        // }
        // else if(!passwordHasNumber()) {
        //     setErrorString("Password has have at least one number!");
        //     return;
        // }
        // else if(password != passwordConfirmation) {
        //     setErrorString("Passwords have to be exact!");
        //     return;
        // }

        if(await IdentityManager.Register(login, password, passwordConfirmation)){
            setErrorString("");
            navigation.navigate('Login');
        } else {
            setErrorString("Error while registration :c");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.appName}>{`MobileUmpire`}</Text>
            <Text style={styles.errorDescription}>{`${errorString}`}</Text>
            <View style={styles.formContainer}>
                <Text style={styles.inputDescription}>{'Username'}</Text>
                <TextInput style={styles.input} textContentType='username'
                    onChangeText={login => setLogin(login)}/>

                <Text style={styles.inputDescription}>{'Password'}</Text>
                <TextInput style={styles.input} secureTextEntry={true}
                    onChangeText={password => setPassword(password)}/>
            
                <Text style={styles.inputDescription}>{'Confirm password'}</Text>
                <TextInput style={styles.input} secureTextEntry={true}
                    onChangeText={passwordConfirmation => setPasswordConfirmation(passwordConfirmation)}/>

                <View style={styles.button}>
                    <Button onPress={onRegisterClick} title="Register"/>
                </View>
                <Text style={styles.redirectText} onPress={redirectToLogin}>
                    {"Already have an account? Login!"}
                </Text>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        marginTop: 140,
        marginHorizontal: 20,
    },

    input: {
      height: 40,
      marginTop: 10,
      margin: 20,
      borderWidth: 1,
      padding: 10,
    },

    button: {
        marginVertical: 30,
        marginHorizontal: 60
    },

    formContainer: {
        marginHorizontal: 20,
        marginTop: 20
    },

    appName: {
        fontSize: 40,
        marginBottom: 10,
        textAlign: 'center',
        color: '#219ac7',
        fontWeight: 'bold'
    },

    errorDescription: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        color: "#CC2B2B"
    },

    inputDescription: {
        fontSize: 20,
        textAlign: 'center'
    },

    redirectText: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontSize: 20,
        marginVertical: 20
    }
  });

export default RegisterPanel;