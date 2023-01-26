import React from 'react';
import { StyleSheet, Text, Button, Modal, View } from 'react-native';

type BreakInfoProps = {
    isVisible: boolean,
    requestingPlayerName: string,
    discardCreation: () => void,
    requestedPlayerRetired: () => void
};

const BreakInfo = (props : BreakInfoProps) => {
    const [elapsedSeconds, setElapsedSeconds] = React.useState<number>(0);

    React.useEffect(() => {
        setElapsedSeconds(0);
    }, [props.isVisible]);

    React.useEffect(() => {
        const timer = setInterval(() => setElapsedSeconds(elapsedSeconds + 1), 1000);
        return () => clearInterval(timer);
    }, [elapsedSeconds]);

    const formatElapsedSecondsToStr = () => {
        let minutes : number = Math.floor(elapsedSeconds / 60);
        let seconds : number = elapsedSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (<Modal visible={props.isVisible} transparent={true} style={styles.centeredModal}>
            <View style={styles.container}>
                <Text style={styles.requestingUserInfo}>
                    {`Break for: ${props.requestingPlayerName}`}
                </Text>
                <Text style={styles.breakDurationText}>
                    {`Duration: ${formatElapsedSecondsToStr()}`}
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
    
    breakDurationText: {
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
