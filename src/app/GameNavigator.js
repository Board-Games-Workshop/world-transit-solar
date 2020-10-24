import React, { Component } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import FrontPage from './FrontPage';
import Rules from './Rules';
import Game from './Game';
import TokenSelect from './TokenSelect';

const Stack = createStackNavigator();

export default function GameNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={FrontPage} />
        <Stack.Screen name="Rules" component={Rules} />
        <Stack.Screen name="TokenSelect" component={TokenSelect} />
        <Stack.Screen name="Game" component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}