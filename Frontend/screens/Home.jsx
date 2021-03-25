import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Login from './Login';
import WheelOfFortune from 'react-native-wheel-of-fortune'
import {ReactSpinner} from 'react-spinning-wheel';
import 'react-spinning-wheel/dist/style.css';


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
const wheelOptions = {
  rewards: participants,
  knobSize: 50,
  borderWidth: 5,
  borderColor: '#000',
  innerRadius: 50,
  duration: 4000,
  backgroundColor: 'transparent',
  textAngle: 'horizontal',
  knobSource: require('../node_modules/react-native-wheel-of-fortune/assets/images/knob.png'),
  getWinner: (value, index) => {
    this.setState({winnerValue: value, winnerIndex: index});
  },
  onRef: ref => (this.child = ref),
};

export default class HomeScreen extends React.Component {
  render() {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         <Login /> 
        {/* <ReactSpinner /> */}
       
      </View>
    );
  }
}
