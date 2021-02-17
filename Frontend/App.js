import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//https://stackoverflow.com/questions/36795819/when-should-i-use-curly-braces-for-es6-import/36796281#36796281 << super useful, broad import explanation
import HomeScreen from './Home';
import ChallengeScreen from './Challenges';
import ProgressScreen from './Progress';
import SettingScreen from './Settings';

export default function App() {
    return (
        <NavigationContainer>
              <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Progress" component={ProgressScreen} />
                <Tab.Screen name="Challenges" component={ChallengeScreen} />
                <Tab.Screen name="Settings" component={SettingScreen} />
              </Tab.Navigator>
        </NavigationContainer>
    );
}

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
