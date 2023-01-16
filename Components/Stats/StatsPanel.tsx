import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import StatsType from '../../Logic/Stats/StatsType';
import StatEntry from './StatEntry';

type StatsPanelProps = {
    playerAName: string,
    playerBName: string,
    playerAScore: Array<number>,
    playerBScore: Array<number>,
    playerAStats: Array<Map<StatsType, number>>,
    playerBStats: Array<Map<StatsType, number>>,
    matchDuration: string
};

export const getMatchResult = (playerAScore: Array<number>, playerBScore: Array<number>) => {
    let setsStr : Array<string> = new Array<string>();
    setsStr.push(`${playerAScore[0]}:${playerBScore[0]}`);
    for(let i = 1; i < playerAScore.length; i++) {
        if(playerAScore[i] == 0 && playerBScore[i] == 0){
            continue;
        }
        setsStr.push(`${playerAScore[i]}:${playerBScore[i]}`);
    };
    return setsStr.join(" ");
};

const StatsPanel = (props : StatsPanelProps) => {

    const [chosenSet, setChosenSet] = React.useState(0);

    const getStatsEntries = () => {
        let statEntries = new Array();

        for(const [key, val] of props.playerAStats[chosenSet]) {
            statEntries.push(
                <StatEntry playerAStat={val}
                    playerBStat={props.playerBStats[chosenSet].get(key) as number}
                    statName={StatsType[key].replace(/_/g, " ")}
                    key={key}/>
            );
        }
        return statEntries;
    }

    const getChosenSetOnPressFunc = (i : number) => {
        return () => {
            setChosenSet(i);
        }
    };

    const getStatButtons = () => {
        let buttonsEntries = new Array();
        for(let i = 0; i < props.playerAScore.length; i++) {
            buttonsEntries.push(
                <Button title={`Set ${i + 1}`} key={i + 1}
                    onPress={getChosenSetOnPressFunc(i + 1)}/>
            )
        }
        buttonsEntries.push(
            <Button title={`All`} key={0}
                onPress={getChosenSetOnPressFunc(0)}/>
        )
        return <View style={styles.buttonsContainer}>{buttonsEntries}</ View>;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.playerName}>{`${props.playerAName} - ${props.playerBName}`}</Text>
            <Text style={styles.matchDuration}>{`Match duration: ${props.matchDuration}`}</Text>
            <Text style={styles.matchResult}>
                {getMatchResult(props.playerAScore, props.playerBScore)}
            </Text>
            {getStatsEntries()}
            {getStatButtons()}
        </View>
    )

};

const styles = StyleSheet.create({ 
    container: {
        marginTop: 100,
        marginBottom: 70,
        marginHorizontal: 20,
        flexDirection: 'column'
    },

    playerName: {
        marginVertical: 5,
        fontSize: 25,
        textAlign: 'center'
    },

    matchDuration: {
        marginVertical: 5,
        fontSize: 25,
        textAlign: 'center'
    }, 
    
    matchResult: {
        marginVertical: 5,
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 40
    },

    statEntry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    }
});

export default StatsPanel;