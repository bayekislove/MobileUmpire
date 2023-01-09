import React from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

type RoundPickerProps = {
    reportValue : (str: string) => void
};

const RoundPicker = (props : RoundPickerProps) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [items, setItems] = React.useState([
        {label: 'Final', value: 'Final'},
        {label: 'Semifinal', value: 'Semifinal'},
        {label: 'Quarterfinal', value: 'Quarterfinal'},
        {label: '1/8', value: '1/8'},
        {label: '1/16', value: '1/16'},
        {label: '1/32', value: '1/32'},
        {label: '1/64', value: '1/64'},
        {label: '1/128', value: '1/128'},
        {label: 'Group stage', value: 'Group stage'},
    ]);

    return (
        <View style={styles.container}>
            <DropDownPicker open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                maxHeight={1000}
                onChangeValue={(pickedVal : string | null) => {
                    props.reportValue(pickedVal as string);
                }}/>
        </View>
    );
};

const styles = StyleSheet.create({ 
    container: {
        paddingHorizontal: 5
    },
});

export default RoundPicker;