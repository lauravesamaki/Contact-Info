/* eslint-disable prettier/prettier */

//styled icon-component
import React from 'react';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, TouchableOpacity } from 'react-native';

//function for styling the icon
const MyIcon = props => {
  return (
    <TouchableOpacity onPress={props.customClick}>
      <Button style={styles.button}>
        <Icon
          name={props.icon}
          color="#d49391"
          size={21} />
      </Button>
    </TouchableOpacity>
  );
};

//styling for the icon
const styles = StyleSheet.create({
  button: {
    margin: -15,
    marginRight: 5,
    padding: 0,
  },
});

export default MyIcon;
