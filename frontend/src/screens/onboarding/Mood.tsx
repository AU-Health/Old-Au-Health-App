import React from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import MoodImage from '../../../assets/mood.png'
import { StackNavigationProp } from '@react-navigation/stack'

const deviceWidth = Dimensions.get('window').width

const w = (deviceWidth * 80) / 100

export interface MoodProps {
  navigation: StackNavigationProp<Record<string, never>>
}

export const Mood: React.FC<MoodProps> = ({ navigation }) => {
  return (
    <View style={styles.questionaireContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> Mood </Text>
      </View>

      <Image
        source={MoodImage}
        style={{ width: 500, height: 650, marginTop: '8%' }}
      />

      <View style={styles.BtnViewContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Onboarding_2')
          }}
          style={styles.onboardingBtnContainer}
        >
          <Text style={styles.onboardingBtn}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login')
          }}
          style={styles.onboardingBtnContainer}
        >
          <Text style={styles.onboardingBtn}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  questionaireContainer: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  onboardingBtn: {
    fontSize: 18,
    color: '#009688',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  onboardingBtnContainer: {
    elevation: 8,
    //backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  BtnViewContainer: {
    width: w,
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  inputContainer: {
    marginTop: 10,
  },
  inputContainer2: {
    left: 10,
    width: 300,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#DCDCDC',
  },
  inputContainer2_message: {
    left: 10,
    width: 300,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#DCDCDC',
  },
  labelText: {
    left: 0,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#009688',
  },
  floatTextLeft: {
    left: 10,
  },
  textInput: {
    marginTop: 5,
    marginLeft: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  titleContainer: {
    marginTop: 30,
  },
})
