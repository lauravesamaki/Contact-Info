/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */

//this is the code for adding a new contact
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from 'react-native';
import MyInput from './components/MyInput';
import MyButton from './components/MyButton';
import {openDatabase} from 'react-native-sqlite-storage';
import MyText from './components/MyText';

//connecting to the database
var db = openDatabase({name: 'people.db'});

//function for adding a new contact
const AddPerson = ({navigation}) => {
    let [firstname, setFirstname] = useState('');
    let [lastname, setLastname] = useState('');
    let [phonenumber, setPhonenumber] = useState('');
    let [postalcode, setPostalcode] = useState('');
    //converting the postalcode to an integer for database
    let intPostalcode = parseInt(postalcode);

    //function for confirming the addition of a new contact
    const confirm = () => {
        Alert.alert(
            'Confirm',
            'Are you sure you want to add this person?',
            [
                {
                    text: 'Yes',
                    onPress: () => add_person(),
                },
                {
                    text: 'No',
                    onPress: () => console.log('No Pressed'),
                    style: 'cancel',
                },
            ],
            {cancelable: false},
        );
    };

    //function for adding a new contact with parameters
    const add_person = () => {
        console.log(firstname, lastname, phonenumber, intPostalcode);

        //validation for the input fields
        if (!firstname) {
            Alert('Please fill firstname');
            return;
        }
        if (!lastname) {
            Alert('Please fill lastname');
            return;
        }
        if (!phonenumber) {
            Alert('Please fill phonenumber');
            return;
        }
        if (!postalcode) {
            Alert('Please fill postalcode');
            return;
        }

        //inserting the data into the database
        db.transaction(function (tx) {
            //executing sql query for inserting the data
            tx.executeSql(
                'INSERT INTO people (firstname, lastname, phonenumber, postalcode) VALUES (?,?,?,?)',
                [firstname, lastname, phonenumber, intPostalcode], //parameters for the query
                (_tx, results) => {
                    console.log('Results', results.rowsAffected);
                    //if the results are bigger than 0, the contact is added
                    //user will get an alert that the contact is added or that the addition failed
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Success',
                            'You added new person successfully!',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.navigate('Home'),
                                },
                            ],
                            {cancelable: false},
                        );
                    } else {
                        Alert.alert(
                            'Error',
                            'Registration Failed');
                    }
                },
            );
        });
    };

    //returning the view with navigation buttons and input fields for adding a new contact
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={{flex: 1}}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <MyButton
                                text="Home"
                                icon="home-outline"
                                customClick={() => navigation.navigate('Home')} />
                            <MyButton
                                text="Data"
                                icon="account-box-multiple-outline"
                                customClick={() => navigation.navigate('Data')} />
                        </View>
                        <MyText text="Add Person" />
                        <KeyboardAvoidingView
                            behavior="padding"
                            style={{flex: 1, justifyContent: 'space-between'}}>
                            <MyInput
                                label="First Name"
                                placeholder="Enter First Name"
                                onChangeText={(firstname) => setFirstname(firstname)}
                                style={{padding: 10}}
                                maxLength={20}
                            />
                            <MyInput
                                label="Last Name"
                                placeholder="Enter Last Name"
                                onChangeText={(lastname) => setLastname(lastname)}
                                style={{ padding: 10}}
                                maxLength={30}
                            />
                            <MyInput
                                label="Phone Number"
                                placeholder="Enter Phone Number"
                                onChangeText={(phonenumber) => setPhonenumber(phonenumber)}
                                maxLength={10}
                                keyboardType="numeric"
                                style={{ textAlignVertical: 'top', padding: 10}}
                            />
                            <MyInput
                                label="Postal Code"
                                placeholder="Enter Postal Code"
                                onChangeText={(postalcode) => setPostalcode(postalcode)}
                                maxLength={5}
                                keyboardType="numeric"
                                style={{ textAlignVertical: 'top', padding: 10}}
                            />
                            <MyButton
                                icon="note-plus-outline"
                                text="Submit"
                                customClick={confirm} />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AddPerson;
