import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';



export default class Login extends React.Component {
  render() {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
		  <Image style={{width: '150px', height: '150px'}} source={require('../assets/eaglelogo.png')} />
        <Text> Login </Text>
      </View>
    );
  }
}
