import React, { useState } from 'react';
import { View, Text, Dimensions, Input, StyleSheet, CheckBox, ScrollView, TouchableOpacity, TextInput } from 'react-native';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

var h = deviceHeight * 25 / 100;
var w = deviceWidth * 80 / 100;

const Questionaire = ({ navigation }) => {
    return (
        <View style={styles.questionaireContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}> Questionnaire </Text>
            </View>
          
                <View style={styles.inputContainer}>
                    <View style={styles.floatTextLeft}>
                        <Text style={styles.labelText}> Question 1 </Text>
                    </View>
                    <View style={styles.inputContainer2}>
                        <TextInput placeholder="Question 1" style={styles.textInput}/>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.floatTextLeft}>
                        <Text style={styles.labelText}> Question 2 </Text>
                    </View>
                    <View style={styles.inputContainer2}>
                        <TextInput placeholder="Question 2" style={styles.textInput}/>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.floatTextLeft}>
                        <Text style={styles.labelText}> Subject </Text>
                    </View>
                    <View style={styles.inputContainer2}>
                        <TextInput placeholder="Subject" style={styles.textInput}/>
                    </View>
                </View>

            <View style={styles.BtnViewContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Onboarding_2");
                    }} style={styles.onboardingBtnContainer}>
                    <Text style={styles.onboardingBtn}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("HomeApp");
                    }} style={styles.onboardingBtnContainer}>
                    <Text style={styles.onboardingBtn}>Finish</Text>
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

export default Questionaire;
