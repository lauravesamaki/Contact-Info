import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';

import Home from './pages/Home';
import AddPerson from './pages/Add';
import PeopleData from './pages/Data';
import UpdatePerson from './pages/Update';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  navButton: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

//navigation options
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Your Contacts'}}
          style={styles.navButton}
        />
        <Stack.Screen
          name="Add"
          component={AddPerson}
          options={{title: 'Add Person'}}
          style={styles.navButton}
        />
        <Stack.Screen
          name="Data"
          component={PeopleData}
          options={{title: 'Data of Persons'}}
          style={styles.navButton}
        />
        <Stack.Screen
          name="Update"
          component={UpdatePerson}
          options={{title: 'Update Person'}}
          style={styles.navButton}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
