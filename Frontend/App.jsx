import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StackNavigator } from 'react-navigation';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { LinearGradient } from 'expo-linear-gradient';
//https://stackoverflow.com/questions/36795819/when-should-i-use-curly-braces-for-es6-import/36796281#36796281 << super cool explanation on imports
//importing the different screens
import HomeScreen from './screens/Home';
import ChallengeScreen from './screens/Challenges';
import ProgressScreen from './screens/Progress';
import Settings from './screens/Settings';
import preLogin from './screens/onboarding/preLogin';
import Onboarding_1 from './screens/onboarding/Onboarding_1';
import Onboarding_2 from './screens/onboarding/Onboarding_2';
import Questionaire from './screens/onboarding/Questionaire';

//import { MaterialCommunityIcons } from '@expo/vector-icons'
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {useDimensions} from '@react-native-community/hooks';
import AppStyle from './AppStyle';
import {Provider} from 'react-redux';
import {store} from './redux'

import { MaterialCommunityIcons } from '@expo/vector-icons'

//App Home Screen
const Tab = createBottomTabNavigator();
function HomeApp({ navigation }) {
    return (
     
        <NavigationContainer independent={true}>
              <Tab.Navigator
              screenOptions={( { route }) => ({
                  tabBarIcon: ({ color, size }) => {
                      const icons = {
                          Home: 'home',
                          Progress: 'chart-donut-variant',
                          Challenges: 'playlist-check',
                          Settings: 'account-settings',
                      };

                      return (
                        <MaterialCommunityIcons
                            name = {icons[route.name]}
                            color = {color}
                            size = {size}
                        />
                      );
                  },

              })}
              tabBarOptions={{
                  activeTintColor: '#000080',
                  inactiveTintColor: 'grey',
                  style: {
                    backgroundColor: 'rgba(250, 250, 248, .2)',
                  }
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

//App
export default function App() {
    return (
      <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ header: ()=>null }}>
                <Stack.Screen name='Login' component={preLogin} />
                <Stack.Screen name='Onboarding_1' component={Onboarding_1}/>
                <Stack.Screen name='Onboarding_2' component={Onboarding_2}/>
                <Stack.Screen name='Questions' component={Questionaire}/>
                <Stack.Screen name='HomeApp' component={HomeApp}/>
                
            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
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

/*
<Text style={{color: 'blue', textDecoration: 'none'}}
    onPress={() => Linking.openURL('http://google.com')}>
    Forgot your password?
</Text>

 //headerStyle: { backgroundColor: '#000000'}, //trying to set the color of the navi bar
//icons found using this webiste: https://oblador.github.io/react-native-vector-icons/
//scroll down to the material community tab cause that's what I imported
*/
