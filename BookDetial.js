/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type { Node } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    Alert,
    TouchableHighlight,
    KeyboardAvoidingView
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import axios from 'axios';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const BookDetial: () => Node = ({ route, navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const [EditEnable, setEditEnable] = useState(false);
    const [NameOFBook, setNameOFBook] = useState("Moon");
    const [CreateTimeOFBook, setCreateTimeOFBook] = useState("*966.28");
    const [AuthorOFBook, setAuthorOFBook] = useState("Tommy");
    const [DescriptionsOFBook, setDescriptionsOFBook] = useState("asd486q416w5e16q5w1e56qw1");
    const { bookID } = route.params;

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : "#F5F5F5",
    };



    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://fe-interview-api.unnotech.com/books/' + bookID,
            );

            setNameOFBook(result.data.name);
            setAuthorOFBook(result.data.author);
            setCreateTimeOFBook(result.data.created);
            setDescriptionsOFBook(result.data.descript);
            // setAllBooks(result.data);
        };

        fetchData();
    }, []);

    function saveBookDetial() {
        if (EditEnable) {
            axios.patch(
                'https://fe-interview-api.unnotech.com/books/' + bookID, {
                author: AuthorOFBook,
                created: CreateTimeOFBook,
                descript: DescriptionsOFBook,
            })
                .then(function (response) {
                    console.log(response);
                    Alert.alert("儲存成功");
                    navigation.navigate('BookList')
                })
                .catch(function (error) {
                    console.log(error);
                    Alert.alert("儲存失敗");
                });

        } else {
            setEditEnable(!EditEnable)
        }
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
            {/* <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}> */}
            <KeyboardAvoidingView
                behavior={"position"}
                style={{
                    backgroundColor: "#F5F5F5",
                }}>
                <View style={[styles.barStyle]}>
                    <TouchableHighlight onPress={() => navigation.navigate('BookList')}><Text style={[styles.barButton, { flex: 1, }]} >Back</Text></TouchableHighlight>
                    <Text style={[styles.barButton, { flex: 3, fontSize: RFValue(16, 580), }]}
                        ellipsizeMode="middle"
                        numberOfLines={1}
                    >{NameOFBook}</Text>
                    <TouchableHighlight onPress={() => saveBookDetial()}><Text style={[styles.barButton, { flex: 1, }]} >{EditEnable ? "Save" : "Edit"}</Text></TouchableHighlight>
                </View>

                <View style={{ flexDirection: "row", }}>
                    <TextInput style={[styles.bookPublisDate, { flex: 3, color: EditEnable ? "#000000" : "#A0A0A0", }]}
                        placeholder="Author"
                        onChangeText={setAuthorOFBook}
                        value={AuthorOFBook}
                        editable={EditEnable}
                    />
                    <TextInput style={[styles.bookPublisDate, { flex: 2, color: EditEnable ? "#000000" : "#A0A0A0", }]}
                        placeholder="CreateTime"
                        onChangeText={setCreateTimeOFBook}
                        value={CreateTimeOFBook}
                        editable={EditEnable}
                    />
                </View>
                <TextInput style={[styles.bookDescript, { color: EditEnable ? "#000000" : "#A0A0A0", }]}
                    placeholder="Descriptions"
                    onChangeText={setDescriptionsOFBook}
                    value={DescriptionsOFBook}
                    editable={EditEnable}
                    multiline
                    numberOfLines={8}
                />

            </KeyboardAvoidingView>
            {/* </ScrollView> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    barStyle: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: "#FFC35F",
        justifyContent: "center",
    },
    barButton: {
        fontSize: RFValue(13, 580),
        color: "#FFFFFF",
        textAlign: "center",
        textAlignVertical: "center",
        margin: 7,
    },
    bookDescript: {
        minHeight: 200,
        fontSize: RFValue(16, 580),
        margin: 7,
        color: "#A0A0A0",
        backgroundColor: "#FFFFFF",
        borderRadius: 5,
        // color: "#636363"
    },
    bookPublisDate: {
        height: 50,
        fontSize: RFValue(14, 580),
        margin: 7,
        color: "#A0A0A0",
        backgroundColor: "#FFFFFF",
        borderRadius: 5
    },

});

export default BookDetial;
