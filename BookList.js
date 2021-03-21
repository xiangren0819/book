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
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import axios from 'axios';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const BookList: () => Node = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [NumberofBook, setNumberofBook] = useState(6);
  const [AllBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://fe-interview-api.unnotech.com/books',
      );

      setAllBooks(result.data);
    };

    fetchData();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : "#F5F5F5",
  };

  function DeleteBook(_NumberofBook) {

  }

  function onPressLoadMore() {
    setNumberofBook((NumberofBook + 6) < AllBooks.length ? (NumberofBook + 6) : AllBooks.length)
  }

  onPressDetial = (_bookID) => {
    navigation.navigate('BookDetial', { bookID: _bookID, })
  }

  //建立相簿數量
  function MakeBookList(_NumberofBook) {
    var view = [];
    AllBooks.map((item, index, elements) => {
      if ((index % 2) == 0) {
        view.push(<View style={[styles.bookBlocks]}>
          <View style={[styles.bookBlock]} >
            <View>
              <Text style={[styles.bookDelete]}>X</Text>
              <TouchableHighlight onPress={() => onPressDetial(elements[index].id)}>
                <View>
                  {/* <Image
                style={[styles.bookDescript]}
                source={{
                  uri: elements[index].image
                }}
              />
              <Text style={[styles.bookPublisDate]}>{elements[index].name}</Text> */}
                  <Text style={[styles.bookDescript]}>{elements[index].descript ? elements[index].descript : "null"}</Text>
                  <View style={{ flexDirection: 1, flexDirection: "row" }}>
                    <Text style={[styles.bookPublisDate, { borderRightWidth: 1 }]}>{elements[index].author ? elements[index].author : "null"}</Text>
                    <Text style={[styles.bookPublisDate]}>{elements[index].created ? elements[index].created : "N/A"}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          </View>
          <View style={[styles.bookBlock, { backgroundColor: AllBooks.length == (index + 1) ? "#F5F5F5" : "#FFFFFF" }]}>
            {(AllBooks.length > index + 1) ?
              <View>
                <Text style={[styles.bookDelete]}>X</Text>
                <TouchableHighlight onPress={() => onPressDetial(elements[index + 1].id)}>
                  <View>
                    {/* <Image
                  style={[styles.bookDescript]}
                  source={{
                    uri: elements[index + 1].image
                  }}
                />
                <Text style={[styles.bookPublisDate]}>{elements[index + 1].name}</Text> */}
                    <Text style={[styles.bookDescript]}>{elements[index + 1].descript ? elements[index + 1].descript : "null"}</Text>
                    <View style={{ flexDirection: 1, flexDirection: "row" }}>
                      <Text style={[styles.bookPublisDate, { borderRightWidth: 1 }]}>{elements[index + 1].author ? elements[index + 1].author : "null"}</Text>
                      <Text style={[styles.bookPublisDate]}>{elements[index + 1].created ? elements[index + 1].created : "N/A"}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </View>
              : null}
          </View>
        </View>);
      }
    })
    return view
  }

  return (
    <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      < ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[backgroundStyle, { flex: 1 }]}>
        <View style={[styles.barStyle]}>
          <TouchableOpacity onPress={() => navigation.navigate('BookNew')}>
            <Text style={[styles.barButton]}>New</Text>
          </TouchableOpacity>
        </View>
        {MakeBookList(NumberofBook)}
        {/* <View style={{ flex: 1, height: 60, margin: 10, backgroundColor: "#F5F5F5" }}>
          <Button
            onPress={onPressLoadMore}
            style={{ height: 50, }}
            title="Load More"
            color="#FFC35F"
            accessibilityLabel="Learn more about this purple button"
          />
        </View> */}
      </ScrollView >
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  barStyle: {
    flex: 1,
    height: 50,
    backgroundColor: "#FFC35F",
    justifyContent: "center"
  },
  barButton: {
    color: "#FFFFFF",
    fontSize: RFValue(13, 580),
    alignSelf: "flex-end",
    textAlign: "right",
    textAlignVertical: "center",
    marginRight: 7
  },
  bookBlocks: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    flexDirection: 'row',
  },
  bookBlock: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.white,
    textAlignVertical: "center",
    margin: 15,
  },
  bookDelete: {
    flex: 1,
    fontSize: RFValue(14, 580),
    textAlignVertical: "center",
    textAlign: "center",
    fontWeight: "bold",
    padding: 7,
    borderBottomWidth: 1,
  },
  bookDescript: {
    flex: 2,
    height: 100,
    fontSize: RFValue(14, 580),
    // height: "100%",
    color: "#A0A0A0",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderBottomWidth: 1
  },
  bookPublisDate: {
    flex: 1,
    padding: 7,
    fontSize: RFValue(10, 580),
    color: "#A0A0A0",
    textAlignVertical: "center",
    textAlign: "left",
  }

});

export default BookList;
