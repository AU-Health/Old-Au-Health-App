import React, { useState } from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { Avatar, ListItem, Icon } from 'react-native-elements'
import { Component, useRef } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StackNavigator } from 'react-navigation'
import { LinearGradient } from 'expo-linear-gradient'
import Modal from 'react-native-modal'

//importing the different setting options
import Profile from './settings/Profile'
import Resources from './settings/Resources'
import Notifications from './settings/Notifications'
import Feedback from './settings/Feedback'
import About from './settings/About.tsx'
import SettingsHomeStack from './settings/SettingsHomeStack'

import SettingsBackBtn from '../components/SettingsBackBtn'

const Stack = createStackNavigator()

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const h = (deviceHeight * 25) / 100
const w = (deviceWidth * 80) / 100

function Logout({ navigation }) {
  return (
    <View style={styles.logoutContainer}>
      <SettingsBackBtn navigation={navigation} />
      <Text> Log out screen </Text>
    </View>
  )
}

//Main function for the settings tab. a navigation stack pointing to all the pages above.
export default class Settings extends Component {
  render() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{ header: () => null }}>
          <Stack.Screen name="SettingsHome" component={SettingsHomeStack} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Resources" component={Resources} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="Feedback" component={Feedback} />
          <Stack.Screen name="About" component={About} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
/*<Stack.Screen name='Logout' component={Logout}/>*/
const styles = StyleSheet.create({
  logoutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
