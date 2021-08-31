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
} from 'react-native'
import { Avatar, ListItem, Icon } from 'react-native-elements'

import SettingsBackBtn from '../../components/SettingsBackBtn'
import ResourcesCard from '../../components/ResourcesCard'

var deviceWidth = Dimensions.get('window').width
var deviceHeight = Dimensions.get('window').height

import Data from '../data/dares.json'

function ResourceObj(title, number, email, link) {
  this.title = title
  this.number = number
  this.email = email
  this.link = link
}

let resourceList = []

//function that takes in data in the form of a json and splits into correct array
function _loadDataFromJson(data) {
  console.log(Object.keys(data).length)
  for (let i = 0; i < Object.keys(data).length; i++) {
    resourceList.push(
      new ResourceObj(
        data[i].Name,
        data[i].PhoneNumber,
        data[i].Email,
        data[i].Link
      )
    )
  }
}

function _loadData() {
  fetch('http://192.168.1.10:3000/resources/health-resources')
    .then((response) => response.json())
    .then((data) => {
      _loadDataFromJson(data.resources)
    })
}

const Resources = ({ navigation }) => {
  _loadData()
  return (
    <View style={styles.resourcesContainer}>
      <View style={styles.headerContainer}>
        <SettingsBackBtn navigation={navigation} />
        <View styles={styles.titeContainer}>
          <Text style={styles.titleText}> Resources </Text>
        </View>
      </View>

      <ScrollView style={styles.body}>
        {resourceList.map((resource) => {
          return (
            <ResourcesCard
              title={resource.title}
              desc={resource.link}
              number={resource.number}
              email={resource.email}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  resourcesContainer: {
    alignItems: 'center',
  },
  headerContainer: {
    marginTop: 30,
    width: deviceWidth,
  },
  titleContainer: {
    marginTop: 5,
  },
  titleText: {
    marginTop: 8,
    position: 'absolute',
    fontSize: 26,
    fontWeight: 'bold',
    right: 120,
  },
  body: {
    marginTop: 60,
  },
})

export default Resources
