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
  TextInput,
  Button,
} from 'react-native'
import { Avatar, ListItem, Icon } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient'

import SettingsBackBtn from '../../components/SettingsBackBtn'

var deviceWidth = Dimensions.get('window').width
var deviceHeight = Dimensions.get('window').height

var h = (deviceHeight * 90) / 100
var w = (deviceWidth * 90) / 100

const Feedback = ({ navigation }) => {
  let email, subject, desc

  _formSubmitBtn = () => {
    //console.log('yay')
    console.log(email)
    console.log(subject)
    console.log(desc)
  }

  _handEmailInput = (text) => {
    email = text
  }

  _handSubjectInput = (text) => {
    subject = text
  }

  _handDescInput = (text) => {
    desc = text
  }

  return (
    <View style={styles.contactContainer}>
      <View style={styles.headerContainer}>
        <SettingsBackBtn navigation={navigation} />
        <View styles={styles.titeContainer}>
          <Text style={styles.titleText}> Feedback </Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.inputContainer}>
          <View style={styles.floatTextLeft}>
            <Text style={styles.labelText}> Email </Text>
          </View>
          <View style={styles.inputContainer2}>
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              onChangeText={(text) => this._handEmailInput(text)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.floatTextLeft}>
            <Text style={styles.labelText}> Subject </Text>
          </View>
          <View style={styles.inputContainer2}>
            <TextInput
              placeholder="Subject"
              style={styles.textInput}
              onChangeText={(text) => this._handSubjectInput(text)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.floatTextLeft}>
            <Text style={styles.labelText}> Message </Text>
          </View>
          <View style={styles.inputContainer2_message}>
            <TextInput
              placeholder=""
              style={styles.textInput}
              onChangeText={(text) => this._handDescInput(text)}
            />
          </View>
        </View>

        <View style={styles.BtnContainer}>
          <Button
            onPress={this._formSubmitBtn}
            title="Submit"
            color="#23cba7"
            style={styles.linearGradient}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contactContainer: {
    flex: 1,
    alignItems: 'center',
    width: w,
    height: h,
    backgroundColor: '#f3f1ef',
    marginTop: 30,
    shadowColor: '#c4c4c4',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 1.0,
    left: 20,
    borderRadius: 10,
  },
  headerContainer: {
    width: w,
    marginTop: 10,
  },
  titleContainer: {
    marginTop: 5,
  },
  titleText: {
    marginTop: 8,
    position: 'absolute',
    fontSize: 26,
    fontWeight: 'bold',
    right: 100,
  },
  body: {
    marginTop: 50,
    width: w,
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
  },
  floatTextLeft: {
    left: 10,
  },
  BtnContainer: {
    zIndex: 3,
    marginTop: 10,
    alignItems: 'center',
  },
  submitBtn: {
    fontSize: 18,
    color: 'white',
    //fontWeight: "bold",
  },
  submitBtnContainer: {
    elevation: 8,
  },
  linearGradient: {
    fontSize: 28,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    width: 100,
    height: 40,
  },
  textInput: {
    marginTop: 5,
    marginLeft: 5,
  },
})

export default Feedback

/*
                <View style={styles.inputContainer}>
                    <View style={styles.floatTextLeft}>
                        <Text style={styles.labelText}> First Name </Text>
                    </View>
                    <View style={styles.inputContainer2}>
                        <TextInput placeholder="First Name" style={styles.textInput}/>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.floatTextLeft}>
                        <Text style={styles.labelText}> Last Name </Text>
                    </View>
                    <View style={styles.inputContainer2}>
                        <TextInput placeholder="Last Name" style={styles.textInput}/>
                    </View>
                </View>


                <TouchableOpacity
                        onPress={this._formSubmitBtn()} style={styles.submitBtnContainer}>
                        <LinearGradient
                            colors={["#23cba7", "#2ecc71"]}
                            style={styles.linearGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}>
                                <Text style={styles.submitBtn}> {'Submit'} </Text>
                        </LinearGradient>
                    </TouchableOpacity>

*/
