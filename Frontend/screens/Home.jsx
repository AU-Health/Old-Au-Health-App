import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Login from './Login';
import WheelOfWellness from './WheelOfWellness'




export default class HomeScreen extends React.Component {
  render() {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         {/* <Login />  */}
         <WheelOfWellness />
       
      </View>
    );
  }
}
