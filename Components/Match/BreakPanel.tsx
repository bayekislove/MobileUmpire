import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Player } from '../../Logic/PointsCounting/Player';
import BreakInfo from './BreakInfo';

type BreakPanelProps = {
    requestedPlayerRetired: (player: Player) => () => void,
    playerAName: string,
    playerBName: string
};

export const BreakPanel = (props : BreakPanelProps) => {

    const [breakInfoVisible, setBreakInfoVisible] = React.useState<boolean>(false);
    const [playerRequestingBreak, setPlayerRequestingBreak] = React.useState<Player>();

    const createBreakInfoModal = (player: Player) => {
        return () => {
            if(breakInfoVisible) {
                return;
            }
            setBreakInfoVisible(true);
            setPlayerRequestingBreak(player);
        }
    }

    const getRequestingPlayerName = () => {
        return playerRequestingBreak == Player.PLAYER_A ? props.playerAName : props.playerBName;
    }

    return (<View style={styles.buttons}>
            <Button title={"BREAK"} color="#98d42a"
                onPress={createBreakInfoModal(Player.PLAYER_A)}/>
            <Button title={"BREAK"} color="#98d42a"
                onPress={createBreakInfoModal(Player.PLAYER_B)}/>
            <BreakInfo isVisible={breakInfoVisible}
                requestingPlayerName={getRequestingPlayerName()}
                discardCreation={() => {setBreakInfoVisible(false)}}
                requestedPlayerRetired={
                    props.requestedPlayerRetired(playerRequestingBreak as Player)
                } />
        </View>)
}

const styles = StyleSheet.create({ 
    buttons: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 20
    }
});
