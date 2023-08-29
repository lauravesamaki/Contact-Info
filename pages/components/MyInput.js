/* eslint-disable prettier/prettier */

//styled text input-component
import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

//function for styling the text input
const MyInput = props => {
    return (
        <View>
            <Text style={styles.text}>{props.label}</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder={props.placeholder}
                    onChangeText={props.onChangeText}
                    value={props.value}
                    maxLength={props.maxLength}
                />
            </View>
        </View>
    );
};

//styling for the text input
const styles = StyleSheet.create({
    inputView: {
        color: 'black',
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 35,
        marginRight: 35,
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'grey',
    },
    input: {
        height: 50,
        color: 'black',
        paddingLeft: 20,
        paddingRight: 20,
    },
    text: {
        color: 'black',
        fontSize: 16,
        marginLeft: 38,
    },
});

export default MyInput;
