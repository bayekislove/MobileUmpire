import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Player } from '../../Logic/PointsCounting/Player';

type StatResultButtonsProps = {
    onHandleFunction : (player : Player) => () => void;
    buttonTitle : string
};

const StatResultButtons = (props : StatResultButtonsProps) => {
    return (
        <View style={styles.buttons}>
            <Button title={props.buttonTitle} color="#98d42a"
                onPress={props.onHandleFunction(Player.PLAYER_A)} />
            <Button title={props.buttonTitle} color="#98d42a"
                onPress={props.onHandleFunction(Player.PLAYER_B)} />
        </View>
    );
}

const styles = StyleSheet.create({
    buttons: {
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      marginVertical: 20
    }
});

export default StatResultButtons;