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

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const h = (deviceHeight * 25) / 100
const w = (deviceWidth * 80) / 100

const ResourcesCard = ({ navigation, title, desc, number, email }) => {
  return (
    <View style={styles.resourcesContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}> {title} </Text>
      </View>

      <View style={styles.descContainer}>
        <Text style={styles.descText}> {desc} </Text>
      </View>

      <View style={styles.contactContainer}>
        <Text styles={styles.contactText}> {number} </Text>
        <Text styles={styles.contactText}> {email} </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  resourcesContainer: {
    backgroundColor: '#f3f1ef',
    marginTop: 10,
    alignItems: 'center',
    //justifyContent: 'center',
    borderRadius: 10,
    width: w,
    height: h,
    shadowColor: '#c4c4c4',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 1.0,
  },
  titleContainer: {
    marginTop: 8,
    width: w,
    left: 8,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descContainer: {
    left: 8,
    width: w,
    marginTop: 10,
  },
  descText: {
    fontSize: 14,
  },
  contactContainer: {
    width: w,
    left: 8,
    marginTop: 5,
  },
  contactText: {
    fontSize: 14,
  },
})

export default ResourcesCard
