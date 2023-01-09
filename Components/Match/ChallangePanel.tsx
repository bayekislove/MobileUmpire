import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Player } from '../../Logic/PointsCounting/Player'; 

type ChallangePanelProps = {
    playerAChallanges : number,
    playerBChallanges : number,
    decreaseChallanges : (player : Player) => () => void
}

const ChallangePanel = (props : ChallangePanelProps) => {
    return (
        <View>
            <View style={styles.buttons}>
                <Button title="Challenge" color="#98d42a" 
                    onPress={props.decreaseChallanges(Player.PLAYER_A)}/>
                <Button title="Challenge" color="#98d42a"
                    onPress={props.decreaseChallanges(Player.PLAYER_B)}/>
            </View>
            <View style={styles.remainingChallanges}>
                <Text style={styles.remainingChallanges}>
                    {`Remaining: ${props.playerAChallanges}`}
                </Text>
                <Text style={styles.remainingChallanges}>
                    {`Remaining: ${props.playerBChallanges}`}
                </Text>
            </View>
        </View>
    )
    
};

const styles = StyleSheet.create({ 
    buttons: {
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      marginTop: 20
    },

    remainingChallanges: {
        marginTop: 3,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
    },

    remainingChallangesForPlayer: {
        marginVertical: 3,
        fontSize: 20
    },
});

export default ChallangePanel;