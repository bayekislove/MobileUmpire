import React from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

type SetsNumberPickerProps = {
    reportValue : (val: number) => void
};

const SetsNumberPicker = (props : SetsNumberPickerProps) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [items, setItems] = React.useState([
        {label: '1', value: '1'},
        {label: '3', value: '3'},
        {label: '5', value: '5'},
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
                    props.reportValue(parseInt(pickedVal as string));
                }}/>
        </View>
    );
};

const styles = StyleSheet.create({ 
    container: {
        paddingHorizontal: 5
    },
});

export default SetsNumberPicker;