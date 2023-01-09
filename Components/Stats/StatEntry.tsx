import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

type StatEntryProps = {
    playerAStat: number,
    playerBStat: number,
    statName: string
};

const StatEntry = (props: StatEntryProps) => {

    return (
        <View style={styles.statEntry}>
            <Text style={styles.playerName}>{`${props.playerAStat}`}</Text>
            <Text style={styles.statName}>  {`${props.statName}`}   </Text>
            <Text style={styles.playerName}>{`${props.playerBStat}`}</Text>
        </ View>
    )
};

const styles = StyleSheet.create({

    statEntry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },

    playerName: {
        marginVertical: 5,
        fontSize: 25,
        textAlign: 'center'
    },

    statName: {
        marginVertical: 5,
        fontSize: 20,
        textAlign: 'center'
    }
});

export default StatEntry;