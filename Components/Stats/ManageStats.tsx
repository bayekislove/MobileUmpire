import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import StatsType from '../../Logic/Stats/StatsType';
import StatsPanel from './StatsPanel';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MatchHistoryManager from '../../Logic/MatchHistoryManager';

type AccountNavigation = {
    navigate: (value: string) => void;
}

const ManageStats = ({route} : {route : any}) => {
    const navigation = useNavigation<AccountNavigation>();

    const [playerAStats, setPlayerAStats] = React.useState<Map<StatsType, number>[]>();
    const [playerBStats, setPlayerBStats] = React.useState<Map<StatsType, number>[]>();
    const [areStatsFetched, setAreStatsFetched] = React.useState<boolean>(false);

    useFocusEffect(
        React.useCallback(() => {
            setAreStatsFetched(false);

            MatchHistoryManager.getMatchStatsForMatch(route.params.matchInfo.id)
            .then((res) => {
                let stats = res as Map<StatsType, number>[][];
                console.log(stats[0], stats[1]);
                setPlayerAStats(stats[0]);
                setPlayerBStats(stats[1]);
                setAreStatsFetched(true);
                console.log("no skonczylem fetchowac")
            })
            .catch((err) => {
                console.log(`ERROR ${err}`);
            });
    }, []));

    const adaptMatchScoreForStatsPanel = (joinedRes : string) => {
        let setScores = joinedRes.split(" ");
        let playerAScore = [];
        let playerBScore = [];
        for(let i = 0; i < setScores.length; i++) {
            if(isNaN(Number(setScores[i][0])) || isNaN(Number(setScores[i][2]))) {
                continue;
            }
            playerAScore[i] = parseInt(setScores[i][0]);
            playerBScore[i] = parseInt(setScores[i][2]);
        }
        return [playerAScore, playerBScore];
    };

    const deleteMatch = () => {
        console.log(`Match with id: ${route.params.matchInfo.id} to be deleted`);
        MatchHistoryManager.deleteMatchFromHistory(route.params.matchInfo.id);
        navigation.navigate("Account");
    };

    const backToProfile = () => {
        navigation.navigate("Account");
    };

    const getStatsPanelIfFetched = () => {
        if(areStatsFetched) {
            return <StatsPanel
                playerAName={route.params.matchInfo.playeraname}
                playerBName={route.params.matchInfo.playerbname}
                playerAScore={adaptMatchScoreForStatsPanel(route.params.matchInfo.result)[0]}
                playerBScore={adaptMatchScoreForStatsPanel(route.params.matchInfo.result)[1]}
                playerAStats={playerAStats as Map<StatsType, number>[]}
                playerBStats={playerBStats as Map<StatsType, number>[]}
                matchDuration={route.params.matchInfo.duration} />;
        } else {
            return <Text>{"Trying to fetch match stats"}</Text>
        }
    };

    return (
        <View>
            {getStatsPanelIfFetched()}
            <View style={styles.buttons}>
                <Button title={"Delete match"}
                    onPress={deleteMatch} color='#f54260' />
                <Button title={"Back to profile"}
                    onPress={backToProfile} color='#219ac7' />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 100
    },

    buttons: {
        marginHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    matchInfo: {
        marginVertical: 5,
        fontSize: 20,
    }
});


export default ManageStats;