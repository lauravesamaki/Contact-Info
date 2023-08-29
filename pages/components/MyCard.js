/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

//styled card-component
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

//function for styling the card
const MyCard = ({person}) => {
  return (
    <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>{person.firstname} {person.lastname}</Text>
        </View>
        <Text style={styles.text}>Phone: {person.phonenumber}</Text>
        <Text style={styles.text}>Postalcode: {person.postalcode}</Text>
    </View>
  );
};

//styling for the card
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 20,
        marginRight: -50,
        alignItems: 'center',
        width: '70%',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    text: {
        fontSize: 14,
        marginBottom: 5,
    },
});

export default MyCard;
