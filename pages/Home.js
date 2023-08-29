/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */

//this is the code for the home page
import React, {useEffect} from 'react';
import {SafeAreaView, View, Text, Image} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

import MyButton from './components/MyButton';
import MyText from './components/MyText';

//connecting to the database
var db = openDatabase({name: 'people.db'});

//function for the home page
const Home = ({navigation}) => {
  useEffect(() => {
    //creating the table for the database
    db.transaction(function (txn) {
      //checking if the table exists
      txn.executeSql(
        "SELECT * FROM sqlite_master WHERE type='table' AND name='people'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          //if the table does not exist, create it
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS people', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS people(id INTEGER PRIMARY KEY AUTOINCREMENT, firstname VARCHAR(20), lastname VARCHAR(30), phonenumber VARCHAR(10), postalcode INT(5))',
              [],
            );
          }
        }
      );
    });
  }, []);

  //returning the home page with buttons for adding and viewing contacts
  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <MyText text="Welcome to Your Contacts!" />
          <Text style={{fontSize: 13}}>
            This is a simple app for storing your contacts
          </Text>
          <MyButton
            icon="account-plus-outline"
            text="Add Person"
            customClick={() => navigation.navigate('Add')}
          />
          <MyButton
            icon="account-box-multiple-outline"
            text="View People"
            customClick={() => navigation.navigate('Data')}
          />
          <Image
            style={{width: 200, height: 200, marginTop: 20}}
            source={{
              uri:'https://cdn.pixabay.com/animation/2023/06/13/15/13/15-13-36-234_512.gif'}} />
          </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
