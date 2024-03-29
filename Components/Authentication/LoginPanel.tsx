import React from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import IdentityManager from '../../Logic/IdentityManager';
import { useNavigation } from '@react-navigation/native';

type LoginNavigation = {
    navigate: (value: string) => void;
}

const LoginPanel = () => {
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorString, setErrorString] = React.useState("");
    const navigation = useNavigation<LoginNavigation>();

    const onLoginPress = async () => {
        if(await IdentityManager.Login(login, password)){
            navigation.navigate('Account');
        } else {
            setErrorString("Incorrect username or password!");
        }
    };

    const redirectToRegister = () => {
        setLogin("");
        setPassword("");
        setErrorString("");
        navigation.navigate('Register');
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

                <View style={styles.button}>
                    <Button onPress={onLoginPress} title="Login"/>
                </View>

                <Text style={styles.redirectText} onPress={redirectToRegister}>
                    {"Don't have an account? Register!"}
                </Text>
            </View>
        </View>
    );
  
};

const styles = StyleSheet.create({
    container: {
        marginTop: 170,
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
        color: '#cc2b2b',
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

export default LoginPanel;