import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

type ServeButtonsProps = {
    onError: () => () => void,
    onAce: () => () => void,
    onLet: () => void
}

const ServeButtons = (props : ServeButtonsProps) => {
    return (
        <View style={styles.buttons}>
            <View style={styles.button}>
                <Button title="Let" color="#98d42a" 
                    onPress={props.onLet}/>
            </View>
            <View style={styles.button}>
                <Button title="Ace" color="#98d42a" 
                    onPress={props.onAce()}/>
            </View>
            <View style={styles.button}>
                <Button title="Error" color="#98d42a"
                    onPress={props.onError()}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({  
    buttons: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginVertical: 20
    },

    button: {
        flex: 1,
        marginHorizontal: 10
    }
});

export default ServeButtons;