import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MatchRecord } from '../../Logic/MatchHistoryManager';

type MatchEntryProps = {
    match: MatchRecord,
    showStatsCallback : () => {}
}

export const getTournamentInfo = (round : string, tournament : string) => {
    if(round == "" && tournament != "") {
        return `${tournament}`;
    } else if(round != "" && tournament == "") {
        return `${round}`;
    } else {
        return `${round} of ${tournament}`;
    }
};

const MatchEntry = (props : MatchEntryProps) => {
    return <View style={styles.container} onTouchEnd={props.showStatsCallback} >
            <Text style={styles.playerName}>
                {`${props.match.playeraname} - ${props.match.playerbname}`}
            </ Text>
            <View style={styles.matchAndTimeContainer}>
                <Text style={styles.playerName}>
                    {`${props.match.result}`}
                </ Text>
                <Text style={styles.playerName}>
                    {`${props.match.duration}`}
                </ Text>
            </View>
            <Text style={styles.playerName}>
                {`${getTournamentInfo(props.match.round, props.match.tournamentname)} ${props.match.date}`}
            </Text>
        </ View>;
}

const styles = StyleSheet.create({

    container: {
        borderColor: '#aaa3a3',
        borderWidth: 1
    },

    matchAndTimeContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },

    playerName: {
        fontSize: 15,
    }, 
});

export default MatchEntry;