import React from 'react';
import { StyleSheet, View, Text, Button, TextInput, Modal } from 'react-native';
import RoundPicker from './RoundPicker';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SetsNumberPicker from './SetsNumberPicker';

type CreateNewMatchType = {
    isVisible: boolean,
    discardCreation: () => void
};

type ToMatchNavigation = {
    navigate: (value: string, {}) => void;
};

const CREATE_BUTTON_COLOR : string = '#e28743';
const DISCARD_BUTTON_COLOR : string = '#ce1616';

const CreteNewMatch = (props : CreateNewMatchType) => {
    const toMatchNavigation = useNavigation<ToMatchNavigation>();
    const [playerAName, setPlayerAName] = React.useState("");
    const [playerBName, setPlayerBName] = React.useState("");
    const [tournamentName, setTournamentName] = React.useState("");
    const [tournamentRound, setTournamentRound] = React.useState("");
    const [numberOfSets, setNumberOfSets] = React.useState(0);

    useFocusEffect(
        React.useCallback(() => {
           setPlayerAName("");
           setPlayerBName("");
           setTournamentName("");
           setTournamentRound("");
           setNumberOfSets(0);
    }, []));

    const startNewMatch = () => {
        if(playerAName == "" || playerBName == "" || numberOfSets == 0) {
            return;
        };
        toMatchNavigation.navigate('Match', {
            playerAName: playerAName,
            playerBName: playerBName,
            tournamentName: tournamentName,
            tournamentRound: tournamentRound,
            numberOfSets: numberOfSets,
            date: new Date().toDateString(),
            matchStart: new Date().getTime() / 1000
        });
    };

    return (<Modal visible={props.isVisible} transparent={true} style={styles.centeredModal}>
        <View style={styles.container}>
            <Text style={styles.gameOptionsStyle}>{"New game options"}</Text>
            <Text style={styles.descriptionStyle}>{"First player:"}</Text>
            <TextInput style={styles.input}
                onChangeText={name => setPlayerAName(name)}/>

            <Text style={styles.descriptionStyle}>{"Second player:"}</Text>
            <TextInput style={styles.input}
                onChangeText={name => setPlayerBName(name)}/>

            <Text style={styles.descriptionStyle}>{"Tournament name:"}</Text>
            <TextInput style={styles.input}
                onChangeText={name => setTournamentName(name)}/>
            
            <Text style={styles.descriptionStyle}>{"Round:"}</Text>
            <RoundPicker reportValue={setTournamentRound} />

            <Text style={styles.descriptionStyle}>{"Number of sets:"}</Text>
            <SetsNumberPicker reportValue={setNumberOfSets} />

            <View style={styles.buttonsContainer}>
                <View style={styles.button}>
                    <Button title="Discard" color={DISCARD_BUTTON_COLOR}
                        onPress={props.discardCreation}/>
                </View>
                <View style={styles.button}>
                    <Button title="Create" color={CREATE_BUTTON_COLOR}
                        onPress={startNewMatch}/>
                </View>
            </View>
        </View>
    </Modal>);

};

const styles = StyleSheet.create({ 
    centeredModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 60,
    },
    
    container: {
        marginVertical: 90,
        marginHorizontal: 20,
        borderWidth: 2,
        borderRadius: 2,
        backgroundColor: '#a1a1a1'
    },

    gameOptionsStyle: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 20
    },

    descriptionStyle: {
        textAlign: 'center',
        fontSize: 20
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20
    },

    button: {
        width: '30%',
        marginHorizontal: 20,
    },

    input: {
        height: 40,
        marginTop: 10,
        margin: 5,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#fffdfc'
    },

});

export default CreteNewMatch;
