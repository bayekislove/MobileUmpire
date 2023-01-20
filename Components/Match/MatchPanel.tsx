import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Player } from '../../Logic/PointsCounting/Player';
import ServePanel from './ServePanel';
import PlayerScore from './PlayerScore';
import ChallangePanel from './ChallangePanel';
import StatResultButtons from '../Stats/StatResultButtons';
import StatsPanel, { getMatchResult } from '../Stats/StatsPanel';
import MatchHistoryManager, { MatchRecord } from '../../Logic/MatchHistoryManager';
import MatchLogic from '../../Logic/MatchLogic';
import PointResult from '../../Logic/PointResult';
import { BreakPanel } from './BreakPanel';

type ToAccountNavigation = {
    navigate: (value: string) => void;
};

const MatchPanel = ({route} : {route : any}) => {

    const navigate = useNavigation<ToAccountNavigation>();

    const [statsShown, setStatsShown] = React.useState(false);
    let   [elapsedSeconds, setElapsedSeconds] = React.useState(0);
    const [matchCounter, setMatchCounter] = React.useState<MatchLogic>(new MatchLogic());
    const [updateComponent, setUpdateComponent] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {elapsedSeconds = elapsedSeconds + 1; console.log(elapsedSeconds)}, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatSecondsToStr = (seconds : number) => {
        const hours : string = `${Math.floor(seconds / 3600)}`;
        const minutes : string = `${Math.floor(seconds / 60)}`;
        console.log(seconds, `${hours}:${minutes.padStart(2, '0')}`);
        return `${hours}:${minutes.padStart(2, '0')}`;
    };

    const getNameByPlayer = (player : Player) => {
        if(player == Player.PLAYER_A) {
            return route.params.playerAName;
        } else if(player == Player.PLAYER_B) {
            return route.params.playerBName;
        }
    }

    const sendMatchFinishedInfo = () => {
        if(!matchCounter.isMatchFinished) {
            return;
        }
        let res = getMatchResult(matchCounter.playerASetsScore, matchCounter.playerBSetsScore);
        sendMatchFinishedInfoWithResult(res);
    }

    const sendMatchFinishedInfoAfterRetirement = (retPlayer : Player) => {
        let whoWon = retPlayer == Player.PLAYER_A ? "-/+" : "+/-";
        return () => {
            let res = getMatchResult(matchCounter.playerASetsScore, matchCounter.playerBSetsScore);
            sendMatchFinishedInfoWithResult(res + " " + whoWon);
        }
    }

    const sendMatchFinishedInfoWithResult = (result : string) => {
        let savedMatch : MatchRecord = {
            playeraname: route.params.playerAName,
            playerbname: route.params.playerBName,
            duration: formatSecondsToStr(elapsedSeconds),
            date: route.params.date,
            tournamentname: route.params.tournamentName,
            round: route.params.tournamentRound,
            result: result,
            umpire: ''
        };
        MatchHistoryManager.addMatchToHistory(savedMatch, matchCounter.playerAStats, matchCounter.playerBStats);
        navigate.navigate('Account');
    };

    const getPointResultFunction = (pointResult : PointResult) => {
        return (player : Player) => {
            return () => {
                matchCounter.handlePointResult(pointResult, player);
                setUpdateComponent(updateComponent + 1);
            }
        };
    };

    const decreaseChallanges = (player : Player) => {
        return () => {
            matchCounter.decreaseChallanges(player);
            setUpdateComponent(updateComponent + 1);
        };
    }

    const getView = () => {
        if(statsShown) {

            return <StatsPanel playerAName={route.params.playerAName}
                playerBName={route.params.playerBName}
                playerAScore={matchCounter.playerASetsScore}
                playerBScore={matchCounter.playerBSetsScore}
                playerAStats={matchCounter.playerAStats}
                playerBStats={matchCounter.playerBStats}
                matchDuration={formatSecondsToStr(elapsedSeconds)}
            />

        } else {

            return (<View style={styles.container}>
                <Text style={styles.matchInfo}>
                    {`${route.params.tournamentRound} of ${route.params.tournamentName}`}
                </Text>
                <PlayerScore
                    playerName={route.params.playerAName}
                    score={matchCounter.playerAScore}
                    isTiebreak={matchCounter.isTiebreak}
                />
                <PlayerScore
                    playerName={route.params.playerBName}
                    score={matchCounter.playerBScore}
                    isTiebreak={matchCounter.isTiebreak}
                />
                <ServePanel
                    servingPlayerName={getNameByPlayer(matchCounter.servingPlayer)}
                    timeout={25}
                    isFirstServe={matchCounter.isFirstServe}
                    aceCallback={getPointResultFunction(PointResult.ACE)(matchCounter.servingPlayer)}
                    errorCallback={() => {
                        matchCounter.handleServeError();
                        setUpdateComponent(updateComponent + 1);
                    }}
                />
                <StatResultButtons 
                    onHandleFunction={getPointResultFunction(PointResult.WINNER)}
                    buttonTitle={'       Winner      '}
                />
                <StatResultButtons 
                    onHandleFunction={getPointResultFunction(PointResult.UNFORCED_ERROR)}
                    buttonTitle={'Unforced error'}
                />
                <ChallangePanel
                    playerAChallanges={matchCounter.playerAChallanges}
                    playerBChallanges={matchCounter.playerBChallanges}
                    decreaseChallanges={decreaseChallanges}
                />
                <BreakPanel requestedPlayerRetired={sendMatchFinishedInfoAfterRetirement}
                    playerAName={route.params.playerAName}
                    playerBName={route.params.playerBName}/>
            </View>)

        }
    }

    return (<>
        {getView()}
        <View style={styles.buttons}>
            <Button title={`Finish match`}
                onPress={sendMatchFinishedInfo} color='#f54260' />
            <Button title={`${statsShown ? "Hide stats" : "Show stats"}`}
                onPress={() => setStatsShown(!statsShown)} color='#219ac7' />
        </View>
      </>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 100
    },

    buttons: {
        marginVertical: 20,
        marginHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    matchInfo: {
        marginVertical: 5,
        fontSize: 20,
    }
});

export default MatchPanel;