import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//https://stackoverflow.com/questions/36795819/when-should-i-use-curly-braces-for-es6-import/36796281#36796281 << super cool explanation on imports
//importing the different screens
import HomeScreen from './Home';
import ChallengeScreen from './Challenges';
import ProgressScreen from './Progress';
import Settings from './Settings';
import { MaterialCommunityIcons } from '@expo/vector-icons'
//import AppStyle from '../AppStyle';


//App
export default function App() {
    return (
        <NavigationContainer>
              <Tab.Navigator
              screenOptions={( { route }) => ({
                  tabBarIcon: ({ color, size }) => {
                      //icons found using this webiste: https://oblador.github.io/react-native-vector-icons/
                      //scroll down to the material community tab cause that's what I imported
                      const icons = {
                          Home: 'home',
                          Progress: 'progress-clock',
                          Challenges: 'ship-wheel',
                          Settings: 'settings-helper',
                      };

                      return (
                        <MaterialCommunityIcons
                            name = {icons[route.name]}
                            color = {color}
                            size = {size}
                        />
                      );
                  },
                  //headerStyle: { backgroundColor: '#000000'}, //trying to set the color of the navi bar
              })}
              tabBarOptions={{
                  activeTintColor: '#1b998b',
                  inactiveTintColor: 'grey',
              }}
              >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Progress" component={ProgressScreen} />
                <Tab.Screen name="Challenges" component={ChallengeScreen} />
                <Tab.Screen name="Settings" component={Settings} />
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
