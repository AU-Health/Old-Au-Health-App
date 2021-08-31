import React, { useState } from 'react'
import {
  View,
  Text,
  Dimensions,
  Input,
  StyleSheet,
  CheckBox,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native'
import Login from '../Login'

const preLogin = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Login />
      <Button
        title="temp"
        onPress={() => {
          navigation.navigate('Questions')
        }}
      />
      {/* note, so the order should go onboard, onboard, login/signup, (if they singup) questionaire, (if they login) straight to home,
            if they are already logged in it will go staight to home */}
    </View>
  )
}

export default preLogin
