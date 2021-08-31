import React, { useState } from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Button,
} from 'react-native'
import { Avatar, ListItem, Icon } from 'react-native-elements'
import { Component, useRef } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StackNavigator } from 'react-navigation'
import { LinearGradient } from 'expo-linear-gradient'
import Modal from 'react-native-modal'

var deviceWidth = Dimensions.get('window').width
var deviceHeight = Dimensions.get('window').height

var h = (deviceHeight * 20) / 100
var w = (deviceWidth * 60) / 100

const LogoutModals = ({ isModalVisible, setModalVisible }) => {
  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const logout = () => {
    console.log("don't forget to implement me!")
  }

  return (
    <Modal style={styles.center} isVisible={isModalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            {' '}
            Are you sure you want to logout?{' '}
          </Text>
        </View>

        <View style={styles.logoutBottom}>
          <Button style={styles.logoutBtn} title="Logout" onPress={logout} />
        </View>
        <View style={styles.hideBottom}>
          <Button style={styles.hideBtn} title="Cancel" onPress={toggleModal} />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  resourcesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    borderRadius: 8,
    backgroundColor: 'rgba(250, 250, 250, .8)',
    width: w,
    height: h,
  },
  hideBtn: {},
  logoutBtn: {
    color: '#cf000f',
    backgroundColor: '#cf000f',
  },
  logoutBottom: {
    position: 'absolute',
    bottom: 5,
    left: 10,
  },
  hideBottom: {
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  titleContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  infoContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
})

export default LogoutModals
