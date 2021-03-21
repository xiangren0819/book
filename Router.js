import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BookList from './BookList';
import BookNew from './BookNew';
import BookDetial from './BookDetial';

const Stack = createStackNavigator();


export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name="BookList" component={BookList} />
                <Stack.Screen name="BookNew" component={BookNew} />
                <Stack.Screen name="BookDetial" component={BookDetial} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}