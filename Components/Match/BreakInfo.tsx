import React from 'react';
import { StyleSheet, Text, Button, TextInput, Modal, View } from 'react-native';

type BreakInfoProps = {
    isVisible: boolean,
    requestingPlayerName: string,
    discardCreation: () => void,
    requestedPlayerRetired: () => void
};

const BreakInfo = (props : BreakInfoProps) => {
    return (<Modal visible={props.isVisible} transparent={true} style={styles.centeredModal}>
            <View style={styles.container}>
                <Text style={styles.requestingUserInfo}>
                    {`Break for: ${props.requestingPlayerName}`}
                </Text>
                <View style={styles.buttons}>
                    <Button title={"RETIRE"} color="#ce1616"
                        onPress={props.requestedPlayerRetired} />
                    <Button title={"CANCEL"} color="#219ac7"
                        onPress={props.discardCreation} />
                </View>
            </View>
        </Modal>);
};

const styles = StyleSheet.create({
    centeredModal: {
        flex: 1,
        marginVertical: 100,
        justifyContent: "center",
        alignItems: "center",
    },

    container: {
        marginHorizontal: 20,
        marginVertical: 130,
        borderWidth: 2,
        borderRadius: 2,
        backgroundColor: '#a1a1a1'
    },

    requestingUserInfo: {
        textAlign: 'center',
        fontSize: 20
    },
    
    buttons: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginVertical: 20,
        marginHorizontal: 40
    }
});

export default BreakInfo;
