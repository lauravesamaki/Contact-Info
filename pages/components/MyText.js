/* eslint-disable prettier/prettier */

//styled text-component
import React from 'react';
import {Text, StyleSheet} from 'react-native';

//function for styling the text
const MyText = props => {
  return <Text style={styles.text}>{props.text}</Text>;
};

//styling for the text
const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default MyText;
