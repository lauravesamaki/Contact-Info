/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */

import React, {useState, useEffect} from 'react';
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

var db = openDatabase({name: 'people.db'});

//show person data in text inputs. This is the update page
//id is passed as a parameter from the previous page
const UpdatePerson = ({route, navigation}) => {
    let [oldFirstname, setOldFirstname] = useState('');
    let [oldLastname, setOldLastname] = useState('');
    let [oldPhonenumber, setOldPhonenumber] = useState('');
    let [oldPostalcode, setOldPostalcode] = useState('');
    //values default to the old values
    let [firstname, setFirstname] = useState('');
    let [lastname, setLastname] = useState('');
    let [phonenumber, setPhonenumber] = useState('');
    let [postalcode, setPostalcode] = useState('');
    let intPostalcode = parseInt(postalcode);

    const confirm = () => {
        Alert.alert(
            'Confirm',
            'Are you sure you want to update this person?',
            [
                {
                    text: 'Yes',
                    onPress: () => update_person(),
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

    const update_person = () => {
        console.log(firstname, lastname, phonenumber, intPostalcode);

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

        db.transaction(function (tx) {
            tx.executeSql(
                'UPDATE people set firstname=?, lastname=?, phonenumber=?, postalcode=? where id=?',
                [firstname, lastname, phonenumber, intPostalcode, route.params.id],
                (_tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Success',
                            'You updated person successfully!',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.navigate('Home'),
                                },
                            ],
                            {cancelable: false},
                        );
                    } else {
                        Alert.alert('Error', 'Updation Failed');
                    }
                },
            );
        });
    };

    useEffect(() => {
        const person = () => {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM people where id = ?',
                    [route.params.id],
                    (tx, results) => {
                        var len = results.rows.length;
                        console.log('len', len);
                        if (len > 0) {
                            setOldFirstname(results.rows.item(0).firstname);
                            setOldLastname(results.rows.item(0).lastname);
                            setOldPhonenumber(results.rows.item(0).phonenumber);
                            setOldPostalcode(results.rows.item(0).postalcode.toString());
                        } else {
                            Alert.alert('No person found');
                            setOldFirstname('');
                            setOldLastname('');
                            setOldPhonenumber('');
                            setOldPostalcode('');
                        }
                    },
                );
            });
        };
        person();
        setFirstname(oldFirstname);
        setLastname(oldLastname);
        setPhonenumber(oldPhonenumber);
        setPostalcode(oldPostalcode);
    }, [route.params.id, oldFirstname, oldLastname, oldPhonenumber, oldPostalcode]);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <KeyboardAvoidingView
                        behavior="padding"
                        style={{flex: 1, justifyContent: 'space-between'}}>
                        <MyText text="Update Person" />
                        <MyInput
                            label="First Name"
                            placeholder="Enter First Name"
                            onChangeText={(firstname) => setFirstname(firstname)}
                            value={firstname}
                            style={{padding: 10}}
                            maxLength={20}
                        />
                        <MyInput
                            label="Last Name"
                            placeholder="Enter Last Name"
                            onChangeText={(lastname) => setLastname(lastname)}
                            value={lastname}
                            style={{padding: 10}}
                            maxLength={30}
                        />
                        <MyInput
                            label="Phone Number"
                            placeholder="Enter Phone Number"
                            onChangeText={(phonenumber) => setPhonenumber(phonenumber)}
                            keyboardType="numeric"
                            maxLength={10}
                            value={phonenumber}
                            style={{padding: 10}}
                        />
                        <MyInput
                            label="Postal Code"
                            placeholder="Enter Postal Code"
                            onChangeText={(postalcode) => setPostalcode(postalcode)}
                            keyboardType="numeric"
                            maxLength={5}
                            value={postalcode}
                            style={{padding: 10}}
                        />
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
                            <MyButton
                                icon="clipboard-edit-outline"
                                title="Save"
                                customClick={confirm}
                                text="Save"
                            />
                            <MyButton
                                icon="cancel"
                                title="Cancel"
                                customClick={() => navigation.navigate('Data')}
                                text="Cancel"
                            />
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default UpdatePerson;
