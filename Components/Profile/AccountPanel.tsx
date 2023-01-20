import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';
import IdentityManager from '../../Logic/IdentityManager';
import MatchHistoryManager, { MatchRecord } from '../../Logic/MatchHistoryManager';
import MatchEntry from './MatchEntry';

import CreateNewMatch from './CreateNewMatch';

const NEW_MATCH_BUTTON_COLOR : string = '#e28743';
const LOGOUT_BUTTON_COLOR : string = '#ce1616';

type ToLoginNavigation = {
    navigate: (value: string) => void;
};

type ToStatsNavigation = {
    navigate: (value: string, {}) => void;
}

const AccountPanel = () => {

    const toLoginNavigation = useNavigation<ToLoginNavigation>();
    const toStatsNavigation = useNavigation<ToStatsNavigation>();

    const [createNewMatchVisible, setCreateNewMatchVisible] = React.useState(false);
    const [matchHistory, setMatchHistory] = React.useState<MatchRecord[]>([]);
    const [loggedUser, setLoggedUser] = React.useState("");

    useFocusEffect(
        React.useCallback(() => {
            MatchHistoryManager.getMatchHistoryForPlayer()
            .then((res) => {
                setMatchHistory(res as MatchRecord[]);
            })
            .catch((err) => {
                console.log("ERROR");
            });

            IdentityManager.loggedUser()
            .then((res) => {
                setLoggedUser(res);
            })
            .catch((err) => {
                console.error("Logged user cannot be fetched");
                console.log(err);
            });

            setCreateNewMatchVisible(false);
    }, []));

    const getMatchEntries = (matchRecords : MatchRecord[]) => {
        return matchRecords.map(
            (matchRecord, i) => <MatchEntry match={matchRecord} key={i}
                showStatsCallback={getShowMatchStatsCallback(matchRecord.id as number)} />);
    };

    const getShowMatchStatsCallback = (matchId : number) => {
        return async () => {
            let stats = await MatchHistoryManager.getMatchStatsForMatch(matchId);
            console.log(stats);
            console.log(matchId);
            toStatsNavigation.navigate('Stats', {
                matchInfo: matchHistory.find(match => match.id == matchId)
            });
        }
    }

    const createNewMatch = () => {
        setCreateNewMatchVisible(true);
    };

    const onLogout = () => {
        IdentityManager.Logout();
        toLoginNavigation.navigate('Login');
    };

    return (<View style={styles.container}>
                <Text style={styles.loggedUserInfo}>
                    {`Hi, ${loggedUser}!`}
                </Text>
                <View style={styles.button}>
                    <Button title='Create new match' onPress={createNewMatch}
                        color={NEW_MATCH_BUTTON_COLOR} />
                    <CreateNewMatch isVisible={createNewMatchVisible}
                        discardCreation={() => {setCreateNewMatchVisible(false)}} />
                </View>
                <View style={styles.button}>
                    <Button title='Logout' onPress={onLogout} color={LOGOUT_BUTTON_COLOR} />
                </View>
                <Text style={styles.loggedUserInfo}>{'Your match history'}</Text>
                <ScrollView>
                    {getMatchEntries(matchHistory)}
                </ScrollView>
            </View>)

};

const styles = StyleSheet.create({ 
    container: {
        marginVertical: 60,
        marginHorizontal: 20,
    },

    loggedUserInfo: {
        marginVertical: 5,
        fontSize: 25,
        textAlign: 'center'
    },

    matchHistoryInfo: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20
    },

    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    button: {
        marginTop: 10,
        marginHorizontal: 70
    },

});

export default AccountPanel;