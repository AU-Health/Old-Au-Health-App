import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
//import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient'

var deviceWidth = Dimensions.get('window').width
var deviceHeight = Dimensions.get('window').height
var h = (deviceHeight * 25) / 100
var w = (deviceWidth * 80) / 100

const SettingsBackBtn = ({ navigation }) => {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SettingsHome')
        }}
        style={styles.backBtnContainer}
      >
        <LinearGradient
          colors={['#19b5fe', '#6bb9f0']}
          style={styles.linearGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.backBtn}> {'Back'} </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    position: 'absolute',
    left: 10,
    marginTop: 5,
    zIndex: 3,
  },
  backBtn: {
    fontSize: 18,
    color: 'white',
    //fontWeight: "bold",
  },
  backBtnContainer: {
    elevation: 8,
  },
  linearGradient: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    width: 60,
    height: 30,
  },
})

export default SettingsBackBtn
