import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Task from '../components/Tasks';
import * as Progress from 'react-native-progress';


var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

const progress = 0.3;
const numberOfCompletedTasks = 2;
const NumberOftasks = 5;

export default class ChallengeScreen extends React.Component {
  render() {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{
                height: '20%',
                //flex: 1,
                //backgroundColor: 'blue',
                width: deviceWidth,
                justifyContent: 'center',
                alignItems: 'center',
                //height: deviceHeight * 10 / 100,

            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, paddingBottom: 5 }}> Challenges </Text>
            <View style={{ width: deviceWidth * 80 / 100, paddingBottom: 20, }}>
                <Text style={{ position: 'absolute', left: 0 }}> {numberOfCompletedTasks}/{NumberOftasks} </Text>
                <Text style={{ position: 'absolute', right: 0 }}> {progress * 100}% </Text>
            </View>
            <Progress.Bar progress={progress} width={deviceWidth * 80 / 100} />

        </View>
        <View style={{
                height: '40%',
                //flex: 2,
                //backgroundColor: '#ffffff',
                width: deviceWidth * 90 / 100,
                justifyContent: 'center',
                alignItems: 'center',
                //margin: 'auto',
                //height: deviceHeight * 50 / 100,

            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20, }}> Goals </Text>
            <Task></Task>
            <Task></Task>
            <Task></Task>

        </View>
        <View style={{
                height: '40%',
                //flex: 2,
                //backgroundColor: '#ffffff',
                width: deviceWidth * 90 / 100,
                justifyContent: 'center',
                alignItems: 'center',
                //height: deviceHeight * 30 / 100,

            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, }}> Completed </Text>
            <Task></Task>
            <Task></Task>
            <Task></Task>

        </View>
      </View>
    );
  }
}
