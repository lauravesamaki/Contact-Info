/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */

//this is the code for showing the contacts data-page
import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Alert, FlatList} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

import MyText from './components/MyText';
import MyButton from './components/MyButton';
import MyRenderedView from './components/MyRenderedView';

//connecting to the database
var db = openDatabase({name: 'people.db'});

//function for showing the data from the database
const PeopleData = ({navigation}) => {
    //setting the state for the data
    const [isLoading, setLoading] = useState(true);
    const [people, setPeople] = useState([]);

    //function for getting the data from the database
    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM people',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                    }
                    setPeople(temp);
                }
            );
        });

        setLoading(false);
    }, []);

    //text that shows when the data is loading
    if (isLoading) {
        return (
            <View style={{flex: 1, padding: 20}}>
                <MyText text="Loading..." />
            </View>
        );
    }

    //function for confirming the deletion of a contact with parameters
    const deleteConfirmation = (id) => {
        Alert.alert(
            'Delete',
            'Are you sure you want to delete this person?',
            [
                {
                    text: 'Yes',
                    //pressing yes will call the deletePerson function
                    onPress: () => deletePerson(id)},
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            {cancelable: false}
        );
    };

    //function for deleting a contact with parameter (contact's id)
    const deletePerson = (id) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM people where id=?',
                [id],
                (tx, results) => {
                    //console.log shows the results in the console
                    console.log('Results', results.rowsAffected);
                    //if the results are bigger than 0, the contact is deleted
                    //user will get an alert that the contact is deleted or that the id is invalid
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Success',
                            'Person deleted successfully',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.navigate('Data'),
                                },
                            ],

                            {cancelable: false}
                        );
                    } else {
                        Alert.alert('Error', 'Please insert a valid ID');
                    }
                }
            );
        });

        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM people',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                    }
                    setPeople(temp);
                }
            );
        });
    };

    //function for rendering the data from the database and sorting the data by firstname
    const sortFirstname = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM people ORDER BY firstname ASC',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                    }
                    setPeople(temp);
                }
            );
        });
    };

    //function for rendering the data from the database and sorting the data by lastname
    const sortLastname = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM people ORDER BY lastname ASC',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                    }
                    setPeople(temp);
                }
            );
        });
    };

    //function for rendering the data from the database and sorting the data by postalcode
    const sortPostalcode = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM people ORDER BY postalcode ASC',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                    }
                    setPeople(temp);
                }
            );
        });
    };

    //function for rendering the data to flatlist
    const renderItem = ({item}) => {
        return (
            <MyRenderedView
                item={item}
                navigation={navigation}
                deletePerson={deleteConfirmation}
            />
        );
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        {/*buttons for navigating to home and add contact pages*/}
                        <MyButton
                            text="Home"
                            icon="home-outline"
                            customClick={() => navigation.navigate('Home')} />
                        <MyButton
                            text="Add Person"
                            icon="account-plus-outline"
                            customClick={() => navigation.navigate('Add')} />
                    </View>
                    <MyText text="List of Contacts" />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        }}>
                        {/*buttons for sorting the data by firstname, lastname and postalcode*/}
                        <MyButton
                            text="Firstname"
                            icon="sort-ascending"
                            customClick={sortFirstname} />
                        <MyButton
                            text="Lastname"
                            icon="sort-ascending"
                            customClick={sortLastname} />
                        <MyButton
                            text="Postalcode"
                            icon="sort-ascending"
                            customClick={sortPostalcode} />
                    </View>
                    {/*flatlist for showing the data*/}
                    <FlatList
                        data={people}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default PeopleData;
