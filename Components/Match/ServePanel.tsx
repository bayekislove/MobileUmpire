import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import ServeButtons from './ServeButtons';

type ServePanelProps = {
    servingPlayerName: string,
    timeout: number,
    isFirstServe: boolean,
    aceCallback: () => void,
    errorCallback: () => void
}

const firstServeStr : string = "First serve";
const secondServeStr : string = "Second serve";

const ServePanel = (props : ServePanelProps) => {
    const [counter, setCounter] = React.useState(props.timeout);

    React.useEffect(() => {
        const timer = setInterval(() => setCounter(counter == 0 ? 0 : counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    React.useEffect(() => {
        setCounter(props.timeout);
    }, [props]);

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.servingPlayerName}>
                    {`Now serving: ${props.servingPlayerName}`}
                </Text>
                <Text style={styles.serveTimer}>
                    {counter}
                </Text>
            </View>
            <View>
                <Text style={styles.pointHistory}>
                    {`${props.isFirstServe ? firstServeStr : secondServeStr}`}
                </Text>
                <ServeButtons onAce={onAce}
                    onError={onError}
                    onLet={onLet}/>
            </View>
        </View>
        
    );

    function onAce() {
        return () => {
            setCounter(props.timeout);
            props.aceCallback();
        };
    }

    function onError() {
        return () => {
            setCounter(props.timeout);
            props.errorCallback();
        };
    };

    function onLet() {
        return () => {
            setCounter(props.timeout);
        };
    };
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    servingPlayerName: {
        marginVertical: 3,
        marginTop: 20,
        fontSize: 20
    },

    pointHistory: {
        marginVertical: 3,
        fontSize: 20
    },

    serveTimer: {
        marginVertical: 3,
        marginTop: 20,
        fontSize: 20,
        color: '#0d0103'
    },

    serveTimerExpired: {
        marginVertical: 3,
        fontSize: 20,
        color: '#d12145'
    },
  });

export default ServePanel;