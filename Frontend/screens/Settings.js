import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

export default class SettingScreen extends React.Component {
  render() {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> This the Settings screen </Text>
      </View>
    );
  }
}
