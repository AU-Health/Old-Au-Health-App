import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Login from './Login';


const participants = [
  '%10',
  '%20',
  '%30',
  '%40',
  '%50',
  '%60',
  '%70',
  '%90',
  'FREE',
];

export default class HomeScreen extends React.Component {
  render() {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         {/*}<Login />*/}
        {/* <ReactSpinner /> */}

      </View>
    );
  }
}
