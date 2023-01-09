import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

import IdentityManager from '../../Logic/IdentityManager';

type RegisterNavigation = {
    navigate: (value: string) => void;
}

const LoginPanel = () => {
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
    const navigation = useNavigation<RegisterNavigation>()

    const redirectToLogin = () => {
        navigation.navigate('Login');
    };

    const onRegisterClick = async () => {
        if(await IdentityManager.Register(login, password, passwordConfirmation)){
            navigation.navigate('Login');
        };
    };

    return (
        <View style={styles.container}>
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
    );

};

const styles = StyleSheet.create({
    container: {
        marginTop: 200,
        marginHorizontal: 40,
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