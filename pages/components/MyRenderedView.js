/* eslint-disable prettier/prettier */

//styled view-component
import React from 'react';
import {View, StyleSheet} from 'react-native';

import MyCard from './MyCard';
import MyIcon from './MyIcon';

const MyRenderedView = ({item, deletePerson, navigation}) => {
  return (
    //components are wrapped in a view
    //my other components are imported here
    <View
      style={styles.container}>
      <MyCard person={item} />
      {/* icon for deleting a contact and editing it */}
      <MyIcon
        icon="delete-outline"
        customClick={() => deletePerson(item.id)} />
      <MyIcon
        icon="account-edit-outline"
        customClick={() =>
          navigation.navigate('Update', {
            id: `${item.id}`,
          })
        }
      />
    </View>
  );
};

//styling for the components
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '90%',
    },
});

export default MyRenderedView;
