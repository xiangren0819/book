/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type { Node } from 'react';
import {
    SafeAreaView,
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

const BookDetial: () => Node = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const [CreateTimeOFBook, setCreateTimeOFBook] = useState("");
    const [AuthorOFBook, setAuthorOFBook] = useState("");
    const [DescriptionsOFBook, setDescriptionsOFBook] = useState("");

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : "#F5F5F5",
    };

    function saveNewBook() {
        if (CreateTimeOFBook == "" || AuthorOFBook == "") {
            Alert.alert("作者與創立時間不可空白")
            return;
        }
        axios.post("https://fe-interview-api.unnotech.com/books", {
            author: AuthorOFBook,
            created: CreateTimeOFBook,
            descript: DescriptionsOFBook
        })
            .then(function (response) {
                console.log(response);
                Alert.alert("儲存成功");
                navigation.navigate('BookList')
            })
            .catch(function (error) {
                console.log("error");
                Alert.alert("儲存失敗");
            });
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
                    backgroundColor: "#F5F5F5"
                }}>
                <View style={[styles.barStyle]}>
                    <TouchableHighlight onPress={() => navigation.navigate('BookList')}><Text style={[styles.barButton, { flex: 1, }]} >Back</Text></TouchableHighlight>
                    <Text style={[styles.barButton, { flex: 3, fontSize: RFValue(16, 580), }]}>Add new book</Text>
                    <TouchableHighlight onPress={() => saveNewBook()}><Text style={[styles.barButton, { flex: 1, }]} >Save</Text></TouchableHighlight>
                </View>

                <TextInput
                    style={styles.inputView}
                    // onChangeText={onChangeText}
                    placeholder="Author"
                    onChangeText={setAuthorOFBook}
                    value={AuthorOFBook}
                />
                <TextInput
                    style={styles.inputView}
                    // onChangeText={onChangeText}
                    placeholder="Create at"
                    onChangeText={setCreateTimeOFBook}
                    value={CreateTimeOFBook}
                />
                <TextInput
                    style={[styles.inputView, { minHeight: 150 }]}
                    // onChangeText={onChangeText}
                    placeholder="Type Image URL"
                    onChangeText={setDescriptionsOFBook}
                    value={DescriptionsOFBook}
                    multiline
                    numberOfLines={6}
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
    inputView: {
        height: 50,
        margin: 10,
        backgroundColor: "#FFFFFF",
        borderRadius: 5
    }

});

export default BookDetial;
