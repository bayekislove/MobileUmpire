import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import LoginPanel from './Components/Authentication/LoginPanel';
import RegisterPanel from './Components/Authentication/RegisterPanel';
import MatchPanel from './Components/Match/MatchPanel';
import AccountPanel from './Components/Profile/AccountPanel';
import ManageStats from './Components/Stats/ManageStats';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {

  return <NavigationContainer>
      <Stack.Navigator initialRouteName='Authentication'
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name='Login' component={LoginPanel} />
        <Stack.Screen name='Register' component={RegisterPanel} />
        <Stack.Screen name='Account' component={AccountPanel} />
        <Stack.Screen name='Match' component={MatchPanel} />
        <Stack.Screen name='Stats' component={ManageStats} />
      </Stack.Navigator>
    </NavigationContainer>

};
