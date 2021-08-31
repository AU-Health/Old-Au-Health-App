import React, { useState } from 'react';
import { View, Text, Dimensions, Input, StyleSheet, CheckBox, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

var h = deviceHeight * 25 / 100;
var w = deviceWidth * 80 / 100;

const Mood = ({ navigation }) => {
    return (
        <View style={styles.questionaireContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}> Mood </Text>
            </View>

            <Image source={require('../../assets/mood.png')} style={{ width: 500, height: 650, marginTop: '8%' }}/>

            <View style={styles.BtnViewContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Onboarding_2");
                    }} style={styles.onboardingBtnContainer}>
                <Text style={styles.onboardingBtn}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Login");
                    }} style={styles.onboardingBtnContainer}>
                    <Text style={styles.onboardingBtn}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    questionaireContainer: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
    },
    onboardingBtn: {
      fontSize: 18,
      color: '#009688',
      fontWeight: "bold",
      alignSelf: "center",
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
});

export default Mood;
