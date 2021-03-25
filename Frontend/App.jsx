import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StackNavigator } from 'react-navigation';
//https://stackoverflow.com/questions/36795819/when-should-i-use-curly-braces-for-es6-import/36796281#36796281 << super cool explanation on imports
//importing the different screens
import HomeScreen from './screens/Home';
import ChallengeScreen from './screens/Challenges';
import ProgressScreen from './screens/Progress';
import Settings from './screens/Settings';
//import { MaterialCommunityIcons } from '@expo/vector-icons'
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {useDimensions} from '@react-native-community/hooks';
import AppStyle from './AppStyle';
import {Provider} from 'react-redux';
import {store} from './redux'

import { MaterialCommunityIcons } from '@expo/vector-icons'


//Onboarding screens
function Onboarding_1({ navigation }) {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> 1st Onboarding screen </Text>
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("Onboarding_2");
            }} style={styles.onboardingBtnContainer}>
        <Text style={styles.onboardingBtn}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
}

function Onboarding_2({ navigation }) {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> 2nd Onboarding screen </Text>
        <View style={styles.BtnViewContainer}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Onboarding_1");
                }} style={styles.onboardingBtnContainer}>
            <Text style={styles.onboardingBtn}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Questions");
                }} style={styles.onboardingBtnContainer}>
            <Text style={styles.onboardingBtn}>Continue</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
}

//Questionaire Screen
function Questions({ navigation }) {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> Questionaire screen </Text>
        <View style={styles.BtnViewContainer}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Onboarding_2");
                }} style={styles.onboardingBtnContainer}>
            <Text style={styles.onboardingBtn}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("HomeApp");
                }} style={styles.onboardingBtnContainer}>
            <Text style={styles.onboardingBtn}>Continue</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
}

//App Home Screen
const Tab = createBottomTabNavigator();
function HomeApp({ navigation }) {
    return (
      <Provider store={store}>
        {/* <NavigationContainer> */}
        <NavigationContainer independent={true}>
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
        </Provider>
    );
}

//App
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                    header: ()=>null
                }}>
                <Stack.Screen name='Onboarding_1' component={Onboarding_1}/>
                <Stack.Screen name='Onboarding_2' component={Onboarding_2}/>
                <Stack.Screen name='Questions' component={Questions}/>
                <Stack.Screen name='HomeApp' component={HomeApp}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onboardingBtn: {
    fontSize: 18,
    color: '#fafafa',
    fontWeight: "bold",
    alignSelf: "center",
  },
  onboardingBtnContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  BtnViewContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      position: 'absolute',
      bottom:0,
  },
});
