/* eslint-disable prettier/prettier */

//styled button-component
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import { Button } from 'react-native-paper';

//function for styling the button
const MyButton = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Button
          icon={props.icon}
          mode="contained"
          onPress={props.customClick}
          style={styles.button}>
          {props.text}
        </Button>
      </TouchableOpacity>
    </View>
  );
};

//styling for the button
const styles = StyleSheet.create({
  button: {
    width: 'auto',
    height: 40,
    margin: 10,
    backgroundColor: '#94a7aa',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyButton;
