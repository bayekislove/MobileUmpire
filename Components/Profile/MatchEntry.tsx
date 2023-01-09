import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MatchRecord } from '../../Logic/MatchHistoryManager';

type MatchEntryProps = {
    match: MatchRecord
}

const MatchEntry = (props : MatchEntryProps) => {
    return <View style={styles.container}>
            <Text style={styles.playerName}>
                {`${props.match.playerAName} - ${props.match.playerBName}`}
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
                {`${props.match.round} of ${props.match.tournamentName} ${props.match.date}`}
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